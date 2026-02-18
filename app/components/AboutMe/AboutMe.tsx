import {
  H1TextAnimation,
  PTextAnimation,
} from "@/shared/components/Animation/TextAnimation";
import { basics } from "@/shared/data/data.json";

export function AboutMe() {
  return (
    <div className="w-full items-center gap-6 my-10">
      <H1TextAnimation size="md">About Me</H1TextAnimation>

      <PTextAnimation size="lg" align="left">
        {basics.summary}
      </PTextAnimation>
    </div>
  );
}
