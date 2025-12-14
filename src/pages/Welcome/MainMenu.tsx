import { motion } from 'framer-motion';
import { useState } from 'react';
import type { MenuButton } from '@/types/game';

interface MainMenuProps {
  hasExistingSave: boolean;
  onMenuClick: (button: MenuButton) => void;
}

export const MainMenu = ({ hasExistingSave, onMenuClick }: MainMenuProps) => {
  const [hoveredButton, setHoveredButton] = useState<MenuButton | null>(null);

  const menuButtons: { id: MenuButton; label: string; disabled?: boolean }[] = [
    { id: 'start', label: '开始游戏' },
    { id: 'continue', label: '继续游戏', disabled: !hasExistingSave },
    { id: 'chapters', label: '章节选择', disabled: true }, // 初始锁定
    { id: 'achievements', label: '成就', disabled: false },
    { id: 'settings', label: '设置' },
  ];

  return (
    <div className="fixed inset-0 flex items-center justify-center">
      {/* 背景图片 - 响应式切换PC/移动端 */}
      <div className="absolute inset-0">
        {/* 移动端背景 (竖屏) */}
        <div
          className="absolute inset-0 md:hidden bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: 'url(/assets/images/bg-welcome-mobile.jpg)',
          }}
        />
        {/* PC端背景 (横屏) */}
        <div
          className="absolute inset-0 hidden md:block bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: 'url(/assets/images/bg-welcome-desktop.jpg)',
          }}
        />
        {/* 降级背景渐变（图片未加载时显示） */}
        <div className="absolute inset-0 bg-gradient-to-b from-gray-900 via-blue-900 to-black -z-10" />
        {/* 半透明遮罩层，确保文字可读 */}
        <div className="absolute inset-0 bg-black/40" />
      </div>

      {/* 动态粒子背景 */}
      <div className="absolute inset-0 overflow-hidden">
        {Array.from({ length: 50 }).map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-blue-400/30 rounded-full"
            initial={{
              x: Math.random() * window.innerWidth,
              y: Math.random() * window.innerHeight,
            }}
            animate={{
              y: [null, Math.random() * window.innerHeight],
              opacity: [0, 1, 0],
            }}
            transition={{
              duration: Math.random() * 10 + 5,
              repeat: Infinity,
              ease: 'linear',
            }}
          />
        ))}
      </div>

      {/* 主内容 */}
      <div className="relative z-10 w-full max-w-md px-6">
        {/* Logo */}
        <motion.div
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.5 }}
          className="text-center mb-16"
        >
          <h1 className="text-6xl md:text-7xl font-bold text-white mb-4 tracking-wider text-glow">
            构造层
          </h1>
          <p className="text-blue-300 text-sm md:text-base tracking-widest">
            CONSTRUCT LAYER
          </p>
          <div className="mt-4 text-white/40 text-xs">
            在这里，存在即是问题
          </div>
        </motion.div>

        {/* 菜单按钮 */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 1 }}
          className="space-y-4"
        >
          {menuButtons.map((button, index) => (
            <motion.button
              key={button.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 1 + index * 0.1 }}
              disabled={button.disabled}
              onClick={() => !button.disabled && onMenuClick(button.id)}
              onMouseEnter={() => setHoveredButton(button.id)}
              onMouseLeave={() => setHoveredButton(null)}
              className={`
                w-full py-4 px-6 rounded-xl font-medium text-lg
                transition-all duration-300 relative overflow-hidden
                ${
                  button.disabled
                    ? 'bg-gray-800/30 text-gray-600 cursor-not-allowed'
                    : 'bg-white/10 text-white hover:bg-white/20 active:scale-95'
                }
                ${hoveredButton === button.id && !button.disabled ? 'shadow-lg shadow-blue-500/50' : ''}
              `}
            >
              {/* 按钮发光效果 */}
              {hoveredButton === button.id && !button.disabled && (
                <motion.div
                  layoutId="buttonGlow"
                  className="absolute inset-0 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-xl"
                  transition={{ type: 'spring', duration: 0.6 }}
                />
              )}

              <span className="relative z-10">{button.label}</span>

              {/* 锁定图标 */}
              {button.disabled && (
                <span className="absolute right-4 top-1/2 transform -translate-y-1/2">
                  🔒
                </span>
              )}
            </motion.button>
          ))}
        </motion.div>

        {/* 底部信息 */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 2 }}
          className="mt-12 text-center space-y-2"
        >
          <button
            onClick={() => onMenuClick('intro')}
            className="text-white/40 hover:text-white/60 text-sm transition-colors"
          >
            重看引子
          </button>
          <div className="text-white/30 text-xs">
            v1.0.0 | 游玩进度: 0%
          </div>
        </motion.div>
      </div>
    </div>
  );
};
