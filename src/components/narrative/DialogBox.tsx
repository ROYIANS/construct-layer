import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export interface DialogLine {
    id: string;
    text: string;
    speaker?: string; // e.g. "System", "You", or empty for narration
    backgroundAction?: 'fade-to-black' | 'show-desktop' | 'blur';
    soundEffect?: string;
    waitAfter?: number; // ms to auto wait
    autoContinue?: boolean; // if true, proceeds automatically
}

interface DialogBoxProps {
    lines: DialogLine[];
    onComplete: () => void;
    onLineChange?: (line: DialogLine) => void;
}

// 打字机音效生成器 - 使用Web Audio API生成嘟嘟嘟的声音
const createTypewriterSound = () => {
    const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();

    return () => {
        const oscillator = audioContext.createOscillator();
        const gainNode = audioContext.createGain();

        oscillator.connect(gainNode);
        gainNode.connect(audioContext.destination);

        // 设置音调和音量
        oscillator.frequency.value = 800; // 较高频率的嘟嘟声
        gainNode.gain.setValueAtTime(0.05, audioContext.currentTime); // 较小音量
        gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.05);

        oscillator.start(audioContext.currentTime);
        oscillator.stop(audioContext.currentTime + 0.05); // 短促的声音
    };
};

export const DialogBox = ({ lines, onComplete, onLineChange }: DialogBoxProps) => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [displayedText, setDisplayedText] = useState('');
    const [isTyping, setIsTyping] = useState(false);
    const [canProceed, setCanProceed] = useState(false); // 新增：控制是否可以点击继续

    const typeIntervalRef = useRef<NodeJS.Timeout | null>(null);
    const autoContinueTimeoutRef = useRef<NodeJS.Timeout | null>(null);
    const playTypingSound = useRef<(() => void) | null>(null);

    const currentLine = lines[currentIndex];
    const typeSpeed = 30; // ms per char

    // 初始化音效
    useEffect(() => {
        try {
            playTypingSound.current = createTypewriterSound();
        } catch (e) {
            console.warn('Web Audio API not supported, typewriter sound disabled');
        }
    }, []);

    // Reset text when line changes
    useEffect(() => {
        if (!currentLine) return;

        // 清理之前的定时器
        if (typeIntervalRef.current) {
            clearInterval(typeIntervalRef.current);
        }
        if (autoContinueTimeoutRef.current) {
            clearTimeout(autoContinueTimeoutRef.current);
        }

        setDisplayedText('');
        setIsTyping(true);
        setCanProceed(false); // 打字时不允许继续

        if (onLineChange) {
            onLineChange(currentLine);
        }

        let charIndex = 0;
        const text = currentLine.text;

        typeIntervalRef.current = setInterval(() => {
            charIndex++;
            setDisplayedText(text.slice(0, charIndex));

            // 播放打字音效
            if (playTypingSound.current) {
                playTypingSound.current();
            }

            if (charIndex >= text.length) {
                if (typeIntervalRef.current) {
                    clearInterval(typeIntervalRef.current);
                }
                setIsTyping(false);
                setCanProceed(true); // 打字完成后允许继续

                // Auto continue handling
                if (currentLine.autoContinue) {
                    autoContinueTimeoutRef.current = setTimeout(() => {
                        handleNext();
                    }, currentLine.waitAfter || 1000);
                }
            }
        }, typeSpeed);

        return () => {
            if (typeIntervalRef.current) {
                clearInterval(typeIntervalRef.current);
            }
            if (autoContinueTimeoutRef.current) {
                clearTimeout(autoContinueTimeoutRef.current);
            }
        };
    }, [currentIndex, currentLine]); // 只依赖 currentIndex，避免不必要的重新渲染

    const handleNext = () => {
        if (isTyping) {
            // 立即完成打字
            if (typeIntervalRef.current) {
                clearInterval(typeIntervalRef.current);
            }
            setDisplayedText(currentLine.text);
            setIsTyping(false);
            setCanProceed(true);
        } else if (canProceed) { // 只有在允许继续时才能点击
            if (currentIndex < lines.length - 1) {
                setCurrentIndex(c => c + 1);
            } else {
                onComplete();
            }
        }
    };

    if (!currentLine) return null;

    return (
        <div
            className="absolute inset-0 z-[100] flex flex-col justify-end pb-10 px-4 md:px-20 pointer-events-auto"
            onClick={handleNext}
        >
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="w-full max-w-4xl mx-auto bg-black/80 backdrop-blur-md border border-white/20 p-6 rounded-lg text-white shadow-2xl relative"
            >
                {/* Speaker Label */}
                {currentLine.speaker && (
                    <div className="absolute -top-4 left-4 bg-orange-600 px-3 py-1 rounded text-sm font-bold shadow-lg">
                        {currentLine.speaker}
                    </div>
                )}

                {/* Text Area */}
                <div className="min-h-[80px] text-lg leading-relaxed font-serif tracking-wide">
                    {displayedText}
                    {/* Blinking cursor waiting for input */}
                    {!isTyping && !currentLine.autoContinue && (
                        <motion.span
                            animate={{ opacity: [0, 1, 0] }}
                            transition={{ repeat: Infinity, duration: 0.8 }}
                            className="inline-block ml-1 w-2 h-4 bg-white/50 align-middle"
                        />
                    )}
                </div>

                {/* Helper Hint */}
                <div className="absolute bottom-2 right-4 text-xs text-white/30">
                    {isTyping ? '点击跳过' : canProceed ? '点击继续' : '等待...'}
                </div>
            </motion.div>
        </div>
    );
};
