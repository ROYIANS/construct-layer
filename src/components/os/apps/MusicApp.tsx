import { useState, useRef, useEffect } from 'react';
import { musicLibrary, Song } from '@/data/MusicData';
import { Icons } from '../Icons';

export const MusicApp = () => {
    const [currentSong, setCurrentSong] = useState<Song | null>(musicLibrary[0] || null);
    const [isPlaying, setIsPlaying] = useState(false);
    const [currentTime, setCurrentTime] = useState(0);
    const [duration, setDuration] = useState(0);
    const [volume, setVolume] = useState(0.7);
    const [playMode, setPlayMode] = useState<'order' | 'loop' | 'random'>('order');
    const [activeMenu, setActiveMenu] = useState('find'); // find, podcast, my, local
    const [isMobile, setIsMobile] = useState(false);

    const audioRef = useRef<HTMLAudioElement>(null);

    // Mobile Check
    useEffect(() => {
        const checkMobile = () => setIsMobile(window.innerWidth < 768);
        checkMobile();
        window.addEventListener('resize', checkMobile);
        return () => window.removeEventListener('resize', checkMobile);
    }, []);

    // Init Audio
    useEffect(() => {
        if (audioRef.current) audioRef.current.volume = volume;
    }, [volume]);

    // Time Update & Auto Next
    useEffect(() => {
        const audio = audioRef.current;
        if (!audio) return;

        const updateTime = () => setCurrentTime(audio.currentTime);
        const updateDuration = () => setDuration(audio.duration);
        const handleEnded = () => {
            if (playMode === 'loop') {
                audio.currentTime = 0;
                audio.play();
            } else {
                handleNext();
            }
        };

        audio.addEventListener('timeupdate', updateTime);
        audio.addEventListener('loadedmetadata', updateDuration);
        audio.addEventListener('ended', handleEnded);

        return () => {
            audio.removeEventListener('timeupdate', updateTime);
            audio.removeEventListener('loadedmetadata', updateDuration);
            audio.removeEventListener('ended', handleEnded);
        };
    }, [playMode, currentSong]); // Added currentSong dep to ensure listeners are fresh

    const togglePlay = () => {
        if (!audioRef.current || !currentSong) return;
        if (isPlaying) {
            audioRef.current.pause();
        } else {
            audioRef.current.play();
        }
        setIsPlaying(!isPlaying);
    };

    const playSong = (song: Song) => {
        if (currentSong?.id === song.id) {
            togglePlay();
            return;
        }

        setCurrentSong(song);
        setCurrentTime(0);
        setIsPlaying(true);
        // React effect will handle src update if we passed it prop, but here we do it imperatively or let audio tag handle it via state
        // To be safe with react cycle:
        setTimeout(() => {
            if (audioRef.current) {
                audioRef.current.src = song.file;
                audioRef.current.play();
            }
        }, 0);
    };

    const handlePrev = () => {
        if (!currentSong) return;
        const currentIndex = musicLibrary.findIndex(s => s.id === currentSong.id);
        const prevIndex = (currentIndex - 1 + musicLibrary.length) % musicLibrary.length;
        playSong(musicLibrary[prevIndex]);
    };

    const handleNext = () => {
        if (!currentSong) return;
        let nextSong: Song;
        if (playMode === 'random') {
            const randomIndex = Math.floor(Math.random() * musicLibrary.length);
            nextSong = musicLibrary[randomIndex];
        } else {
            const currentIndex = musicLibrary.findIndex(s => s.id === currentSong.id);
            const nextIndex = (currentIndex + 1) % musicLibrary.length;
            nextSong = musicLibrary[nextIndex];
        }
        playSong(nextSong);
    };

    const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newTime = parseFloat(e.target.value);
        setCurrentTime(newTime);
        if (audioRef.current) audioRef.current.currentTime = newTime;
    };

    const formatTime = (seconds: number) => {
        if (isNaN(seconds)) return '0:00';
        const mins = Math.floor(seconds / 60);
        const secs = Math.floor(seconds % 60);
        return `${mins}:${secs.toString().padStart(2, '0')}`;
    };

    const menus = [
        { id: 'find', label: '发现音乐' },
        { id: 'podcast', label: '播客' },
        { id: 'video', label: '视频' },
        { id: 'friends', label: '关注' },
        { id: 'live', label: '直播' },
        { id: 'fm', label: '私人FM' },
    ];

    const myMusic = [
        { id: 'local', label: '本地音乐', icon: '💻' },
        { id: 'download', label: '下载管理', icon: '⬇️' },
        { id: 'cloud', label: '我的音乐云盘', icon: '☁️' },
    ];

    return (
        <div className={`flex flex-col h-full bg-[#f6f6f6] text-[#333] font-sans select-none overflow-hidden ${isMobile ? 'pb-12' : ''}`}>
            {/* Top Bar (Simplified for WindowFrame) */}
            <div className="h-14 bg-[#dd001b] flex items-center px-4 justify-between shrink-0">
                <div className="flex items-center gap-2 text-white/90">
                    <div className="bg-white/20 p-1 rounded-full"><Icons.Disc className="w-5 h-5" /></div>
                    <span className="font-bold text-lg tracking-wide">Suno Music</span>
                </div>
                {/* Search Bar - Hidden on mobile */}
                {!isMobile && (
                    <div className="bg-black/10 rounded-full px-3 py-1 flex items-center gap-2 text-white/60 text-xs w-48">
                        <Icons.Search className="w-3 h-3" />
                        <span>搜索</span>
                    </div>
                )}
            </div>

            {/* Main Area */}
            <div className="flex-1 flex overflow-hidden">
                {/* Sidebar - Desktop Only */}
                {!isMobile && (
                    <div className="w-48 bg-white border-r border-gray-200 flex flex-col overflow-y-auto pt-2 pb-4">
                        <div className="px-3 mb-2 text-xs text-gray-400">推荐</div>
                        {menus.map(item => (
                            <div
                                key={item.id}
                                className={`px-4 py-2 text-sm cursor-pointer hover:bg-gray-100 ${activeMenu === item.id ? 'bg-gray-100 font-bold border-l-4 border-[#dd001b] text-[#dd001b]' : 'text-gray-700'}`}
                                onClick={() => setActiveMenu(item.id)}
                            >
                                {item.label}
                            </div>
                        ))}
                        <div className="px-3 mt-4 mb-2 text-xs text-gray-400">我的音乐</div>
                        {myMusic.map(item => (
                            <div
                                key={item.id}
                                className={`px-4 py-2 text-sm cursor-pointer hover:bg-gray-100 flex items-center gap-2 ${activeMenu === item.id ? 'bg-gray-100 font-bold border-l-4 border-[#dd001b] text-[#dd001b]' : 'text-gray-700'}`}
                                onClick={() => setActiveMenu(item.id)}
                            >
                                <span>{item.label}</span>
                            </div>
                        ))}
                    </div>
                )}

                {/* Content */}
                <div className="flex-1 flex flex-col bg-white overflow-hidden">
                    {/* Tab Bar (Desktop Mockup - Hide if local music) */}
                    {!isMobile && activeMenu !== 'local' && (
                        <div className="h-12 border-b border-gray-200 flex items-center px-8 gap-8 text-sm">
                            <span className="font-bold border-b-2 border-[#dd001b] pb-3 pt-3">个性推荐</span>
                            <span className="text-gray-500 hover:text-black cursor-pointer">歌单</span>
                            <span className="text-gray-500 hover:text-black cursor-pointer">排行榜</span>
                            <span className="text-gray-500 hover:text-black cursor-pointer">歌手</span>
                            <span className="text-gray-500 hover:text-black cursor-pointer">最新音乐</span>
                        </div>
                    )}

                    {/* Mobile Tab Bar Mockup (If needed, or just keep simple) */}
                    {/* For Mobile, activeMenu is likely just default 'find', but let's allow basic switching if we added menu. 
                         For now, default view is fine, but if we want 'local', we need a way to access it on mobile.
                         Let's add a simple toggle or just render local music as a section if on mobile? 
                         Let's add a simple segmented control on mobile top?
                      */}
                    {isMobile && (
                        <div className="h-10 border-b border-gray-200 flex items-center justify-center gap-8 text-sm bg-gray-50">
                            <span
                                className={`pb-2 pt-2 border-b-2 ${activeMenu === 'find' ? 'font-bold border-[#dd001b]' : 'border-transparent text-gray-500'}`}
                                onClick={() => setActiveMenu('find')}
                            >
                                推荐
                            </span>
                            <span
                                className={`pb-2 pt-2 border-b-2 ${activeMenu === 'local' ? 'font-bold border-[#dd001b]' : 'border-transparent text-gray-500'}`}
                                onClick={() => setActiveMenu('local')}
                            >
                                本地 ({musicLibrary.length})
                            </span>
                        </div>
                    )}

                    {/* Scrollable Content */}
                    <div className="flex-1 overflow-y-auto p-4 md:p-8">

                        {/* VIEW: Local Music */}
                        {activeMenu === 'local' ? (
                            <div className="max-w-4xl mx-auto">
                                <div className="flex items-end gap-4 mb-6 pb-4 border-b border-gray-100">
                                    <h2 className="text-2xl font-bold">本地音乐</h2>
                                    <span className="text-gray-500 text-sm mb-1">共 {musicLibrary.length} 首</span>
                                </div>

                                <div className="space-y-1">
                                    {/* Header */}
                                    <div className="flex items-center text-xs text-gray-400 px-4 py-2">
                                        <div className="w-10"></div>
                                        <div className="flex-1">标题</div>
                                        <div className="w-1/3">歌手</div>
                                        <div className="w-20 text-right">时长</div>
                                    </div>

                                    {/* List */}
                                    {musicLibrary.map((song, index) => (
                                        <div
                                            key={song.id}
                                            className={`flex items-center px-4 py-3 rounded-md hover:bg-gray-100 cursor-pointer group ${currentSong?.id === song.id ? 'bg-gray-100' : ''}`}
                                            onClick={() => playSong(song)}
                                        >
                                            <div className="w-10 text-xs text-gray-400 flex items-center justify-center">
                                                {currentSong?.id === song.id ? (
                                                    <span className="text-[#dd001b] text-sm">{isPlaying ? '🔊' : '🔈'}</span> // Simplified active icon
                                                ) : (
                                                    <span className="w-4 text-center">{index + 1}</span>
                                                )}
                                            </div>
                                            <div className="flex-1 min-w-0 pr-4">
                                                <div className={`text-sm truncate ${currentSong?.id === song.id ? 'text-[#dd001b]' : 'text-gray-800'}`}>
                                                    {song.title}
                                                </div>
                                            </div>
                                            <div className="w-1/3 text-xs text-gray-500 truncate">
                                                {song.artist}
                                            </div>
                                            <div className="w-20 text-right text-xs text-gray-400 font-mono">
                                                {formatTime(song.duration)}
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        ) : (
                            /* VIEW: Default (Find/Discover) */
                            <>
                                {/* Banner Mockup */}
                                <div className="w-full h-32 md:h-48 bg-gradient-to-r from-red-500 to-pink-500 rounded-lg mb-8 relative overflow-hidden flex items-center px-8">
                                    <div className="text-white z-10">
                                        <h2 className="text-2xl font-bold mb-2">每日歌曲推荐</h2>
                                        <p className="opacity-80 text-sm">根据你的音乐口味生成，每天6:00更新</p>
                                        <div className="text-6xl font-serif absolute -right-4 -bottom-8 opacity-20">14</div>
                                    </div>
                                    <div className="absolute top-2 right-2 bg-[#dd001b] text-white text-[10px] px-2 py-0.5 rounded-l-full">VIP专享</div>
                                </div>

                                <div className="font-bold text-lg mb-4 flex items-center gap-2">
                                    推荐歌单
                                    <Icons.ArrowRight className="w-4 h-4 text-gray-400" />
                                </div>

                                <div className="grid grid-cols-3 md:grid-cols-5 gap-4">
                                    {/* Mock Playlists */}
                                    {[1, 2, 3, 4, 5].map(i => (
                                        <div key={i} className="flex flex-col gap-1 group cursor-pointer">
                                            <div className="aspect-square bg-gray-200 rounded-lg relative overflow-hidden">
                                                <div className="absolute top-1 right-1 flex items-center gap-1 text-white text-[10px] bg-black/20 px-1 rounded">
                                                    <Icons.Play className="w-3 h-3" />
                                                    {Math.floor(Math.random() * 100)}万
                                                </div>
                                                <img
                                                    src={`https://picsum.photos/seed/playlist${i}/400/400`}
                                                    alt="playlist cover"
                                                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                                                />
                                                {/* Play Button Overlay */}
                                                <div className="absolute bottom-2 right-2 w-8 h-8 bg-white/90 rounded-full flex items-center justify-center text-[#dd001b] opacity-0 group-hover:opacity-100 transition-opacity shadow-lg">
                                                    <Icons.Play className="w-4 h-4" />
                                                </div>
                                            </div>
                                            <div className="text-xs text-gray-700 line-clamp-2 leading-tight">
                                                [华语] 那些必听的经典老歌回忆杀
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </>
                        )}

                    </div>
                </div>
            </div>

            {/* Bottom Player Bar */}
            <div className="h-16 bg-white border-t border-gray-200 flex items-center justify-between px-2 md:px-4 shrink-0 shadow-[0_-2px_10px_rgba(0,0,0,0.05)] z-20 relative">
                {/* Left: Info */}
                <div className="flex items-center gap-3 w-1/3 min-w-0">
                    <div className="w-10 h-10 md:w-12 md:h-12 bg-gray-200 rounded overflow-hidden relative group cursor-pointer">
                        {currentSong?.cover ? (
                            <img src={currentSong.cover} className="w-full h-full object-cover" alt="" />
                        ) : (
                            <img
                                src="https://picsum.photos/seed/defaultmusic/200/200"
                                className="w-full h-full object-cover"
                                alt=""
                            />
                        )}
                        <div className="absolute inset-0 bg-black/30 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                            <Icons.Lambda className="w-6 h-6 text-white rotate-180" /> {/* Expand icon mockup */}
                        </div>
                    </div>
                    <div className="min-w-0 flex flex-col justify-center">
                        <div className="text-sm text-gray-800 truncate flex items-center gap-2">
                            {currentSong?.title || "Suno Music"}
                            <Icons.Heart className="w-3.5 h-3.5 text-gray-400 hover:text-red-500 cursor-pointer" />
                        </div>
                        <div className="text-xs text-gray-500 truncate">{currentSong?.artist || "听见不同"}</div>
                    </div>
                </div>

                {/* Center: Controls */}
                <div className="flex flex-col items-center justify-center flex-1 max-w-lg px-2">
                    <div className="flex items-center gap-4 md:gap-8 mb-1">
                        <button
                            onClick={() => setPlayMode(m => m === 'order' ? 'loop' : m === 'loop' ? 'random' : 'order')}
                            className={`hidden md:block text-gray-400 hover:text-gray-600 ${playMode === 'random' ? 'text-gray-800' : ''}`}
                            title={playMode}
                        >
                            {playMode === 'order' ? <Icons.ArrowRight className="w-4 h-4" /> : playMode === 'loop' ? <Icons.Repeat className="w-4 h-4" /> : <Icons.Shuffle className="w-4 h-4" />}
                        </button>

                        <button onClick={handlePrev} className="text-[#dd001b] hover:text-[#b00015]">
                            <Icons.SkipBack className="w-5 h-5 md:w-6 md:h-6" />
                        </button>

                        <button onClick={togglePlay} className="w-8 h-8 md:w-10 md:h-10 bg-[#dd001b] rounded-full flex items-center justify-center text-white hover:bg-[#b00015] shadow-md transition-transform active:scale-95">
                            {isPlaying ? <Icons.Pause className="w-4 h-4 md:w-5 md:h-5" /> : <Icons.Play className="w-4 h-4 md:w-5 md:h-5 ml-0.5" />}
                        </button>

                        <button onClick={handleNext} className="text-[#dd001b] hover:text-[#b00015]">
                            <Icons.SkipForward className="w-5 h-5 md:w-6 md:h-6" />
                        </button>

                        <button className="hidden md:block text-gray-400 hover:text-gray-600">
                            <span className="text-xs border border-gray-400 px-1 rounded">词</span>
                        </button>
                    </div>
                    {/* Progress Bar */}
                    <div className="w-full flex items-center gap-2 text-[10px] text-gray-400">
                        <span className="w-8 text-right tabular-nums">{formatTime(currentTime)}</span>
                        <div className="flex-1 h-1 bg-gray-200 rounded-full relative group cursor-pointer">
                            <div
                                className="absolute h-full bg-[#dd001b] rounded-full"
                                style={{ width: `${(currentTime / (duration || 1)) * 100}%` }}
                            ></div>
                            <input
                                type="range"
                                min="0"
                                max={duration || 0}
                                value={currentTime}
                                onChange={handleSeek}
                                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                            />
                        </div>
                        <span className="w-8 tabular-nums">{formatTime(duration)}</span>
                    </div>
                </div>

                {/* Right: Volume & List */}
                <div className="w-1/3 flex justify-end items-center gap-2 md:gap-4 min-w-0">
                    {!isMobile && (
                        <div className="flex items-center gap-2 w-24">
                            <button onClick={() => setVolume(v => v === 0 ? 0.5 : 0)}>
                                {volume === 0 ? <Icons.VolumeX className="w-5 h-5 text-gray-500" /> : <Icons.Volume className="w-5 h-5 text-gray-500" />}
                            </button>
                            <div className="flex-1 h-1 bg-gray-200 rounded-full relative">
                                <div className="absolute h-full bg-[#dd001b] rounded-full" style={{ width: `${volume * 100}%` }}></div>
                                <input
                                    type="range" min="0" max="1" step="0.05"
                                    value={volume}
                                    onChange={(e) => setVolume(parseFloat(e.target.value))}
                                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                                />
                            </div>
                        </div>
                    )}
                    <button className="text-gray-500 hover:text-gray-800" title="播放列表">
                        <Icons.ListMusic className="w-5 h-5" />
                    </button>
                </div>
            </div>

            <audio ref={audioRef} />
        </div>
    );
};

