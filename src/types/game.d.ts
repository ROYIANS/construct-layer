// 游戏状态类型
export interface GameState {
  currentChapter: number;
  currentScene: string;
  flags: Record<string, boolean>; // 剧情标记
  variables: Record<string, any>; // 动态变量
  playTime: number; // 游玩时长（毫秒）
  systemTime: string; // 游戏内系统时间（ISO格式）
  discoveredClues: string[]; // 已发现的线索
  readFiles: string[]; // 已读过的文件ID
  fileSystemState: any; // 文件系统状态快照
  narrativeIndex: number; // 当前对话进度
  osState: {
    openWindows: string[]; // 打开的窗口
    desktopLayout: any; // 桌面布局
    browserHistory: string[]; // 浏览器历史
    weChatMessages: any[]; // 微信消息状态
  };
}

// 存档数据类型
export interface SaveData {
  id: string;
  name: string;
  timestamp: Date;
  thumbnail?: string; // 存档截图（Base64）
  chapterId: number;
  sceneId: string;
  gameState: GameState;
  metadata: {
    playTime: number;
    saveCount: number;
    version: string;
    saveType: 'auto' | 'manual' | 'checkpoint'; // 存档类型
    description?: string; // 存档描述
  };
}

// 自动存档配置
export interface AutoSaveConfig {
  enabled: boolean;
  interval: number; // 自动存档间隔（毫秒）
  maxAutoSaves: number; // 最大自动存档数量
  saveOnKeyEvents: boolean; // 是否在关键事件时存档
}

// 存档槽位
export interface SaveSlot {
  slotId: number;
  saveData: SaveData | null;
  isLocked: boolean; // 是否锁定（防止覆盖）
}

// 章节数据类型
export interface ChapterData {
  id: number;
  title: string;
  subtitle: string;
  locked: boolean;
  completed: boolean;
  thumbnail?: string;
  unlockCondition?: string;
}

// 成就数据类型
export interface Achievement {
  id: string;
  title: string;
  description: string;
  icon: string;
  condition: {
    type: 'flag' | 'count' | 'time' | 'custom';
    target: string;
    value?: number;
    check?: () => boolean;
  };
  reward?: {
    type: 'unlockChapter' | 'unlockEnding' | 'cosmetic';
    value: string;
  };
  unlocked: boolean;
  unlockedAt?: Date;
  hidden: boolean;
  progress?: number;
}

// 菜单按钮类型
export type MenuButton = 'start' | 'continue' | 'chapters' | 'achievements' | 'settings' | 'intro';
