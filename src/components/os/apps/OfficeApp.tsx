import { useFileSystem } from '../../../os/FileSystem';
import { Icons } from '../Icons';

interface OfficeAppProps {
    fileId?: string;
}

export const OfficeApp = ({ fileId }: OfficeAppProps) => {
    const { readFile } = useFileSystem();
    const file = fileId ? readFile(fileId) : null;

    if (!file || file.type !== 'file') {
        return (
            <div className="flex flex-col items-center justify-center h-full text-gray-400">
                <Icons.FileText className="w-16 h-16 mb-4 opacity-50" />
                <p>Invalid File</p>
            </div>
        );
    }

    const isExcel = file.fileType === 'excel' || file.fileType === 'xlsx';
    const isWord = file.fileType === 'docx' || file.fileType === 'doc';
    const themeColor = isExcel ? '#1d6f42' : '#2b579a'; // Excel Green vs Word Blue

    return (
        <div className="flex flex-col h-full bg-[#f3f2f1] text-black font-sans">
            {/* Title Bar */}
            <div className="h-10 flex items-center px-4 text-white shadow-sm z-10 relative" style={{ backgroundColor: themeColor }}>
                <div className="flex items-center gap-3">
                    <div className="bg-white/20 p-1 rounded">
                        <div className="font-bold text-xs tracking-widest">{isExcel ? 'X' : 'W'}</div>
                    </div>
                    <span className="text-sm font-medium truncate">{file.name}</span>
                    <span className="text-xs opacity-70 ml-2">Saved</span>
                </div>
            </div>

            {/* Simulated Toolbar */}
            <div className="bg-white border-b px-2 py-2 flex items-center gap-4 text-xs text-gray-700 overflow-x-auto no-scrollbar">
                <span className={`font-semibold border-b-2 px-1 py-1`} style={{ borderColor: themeColor }}>File</span>
                <span>Home</span>
                <span>Insert</span>
                <span>Layout</span>
                <span>Review</span>
                <span>View</span>
            </div>

            {/* Content Area */}
            <div className="flex-1 overflow-auto p-4 md:p-8 flex justify-center bg-[#f3f2f1]">
                <div className={`bg-white shadow-md min-h-[800px] w-full max-w-[800px] ${isExcel ? 'p-0' : 'p-12'}`}>
                    {isExcel ? (
                        /* Excel Grid Simulation */
                        <div className="w-full h-full flex flex-col">
                            {/* Formula Bar */}
                            <div className="h-8 border-b flex items-center px-2 bg-gray-50 text-sm">
                                <span className="text-gray-500 font-mono w-8 border-r mr-2">A1</span>
                                <div className="flex-1 bg-white border px-2 h-6 flex items-center">{typeof file.content === 'string' ? file.content : 'Data'}</div>
                            </div>
                            {/* Grid */}
                            <div className="flex-1 overflow-auto">
                                <table className="w-full border-collapse">
                                    <thead>
                                        <tr>
                                            <th className="w-10 bg-gray-100 border text-xs text-gray-500 font-normal"></th>
                                            {['A', 'B', 'C', 'D', 'E'].map(c => <th key={c} className="bg-gray-100 border text-xs text-gray-600 w-24 md:w-32 font-normal h-6">{c}</th>)}
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(r => (
                                            <tr key={r}>
                                                <td className="bg-gray-100 border text-xs text-center text-gray-500">{r}</td>
                                                {['A', 'B', 'C', 'D', 'E'].map(c => <td key={c} className="border h-6"></td>)}
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                                <div className="p-4 text-center text-gray-400 mt-4 italic">
                                    {typeof file.content === 'string' ? file.content : 'Preview not available'}
                                </div>
                            </div>
                        </div>
                    ) : (
                        /* Word Document Simulation */
                        <div className="prose max-w-none whitespace-pre-wrap">
                            {typeof file.content === 'string' ? file.content : (
                                <p className="text-gray-400 italic">Binary document content not supported in preview.</p>
                            )}
                        </div>
                    )}
                </div>
            </div>

            {/* Status Bar */}
            <div className="h-6 flex items-center px-2 text-xs text-white" style={{ backgroundColor: themeColor }}>
                <span className="mr-4">{isExcel ? 'Ready' : 'Page 1 of 1'}</span>
                <span>English (US)</span>
                <div className="flex-1"></div>
                <span>100%</span>
            </div>
        </div>
    );
};
