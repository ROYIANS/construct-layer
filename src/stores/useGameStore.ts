import { create } from 'zustand';
import type { GameState } from '@/types/game';

interface GameStore extends GameState {
  // Actions
  setFlag: (key: string, value: boolean) => void;
  setVariable: (key: string, value: any) => void;
  addPlayTime: (seconds: number) => void;
  resetGame: () => void;
  loadState: (state: GameState) => void;
}

const initialState: GameState = {
  currentChapter: 0, // 0表示在欢迎页
  currentScene: 'welcome',
  flags: {},
  variables: {},
  playTime: 0,
};

export const useGameStore = create<GameStore>((set) => ({
  ...initialState,

  setFlag: (key, value) =>
    set((state) => ({
      flags: { ...state.flags, [key]: value },
    })),

  setVariable: (key, value) =>
    set((state) => ({
      variables: { ...state.variables, [key]: value },
    })),

  addPlayTime: (seconds) =>
    set((state) => ({
      playTime: state.playTime + seconds,
    })),

  resetGame: () => set(initialState),

  loadState: (state) => set(state),
}));
