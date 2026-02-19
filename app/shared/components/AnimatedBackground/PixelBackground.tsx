'use client';

import { motion } from 'motion/react';
import { useMemo, useEffect, useState } from 'react';

interface GameElement {
  id: number;
  x: number;
  y: number;
  size: number;
  duration: number;
  delay: number;
  type: 'mario-block' | 'pacman-dot' | 'space-invader' | 'tetris-block' | 'coin' | 'power-up' | 'enemy';
  color: string;
}

export function PixelBackground() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const gameElements = useMemo(() => {
    if (!mounted) return [];
    
    const elementCount = 25;
    const types: GameElement['type'][] = ['mario-block', 'pacman-dot', 'space-invader', 'tetris-block', 'coin', 'power-up', 'enemy'];
    const colors = {
      'mario-block': '#8B4513',
      'pacman-dot': '#FFFF00',
      'space-invader': '#00FF00',
      'tetris-block': '#FF6600',
      'coin': '#FFD700',
      'power-up': '#FF69B4',
      'enemy': '#FF0000'
    };
    
    return Array.from({ length: elementCount }, (_, i) => {
      const type = types[Math.floor(Math.random() * types.length)];
      return {
        id: i,
        x: Math.random() * 100,
        y: Math.random() * 100,
        size: type === 'pacman-dot' ? 8 : Math.random() * 20 + 12,
        duration: Math.random() * 25 + 20,
        delay: Math.random() * 15,
        type,
        color: colors[type]
      };
    });
  }, [mounted]);

  const platforms = useMemo(() => {
    if (!mounted) return [];
    
    return Array.from({ length: 4 }, (_, i) => ({
      id: i,
      x: Math.random() * 80,
      y: 20 + i * 20,
      width: 60 + Math.random() * 40,
      duration: 30 + Math.random() * 20
    }));
  }, [mounted]);

  if (!mounted) {
    return (
      <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
        <div className="absolute inset-0 bg-gradient-to-b from-indigo-900/20 via-purple-900/10 to-black/20 dark:from-indigo-950/40 dark:via-purple-950/20 dark:to-black/40" />
      </div>
    );
  }

  const renderGameElement = (element: GameElement) => {
    const baseClasses = "absolute";
    const style = {
      width: element.size,
      height: element.size,
      imageRendering: 'pixelated' as const,
    };

    switch (element.type) {
      case 'mario-block':
        return (
          <div className={`${baseClasses} bg-yellow-600`} style={style}>
            <div className="absolute inset-0 border-2 border-yellow-400" />
            <div className="absolute top-1 left-1 w-1 h-1 bg-white" />
            <div className="absolute top-1 right-1 w-1 h-1 bg-white" />
            <div className="absolute bottom-1 left-1 w-1 h-1 bg-yellow-800" />
            <div className="absolute bottom-1 right-1 w-1 h-1 bg-yellow-800" />
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-2 h-2 bg-yellow-300 rounded-sm" />
          </div>
        );

      case 'pacman-dot':
        return (
          <div 
            className={`${baseClasses} bg-yellow-300 rounded-full shadow-glow`}
            style={style}
          />
        );

      case 'space-invader':
        return (
          <div className={`${baseClasses} bg-green-400`} style={style}>
            <div className="absolute inset-0 pixel-art-invader">
              <div className="absolute top-0 left-1/4 right-1/4 h-1/4 bg-current" />
              <div className="absolute top-1/4 left-1/8 right-1/8 h-1/4 bg-current" />
              <div className="absolute top-1/2 left-0 right-0 h-1/4 bg-current" />
              <div className="absolute bottom-1/4 left-1/8 w-1/8 h-1/4 bg-current" />
              <div className="absolute bottom-1/4 right-1/8 w-1/8 h-1/4 bg-current" />
              <div className="absolute bottom-0 left-1/4 w-1/8 h-1/4 bg-current" />
              <div className="absolute bottom-0 right-1/4 w-1/8 h-1/4 bg-current" />
            </div>
          </div>
        );

      case 'tetris-block':
        return (
          <div className={`${baseClasses}`} style={{...style, backgroundColor: element.color}}>
            <div className="absolute inset-0 border border-white/20" />
            <div className="absolute top-0 left-0 w-full h-1 bg-white/40" />
            <div className="absolute top-0 left-0 w-1 h-full bg-white/40" />
            <div className="absolute bottom-0 left-0 w-full h-1 bg-black/40" />
            <div className="absolute top-0 right-0 w-1 h-full bg-black/40" />
          </div>
        );

      case 'coin':
        return (
          <div 
            className={`${baseClasses} bg-yellow-400 rounded-full border-2 border-yellow-300`}
            style={style}
          >
            <div className="absolute inset-2 bg-yellow-200 rounded-full" />
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-1 h-3 bg-yellow-600" />
          </div>
        );

      case 'power-up':
        return (
          <div className={`${baseClasses} bg-pink-500 rounded-lg`} style={style}>
            <div className="absolute inset-1 bg-pink-300 rounded" />
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-2 h-2 bg-white rounded-full animate-pulse" />
          </div>
        );

      case 'enemy':
        return (
          <div className={`${baseClasses} bg-red-600`} style={style}>
            <div className="absolute top-1 left-1 right-1 h-1 bg-red-800" />
            <div className="absolute top-2 left-2 w-1 h-1 bg-white" />
            <div className="absolute top-2 right-2 w-1 h-1 bg-white" />
            <div className="absolute bottom-1 left-1 right-1 h-1 bg-red-800" />
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
      {/* Retro gaming gradient background */}
      <div className="absolute inset-0 bg-gradient-to-b from-indigo-900/20 via-purple-900/10 to-black/20 dark:from-indigo-950/40 dark:via-purple-950/20 dark:to-black/40" />
      
      {/* Arcade cabinet style border effect */}
      <div className="absolute inset-0 border-8 border-gradient-to-r from-cyan-500/20 via-magenta-500/20 to-yellow-500/20" />
      
      {/* Pixel perfect grid */}
      <div className="absolute inset-0 opacity-5 dark:opacity-10">
        <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern 
              id="game-grid" 
              width="32" 
              height="32" 
              patternUnits="userSpaceOnUse"
            >
              <rect width="32" height="32" fill="none" stroke="currentColor" strokeWidth="0.5" />
              <rect x="0" y="0" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="0.25" opacity="0.5" />
              <rect x="16" y="16" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="0.25" opacity="0.5" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#game-grid)" />
        </svg>
      </div>

      {/* Floating platforms like classic platformer games */}
      {platforms.map((platform) => (
        <motion.div
          key={`platform-${platform.id}`}
          className="absolute bg-gradient-to-r from-green-600 to-green-400 border-t-2 border-green-300 border-b-2 border-green-800"
          style={{
            width: platform.width,
            height: 16,
            imageRendering: 'pixelated'
          }}
          initial={{
            x: `${platform.x}vw`,
            y: `${platform.y}vh`,
          }}
          animate={{
            x: [`${platform.x}vw`, `${(platform.x + 20) % 80}vw`, `${platform.x}vw`],
          }}
          transition={{
            duration: platform.duration,
            repeat: Infinity,
            ease: "linear",
          }}
        />
      ))}

      {/* Game elements animation */}
      {gameElements.map((element) => (
        <motion.div
          key={element.id}
          className="absolute"
          initial={{
            x: `${element.x}vw`,
            y: `${element.y}vh`,
            opacity: 0,
            scale: 0,
          }}
          animate={{
            x: [`${element.x}vw`, `${(element.x + 15) % 100}vw`, `${element.x}vw`],
            y: element.type === 'coin' || element.type === 'power-up' 
              ? [`${element.y}vh`, `${element.y - 10}vh`, `${element.y}vh`]
              : [`${element.y}vh`, `${element.y + 10}vh`, `${element.y}vh`],
            opacity: [0, 1, 1, 1, 0],
            scale: element.type === 'pacman-dot' 
              ? [0, 1, 1.2, 1, 0]
              : [0, 1, 1, 1, 0],
            rotate: element.type === 'coin' ? [0, 360] : 0,
          }}
          transition={{
            duration: element.duration,
            delay: element.delay,
            repeat: Infinity,
            ease: element.type === 'space-invader' ? "easeInOut" : "linear",
          }}
        >
          {renderGameElement(element)}
        </motion.div>
      ))}

      {/* Classic arcade scanlines */}
      <motion.div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'repeating-linear-gradient(0deg, transparent, transparent 3px, rgba(0, 255, 0, 0.02) 3px, rgba(0, 255, 0, 0.02) 4px)',
        }}
        animate={{
          opacity: [0.4, 0.2, 0.4],
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      {/* Retro CRT flicker effect */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-b from-transparent via-green-400/5 to-transparent"
        animate={{
          y: ['-100%', '100%'],
          opacity: [0, 0.3, 0],
        }}
        transition={{
          duration: 4,
          delay: 2,
          repeat: Infinity,
          ease: "linear",
        }}
      />

      {/* Game over style glitch */}
      <motion.div
        className="absolute inset-0"
        animate={{
          x: [-1, 1, -2, 2, 0],
          opacity: [0, 0.1, 0, 0.15, 0],
        }}
        transition={{
          duration: 0.2,
          delay: 15,
          repeat: Infinity,
          repeatDelay: 25,
        }}
        style={{
          background: 'linear-gradient(90deg, rgba(255,0,0,0.1) 0%, transparent 50%, rgba(0,0,255,0.1) 100%)',
        }}
      />

      {/* Classic arcade game HUD elements */}
      <div className="absolute top-4 left-4 right-4 flex justify-between opacity-20 dark:opacity-30">
        <div className="text-green-400 font-mono text-xs">SCORE: 000000</div>
        <div className="text-yellow-400 font-mono text-xs">LEVEL: 01</div>
        <div className="text-red-400 font-mono text-xs">LIVES: ♥♥♥</div>
      </div>

      {/* Boss battle style background pulse */}
      <motion.div
        className="absolute inset-0 bg-red-500/5 dark:bg-red-400/10"
        animate={{
          opacity: [0, 0.3, 0],
          scale: [1, 1.02, 1],
        }}
        transition={{
          duration: 6,
          delay: 25,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
    </div>
  );
}