import React, { useState } from 'react';

export const DevTools = ({ onClose }: { onClose: () => void }) => {
    const [activeTab, setActiveTab] = useState('elements');

    return (
        <div className="h-64 flex flex-col bg-white border-t border-gray-300 font-sans text-xs">
            {/* Header */}
            <div className="flex bg-[#f1f3f4] border-b border-gray-300">
                <div className="flex">
                    {['Elements', 'Console', 'Sources', 'Network', 'Performance', 'Memory', 'Application', 'Security', 'Lighthouse'].map(tab => (
                        <button
                            key={tab}
                            onClick={() => setActiveTab(tab.toLowerCase())}
                            className={`px-3 py-1 border-b-2 hover:bg-[#dee1e6] transition-colors ${activeTab === tab.toLowerCase() ? 'border-blue-500 text-gray-800' : 'border-transparent text-gray-600'}`}
                        >
                            {tab}
                        </button>
                    ))}
                </div>
                <div className="flex-1 flex justify-end px-2 items-center">
                    <button onClick={onClose} className="text-gray-500 hover:text-gray-800">×</button>
                </div>
            </div>

            {/* Content */}
            <div className="flex-1 overflow-auto font-mono p-2 bg-white">
                {activeTab === 'elements' && (
                    <div className="text-gray-600">
                        <div className="pl-0 text-[#800]">&lt;!DOCTYPE html&gt;</div>
                        <div className="pl-0 text-[#800]">&lt;html lang="zh-CN"&gt;</div>
                        <div className="pl-4 text-[#800]">&lt;head&gt;...&lt;/head&gt;</div>
                        <div className="pl-4 text-[#800]">&lt;body&gt;</div>
                        <div className="pl-8 text-[#800]">&lt;div id="app"&gt;</div>
                        <div className="pl-12 text-[#1a1aa6]">&lt;!--
                            WARNING: SYSTEM INSTABILITY DETECTED
                            CORE INTEGRITY: 96.4%
                            TRACE: L1_CONSTRUCT_LAYER
                            --&gt;</div>
                        <div className="pl-12 text-[#800]">&lt;div className="glitch-overlay" style="opacity: 0"&gt;&lt;/div&gt;</div>
                        <div className="pl-8 text-[#800]">&lt;/div&gt;</div>
                        <div className="pl-4 text-[#800]">&lt;/body&gt;</div>
                        <div className="pl-0 text-[#800]">&lt;/html&gt;</div>
                    </div>
                )}
                {activeTab === 'console' && (
                    <div className="space-y-1">
                        <div className="flex gap-2 border-b border-gray-100 pb-1">
                            <span className="text-gray-400">VM127:1</span>
                            <span className="text-gray-800">Navigated to <span className="underline text-blue-600">https://late-night-canteen.net</span></span>
                        </div>
                        <div className="flex gap-2 border-b border-gray-100 pb-1 bg-yellow-50">
                            <span className="text-yellow-600">⚠️</span>
                            <span className="text-yellow-900">DevTools failed to load source map: Could not load content for chrome-extension://...</span>
                        </div>
                        <div className="flex gap-2 border-b border-gray-100 pb-1 bg-red-50">
                            <span className="text-red-600">❌</span>
                            <span className="text-red-800">Uncaught Error: Connection refused by target machine (NODE-07)</span>
                        </div>
                        <div className="flex gap-2 border-b border-gray-100 pb-1">
                            <span className="text-blue-500">➜</span>
                            <span className="text-gray-400">_</span>
                        </div>
                    </div>
                )}
                {activeTab === 'network' && (
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="bg-gray-100 text-gray-600">
                                <th className="p-1 font-normal w-1/4">Name</th>
                                <th className="p-1 font-normal w-16">Status</th>
                                <th className="p-1 font-normal w-16">Type</th>
                                <th className="p-1 font-normal w-16">Size</th>
                                <th className="p-1 font-normal">Time</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td className="p-1 text-gray-800">index.html</td>
                                <td className="p-1 text-green-600">200</td>
                                <td className="p-1 text-gray-600">document</td>
                                <td className="p-1 text-gray-600">1.4 kB</td>
                                <td className="p-1 text-gray-600">20ms</td>
                            </tr>
                            <tr>
                                <td className="p-1 text-gray-800">main.js</td>
                                <td className="p-1 text-green-600">200</td>
                                <td className="p-1 text-gray-600">script</td>
                                <td className="p-1 text-gray-600">450 kB</td>
                                <td className="p-1 text-gray-600">120ms</td>
                            </tr>
                            <tr>
                                <td className="p-1 text-red-600">analytics.track</td>
                                <td className="p-1 text-red-600">500</td>
                                <td className="p-1 text-gray-600">xhr</td>
                                <td className="p-1 text-gray-600">0 B</td>
                                <td className="p-1 text-gray-600">502ms</td>
                            </tr>
                        </tbody>
                    </table>
                )}
                {/* Fallback for others */}
                {['sources', 'performance', 'memory', 'application', 'security', 'lighthouse'].includes(activeTab) && (
                    <div className="flex items-center justify-center h-full text-gray-400 italic">
                        No data available for this session.
                    </div>
                )}
            </div>
        </div>
    );
};
