export interface Experience {
  id: string;
  title: string;
  company: string;
  period: string;
  description: string[];
  technologies: string[];
  type: "work" | "project" | "education";
  location?: string;
}

export const experiences: Experience[] = [
  {
    id: "1",
    title: "Senior Frontend Developer",
    company: "Tech Company",
    period: "2023 - Present",
    description: [
      "Led development of modern web applications using React and TypeScript",
      "Implemented responsive designs and optimized performance",
      "Collaborated with cross-functional teams to deliver high-quality products",
    ],
    technologies: ["React", "TypeScript", "Next.js", "Tailwind CSS"],
    type: "work",
    location: "Remote",
  },
  {
    id: "2",
    title: "Full Stack Developer",
    company: "Startup Inc",
    period: "2022 - 2023",
    description: [
      "Developed and maintained full-stack applications",
      "Built RESTful APIs and integrated third-party services",
      "Worked with databases and cloud deployment",
    ],
    technologies: ["Node.js", "Express", "MongoDB", "AWS"],
    type: "work",
    location: "Remote",
  },
  {
    id: "3",
    title: "Personal Portfolio Project",
    company: "Independent",
    period: "2024",
    description: [
      "Built modern portfolio website with Next.js and TypeScript",
      "Implemented dark/light theme switching",
      "Created responsive design with smooth animations",
    ],
    technologies: ["Next.js", "TypeScript", "Tailwind CSS", "Framer Motion"],
    type: "project",
    location: "Remote",
  },
];

