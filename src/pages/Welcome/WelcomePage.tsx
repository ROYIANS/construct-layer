import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { IntroSequence } from './IntroSequence';
import { MainMenu } from './MainMenu';
import type { MenuButton } from '@/types/game';

type WelcomeState = 'intro' | 'menu' | 'fadeOut';

export const WelcomePage = () => {
  const [state, setState] = useState<WelcomeState>('intro');
  const [hasExistingSave, setHasExistingSave] = useState(false);
  const [showIntro, setShowIntro] = useState(true);

  // 检查是否有本地存档
  useEffect(() => {
    const checkSave = () => {
      // TODO: 从IndexedDB检查存档
      const hasSave = localStorage.getItem('construct_layer_save') !== null;
      setHasExistingSave(hasSave);
    };

    checkSave();

    // 检查是否是首次访问
    const hasSeenIntro = localStorage.getItem('construct_layer_intro_seen');
    if (hasSeenIntro) {
      setShowIntro(false);
      setState('menu');
    }
  }, []);

  const handleIntroComplete = () => {
    localStorage.setItem('construct_layer_intro_seen', 'true');
    setState('menu');
  };

  const handleIntroSkip = () => {
    localStorage.setItem('construct_layer_intro_seen', 'true');
    setState('menu');
  };

  const handleMenuClick = (button: MenuButton) => {
    console.log('Menu button clicked:', button);

    switch (button) {
      case 'start':
        // TODO: 开始新游戏
        alert('开始新游戏功能开发中...');
        break;

      case 'continue':
        // TODO: 继续游戏
        alert('继续游戏功能开发中...');
        break;

      case 'chapters':
        // TODO: 打开章节选择
        alert('章节选择功能开发中...');
        break;

      case 'achievements':
        // TODO: 打开成就页面
        alert('成就系统功能开发中...');
        break;

      case 'settings':
        // TODO: 打开设置面板
        alert('设置功能开发中...');
        break;

      case 'intro':
        // 重看引子
        setShowIntro(true);
        setState('intro');
        break;

      default:
        break;
    }
  };

  return (
    <div className="fixed inset-0 overflow-hidden">
      <AnimatePresence mode="wait">
        {state === 'intro' && showIntro && (
          <motion.div
            key="intro"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1 }}
          >
            <IntroSequence
              onComplete={handleIntroComplete}
              onSkip={handleIntroSkip}
            />
          </motion.div>
        )}

        {state === 'menu' && (
          <motion.div
            key="menu"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1 }}
          >
            <MainMenu
              hasExistingSave={hasExistingSave}
              onMenuClick={handleMenuClick}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
