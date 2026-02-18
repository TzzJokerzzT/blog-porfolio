"use client";

import { motion } from "motion/react";
import { Experience } from "../../data/experience";

interface ExperienceCardProps {
  experience: Experience;
}

export function ExperienceCard({ experience }: ExperienceCardProps) {
  return (
    <motion.div
      className="min-h-[310px] group relative bg-background/80 backdrop-blur-sm border border-divider rounded-xl p-6 hover:border-primary-500 transition-all duration-300 hover:shadow-lg hover:shadow-primary-500/10"
      whileHover={{
        scale: 1.02,
        y: -4,
      }}
      transition={{
        type: "spring",
        stiffness: 300,
        damping: 20,
      }}
    >
      <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2 mb-4">
        <div className="flex-1">
          <motion.h3
            className="text-xl font-semibold text-foreground group-hover:text-primary-500 transition-colors"
            layoutId={`title-${experience.company}`}
          >
            {experience.title}
          </motion.h3>
          <motion.p
            className="text-lg font-medium text-primary-600 dark:text-primary-400"
            layoutId={`company-${experience.company}`}
          >
            {experience.company}
          </motion.p>
        </div>
        <div className="text-sm text-foreground-secondary">
          <div className="flex items-center gap-2">
            <motion.span
              className="bg-success-100 dark:bg-success-900/30 text-success-700 dark:text-success-300 px-2 py-1 rounded-md font-medium"
              whileHover={{ scale: 1.05 }}
            >
              {experience.type}
            </motion.span>
          </div>
          <div className="mt-1 text-right">
            <p>{experience.period}</p>
            {experience.location && <p>{experience.location}</p>}
          </div>
        </div>
      </div>

      <div className="mb-4">
        <ul className="space-y-2">
          {experience.description.map((item, index) => (
            <motion.li
              key={index}
              className="flex items-start gap-2 text-foreground-secondary"
              initial={{ opacity: 0, x: -10 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
            >
              <motion.span
                className="inline-block w-1.5 h-1.5 bg-primary-500 rounded-full mt-2 flex-shrink-0"
                animate={{
                  scale: [1, 1.2, 1],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  delay: index * 0.2,
                }}
              />
              <span>{item}</span>
            </motion.li>
          ))}
        </ul>
      </div>

      <div className="flex flex-wrap gap-2">
        {experience.technologies.map((tech, index) => (
          <motion.span
            key={tech}
            className="inline-flex items-center px-2.5 py-1 rounded-md text-xs font-medium bg-default-100 dark:bg-default-800 text-default-700 dark:text-default-300 hover:bg-primary-100 dark:hover:bg-primary-900/30 hover:text-primary-700 dark:hover:text-primary-300 transition-colors cursor-default"
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{
              delay: index * 0.05,
              type: "spring",
              stiffness: 200,
              damping: 10,
            }}
            whileHover={{
              scale: 1.1,
              y: -2,
            }}
          >
            {tech}
          </motion.span>
        ))}
      </div>

      <motion.div
        className="absolute inset-0 rounded-xl bg-gradient-to-r from-primary-500/5 to-secondary-500/5 opacity-0 group-hover:opacity-100 pointer-events-none"
        initial={{ opacity: 0 }}
        whileHover={{ opacity: 1 }}
        transition={{ duration: 0.3 }}
      />
    </motion.div>
  );
}

