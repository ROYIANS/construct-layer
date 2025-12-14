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
    { id: 'start', label: '开始游戏', disabled: false },
    { id: 'continue', label: '继续游戏', disabled: !hasExistingSave },
    { id: 'chapters', label: '章节选择', disabled: true },
    { id: 'achievements', label: '成就记录', disabled: false },
    { id: 'settings', label: '系统设置', disabled: false },
  ];

  return (
    <div className="fixed inset-0 flex items-center justify-end md:pr-32 font-serif overflow-hidden">
      {/* Background - Original Images */}
      <div className="absolute inset-0">
        {/* Mobile Background */}
        <div className="absolute inset-0 md:hidden bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: 'url(/assets/images/bg-welcome-mobile.jpg)' }}
        />
        {/* Desktop Background */}
        <div className="absolute inset-0 hidden md:block bg-cover bg-center bg-no-repeat transform hover:scale-105 transition-transform duration-[30s]"
          style={{ backgroundImage: 'url(/assets/images/bg-welcome-desktop.jpg)' }}
        />
        {/* Light Overlay for readability */}
        <div className="absolute inset-0 bg-white/10 mix-blend-overlay" />
        <div className="absolute inset-0 bg-gradient-to-l from-[#f5f5f0e6] via-[#f5f5f0b3] to-transparent" />
      </div>

      {/* Floating Particles (Dust Motes) */}
      <div className="absolute inset-0 pointer-events-none">
        {Array.from({ length: 20 }).map((_, i) => (
          <motion.div
            key={i}
            className="absolute bg-amber-500/20 rounded-full blur-[1px]"
            style={{
              width: Math.random() * 6 + 2 + 'px',
              height: Math.random() * 6 + 2 + 'px',
            }}
            initial={{
              x: Math.random() * window.innerWidth,
              y: Math.random() * window.innerHeight,
              opacity: 0,
            }}
            animate={{
              y: [null, Math.random() * -50],
              x: [null, Math.random() * 20 - 10],
              opacity: [0, 0.6, 0],
            }}
            transition={{
              duration: Math.random() * 8 + 8,
              repeat: Infinity,
              ease: 'easeInOut',
              delay: Math.random() * 5,
            }}
          />
        ))}
      </div>

      {/* Content Layout */}
      <div className="relative z-10 w-full md:w-[480px] h-full flex flex-col justify-center px-8 md:px-0">

        {/* Title Section */}
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1.2, delay: 0.3 }}
          className="mb-16 text-right md:text-left"
        >
          <div className="inline-block relative">
            <h1 className="font-calligraphy text-7xl md:text-8xl text-gray-800 mb-2 tracking-widest drop-shadow-sm">
              构造层
            </h1>
            <p className="text-amber-700/60 text-sm md:text-base tracking-[0.4em] font-sans font-bold uppercase mt-2 text-right">
              CONSTRUCT LAYER
            </p>
            <motion.div
              animate={{ width: ['0%', '100%'] }}
              transition={{ duration: 1.5, delay: 0.8 }}
              className="h-[2px] bg-amber-800/20 mt-6 ml-auto"
            />
          </div>
        </motion.div>

        {/* Menu Buttons */}
        <div className="space-y-3 relative">
          {/* Frosted Glass Panel */}
          <div className="absolute -inset-6 bg-white/60 backdrop-blur-sm rounded-xl border border-white/40 shadow-xl shadow-amber-900/5 -z-10" />

          {menuButtons.map((button, index) => (
            <motion.button
              key={button.id}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 1 + index * 0.1 }}
              disabled={button.disabled}
              onClick={() => !button.disabled && onMenuClick(button.id)}
              onMouseEnter={() => setHoveredButton(button.id)}
              onMouseLeave={() => setHoveredButton(null)}
              className={`
                group w-full flex items-center justify-between py-3 px-6 rounded-lg relative
                transition-all duration-300
                ${button.disabled
                  ? 'text-gray-400 cursor-not-allowed bg-gray-100/50'
                  : 'text-gray-700 hover:text-amber-900 hover:bg-white/80 hover:shadow-md'
                }
              `}
            >
              <div className="flex items-center gap-3">
                {/* Active Indicator */}
                <motion.div
                  initial={false}
                  animate={{
                    width: hoveredButton === button.id && !button.disabled ? 4 : 0,
                    opacity: hoveredButton === button.id && !button.disabled ? 1 : 0
                  }}
                  className="h-4 bg-amber-600 rounded-full"
                />
                <span className={`text-lg md:text-xl font-bold tracking-widest transition-all duration-300`}>
                  {button.label}
                </span>
              </div>

              {/* Arrow / Lock Icon */}
              <div className="text-gray-400">
                {button.disabled ? (
                  <span className="text-sm">🔒</span>
                ) : (
                  <motion.span
                    animate={{ x: hoveredButton === button.id ? 3 : 0, opacity: hoveredButton === button.id ? 1 : 0 }}
                    className="text-amber-600"
                  >
                    ❧
                  </motion.span>
                )}
              </div>
            </motion.button>
          ))}
        </div>

        {/* Footer */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 2 }}
          className="mt-8 flex justify-between items-center text-xs text-gray-500 font-sans"
        >
          <span>v1.0.0_ALPHA</span>
          <button
            onClick={() => onMenuClick('intro')}
            className="hover:text-amber-700 transition-colors tracking-widest"
          >
            重看序幕
          </button>
        </motion.div>
      </div>
    </div>
  );
};
