# Suno Music 使用指南

## 🎵 当前配置

**默认使用在线测试音频**，可以立即播放。如需使用本地音乐文件，请参考下方配置说明。

## 📁 本地音乐文件结构

如需使用本地音乐，将文件放在以下目录结构中：

```
public/
  music/
    ├── song1.mp3          # 音频文件
    ├── song2.mp3
    ├── song3.mp3
    └── covers/            # 封面图片（可选）
        ├── cover1.jpg
        ├── cover2.jpg
        └── cover3.jpg
```

**注意**：目录已创建，直接添加音频文件即可。

## 🎵 配置音乐库

编辑文件：`src/data/MusicData.ts`

### 使用在线音频（当前配置）

```typescript
export const musicLibrary: Song[] = [
    {
        id: '1',
        title: '你的歌曲名称',
        artist: '艺术家名称',
        album: '专辑名称',
        duration: 180,
        cover: 'https://picsum.photos/seed/music1/400/400',
        file: 'https://example.com/music/song.mp3'  // 在线音频URL
    }
];
```

### 使用本地音频

```typescript
export const musicLibrary: Song[] = [
    {
        id: '1',
        title: '你的歌曲名称',        // 歌曲标题
        artist: '艺术家名称',          // 艺术家
        album: '专辑名称',             // 专辑
        duration: 180,                 // 时长（秒）
        cover: '/music/covers/cover1.jpg',  // 本地封面图片路径
        file: '/music/song1.mp3'       // 本地音频文件路径
    },
    // 添加更多歌曲...
];
```

## 🎯 支持的音频格式

- MP3 (推荐)
- WAV
- OGG
- M4A

## 📝 配置说明

### 必填字段
- `id`: 唯一标识符
- `title`: 歌曲名称
- `artist`: 艺术家
- `album`: 专辑名称
- `duration`: 歌曲时长（秒）
- `file`: 音频文件路径（相对于 public 目录）

### 可选字段
- `cover`: 封面图片路径（如果不提供，将显示默认音乐图标）

## 🎨 封面图片建议

- 格式：JPG 或 PNG
- 尺寸：建议 500x500 像素或以上
- 文件大小：< 500KB

## 💡 示例配置

```typescript
{
    id: '1',
    title: '晴天',
    artist: '周杰伦',
    album: '叶惠美',
    duration: 269,
    cover: '/music/covers/qingtian.jpg',
    file: '/music/qingtian.mp3'
}
```

## ✨ 功能特性

- ✅ 播放/暂停控制
- ✅ 上一曲/下一曲
- ✅ 进度条拖动
- ✅ 音量控制（桌面端）
- ✅ 播放模式：顺序播放/单曲循环/随机播放
- ✅ 播放列表显示
- ✅ 移动端适配

## 🚀 快速开始

1. **创建目录**
   ```bash
   mkdir -p public/music/covers
   ```

2. **添加音乐文件**
   - 将 MP3 文件复制到 `public/music/` 目录
   - 将封面图片复制到 `public/music/covers/` 目录

3. **更新配置**
   - 编辑 `src/data/MusicData.ts`
   - 更新 `musicLibrary` 数组

4. **运行项目**
   ```bash
   pnpm dev
   ```

5. **打开音乐播放器**
   - 在桌面上双击 "Suno Music" 图标
   - 或从任务栏启动

## ⚠️ 注意事项

1. **路径规则**
   - 所有路径都相对于 `public` 目录
   - 路径必须以 `/` 开头
   - 示例：`/music/song.mp3`（而不是 `music/song.mp3`）

2. **文件名**
   - 避免使用中文文件名
   - 建议使用小写字母和下划线
   - 示例：`qing_tian.mp3`

3. **时长计算**
   - 可以使用工具查看音频文件时长
   - 或在播放器中播放后自动获取

## 🎮 播放控制

- **播放/暂停**: 点击中间的大按钮
- **上一曲**: 点击左侧按钮
- **下一曲**: 点击右侧按钮
- **切换播放模式**: 点击左上角的图标
  - ➡️ 顺序播放
  - 🔁 单曲循环
  - 🔀 随机播放
- **音量控制**: 点击音量图标（桌面端）
- **进度跳转**: 拖动进度条
- **选择歌曲**: 点击播放列表中的歌曲

## 📱 移动端说明

- 移动端自动隐藏音量控制（使用设备音量键）
- 触摸友好的按钮设计
- 响应式布局

---

现在你可以享受自己的音乐库了！🎵
