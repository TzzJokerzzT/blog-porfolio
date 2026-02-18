'use client';

import { motion } from 'motion/react';
import { useMemo, useEffect, useState } from 'react';

interface FloatingShape {
  id: number;
  x: number;
  y: number;
  size: number;
  duration: number;
  delay: number;
  type: 'circle' | 'square' | 'dot';
}

export function AnimatedBackground() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const shapes = useMemo(() => {
    if (!mounted) return [];
    
    const shapeCount = 15;
    const types: FloatingShape['type'][] = ['circle', 'square', 'dot'];
    
    return Array.from({ length: shapeCount }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 40 + 10,
      duration: Math.random() * 25 + 20,
      delay: Math.random() * 8,
      type: types[Math.floor(Math.random() * types.length)]
    }));
  }, [mounted]);

  const orbs = useMemo(() => {
    if (!mounted) return [];
    
    return [
      { id: 'orb1', color: 'rgba(59, 130, 246, 0.1)', size: 400 },
      { id: 'orb2', color: 'rgba(168, 85, 247, 0.08)', size: 350 },
      { id: 'orb3', color: 'rgba(34, 197, 94, 0.06)', size: 300 },
    ];
  }, [mounted]);

  if (!mounted) {
    return (
      <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
        <div className="absolute inset-0 bg-gradient-to-br from-primary-50/30 via-transparent to-secondary-50/30 dark:from-primary-950/30 dark:via-transparent dark:to-secondary-950/30" />
      </div>
    );
  }

  const renderShape = (shape: FloatingShape) => {
    const baseClasses = "absolute opacity-30 dark:opacity-20";
    
    switch (shape.type) {
      case 'circle':
        return (
          <div 
            className={`${baseClasses} bg-gradient-to-br from-primary-500/40 to-secondary-500/40 dark:from-primary-400/30 dark:to-secondary-400/30 rounded-full blur-sm`}
            style={{ 
              width: shape.size, 
              height: shape.size 
            }}
          />
        );
      case 'square':
        return (
          <div 
            className={`${baseClasses} bg-gradient-to-br from-secondary-500/40 to-primary-500/40 dark:from-secondary-400/30 dark:to-primary-400/30 rounded-lg blur-sm rotate-45`}
            style={{ 
              width: shape.size, 
              height: shape.size 
            }}
          />
        );
      case 'dot':
        return (
          <div 
            className={`${baseClasses} bg-primary-500/50 dark:bg-primary-400/40 rounded-full`}
            style={{ 
              width: shape.size / 3, 
              height: shape.size / 3 
            }}
          />
        );
      default:
        return null;
    }
  };

  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
      {/* Base gradient overlays */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary-50/30 via-transparent to-secondary-50/30 dark:from-primary-950/30 dark:via-transparent dark:to-secondary-950/30" />
      <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-background/5 to-transparent" />
      
      {/* Floating shapes */}
      {shapes.map((shape) => (
        <motion.div
          key={shape.id}
          className="absolute"
          initial={{
            x: `${shape.x}vw`,
            y: `${shape.y}vh`,
            rotate: 0,
            scale: 0.5,
            opacity: 0,
          }}
          animate={{
            x: [`${shape.x}vw`, `${(shape.x + 15) % 100}vw`, `${shape.x}vw`],
            y: [`${shape.y}vh`, `${(shape.y + 20) % 100}vh`, `${shape.y}vh`],
            rotate: [0, 360],
            scale: [0.5, 1, 0.5],
            opacity: [0, 1, 0],
          }}
          transition={{
            duration: shape.duration,
            delay: shape.delay,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        >
          {renderShape(shape)}
        </motion.div>
      ))}
      
      {/* Subtle grid pattern */}
      <div className="absolute inset-0 opacity-5 dark:opacity-10">
        <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern 
              id="bg-grid" 
              width="80" 
              height="80" 
              patternUnits="userSpaceOnUse"
            >
              <path 
                d="M 80 0 L 0 0 0 80" 
                fill="none" 
                stroke="currentColor" 
                strokeWidth="1"
                className="text-foreground"
              />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#bg-grid)" />
        </svg>
      </div>
      
      {/* Large floating orbs with glow effect */}
      {orbs.map((orb, i) => (
        <motion.div
          key={orb.id}
          className="absolute rounded-full blur-3xl"
          style={{
            background: `radial-gradient(circle, ${orb.color} 0%, transparent 70%)`,
            width: orb.size,
            height: orb.size,
          }}
          initial={{
            x: `${20 + i * 30}%`,
            y: `${30 + i * 20}%`,
          }}
          animate={{
            x: [`${20 + i * 30}%`, `${40 + i * 20}%`, `${20 + i * 30}%`],
            y: [`${30 + i * 20}%`, `${50 + i * 15}%`, `${30 + i * 20}%`],
          }}
          transition={{
            duration: 30 + i * 10,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      ))}
      
      {/* Animated border glow */}
      <motion.div
        className="absolute inset-0 rounded-3xl"
        style={{
          background: 'linear-gradient(45deg, transparent 0%, rgba(59, 130, 246, 0.03) 25%, transparent 50%, rgba(168, 85, 247, 0.03) 75%, transparent 100%)',
        }}
        animate={{
          rotate: [0, 360],
        }}
        transition={{
          duration: 60,
          repeat: Infinity,
          ease: "linear",
        }}
      />
    </div>
  );
}