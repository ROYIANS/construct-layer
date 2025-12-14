import { SaveData, GameState, AutoSaveConfig } from '@/types/game';

/**
 * 存档管理器 - 使用 IndexedDB 存储存档数据
 * 设计理念：
 * 1. 不使用传统菜单式存档，采用"系统还原点"概念
 * 2. 自动存档在关键节点触发
 * 3. 手动存档通过"系统属性"面板触发
 */
export class SaveManager {
    private dbName = 'construct_layer_saves';
    private dbVersion = 1;
    private db: IDBDatabase | null = null;
    private autoSaveConfig: AutoSaveConfig = {
        enabled: true,
        interval: 60000, // 1分钟
        maxAutoSaves: 5,
        saveOnKeyEvents: true,
    };
    private lastAutoSaveTime = 0;
    private autoSaveTimer: number | null = null;

    constructor() {
        this.initDatabase();
    }

    /**
     * 初始化 IndexedDB 数据库
     */
    private async initDatabase(): Promise<void> {
        return new Promise((resolve, reject) => {
            const request = indexedDB.open(this.dbName, this.dbVersion);

            request.onerror = () => {
                console.error('Failed to open IndexedDB:', request.error);
                reject(request.error);
            };

            request.onsuccess = () => {
                this.db = request.result;
                console.log('IndexedDB initialized successfully');
                resolve();
            };

            request.onupgradeneeded = (event) => {
                const db = (event.target as IDBOpenDBRequest).result;

                // 创建存档对象存储
                if (!db.objectStoreNames.contains('saves')) {
                    const saveStore = db.createObjectStore('saves', { keyPath: 'id' });
                    saveStore.createIndex('timestamp', 'timestamp', { unique: false });
                    saveStore.createIndex('saveType', 'metadata.saveType', { unique: false });
                }

                // 创建系统配置存储
                if (!db.objectStoreNames.contains('config')) {
                    db.createObjectStore('config', { keyPath: 'key' });
                }

                console.log('Database schema created');
            };
        });
    }

    /**
     * 创建存档
     */
    async createSave(
        gameState: GameState,
        saveType: 'auto' | 'manual' | 'checkpoint' = 'manual',
        customName?: string
    ): Promise<SaveData> {
        if (!this.db) {
            throw new Error('Database not initialized');
        }

        const now = new Date();
        const saveData: SaveData = {
            id: `save_${saveType}_${now.getTime()}`,
            name: customName || this.generateSaveName(gameState, saveType),
            timestamp: now,
            chapterId: gameState.currentChapter,
            sceneId: gameState.currentScene,
            gameState: { ...gameState },
            metadata: {
                playTime: gameState.playTime,
                saveCount: await this.getSaveCount() + 1,
                version: '1.0.0',
                saveType,
                description: this.generateDescription(gameState),
            },
        };

        // 如果是自动存档，检查是否需要删除旧的自动存档
        if (saveType === 'auto') {
            await this.cleanupOldAutoSaves();
        }

        // 保存到 IndexedDB
        await this.saveToDB(saveData);

        // 同时更新 localStorage 快速检测标记
        this.updateLocalStorageFlag();

        console.log(`[SaveManager] Created ${saveType} save:`, saveData.id);
        return saveData;
    }

    /**
     * 保存到数据库
     */
    private async saveToDB(saveData: SaveData): Promise<void> {
        return new Promise((resolve, reject) => {
            if (!this.db) {
                reject(new Error('Database not initialized'));
                return;
            }

            const transaction = this.db.transaction(['saves'], 'readwrite');
            const store = transaction.objectStore('saves');
            const request = store.put(saveData);

            request.onsuccess = () => resolve();
            request.onerror = () => reject(request.error);
        });
    }

    /**
     * 加载存档
     */
    async loadSave(saveId: string): Promise<GameState | null> {
        if (!this.db) {
            throw new Error('Database not initialized');
        }

        return new Promise((resolve, reject) => {
            const transaction = this.db!.transaction(['saves'], 'readonly');
            const store = transaction.objectStore('saves');
            const request = store.get(saveId);

            request.onsuccess = () => {
                const saveData = request.result as SaveData | undefined;
                if (saveData) {
                    console.log('[SaveManager] Loaded save:', saveId);
                    resolve(saveData.gameState);
                } else {
                    resolve(null);
                }
            };

            request.onerror = () => reject(request.error);
        });
    }

    /**
     * 获取最新存档
     */
    async getLatestSave(): Promise<SaveData | null> {
        if (!this.db) {
            throw new Error('Database not initialized');
        }

        return new Promise((resolve, reject) => {
            const transaction = this.db!.transaction(['saves'], 'readonly');
            const store = transaction.objectStore('saves');
            const index = store.index('timestamp');
            const request = index.openCursor(null, 'prev'); // 倒序获取

            request.onsuccess = () => {
                const cursor = request.result;
                if (cursor) {
                    resolve(cursor.value as SaveData);
                } else {
                    resolve(null);
                }
            };

            request.onerror = () => reject(request.error);
        });
    }

    /**
     * 获取所有存档列表
     */
    async getAllSaves(): Promise<SaveData[]> {
        if (!this.db) {
            throw new Error('Database not initialized');
        }

        return new Promise((resolve, reject) => {
            const transaction = this.db!.transaction(['saves'], 'readonly');
            const store = transaction.objectStore('saves');
            const request = store.getAll();

            request.onsuccess = () => {
                const saves = request.result as SaveData[];
                // 按时间倒序排序
                saves.sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime());
                resolve(saves);
            };

            request.onerror = () => reject(request.error);
        });
    }

    /**
     * 删除存档
     */
    async deleteSave(saveId: string): Promise<void> {
        if (!this.db) {
            throw new Error('Database not initialized');
        }

        return new Promise((resolve, reject) => {
            const transaction = this.db!.transaction(['saves'], 'readwrite');
            const store = transaction.objectStore('saves');
            const request = store.delete(saveId);

            request.onsuccess = () => {
                console.log('[SaveManager] Deleted save:', saveId);
                this.updateLocalStorageFlag();
                resolve();
            };

            request.onerror = () => reject(request.error);
        });
    }

    /**
     * 清理旧的自动存档
     */
    private async cleanupOldAutoSaves(): Promise<void> {
        const saves = await this.getAllSaves();
        const autoSaves = saves.filter(s => s.metadata.saveType === 'auto');

        if (autoSaves.length >= this.autoSaveConfig.maxAutoSaves) {
            // 删除最旧的自动存档
            const toDelete = autoSaves.slice(this.autoSaveConfig.maxAutoSaves - 1);
            for (const save of toDelete) {
                await this.deleteSave(save.id);
            }
        }
    }

    /**
     * 启动自动存档定时器
     */
    startAutoSave(getCurrentGameState: () => GameState): void {
        if (!this.autoSaveConfig.enabled) return;

        this.autoSaveTimer = window.setInterval(async () => {
            const now = Date.now();
            if (now - this.lastAutoSaveTime >= this.autoSaveConfig.interval) {
                const gameState = getCurrentGameState();
                await this.createSave(gameState, 'auto');
                this.lastAutoSaveTime = now;
            }
        }, 10000); // 每10秒检查一次

        console.log('[SaveManager] Auto-save timer started');
    }

    /**
     * 停止自动存档
     */
    stopAutoSave(): void {
        if (this.autoSaveTimer) {
            clearInterval(this.autoSaveTimer);
            this.autoSaveTimer = null;
            console.log('[SaveManager] Auto-save timer stopped');
        }
    }

    /**
     * 关键事件存档（检查点）
     */
    async createCheckpoint(gameState: GameState, eventName: string): Promise<void> {
        if (this.autoSaveConfig.saveOnKeyEvents) {
            await this.createSave(gameState, 'checkpoint', `检查点: ${eventName}`);
        }
    }

    /**
     * 生成存档名称
     */
    private generateSaveName(gameState: GameState, saveType: string): string {
        const time = new Date().toLocaleString('zh-CN', {
            month: '2-digit',
            day: '2-digit',
            hour: '2-digit',
            minute: '2-digit',
        });

        const typeLabel = {
            auto: '自动',
            manual: '手动',
            checkpoint: '检查点',
        }[saveType];

        return `${typeLabel}存档 - ${time}`;
    }

    /**
     * 生成存档描述
     */
    private generateDescription(gameState: GameState): string {
        const chapter = gameState.currentChapter;
        const scene = gameState.currentScene;
        return `第${chapter}章 - ${scene}`;
    }

    /**
     * 获取存档数量
     */
    private async getSaveCount(): Promise<number> {
        const saves = await this.getAllSaves();
        return saves.length;
    }

    /**
     * 更新 localStorage 标记（用于快速检测是否有存档）
     */
    private updateLocalStorageFlag(): void {
        this.getAllSaves().then(saves => {
            if (saves.length > 0) {
                localStorage.setItem('construct_layer_save', 'true');
            } else {
                localStorage.removeItem('construct_layer_save');
            }
        });
    }

    /**
     * 检查是否有可用存档
     */
    async hasSaves(): Promise<boolean> {
        const saves = await this.getAllSaves();
        return saves.length > 0;
    }

    /**
     * 清除所有存档（危险操作）
     */
    async clearAllSaves(): Promise<void> {
        if (!this.db) {
            throw new Error('Database not initialized');
        }

        return new Promise((resolve, reject) => {
            const transaction = this.db!.transaction(['saves'], 'readwrite');
            const store = transaction.objectStore('saves');
            const request = store.clear();

            request.onsuccess = () => {
                console.log('[SaveManager] All saves cleared');
                localStorage.removeItem('construct_layer_save');
                resolve();
            };

            request.onerror = () => reject(request.error);
        });
    }
}

// 导出单例
export const saveManager = new SaveManager();
