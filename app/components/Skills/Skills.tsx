"use client";

import { motion } from "motion/react";
import Image from "next/image";

interface Skill {
  name: string;
  level: number;
  category: string;
  icon: string;
}

const skills: Skill[] = [
  // Frontend
  { name: "React", level: 95, category: "Frontend", icon: "/react.svg" },
  { name: "Next.js", level: 90, category: "Frontend", icon: "/nextjs.svg" },
  { name: "TypeScript", level: 90, category: "Frontend", icon: "/typescript.svg" },
  { name: "JavaScript", level: 95, category: "Frontend", icon: "javascript.svg" },
  { name: "Angular", level: 80, category: "Frontend", icon: "/angular.svg" },
  { name: "Vue.js", level: 75, category: "Frontend", icon: "/vue.svg" },
  { name: "React Router", level: 85, category: "Frontend", icon: "/reactrouter.svg" },
  { name: "Redux", level: 80, category: "Frontend", icon: "/redux.svg" },
  { name: "Tanstack Query", level: 75, category: "Frontend", icon: "/tanstack.svg" },

  // Styling
  { name: "Tailwind CSS", level: 92, category: "Styling", icon: "/tailwindcss.svg" },
  { name: "CSS/SCSS", level: 90, category: "Styling", icon: "/css.svg" },
  { name: "Framer Motion", level: 85, category: "Styling", icon: "/motion.svg" },
  // Backend
  { name: "Node.js", level: 80, category: "Backend", icon: "/nodejs.svg" },
  { name: "Express", level: 78, category: "Backend", icon: "/expressjs.svg" },
  { name: "MongoDB", level: 70, category: "Backend", icon: "/mongodb.svg" },
  { name: "PostgreSQL", level: 65, category: "Backend", icon: "/postgresql.svg" },
  // Testing
  { name: "Jest", level: 75, category: "Testing", icon: "/jest.svg" },
  { name: "React Testing Library", level: 80, category: "Testing", icon: "/react-testing-library.png" },
  { name: "Cypress", level: 65, category: "Testing", icon: "/cypress.svg" },
  // Tools
  { name: "Git", level: 90, category: "Tools", icon: "/git.svg" },
  { name: "GitHub", level: 90, category: "Tools", icon: "/github.svg" },
  { name: "GitLab", level: 80, category: "Tools", icon: "/gitlab.svg" },
  { name: "Docker", level: 65, category: "Tools", icon: "/docker.svg" },
  { name: "Jest", level: 75, category: "Tools", icon: "/jest.svg" },
  { name: "Webpack", level: 70, category: "Tools", icon: "/webpack.svg" },
  { name: "Vite", level: 80, category: "Tools", icon: "/vite.svg" },
  { name: "ESLint", level: 85, category: "Tools", icon: "/eslint.svg" },
  { name: "Prettier", level: 90, category: "Tools", icon: "/prettier.svg" },
  { name: "BiomeJs", level: 60, category: "Tools", icon: "/biomejs.svg" },
  { name: "RsPack", level: 70, category: "Tools", icon: "/rsbuild.svg" },
  { name: "AWS", level: 60, category: "Tools", icon: "/aws.svg" },
  { name: "Vitest", level: 70, category: "Tools", icon: "/vitest.svg" },
  { name: "Webpack", level: 75, category: "Tools", icon: "/webpack.svg" },
  // Package Managers
  { name: "Bun", level: 65, category: "Package Mannager", icon: "/bun.svg" },
  { name: "NPM", level: 85, category: "Package Mannager", icon: "/npm.svg" },
  { name: "PNPM", level: 80, category: "Package Mannager", icon: "/pnpm.svg" },
  { name: "Yarn", level: 75, category: "Package Mannager", icon: "/yarn.svg" },
  // Mobile
  { name: "React Native", level: 80, category: "Mobile", icon: "/react.svg" },
  { name: "Expo", level: 75, category: "Mobile", icon: "/expo.svg" },
  // IDE
  { name: "NeoVim", level: 70, category: "IDE", icon: "/neovim.svg" },
  { name: "VS Code", level: 90, category: "IDE", icon: "/vscode.svg" },
  { name: "Cursor", level: 60, category: "IDE", icon: "/cursor.svg" },
];

const categoryColors: Record<string, string> = {
  Frontend:
    "primary-500",
  Styling:
    "secondary-500",
  Backend:
    "success-500",
  Tools:
    "warning-500",
  Mobile:
    "danger-500",
};

const categoryBgColors: Record<string, string> = {
  Frontend: "bg-primary-100 dark:bg-primary-900/30 text-primary-700 dark:text-primary-300",
  Styling: "bg-secondary-100 dark:bg-secondary-900/30 text-secondary-700 dark:text-secondary-300",
  Backend: "bg-success-100 dark:bg-success-900/30 text-success-700 dark:text-success-300",
  Tools: "bg-warning-100 dark:bg-warning-900/30 text-warning-700 dark:text-warning-300",
  Mobile: "bg-danger-100 dark:bg-danger-900/30 text-danger-700 dark:text-danger-300",
};

export function Skills() {
  const categories = [...new Set(skills.map((s) => s.category))];

  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
        >
          <motion.h2
            className="text-4xl sm:text-5xl font-bold text-foreground mb-4"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            Skills & Technologies
          </motion.h2>
          <motion.p
            className="text-xl text-foreground-secondary max-w-3xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            Technologies and tools I use to bring ideas to life. Constantly
            learning and expanding my skill set.
          </motion.p>
        </motion.div>

        <div className="space-y-12">
          {categories.map((category, catIndex) => (
            <motion.div
              key={category}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: catIndex * 0.1 }}
            >
              <motion.h3
                className="text-xl font-semibold text-foreground mb-6 flex items-center gap-3"
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: catIndex * 0.1 + 0.2 }}
              >
                <span
                  className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${categoryBgColors[category]}`}
                >
                  {category}
                </span>
              </motion.h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {skills
                  .filter((s) => s.category === category)
                  .map((skill, index) => (
                    <motion.div
                      key={skill.name}
                      initial={{ opacity: 0, y: 20, scale: 0.95 }}
                      whileInView={{ opacity: 1, y: 0, scale: 1 }}
                      viewport={{ once: true }}
                      transition={{
                        duration: 0.4,
                        delay: index * 0.08 + catIndex * 0.1,
                        type: "spring",
                        stiffness: 200,
                        damping: 15,
                      }}
                      whileHover={{ scale: 1.03, y: -3 }}
                      className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-3">
                        <motion.div
                          className={`w-10 h-10 rounded-lg border border-${categoryColors[skill.category]} flex items-center justify-center text-white text-xs font-bold`}
                          whileHover={{ rotate: 5, scale: 1.1 }}
                          transition={{ type: "spring", stiffness: 300 }}
                        >
                          <Image className="aspect-square" src={skill.icon} alt={`${skill.name}`} width={30} height={30} />
                        </motion.div>
                        <span className="font-semibold text-foreground">
                          {skill.name}
                        </span>
                      </div>
                    </motion.div>
                  ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
