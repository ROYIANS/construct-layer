/**
 * 音效管理器 - 使用 Web Audio API 生成系统音效
 */

class AudioManager {
    private audioContext: AudioContext | null = null;

    constructor() {
        try {
            this.audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
        } catch (e) {
            console.warn('Web Audio API not supported');
        }
    }

    /**
     * 播放开机音效 - Windows启动音效风格
     */
    playBootSound(): void {
        if (!this.audioContext) return;

        const ctx = this.audioContext;
        const now = ctx.currentTime;

        // 创建音符序列（模拟Windows启动音）
        const notes = [
            { freq: 523.25, time: 0, duration: 0.15, gain: 0.2 },      // C5
            { freq: 659.25, time: 0.1, duration: 0.15, gain: 0.25 },   // E5
            { freq: 783.99, time: 0.2, duration: 0.15, gain: 0.3 },    // G5
            { freq: 1046.50, time: 0.3, duration: 0.4, gain: 0.35 },   // C6 (持续)
        ];

        notes.forEach(note => {
            const oscillator = ctx.createOscillator();
            const gainNode = ctx.createGain();

            oscillator.connect(gainNode);
            gainNode.connect(ctx.destination);

            oscillator.type = 'sine';
            oscillator.frequency.setValueAtTime(note.freq, now + note.time);

            // 设置音量包络（ADSR）
            gainNode.gain.setValueAtTime(0, now + note.time);
            gainNode.gain.linearRampToValueAtTime(note.gain, now + note.time + 0.05); // Attack
            gainNode.gain.exponentialRampToValueAtTime(0.01, now + note.time + note.duration); // Release

            oscillator.start(now + note.time);
            oscillator.stop(now + note.time + note.duration);
        });

        console.log('[AudioManager] Boot sound played');
    }

    /**
     * 播放点击音效
     */
    playClickSound(): void {
        if (!this.audioContext) return;

        const ctx = this.audioContext;
        const oscillator = ctx.createOscillator();
        const gainNode = ctx.createGain();

        oscillator.connect(gainNode);
        gainNode.connect(ctx.destination);

        oscillator.frequency.value = 1000;
        gainNode.gain.setValueAtTime(0.05, ctx.currentTime);
        gainNode.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.05);

        oscillator.start(ctx.currentTime);
        oscillator.stop(ctx.currentTime + 0.05);
    }

    /**
     * 播放通知音效
     */
    playNotificationSound(): void {
        if (!this.audioContext) return;

        const ctx = this.audioContext;
        const now = ctx.currentTime;

        // 双音调通知
        [800, 600].forEach((freq, i) => {
            const oscillator = ctx.createOscillator();
            const gainNode = ctx.createGain();

            oscillator.connect(gainNode);
            gainNode.connect(ctx.destination);

            oscillator.frequency.value = freq;
            gainNode.gain.setValueAtTime(0.1, now + i * 0.1);
            gainNode.gain.exponentialRampToValueAtTime(0.01, now + i * 0.1 + 0.15);

            oscillator.start(now + i * 0.1);
            oscillator.stop(now + i * 0.1 + 0.15);
        });
    }

    /**
     * 播放错误音效
     */
    playErrorSound(): void {
        if (!this.audioContext) return;

        const ctx = this.audioContext;
        const oscillator = ctx.createOscillator();
        const gainNode = ctx.createGain();

        oscillator.connect(gainNode);
        gainNode.connect(ctx.destination);

        oscillator.frequency.value = 200; // 低频错误音
        gainNode.gain.setValueAtTime(0.15, ctx.currentTime);
        gainNode.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.3);

        oscillator.start(ctx.currentTime);
        oscillator.stop(ctx.currentTime + 0.3);
    }

    /**
     * 播放故障音效（用于CORE干扰场景）
     */
    playGlitchSound(): void {
        if (!this.audioContext) return;

        const ctx = this.audioContext;
        const now = ctx.currentTime;

        // 创建噪音和失真效果
        const bufferSize = ctx.sampleRate * 0.5; // 0.5秒
        const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
        const data = buffer.getChannelData(0);

        // 生成白噪音
        for (let i = 0; i < bufferSize; i++) {
            data[i] = Math.random() * 2 - 1;
        }

        const noise = ctx.createBufferSource();
        const gainNode = ctx.createGain();
        const filter = ctx.createBiquadFilter();

        noise.buffer = buffer;
        noise.connect(filter);
        filter.connect(gainNode);
        gainNode.connect(ctx.destination);

        filter.type = 'bandpass';
        filter.frequency.value = 1000;
        filter.Q.value = 10;

        gainNode.gain.setValueAtTime(0.3, now);
        gainNode.gain.exponentialRampToValueAtTime(0.01, now + 0.5);

        noise.start(now);
        noise.stop(now + 0.5);
    }
}

// 导出单例
export const audioManager = new AudioManager();
