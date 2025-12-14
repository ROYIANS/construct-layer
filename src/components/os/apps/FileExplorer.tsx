import { useFileSystem, VirtualFile } from '../../../os/FileSystem';
import { useWindowStore } from '../../../os/WindowManager';
import { useState } from 'react';
import { Icons } from '../Icons';

interface FileExplorerProps {
    initialPath?: string;
}

export const FileExplorer = ({ initialPath = 'desktop' }: FileExplorerProps) => {
    const [currentPath, setCurrentPath] = useState(initialPath);
    const { getFolderContents, readFile } = useFileSystem();
    const { openWindow } = useWindowStore();

    const files = getFolderContents(currentPath);

    const handleDoubleClick = (file: VirtualFile) => {
        if (file.type === 'folder') {
            setCurrentPath(file.id);
        } else {
            // Open file
            if (file.fileType === 'txt') {
                openWindow('notepad', file.name, { fileId: file.id });
            } else if (file.fileType === 'pdf') {
                openWindow('pdf', file.name, { fileId: file.id });
            } else if (['doc', 'docx', 'excel', 'xlsx'].includes(file.fileType || '')) {
                openWindow('office', file.name, { fileId: file.id });
            } else if (file.fileType === 'image' || ['png', 'jpg', 'jpeg', 'gif'].includes(file.fileType || '')) {
                openWindow('image', file.name, { fileId: file.id });
            }
        }
    };

    const navigateUp = () => {
        const currentFolder = readFile(currentPath);
        if (currentFolder && currentFolder.parentId) {
            setCurrentPath(currentFolder.parentId);
        }
    };

    const getFileIcon = (file: any) => {
        if (file.type === 'folder') {
            return <Icons.Folder className="w-full h-full filter drop-shadow-sm" />;
        }
        switch (file.fileType) {
            case 'pdf': return <Icons.PDF className="w-full h-full filter drop-shadow-sm" />;
            case 'doc':
            case 'docx': return <Icons.Word className="w-full h-full filter drop-shadow-sm" />;
            case 'excel':
            case 'xlsx': return <Icons.Excel className="w-full h-full filter drop-shadow-sm" />;
            case 'image':
            case 'png':
            case 'jpg':
            case 'jpeg': return <Icons.Image className="w-full h-full filter drop-shadow-sm" />;
            case 'app': return <Icons.Computer className="w-full h-full filter drop-shadow-sm" />;
            default: return <Icons.FileText className="w-full h-full filter drop-shadow-sm text-gray-400" />;
        }
    };

    return (
        <div className="flex flex-col h-full bg-white text-black">
            {/* Toolbar */}
            <div className="h-10 border-b flex items-center px-2 gap-2 bg-gray-50">
                <button
                    onClick={navigateUp}
                    disabled={!readFile(currentPath)?.parentId}
                    className="p-1 hover:bg-gray-200 rounded disabled:opacity-30 disabled:hover:bg-transparent"
                >
                    <Icons.UpArrow className="w-5 h-5" />
                </button>
                <div className="flex-1 bg-white border px-2 py-1 text-sm rounded cursor-text flex items-center gap-2 border-gray-300">
                    <Icons.Folder className="w-4 h-4 text-gray-400" />
                    {currentPath === 'desktop' ? 'Desktop' : readFile(currentPath)?.name}
                </div>
                <div className="bg-white border px-2 py-1 text-sm rounded w-48 border-gray-300 flex items-center gap-2">
                    <Icons.Search className="w-3 h-3 text-gray-400" />
                    <span className="text-gray-400">Search</span>
                </div>
            </div>

            {/* File List */}
            <div className="flex-1 overflow-auto p-4 content-start">
                <div className="grid grid-cols-4 md:grid-cols-6 gap-2">
                    {files.map(file => (
                        <div
                            key={file.id}
                            onDoubleClick={() => handleDoubleClick(file)}
                            className="flex flex-col items-center gap-1 p-2 hover:bg-blue-50 border border-transparent hover:border-blue-200 rounded cursor-default group"
                            title={file.name}
                        >
                            <div className="w-12 h-12 flex items-center justify-center">
                                {getFileIcon(file)}
                            </div>
                            <span className="text-xs text-center break-all line-clamp-2 px-1 rounded group-hover:bg-blue-100/50">
                                {file.name}
                            </span>
                        </div>
                    ))}
                    {files.length === 0 && (
                        <div className="col-span-full flex flex-col items-center justify-center text-gray-300 mt-20 gap-4">
                            <Icons.Folder className="w-16 h-16 opacity-20" />
                            <span>This folder is empty.</span>
                        </div>
                    )}
                </div>
            </div>

            {/* Status Bar */}
            <div className="h-6 bg-white border-t flex items-center px-2 text-xs text-gray-500 gap-4">
                <span>{files.length} item{files.length !== 1 && 's'}</span>
                <span className="border-l pl-4 h-4 flex items-center">
                    {/* Placeholder for selected item info */}
                </span>
            </div>
        </div>
    );
};
