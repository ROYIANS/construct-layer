import { useState } from 'react';
import { GameIcons } from '@/components/ui/GameIcons';

interface SettingsPageProps {
    onBack: () => void;
}

export const SettingsPage = ({ onBack }: SettingsPageProps) => {
    const [masterVolume, setMasterVolume] = useState(80);
    const [musicVolume, setMusicVolume] = useState(70);
    const [sfxVolume, setSfxVolume] = useState(85);
    const [textSpeed, setTextSpeed] = useState(50);
    const [autoSaveEnabled, setAutoSaveEnabled] = useState(true);
    const [fullscreen, setFullscreen] = useState(false);

    const handleClearAllSaves = () => {
        if (confirm('确定要清除所有存档吗？此操作无法撤销！')) {
            alert('存档已清除');
        }
    };

    const handleExportSaves = () => alert('存档导出功能开发中...');
    const handleImportSaves = () => alert('存档导入功能开发中...');

    const toggleFullscreen = () => {
        if (!document.fullscreenElement) {
            document.documentElement.requestFullscreen();
            setFullscreen(true);
        } else {
            document.exitFullscreen();
            setFullscreen(false);
        }
    };

    return (
        <div className="fixed inset-0 bg-[#f5f5f0] flex flex-col font-serif">
            {/* Background Texture */}
            <div className="absolute inset-0 opacity-10 pointer-events-none"
                style={{
                    backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%239C92AC' fill-opacity='0.4'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
                }}
            />

            {/* Header */}
            <div className="h-24 flex items-center justify-between px-8 md:px-16 z-10">
                <button
                    onClick={onBack}
                    className="flex items-center gap-2 px-4 py-2 text-amber-900/60 hover:text-amber-900 hover:bg-amber-900/5 rounded-full transition-all"
                >
                    <GameIcons.ArrowLeft size={20} />
                    <span className="tracking-widest font-bold">RETURN</span>
                </button>

                <div className="flex flex-col items-center">
                    <h1 className="text-3xl font-bold text-gray-800 tracking-[0.2em]">系统设置</h1>
                    <div className="w-12 h-1 bg-amber-600 mt-2 opacity-30" />
                </div>

                <div className="w-24"></div>
            </div>

            {/* Content */}
            <div className="flex-1 overflow-auto p-8 z-10">
                <div className="max-w-4xl mx-auto space-y-8">
                    {/* 音频设置 */}
                    <div className="bg-white rounded-sm shadow-sm p-8 max-w-2xl mx-auto">
                        <h2 className="text-xl font-bold text-gray-800 mb-6 flex items-center gap-3 border-b border-gray-100 pb-4">
                            <span className="text-amber-600">AUDIO</span>
                            <span className="text-gray-400 text-sm font-normal">音频控制</span>
                        </h2>

                        <div className="space-y-6">
                            {[
                                { label: '主音量', value: masterVolume, set: setMasterVolume },
                                { label: '背景音乐', value: musicVolume, set: setMusicVolume },
                                { label: '音效', value: sfxVolume, set: setSfxVolume }
                            ].map((item, i) => (
                                <div key={i}>
                                    <div className="flex items-center justify-between mb-2">
                                        <label className="text-gray-600 text-sm tracking-wider font-bold">{item.label}</label>
                                        <span className="text-amber-600 font-mono text-xs">{item.value}%</span>
                                    </div>
                                    <input
                                        type="range"
                                        min="0"
                                        max="100"
                                        value={item.value}
                                        onChange={(e) => item.set(Number(e.target.value))}
                                        className="w-full h-1 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-amber-600 hover:accent-amber-500"
                                    />
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* 游戏设置 */}
                    <div className="bg-white rounded-sm shadow-sm p-8 max-w-2xl mx-auto">
                        <h2 className="text-xl font-bold text-gray-800 mb-6 flex items-center gap-3 border-b border-gray-100 pb-4">
                            <span className="text-amber-600">GAMEPLAY</span>
                            <span className="text-gray-400 text-sm font-normal">游戏体验</span>
                        </h2>

                        <div className="space-y-6">
                            <div>
                                <div className="flex items-center justify-between mb-2">
                                    <label className="text-gray-600 text-sm tracking-wider font-bold">文字显示速度</label>
                                    <span className="text-amber-600 font-mono text-xs">
                                        {textSpeed < 30 ? 'SLOW' : textSpeed < 70 ? 'NORMAL' : 'FAST'}
                                    </span>
                                </div>
                                <input
                                    type="range"
                                    min="0"
                                    max="100"
                                    value={textSpeed}
                                    onChange={(e) => setTextSpeed(Number(e.target.value))}
                                    className="w-full h-1 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-amber-600"
                                />
                            </div>

                            <div className="flex items-center justify-between py-2">
                                <div>
                                    <label className="text-gray-800 font-bold text-sm tracking-wider block">自动存档</label>
                                    <p className="text-gray-400 text-xs mt-1">关键节点自动保存</p>
                                </div>
                                <button
                                    onClick={() => setAutoSaveEnabled(!autoSaveEnabled)}
                                    className={`w-12 h-6 rounded-full transition-colors relative ${autoSaveEnabled ? 'bg-amber-600' : 'bg-gray-200'
                                        }`}
                                >
                                    <div className={`absolute top-1 w-4 h-4 bg-white rounded-full transition-transform shadow-sm ${autoSaveEnabled ? 'translate-x-7' : 'translate-x-1'
                                        }`} />
                                </button>
                            </div>

                            <div className="flex items-center justify-between py-2 border-t border-gray-50 pt-4">
                                <div>
                                    <label className="text-gray-800 font-bold text-sm tracking-wider block">全屏模式</label>
                                    <p className="text-gray-400 text-xs mt-1">沉浸式体验</p>
                                </div>
                                <button
                                    onClick={toggleFullscreen}
                                    className={`px-4 py-1.5 text-xs font-bold rounded-sm border transition-colors ${fullscreen ? 'bg-amber-50 text-amber-800 border-amber-200' : 'bg-white text-gray-600 border-gray-200 hover:bg-gray-50'
                                        }`}
                                >
                                    {fullscreen ? 'EXIT FULLSCREEN' : 'ENABLE'}
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* 数据管理 */}
                    <div className="bg-white rounded-sm shadow-sm p-8 max-w-2xl mx-auto">
                        <h2 className="text-xl font-bold text-gray-800 mb-6 flex items-center gap-3 border-b border-gray-100 pb-4">
                            <span className="text-amber-600">DATA</span>
                            <span className="text-gray-400 text-sm font-normal">数据管理</span>
                        </h2>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            <button
                                onClick={handleExportSaves}
                                className="py-3 px-4 bg-gray-50 hover:bg-white border border-gray-200 hover:border-amber-200 text-gray-600 hover:text-amber-800 text-xs font-bold tracking-wider rounded-sm transition-all"
                            >
                                导出存档
                            </button>
                            <button
                                onClick={handleImportSaves}
                                className="py-3 px-4 bg-gray-50 hover:bg-white border border-gray-200 hover:border-amber-200 text-gray-600 hover:text-amber-800 text-xs font-bold tracking-wider rounded-sm transition-all"
                            >
                                导入存档
                            </button>
                            <button
                                onClick={handleClearAllSaves}
                                className="py-3 px-4 bg-red-50 hover:bg-red-100 border border-red-100 text-red-600 text-xs font-bold tracking-wider rounded-sm transition-all"
                            >
                                清除数据
                            </button>
                        </div>
                    </div>

                    {/* Game Info Footer */}
                    <div className="text-center text-gray-300 text-xs font-serif pt-8 pb-4">
                        <p>CONSTRUCT LAYER v0.1.0</p>
                        <p className="mt-2">CREATED BY XIAOMENGDAO</p>
                    </div>
                </div>
            </div>
        </div>
    );
};
