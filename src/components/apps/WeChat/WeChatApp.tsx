import { useState, useEffect, useRef } from 'react';
import { wechatMessages } from '@/data/Chapter1Files';
import { useGameStore } from '@/stores/useGameStore';
import { motion, AnimatePresence } from 'framer-motion';

// --- Assets / Icons ---
const WeChatIcons = {
    User: ({ className }: { className?: string }) => (
        <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
            <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
        </svg>
    ),
    Group: ({ className }: { className?: string }) => (
        <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
            <path d="M16 11c1.66 0 2.99-1.34 2.99-3S17.66 5 16 5c-1.66 0-3 1.34-3 3s1.34 3 3 3zm-8 0c1.66 0 2.99-1.34 2.99-3S9.66 5 8 5C6.34 5 5 6.34 5 8s1.34 3 3 3zm0 2c-2.33 0-7 1.17-7 3.5V19h14v-2.5c0-2.33-4.67-3.5-7-3.5zm8 0c-.29 0-.62.02-.97.05 1.16.84 1.97 1.97 1.97 3.45V19h6v-2.5c0-2.33-4.67-3.5-7-3.5z" />
        </svg>
    ),
    Back: ({ className }: { className?: string }) => (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className={className}>
            <path d="M15 19l-7-7 7-7" />
        </svg>
    ),
    More: ({ className }: { className?: string }) => (
        <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
            <circle cx="5" cy="12" r="2" />
            <circle cx="12" cy="12" r="2" />
            <circle cx="19" cy="12" r="2" />
        </svg>
    ),
    Search: ({ className }: { className?: string }) => (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className={className}>
            <circle cx="11" cy="11" r="8" />
            <line x1="21" y1="21" x2="16.65" y2="16.65" />
        </svg>
    ),
    Smiley: ({ className }: { className?: string }) => (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className={className}>
            <circle cx="12" cy="12" r="10" />
            <path d="M8 14s1.5 2 4 2 4-2 4-2" />
            <line x1="9" y1="9" x2="9.01" y2="9" />
            <line x1="15" y1="9" x2="15.01" y2="9" />
        </svg>
    ),
    File: ({ className }: { className?: string }) => (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className={className}>
            <path d="M13 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V9z" />
            <polyline points="13 2 13 9 20 9" />
        </svg>
    ),
    Cut: ({ className }: { className?: string }) => (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className={className}>
            <circle cx="6" cy="6" r="3" />
            <circle cx="6" cy="18" r="3" />
            <line x1="20" y1="4" x2="8.12" y2="15.88" />
            <line x1="14.47" y1="14.48" x2="20" y2="20" />
            <line x1="8.12" y1="8.12" x2="12" y2="12" />
        </svg>
    )
};

export const WeChatApp = () => {
    const [activeContactId, setActiveContactId] = useState<string | null>(null);
    const [messages, setMessages] = useState<any[]>([]);
    const [isMobileView, setIsMobileView] = useState(false);
    const messagesEndRef = useRef<HTMLDivElement>(null);

    // Game state tracking
    const { setFlag, addDiscoveredClue, flags } = useGameStore();

    // Check for mobile layout size
    useEffect(() => {
        const checkSize = () => {
            setIsMobileView(window.innerWidth < 768); // Tailwind 'md' breakpoint
        };
        checkSize();
        window.addEventListener('resize', checkSize);
        return () => window.removeEventListener('resize', checkSize);
    }, []);

    // Initialize with first contact or restore state if needed
    useEffect(() => {
        if (!flags['viewed_wechat']) {
            setFlag('viewed_wechat', true);
        }
    }, [flags, setFlag]);

    // Load messages when contact changes
    useEffect(() => {
        if (activeContactId) {
            let threadMessages: any[] | undefined = undefined;

            // Check if it's a direct contact
            if (wechatMessages.conversations[activeContactId as keyof typeof wechatMessages.conversations]) {
                threadMessages = wechatMessages.conversations[activeContactId as keyof typeof wechatMessages.conversations];
            }
            // Check if it's a group
            else if (wechatMessages.groupChats[activeContactId as keyof typeof wechatMessages.groupChats]) {
                threadMessages = wechatMessages.groupChats[activeContactId as keyof typeof wechatMessages.groupChats].messages;
            }

            if (threadMessages) {
                setMessages(threadMessages);

                // Story Trigger: If viewing the weekend group, mark as clue discovered
                if (activeContactId === 'group_weekend') {
                    if (!flags['read_weekend_group']) {
                        setFlag('read_weekend_group', true);
                        addDiscoveredClue('clue_wechat_weekend_group');
                    }
                }
            } else {
                setMessages([]);
            }
        }
    }, [activeContactId, flags, addDiscoveredClue, setFlag]);

    // Auto-scroll to bottom
    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [messages, activeContactId]); // Scroll on messages change or new chat opened

    // Helper to format time
    const formatTime = (date: Date) => {
        return new Date(date).toLocaleTimeString('zh-CN', { hour: '2-digit', minute: '2-digit' });
    };
    // Helper to get last message preview
    const getLastMessage = (id: string, type: 'contact' | 'group') => {
        if (type === 'contact') {
            const contact = wechatMessages.contacts.find(c => c.id === id);
            return {
                text: contact?.lastMessage || '',
                time: contact?.lastTime ? formatTime(contact.lastTime) : ''
            };
        } else {
            const group = wechatMessages.groupChats[id as keyof typeof wechatMessages.groupChats];
            const lastMsg = group.messages[group.messages.length - 1];
            return {
                text: `${lastMsg.sender}: ${lastMsg.content}`,
                time: lastMsg.time ? formatTime(lastMsg.time) : ''
            };
        }
    };

    const handleBack = () => {
        setActiveContactId(null);
    };

    return (
        <div className="flex h-full bg-[#f5f5f5] text-black font-sans selection:bg-green-200 overflow-hidden relative">
            {/* Sidebar: Contacts */}
            <div className={`
                flex-col border-r border-[#e7e7e7] bg-[#e6e6e6]
                ${isMobileView ? 'w-full absolute inset-0 z-10' : 'w-[280px] flex-shrink-0 flex'}
                ${isMobileView && activeContactId ? 'hidden' : 'flex'}
            `}>
                {/* User Header */}
                <div className="h-16 flex items-center px-4 bg-[#f5f5f5] border-b border-[#e7e7e7] flex-shrink-0">
                    <div className="w-10 h-10 bg-gray-300 rounded-sm overflow-hidden mr-3 flex items-center justify-center text-gray-500">
                        {/* Player Avatar */}
                        <WeChatIcons.User className="w-6 h-6" />
                    </div>
                    <div className="font-medium text-sm">我</div>
                </div>

                {/* Search Bar */}
                <div className="px-3 py-3">
                    <div className="bg-[#dcdcdc] rounded-sm px-2 py-1 flex items-center text-xs text-gray-500">
                        <WeChatIcons.Search className="w-3.5 h-3.5 mr-2" />
                        <span>搜索</span>
                    </div>
                </div>

                {/* List */}
                <div className="flex-1 overflow-y-auto overflow-x-hidden no-scrollbar">
                    {/* Groups Section */}
                    {Object.entries(wechatMessages.groupChats).map(([id, group]) => {
                        const last = getLastMessage(id, 'group');
                        return (
                            <div
                                key={id}
                                onClick={() => setActiveContactId(id)}
                                className={`h-18 px-3 py-3 flex items-center cursor-pointer hover:bg-[#d9d9d9] transition-colors border-b border-gray-100/50 ${activeContactId === id && !isMobileView ? 'bg-[#c6c6c6]' : ''}`}
                            >
                                <div className="w-12 h-12 bg-gray-300 rounded-lg mr-3 flex-shrink-0 grid grid-cols-2 gap-[1px] p-[2px] overflow-hidden">
                                    {/* Group Avatar Grid */}
                                    {[1, 2, 3, 4].map(i => <div key={i} className="bg-gray-400 w-full h-full flex items-center justify-center"><WeChatIcons.User className="w-3 h-3 text-gray-200" /></div>)}
                                </div>
                                <div className="flex-1 min-w-0">
                                    <div className="flex justify-between items-center mb-1">
                                        <span className="text-[15px] font-medium truncate text-gray-800">{group.name}</span>
                                        <span className="text-[10px] text-gray-400">{last.time}</span>
                                    </div>
                                    <div className="text-xs text-gray-500 truncate pr-2">
                                        {last.text}
                                    </div>
                                </div>
                            </div>
                        );
                    })}

                    {/* Contacts Section */}
                    {wechatMessages.contacts.map(contact => (
                        <div
                            key={contact.id}
                            onClick={() => setActiveContactId(contact.id)}
                            className={`h-18 px-3 py-3 flex items-center cursor-pointer hover:bg-[#d9d9d9] transition-colors border-b border-gray-100/50 ${activeContactId === contact.id && !isMobileView ? 'bg-[#c6c6c6]' : ''}`}
                        >
                            <div className="w-12 h-12 bg-gray-200 rounded-lg mr-3 flex-shrink-0 flex items-center justify-center text-gray-400">
                                <WeChatIcons.User className="w-7 h-7" />
                            </div>
                            <div className="flex-1 min-w-0">
                                <div className="flex justify-between items-center mb-1">
                                    <span className="text-[15px] font-medium truncate text-gray-800">{contact.name}</span>
                                    <span className="text-[10px] text-gray-400">{formatTime(contact.lastTime)}</span>
                                </div>
                                <div className="text-xs text-gray-500 truncate pr-2">
                                    {contact.lastMessage}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Main: Chat Area */}
            <div className={`
                flex-col bg-[#f5f5f5]
                ${isMobileView ? 'w-full absolute inset-0 z-20' : 'flex-1 flex'}
                ${isMobileView && !activeContactId ? 'hidden' : 'flex'}
            `}>
                {activeContactId ? (
                    <>
                        {/* Header */}
                        <div className="h-14 border-b border-[#e7e7e7] flex items-center justify-between px-4 bg-[#f5f5f5] flex-shrink-0">
                            {/* Mobile Back Button */}
                            {isMobileView && (
                                <button onClick={handleBack} className="mr-3 text-gray-700 p-1 -ml-1">
                                    <WeChatIcons.Back className="w-6 h-6" />
                                </button>
                            )}

                            <div className="flex-1 flex flex-col justify-center min-w-0">
                                <span className="font-bold text-[15px] truncate text-gray-800">
                                    {wechatMessages.conversations[activeContactId as keyof typeof wechatMessages.conversations]
                                        ? wechatMessages.contacts.find(c => c.id === activeContactId)?.name
                                        : wechatMessages.groupChats[activeContactId as keyof typeof wechatMessages.groupChats]?.name}
                                    {activeContactId.startsWith('group') && <span className="text-sm text-gray-500 ml-1">(4)</span>}
                                </span>
                            </div>
                            <div className="text-gray-700 cursor-pointer p-2">
                                <WeChatIcons.More className="w-6 h-6" />
                            </div>
                        </div>

                        {/* Messages */}
                        <div className="flex-1 overflow-y-auto p-4 space-y-5 bg-[#f5f5f5]">
                            {messages.map((msg, index) => {
                                const isMe = msg.sender === 'me';
                                const prevMsg = messages[index - 1];
                                const showTime = index === 0 || (new Date(msg.time).getTime() - new Date(prevMsg.time).getTime() > 5 * 60 * 1000);

                                return (
                                    <div key={index}>
                                        {showTime && (
                                            <div className="text-center py-2">
                                                <span className="text-[11px] text-gray-400 bg-gray-200/50 px-2 py-0.5 rounded">
                                                    {formatTime(msg.time)}
                                                </span>
                                            </div>
                                        )}
                                        <div className={`flex ${isMe ? 'flex-row-reverse' : 'flex-row'} items-start gap-2.5`}>
                                            {/* Avatar */}
                                            <div className={`w-10 h-10 rounded-md flex-shrink-0 flex items-center justify-center
                                                 ${isMe ? 'bg-gradient-to-br from-blue-500 to-blue-600 text-white' : 'bg-gray-200 text-gray-500'}`}>
                                                {isMe ? <WeChatIcons.User className="w-6 h-6" /> : <WeChatIcons.User className="w-6 h-6" />}
                                            </div>

                                            {/* Bubble */}
                                            <div className="flex flex-col max-w-[70%]">
                                                {!isMe && activeContactId.startsWith('group') && (
                                                    <span className="text-[10px] text-gray-400 mb-1 ml-1 scale-90 origin-left">{msg.sender}</span>
                                                )}
                                                <div className={`px-3 py-2.5 rounded text-[15px] leading-relaxed relative shadow-sm
                                                     ${isMe
                                                        ? 'bg-[#95ec69] text-black'
                                                        : 'bg-white text-black'
                                                    }
                                                     ${isMe
                                                        ? 'rounded-tr-none after:content-[""] after:absolute after:right-[-6px] after:top-[10px] after:border-[6px] after:border-transparent after:border-l-[#95ec69]'
                                                        : 'rounded-tl-none after:content-[""] after:absolute after:left-[-6px] after:top-[10px] after:border-[6px] after:border-transparent after:border-r-white'
                                                    }
                                                 `}>
                                                    {msg.content}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                );
                            })}
                            <div ref={messagesEndRef} />
                        </div>

                        {/* Input Area (Mock) */}
                        <div className="border-t border-[#e7e7e7] bg-[#f7f7f7] p-2 flex flex-col gap-2">
                            <div className="flex items-center gap-4 px-2 py-1 text-gray-600">
                                <WeChatIcons.Smiley className="w-6 h-6 hover:text-green-600 transition-colors" />
                                <WeChatIcons.File className="w-6 h-6 hover:text-green-600 transition-colors" />
                                <WeChatIcons.Cut className="w-6 h-6 hover:text-green-600 transition-colors" />
                            </div>
                            <div className="px-2 pb-2">
                                <textarea
                                    disabled
                                    className="w-full h-20 bg-transparent resize-none outline-none text-[15px] placeholder:text-gray-400 font-sans"
                                    placeholder="无法发送消息 - 离线模式 (Offline Mode)"
                                />
                            </div>
                            <div className="flex justify-end px-2 pb-2">
                                <div className="bg-[#e9e9e9] text-[#b2b2b2] px-4 py-1.5 text-sm rounded-sm select-none">
                                    发送(S)
                                </div>
                            </div>
                        </div>

                    </>
                ) : (
                    <div className="flex-1 flex flex-col items-center justify-center text-[#d3d3d3] bg-[#f5f5f5]">
                        <WeChatIcons.More className="w-20 h-20 opacity-10 mb-4" />
                        <div className="text-sm">微信(离线)</div>
                        {isMobileView && (
                            <div className="mt-8 text-xs text-gray-400/50">
                                &lt; Select a chat to view &gt;
                            </div>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
};
