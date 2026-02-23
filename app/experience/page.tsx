import type { Metadata } from 'next';
import ExperienceView from "@/view/ExperienceView";

export const metadata: Metadata = {
  title: "Experience",
  description:
    "Professional experience and career history of Alexis Buelvas as a Frontend Developer.",
};

export default function Page() {
  return <ExperienceView />;
}
