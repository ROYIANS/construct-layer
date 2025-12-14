import { useEffect } from 'react';
import { useSystemStore } from '../../os/SystemState';
import { useWindowStore } from '../../os/WindowManager';
import { Taskbar } from './Taskbar';
import { WindowFrame } from './WindowFrame';
import { FileExplorer } from './apps/FileExplorer';
import { useFileSystem } from '../../os/FileSystem';
import { Icons } from './Icons';

export const Desktop = () => {
    const { systemTime, updateTime } = useSystemStore();
    const { windows, openWindow } = useWindowStore();
    const { getDesktopFiles } = useFileSystem();

    // Time tick
    useEffect(() => {
        const timer = setInterval(updateTime, 60000);
        return () => clearInterval(timer);
    }, [updateTime]);

    const desktopFiles = getDesktopFiles();

    const handleIconDoubleClick = (file: any) => {
        if (file.type === 'folder') {
            openWindow('explorer', file.name, { path: file.id });
        } else if (file.fileType === 'txt') {
            openWindow('notepad', file.name, { fileId: file.id });
        }
    };

    const renderApp = (window: any) => {
        switch (window.appId) {
            case 'explorer':
                return <FileExplorer initialPath={window.data?.path} />;
            case 'notepad':
                return <div className="p-4 font-mono text-sm whitespace-pre-wrap">Notepad content would go here</div>;
            default:
                return <div>Unknown App</div>;
        }
    };

    return (
        <div className="fixed inset-0 overflow-hidden select-none bg-black">
            {/* Wallpaper */}
            <div className="absolute inset-0 bg-cover bg-center"
                style={{ backgroundImage: `url('/assets/images/bg-welcome-desktop.jpg')` }}
            />

            {/* Desktop Icons Grid */}
            <div className="absolute inset-0 p-2 flex flex-col flex-wrap content-start gap-4 z-0">
                {desktopFiles.map((file) => (
                    <div
                        key={file.id}
                        onDoubleClick={() => handleIconDoubleClick(file)}
                        className="w-20 group flex flex-col items-center gap-1 p-2 hover:bg-white/10 rounded border border-transparent hover:border-white/20 cursor-default transition-colors"
                        title={file.name}
                    >
                        {/* Icon Selection logic */}
                        <div className="w-12 h-12 flex items-center justify-center filter drop-shadow-md">
                            {file.type === 'folder' ? (
                                file.name === '回收站' ? <Icons.RecycleBin className="w-full h-full" /> : <Icons.Folder className="w-full h-full" />
                            ) : (
                                <Icons.FileText className="w-full h-full text-white" />
                            )}
                        </div>
                        <span className="text-white text-xs text-center drop-shadow-md line-clamp-2 px-1 bg-black/0 group-hover:bg-black/20 rounded">
                            {file.name}
                        </span>
                    </div>
                ))}

                {/* Chrome Icon */}
                <div
                    onDoubleClick={() => openWindow('browser', 'Google Chrome')}
                    className="w-20 group flex flex-col items-center gap-1 p-2 hover:bg-white/10 rounded border border-transparent hover:border-white/20 cursor-default transition-colors"
                >
                    <div className="w-12 h-12 flex items-center justify-center filter drop-shadow-md">
                        <Icons.Chrome className="w-full h-full" />
                    </div>
                    <span className="text-white text-xs text-center drop-shadow-md">Chrome</span>
                </div>
            </div>

            {/* Windows Layer */}
            <div className="absolute inset-0 pointer-events-none z-10">
                {windows.map((window) => (
                    <div key={window.id} className="pointer-events-auto">
                        <WindowFrame window={window}>
                            {renderApp(window)}
                        </WindowFrame>
                    </div>
                ))}
            </div>

            <Taskbar />
        </div>
    );
};
