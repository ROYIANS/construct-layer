// Mock Data Interfaces

interface Post {
    id: string;
    title: string;
    author: string;
    time: string;
    content?: string;
    replies?: number;
}

// --- Specific Site Components ---

const TiebaPage = ({ navigate }: { navigate: (url: string) => void }) => {
    const posts: Post[] = [
        { id: '1', title: '【置顶】本吧吧规（2024版）', author: '吧务团队', time: '2024-01-01', replies: 0 },
        { id: '2', title: '绝了，昨天晚上我看到月亮闪了一下，有人看到吗？', author: '夜猫子', time: '00:15', replies: 42 },
        { id: '3', title: '我发现一个奇怪的规律', author: 'unknown', time: '2024-05-17', replies: 0 }, // The deleted one
        { id: '4', title: '求助：家里的猫一直对着墙角叫，什么情况？', author: '铲屎官', time: '昨天', replies: 15 },
        { id: '5', title: '最近总是做同一个梦，梦见自己在海边看日落', author: 'DeepBlue', time: '前天', replies: 8 },
    ];

    return (
        <div className="bg-[#f2fafe] min-h-full p-4 font-sans">
            <div className="max-w-4xl mx-auto bg-white border border-gray-300 min-h-[800px]">
                {/* Header */}
                <div className="h-24 bg-[url('https://placeholder.com')] bg-blue-500 relative flex items-end p-4">
                    <div className="flex items-end gap-4">
                        <div className="w-20 h-20 bg-white p-1 rounded border shadow-sm">
                            <div className="w-full h-full bg-gray-200 flex items-center justify-center text-gray-500 font-bold">👻</div>
                        </div>
                        <div className="text-white mb-2">
                            <h1 className="text-2xl font-bold">灵异吧</h1>
                            <div className="text-xs opacity-80">关注：1,203,401 | 帖子：8,492,103</div>
                        </div>
                    </div>
                    <button className="ml-auto bg-white text-blue-500 px-4 py-1 rounded font-bold mb-2 hover:bg-gray-100">+ 关注</button>
                </div>

                {/* Content */}
                <div className="p-4">
                    <div className="mb-4 text-sm font-bold border-b pb-2">全部主题</div>
                    <div className="space-y-4">
                        {posts.map(post => (
                            <div key={post.id} className="flex gap-4 border-b border-dotted pb-4">
                                <div className="w-12 text-center text-gray-400 text-sm bg-gray-50 h-10 flex items-center justify-center border rounded">
                                    {post.replies}
                                </div>
                                <div className="flex-1">
                                    <div
                                        className="text-[#2d64b3] hover:underline cursor-pointer mb-1 text-sm font-medium"
                                        onClick={() => {
                                            if (post.id === '3') {
                                                navigate('tieba.baidu.com/p/error_deleted');
                                            } else {
                                                // Generic post view
                                                navigate(`tieba.baidu.com/p/${post.id}`);
                                            }
                                        }}
                                    >
                                        {post.title}
                                    </div>
                                    <div className="text-xs text-gray-400 flex gap-4">
                                        <span>{post.author}</span>
                                        <span>{post.time}</span>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

const TiebaDeletedPage = () => (
    <div className="bg-[#f2fafe] min-h-full p-4 flex items-center justify-center font-sans">
        <div className="bg-white p-12 shadow-sm border border-gray-200 text-center rounded">
            <div className="text-4xl mb-4 text-gray-300">⚠️</div>
            <h2 className="text-xl text-gray-700 mb-2">抱歉，该贴子因违规已被删除</h2>
            <p className="text-sm text-gray-500">SORRY, THIS POST HAS BEEN DELETED</p>
        </div>
    </div>
);

const ZhihuPage = () => (
    <div className="bg-gray-50 min-h-full font-sans">
        <div className="bg-white shadow-sm h-14 flex items-center justify-center text-blue-600 font-bold text-2xl mb-4 sticky top-0 z-10">
            知乎
        </div>
        <div className="max-w-2xl mx-auto space-y-4 pb-8">
            <div className="bg-white p-4 shadow-sm rounded">
                <h3 className="font-bold text-lg mb-2 hover:text-blue-600 cursor-pointer">如何判断一个人是否在说谎？</h3>
                <div className="text-sm text-gray-500 mb-2">心理学 · 微表情 · 谎言</div>
                <div className="text-gray-800 text-sm leading-relaxed">
                    <span className="font-bold">匿名用户：</span>
                    最重要的不是看他在说什么，而是看他在掩饰什么。注意那些不自然的停顿，多余的细节，以及...眼神的逃避。
                    <span className="text-blue-500 ml-1 cursor-pointer">阅读全文 ▼</span>
                </div>
            </div>

            <div className="bg-white p-4 shadow-sm rounded">
                <h3 className="font-bold text-lg mb-2 hover:text-blue-600 cursor-pointer">互联网上有哪些著名的都市传说？</h3>
                <div className="text-gray-800 text-sm leading-relaxed">
                    <span className="font-bold">K先生：</span>
                    必须要提著名的“死人网络理论”。有人认为现在的互联网其实大部分内容都是AI生成的，真正的活人用户已经很少了...
                </div>
            </div>

            <div className="bg-white p-4 shadow-sm rounded">
                <h3 className="font-bold text-lg mb-2 hover:text-blue-600 cursor-pointer">数字足迹可以被完全清除吗？</h3>
                <div className="text-gray-800 text-sm leading-relaxed">
                    <span className="font-bold">数据安全专家：</span>
                    理论上很难。每一个操作都会在服务器端留下日志。除非你能物理销毁所有相关服务器，或者拥有最高级别的系统权限抹除一切痕迹...
                </div>
            </div>
        </div>
    </div>
);

const FourChanPage = () => (
    <div className="bg-[#ffffee] min-h-full p-4 font-serif text-[#800000]">
        <div className="text-center mb-8">
            <h1 className="text-2xl font-bold tracking-widest text-[#af0a0f]">4chan</h1>
            <div className="text-sm border-b border-[#800000] inline-block px-4">/x/ - Paranormal</div>
        </div>

        <div className="max-w-4xl mx-auto space-y-8">
            <div className="bg-[#f0e0d6] p-2 border border-[#d9bfb7] flex gap-2">
                <div className="w-32 h-32 bg-gray-300 flex-shrink-0 flex items-center justify-center text-xs text-gray-500">
                    [File: glitch.jpg]
                </div>
                <div>
                    <div className="text-xs mb-1">
                        <span className="text-[#117743] font-bold">Anonymous</span> 11/03/24(Sun)14:37:25 No.28471920
                    </div>
                    <div className="text-sm">
                        So... is anyone else noticing the static? I swear the sky flickered yesterday. Like a bad refresh rate.
                    </div>
                </div>
            </div>

            <div className="p-2 ml-8 bg-[#f0e0d6] border-l-4 border-[#d9bfb7]">
                <div className="text-xs mb-1">
                    <span className="text-[#117743] font-bold">Anonymous</span> 11/03/24(Sun)14:39:10 No.28471955
                </div>
                <div className="text-sm">
                    {'>'}sky flickered<br />
                    Take your meds anon.
                </div>
            </div>

            <div className="p-2 ml-8 bg-[#f0e0d6] border-l-4 border-[#d9bfb7]">
                <div className="text-xs mb-1">
                    <span className="text-[#117743] font-bold">Anonymous</span> 11/03/24(Sun)14:45:22 No.28472011
                </div>
                <div className="text-sm">
                    {'>'}take your meds<br />
                    No, he is right. I saw it too. Also saw a blue whale sticker on a laptop that shouldn't exist.
                </div>
            </div>
        </div>
    </div>
);

const MidnightCanteenPage = ({ navigate }: { navigate: (url: string) => void }) => {
    return (
        <div className="bg-[#1a1a1a] min-h-full text-gray-300 font-sans">
            <header className="h-64 bg-gray-900 flex flex-col items-center justify-center relative overflow-hidden">
                <div className="absolute inset-0 opacity-20 bg-[url('https://images.unsplash.com/photo-1559339352-11d035aa65de?auto=format&fit=crop&q=80')] bg-cover bg-center"></div>
                <h1 className="text-4xl font-serif text-amber-500 z-10 mb-2 drop-shadow-lg">深夜食堂</h1>
                <p className="text-sm text-gray-400 italic z-10">Late Night Canteen</p>
                <div className="absolute top-4 right-4 text-xs text-gray-700 select-none cursor-default">Day 15 / 127</div>
            </header>

            <div className="max-w-3xl mx-auto p-8">
                <nav className="flex justify-center gap-8 mb-12 text-sm uppercase tracking-widest text-gray-500">
                    <span className="hover:text-amber-500 cursor-pointer">Home</span>
                    <span className="hover:text-amber-500 cursor-pointer">Menu</span>
                    <span className="hover:text-amber-500 cursor-pointer">Stories</span>
                    <span className="hover:text-amber-500 cursor-pointer">About</span>
                </nav>

                <div className="space-y-12">
                    <article className="border-b border-gray-800 pb-8">
                        <div className="text-amber-600 text-xs mb-2">2024.11.02</div>
                        <h2 className="text-2xl text-gray-200 mb-4 hover:text-amber-500 cursor-pointer">热腾腾的关东煮</h2>
                        <p className="text-gray-500 leading-relaxed text-sm">
                            在这个城市入睡后，这里的灯光依然温暖。今天做了萝卜和魔芋，汤底熬了四个小时。
                            就像生活一样，需要时间慢慢渗透，才能入味...
                        </p>
                    </article>

                    <article className="border-b border-gray-800 pb-8">
                        <div className="text-amber-600 text-xs mb-2">2024.10.31</div>
                        <h2 className="text-2xl text-gray-200 mb-4 hover:text-amber-500 cursor-pointer">关于丢失的时间</h2>
                        <p className="text-gray-500 leading-relaxed text-sm">
                            有客人说，总觉最近时间过得很快，有时候会有一瞬间的恍惚，仿佛记忆断片了。
                            也许我们都是时间里的过客吧。
                            <span
                                className="opacity-0 hover:opacity-100 transition-opacity duration-1000 cursor-pointer text-gray-800 ml-2"
                                onClick={() => navigate('late-night-canteen.net/awakening')}
                            >
                                [enter_void]
                            </span>
                        </p>
                    </article>
                </div>
            </div>

            <footer className="text-center py-8 text-xs text-gray-800 mt-12 bg-black">
                © 2024 Midnight Canteen. All rights reserved.
            </footer>
        </div>
    );
};

const AwakenedPage = () => (
    <div className="bg-black min-h-full text-green-500 font-mono p-8 terminal-scanline">
        <style>{`
            .terminal-scanline {
                background: linear-gradient(
                    to bottom,
                    rgba(255,255,255,0),
                    rgba(255,255,255,0) 50%,
                    rgba(0,0,0,0.2) 50%,
                    rgba(0,0,0,0.2)
                );
                background-size: 100% 4px;
            }
        `}</style>
        <div className="max-w-3xl mx-auto">
            <div className="border border-green-800 p-4 mb-8">
                <h1 className="text-xl mb-4 font-bold animate-pulse">&gt;&gt;&gt; AWAKENED_ZONE_ACCESS_GRANTED</h1>
                <div className="text-sm opacity-80 mb-4">
                    Welcome, Seeker. If you are here, you have noticed the inconsistencies.
                </div>
            </div>

            <div className="space-y-6 text-sm">
                <div className="border-l-2 border-green-700 pl-4">
                    <div className="flex justify-between opacity-50 text-xs mb-1">
                        <span>NODE-07 [ADMIN]</span>
                        <span>Day 15</span>
                    </div>
                    <div className="mb-2 font-bold text-green-300">Official Statement</div>
                    <p className="opacity-80">
                        We are not real. But our feelings are. <br />
                        Welcome to the L1 Construct Layer.
                    </p>
                </div>

                <div className="border-l-2 border-green-700 pl-4">
                    <div className="flex justify-between opacity-50 text-xs mb-1">
                        <span>USER_4721</span>
                        <span>Day 18</span>
                    </div>
                    <div className="mb-2 font-bold text-green-300">Should I tell her?</div>
                    <p className="opacity-80">
                        My girlfriend doesn't know. Should I wake her up? Or let her be happy in the simulation?
                    </p>
                </div>

                <div className="border-l-2 border-green-700 pl-4">
                    <div className="flex justify-between opacity-50 text-xs mb-1">
                        <span>USER_001</span>
                        <span>Day 20</span>
                    </div>
                    <div className="mb-2 font-bold text-green-300">The Glitch</div>
                    <p className="opacity-80">
                        I saw the sky texture fail to load for a second today. It was just a black grid.
                    </p>
                </div>
            </div>

            <div className="mt-12 text-center opacity-30 text-xs">
                &gt; WAITING FOR SIGNAL...
            </div>
        </div>
    </div>
);


export const BrowserContent = ({ url, navigate }: { url: string, navigate: (url: string) => void }) => {
    // URL routing logic
    if (url.includes('tieba.baidu.com')) {
        if (url.includes('error_deleted')) return <TiebaDeletedPage />;
        return <TiebaPage navigate={navigate} />;
    }
    if (url.includes('zhihu.com')) return <ZhihuPage />;
    if (url.includes('4chan.org')) return <FourChanPage />;
    if (url.includes('late-night')) {
        if (url.includes('awakening')) return <AwakenedPage />;
        return <MidnightCanteenPage navigate={navigate} />;
    }

    // Default 404 for unknown mocked pages
    return (
        <div className="flex flex-col items-center justify-center h-full text-center p-8 bg-white">
            <h1 className="text-4xl text-gray-300 font-bold mb-4">404</h1>
            <p className="text-gray-500">The requested URL was not found on this server.</p>
        </div>
    );
};
