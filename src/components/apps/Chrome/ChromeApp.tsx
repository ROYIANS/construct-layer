import { useState, useEffect } from 'react';
import { browserHistory } from '@/data/Chapter1Files';
import { useGameStore } from '@/stores/useGameStore';
import { motion } from 'framer-motion';

export const ChromeApp = () => {
    const [url, setUrl] = useState('https://google.com');
    const [inputValue, setInputValue] = useState('https://google.com');
    const [history, setHistory] = useState<any[]>(browserHistory);
    const [activeTab, setActiveTab] = useState('home'); // home, history, error, page

    // Game state tracking
    const { setFlag, addDiscoveredClue, flags } = useGameStore();

    const navigate = (newUrl: string) => {
        setUrl(newUrl);
        setInputValue(newUrl);

        if (newUrl === 'chrome://history') {
            setActiveTab('history');
            // Mark history as viewed
            if (!flags['viewed_browser_history']) {
                setFlag('viewed_browser_history', true);
                // If viewed history + wechat + doc -> Clue Trigger check will happen in system
            }
        } else if (newUrl.includes('google.com')) {
            setActiveTab('home');
        } else {
            // Mock error for now unless it's a specific page we want to mock
            setActiveTab('error');
        }
    };

    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter') {
            navigate(inputValue);
        }
    };

    return (
        <div className="flex flex-col h-full bg-white text-gray-800 font-sans">
            {/* Top Bar: Tabs & Address */}
            <div className="bg-[#dee1e6] p-2 pb-0 flex flex-col gap-2">
                {/* Tabs */}
                <div className="flex items-end gap-1 px-2">
                    <div className="w-48 h-8 bg-white rounded-t-lg flex items-center px-3 text-xs shadow-sm relative">
                        <span className="truncate flex-1">
                            {activeTab === 'home' ? 'New Tab' : activeTab === 'history' ? 'History' : url}
                        </span>
                        <span className="text-gray-400 hover:text-gray-600 cursor-pointer">×</span>
                    </div>
                    <div className="w-8 h-8 flex items-center justify-center text-gray-600 hover:bg-gray-300 rounded-full cursor-pointer text-lg">
                        +
                    </div>
                </div>

                {/* Toolbar */}
                <div className="bg-white rounded-lg p-2 flex items-center gap-3 shadow-sm mb-1">
                    <div className="flex gap-2 text-gray-500">
                        <button onClick={() => { }} className="hover:bg-gray-100 p-1 rounded-full">←</button>
                        <button onClick={() => { }} className="hover:bg-gray-100 p-1 rounded-full">→</button>
                        <button onClick={() => navigate(url)} className="hover:bg-gray-100 p-1 rounded-full">↻</button>
                    </div>

                    <div className="flex-1 bg-[#f1f3f4] rounded-full px-4 py-1.5 flex items-center text-sm group focus-within:bg-white focus-within:shadow-sm focus-within:ring-2 focus-within:ring-blue-200 transition-all">
                        {inputValue.startsWith('https') && <span className="text-gray-400 mr-2">🔒</span>}
                        <input
                            type="text"
                            className="flex-1 bg-transparent outline-none text-gray-700"
                            value={inputValue}
                            onChange={(e) => setInputValue(e.target.value)}
                            onKeyDown={handleKeyDown}
                        />
                        <span className="text-gray-400 hover:text-gray-600 cursor-pointer text-xs" onClick={() => setInputValue('')}>✕</span>
                    </div>

                    <div className="text-gray-500 hover:bg-gray-100 p-1 rounded-full cursor-pointer" onClick={() => navigate('chrome://history')}>
                        ⋮
                    </div>
                </div>
            </div>

            {/* Content Area */}
            <div className="flex-1 overflow-auto relative">

                {/* 1. Home / New Tab */}
                {activeTab === 'home' && (
                    <div className="flex flex-col items-center justify-center h-full pb-32">
                        <div className="text-6xl font-bold text-gray-300 mb-8 select-none">Google</div>
                        <div className="w-full max-w-lg bg-white border border-gray-200 shadow-sm rounded-full px-5 py-3 hover:shadow-md transition-shadow flex items-center gap-3">
                            <span className="text-gray-400">🔍</span>
                            <input
                                type="text"
                                className="flex-1 outline-none"
                                placeholder="Search Google or type a URL"
                                onKeyDown={(e) => {
                                    if (e.key === 'Enter') navigate('https://google.com/search?q=' + e.currentTarget.value)
                                }}
                            />
                        </div>
                        {/* Mock Shortcuts */}
                        <div className="grid grid-cols-4 gap-8 mt-12">
                            {[
                                { name: 'YouTube', color: 'bg-red-100 text-red-500' },
                                { name: 'Bilibili', color: 'bg-pink-100 text-pink-500' },
                                { name: 'GitHub', color: 'bg-gray-100 text-gray-700' },
                                { name: 'History', color: 'bg-blue-100 text-blue-500', action: () => navigate('chrome://history') }
                            ].map((item, i) => (
                                <div key={i} className="flex flex-col items-center gap-2 cursor-pointer group" onClick={item.action}>
                                    <div className={`w-12 h-12 rounded-full flex items-center justify-center text-xl ${item.color} group-hover:shadow-md transition-all`}>
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
                        <h1 className="text-2xl font-medium text-gray-700 mb-8">History</h1>

                        <div className="bg-white shadow-sm rounded-lg border border-gray-100 overflow-hidden">
                            {/* Group by date roughly (mock grouping) */}
                            <div className="px-6 py-4 border-b border-gray-100 bg-gray-50/50">
                                <h3 className="font-medium text-gray-600">Recent</h3>
                            </div>

                            {history.map((item, index) => {
                                const isAnomaly = item.url === 'about:blank' && item.isAnomalous;

                                // For the anomaly array, we might want to collapse it or show a scary amount
                                // Let's show the first few normal ones, then the anomaly block

                                return (
                                    <div key={index} className={`px-6 py-3 flex items-center gap-4 hover:bg-gray-50 border-b border-gray-50 last:border-0 group transition-colors
                                         ${item.isDeleted ? 'opacity-50 grayscale' : ''}
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
                                                {item.isDeleted && <span className="ml-2 text-xs text-red-400 border border-red-200 px-1 rounded">DELETED</span>}
                                            </div>
                                            <div className={`text-xs truncate ${isAnomaly ? 'text-red-400/60' : 'text-gray-400'}`}>
                                                {item.url}
                                            </div>
                                        </div>
                                        <button className="text-gray-300 hover:text-gray-600 opacity-0 group-hover:opacity-100">
                                            ⋮
                                        </button>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                )}

                {/* 3. Error / Other */}
                {activeTab === 'error' && (
                    <div className="flex flex-col items-center justify-center h-full text-center p-8">
                        <div className="text-6xl mb-6 grayscale opacity-20">🦖</div>
                        <h2 className="text-2xl font-bold text-gray-700 mb-2">No internet</h2>
                        <p className="text-gray-500 max-w-md">
                            Try:
                            <br />• Checking the network cables, modem, and router
                            <br />• Reconnecting to Wi-Fi
                        </p>
                        <div className="text-xs text-gray-400 mt-8 font-mono">ERR_INTERNET_DISCONNECTED</div>
                    </div>
                )}
            </div>
        </div>
    );
};
