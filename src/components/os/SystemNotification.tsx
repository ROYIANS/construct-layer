import { motion, AnimatePresence } from 'framer-motion';
import { useEffect, useState } from 'react';

interface SystemNotificationProps {
    title: string;
    message: string;
    show: boolean;
    onClose: () => void;
    onClick?: () => void;
    duration?: number; // Auto-dismiss duration in ms (0 = no auto-dismiss)
}

export const SystemNotification = ({
    title,
    message,
    show,
    onClose,
    onClick,
    duration = 8000
}: SystemNotificationProps) => {
    const [progress, setProgress] = useState(100);

    useEffect(() => {
        if (!show || duration === 0) return;

        const interval = setInterval(() => {
            setProgress(prev => {
                const next = prev - (100 / (duration / 50));
                if (next <= 0) {
                    onClose();
                    return 0;
                }
                return next;
            });
        }, 50);

        return () => clearInterval(interval);
    }, [show, duration, onClose]);

    // Reset progress when notification shows
    useEffect(() => {
        if (show) setProgress(100);
    }, [show]);

    return (
        <AnimatePresence>
            {show && (
                <motion.div
                    initial={{ x: 400, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    exit={{ x: 400, opacity: 0 }}
                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                    className="fixed bottom-16 right-4 z-[10000] w-80 md:w-96"
                >
                    <div
                        className={`bg-[#1e1e1e]/95 backdrop-blur-md border border-white/20 rounded-sm shadow-2xl overflow-hidden ${onClick ? 'cursor-pointer' : ''}`}
                        onClick={onClick}
                    >
                        {/* Progress bar */}
                        {duration > 0 && (
                            <div className="h-0.5 bg-white/10">
                                <motion.div
                                    className="h-full bg-blue-500"
                                    style={{ width: `${progress}%` }}
                                />
                            </div>
                        )}

                        {/* Header */}
                        <div className="flex items-center justify-between px-4 py-3 border-b border-white/10">
                            <div className="flex items-center gap-3">
                                <div className="w-8 h-8 flex items-center justify-center bg-blue-500/20 rounded">
                                    <span className="text-blue-400 text-sm">⚠️</span>
                                </div>
                                <span className="text-white font-medium text-sm">{title}</span>
                            </div>
                            <button
                                onClick={(e) => {
                                    e.stopPropagation();
                                    onClose();
                                }}
                                className="text-white/60 hover:text-white/90 transition-colors text-sm"
                            >
                                ✕
                            </button>
                        </div>

                        {/* Content */}
                        <div className="px-4 py-4">
                            <p className="text-white/80 text-sm leading-relaxed">
                                {message}
                            </p>
                        </div>

                        {/* Footer hint */}
                        {onClick && (
                            <div className="px-4 py-2 bg-white/5 border-t border-white/5">
                                <p className="text-white/40 text-xs">点击查看详情</p>
                            </div>
                        )}
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
};
