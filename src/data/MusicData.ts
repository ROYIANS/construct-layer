// 音乐数据配置
export interface Song {
    id: string;
    title: string;
    artist: string;
    album: string;
    duration: number; // 秒
    cover?: string; // 封面图片路径
    file: string; // 音频文件路径（相对于 public 目录）
}

export const musicLibrary: Song[] = [
    {
        id: '0',
        title: 'Neverland',
        artist: 'Suno AI',
        album: 'Demo Album',
        duration: 60,
        cover: 'https://picsum.photos/seed/music0/400/400',
        file: '/music/bgm.mp3'
    },
    {
        id: '1',
        title: 'Inspiring Dreams',
        artist: 'Suno AI',
        album: 'Demo Album',
        duration: 60,
        cover: 'https://picsum.photos/seed/music1/400/400',
        file: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3'
    },
    {
        id: '2',
        title: 'Digital Waves',
        artist: 'Suno AI',
        album: 'Demo Album',
        duration: 60,
        cover: 'https://picsum.photos/seed/music2/400/400',
        file: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3'
    },
    {
        id: '3',
        title: 'Electronic Journey',
        artist: 'Suno AI',
        album: 'Demo Album',
        duration: 60,
        cover: 'https://picsum.photos/seed/music3/400/400',
        file: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3'
    }
];

// 使用说明：
// 1. 将音乐文件放在 public/music/ 目录下
// 2. 将封面图片放在 public/music/covers/ 目录下
// 3. 更新上面的配置，修改文件路径、歌曲信息
// 4. 如果没有封面图片，可以不设置 cover 字段，将使用默认封面
// 5. 也可以使用 Picsum Photos 的占位图片（需要网络连接）：
//    例如：'https://picsum.photos/seed/your-seed/400/400'
//    seed 可以是任何字符串，相同的 seed 会生成相同的图片
