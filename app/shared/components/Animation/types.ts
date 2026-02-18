export interface AnimationProps {
  children: React.ReactNode;
  delay?: number;
}

export interface TextAnimationProps {
  children: React.ReactNode;
  align?: "left" | "center" | "right" | "justify";
  size?: "xs" | "sm" | "md" | "lg" | "xl";
  className?: string;
}

export interface TypewriterEffectProps {
  text: string;
  speed?: number;
  deleteSpeed?: number;
  pauseDuration?: number;
  className?: string;
  showCursor?: boolean;
  cursorChar?: string;
}

export interface TypewriterMultipleProps {
  texts: string[];
  speed?: number;
  deleteSpeed?: number;
  pauseDuration?: number;
  className?: string;
  showCursor?: boolean;
  cursorChar?: string;
}

export interface TypewriterWordProps {
  text: string;
  speed?: number;
  deleteSpeed?: number;
  pauseDuration?: number;
  className?: string;
  showCursor?: boolean;
  cursorChar?: string;
  highlightColor?: string;
}

export interface TypewriterAdvancedProps {
  text: string;
  speed?: number;
  deleteSpeed?: number;
  pauseDuration?: number;
  className?: string;
  showCursor?: boolean;
  cursorChar?: string;
  onComplete?: () => void;
  onDelete?: () => void;
  startDelay?: number;
}
