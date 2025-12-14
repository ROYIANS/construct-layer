import { create } from 'zustand';
import { chapter1Files } from '../data/Chapter1Files';

export type FileType = 'file' | 'folder';

export interface VirtualFile {
    id: string;
    parentId: string | null; // null for root, 'desktop' for desktop items
    name: string;
    type: FileType;
    content?: any; // Can be string, object (for PDF), or other structured data
    fileType?: 'txt' | 'image' | 'pdf' | 'docx' | 'excel' | 'app';
    children?: string[]; // For folders, list of child IDs
    isHidden?: boolean; // For hidden files/folders
    metadata?: {
        created?: Date;
        modified?: Date;
        size?: number;
    };
}

// Load Chapter 1 files
const initialFiles: VirtualFile[] = chapter1Files;

interface FileSystemState {
    files: VirtualFile[];
    getDesktopFiles: () => VirtualFile[];
    getFolderContents: (folderId: string) => VirtualFile[];
    readFile: (fileId: string) => VirtualFile | undefined;
    showHiddenFiles: boolean;
    toggleHiddenFiles: () => void;
    revealHiddenFile: (fileId: string) => void;
}

export const useFileSystem = create<FileSystemState>((set, get) => ({
    files: initialFiles,
    showHiddenFiles: false,

    getDesktopFiles: () => {
        const { files, showHiddenFiles } = get();
        return files.filter(f =>
            f.parentId === 'desktop' &&
            (showHiddenFiles || !f.isHidden)
        );
    },

    getFolderContents: (folderId) => {
        const { files, showHiddenFiles } = get();
        return files.filter(f =>
            f.parentId === folderId &&
            (showHiddenFiles || !f.isHidden)
        );
    },

    readFile: (fileId) => {
        return get().files.find(f => f.id === fileId);
    },

    toggleHiddenFiles: () => {
        set((state) => ({ showHiddenFiles: !state.showHiddenFiles }));
    },

    revealHiddenFile: (fileId) => {
        set((state) => ({
            files: state.files.map(f =>
                f.id === fileId ? { ...f, isHidden: false } : f
            )
        }));
    },
}));
