import { useState, useEffect } from 'react';
import { useFileSystem } from '../../../os/FileSystem';
import { useGameStore } from '@/stores/useGameStore';
import { motion } from 'framer-motion';

interface NotepadProps {
    fileId?: string;
}

export const Notepad = ({ fileId }: NotepadProps) => {
    const [content, setContent] = useState('');
    const [fileName, setFileName] = useState('未命名');
    const [isModified, setIsModified] = useState(false);
    const { readFile } = useFileSystem();
    const { coreProgress, getCoreETA } = useGameStore();

    // 加载文件内容
    useEffect(() => {
        if (fileId) {
            const file = readFile(fileId);
            if (file && file.type === 'file') {
                setFileName(file.name);
                let fileContent = typeof file.content === 'string' ? file.content : '';

                // 如果是CORE_README.txt,替换动态内容
                if (file.name === 'CORE_README.txt') {
                    fileContent = fileContent.replace('[DYNAMIC]', coreProgress.toFixed(1));
                    fileContent = fileContent.replace('[CALCULATING...]', getCoreETA());
                }

                setContent(fileContent);
                setIsModified(false);
            }
        }
    }, [fileId, readFile, coreProgress, getCoreETA]);

    const handleContentChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        setContent(e.target.value);
        setIsModified(true);
    };

    // 检测是否是CORE_README文件
    const isCoreReadme = fileName === 'CORE_README.txt';

    return (
        <div className="flex flex-col h-full bg-white text-black">
            {/* 菜单栏 */}
            <div className="h-8 bg-white border-b flex items-center px-2 text-xs">
                <div className="hover:bg-gray-100 px-2 py-1 cursor-pointer">文件(F)</div>
                <div className="hover:bg-gray-100 px-2 py-1 cursor-pointer">编辑(E)</div>
                <div className="hover:bg-gray-100 px-2 py-1 cursor-pointer">格式(O)</div>
                <div className="hover:bg-gray-100 px-2 py-1 cursor-pointer">查看(V)</div>
                <div className="hover:bg-gray-100 px-2 py-1 cursor-pointer">帮助(H)</div>
            </div>

            {/* 文本编辑区 */}
            {isCoreReadme ? (
                <div className="flex-1 p-4 overflow-auto font-mono text-sm leading-relaxed">
                    <pre className="whitespace-pre-wrap">
                        {content.split('\n').map((line, index) => {
                            // 高亮显示百分比行
                            if (line.includes('你的数字人格模型完整度')) {
                                return (
                                    <div key={index} className="my-2">
                                        你的数字人格模型完整度：
                                        <motion.span
                                            key={coreProgress}
                                            initial={{ color: '#000000' }}
                                            animate={{ color: ['#000000', '#ef4444', '#000000'] }}
                                            transition={{ duration: 0.5 }}
                                            className="font-bold text-lg"
                                        >
                                            {coreProgress.toFixed(1)}%
                                        </motion.span>
                                    </div>
                                );
                            }
                            // 高亮显示ETA行
                            if (line.includes('预计达成时间')) {
                                return (
                                    <div key={index} className="my-2">
                                        预计达成时间：
                                        <span className="text-blue-600 font-semibold">
                                            {getCoreETA()}
                                        </span>
                                    </div>
                                );
                            }
                            return <div key={index}>{line}</div>;
                        })}
                    </pre>
                </div>
            ) : (
                <textarea
                    value={content}
                    onChange={handleContentChange}
                    className="flex-1 p-4 resize-none outline-none font-mono text-sm leading-relaxed"
                    placeholder="在此处输入文本..."
                    spellCheck={false}
                />
            )}

            {/* 状态栏 */}
            <div className="h-6 bg-white border-t flex items-center px-2 text-xs text-gray-600">
                <span>
                    行 1, 列 1 {isModified && '(已修改)'}
                </span>
                <span className="ml-auto">UTF-8</span>
            </div>
        </div>
    );
};
