import { useEffect, useRef } from 'react';
import { useGameStore } from '@/stores/useGameStore';
import { useFileSystem } from '@/os/FileSystem';

/**
 * CORE系统追踪Hook
 * 自动追踪玩家行为并更新数字人格模型完整度
 */
export const useCORETracking = () => {
    const { updateCoreProgress, readFiles, flags, coreProgress } = useGameStore();
    const lastReadFilesCount = useRef(0);
    const lastFlagsCount = useRef(0);
    const fileViewTimeouts = useRef<Map<string, NodeJS.Timeout>>(new Map());

    // 追踪文件打开
    useEffect(() => {
        const newFilesCount = readFiles.length;
        if (newFilesCount > lastReadFilesCount.current) {
            const addedFiles = newFilesCount - lastReadFilesCount.current;
            // 每打开一个新文件 +2%
            updateCoreProgress(addedFiles * 2);
            console.log('[CORE] 文件打开追踪:', `+${addedFiles * 2}%`);
        }
        lastReadFilesCount.current = newFilesCount;
    }, [readFiles.length, updateCoreProgress]);

    // 追踪重要flag触发
    useEffect(() => {
        const flagsArray = Object.keys(flags);
        const newFlagsCount = flagsArray.length;

        if (newFlagsCount > lastFlagsCount.current) {
            // 检查是否有重要flag被触发
            const importantFlags = {
                'viewed_wechat': 5,
                'viewed_browser_history': 8,
                'archive_revealed': 12,
                'system_folder_discovered': 15,
                'core_readme_opened': 10,
            };

            flagsArray.forEach((flagKey) => {
                if (importantFlags[flagKey as keyof typeof importantFlags] && flags[flagKey]) {
                    const progress = importantFlags[flagKey as keyof typeof importantFlags];
                    updateCoreProgress(progress);
                    console.log('[CORE] 重要事件触发:', flagKey, `+${progress}%`);
                }
            });
        }
        lastFlagsCount.current = newFlagsCount;
    }, [flags, updateCoreProgress]);

    // 随机缓慢增长（模拟后台观察）
    useEffect(() => {
        if (coreProgress >= 100) return;

        const interval = setInterval(() => {
            // 每30秒随机增长0.5-1.5%
            const randomGrowth = 0.5 + Math.random();
            updateCoreProgress(randomGrowth);
            console.log('[CORE] 后台观察增长:', `+${randomGrowth.toFixed(1)}%`);
        }, 30000);

        return () => clearInterval(interval);
    }, [coreProgress, updateCoreProgress]);

    return {
        trackFileView: (fileId: string, duration: number = 30000) => {
            // 清除之前的超时
            const existingTimeout = fileViewTimeouts.current.get(fileId);
            if (existingTimeout) {
                clearTimeout(existingTimeout);
            }

            // 文件阅读超过30秒 +3%
            const timeout = setTimeout(() => {
                updateCoreProgress(3);
                console.log('[CORE] 长时间阅读文件:', fileId, '+3%');
                fileViewTimeouts.current.delete(fileId);
            }, duration);

            fileViewTimeouts.current.set(fileId, timeout);
        },
    };
};
