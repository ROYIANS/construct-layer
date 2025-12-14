import { motion, useDragControls } from 'framer-motion';
import { useWindowStore, WindowInstance } from '../../os/WindowManager';
import { useState, useEffect } from 'react';
import { Icons } from './Icons';

interface WindowFrameProps {
    window: WindowInstance;
    children: React.ReactNode;
}

export const WindowFrame = ({ window: osWindow, children }: WindowFrameProps) => {
    const { focusWindow, closeWindow, minimizeWindow } = useWindowStore();
    const dragControls = useDragControls();

    // Mobile detection
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        const checkMobile = () => {
            setIsMobile(window.innerWidth < 768);
        };

        checkMobile();
        window.addEventListener('resize', checkMobile);
        return () => window.removeEventListener('resize', checkMobile);
    }, []);

    const [minimized, setMinimized] = useState(false);

    useEffect(() => {
        setMinimized(osWindow.isMinimized);
    }, [osWindow.isMinimized]);

    return (
        <motion.div
            drag={!isMobile} // Disable drag on mobile to enforce full screen
            dragControls={dragControls}
            dragListener={false}
            dragMomentum={false}
            initial={{ scale: 0.9, opacity: 0, y: 20 }}
            animate={{
                scale: minimized ? 0.5 : 1,
                opacity: minimized ? 0 : 1,
                y: minimized ? 500 : 0
            }}
            style={{ zIndex: osWindow.zIndex }}
            onPointerDown={() => focusWindow(osWindow.id)}
            className={`
        absolute 
        ${isMobile ? 'inset-0 w-full h-full rounded-none top-0 left-0' : 'top-10 left-10 w-[800px] h-[600px] rounded-lg'}
        bg-[#f0f0f0] shadow-2xl overflow-hidden border border-gray-400 flex flex-col font-sans text-black
      `}
        >
            {/* Title Bar */}
            <div
                onPointerDown={(e) => {
                    focusWindow(osWindow.id);
                    if (!isMobile) dragControls.start(e);
                }}
                className={`
            h-10 flex items-center justify-between px-3 select-none border-b border-gray-200
            ${isMobile ? 'bg-gray-100' : 'bg-white'} 
        `}
            >
                <div className="flex items-center gap-2 text-sm text-gray-700 font-medium">
                    {/* Optional App Icon here */}
                    <Icons.Folder className="w-4 h-4 text-yellow-500" />
                    {osWindow.title}
                </div>

                <div className="flex items-center h-full gap-1">
                    <button
                        onClick={(e) => { e.stopPropagation(); minimizeWindow(osWindow.id); }}
                        className="w-10 h-full flex items-center justify-center hover:bg-gray-200 text-gray-500 transition-colors"
                    >
                        <Icons.Minimize className="w-4 h-4" />
                    </button>
                    <button
                        className="w-10 h-full flex items-center justify-center hover:bg-gray-200 text-gray-500 transition-colors"
                    >
                        <Icons.Maximize className="w-3 h-3" />
                    </button>
                    <button
                        onClick={(e) => { e.stopPropagation(); closeWindow(osWindow.id); }}
                        className="w-10 h-full flex items-center justify-center hover:bg-red-500 hover:text-white text-gray-500 transition-colors"
                    >
                        <Icons.Close className="w-4 h-4" />
                    </button>
                </div>
            </div>

            {/* Content Area */}
            <div className="flex-1 overflow-auto bg-white relative">
                {children}
            </div>
        </motion.div>
    );
};
