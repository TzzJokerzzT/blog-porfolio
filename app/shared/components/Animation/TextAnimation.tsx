"use client";

import { motion } from "motion/react";
import { TextAnimationProps } from "./types";

export function H1TextAnimation({
  children,
  align = "left",
  size = "lg",
  className = "",
}: TextAnimationProps) {
  const alignClasses = {
    left: "text-left",
    center: "text-center",
    right: "text-right",
    justify: "text-justify",
  };

  const sizeClasses = {
    xs: "text-2xl sm:text-3xl lg:text-4xl",
    sm: "text-3xl sm:text-4xl lg:text-5xl",
    md: "text-4xl sm:text-5xl lg:text-6xl",
    lg: "text-5xl sm:text-6xl lg:text-7xl",
    xl: "text-6xl sm:text-7xl lg:text-8xl",
  };

  return (
    <motion.h1
      className={`${sizeClasses[size]} font-bold text-foreground mb-6 ${alignClasses[align]} ${className}`}
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay: 0.2 }}
    >
      {children}
    </motion.h1>
  );
}

export function H2TextAnimation({
  children,
  align = "left",
  size = "md",
  className = "",
}: TextAnimationProps) {
  const alignClasses = {
    left: "text-left",
    center: "text-center",
    right: "text-right",
    justify: "text-justify",
  };

  const sizeClasses = {
    xs: "text-xl sm:text-2xl lg:text-3xl",
    sm: "text-2xl sm:text-3xl lg:text-4xl",
    md: "text-3xl sm:text-4xl lg:text-5xl",
    lg: "text-4xl sm:text-5xl lg:text-6xl",
    xl: "text-5xl sm:text-6xl lg:text-7xl",
  };

  return (
    <motion.h2
      className={`${sizeClasses[size]} font-bold text-foreground ${alignClasses[align]} ${className}`}
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay: 0.4 }}
    >
      {children}
    </motion.h2>
  );
}

export function H3TextAnimation({
  children,
  align = "left",
  size = "md",
  className = "",
}: TextAnimationProps) {
  const alignClasses = {
    left: "text-left",
    center: "text-center",
    right: "text-right",
    justify: "text-justify",
  };

  const sizeClasses = {
    xs: "text-lg sm:text-xl lg:text-2xl",
    sm: "text-xl sm:text-2xl lg:text-3xl",
    md: "text-2xl sm:text-3xl lg:text-4xl",
    lg: "text-3xl sm:text-4xl lg:text-5xl",
    xl: "text-4xl sm:text-5xl lg:text-6xl",
  };

  return (
    <motion.h3
      className={`${sizeClasses[size]} font-bold text-foreground ${alignClasses[align]} ${className}`}
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay: 0.4 }}
    >
      {children}
    </motion.h3>
  );
}

export function PTextAnimation({
  children,
  align = "center",
  size = "md",
  className = "",
}: TextAnimationProps) {
  const alignClasses = {
    left: "text-left",
    center: "text-center",
    right: "text-right",
    justify: "text-justify",
  };

  const containerClasses = {
    left: "mr-auto",
    center: "mx-auto",
    right: "ml-auto",
    justify: "mx-auto",
  };

  const sizeClasses = {
    xs: "text-sm sm:text-base",
    sm: "text-base sm:text-lg",
    md: "text-lg sm:text-xl",
    lg: "text-xl sm:text-2xl",
    xl: "text-2xl sm:text-3xl",
  };

  return (
    <motion.p
      className={`${sizeClasses[size]} text-foreground-secondary max-w-3xl leading-relaxed ${alignClasses[align]} ${containerClasses[align]} ${className}`}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay: 0.6 }}
    >
      {children}
    </motion.p>
  );
}
