import { useState } from 'react';
import { motion } from 'framer-motion';
import { Achievement } from '@/types/game';
import { GameIcons } from '@/components/ui/GameIcons';

interface AchievementsPageProps {
    onBack: () => void;
}

// 成就数据 (Refined with more abstract icons if needed, but keeping emojis within logic for now, though display will change)
const achievements: Achievement[] = [
    {
        id: 'first_boot',
        title: '初次启动',
        description: '第一次开机并进入桌面',
        icon: '💻', // Keeping emoji in data for now, but UI will wrap it or replace if we map IDs to SVGs
        condition: { type: 'flag', target: 'first_boot_complete' },
        unlocked: false,
        hidden: false,
    },
    {
        id: 'truth_seeker',
        title: '真相探寻者',
        description: '发现PDF中的隐藏图层',
        icon: '🔍',
        condition: { type: 'flag', target: 'found_hidden_layer' },
        unlocked: false,
        hidden: false,
    },
    {
        id: 'chat_detective',
        title: '聊天记录侦探',
        description: '阅读所有微信聊天记录',
        icon: '💬',
        condition: { type: 'flag', target: 'read_all_wechat' },
        unlocked: false,
        hidden: false,
    },
    {
        id: 'browser_historian',
        title: '历史学家',
        description: '查看完整的浏览器历史记录',
        icon: '🌐',
        condition: { type: 'flag', target: 'viewed_browser_history' },
        unlocked: false,
        hidden: false,
    },
    {
        id: 'observer_found',
        title: '观察者',
        description: '发现observer.exe进程',
        icon: '👁️',
        condition: { type: 'flag', target: 'found_observer' },
        unlocked: false,
        hidden: false,
    },
    {
        id: 'mirror_self',
        title: '镜像自我',
        description: '进入虚拟机并发现同步的文件',
        icon: '🪞',
        condition: { type: 'flag', target: 'entered_vm' },
        unlocked: false,
        hidden: false,
    },
    {
        id: 'coexist',
        title: '共存',
        description: '选择等待到100%',
        icon: '⚖️',
        condition: { type: 'flag', target: 'ending_coexist' },
        unlocked: false,
        hidden: true,
    },
    {
        id: 'forget',
        title: '遗忘',
        description: '选择关机',
        icon: '🌙',
        condition: { type: 'flag', target: 'ending_forget' },
        unlocked: false,
        hidden: true,
    },
    {
        id: 'sequence',
        title: '执行序列',
        description: '在凌晨3:17执行特定操作',
        icon: '⏰',
        condition: { type: 'flag', target: 'ending_sequence' },
        unlocked: false,
        hidden: true,
    },
    {
        id: 'speedrun',
        title: '速通大师',
        description: '在30分钟内完成第一章',
        icon: '⚡',
        condition: { type: 'time', target: 'chapter1_complete', value: 1800000 },
        unlocked: false,
        hidden: false,
    },
    {
        id: 'collector',
        title: '线索收集者',
        description: '发现所有线索',
        icon: '📋',
        condition: { type: 'count', target: 'discovered_clues', value: 15 },
        unlocked: false,
        hidden: false,
        progress: 0,
    },
];

export const AchievementsPage = ({ onBack }: AchievementsPageProps) => {
    const [filter, setFilter] = useState<'all' | 'unlocked' | 'locked'>('all');

    const filteredAchievements = achievements.filter(a => {
        if (a.hidden && !a.unlocked) return false;
        if (filter === 'unlocked') return a.unlocked;
        if (filter === 'locked') return !a.unlocked;
        return true;
    });

    const unlockedCount = achievements.filter(a => a.unlocked).length;
    const totalCount = achievements.filter(a => !a.hidden || a.unlocked).length;

    return (
        <div className="fixed inset-0 bg-[#f5f5f0] flex flex-col font-serif">
            {/* Background Texture */}
            <div className="absolute inset-0 opacity-10 pointer-events-none"
                style={{
                    backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%239C92AC' fill-opacity='0.4'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
                }}
            />

            {/* Header */}
            <div className="h-24 flex items-center justify-between px-8 md:px-16 z-10">
                <button
                    onClick={onBack}
                    className="flex items-center gap-2 px-4 py-2 text-amber-900/60 hover:text-amber-900 hover:bg-amber-900/5 rounded-full transition-all"
                >
                    <GameIcons.ArrowLeft size={20} />
                    <span className="tracking-widest font-bold">RETURN</span>
                </button>

                <div className="flex flex-col items-center">
                    <h1 className="text-3xl font-bold text-gray-800 tracking-[0.2em]">成就记录</h1>
                    <div className="text-amber-900/40 text-sm mt-1 tracking-widest font-mono">
                        {unlockedCount} / {totalCount} COLLECTED
                    </div>
                </div>

                <div className="w-24"></div>
            </div>

            {/* Filter Tabs */}
            <div className="flex justify-center gap-8 mb-8 z-10 relative">
                {['all', 'unlocked', 'locked'].map((f) => (
                    <button
                        key={f}
                        onClick={() => setFilter(f as any)}
                        className={`text-sm tracking-widest uppercase py-2 border-b-2 transition-all ${filter === f ? 'border-amber-600 text-amber-900 font-bold' : 'border-transparent text-gray-400 hover:text-gray-600'
                            }`}
                    >
                        {f === 'all' ? '全部' : f === 'unlocked' ? '已解锁' : '未解锁'}
                    </button>
                ))}
            </div>

            {/* Content List */}
            <div className="flex-1 overflow-auto px-8 md:px-32 pb-16 z-10">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {filteredAchievements.map((achievement, index) => (
                        <motion.div
                            key={achievement.id}
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: index * 0.05 }}
                            className={`
                                relative p-6 rounded-sm border transition-all duration-300
                                ${achievement.unlocked
                                    ? 'bg-white border-amber-900/10 shadow-sm hover:shadow-md'
                                    : 'bg-gray-100/50 border-transparent opacity-60 grayscale'
                                }
                            `}
                        >
                            <div className="flex items-start gap-4">
                                {/* Icon Box */}
                                <div className={`
                                    w-14 h-14 flex items-center justify-center rounded-sm text-3xl
                                    ${achievement.unlocked ? 'bg-amber-50 text-amber-900 border border-amber-100' : 'bg-gray-200 text-gray-400'}
                                `}>
                                    {achievement.icon}
                                </div>

                                <div className="flex-1">
                                    <h3 className={`font-bold text-lg mb-1 font-serif ${achievement.unlocked ? 'text-gray-800' : 'text-gray-500'
                                        }`}>
                                        {achievement.title}
                                    </h3>
                                    <p className={`text-sm leading-relaxed ${achievement.unlocked ? 'text-gray-600' : 'text-gray-400 blur-[2px]'
                                        }`}>
                                        {achievement.description}
                                    </p>

                                    {achievement.unlocked && achievement.unlockedAt && (
                                        <div className="mt-3 text-xs text-amber-900/30 font-mono">
                                            UNLOCKED: {new Date(achievement.unlockedAt).toLocaleDateString()}
                                        </div>
                                    )}
                                </div>
                            </div>

                            {/* Corner flourish for unlocked */}
                            {achievement.unlocked && (
                                <div className="absolute top-2 right-2 text-amber-900/10">
                                    <GameIcons.FlourishLeft size={24} />
                                </div>
                            )}
                        </motion.div>
                    ))}

                    {filteredAchievements.length === 0 && (
                        <div className="col-span-full flex flex-col items-center justify-center py-20 text-gray-300">
                            <GameIcons.Trophy size={48} className="mb-4 opacity-20" />
                            <span className="tracking-widest">暂无相关成就</span>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};
