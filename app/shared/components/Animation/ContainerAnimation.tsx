"use client";

import { motion } from "motion/react";
import { AnimationProps } from "./types";

export function ContainerAnimated({ children, delay = 0.2 }: AnimationProps) {
  return (
    <motion.div
      className="flex flex-col sm:flex-row gap-4 justify-center"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay: delay }}
    >
      {children}
    </motion.div>
  );
}
