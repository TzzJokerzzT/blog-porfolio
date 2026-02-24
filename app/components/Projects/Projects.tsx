"use client";

import {
  H1TextAnimation,
  H3TextAnimation,
  PTextAnimation,
} from "@/shared/components/Animation/TextAnimation";
import { basics } from "@/shared/data/data.json";
import { motion } from "motion/react";
import Image from "next/image";
import Link from "next/link";

export function Projects() {
  return (
    <motion.div className="w-full my-10" initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.6 }}
    >
      <div className="mb-8">
        <H1TextAnimation size="md">Projects</H1TextAnimation>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {basics.projects.map((project) => (
          <div key={project.name}>
            <motion.div
              className="min-h-[310px] mb-5 group relative bg-background/80 border border-divider rounded-xl overflow-hidden hover:border-primary-500 transition-all duration-300 hover:shadow-lg hover:shadow-primary-500/10"
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
              <Link href={project.url} target="_blank" className="absolute inset-0">
                <Image
                  src={project.image}
                  alt={project.name}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
                <div className="absolute inset-0 bg-background/90 dark:bg-background/95 opacity-0 group-hover:opacity-100 transition-opacity duration-300 p-6 flex flex-col justify-between">
                  <div>
                    <H3TextAnimation size="sm">{project.name}</H3TextAnimation>
                    <PTextAnimation size="sm" align="left">
                      {project.description}
                    </PTextAnimation>
                  </div>
                  {"technologies" in project && (
                    <div className="flex flex-wrap gap-2 mt-4">
                      {(
                        project as typeof project & { technologies: string[] }
                      ).technologies.map((tech: string) => (
                        <motion.span
                          key={tech}
                          className="inline-flex items-center px-2.5 py-1 rounded-md text-xs font-medium bg-primary-100 dark:bg-primary-900/30 text-primary-700 dark:text-primary-300"
                          initial={{ opacity: 0, scale: 0.8 }}
                          animate={{ opacity: 1, scale: 1 }}
                          whileHover={{ scale: 1.1 }}
                        >
                          {tech}
                        </motion.span>
                      ))}
                    </div>
                  )}
                </div>
              </Link>
            </motion.div>
          </div>
        ))}
      </div>
    </motion.div>
  );
}
