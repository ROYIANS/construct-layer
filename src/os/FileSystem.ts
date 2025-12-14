import { create } from 'zustand';

export type FileType = 'file' | 'folder';

export interface VirtualFile {
    id: string;
    parentId: string | null; // null for root
    name: string;
    type: FileType;
    content?: string; // For text files
    fileType?: 'txt' | 'image' | 'pdf' | 'app'; // Specific file types
    size?: string;
    createdAt: string;
}

// Initial Data Structure
const initialFiles: VirtualFile[] = [
    // Desktop Root (ID: 'desktop')
    { id: 'desktop', parentId: null, name: 'Desktop', type: 'folder', createdAt: '2024-11-03' },

    // Folders on Desktop
    { id: 'work_folder', parentId: 'desktop', name: '工作文件', type: 'folder', createdAt: '2024-04-20' },
    { id: 'life_folder', parentId: 'desktop', name: '生活杂物', type: 'folder', createdAt: '2024-05-15' },
    { id: 'recycle_bin', parentId: 'desktop', name: '回收站', type: 'folder', createdAt: '2024-01-01' },

    // Work Files
    { id: 'work_1', parentId: 'work_folder', name: '需求文档_在线教育平台v3.txt', type: 'file', fileType: 'txt', content: '项目名称：在线教育平台\n版本：v3.0\n设计师：苏澜\n\n核心需求更改：\n1. 增加直播互动模块\n2. 优化移动端适配...', createdAt: '2024-06-01' },

    // Life Files
    { id: 'life_1', parentId: 'life_folder', name: '追剧清单.txt', type: 'file', fileType: 'txt', content: '漫长的季节 - 9分\n繁花 - 8分\n三体 - 7分\n黑镜第六季 - ...看不下去了', createdAt: '2024-05-10' },
    { id: 'life_2', parentId: 'life_folder', name: '读书笔记.txt', type: 'file', fileType: 'txt', content: '《失控》摘抄：\n系统会产生涌现现象，当个体足够多时，整体会展现出个体没有的特性。', createdAt: '2024-04-12' },
];

interface FileSystemState {
    files: VirtualFile[];
    getDesktopFiles: () => VirtualFile[];
    getFolderContents: (folderId: string) => VirtualFile[];
    readFile: (fileId: string) => VirtualFile | undefined;
}

export const useFileSystem = create<FileSystemState>((set, get) => ({
    files: initialFiles,

    getDesktopFiles: () => {
        return get().files.filter(f => f.parentId === 'desktop');
    },

    getFolderContents: (folderId) => {
        return get().files.filter(f => f.parentId === folderId);
    },

    readFile: (fileId) => {
        return get().files.find(f => f.id === fileId);
    }
}));
