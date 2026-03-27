"use client";

import { motion } from "motion/react";
import { Login } from "@/features/Login/Login";

export function LoginView() {
  return (
    <section className="min-h-[80vh] flex items-center justify-center px-4">
      <div className="w-full max-w-md">
        <motion.div
          className="text-center mb-10"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="text-4xl font-bold text-foreground mb-2">
            Iniciar sesión
          </h1>
          <p className="text-foreground-secondary">
            Accede para gestionar el contenido del blog.
          </p>
        </motion.div>

        <motion.div
          className="p-8 rounded-xl bg-background/80 backdrop-blur-sm border border-divider"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          <Login />
        </motion.div>
      </div>
    </section>
  );
}
