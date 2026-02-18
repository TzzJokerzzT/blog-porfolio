import Image from "next/image";
import { Hero } from "./components/Hero/Hero";
import { ContainerAnimated } from "./shared/components/Animation/ContainerAnimation";

export const metadata = {
  title: "Home",
  description:
    "Alexis Buelvas — Frontend Developer with 6+ years of experience building modern web applications with React, Next.js, TypeScript, and cutting-edge technologies.",
};

export default function Home() {
  return (
    <div className="z-10">
      <div className="w-full z-20">
        <ContainerAnimated>
          <Image
            src="/image.jpeg"
            alt="code"
            width={1920}
            height={800}
            className="w-full h-[200px] object-cover"
            priority
          />
        </ContainerAnimated>
      </div>
      {/* Hero Section */}
      <div className="z-20">
        <Hero />
      </div>
    </div>
  );
}
