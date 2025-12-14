import { create } from 'zustand';

export interface WindowInstance {
    id: string;
    title: string;
    appId: string;
    isMinimized: boolean;
    isMaximized: boolean;
    zIndex: number;
    data?: any; // For passing file content or initial path
}

interface WindowManagerState {
    windows: WindowInstance[];
    activeWindowId: string | null;
    nextZIndex: number;
    openWindow: (appId: string, title: string, data?: any) => void;
    closeWindow: (id: string) => void;
    minimizeWindow: (id: string) => void;
    focusWindow: (id: string) => void;
}

export const useWindowStore = create<WindowManagerState>((set, get) => ({
    windows: [],
    activeWindowId: null,
    nextZIndex: 100,

    openWindow: (appId, title, data) => {
        const id = Math.random().toString(36).substr(2, 9);
        const newWindow: WindowInstance = {
            id,
            title,
            appId,
            isMinimized: false,
            isMaximized: false,
            zIndex: get().nextZIndex + 1,
            data,
        };
        set((state) => ({
            windows: [...state.windows, newWindow],
            activeWindowId: id,
            nextZIndex: state.nextZIndex + 1,
        }));
    },

    closeWindow: (id) =>
        set((state) => ({
            windows: state.windows.filter((w) => w.id !== id),
            activeWindowId: state.windows.length > 1 ? state.windows[state.windows.length - 2].id : null,
        })),

    minimizeWindow: (id) =>
        set((state) => ({
            windows: state.windows.map((w) => (w.id === id ? { ...w, isMinimized: true } : w)),
        })),

    focusWindow: (id) =>
        set((state) => ({
            activeWindowId: id,
            nextZIndex: state.nextZIndex + 1,
            windows: state.windows.map((w) => (w.id === id ? { ...w, zIndex: state.nextZIndex + 1, isMinimized: false } : w)),
        })),
}));
