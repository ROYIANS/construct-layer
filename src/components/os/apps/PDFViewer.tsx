import { useState } from 'react';
import { useFileSystem } from '../../../os/FileSystem';
import { Icons } from '../Icons';

interface PDFViewerProps {
    fileId?: string;
}

export const PDFViewer = ({ fileId }: PDFViewerProps) => {
    const { readFile } = useFileSystem();
    const file = fileId ? readFile(fileId) : null;
    const [currentPage, setCurrentPage] = useState(1);
    const [zoom, setZoom] = useState(100);

    if (!file || file.type !== 'file' || file.fileType !== 'pdf' || typeof file.content === 'string') {
        return (
            <div className="flex flex-col items-center justify-center h-full text-gray-400">
                <Icons.PDF className="w-16 h-16 mb-4 opacity-50" />
                <p>Invalid PDF File</p>
            </div>
        );
    }

    const { pages = [] } = file.content as any;
    const totalPages = pages.length;
    const currentPageContent = pages.find((p: any) => p.pageNumber === currentPage)?.content || '';

    return (
        <div className="flex flex-col h-full bg-[#525659] text-black">
            {/* Toolbar */}
            <div className="h-10 bg-[#323639] flex items-center justify-between px-4 text-white shadow-sm z-10">
                <div className="flex items-center gap-4 text-sm font-medium">
                    <span className="truncate max-w-[150px]">{file.name}</span>
                </div>

                <div className="flex items-center gap-2 bg-black/30 rounded px-2 py-0.5">
                    <button
                        onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                        disabled={currentPage === 1}
                        className="p-1 hover:bg-white/10 rounded disabled:opacity-30"
                    >
                        <Icons.UpArrow className="w-3 h-3 -rotate-90" />
                    </button>
                    <span className="text-sm min-w-[3rem] text-center">{currentPage} / {totalPages}</span>
                    <button
                        onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                        disabled={currentPage === totalPages}
                        className="p-1 hover:bg-white/10 rounded disabled:opacity-30"
                    >
                        <Icons.UpArrow className="w-3 h-3 rotate-90" />
                    </button>
                </div>

                <div className="flex items-center gap-2">
                    <button onClick={() => setZoom(z => Math.max(50, z - 10))} className="p-1 hover:bg-white/10 rounded">-</button>
                    <span className="text-xs min-w-[3rem] text-center">{zoom}%</span>
                    <button onClick={() => setZoom(z => Math.min(200, z + 10))} className="p-1 hover:bg-white/10 rounded">+</button>
                </div>
            </div>

            {/* Content Area - Scrollable */}
            <div className="flex-1 overflow-auto p-4 md:p-8 flex justify-center bg-[#525659]">
                <div
                    className="bg-white shadow-lg p-8 md:p-12 min-h-full transition-transform duration-200 origin-top"
                    style={{
                        width: `${800 * (zoom / 100)}px`,
                        maxWidth: '100%',
                        fontSize: `${zoom}%`
                    }}
                >
                    <div className="prose max-w-none whitespace-pre-wrap font-serif">
                        {currentPageContent.split('\n').map((line: string, i: number) => {
                            if (line.startsWith('# ')) {
                                return <h1 key={i} className="text-3xl font-bold mb-4">{line.replace('# ', '')}</h1>
                            }
                            if (line.startsWith('## ')) {
                                return <h2 key={i} className="text-2xl font-bold mt-6 mb-3 border-b pb-2">{line.replace('## ', '')}</h2>
                            }
                            if (line.startsWith('### ')) {
                                return <h3 key={i} className="text-xl font-bold mt-4 mb-2">{line.replace('### ', '')}</h3>
                            }
                            if (line.startsWith('- ')) {
                                return <li key={i} className="ml-4 list-disc">{line.replace('- ', '')}</li>
                            }
                            return <p key={i} className="mb-2 leading-relaxed text-gray-800">{line}</p>
                        })}
                    </div>

                    {/* Page Number Footer */}
                    <div className="mt-12 pt-8 border-t text-center text-gray-400 text-sm">
                        Page {currentPage}
                    </div>
                </div>
            </div>
        </div>
    );
};
