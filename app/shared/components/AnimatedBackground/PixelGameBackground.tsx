'use client';

import { motion } from 'motion/react';
import { useMemo, useEffect, useState } from 'react';

interface PixelElement {
  id: number;
  x: number;
  y: number;
  type: 'coin' | 'power-up' | 'star' | 'heart' | 'gem' | 'pixel-cloud';
  color: string;
  size: number;
  duration: number;
  delay: number;
}



export function PixelGameBackground() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const pixelElements = useMemo(() => {
    if (!mounted) return [];
    
    const elementCount = 20;
    const types: PixelElement['type'][] = ['coin', 'power-up', 'star', 'heart', 'gem', 'pixel-cloud'];
    const colors = [
      '#FFD700', // Gold
      '#FF4444', // Red
      '#44FF44', // Green
      '#4444FF', // Blue
      '#FF44FF', // Magenta
      '#44FFFF', // Cyan
      '#FFAA00', // Orange
    ];
    
    return Array.from({ length: elementCount }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      type: types[Math.floor(Math.random() * types.length)],
      color: colors[Math.floor(Math.random() * colors.length)],
      size: Math.random() * 20 + 15,
      duration: Math.random() * 30 + 25,
      delay: Math.random() * 10,
    }));
  }, [mounted]);

  const floatingParticles = useMemo(() => {
    if (!mounted) return [];
    
    const particleCount = 50;
    const particleColors = ['#FFD700', '#FF4444', '#44FF44', '#4444FF', '#FF44FF'];
    
    return Array.from({ length: particleCount }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 4 + 2,
      color: particleColors[Math.floor(Math.random() * particleColors.length)],
      duration: Math.random() * 20 + 15,
      delay: Math.random() * 8,
    }));
  }, [mounted]);

  if (!mounted) {
    return (
      <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
        <div className="absolute inset-0 bg-gradient-to-br from-indigo-950/30 via-purple-950/20 to-blue-950/30" />
      </div>
    );
  }

  const renderPixelElement = (element: PixelElement) => {
    const baseClasses = "absolute opacity-80 dark:opacity-60";
    
    switch (element.type) {
      case 'coin':
        return (
          <div 
            className={`${baseClasses} border-2 border-yellow-400 bg-yellow-300 rounded-full relative overflow-hidden`}
            style={{ 
              width: element.size, 
              height: element.size,
              boxShadow: `0 0 10px ${element.color}40, inset 0 0 5px ${element.color}60`,
              imageRendering: 'pixelated',
            }}
          >
            <div className="absolute inset-1 border border-yellow-500 rounded-full" />
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-1 h-1 bg-yellow-600 rounded-full" />
          </div>
        );
      
      case 'power-up':
        return (
          <div 
            className={`${baseClasses} border-2 rounded-sm relative`}
            style={{ 
              width: element.size, 
              height: element.size,
              backgroundColor: element.color,
              borderColor: element.color,
              boxShadow: `0 0 8px ${element.color}60`,
              imageRendering: 'pixelated',
            }}
          >
            <div className="absolute inset-1 border rounded-sm opacity-60" style={{ borderColor: element.color }} />
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-2 h-2 rounded-sm" 
                 style={{ backgroundColor: element.color, filter: 'brightness(1.5)' }} />
          </div>
        );
      
      case 'star':
        return (
          <div 
            className={`${baseClasses} relative`}
            style={{ 
              width: element.size, 
              height: element.size,
              imageRendering: 'pixelated',
            }}
          >
            <div 
              className="absolute inset-0"
              style={{
                background: `linear-gradient(45deg, ${element.color} 25%, transparent 25%, transparent 75%, ${element.color} 75%), 
                           linear-gradient(-45deg, ${element.color} 25%, transparent 25%, transparent 75%, ${element.color} 75%)`,
                backgroundSize: '6px 6px',
                clipPath: 'polygon(50% 0%, 61% 35%, 98% 35%, 68% 57%, 79% 91%, 50% 70%, 21% 91%, 32% 57%, 2% 35%, 39% 35%)',
                boxShadow: `0 0 12px ${element.color}80`,
              }}
            />
          </div>
        );
      
      case 'heart':
        return (
          <div 
            className={`${baseClasses}`}
            style={{ 
              width: element.size, 
              height: element.size,
              imageRendering: 'pixelated',
            }}
          >
            <div 
              className="absolute inset-0 bg-red-500 border border-red-600"
              style={{
                clipPath: 'polygon(50% 85%, 20% 55%, 20% 35%, 35% 20%, 50% 35%, 65% 20%, 80% 35%, 80% 55%)',
                boxShadow: '0 0 8px #ff444480',
              }}
            />
          </div>
        );
      
      case 'gem':
        return (
          <div 
            className={`${baseClasses} relative`}
            style={{ 
              width: element.size, 
              height: element.size,
              imageRendering: 'pixelated',
            }}
          >
            <div 
              className="absolute inset-0 border-2"
              style={{
                backgroundColor: element.color,
                borderColor: element.color,
                clipPath: 'polygon(50% 0%, 80% 30%, 50% 100%, 20% 30%)',
                boxShadow: `0 0 10px ${element.color}60`,
              }}
            />
            <div 
              className="absolute inset-2 border"
              style={{
                backgroundColor: `${element.color}40`,
                borderColor: element.color,
                clipPath: 'polygon(50% 10%, 70% 35%, 50% 90%, 30% 35%)',
              }}
            />
          </div>
        );
      
      case 'pixel-cloud':
        return (
          <div 
            className={`${baseClasses} bg-white/70 dark:bg-white/40 border border-gray-300 dark:border-gray-600`}
            style={{ 
              width: element.size * 1.5, 
              height: element.size,
              imageRendering: 'pixelated',
              clipPath: 'polygon(20% 70%, 40% 70%, 40% 80%, 60% 80%, 60% 70%, 80% 70%, 80% 50%, 90% 50%, 90% 30%, 80% 30%, 80% 20%, 70% 20%, 70% 10%, 50% 10%, 50% 20%, 30% 20%, 30% 30%, 20% 30%, 20% 50%, 10% 50%, 10% 70%)',
              boxShadow: '0 2px 4px rgba(0,0,0,0.2)',
            }}
          />
        );
      
      default:
        return null;
    }
  };

  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
      {/* 8-bit style gradient background */}
      <div className="absolute inset-0 bg-gradient-to-br from-indigo-950/40 via-purple-950/30 to-blue-950/40 dark:from-indigo-950/60 dark:via-purple-950/50 dark:to-blue-950/60" />
      
      {/* Pixel grid pattern */}
      <div className="absolute inset-0 opacity-10 dark:opacity-20">
        <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern 
              id="pixel-grid" 
              width="20" 
              height="20" 
              patternUnits="userSpaceOnUse"
            >
              <rect width="20" height="20" fill="none" stroke="currentColor" strokeWidth="0.5" className="text-cyan-400"/>
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#pixel-grid)" />
        </svg>
      </div>

      {/* Floating pixel particles */}
      {floatingParticles.map((particle) => (
        <motion.div
          key={`particle-${particle.id}`}
          className="absolute rounded-sm"
          style={{
            width: particle.size,
            height: particle.size,
            backgroundColor: particle.color,
            boxShadow: `0 0 4px ${particle.color}80`,
            imageRendering: 'pixelated',
          }}
          initial={{
            x: `${particle.x}vw`,
            y: `${particle.y}vh`,
            opacity: 0,
            scale: 0,
          }}
          animate={{
            x: [`${particle.x}vw`, `${(particle.x + 20) % 100}vw`, `${particle.x}vw`],
            y: [`${particle.y}vh`, `${(particle.y - 30) % 100}vh`, `${particle.y}vh`],
            opacity: [0, 0.8, 0],
            scale: [0, 1, 0],
          }}
          transition={{
            duration: particle.duration,
            delay: particle.delay,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      ))}

      {/* Main game elements */}
      {pixelElements.map((element) => (
        <motion.div
          key={element.id}
          className="absolute"
          initial={{
            x: `${element.x}vw`,
            y: `${element.y}vh`,
            scale: 0,
            opacity: 0,
          }}
          animate={{
            x: [`${element.x}vw`, `${(element.x + 25) % 100}vw`, `${element.x}vw`],
            y: [`${element.y}vh`, `${(element.y + 15) % 100}vh`, `${element.y}vh`],
            scale: [0, 1.2, 1, 1.1, 1],
            opacity: [0, 1, 1, 1, 0],
            rotate: element.type === 'coin' ? [0, 360] : [0, 10, -10, 0],
          }}
          transition={{
            duration: element.duration,
            delay: element.delay,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        >
          {renderPixelElement(element)}
        </motion.div>
      ))}

      {/* Scanline effect */}
      <motion.div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'linear-gradient(transparent 50%, rgba(0, 255, 0, 0.03) 50%)',
          backgroundSize: '100% 4px',
        }}
        animate={{
          y: ['-100%', '100%'],
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
          ease: 'linear',
        }}
      />

      {/* Animated border with pixel corners */}
      <motion.div
        className="absolute inset-4 border-2 border-cyan-400/20 dark:border-cyan-400/30"
        style={{
          borderRadius: '0px',
          imageRendering: 'pixelated',
        }}
        animate={{
          borderColor: [
            'rgba(34, 211, 238, 0.2)',
            'rgba(168, 85, 247, 0.2)',
            'rgba(34, 197, 94, 0.2)',
            'rgba(34, 211, 238, 0.2)',
          ],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      />

      {/* Retro glow orbs */}
      {[
        { color: '#FFD700', size: 200, x: 10, y: 20 },
        { color: '#FF4444', size: 150, x: 80, y: 70 },
        { color: '#44FF44', size: 180, x: 60, y: 10 },
      ].map((orb, i) => (
        <motion.div
          key={`glow-${i}`}
          className="absolute rounded-full blur-3xl"
          style={{
            background: `radial-gradient(circle, ${orb.color}15 0%, transparent 70%)`,
            width: orb.size,
            height: orb.size,
          }}
          initial={{
            x: `${orb.x}%`,
            y: `${orb.y}%`,
          }}
          animate={{
            x: [`${orb.x}%`, `${orb.x + 10}%`, `${orb.x}%`],
            y: [`${orb.y}%`, `${orb.y + 15}%`, `${orb.y}%`],
            scale: [1, 1.2, 1],
          }}
          transition={{
            duration: 20 + i * 5,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      ))}
    </div>
  );
}