import { useState, useRef, useEffect } from 'react';
import { browserHistory } from '@/data/Chapter1Files';
import { useGameStore } from '@/stores/useGameStore';
import { BrowserContent } from './BrowserContent';
import { DevTools } from './DevTools';
import { Icons } from '../../os/Icons';

interface ChromeTab {
    id: string;
    url: string;
    title: string;
    activeTab: 'home' | 'history' | 'error' | 'page';
}

export const ChromeApp = () => {
    // 标签页管理
    const [tabs, setTabs] = useState<ChromeTab[]>([
        { id: '1', url: 'https://google.com', title: '新标签页', activeTab: 'home' }
    ]);
    const [activeTabId, setActiveTabId] = useState('1');
    const [inputValue, setInputValue] = useState('https://google.com');
    const [history] = useState<any[]>(browserHistory);
    const [showMenu, setShowMenu] = useState(false);
    const [showDevTools, setShowDevTools] = useState(false);
    const [isMobile, setIsMobile] = useState(false);
    const menuRef = useRef<HTMLDivElement>(null);

    // Game state tracking
    const { setFlag, flags } = useGameStore();

    // 获取当前活动标签页
    const currentTab = tabs.find(tab => tab.id === activeTabId) || tabs[0];

    // 更新输入框以反映当前标签页URL
    useEffect(() => {
        if (currentTab) {
            setInputValue(currentTab.url);
        }
    }, [activeTabId, currentTab]);

    // 新建标签页
    const createNewTab = () => {
        const newTabId = Date.now().toString();
        const newTab: ChromeTab = {
            id: newTabId,
            url: 'https://google.com',
            title: '新标签页',
            activeTab: 'home'
        };
        setTabs([...tabs, newTab]);
        setActiveTabId(newTabId);
        setInputValue('https://google.com');
    };

    // 关闭标签页
    const closeTab = (e: React.MouseEvent, tabId: string) => {
        e.stopPropagation();

        // 如果只有一个标签页，创建新标签页而不是关闭
        if (tabs.length === 1) {
            const newTabId = Date.now().toString();
            const newTab: ChromeTab = {
                id: newTabId,
                url: 'https://google.com',
                title: '新标签页',
                activeTab: 'home'
            };
            setTabs([newTab]);
            setActiveTabId(newTabId);
            return;
        }

        const newTabs = tabs.filter(tab => tab.id !== tabId);
        setTabs(newTabs);

        // 如果关闭的是当前标签页，切换到相邻标签页
        if (tabId === activeTabId) {
            const tabIndex = tabs.findIndex(tab => tab.id === tabId);
            const nextTab = newTabs[Math.min(tabIndex, newTabs.length - 1)];
            setActiveTabId(nextTab.id);
        }
    };

    // 切换标签页
    const switchTab = (tabId: string) => {
        setActiveTabId(tabId);
    };

    // 检测移动设备
    useEffect(() => {
        const checkMobile = () => {
            setIsMobile(window.innerWidth < 768);
        };
        checkMobile();
        window.addEventListener('resize', checkMobile);
        return () => window.removeEventListener('resize', checkMobile);
    }, []);

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

        // 确定标签页类型
        let tabType: 'home' | 'history' | 'error' | 'page' = 'error';
        let title = targetUrl;

        if (targetUrl === 'chrome://history') {
            tabType = 'history';
            title = '历史记录';
            if (!flags['viewed_browser_history']) {
                setFlag('viewed_browser_history', true);
            }
        } else if (targetUrl.includes('google.com') && !targetUrl.includes('search?')) {
            tabType = 'home';
            title = '新标签页';
        } else if (
            targetUrl.includes('tieba.baidu.com') ||
            targetUrl.includes('zhihu.com') ||
            targetUrl.includes('4chan.org') ||
            targetUrl.includes('late-night')
        ) {
            tabType = 'page';
            // 提取网站名称作为标题
            if (targetUrl.includes('tieba.baidu.com')) title = '百度贴吧';
            else if (targetUrl.includes('zhihu.com')) title = '知乎';
            else if (targetUrl.includes('4chan.org')) title = '4chan';
            else if (targetUrl.includes('late-night')) title = '深夜食堂';
        }

        // 更新当前标签页
        setTabs(tabs.map(tab =>
            tab.id === activeTabId
                ? { ...tab, url: targetUrl, title, activeTab: tabType }
                : tab
        ));
        setInputValue(targetUrl);
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
            {/* Top Bar: Tabs - 在移动端简化 */}
            {!isMobile && (
                <div className="flex px-2 pt-2 gap-1 overflow-x-auto no-scrollbar items-end">
                    {/* 所有标签页 */}
                    {tabs.map((tab) => (
                        <div
                            key={tab.id}
                            onClick={() => switchTab(tab.id)}
                            className={`w-60 h-9 rounded-t-lg flex items-center px-3 text-xs shadow-sm relative z-10 group cursor-pointer transition-colors ${
                                tab.id === activeTabId
                                    ? 'bg-white'
                                    : 'bg-gray-200 hover:bg-gray-100'
                            }`}
                        >
                            <span className="truncate flex-1 text-gray-700">
                                {tab.title}
                            </span>
                            <button
                                onClick={(e) => closeTab(e, tab.id)}
                                className={`p-1 rounded-full hover:bg-gray-300 transition-opacity ${
                                    tab.id === activeTabId ? 'opacity-0 group-hover:opacity-100' : 'opacity-60'
                                }`}
                            >
                                <Icons.CloseTab className="w-3 h-3 text-gray-500" />
                            </button>
                        </div>
                    ))}
                    {/* New Tab Button */}
                    <button
                        onClick={createNewTab}
                        className="w-7 h-7 flex items-center justify-center hover:bg-white/40 rounded-full text-gray-600 mb-1 transition-colors"
                        title="新建标签页"
                    >
                        <span className="text-xl font-light">+</span>
                    </button>
                </div>
            )}

            {/* Toolbar (Omnibox) - 移动端优化 */}
            <div className={`bg-white flex items-center gap-2 border-b border-gray-200 shadow-sm z-20 relative ${isMobile ? 'p-1.5' : 'p-2'}`}>
                {/* 移动端简化按钮组 */}
                <div className="flex gap-0.5 text-gray-500">
                    {!isMobile && (
                        <>
                            <button className="p-1.5 hover:bg-gray-100 rounded-full disabled:opacity-30"><Icons.ArrowLeft className="w-4 h-4" /></button>
                            <button className="p-1.5 hover:bg-gray-100 rounded-full disabled:opacity-30"><Icons.ArrowRight className="w-4 h-4" /></button>
                        </>
                    )}
                    <button
                        onClick={() => navigate(currentTab.url)}
                        className={`hover:bg-gray-100 rounded-full ${isMobile ? 'p-2' : 'p-1.5'}`}
                        title="刷新"
                    >
                        <Icons.Refresh className={isMobile ? 'w-4 h-4' : 'w-3.5 h-3.5'} />
                    </button>
                    {!isMobile && (
                        <button onClick={() => navigate('https://google.com')} className="p-1.5 hover:bg-gray-100 rounded-full"><Icons.Home className="w-4 h-4" /></button>
                    )}
                </div>

                {/* 地址栏 - 移动端优化 */}
                <div className={`flex-1 bg-[#f1f3f4] rounded-full flex items-center text-sm group focus-within:bg-white focus-within:shadow-md focus-within:ring-2 focus-within:ring-blue-100 border border-transparent focus-within:border-blue-300 transition-all relative ${isMobile ? 'px-3 py-2' : 'px-4 py-1.5'}`}>
                    {currentTab.url.startsWith('https') && !isMobile && <span className="text-green-600 mr-2 text-xs">🔒</span>}
                    <input
                        type="text"
                        className={`flex-1 bg-transparent outline-none text-gray-700 ${isMobile ? 'text-base' : ''}`}
                        value={inputValue}
                        onChange={(e) => setInputValue(e.target.value)}
                        onKeyDown={handleKeyDown}
                        onFocus={(e) => e.target.select()}
                        placeholder={isMobile ? "搜索或输入网址" : ""}
                    />
                    {!isMobile && (
                        <button className="p-1 hover:bg-gray-200 rounded-full text-gray-400 hover:text-blue-500">
                            <Icons.Star className="w-4 h-4" />
                        </button>
                    )}
                </div>

                {/* 桌面端才显示头像 */}
                {!isMobile && (
                    <div className="w-7 h-7 rounded-full bg-orange-100 flex items-center justify-center border border-gray-200 cursor-pointer overflow-hidden">
                        <span className="text-xs font-bold text-orange-600">S</span>
                    </div>
                )}

                {/* Menu Button - 移动端增大触摸区域 */}
                <div className="relative" ref={menuRef}>
                    <button
                        className={`rounded-full hover:bg-gray-100 text-gray-600 ${showMenu ? 'bg-gray-200' : ''} ${isMobile ? 'p-2' : 'p-1.5'}`}
                        onClick={() => setShowMenu(!showMenu)}
                    >
                        <Icons.Menu className="w-4 h-4" />
                    </button>

                    {/* Dropdown Menu */}
                    {showMenu && (
                        <div className="absolute right-0 top-full mt-1 w-64 bg-white rounded-md shadow-xl border border-gray-200 py-2 z-50 text-sm font-sans">
                            <div
                                className="px-4 py-1.5 hover:bg-gray-100 cursor-pointer flex justify-between"
                                onClick={() => {
                                    createNewTab();
                                    setShowMenu(false);
                                }}
                            >
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
                {currentTab.activeTab === 'home' && (
                    <div className="flex flex-col items-center justify-center h-full pb-32 px-4">
                        <div className={`font-bold text-gray-300 mb-8 select-none ${isMobile ? 'text-4xl' : 'text-6xl'}`}>Google</div>
                        <div className="w-full max-w-lg bg-white border border-gray-200 shadow-sm rounded-full px-5 py-3 hover:shadow-md transition-shadow flex items-center gap-3 relative group">
                            <span className="text-gray-400"><Icons.Search className="w-4 h-4" /></span>
                            <input
                                type="text"
                                className="flex-1 outline-none text-base"
                                placeholder="在 Google 上搜索，或者输入一个网址"
                                onKeyDown={(e) => {
                                    if (e.key === 'Enter') navigate('https://google.com/search?q=' + e.currentTarget.value)
                                }}
                            />
                        </div>
                        {/* Mock Shortcuts - 移动端响应式 */}
                        <div className={`grid gap-8 mt-12 ${isMobile ? 'grid-cols-2' : 'grid-cols-4'}`}>
                            {[
                                { name: '百度贴吧', color: 'bg-blue-100 text-blue-500', action: () => navigate('tieba.baidu.com/f?kw=lingyi') },
                                { name: '知乎', color: 'bg-blue-50 text-blue-600', action: () => navigate('zhihu.com') },
                                { name: '4chan', color: 'bg-green-100 text-green-700', action: () => navigate('4chan.org/x/') },
                                { name: '深夜食堂', color: 'bg-amber-100 text-amber-700', action: () => navigate('late-night-canteen.net') },
                            ].map((item, i) => (
                                <div key={i} className="flex flex-col items-center gap-4 cursor-pointer group" onClick={item.action}>
                                    <div className={`rounded-full flex items-center justify-center text-xl ${item.color} group-hover:bg-white group-hover:shadow-md transition-all ${isMobile ? 'w-16 h-16' : 'w-12 h-12'}`}>
                                        {item.name[0]}
                                    </div>
                                    <span className="text-xs text-gray-600">{item.name}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {/* 2. History Page */}
                {currentTab.activeTab === 'history' && (
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
                {currentTab.activeTab === 'page' && (
                    <BrowserContent url={currentTab.url} navigate={navigate} />
                )}

                {/* 4. Error / Other */}
                {currentTab.activeTab === 'error' && (
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
