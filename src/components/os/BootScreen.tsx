import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import { audioManager } from '../../systems/AudioManager';

interface BootScreenProps {
    onBootComplete: () => void;
}

export const BootScreen = ({ onBootComplete }: BootScreenProps) => {
    const [stage, setStage] = useState<'logo' | 'loading' | 'login'>('logo');
    const [loadingProgress, setLoadingProgress] = useState(0);

    useEffect(() => {
        // 播放开机音效
        audioManager.playBootSound();

        // Logo 阶段（2秒）
        const logoTimer = setTimeout(() => {
            setStage('loading');
        }, 2000);

        return () => clearTimeout(logoTimer);
    }, []);

    useEffect(() => {
        if (stage === 'loading') {
            // 模拟加载进度
            const interval = setInterval(() => {
                setLoadingProgress(prev => {
                    if (prev >= 100) {
                        clearInterval(interval);
                        setStage('login');
                        return 100;
                    }
                    return prev + 10;
                });
            }, 150);

            return () => clearInterval(interval);
        }
    }, [stage]);

    useEffect(() => {
        if (stage === 'login') {
            // 自动登录（无密码）
            const loginTimer = setTimeout(() => {
                onBootComplete();
            }, 1500);

            return () => clearTimeout(loginTimer);
        }
    }, [stage, onBootComplete]);

    return (
        <div className="fixed inset-0 bg-black flex items-center justify-center">
            {/* Logo 阶段 */}
            {stage === 'logo' && (
                <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0 }}
                    className="text-center"
                >
                    {/* ThinkPad Logo */}
                    <div className="mb-8">
                        <div className="text-6xl font-bold text-red-600 mb-2">ThinkPad</div>
                        <div className="w-32 h-1 bg-red-600 mx-auto"></div>
                    </div>
                </motion.div>
            )}

            {/* 加载阶段 */}
            {stage === 'loading' && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="text-center"
                >
                    <div className="text-white text-xl mb-4">正在启动...</div>
                    {/* 加载圆圈 */}
                    <div className="flex justify-center">
                        <motion.div
                            className="w-12 h-12 border-4 border-white/30 border-t-white rounded-full"
                            animate={{ rotate: 360 }}
                            transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                        />
                    </div>
                    {/* 进度条 */}
                    <div className="mt-6 w-64 h-1 bg-white/20 rounded-full overflow-hidden mx-auto">
                        <motion.div
                            className="h-full bg-white rounded-full"
                            initial={{ width: '0%' }}
                            animate={{ width: `${loadingProgress}%` }}
                            transition={{ duration: 0.3 }}
                        />
                    </div>
                </motion.div>
            )}

            {/* 登录阶段 */}
            {stage === 'login' && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="text-center"
                >
                    {/* 用户头像 */}
                    <div className="mb-6">
                        <div className="w-32 h-32 bg-orange-400 rounded-full mx-auto flex items-center justify-center text-white text-5xl font-bold">
                            S
                        </div>
                    </div>
                    {/* 用户名 */}
                    <div className="text-white text-2xl mb-4">苏澜</div>
                    {/* 自动登录提示 */}
                    <div className="text-white/60 text-sm">正在登录...</div>
                    {/* 登录动画 */}
                    <div className="mt-4 flex justify-center gap-2">
                        {[0, 1, 2].map(i => (
                            <motion.div
                                key={i}
                                className="w-2 h-2 bg-white rounded-full"
                                animate={{ opacity: [0.3, 1, 0.3] }}
                                transition={{
                                    duration: 1.5,
                                    repeat: Infinity,
                                    delay: i * 0.2,
                                }}
                            />
                        ))}
                    </div>
                </motion.div>
            )}
        </div>
    );
};
