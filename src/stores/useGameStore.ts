import { create } from 'zustand';
import type { GameState } from '@/types/game';
import { saveManager } from '@/systems/SaveManager';

interface GameStore extends GameState {
  // Actions
  setFlag: (key: string, value: boolean) => void;
  setVariable: (key: string, value: any) => void;
  setSystemTime: (time: string) => void;
  addPlayTime: (milliseconds: number) => void;
  addDiscoveredClue: (clue: string) => void;
  markFileAsRead: (fileId: string) => void;
  updateOSState: (updates: Partial<GameState['osState']>) => void;
  setNarrativeIndex: (index: number) => void;

  // 存档相关
  saveGame: (saveType?: 'auto' | 'manual' | 'checkpoint', customName?: string) => Promise<void>;
  loadGame: (saveId: string) => Promise<void>;
  createCheckpoint: (eventName: string) => Promise<void>;
  resetGame: () => void;
  loadState: (state: GameState) => void;
  getCurrentState: () => GameState;
}

const initialState: GameState = {
  currentChapter: 0, // 0表示在欢迎页
  currentScene: 'welcome',
  flags: {},
  variables: {},
  playTime: 0,
  systemTime: new Date('2024-11-03T14:37:00').toISOString(), // 初始游戏时间
  discoveredClues: [],
  readFiles: [],
  fileSystemState: null,
  narrativeIndex: 0,
  osState: {
    openWindows: [],
    desktopLayout: null,
    browserHistory: [],
    weChatMessages: [],
  },
};

export const useGameStore = create<GameStore>((set, get) => ({
  ...initialState,

  setFlag: (key, value) =>
    set((state) => ({
      flags: { ...state.flags, [key]: value },
    })),

  setVariable: (key, value) =>
    set((state) => ({
      variables: { ...state.variables, [key]: value },
    })),

  setSystemTime: (time) =>
    set({ systemTime: time }),

  addPlayTime: (milliseconds) =>
    set((state) => ({
      playTime: state.playTime + milliseconds,
    })),

  addDiscoveredClue: (clue) =>
    set((state) => ({
      discoveredClues: state.discoveredClues.includes(clue)
        ? state.discoveredClues
        : [...state.discoveredClues, clue],
    })),

  markFileAsRead: (fileId) =>
    set((state) => ({
      readFiles: state.readFiles.includes(fileId)
        ? state.readFiles
        : [...state.readFiles, fileId],
    })),

  updateOSState: (updates) =>
    set((state) => ({
      osState: { ...state.osState, ...updates },
    })),

  setNarrativeIndex: (index) =>
    set({ narrativeIndex: index }),

  // 获取当前完整状态
  getCurrentState: () => {
    const state = get();
    return {
      currentChapter: state.currentChapter,
      currentScene: state.currentScene,
      flags: state.flags,
      variables: state.variables,
      playTime: state.playTime,
      systemTime: state.systemTime,
      discoveredClues: state.discoveredClues,
      readFiles: state.readFiles,
      fileSystemState: state.fileSystemState,
      narrativeIndex: state.narrativeIndex,
      osState: state.osState,
    };
  },

  // 保存游戏
  saveGame: async (saveType = 'manual', customName) => {
    const currentState = get().getCurrentState();
    await saveManager.createSave(currentState, saveType, customName);
    console.log('[GameStore] Game saved successfully');
  },

  // 加载游戏
  loadGame: async (saveId) => {
    const loadedState = await saveManager.loadSave(saveId);
    if (loadedState) {
      set(loadedState);
      console.log('[GameStore] Game loaded successfully:', saveId);
    } else {
      console.error('[GameStore] Failed to load save:', saveId);
    }
  },

  // 创建检查点
  createCheckpoint: async (eventName) => {
    const currentState = get().getCurrentState();
    await saveManager.createCheckpoint(currentState, eventName);
    console.log('[GameStore] Checkpoint created:', eventName);
  },

  resetGame: () => set(initialState),

  loadState: (state) => set(state),
}));
