import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { IntroSequence } from './IntroSequence';
import { MainMenu } from './MainMenu';
import { SaveLoadPage } from './SaveLoadPage';
import { ChapterSelectPage } from './ChapterSelectPage';
import { AchievementsPage } from './AchievementsPage';
import { SettingsPage } from './SettingsPage';
import { Desktop } from '../../components/os/Desktop';
import { BootScreen } from '../../components/os/BootScreen';
import { DialogBox } from '../../components/narrative/DialogBox';
import { chapter1Script } from '../../components/narrative/Chapter1Script';
import { useSystemStore } from '../../os/SystemState';
import { useGameStore } from '../../stores/useGameStore';
import { saveManager } from '../../systems/SaveManager';
import type { MenuButton } from '@/types/game';

type WelcomeState = 'intro' | 'menu' | 'saves' | 'chapters' | 'achievements' | 'settings' | 'narrative' | 'boot' | 'game';

export const WelcomePage = () => {
  const [state, setState] = useState<WelcomeState>('intro');
  const [hasExistingSave, setHasExistingSave] = useState(false);
  const [showIntro, setShowIntro] = useState(true);

  const { startGame } = useSystemStore();
  const { loadGame, saveGame, createCheckpoint } = useGameStore();

  // 检查是否有本地存档
  useEffect(() => {
    const checkSave = async () => {
      const hasSave = await saveManager.hasSaves();
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

  const handleNarrativeComplete = async () => {
    // 对话完成，显示开机画面
    setState('boot');
  };

  const handleBootComplete = async () => {
    // 开机完成，创建检查点并进入游戏
    await createCheckpoint('第一章开始');
    startGame();
    setState('game');
  };

  const handleMenuClick = async (button: MenuButton) => {
    console.log('Menu button clicked:', button);

    switch (button) {
      case 'start':
        // 开始游戏：创建新的检查点
        await createCheckpoint('游戏开始');
        // Start Game: Go to Narrative first
        setState('narrative');
        break;

      case 'continue':
        // 打开存档选择页面
        setState('saves');
        break;

      case 'chapters':
        // 打开章节选择
        setState('chapters');
        break;

      case 'achievements':
        // 打开成就页面
        setState('achievements');
        break;

      case 'settings':
        // 打开设置面板
        setState('settings');
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

  const handleLoadSave = async (saveId: string) => {
    try {
      const save = await saveManager.loadSave(saveId);
      if (save) {
        await loadGame(saveId);
        // 根据存档状态决定进入哪个场景
        if (save.sceneId === 'welcome' || save.sceneId === 'narrative') {
          setState('narrative');
        } else {
          setState('game');
          startGame();
        }
        console.log('[WelcomePage] Loaded save:', save.name);
      }
    } catch (error) {
      console.error('[WelcomePage] Failed to load save:', error);
      alert('读取存档失败');
    }
  };

  const handleSelectChapter = async (chapterId: number) => {
    // TODO: 实现章节选择逻辑
    console.log('[WelcomePage] Selected chapter:', chapterId);
    if (chapterId === 1) {
      await createCheckpoint(`第${chapterId}章开始`);
      setState('narrative');
    } else {
      alert(`第${chapterId}章内容开发中...`);
    }
  };

  const handleBackToMenu = () => {
    setState('menu');
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

        {state === 'saves' && (
          <motion.div
            key="saves"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            className="absolute inset-0 z-40"
          >
            <SaveLoadPage
              onBack={handleBackToMenu}
              onLoadSave={handleLoadSave}
            />
          </motion.div>
        )}

        {state === 'chapters' && (
          <motion.div
            key="chapters"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            className="absolute inset-0 z-40"
          >
            <ChapterSelectPage
              onBack={handleBackToMenu}
              onSelectChapter={handleSelectChapter}
            />
          </motion.div>
        )}

        {state === 'achievements' && (
          <motion.div
            key="achievements"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            className="absolute inset-0 z-40"
          >
            <AchievementsPage onBack={handleBackToMenu} />
          </motion.div>
        )}

        {state === 'settings' && (
          <motion.div
            key="settings"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            className="absolute inset-0 z-40"
          >
            <SettingsPage onBack={handleBackToMenu} />
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

        {state === 'boot' && (
          <motion.div
            key="boot"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 z-40"
          >
            <BootScreen onBootComplete={handleBootComplete} />
          </motion.div>
        )}

        {state === 'game' && (
          <motion.div
            key="game"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1 }}
            className="absolute inset-0 z-30"
          >
            <Desktop />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
