import { useState, useRef, useEffect } from 'react';
import { browserHistory } from '@/data/Chapter1Files';
import { useGameStore } from '@/stores/useGameStore';
import { BrowserContent } from './BrowserContent';
import { DevTools } from './DevTools';
import { Icons } from '../../os/Icons';

export const ChromeApp = () => {
    const [url, setUrl] = useState('https://google.com');
    const [inputValue, setInputValue] = useState('https://google.com');
    const [history] = useState<any[]>(browserHistory);
    const [activeTab, setActiveTab] = useState('home'); // home, history, error, page
    const [showMenu, setShowMenu] = useState(false);
    const [showDevTools, setShowDevTools] = useState(false);
    const menuRef = useRef<HTMLDivElement>(null);

    // Game state tracking
    const { setFlag, flags } = useGameStore();

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
                setShowMenu(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const navigate = (newUrl: string) => {
        let targetUrl = newUrl;

        // Simple protocol auto-add
        if (!targetUrl.startsWith('http') && !targetUrl.startsWith('chrome://')) {
            targetUrl = 'https://' + targetUrl;
        }

        setUrl(targetUrl);
        setInputValue(targetUrl);

        if (targetUrl === 'chrome://history') {
            setActiveTab('history');
            if (!flags['viewed_browser_history']) {
                setFlag('viewed_browser_history', true);
            }
        } else if (targetUrl.includes('google.com') && !targetUrl.includes('search?')) {
            setActiveTab('home');
        } else if (
            targetUrl.includes('tieba.baidu.com') ||
            targetUrl.includes('zhihu.com') ||
            targetUrl.includes('4chan.org') ||
            targetUrl.includes('late-night')
        ) {
            setActiveTab('page');
        } else {
            setActiveTab('error');
        }
    };

    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter') {
            navigate(inputValue);
        }
    };

    const toggleDevTools = () => {
        setShowDevTools(prev => !prev);
        setShowMenu(false);
    };

    return (
        <div className="flex flex-col h-full bg-[#dfe1e5] text-gray-800 font-sans select-none relative">
            {/* Top Bar: Tabs */}
            <div className="flex px-2 pt-2 gap-1 overflow-x-auto no-scrollbar items-end">
                {/* Active Tab */}
                <div className="w-60 h-9 bg-white rounded-t-lg flex items-center px-3 text-xs shadow-sm relative z-10 group">
                    <span className="truncate flex-1 text-gray-700">
                        {activeTab === 'home' ? '新标签页' : activeTab === 'history' ? '历史记录' : url}
                    </span>
                    <button className="p-1 rounded-full hover:bg-gray-200 opacity-0 group-hover:opacity-100 transition-opacity">
                        <Icons.CloseTab className="w-3 h-3 text-gray-500" />
                    </button>
                    {/* Tab Separator simulation if needed, but not critical */}
                </div>
                {/* New Tab Button */}
                <button className="w-7 h-7 flex items-center justify-center hover:bg-white/40 rounded-full text-gray-600 mb-1 transition-colors">
                    <span className="text-xl font-light">+</span>
                </button>
            </div>

            {/* Toolbar (Omnibox) */}
            <div className="bg-white p-2 flex items-center gap-2 border-b border-gray-200 shadow-sm z-20 relative">
                <div className="flex gap-1 text-gray-500">
                    <button className="p-1.5 hover:bg-gray-100 rounded-full disabled:opacity-30"><Icons.ArrowLeft className="w-4 h-4" /></button>
                    <button className="p-1.5 hover:bg-gray-100 rounded-full disabled:opacity-30"><Icons.ArrowRight className="w-4 h-4" /></button>
                    <button onClick={() => navigate(url)} className="p-1.5 hover:bg-gray-100 rounded-full"><Icons.Refresh className="w-3.5 h-3.5" /></button>
                    <button onClick={() => navigate('https://google.com')} className="p-1.5 hover:bg-gray-100 rounded-full"><Icons.Home className="w-4 h-4" /></button>
                </div>

                <div className="flex-1 bg-[#f1f3f4] rounded-full px-4 py-1.5 flex items-center text-sm group focus-within:bg-white focus-within:shadow-md focus-within:ring-2 focus-within:ring-blue-100 border border-transparent focus-within:border-blue-300 transition-all relative">
                    {url.startsWith('https') && <span className="text-green-600 mr-2 text-xs">🔒</span>}
                    <input
                        type="text"
                        className="flex-1 bg-transparent outline-none text-gray-700"
                        value={inputValue}
                        onChange={(e) => setInputValue(e.target.value)}
                        onKeyDown={handleKeyDown}
                        onFocus={(e) => e.target.select()}
                    />
                    <button className="p-1 hover:bg-gray-200 rounded-full text-gray-400 hover:text-blue-500">
                        <Icons.Star className="w-4 h-4" />
                    </button>
                </div>

                {/* Avatar / Profile */}
                <div className="w-7 h-7 rounded-full bg-orange-100 flex items-center justify-center border border-gray-200 cursor-pointer overflow-hidden">
                    <span className="text-xs font-bold text-orange-600">S</span>
                </div>

                {/* Menu Button */}
                <div className="relative" ref={menuRef}>
                    <button
                        className={`p-1.5 rounded-full hover:bg-gray-100 text-gray-600 ${showMenu ? 'bg-gray-200' : ''}`}
                        onClick={() => setShowMenu(!showMenu)}
                    >
                        <Icons.Menu className="w-4 h-4" />
                    </button>

                    {/* Dropdown Menu */}
                    {showMenu && (
                        <div className="absolute right-0 top-full mt-1 w-64 bg-white rounded-md shadow-xl border border-gray-200 py-2 z-50 text-sm font-sans">
                            <div className="px-4 py-1.5 hover:bg-gray-100 cursor-pointer flex justify-between">
                                <span>新标签页</span>
                                <span className="text-gray-400 text-xs text-right">⌘T</span>
                            </div>
                            <div className="px-4 py-1.5 hover:bg-gray-100 cursor-pointer flex justify-between">
                                <span>新窗口</span>
                                <span className="text-gray-400 text-xs text-right">⌘N</span>
                            </div>
                            <div className="my-1 border-t border-gray-200"></div>
                            <div
                                className="px-4 py-1.5 hover:bg-gray-100 cursor-pointer flex justify-between"
                                onClick={() => {
                                    navigate('chrome://history');
                                    setShowMenu(false);
                                }}
                            >
                                <span>历史记录</span>
                                <span className="text-gray-400 text-xs text-right">⌘Y</span>
                            </div>
                            <div className="px-4 py-1.5 hover:bg-gray-100 cursor-pointer flex justify-between">
                                <span>下载内容</span>
                                <span className="text-gray-400 text-xs text-right">⌘J</span>
                            </div>
                            <div className="my-1 border-t border-gray-200"></div>
                            <div className="px-4 py-1.5 hover:bg-gray-100 cursor-pointer">设置</div>
                            <div className="px-4 py-1.5 hover:bg-gray-100 cursor-pointer">帮助</div>
                            <div className="my-1 border-t border-gray-200"></div>
                            <div
                                className="px-4 py-1.5 hover:bg-gray-100 cursor-pointer flex justify-between group"
                                onClick={toggleDevTools}
                            >
                                <span>更多工具</span>
                                <span className="text-gray-400 text-xs text-right">▶</span>
                                {/* Submenu mockup could go here, but simple toggle for now */}
                            </div>
                            <div
                                className="px-4 py-1.5 hover:bg-gray-100 cursor-pointer flex justify-between"
                                onClick={toggleDevTools}
                            >
                                <span>开发者工具</span>
                                <span className="text-gray-400 text-xs text-right">F12</span>
                            </div>
                        </div>
                    )}
                </div>
            </div>

            {/* Content Area */}
            <div className={`flex-1 overflow-auto relative bg-white ${showDevTools ? 'h-1/2' : 'h-full'}`}>

                {/* 1. Home / New Tab */}
                {activeTab === 'home' && (
                    <div className="flex flex-col items-center justify-center h-full pb-32">
                        <div className="text-6xl font-bold text-gray-300 mb-8 select-none">Google</div>
                        <div className="w-full max-w-lg bg-white border border-gray-200 shadow-sm rounded-full px-5 py-3 hover:shadow-md transition-shadow flex items-center gap-3 relative group">
                            <span className="text-gray-400"><Icons.Search className="w-4 h-4" /></span>
                            <input
                                type="text"
                                className="flex-1 outline-none"
                                placeholder="在 Google 上搜索，或者输入一个网址"
                                onKeyDown={(e) => {
                                    if (e.key === 'Enter') navigate('https://google.com/search?q=' + e.currentTarget.value)
                                }}
                            />
                        </div>
                        {/* Mock Shortcuts */}
                        <div className="grid grid-cols-4 gap-8 mt-12">
                            {[
                                { name: '百度贴吧', color: 'bg-blue-100 text-blue-500', action: () => navigate('tieba.baidu.com/f?kw=lingyi') },
                                { name: '知乎', color: 'bg-blue-50 text-blue-600', action: () => navigate('zhihu.com') },
                                { name: '4chan', color: 'bg-green-100 text-green-700', action: () => navigate('4chan.org/x/') },
                                { name: '深夜食堂', color: 'bg-amber-100 text-amber-700', action: () => navigate('late-night-canteen.net') },
                            ].map((item, i) => (
                                <div key={i} className="flex flex-col items-center gap-4 cursor-pointer group" onClick={item.action}>
                                    <div className={`w-12 h-12 rounded-full flex items-center justify-center text-xl ${item.color} group-hover:bg-white group-hover:shadow-md transition-all`}>
                                        {item.name[0]}
                                    </div>
                                    <span className="text-xs text-gray-600">{item.name}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {/* 2. History Page */}
                {activeTab === 'history' && (
                    <div className="max-w-4xl mx-auto py-8 px-8">
                        <h1 className="text-2xl font-medium text-gray-700 mb-8">历史记录</h1>

                        <div className="bg-white shadow-sm rounded-lg border border-gray-100 overflow-hidden">
                            <div className="px-6 py-4 border-b border-gray-100 bg-gray-50/50">
                                <h3 className="font-medium text-gray-600">今天</h3>
                            </div>

                            {history.map((item, index) => {
                                const isAnomaly = item.url === 'about:blank' && item.isAnomalous;

                                return (
                                    <div key={index}
                                        onClick={() => !item.isDeleted && navigate(item.url)}
                                        className={`px-6 py-3 flex items-center gap-4 hover:bg-gray-50 border-b border-gray-50 last:border-0 group transition-colors cursor-pointer
                                         ${item.isDeleted ? 'opacity-50 grayscale cursor-not-allowed' : ''}
                                         ${isAnomaly ? 'bg-red-50/10 hover:bg-red-50/30' : ''}
                                     `}>
                                        <div className="text-xs text-gray-400 w-16 tabular-nums">
                                            {new Date(item.time).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                        </div>
                                        <div className="w-4 h-4 text-center text-xs opacity-50">
                                            {item.favicon}
                                        </div>
                                        <div className="flex-1 min-w-0">
                                            <div className={`text-sm truncate font-medium ${isAnomaly ? 'text-red-900 font-mono tracking-wider' : 'text-gray-700'}`}>
                                                {item.title}
                                                {item.isDeleted && <span className="ml-2 text-xs text-red-400 border border-red-200 px-1 rounded">已删除</span>}
                                            </div>
                                            <div className={`text-xs truncate ${isAnomaly ? 'text-red-400/60' : 'text-gray-400'}`}>
                                                {item.url}
                                            </div>
                                        </div>
                                        <button className="text-gray-300 hover:text-gray-600 opacity-0 group-hover:opacity-100">
                                            <Icons.Menu className="w-4 h-4 rotate-90" />
                                        </button>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                )}

                {/* 3. Browser Content Page */}
                {activeTab === 'page' && (
                    <BrowserContent url={url} navigate={navigate} />
                )}

                {/* 4. Error / Other */}
                {activeTab === 'error' && (
                    <div className="flex flex-col items-center justify-center h-full text-center p-8">
                        <div className="text-6xl mb-6 grayscale opacity-20 select-none">🦖</div>
                        <h2 className="text-2xl font-bold text-gray-700 mb-2">未连接到互联网</h2>
                        <p className="text-gray-500 max-w-md text-sm">
                            试试以下办法：
                            <br />• 检查网线、调制解调器和路由器
                            <br />• 重新连接到 Wi-Fi
                        </p>
                        <div className="text-xs text-gray-400 mt-8 font-mono">ERR_INTERNET_DISCONNECTED</div>
                    </div>
                )}
            </div>

            {/* DevTools Split Pane */}
            {showDevTools && (
                <div className="h-64 flex-shrink-0">
                    <DevTools onClose={() => setShowDevTools(false)} />
                </div>
            )}
        </div>
    );
};
