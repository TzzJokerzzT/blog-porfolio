"use client";

import { motion } from "motion/react";
import { useState, useEffect } from "react";
import {
  TypewriterAdvancedProps,
  TypewriterEffectProps,
  TypewriterMultipleProps,
  TypewriterWordProps,
} from "./types";

export function TypewriterEffect({
  text,
  speed = 100,
  deleteSpeed = 50,
  pauseDuration = 2000,
  className = "text-2xl font-mono",
  showCursor = true,
  cursorChar = "|",
}: TypewriterEffectProps) {
  const [displayText, setDisplayText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);
  const [isComplete, setIsComplete] = useState(false);

  useEffect(() => {
    let timeout: NodeJS.Timeout;

    if (!isDeleting && displayText === text) {
      setIsComplete(true);
      timeout = setTimeout(() => {
        setIsDeleting(true);
        setIsComplete(false);
      }, pauseDuration);
    } else if (isDeleting && displayText === "") {
      setIsDeleting(false);
      timeout = setTimeout(() => {
        setDisplayText(text.charAt(0));
      }, speed);
    } else if (isDeleting) {
      timeout = setTimeout(() => {
        setDisplayText((prev) => prev.slice(0, -1));
      }, deleteSpeed);
    } else {
      timeout = setTimeout(() => {
        setDisplayText((prev) => text.slice(0, prev.length + 1));
      }, speed);
    }

    return () => clearTimeout(timeout);
  }, [
    displayText,
    isDeleting,
    text,
    speed,
    deleteSpeed,
    pauseDuration,
    isComplete,
  ]);

  return (
    <div className={`inline-block ${className}`}>
      <span>{displayText}</span>
      {showCursor && (
        <motion.span
          className="inline-block"
          animate={{ opacity: [1, 0] }}
          transition={{
            duration: 0.8,
            repeat: Infinity,
            repeatType: "reverse",
          }}
        >
          {cursorChar}
        </motion.span>
      )}
    </div>
  );
}

export function TypewriterMultiple({
  texts,
  speed = 100,
  deleteSpeed = 50,
  pauseDuration = 2000,
  className = "text-2xl font-mono",
  showCursor = true,
  cursorChar = "|",
}: TypewriterMultipleProps) {
  const [displayText, setDisplayText] = useState("");
  const [currentTextIndex, setCurrentTextIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const [isComplete, setIsComplete] = useState(false);

  const currentText = texts[currentTextIndex];

  useEffect(() => {
    let timeout: NodeJS.Timeout;

    if (!isDeleting && displayText === currentText) {
      setIsComplete(true);
      timeout = setTimeout(() => {
        setIsDeleting(true);
        setIsComplete(false);
      }, pauseDuration);
    } else if (isDeleting && displayText === "") {
      setIsDeleting(false);
      setCurrentTextIndex((prev) => (prev + 1) % texts.length);
      timeout = setTimeout(() => {
        setDisplayText(texts[(currentTextIndex + 1) % texts.length].charAt(0));
      }, speed);
    } else if (isDeleting) {
      timeout = setTimeout(() => {
        setDisplayText((prev) => prev.slice(0, -1));
      }, deleteSpeed);
    } else {
      timeout = setTimeout(() => {
        setDisplayText((prev) => currentText.slice(0, prev.length + 1));
      }, speed);
    }

    return () => clearTimeout(timeout);
  }, [
    displayText,
    isDeleting,
    currentText,
    currentTextIndex,
    texts,
    speed,
    deleteSpeed,
    pauseDuration,
    isComplete,
  ]);

  return (
    <div className={`inline-block ${className}`}>
      <span>{displayText}</span>
      {showCursor && (
        <motion.span
          className="inline-block"
          animate={{ opacity: [1, 0] }}
          transition={{
            duration: 0.8,
            repeat: Infinity,
            repeatType: "reverse",
          }}
        >
          {cursorChar}
        </motion.span>
      )}
    </div>
  );
}

export function TypewriterWord({
  text,
  speed = 150,
  deleteSpeed = 75,
  pauseDuration = 2000,
  className = "text-2xl font-mono",
  showCursor = true,
  cursorChar = "|",
  highlightColor = "text-primary-500",
}: TypewriterWordProps) {
  const [displayText, setDisplayText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);
  const [isComplete, setIsComplete] = useState(false);

  useEffect(() => {
    let timeout: NodeJS.Timeout;

    if (!isDeleting && displayText === text) {
      setIsComplete(true);
      timeout = setTimeout(() => {
        setIsDeleting(true);
        setIsComplete(false);
      }, pauseDuration);
    } else if (isDeleting && displayText === "") {
      setIsDeleting(false);
      timeout = setTimeout(() => {
        setDisplayText(text.charAt(0));
      }, speed);
    } else if (isDeleting) {
      timeout = setTimeout(() => {
        setDisplayText((prev) => prev.slice(0, -1));
      }, deleteSpeed);
    } else {
      timeout = setTimeout(() => {
        setDisplayText((prev) => text.slice(0, prev.length + 1));
      }, speed);
    }

    return () => clearTimeout(timeout);
  }, [
    displayText,
    isDeleting,
    text,
    speed,
    deleteSpeed,
    pauseDuration,
    isComplete,
  ]);

  return (
    <div className={`inline-block ${className}`}>
      <span className={highlightColor}>{displayText}</span>
      {showCursor && (
        <motion.span
          className={`inline-block ${highlightColor}`}
          animate={{ opacity: [1, 0] }}
          transition={{
            duration: 0.8,
            repeat: Infinity,
            repeatType: "reverse",
          }}
        >
          {cursorChar}
        </motion.span>
      )}
    </div>
  );
}

export function TypewriterAdvanced({
  text,
  speed = 100,
  deleteSpeed = 50,
  pauseDuration = 2000,
  className = "text-2xl font-mono",
  showCursor = true,
  cursorChar = "|",
  onComplete,
  onDelete,
  startDelay = 0,
}: TypewriterAdvancedProps) {
  const [displayText, setDisplayText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);
  const [isComplete, setIsComplete] = useState(false);
  const [hasStarted, setHasStarted] = useState(false);

  useEffect(() => {
    if (startDelay > 0 && !hasStarted) {
      const startTimeout = setTimeout(() => {
        setHasStarted(true);
      }, startDelay);
      return () => clearTimeout(startTimeout);
    } else {
      setHasStarted(true);
    }
  }, [startDelay, hasStarted]);

  useEffect(() => {
    if (!hasStarted) return;

    let timeout: NodeJS.Timeout;

    if (!isDeleting && displayText === text) {
      setIsComplete(true);
      onComplete?.();
      timeout = setTimeout(() => {
        setIsDeleting(true);
        setIsComplete(false);
        onDelete?.();
      }, pauseDuration);
    } else if (isDeleting && displayText === "") {
      setIsDeleting(false);
      timeout = setTimeout(() => {
        setDisplayText(text.charAt(0));
      }, speed);
    } else if (isDeleting) {
      timeout = setTimeout(() => {
        setDisplayText((prev) => prev.slice(0, -1));
      }, deleteSpeed);
    } else {
      timeout = setTimeout(() => {
        setDisplayText((prev) => text.slice(0, prev.length + 1));
      }, speed);
    }

    return () => clearTimeout(timeout);
  }, [
    displayText,
    isDeleting,
    text,
    speed,
    deleteSpeed,
    pauseDuration,
    isComplete,
    onComplete,
    onDelete,
    hasStarted,
  ]);

  return (
    <div className={`inline-block ${className}`}>
      <span>{displayText}</span>
      {showCursor && (
        <motion.span
          className="inline-block"
          animate={{ opacity: [1, 0] }}
          transition={{
            duration: 0.8,
            repeat: Infinity,
            repeatType: "reverse",
          }}
        >
          {cursorChar}
        </motion.span>
      )}
    </div>
  );
}

