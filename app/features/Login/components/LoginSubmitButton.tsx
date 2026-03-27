"use client";

import { motion } from "motion/react";

interface LoginSubmitButtonProps {
  isLoading: boolean;
}

export function LoginSubmitButton({ isLoading }: LoginSubmitButtonProps) {
  return (
    <motion.button
      type="submit"
      disabled={isLoading}
      className="w-full py-3 px-6 rounded-lg bg-primary-500 hover:bg-primary-600 disabled:opacity-60 disabled:cursor-not-allowed text-white font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2"
      whileHover={{ scale: isLoading ? 1 : 1.01 }}
      whileTap={{ scale: isLoading ? 1 : 0.99 }}
    >
      {isLoading ? (
        <span className="flex items-center justify-center gap-2">
          <motion.span
            className="inline-block w-4 h-4 border-2 border-white border-t-transparent rounded-full"
            animate={{ rotate: 360 }}
            transition={{ duration: 0.7, repeat: Infinity, ease: "linear" }}
          />
          Iniciando sesión...
        </span>
      ) : (
        "Iniciar sesión"
      )}
    </motion.button>
  );
}
