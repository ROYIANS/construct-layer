// 游戏状态类型
export interface GameState {
  currentChapter: number;
  currentScene: string;
  flags: Record<string, boolean>;
  variables: Record<string, any>;
  playTime: number;
}

// 存档数据类型
export interface SaveData {
  id: string;
  name: string;
  timestamp: Date;
  thumbnail?: string;
  chapterId: number;
  sceneId: string;
  gameState: GameState;
  metadata: {
    playTime: number;
    saveCount: number;
    version: string;
  };
}

// 章节数据类型
export interface ChapterData {
  id: number;
  title: string;
  subtitle: string;
  locked: boolean;
  completed: boolean;
  thumbnail?: string;
  unlockCondition?: string;
}

// 成就数据类型
export interface Achievement {
  id: string;
  title: string;
  description: string;
  icon: string;
  condition: {
    type: 'flag' | 'count' | 'time' | 'custom';
    target: string;
    value?: number;
    check?: () => boolean;
  };
  reward?: {
    type: 'unlockChapter' | 'unlockEnding' | 'cosmetic';
    value: string;
  };
  unlocked: boolean;
  unlockedAt?: Date;
  hidden: boolean;
  progress?: number;
}

// 菜单按钮类型
export type MenuButton = 'start' | 'continue' | 'chapters' | 'achievements' | 'settings' | 'intro';
