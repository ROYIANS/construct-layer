import { useState } from 'react';
import { useSystemStore } from '../../os/SystemState';
import { useWindowStore } from '../../os/WindowManager';
import { motion } from 'framer-motion';
import { Icons } from './Icons';

export const Taskbar = () => {
    const { systemTime } = useSystemStore();
    const { windows, activeWindowId, focusWindow, minimizeWindow, openWindow } = useWindowStore();
    const [startMenuOpen, setStartMenuOpen] = useState(false);

    // Format time as HH:MM
    const timeString = systemTime.toLocaleTimeString('en-US', {
        hour: '2-digit',
        minute: '2-digit',
        hour12: false,
    });

    // Format date as YYYY/MM/DD
    const dateString = systemTime.toLocaleDateString('zh-CN', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
    });

    return (
        <div className="fixed bottom-0 left-0 right-0 h-10 bg-[#1e1e1e]/95 backdrop-blur-md flex items-center justify-between px-2 z-[9999] border-t border-white/10 text-white select-none">
            {/* Left: Start & Apps */}
            <div className="flex items-center gap-2 h-full flex-1">
                {/* Start Button */}
                <button
                    onClick={() => setStartMenuOpen(!startMenuOpen)}
                    className="h-full px-3 hover:bg-white/10 transition-colors flex items-center justify-center group"
                >
                    <Icons.Start className="w-5 h-5 fill-white group-hover:fill-[#3b82f6] transition-colors" />
                </button>

                {/* Search Bar Simulation - Hidden on Mobile */}
                <div className="hidden md:flex items-center h-8 bg-white/20 px-3 w-48 rounded-sm ml-2">
                    <Icons.Search className="w-4 h-4 text-white/50 mr-2" />
                    <span className="text-xs text-white/50">Type here to search</span>
                </div>

                {/* Pinned Apps */}
                <div className="flex items-center gap-1 ml-2 h-full">
                    {/* File Explorer */}
                    <button
                        onClick={() => openWindow('explorer', '我的电脑', { path: 'desktop' })}
                        className="h-full px-3 hover:bg-white/10 transition-colors flex items-center justify-center"
                        title="文件资源管理器"
                    >
                        <Icons.Folder className="w-5 h-5" />
                    </button>

                    {/* WeChat */}
                    <button
                        onClick={() => openWindow('wechat', '微信')}
                        className="h-full px-3 hover:bg-white/10 transition-colors flex items-center justify-center"
                        title="微信"
                    >
                        <Icons.WeChat className="w-5 h-5" />
                    </button>

                    {/* Chrome */}
                    <button
                        onClick={() => openWindow('browser', 'Google Chrome')}
                        className="h-full px-3 hover:bg-white/10 transition-colors flex items-center justify-center"
                        title="Google Chrome"
                    >
                        <Icons.Chrome className="w-5 h-5" />
                    </button>
                </div>

                {/* Running Apps - Scrollable on mobile */}
                <div className="flex items-center gap-1 ml-2 h-full overflow-x-auto no-scrollbar max-w-[calc(100vw-220px)] md:max-w-[calc(100vw-400px)]">
                    {windows.map((win) => (
                        <div
                            key={win.id}
                            onClick={() => {
                                if (activeWindowId === win.id && !win.isMinimized) {
                                    minimizeWindow(win.id);
                                } else {
                                    focusWindow(win.id);
                                }
                            }}
                            className={`
                        h-full px-4 flex items-center gap-2 text-xs border-b-2 transition-colors cursor-default whitespace-nowrap
                        ${activeWindowId === win.id && !win.isMinimized ? 'bg-white/10 border-blue-400' : 'hover:bg-white/5 border-transparent text-white/70'}
                    `}
                        >
                            <div className="w-4 h-4 rounded-sm bg-blue-500 flex-shrink-0" /> {/* Placeholder App Icon - Could map specific icons later */}
                            <span className="max-w-[80px] md:max-w-[100px] truncate">{win.title}</span>
                        </div>
                    ))}
                </div>
            </div>

            {/* Right: System Tray */}
            <div className="flex items-center gap-4 h-full px-2 text-xs">
                <div className="flex flex-col items-end leading-tight cursor-default">
                    <span>{timeString}</span>
                    <span className="text-[10px] text-white/60">{dateString}</span>
                </div>
                <div className="w-1 h-4 border-l border-white/20" />
                <div className="w-4 h-4 rounded-sm flex items-center justify-center">
                    <div className="w-3 h-3 border border-white/50 rounded-sm" />
                </div>
            </div>

            {/* Start Menu */}
            {startMenuOpen && (
                <motion.div
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    className="absolute bottom-10 left-0 w-64 h-96 bg-[#1e1e1e]/95 backdrop-blur-md border border-white/10 border-b-0 rounded-t-lg shadow-2xl p-4 flex flex-col"
                >
                    <div className="flex items-center gap-3 mb-6">
                        <div className="w-10 h-10 rounded-full bg-orange-400 overflow-hidden relative">
                            {/* Avatar placeholder */}
                            <div className="absolute inset-0 flex items-center justify-center text-white font-bold bg-orange-500">S</div>
                        </div>
                        <div>
                            <div className="font-bold">Su Lan</div>
                        </div>
                    </div>
                    <div className="space-y-1 flex-1">
                        <div className="p-2 hover:bg-white/10 rounded cursor-pointer text-sm flex items-center gap-2">
                            <Icons.FileText className="w-4 h-4" /> Documents
                        </div>
                        <div className="p-2 hover:bg-white/10 rounded cursor-pointer text-sm flex items-center gap-2">
                            <Icons.Folder className="w-4 h-4" /> Pictures
                        </div>
                        <div className="p-2 hover:bg-white/10 rounded cursor-pointer text-sm flex items-center gap-2">
                            <div className="w-4 h-4 border border-white rounded-full flex items-center justify-center text-[10px]">⚙</div> Settings
                        </div>
                    </div>

                    <div className="mt-4 border-t border-white/10 pt-2 p-2 hover:bg-white/10 rounded cursor-pointer text-sm flex items-center gap-2 text-white/80 hover:text-white">
                        <Icons.Power className="w-4 h-4" /> Power
                    </div>
                </motion.div>
            )}
        </div>
    );
};
