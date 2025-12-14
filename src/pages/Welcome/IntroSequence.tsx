import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect } from 'react';

interface IntroProps {
  onComplete: () => void;
  onSkip?: () => void;
}

const introTexts = [
  '在数据的深渊里，没有死亡，只有遗忘。',
  '2024年11月3日，你收到了一台陌生的电脑。',
  '它的主人叫"苏澜"。',
  '一个已经消失的人。',
  '',
  '但每晚凌晨3点17分，',
  '这台电脑都在试图连接某个不存在的地址。',
  '',
  '他在寻找什么？',
  '或者说……',
  '',
  '他在呼唤谁？',
  '',
  '当你凝视屏幕的时候，请记住：',
  '也许屏幕，也在凝视你。',
  '',
  '欢迎来到——',
];

export const IntroSequence = ({ onComplete, onSkip }: IntroProps) => {
  const [currentTextIndex, setCurrentTextIndex] = useState(0);
  const [showSkip, setShowSkip] = useState(false);

  useEffect(() => {
    const skipTimer = setTimeout(() => setShowSkip(true), 2000);
    return () => clearTimeout(skipTimer);
  }, []);

  useEffect(() => {
    if (currentTextIndex < introTexts.length) {
      // Calculate duration based on text length, but usually standard is fine.
      // We want pause on empty strings to be shorter or longer depending on effect.
      const isSpacer = introTexts[currentTextIndex] === '';
      const duration = isSpacer ? 800 : 2500;

      const timer = setTimeout(() => {
        setCurrentTextIndex((prev) => prev + 1);
      }, duration);

      return () => clearTimeout(timer);
    } else {
      setTimeout(onComplete, 1500);
    }
  }, [currentTextIndex, onComplete]);

  const handleSkip = () => {
    if (onSkip) onSkip();
    else onComplete();
  };

  return (
    <div className="fixed inset-0 bg-[#f5f5f0] flex items-center justify-center font-serif overflow-hidden">
      {/* Light Theme Background Elements */}
      <div className="absolute inset-0 z-0 opacity-50">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-white via-[#f0f0eb] to-[#e6e6e1]" />
        <motion.div
          animate={{ opacity: [0.3, 0.5, 0.3] }}
          transition={{ duration: 8, repeat: Infinity }}
          className="absolute inset-0 bg-[url('/assets/images/noise.png')] opacity-[0.03] mix-blend-multiply"
        />
      </div>

      {/* Main Text Content */}
      <div className="relative z-10 w-full max-w-4xl px-8 flex flex-col items-center justify-center min-h-[60vh]">
        <AnimatePresence mode="popLayout">
          {introTexts.map((text, index) => {
            if (index > currentTextIndex || index < currentTextIndex - 2) return null;

            const isCurrent = index === currentTextIndex;
            const offset = currentTextIndex - index;

            if (text === '') return null;

            return (
              <motion.p
                key={index}
                initial={{ opacity: 0, scale: 0.95, y: 30, filter: 'blur(8px)' }}
                animate={{
                  opacity: isCurrent ? 1 : 0.4 - (offset * 0.15),
                  scale: 1,
                  y: 0,
                  filter: 'blur(0px)'
                }}
                exit={{ opacity: 0, y: -20, filter: 'blur(4px)' }}
                transition={{ duration: 1, ease: "easeOut" }}
                className={`text-center transition-colors duration-500 mb-8
                            ${isCurrent ? 'text-gray-800 text-3xl md:text-4xl font-normal tracking-wider' : 'text-gray-400 text-xl md:text-2xl font-light'}
                        `}
              >
                {text}
              </motion.p>
            );
          })}
        </AnimatePresence>
      </div>

      {/* Skip Button - Minimalist Light */}
      <AnimatePresence>
        {showSkip && (
          <motion.button
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={handleSkip}
            className="fixed bottom-12 right-12 z-50 group flex items-center gap-3 text-gray-400 hover:text-gray-800 transition-colors duration-300"
          >
            <span className="text-sm tracking-[0.2em] uppercase font-bold">跳过剧情</span>
            <span className="w-12 h-[1px] bg-gray-300 group-hover:w-16 group-hover:bg-gray-800 transition-all duration-300" />
          </motion.button>
        )}
      </AnimatePresence>
    </div>
  );
};
