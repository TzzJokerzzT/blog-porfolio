import { ContainerAnimated } from "@/shared/components/Animation/ContainerAnimation";
import { PTextAnimation } from "@/shared/components/Animation/TextAnimation";
import { TypewriterMultiple } from "@/shared/components/Animation/TypewriterEffect";
import { Button } from "@/shared/components/Button/Button";
import { Divider } from "@/shared/components/Divider";
import { AboutMe } from "../AboutMe/AboutMe";
import { Projects } from "../Projects/Projects";
import { Skills } from "../Skills/Skills";
import { Contact } from "../Contact/Contact";

export function Hero() {
  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 relative z-10">
      <div className="max-w-6xl mx-auto text-center">
        <ContainerAnimated>
          <TypewriterMultiple
            className="text-7xl font-bold text-foreground mb-4"
            texts={["Hi I'm Alexis Buelvas", "Frontend Developer"]}
          />
        </ContainerAnimated>

        <PTextAnimation>
          Building modern, scalable web applications with React, Angular, Vue,
          TypeScript, and cutting-edge technologies
        </PTextAnimation>

        <ContainerAnimated delay={0.8}>
          <Button size="lg" color="primary" variant="shadow" radius="lg" href="#projects" className="mt-5">
            View My Work
          </Button>
          <Button size="lg" color="primary" variant="bordered" radius="lg" href="#contact" className="mt-5">
            Get In Touch
          </Button>
        </ContainerAnimated>

        <Divider size="lg" />

        <PTextAnimation>
          I&apos;m just a developer who enjoy play video games, read a good
          manga, watch a nice anime and build a beautiful and responsive web.
        </PTextAnimation>

        <AboutMe />

        <div id="projects">
          <Projects />
        </div>
      </div>

      {/* Skills Section - Full width */}
      <Skills />

      {/* Contact Section - Full width */}
      <div id="contact">
        <Contact />
      </div>
    </section>
  );
}
