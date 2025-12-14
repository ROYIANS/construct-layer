import { useEffect, useState } from 'react';
import { useSystemStore } from '../../os/SystemState';
import { useWindowStore } from '../../os/WindowManager';
import { Taskbar } from './Taskbar';
import { WindowFrame } from './WindowFrame';
import { FileExplorer } from './apps/FileExplorer';
import { Notepad } from './apps/Notepad';
import { WeChatApp } from '../apps/WeChat/WeChatApp';
import { ChromeApp } from '../apps/Chrome/ChromeApp';
import { VSCode } from './apps/VSCode';
import { PDFViewer } from './apps/PDFViewer';
import { OfficeApp } from './apps/OfficeApp';
import { ImageViewer } from './apps/ImageViewer';
import { MusicApp } from './apps/MusicApp';
import { NarrativeTriggerSystem } from '../narrative/NarrativeTriggerSystem';
import { useFileSystem } from '../../os/FileSystem';
import { Icons } from './Icons';
import { useCORETracking } from '@/hooks/useCORETracking';

export const Desktop = () => {
    const { updateTime } = useSystemStore();
    const { windows, openWindow } = useWindowStore();
    const { getDesktopFiles } = useFileSystem();
    const [isMobile, setIsMobile] = useState(false);

    // 启动CORE追踪系统
    useCORETracking();

    // 检测是否为移动设备
    useEffect(() => {
        const checkMobile = () => {
            setIsMobile(window.innerWidth < 768);
        };
        checkMobile();
        window.addEventListener('resize', checkMobile);
        return () => window.removeEventListener('resize', checkMobile);
    }, []);

    // Time tick
    useEffect(() => {
        const timer = setInterval(updateTime, 60000);
        return () => clearInterval(timer);
    }, [updateTime]);

    const desktopFiles = getDesktopFiles();

    const handleIconClick = (file: any) => {
        if (file.type === 'folder') {
            openWindow('explorer', file.name, { path: file.id });
        } else if (file.fileType === 'txt') {
            openWindow('notepad', file.name, { fileId: file.id });
        } else if (file.fileType === 'pdf') {
            openWindow('pdf', file.name, { fileId: file.id });
        } else if (['doc', 'docx', 'excel', 'xlsx'].includes(file.fileType)) {
            openWindow('office', file.name, { fileId: file.id });
        } else if (file.fileType === 'image' || ['png', 'jpg', 'jpeg', 'gif'].includes(file.fileType)) {
            openWindow('image', file.name, { fileId: file.id });
        }
    };

    const renderApp = (window: any) => {
        switch (window.appId) {
            case 'explorer':
                return <FileExplorer />;
            case 'notepad':
                return <Notepad fileId={window.data?.fileId} />;
            case 'wechat':
                return <WeChatApp />;
            case 'browser':
                return <ChromeApp />;
            case 'vscode':
                return <VSCode />;
            case 'pdf':
                return <PDFViewer fileId={window.data?.fileId} />;
            case 'office':
                return <OfficeApp fileId={window.data?.fileId} />;
            case 'image':
                return <ImageViewer fileId={window.data?.fileId} />;
            case 'music':
                return <MusicApp />;
            default:
                return <div>Unknown App</div>;
        }
    };

    const getFileIcon = (file: any) => {
        if (file.type === 'folder') {
            return file.name === '回收站' ? <Icons.RecycleBin className="w-full h-full" /> : <Icons.Folder className="w-full h-full" />;
        }
        switch (file.fileType) {
            case 'pdf': return <Icons.PDF className="w-full h-full" />;
            case 'doc':
            case 'docx': return <Icons.Word className="w-full h-full" />;
            case 'excel':
            case 'xlsx': return <Icons.Excel className="w-full h-full" />;
            case 'image':
            case 'png':
            case 'jpg':
            case 'jpeg': return <Icons.Image className="w-full h-full" />;
            case 'app': return <Icons.Computer className="w-full h-full" />;
            default: return <Icons.FileText className="w-full h-full text-white" />;
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
                        onClick={isMobile ? () => handleIconClick(file) : undefined}
                        onDoubleClick={!isMobile ? () => handleIconClick(file) : undefined}
                        className="w-20 group flex flex-col items-center gap-1 p-2 hover:bg-white/10 rounded border border-transparent hover:border-white/20 cursor-pointer transition-colors"
                        title={file.name}
                    >
                        {/* Icon Selection logic */}
                        <div className="w-12 h-12 flex items-center justify-center filter drop-shadow-md">
                            {getFileIcon(file)}
                        </div>
                        <span className="text-white text-xs text-center drop-shadow-md line-clamp-2 px-1 bg-black/0 group-hover:bg-black/20 rounded">
                            {file.name}
                        </span>
                    </div>
                ))}

                {/* WeChat Icon */}
                <div
                    onClick={isMobile ? () => openWindow('wechat', '微信') : undefined}
                    onDoubleClick={!isMobile ? () => openWindow('wechat', '微信') : undefined}
                    className="w-20 group flex flex-col items-center gap-1 p-2 hover:bg-white/10 rounded border border-transparent hover:border-white/20 cursor-pointer transition-colors"
                >
                    <div className="w-12 h-12 flex items-center justify-center filter drop-shadow-md">
                        <Icons.WeChat className="w-full h-full" />
                    </div>
                    <span className="text-white text-xs text-center drop-shadow-md">微信</span>
                </div>

                {/* Chrome Icon */}
                <div
                    onClick={isMobile ? () => openWindow('browser', 'Google Chrome') : undefined}
                    onDoubleClick={!isMobile ? () => openWindow('browser', 'Google Chrome') : undefined}
                    className="w-20 group flex flex-col items-center gap-1 p-2 hover:bg-white/10 rounded border border-transparent hover:border-white/20 cursor-pointer transition-colors"
                >
                    <div className="w-12 h-12 flex items-center justify-center filter drop-shadow-md">
                        <Icons.Chrome className="w-full h-full" />
                    </div>
                    <span className="text-white text-xs text-center drop-shadow-md">Chrome</span>
                </div>

                {/* VS Code Icon */}
                <div
                    onClick={isMobile ? () => openWindow('vscode', 'Visual Studio Code', { path: 'folder_system' }) : undefined}
                    onDoubleClick={!isMobile ? () => openWindow('vscode', 'Visual Studio Code', { path: 'folder_system' }) : undefined}
                    className="w-20 group flex flex-col items-center gap-1 p-2 hover:bg-white/10 rounded border border-transparent hover:border-white/20 cursor-pointer transition-colors"
                >
                    <div className="w-12 h-12 flex items-center justify-center filter drop-shadow-md">
                        <Icons.VSCode className="w-full h-full" />
                    </div>
                    <span className="text-white text-xs text-center drop-shadow-md">VS Code</span>
                </div>

                {/* Suno Music Icon */}
                <div
                    onClick={isMobile ? () => openWindow('music', 'Suno Music') : undefined}
                    onDoubleClick={!isMobile ? () => openWindow('music', 'Suno Music') : undefined}
                    className="w-20 group flex flex-col items-center gap-1 p-2 hover:bg-white/10 rounded border border-transparent hover:border-white/20 cursor-pointer transition-colors"
                >
                    <div className="w-12 h-12 flex items-center justify-center filter drop-shadow-md">
                        <Icons.Music className="w-full h-full" />
                    </div>
                    <span className="text-white text-xs text-center drop-shadow-md">Suno Music</span>
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

            {/* Narrative Trigger System */}
            <NarrativeTriggerSystem />
        </div>
    );
};
