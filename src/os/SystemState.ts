import { create } from 'zustand';

interface SystemState {
    booted: boolean;
    systemTime: Date;
    startGame: () => void;
    updateTime: () => void;
}

export const useSystemStore = create<SystemState>((set) => ({
    booted: false,
    systemTime: new Date('2024-11-03T14:37:00'),
    startGame: () => set({ booted: true }),
    updateTime: () => set((state) => ({ systemTime: new Date(state.systemTime.getTime() + 60000) })), // Add 1 minute
}));
