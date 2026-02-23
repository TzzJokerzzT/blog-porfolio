
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
