import { useState } from 'react';
import { motion } from 'framer-motion';
import { ChapterData } from '@/types/game';
import { GameIcons } from '@/components/ui/GameIcons';

interface ChapterSelectPageProps {
    onBack: () => void;
    onSelectChapter: (chapterId: number) => void;
}

// 章节数据
const chapters: ChapterData[] = [
    {
        id: 1,
        title: '第一章',
        subtitle: '苏澜的遗物',
        locked: false,
        completed: false,
        unlockCondition: '开始游戏即可解锁',
    },
    {
        id: 2,
        title: '第二章',
        subtitle: '数字残影',
        locked: true,
        completed: false,
        unlockCondition: '完成第一章',
    },
    {
        id: 3,
        title: '第三章',
        subtitle: 'CORE系统',
        locked: true,
        completed: false,
        unlockCondition: '完成第二章',
    },
    {
        id: 4,
        title: '第四章',
        subtitle: '镜像与自我',
        locked: true,
        completed: false,
        unlockCondition: '完成第三章',
    },
    {
        id: 5,
        title: '第五章',
        subtitle: '???',
        locked: true,
        completed: false,
        unlockCondition: '完成第四章并做出选择',
    },
];

export const ChapterSelectPage = ({ onBack, onSelectChapter }: ChapterSelectPageProps) => {
    const [selectedChapter, setSelectedChapter] = useState<number | null>(null);

    return (
        <div className="fixed inset-0 bg-[#f5f5f0] flex flex-col font-serif overflow-hidden">
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
                    <h1 className="text-3xl font-bold text-gray-800 tracking-[0.2em]">章节索引</h1>
                    <div className="w-12 h-1 bg-amber-600 mt-2 opacity-30" />
                </div>

                <div className="w-24"></div>
            </div>

            {/* Content: Horizontal Timeline */}
            <div className="flex-1 flex items-center justify-start overflow-x-auto px-16 py-8 z-10 gap-12 snap-x">
                {chapters.map((chapter, index) => (
                    <motion.div
                        key={chapter.id}
                        initial={{ opacity: 0, x: 50 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.1 }}
                        className="snap-center shrink-0"
                    >
                        <div
                            className={`
                                group relative w-[320px] h-[480px] bg-white rounded-sm shadow-md 
                                transition-all duration-500 ease-out
                                ${chapter.locked ? 'opacity-80 grayscale' : 'hover:-translate-y-4 hover:shadow-2xl'}
                                ${selectedChapter === chapter.id ? 'translate-y-[-16px] shadow-2xl ring-1 ring-amber-500/30' : ''}
                            `}
                            onClick={() => !chapter.locked && setSelectedChapter(chapter.id)}
                        >
                            {/* Book Spine / Decorative Left Border */}
                            <div className="absolute left-0 top-0 bottom-0 w-2 bg-gray-100 border-r border-gray-200" />

                            {/* Content Inner */}
                            <div className="absolute inset-0 pl-6 p-8 flex flex-col items-center text-center border border-gray-100">
                                {/* Chapter Number */}
                                <div className="text-amber-900/10 font-serif text-8xl absolute top-4 right-4 font-bold select-none">
                                    {chapter.id}
                                </div>

                                <div className="mt-16 w-16 h-16 rounded-full border border-amber-900/20 flex items-center justify-center mb-8 bg-amber-50/50">
                                    {chapter.locked ? (
                                        <GameIcons.Lock size={24} className="text-gray-400" />
                                    ) : (
                                        <div className="text-2xl font-serif text-amber-800">{chapter.id}</div>
                                    )}
                                </div>

                                <h2 className={`text-2xl font-bold mb-2 font-serif tracking-wider ${chapter.locked ? 'text-gray-400' : 'text-gray-800'
                                    }`}>
                                    {chapter.title}
                                </h2>

                                <div className="w-8 h-[1px] bg-amber-900/30 mb-4" />

                                <h3 className={`text-sm tracking-widest uppercase mb-12 ${chapter.locked ? 'text-gray-300' : 'text-amber-700/60'
                                    }`}>
                                    {chapter.subtitle}
                                </h3>

                                {chapter.completed && (
                                    <div className="mb-4 px-3 py-1 bg-green-50 text-green-700 text-xs tracking-widest border border-green-100 rounded-sm">
                                        COMPLETED
                                    </div>
                                )}

                                {!chapter.locked ? (
                                    <div className={`mt-auto transition-opacity duration-300 ${selectedChapter === chapter.id ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'}`}>
                                        <button
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                onSelectChapter(chapter.id);
                                            }}
                                            className="px-8 py-3 bg-amber-900 text-white text-sm tracking-[0.2em] hover:bg-amber-800 transition-colors shadow-lg"
                                        >
                                            READ
                                        </button>
                                    </div>
                                ) : (
                                    <div className="mt-auto text-xs text-gray-400 max-w-[200px]">
                                        {chapter.unlockCondition}
                                    </div>
                                )}
                            </div>
                        </div>
                    </motion.div>
                ))}

                {/* End Spacer */}
                <div className="w-16 shrink-0" />
            </div>

            {/* Scroll Indication */}
            <div className="h-16 flex items-center justify-center text-gray-300 animate-pulse">
                <span className="text-xs tracking-widest">SCROLL TO EXPLORE</span>
            </div>
        </div>
    );
};
