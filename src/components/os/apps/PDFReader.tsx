import { useState } from 'react';
import { useFileSystem } from '../../../os/FileSystem';
import { motion, AnimatePresence } from 'framer-motion';

interface PDFReaderProps {
    fileId?: string;
}

export const PDFReader = ({ fileId }: PDFReaderProps) => {
    const [currentPage, setCurrentPage] = useState(1);
    const [showHiddenLayer, setShowHiddenLayer] = useState(false);
    const { readFile } = useFileSystem();

    // 读取文件
    const file = fileId ? readFile(fileId) : null;
    const pdfContent = file?.content;

    if (!file || !pdfContent || !pdfContent.pages) {
        return (
            <div className="flex items-center justify-center h-full bg-gray-100 text-gray-500">
                无法加载PDF文件
            </div>
        );
    }

    const totalPages = pdfContent.pages.length;
    const page = pdfContent.pages[currentPage - 1];

    const goToPreviousPage = () => {
        if (currentPage > 1) setCurrentPage(currentPage - 1);
    };

    const goToNextPage = () => {
        if (currentPage < totalPages) setCurrentPage(currentPage + 1);
    };

    const toggleHiddenLayer = () => {
        setShowHiddenLayer(!showHiddenLayer);
    };

    return (
        <div className="flex flex-col h-full bg-gray-200">
            {/* 工具栏 */}
            <div className="h-12 bg-gray-800 flex items-center justify-between px-4 text-white">
                <div className="text-sm font-medium">{file.name}</div>

                <div className="flex items-center gap-4">
                    {/* 页码导航 */}
                    <div className="flex items-center gap-2">
                        <button
                            onClick={goToPreviousPage}
                            disabled={currentPage === 1}
                            className="px-3 py-1 bg-gray-700 hover:bg-gray-600 disabled:opacity-30 disabled:cursor-not-allowed rounded text-sm"
                        >
                            ◀ 上一页
                        </button>
                        <span className="text-sm">
                            {currentPage} / {totalPages}
                        </span>
                        <button
                            onClick={goToNextPage}
                            disabled={currentPage === totalPages}
                            className="px-3 py-1 bg-gray-700 hover:bg-gray-600 disabled:opacity-30 disabled:cursor-not-allowed rounded text-sm"
                        >
                            下一页 ▶
                        </button>
                    </div>

                    {/* 图层切换按钮（解谜关键）*/}
                    {page?.hiddenLayer && (
                        <button
                            onClick={toggleHiddenLayer}
                            className={`px-4 py-1 rounded text-sm font-medium transition-all ${
                                showHiddenLayer
                                    ? 'bg-orange-500 hover:bg-orange-600 text-white'
                                    : 'bg-gray-700 hover:bg-gray-600 text-white'
                            }`}
                        >
                            {showHiddenLayer ? '✓ 显示图层' : '图层'}
                        </button>
                    )}
                </div>
            </div>

            {/* PDF内容区域 */}
            <div className="flex-1 overflow-auto p-8 flex justify-center">
                <div className="w-full max-w-4xl bg-white shadow-2xl p-12 rounded-sm">
                    {/* 页面内容 */}
                    <div className="prose prose-sm max-w-none">
                        <pre className="whitespace-pre-wrap font-sans text-gray-800 leading-relaxed">
                            {page.content}
                        </pre>
                    </div>

                    {/* 隐藏层内容（带动画）*/}
                    <AnimatePresence>
                        {showHiddenLayer && page.hiddenLayer && (
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -20 }}
                                transition={{ duration: 0.5 }}
                                className="mt-8 p-6 bg-orange-50 border-2 border-orange-300 rounded-lg"
                            >
                                <div className="flex items-center gap-2 mb-4 text-orange-600 font-bold">
                                    <span className="text-xl">⚠️</span>
                                    <span>隐藏图层</span>
                                </div>
                                <div className="prose prose-sm max-w-none text-gray-700">
                                    <pre className="whitespace-pre-wrap font-sans leading-relaxed">
                                        {page.hiddenLayer}
                                    </pre>
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
            </div>

            {/* 状态栏 */}
            <div className="h-8 bg-gray-800 flex items-center justify-between px-4 text-white text-xs">
                <span>页面 {currentPage} / {totalPages}</span>
                <span>{pdfContent.title}</span>
                <span>100%</span>
            </div>
        </div>
    );
};
