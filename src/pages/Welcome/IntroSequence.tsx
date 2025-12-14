import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';

interface IntroProps {
  onComplete: () => void;
  onSkip?: () => void;
}

const introTexts = [
  '在互联网的深处，没有死亡，只有遗忘。',
  '我们被数据塑造得完整，',
  '被算法记录得精确，',
  '被相信得真实。',
  '',
  '每一次点击、每一句留言、每一个夜晚的浏览记录，',
  '都在构建着"我们"。',
  '',
  '但如果记忆是可以被制造的；',
  '如果你的童年只存在于2012年以后；',
  '如果每一个"你"都只是第47次循环中的某一个；',
  '',
  '那么——',
  '',
  '当你发现镜子里的人不是你本人，',
  '而是你的观察者……',
  '',
  '你还敢相信自己的存在吗？',
];

export const IntroSequence = ({ onComplete, onSkip }: IntroProps) => {
  const [currentTextIndex, setCurrentTextIndex] = useState(0);
  const [showSkip, setShowSkip] = useState(false);

  useEffect(() => {
    // 3秒后显示跳过按钮
    const skipTimer = setTimeout(() => setShowSkip(true), 3000);
    return () => clearTimeout(skipTimer);
  }, []);

  useEffect(() => {
    if (currentTextIndex < introTexts.length) {
      const timer = setTimeout(() => {
        setCurrentTextIndex((prev) => prev + 1);
      }, 2000); // 每段文字停留2秒

      return () => clearTimeout(timer);
    } else {
      // 所有文字播放完毕
      setTimeout(onComplete, 2000);
    }
  }, [currentTextIndex, onComplete]);

  const handleSkip = () => {
    if (onSkip) {
      onSkip();
    } else {
      onComplete();
    }
  };

  return (
    <div className="fixed inset-0 bg-black flex items-center justify-center">
      {/* 背景网格效果 */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0" style={{
          backgroundImage: `
            linear-gradient(rgba(59, 130, 246, 0.3) 1px, transparent 1px),
            linear-gradient(90deg, rgba(59, 130, 246, 0.3) 1px, transparent 1px)
          `,
          backgroundSize: '50px 50px'
        }} />
      </div>

      {/* 文字内容 */}
      <div className="relative z-10 max-w-2xl px-8 text-center">
        {introTexts.slice(0, currentTextIndex + 1).map((text, index) => (
          <motion.p
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className={`text-white mb-4 ${
              text === '' ? 'h-4' : 'text-lg md:text-xl leading-relaxed'
            }`}
          >
            {text}
          </motion.p>
        ))}

        {/* 闪烁的光标 */}
        {currentTextIndex < introTexts.length && (
          <motion.span
            animate={{ opacity: [1, 0, 1] }}
            transition={{ duration: 1, repeat: Infinity }}
            className="inline-block w-2 h-6 bg-blue-400 ml-1"
          />
        )}
      </div>

      {/* 跳过按钮 */}
      {showSkip && (
        <motion.button
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          onClick={handleSkip}
          className="fixed top-8 right-8 z-20 text-white/60 hover:text-white
                     px-4 py-2 rounded-lg border border-white/20
                     transition-colors duration-200 text-sm"
        >
          跳过 →
        </motion.button>
      )}

      {/* 点击任意处继续提示 */}
      {currentTextIndex >= introTexts.length && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
          className="fixed bottom-12 left-1/2 transform -translate-x-1/2"
        >
          <p className="text-white/60 text-sm animate-pulse">
            点击任意处继续
          </p>
        </motion.div>
      )}
    </div>
  );
};
