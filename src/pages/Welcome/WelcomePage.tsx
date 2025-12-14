import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { IntroSequence } from './IntroSequence';
import { MainMenu } from './MainMenu';
import { Desktop } from '../../components/os/Desktop';
import { DialogBox } from '../../components/narrative/DialogBox';
import { chapter1Script } from '../../components/narrative/Chapter1Script';
import { useSystemStore } from '../../os/SystemState';
import type { MenuButton } from '@/types/game';

type WelcomeState = 'intro' | 'menu' | 'narrative' | 'game';

export const WelcomePage = () => {
  const [state, setState] = useState<WelcomeState>('intro');
  const [hasExistingSave, setHasExistingSave] = useState(false);
  const [showIntro, setShowIntro] = useState(true);

  const { startGame } = useSystemStore();

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

  const handleNarrativeComplete = () => {
    // Narrative finished, enter Game
    startGame();
    setState('game');
  };

  const handleMenuClick = (button: MenuButton) => {
    console.log('Menu button clicked:', button);

    switch (button) {
      case 'start':
        // Start Game: Go to Narrative first
        setState('narrative');
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
            className="absolute inset-0 z-50"
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
            className="absolute inset-0 z-40"
          >
            <MainMenu
              hasExistingSave={hasExistingSave}
              onMenuClick={handleMenuClick}
            />
          </motion.div>
        )}

        {state === 'narrative' && (
          <motion.div
            key="narrative"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1 }}
            className="absolute inset-0 z-40 bg-black"
          >
            {/* Background or visual for narrative */}
            <div className="absolute inset-0 flex items-center justify-center opacity-30">
              {/* Placeholder visual */}
              <span className="text-white font-serif italic text-2xl">...</span>
            </div>

            <DialogBox
              lines={chapter1Script}
              onComplete={handleNarrativeComplete}
            />
          </motion.div>
        )}

        {state === 'game' && (
          <motion.div
            key="game"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 2 }} // Slow fade in for boot effect
            className="absolute inset-0 z-30"
          >
            <Desktop />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
