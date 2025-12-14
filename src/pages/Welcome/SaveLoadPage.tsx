import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { saveManager } from '../../systems/SaveManager';
import { SaveData } from '@/types/game';
import { GameIcons } from '@/components/ui/GameIcons';

interface SaveLoadPageProps {
    onBack: () => void;
    onLoadSave: (saveId: string) => void;
}

export const SaveLoadPage = ({ onBack, onLoadSave }: SaveLoadPageProps) => {
    const [saves, setSaves] = useState<SaveData[]>([]);
    const [selectedSave, setSelectedSave] = useState<string | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        loadSaves();
    }, []);

    const loadSaves = async () => {
        setLoading(true);
        const allSaves = await saveManager.getAllSaves();
        setSaves(allSaves);
        setLoading(false);
    };

    const handleDeleteSave = async (saveId: string) => {
        if (confirm('确定要移除这份记忆吗？此操作无法撤销。')) {
            await saveManager.deleteSave(saveId);
            await loadSaves();
        }
    };

    const formatPlayTime = (milliseconds: number) => {
        const hours = Math.floor(milliseconds / 3600000);
        const minutes = Math.floor((milliseconds % 3600000) / 60000);
        if (hours > 0) return `${hours}小时${minutes}分钟`;
        return `${minutes}分钟`;
    };

    const formatDate = (date: Date) => {
        return new Date(date).toLocaleString('zh-CN', {
            year: 'numeric',
            month: '2-digit',
            day: '2-digit',
            hour: '2-digit',
            minute: '2-digit',
        });
    };

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
                    <h1 className="text-3xl font-bold text-gray-800 tracking-[0.2em]">记忆回廊</h1>
                    <div className="w-12 h-1 bg-amber-600 mt-2 opacity-30" />
                </div>

                <div className="w-24"></div> {/* Spacer */}
            </div>

            {/* Content */}
            <div className="flex-1 overflow-auto p-8 z-10">
                {loading ? (
                    <div className="flex items-center justify-center h-full">
                        <div className="text-amber-900/40 animate-pulse">正在回忆...</div>
                    </div>
                ) : saves.length === 0 ? (
                    <div className="flex flex-col items-center justify-center h-full gap-4 text-amber-900/30">
                        <GameIcons.Save size={64} />
                        <div className="text-xl tracking-widest">暂无记忆记录</div>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto pb-12">
                        {saves.map((save, index) => (
                            <motion.div
                                key={save.id}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: index * 0.1 }}
                                className={`
                                    group relative bg-white rounded-sm overflow-hidden box-border
                                    transition-all duration-300 cursor-pointer
                                    ${selectedSave === save.id
                                        ? 'shadow-xl ring-2 ring-amber-500/50 scale-[1.02]'
                                        : 'shadow-sm hover:shadow-md hover:-translate-y-1'
                                    }
                                `}
                                onClick={() => setSelectedSave(save.id)}
                            >
                                {/* Tape/Paper decoration */}
                                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-4 bg-amber-100/50 -rotate-1 z-10 backdrop-blur-sm" />

                                {/* Thumbnail Area */}
                                <div className="aspect-video bg-gray-100 relative overflow-hidden group-hover:opacity-90 transition-opacity">
                                    {save.thumbnail ? (
                                        <img src={save.thumbnail} alt="Memory" className="w-full h-full object-cover sepia-[0.3]" />
                                    ) : (
                                        <div className="w-full h-full flex items-center justify-center bg-gray-50">
                                            <div className="text-gray-300">NO IMAGE</div>
                                        </div>
                                    )}

                                    {/* Type Tag */}
                                    <div className="absolute top-2 right-2">
                                        <span className={`
                                            px-2 py-1 text-xs font-bold tracking-wider rounded-sm
                                            ${save.metadata.saveType === 'auto' ? 'bg-amber-100 text-amber-800' : 'bg-gray-100 text-gray-800'}
                                        `}>
                                            {save.metadata.saveType === 'auto' ? 'AUTO' : 'MANUAL'}
                                        </span>
                                    </div>
                                </div>

                                {/* Info Area */}
                                <div className="p-6">
                                    <h3 className="text-xl font-bold text-gray-800 mb-2 font-serif">
                                        {save.name}
                                    </h3>

                                    <div className="space-y-1 mb-6">
                                        <div className="flex items-center gap-2 text-sm text-gray-500">
                                            <GameIcons.Book size={14} />
                                            <span>第 {save.chapterId} 章</span>
                                        </div>
                                        <div className="flex items-center gap-2 text-sm text-gray-500">
                                            <GameIcons.Check size={14} />
                                            <span>{formatDate(save.timestamp)}</span>
                                        </div>
                                        <div className="flex items-center gap-2 text-sm text-gray-500">
                                            <span className="text-xs font-mono bg-gray-100 px-1 rounded">TIME</span>
                                            <span>{formatPlayTime(save.metadata.playTime)}</span>
                                        </div>
                                    </div>

                                    {/* Actions */}
                                    <div className={`
                                        flex gap-3 transition-opacity duration-200
                                        ${selectedSave === save.id ? 'opacity-100' : 'opacity-50 group-hover:opacity-100'}
                                    `}>
                                        <button
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                onLoadSave(save.id);
                                            }}
                                            className="flex-1 py-2 bg-amber-600 hover:bg-amber-700 text-white text-sm tracking-widest rounded-sm transition-colors"
                                        >
                                            CONTINUE
                                        </button>
                                        <button
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                handleDeleteSave(save.id);
                                            }}
                                            className="px-3 py-2 border border-gray-200 hover:border-red-300 hover:text-red-500 text-gray-400 rounded-sm transition-colors"
                                        >
                                            <GameIcons.Close size={16} /> {/* Assuming we add Close icon, or use existing generic */}
                                        </button>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};
