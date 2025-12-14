import { useState, useEffect } from 'react';
import { systemFiles } from '@/data/Chapter1Files';
import { useGameStore } from '@/stores/useGameStore';

// --- Assets / Icons ---
// Using SVGs directly to avoid emoji usage
const VSIcons = {
    Explorer: ({ className }: { className?: string }) => (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className={className}>
            <path d="M5 3a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-10l-6-6H5z" />
            <line x1="9" y1="3" x2="9" y2="21" strokeOpacity="0.3" />
        </svg>
    ),
    Search: ({ className }: { className?: string }) => (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className={className}>
            <circle cx="11" cy="11" r="7" />
            <line x1="21" y1="21" x2="16.65" y2="16.65" />
        </svg>
    ),
    Git: ({ className }: { className?: string }) => (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className={className}>
            <circle cx="12" cy="6" r="2" />
            <circle cx="6" cy="18" r="2" />
            <circle cx="18" cy="18" r="2" />
            <path d="M12 8v4" />
            <path d="M12 12l-6 4" />
            <path d="M12 12l6 4" />
        </svg>
    ),
    Debug: ({ className }: { className?: string }) => (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className={className}>
            <path d="M12 4L4 8l8 4 8-4-8-4z" />
            <path d="M4 16l8 4 8-4" />
            <path d="M4 12l8 4 8-4" />
        </svg>
    ),
    Extensions: ({ className }: { className?: string }) => (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className={className}>
            <rect x="4" y="4" width="8" height="8" />
            <rect x="12" y="4" width="8" height="8" />
            <rect x="4" y="12" width="8" height="8" />
            {/* Extended square for missing piece usually, but keeping simple */}
            <path d="M16 16h-4v4" strokeOpacity="0.5" />
        </svg>
    ),
    Settings: ({ className }: { className?: string }) => (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className={className}>
            <circle cx="12" cy="12" r="3" />
            <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z" />
        </svg>
    ),
    File: ({ className }: { className?: string }) => (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className={className}>
            <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
            <polyline points="14 2 14 8 20 8" />
        </svg>
    ),
    Folder: ({ className }: { className?: string }) => (
        <svg viewBox="0 0 24 24" fill="currentColor" stroke="none" className={className}>
            <path d="M2.5 5.5a2 2 0 0 1 2-2h5l2 2h7a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2h-14a2 2 0 0 1-2-2v-12z" />
        </svg>
    ),
    ArrowRight: ({ className }: { className?: string }) => (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className={className}>
            <polyline points="9 18 15 12 9 6" />
        </svg>
    ),
    ArrowDown: ({ className }: { className?: string }) => (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className={className}>
            <polyline points="6 9 12 15 18 9" />
        </svg>
    ),
    Close: ({ className }: { className?: string }) => (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className={className}>
            <line x1="18" y1="6" x2="6" y2="18" />
            <line x1="6" y1="6" x2="18" y2="18" />
        </svg>
    ),
    Menu: ({ className }: { className?: string }) => (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className={className}>
            <line x1="3" y1="12" x2="21" y2="12" />
            <line x1="3" y1="6" x2="21" y2="6" />
            <line x1="3" y1="18" x2="21" y2="18" />
        </svg>
    )
};

export const VSCode = () => {
    const [activeSidebar, setActiveSidebar] = useState<'explorer' | 'search' | 'git' | 'debug' | 'extensions'>('explorer');
    const [openFiles, setOpenFiles] = useState<string[]>(['file_sequence']);
    const [activeFileId, setActiveFileId] = useState<string>('file_sequence');
    const [expandedFolders, setExpandedFolders] = useState<string[]>(['folder_system']);
    const [isMobileView, setIsMobileView] = useState(false);
    const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);

    // Game state tracking
    const { setFlag, addDiscoveredClue, flags } = useGameStore();

    // Check for mobile layout size
    useEffect(() => {
        const checkSize = () => {
            const mobile = window.innerWidth < 768;
            setIsMobileView(mobile);
            if (!mobile) setMobileSidebarOpen(true); // Always open on desktop
        };
        checkSize();
        window.addEventListener('resize', checkSize);
        return () => window.removeEventListener('resize', checkSize);
    }, []);

    const projectFiles = systemFiles;

    const handleFileClick = (fileId: string) => {
        if (!openFiles.includes(fileId)) {
            setOpenFiles([...openFiles, fileId]);
        }
        setActiveFileId(fileId);
        if (isMobileView) setMobileSidebarOpen(false); // Close sidebar on mobile select

        // Narrative Trigger
        if (fileId === 'file_sequence') {
            if (!flags['read_sequence_txt']) {
                setFlag('read_sequence_txt', true);
            }
        }
    };

    const closeFile = (e: React.MouseEvent, fileId: string) => {
        e.stopPropagation();
        const newOpen = openFiles.filter(id => id !== fileId);
        setOpenFiles(newOpen);
        if (activeFileId === fileId && newOpen.length > 0) {
            setActiveFileId(newOpen[newOpen.length - 1]);
        } else if (newOpen.length === 0) {
            setActiveFileId('');
        }
    };

    const toggleFolder = (folderId: string) => {
        if (expandedFolders.includes(folderId)) {
            setExpandedFolders(expandedFolders.filter(id => id !== folderId));
        } else {
            setExpandedFolders([...expandedFolders, folderId]);
        }
    };

    const getFileContent = (fileId: string) => {
        const file = projectFiles.find(f => f.id === fileId);
        return typeof file?.content === 'string' ? file.content : 'Binary file or unable to display';
    };

    const getFileName = (fileId: string) => {
        return projectFiles.find(f => f.id === fileId)?.name || 'Untitled';
    };

    return (
        <div className="flex flex-col h-full bg-[#1e1e1e] text-[#cccccc] font-sans overflow-hidden select-none relative">

            <div className="flex-1 flex overflow-hidden relative">
                {/* Activity Bar (Far Left) - Hidden on ultra small mobile, or shown as minimal strip */}
                <div className={`
                    w-12 bg-[#333333] flex flex-col items-center py-2 gap-4 border-r border-[#252526] z-30
                    ${isMobileView && !mobileSidebarOpen ? 'hidden' : 'flex'}
                `}>
                    {[
                        { id: 'explorer', Icon: VSIcons.Explorer },
                        { id: 'search', Icon: VSIcons.Search },
                        { id: 'git', Icon: VSIcons.Git },
                        { id: 'debug', Icon: VSIcons.Debug },
                        { id: 'extensions', Icon: VSIcons.Extensions }
                    ].map(({ id, Icon }) => (
                        <div
                            key={id}
                            onClick={() => setActiveSidebar(id as any)}
                            className={`cursor-pointer p-2 border-l-2 ${activeSidebar === id ? 'border-white text-white' : 'border-transparent text-[#858585] hover:text-white'}`}
                        >
                            <Icon className="w-6 h-6" />
                        </div>
                    ))}
                    <div className="flex-1" />
                    <div className="cursor-pointer p-2 text-[#858585] hover:text-white">
                        <VSIcons.Settings className="w-6 h-6" />
                    </div>
                </div>

                {/* Sidebar (Explorer etc) */}
                <div className={`
                    bg-[#252526] flex flex-col border-r border-[#1e1e1e] z-20 transition-all duration-300
                    ${isMobileView ? 'absolute inset-y-0 left-12 w-64 shadow-xl' : 'w-60 relative'}
                    ${(activeSidebar === 'explorer' && (mobileSidebarOpen || !isMobileView)) ? 'translate-x-0' : (isMobileView ? '-translate-x-full hidden' : 'hidden')}
                `}>
                    <div className="h-9 px-4 flex items-center justify-between text-xs font-bold tracking-wider text-[#bbbbbb]">
                        <span>EXPLORER</span>
                        {isMobileView && (
                            <span onClick={() => setMobileSidebarOpen(false)} className="p-2 cursor-pointer">✕</span>
                        )}
                    </div>

                    {/* Editors Section */}
                    {/* Only show on desktop to save space on mobile */}
                    {!isMobileView && (
                        <div className="flex flex-col mb-2">
                            <div className="px-1 py-1 flex items-center text-xs font-bold text-[#bbbbbb] cursor-pointer hover:bg-[#37373d]">
                                <VSIcons.ArrowDown className="w-3 h-3 mr-1" />
                                OPEN EDITORS
                            </div>
                            <div className="flex flex-col">
                                {openFiles.map(fileId => (
                                    <div
                                        key={fileId}
                                        onClick={() => handleFileClick(fileId)}
                                        className={`px-4 py-1 text-sm flex items-center group cursor-pointer hover:bg-[#2a2d2e] ${activeFileId === fileId ? 'bg-[#37373d] text-white' : 'text-[#cccccc]'}`}
                                    >
                                        <span className="mr-2 text-xs opacity-0 group-hover:opacity-100" onClick={(e) => closeFile(e, fileId)}>✕</span>
                                        <span className="truncate">{getFileName(fileId)}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* Project Folder Section */}
                    <div className="flex flex-col flex-1">
                        <div className="px-1 py-1 flex items-center text-xs font-bold text-[#bbbbbb] cursor-pointer hover:bg-[#37373d]" onClick={() => toggleFolder('folder_system')}>
                            {expandedFolders.includes('folder_system') ? <VSIcons.ArrowDown className="w-3 h-3 mr-1" /> : <VSIcons.ArrowRight className="w-3 h-3 mr-1" />}
                            SYSTEM
                        </div>

                        {expandedFolders.includes('folder_system') && (
                            <div className="flex flex-col pl-2">
                                {projectFiles.map(file => (
                                    <div
                                        key={file.id}
                                        onClick={() => handleFileClick(file.id)}
                                        className={`pl-4 pr-2 py-1.5 flex items-center text-sm cursor-pointer hover:bg-[#2a2d2e] ${activeFileId === file.id ? 'bg-[#37373d] text-white' : 'text-[#cccccc]'}`}
                                    >
                                        <VSIcons.File className="w-4 h-4 mr-2 text-[#519aba] flex-shrink-0" />
                                        <span className="truncate">{file.name}</span>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                </div>

                {/* Main Area */}
                <div className="flex-1 flex flex-col bg-[#1e1e1e] min-w-0 relative z-10 w-full">
                    {/* Mobile Header Toggle */}
                    {isMobileView && (
                        <div className="h-10 bg-[#252526] flex items-center px-4 border-b border-[#3e3e42] justify-between">
                            <span onClick={() => setMobileSidebarOpen(!mobileSidebarOpen)}>
                                <VSIcons.Menu className="w-5 h-5 text-gray-400" />
                            </span>
                            <span className="text-xs text-gray-400 ml-2 truncate">{activeFileId ? getFileName(activeFileId) : 'VS Code'}</span>
                            <div className="w-5" />
                        </div>
                    )}

                    {/* Tabs (Hidden on very small screens if needed, but useful generally) */}
                    {!isMobileView && (
                        <div className="h-9 bg-[#252526] flex items-center overflow-x-auto no-scrollbar">
                            {openFiles.map(fileId => (
                                <div
                                    key={fileId}
                                    onClick={() => setActiveFileId(fileId)}
                                    className={`
                                        h-full flex items-center px-3 min-w-[120px] max-w-[200px] border-r border-[#1e1e1e] cursor-pointer group
                                        ${activeFileId === fileId ? 'bg-[#1e1e1e] text-white' : 'bg-[#2d2d2d] text-[#969696] hover:bg-[#2d2d2d]'}
                                    `}
                                >
                                    <VSIcons.File className={`w-3.5 h-3.5 mr-1.5 ${activeFileId === fileId ? 'text-[#519aba]' : 'opacity-50'}`} />
                                    <span className="text-sm truncate flex-1">{getFileName(fileId)}</span>
                                    <span
                                        onClick={(e) => closeFile(e, fileId)}
                                        className={`ml-2 p-0.5 rounded-md hover:bg-[#4b4b4b] ${activeFileId === fileId ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'}`}
                                    >
                                        <VSIcons.Close className="w-3 h-3" />
                                    </span>
                                </div>
                            ))}
                        </div>
                    )}

                    {/* Editor Breadcrumbs */}
                    <div className="h-6 flex items-center px-4 text-xs text-[#a9a9a9] bg-[#1e1e1e] border-b border-[#333]">
                        {activeFileId && (
                            <>
                                <span>system</span>
                                <span className="mx-1">›</span>
                                <span>{getFileName(activeFileId)}</span>
                            </>
                        )}
                    </div>

                    {/* Code Area */}
                    <div className="flex-1 overflow-auto relative font-mono text-[13px] leading-relaxed p-0">
                        {activeFileId ? (
                            <div className="flex min-h-full">
                                {/* Line Numbers - scale down or hide on very small mobile */}
                                <div className={`flex-shrink-0 text-right pr-4 text-[#858585] select-none py-1 bg-[#1e1e1e] w-10 border-r border-[#333] mr-2 ${isMobileView ? 'text-[10px]' : ''}`}>
                                    {getFileContent(activeFileId).split('\n').map((_, i) => (
                                        <div key={i}>{i + 1}</div>
                                    ))}
                                </div>

                                {/* Content */}
                                <div className="flex-1 py-1 pr-2">
                                    {getFileContent(activeFileId).split('\n').map((line, i) => (
                                        <div key={i} className="whitespace-pre-wrap break-all">
                                            <span className="text-[#d4d4d4]">{line}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        ) : (
                            <div className="flex flex-col items-center justify-center h-full text-[#3e3e3e]">
                                <VSIcons.File className="w-20 h-20 mb-4 opacity-10" />
                                <div className="text-sm text-center px-4">Tap menu to open a file</div>
                            </div>
                        )}
                    </div>
                </div>
            </div>

            {/* Status Bar */}
            <div className="h-6 bg-[#007acc] text-white flex items-center px-3 text-[10px] md:text-xs justify-between select-none shrink-0 z-30">
                <div className="flex items-center gap-2 md:gap-4">
                    <div className="flex items-center gap-1">
                        <span className="text-xs">⑂</span>
                        <span className="hidden md:inline">master*</span>
                    </div>
                    <span>0 errors</span>
                </div>
                <div className="flex items-center gap-2 md:gap-4">
                    {activeFileId && <span>Ln {getFileContent(activeFileId).split('\n').length}</span>}
                    <span>UTF-8</span>
                    <span className="hidden md:inline">Markdown</span>
                </div>
            </div>
        </div>
    );
};
