"use client";

import { motion } from "motion/react";

interface Skill {
  name: string;
  level: number;
  category: string;
  icon: string;
}

const skills: Skill[] = [
  // Frontend
  { name: "React", level: 95, category: "Frontend", icon: "React" },
  { name: "Next.js", level: 90, category: "Frontend", icon: "Next" },
  { name: "TypeScript", level: 90, category: "Frontend", icon: "TS" },
  { name: "JavaScript", level: 95, category: "Frontend", icon: "JS" },
  { name: "Angular", level: 80, category: "Frontend", icon: "Ng" },
  { name: "Vue.js", level: 75, category: "Frontend", icon: "Vue" },
  // Styling
  { name: "Tailwind CSS", level: 92, category: "Styling", icon: "TW" },
  { name: "CSS/SCSS", level: 90, category: "Styling", icon: "CSS" },
  { name: "Framer Motion", level: 85, category: "Styling", icon: "FM" },
  // Backend
  { name: "Node.js", level: 80, category: "Backend", icon: "Node" },
  { name: "Express", level: 78, category: "Backend", icon: "Ex" },
  { name: "MongoDB", level: 70, category: "Backend", icon: "DB" },
  // Tools
  { name: "Git", level: 90, category: "Tools", icon: "Git" },
  { name: "Docker", level: 65, category: "Tools", icon: "Dk" },
  { name: "AWS", level: 60, category: "Tools", icon: "AWS" },
  // Mobile
  { name: "React Native", level: 80, category: "Mobile", icon: "RN" },
];

const categoryColors: Record<string, string> = {
  Frontend:
    "from-primary-500 to-primary-600",
  Styling:
    "from-secondary-500 to-secondary-600",
  Backend:
    "from-success-500 to-success-600",
  Tools:
    "from-warning-500 to-warning-600",
  Mobile:
    "from-danger-500 to-danger-600",
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
                      className="group relative bg-background/80 backdrop-blur-sm border border-divider rounded-xl p-5 hover:border-primary-500 transition-all duration-300 hover:shadow-lg hover:shadow-primary-500/10"
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
                    >
                      <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center gap-3">
                          <motion.div
                            className={`w-10 h-10 rounded-lg bg-gradient-to-br ${categoryColors[skill.category]} flex items-center justify-center text-white text-xs font-bold`}
                            whileHover={{ rotate: 5, scale: 1.1 }}
                            transition={{ type: "spring", stiffness: 300 }}
                          >
                            {skill.icon}
                          </motion.div>
                          <span className="font-semibold text-foreground">
                            {skill.name}
                          </span>
                        </div>
                        <span className="text-sm font-medium text-foreground-secondary">
                          {skill.level}%
                        </span>
                      </div>

                      {/* Progress Bar */}
                      <div className="w-full h-2 bg-default-200 dark:bg-default-800 rounded-full overflow-hidden">
                        <motion.div
                          className={`h-full rounded-full bg-gradient-to-r ${categoryColors[skill.category]}`}
                          initial={{ width: 0 }}
                          whileInView={{ width: `${skill.level}%` }}
                          viewport={{ once: true }}
                          transition={{
                            duration: 1,
                            delay: index * 0.1 + 0.3,
                            ease: "easeOut",
                          }}
                        />
                      </div>

                      {/* Hover overlay */}
                      <motion.div
                        className="absolute inset-0 rounded-xl bg-gradient-to-r from-primary-500/5 to-secondary-500/5 opacity-0 group-hover:opacity-100 pointer-events-none"
                        initial={{ opacity: 0 }}
                        whileHover={{ opacity: 1 }}
                        transition={{ duration: 0.3 }}
                      />
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
