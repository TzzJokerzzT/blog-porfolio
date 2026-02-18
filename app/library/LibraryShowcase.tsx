"use client";

import { useState, useEffect, useRef } from "react";
import { motion } from "motion/react";
import { Button } from "@/shared/components/Button/Button";
import {
  H1TextAnimation,
  H2TextAnimation,
  H3TextAnimation,
  PTextAnimation,
} from "@/shared/components/Animation/TextAnimation";
import {
  TypewriterEffect,
  TypewriterMultiple,
  TypewriterWord,
  TypewriterAdvanced,
} from "@/shared/components/Animation/TypewriterEffect";
import { ContainerAnimated } from "@/shared/components/Animation/ContainerAnimation";
import {
  Divider,
  SpaceDivider,
  InlineDivider,
} from "@/shared/components/Divider/Divider";
import { ThemeToggle } from "@/shared/components/ThemeToggle";

/* ─────────────────────────────────────────────
   Constants
   ───────────────────────────────────────────── */

const sections = [
  { id: "buttons", label: "Buttons" },
  { id: "text-animations", label: "Text Animations" },
  { id: "typewriter", label: "Typewriter Effects" },
  { id: "container-animation", label: "Container Animation" },
  { id: "dividers", label: "Dividers" },
  { id: "theme-toggle", label: "Theme Toggle" },
] as const;

const colors = [
  "primary",
  "secondary",
  "success",
  "warning",
  "danger",
  "default",
] as const;

const variants = [
  "solid",
  "bordered",
  "light",
  "flat",
  "faded",
  "shadow",
  "ghost",
] as const;

/* ─────────────────────────────────────────────
   Small helper icons used in Button demos
   ───────────────────────────────────────────── */

const SearchIcon = () => (
  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
  </svg>
);

const ArrowIcon = () => (
  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
  </svg>
);

const HeartIcon = () => (
  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
  </svg>
);

const StarIcon = () => (
  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
  </svg>
);

/* ─────────────────────────────────────────────
   Reusable wrappers
   ───────────────────────────────────────────── */

function SectionWrapper({
  id,
  title,
  description,
  children,
}: {
  id: string;
  title: string;
  description: string;
  children: React.ReactNode;
}) {
  return (
    <motion.section
      id={id}
      className="scroll-mt-24 mb-20"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.6 }}
    >
      <div className="mb-8 border-b border-divider pb-4">
        <h2 className="text-3xl font-bold text-foreground">{title}</h2>
        <p className="text-foreground-secondary mt-2">{description}</p>
      </div>
      {children}
    </motion.section>
  );
}

function SubSection({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="mb-10">
      <h3 className="text-lg font-semibold text-foreground-secondary mb-4">
        {title}
      </h3>
      {children}
    </div>
  );
}

/* ─────────────────────────────────────────────
   Page
   ───────────────────────────────────────────── */

export default function LibraryShowcase() {
  const [activeSection, setActiveSection] = useState<string>("buttons");
  const observerRef = useRef<IntersectionObserver | null>(null);

  /* IntersectionObserver to highlight active sidebar link */
  useEffect(() => {
    const sectionEls = sections
      .map((s) => document.getElementById(s.id))
      .filter(Boolean) as HTMLElement[];

    observerRef.current = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        }
      },
      { rootMargin: "-20% 0px -60% 0px" }
    );

    for (const el of sectionEls) {
      observerRef.current?.observe(el);
    }

    return () => observerRef.current?.disconnect();
  }, []);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      {/* ── Page header ────────────────────────────── */}
      <motion.div
        className="text-center mb-16"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <h1 className="text-4xl sm:text-5xl font-bold text-foreground mb-4">
          Component Library
        </h1>
        <p className="text-xl text-foreground-secondary max-w-3xl mx-auto">
          A live showcase of every reusable UI component in this design system.
          Interact with them, inspect their variants, sizes, and states.
        </p>
      </motion.div>

      {/* ── Mobile nav (horizontal scroll) ─────────── */}
      <div className="lg:hidden mb-10 -mx-4 px-4 overflow-x-auto">
        <nav className="flex gap-2 min-w-max pb-2">
          {sections.map((s) => (
            <a
              key={s.id}
              href={`#${s.id}`}
              className={`whitespace-nowrap px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
                activeSection === s.id
                  ? "bg-primary-500 text-white shadow-lg shadow-primary-500/25"
                  : "bg-default-100 dark:bg-default-800 text-default-700 dark:text-default-300"
              }`}
            >
              {s.label}
            </a>
          ))}
        </nav>
      </div>

      {/* ── Two-column layout ──────────────────────── */}
      <div className="flex gap-10">
        {/* Sticky sidebar – desktop only */}
        <aside className="hidden lg:block w-56 flex-shrink-0">
          <nav className="sticky top-24 space-y-1">
            {sections.map((s) => (
              <a
                key={s.id}
                href={`#${s.id}`}
                className={`block px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                  activeSection === s.id
                    ? "bg-primary-100 dark:bg-primary-900/30 text-primary-700 dark:text-primary-300 border-l-3 border-primary-500"
                    : "text-foreground-secondary hover:text-foreground hover:bg-default-100 dark:hover:bg-default-800"
                }`}
              >
                {s.label}
              </a>
            ))}
          </nav>
        </aside>

        {/* Content */}
        <div className="flex-1 min-w-0">
          {/* ══════════════════════════════════════════
             1. BUTTONS
             ══════════════════════════════════════════ */}
          <SectionWrapper
            id="buttons"
            title="Buttons"
            description="7 variants, 6 colors, 3 sizes, 5 radii, loading state, icon-only mode, and content slot support."
          >
            {/* 1a. Color × Variant grid */}
            {colors.map((color) => (
              <SubSection key={color} title={`${color.charAt(0).toUpperCase() + color.slice(1)} Color`}>
                <div className="flex flex-wrap gap-3">
                  {variants.map((variant) => (
                    <Button
                      key={`${color}-${variant}`}
                      color={color}
                      variant={variant}
                      size="md"
                    >
                      {variant.charAt(0).toUpperCase() + variant.slice(1)}
                    </Button>
                  ))}
                </div>
              </SubSection>
            ))}

            {/* 1b. Sizes */}
            <SubSection title="Sizes">
              <div className="flex flex-wrap items-center gap-4">
                <Button color="primary" variant="solid" size="sm">Small</Button>
                <Button color="primary" variant="solid" size="md">Medium</Button>
                <Button color="primary" variant="solid" size="lg">Large</Button>
              </div>
            </SubSection>

            {/* 1c. Radius */}
            <SubSection title="Radius">
              <div className="flex flex-wrap items-center gap-4">
                {(["none", "sm", "md", "lg", "full"] as const).map((r) => (
                  <Button key={r} color="primary" variant="solid" size="md" radius={r}>
                    {r}
                  </Button>
                ))}
              </div>
            </SubSection>

            {/* 1d. Loading State */}
            <SubSection title="Loading State">
              <div className="flex flex-wrap items-center gap-4">
                <Button color="primary" variant="solid" isLoading>Loading</Button>
                <Button color="success" variant="shadow" isLoading>Saving</Button>
                <Button color="danger" variant="bordered" isLoading>Deleting</Button>
              </div>
            </SubSection>

            {/* 1e. Disabled */}
            <SubSection title="Disabled">
              <div className="flex flex-wrap items-center gap-4">
                <Button color="primary" variant="solid" disabled>Disabled Solid</Button>
                <Button color="primary" variant="bordered" disabled>Disabled Bordered</Button>
                <Button color="primary" variant="shadow" disabled>Disabled Shadow</Button>
              </div>
            </SubSection>

            {/* 1f. Icon Only */}
            <SubSection title="Icon Only">
              <div className="flex flex-wrap items-center gap-4">
                <Button color="primary" variant="solid" isIconOnly size="sm"><HeartIcon /></Button>
                <Button color="success" variant="flat" isIconOnly size="md"><StarIcon /></Button>
                <Button color="danger" variant="bordered" isIconOnly size="lg"><SearchIcon /></Button>
                <Button color="warning" variant="shadow" isIconOnly size="md"><ArrowIcon /></Button>
                <Button color="secondary" variant="ghost" isIconOnly size="md"><HeartIcon /></Button>
              </div>
            </SubSection>

            {/* 1g. With Start / End Content */}
            <SubSection title="With Start & End Content">
              <div className="flex flex-wrap items-center gap-4">
                <Button color="primary" variant="solid" startContent={<SearchIcon />}>
                  Search
                </Button>
                <Button color="success" variant="shadow" endContent={<ArrowIcon />}>
                  Continue
                </Button>
                <Button color="danger" variant="bordered" startContent={<HeartIcon />} endContent={<StarIcon />}>
                  Favorite
                </Button>
              </div>
            </SubSection>

            {/* 1h. Full Width */}
            <SubSection title="Full Width">
              <div className="max-w-md space-y-3">
                <Button color="primary" variant="solid" fullWidth>Full Width Solid</Button>
                <Button color="secondary" variant="bordered" fullWidth>Full Width Bordered</Button>
                <Button color="success" variant="shadow" fullWidth startContent={<ArrowIcon />}>
                  Full Width With Icon
                </Button>
              </div>
            </SubSection>
          </SectionWrapper>

          {/* ══════════════════════════════════════════
             2. TEXT ANIMATIONS
             ══════════════════════════════════════════ */}
          <SectionWrapper
            id="text-animations"
            title="Text Animations"
            description="Animated heading and paragraph components with configurable size and alignment. They fade-up on mount."
          >
            {/* H1 */}
            <SubSection title="H1TextAnimation — Sizes">
              <div className="space-y-6">
                {(["xs", "sm", "md", "lg", "xl"] as const).map((size) => (
                  <div key={size} className="border border-divider rounded-lg p-4 overflow-hidden">
                    <span className="text-xs font-mono text-foreground-secondary mb-2 block">
                      size=&quot;{size}&quot;
                    </span>
                    <H1TextAnimation size={size} align="left">
                      Heading 1 ({size})
                    </H1TextAnimation>
                  </div>
                ))}
              </div>
            </SubSection>

            {/* H2 – Alignments */}
            <SubSection title="H2TextAnimation — Alignments">
              <div className="space-y-6">
                {(["left", "center", "right"] as const).map((align) => (
                  <div key={align} className="border border-divider rounded-lg p-4">
                    <span className="text-xs font-mono text-foreground-secondary mb-2 block">
                      align=&quot;{align}&quot;
                    </span>
                    <H2TextAnimation size="xs" align={align}>
                      Heading 2 — {align}
                    </H2TextAnimation>
                  </div>
                ))}
              </div>
            </SubSection>

            {/* H3 */}
            <SubSection title="H3TextAnimation">
              <div className="border border-divider rounded-lg p-4">
                <H3TextAnimation size="sm" align="left">
                  Heading 3 — Subheading example
                </H3TextAnimation>
              </div>
            </SubSection>

            {/* P – Sizes & Alignments */}
            <SubSection title="PTextAnimation — Sizes">
              <div className="space-y-6">
                {(["xs", "sm", "md", "lg", "xl"] as const).map((size) => (
                  <div key={size} className="border border-divider rounded-lg p-4">
                    <span className="text-xs font-mono text-foreground-secondary mb-2 block">
                      size=&quot;{size}&quot;
                    </span>
                    <PTextAnimation size={size} align="left">
                      This is a paragraph with animated entrance at the &quot;{size}&quot; size.
                    </PTextAnimation>
                  </div>
                ))}
              </div>
            </SubSection>

            <SubSection title="PTextAnimation — Alignments">
              <div className="space-y-6">
                {(["left", "center", "right", "justify"] as const).map((align) => (
                  <div key={align} className="border border-divider rounded-lg p-4">
                    <span className="text-xs font-mono text-foreground-secondary mb-2 block">
                      align=&quot;{align}&quot;
                    </span>
                    <PTextAnimation size="sm" align={align}>
                      Building modern, scalable web applications with React, TypeScript, and cutting-edge technologies. This paragraph demonstrates the &quot;{align}&quot; alignment.
                    </PTextAnimation>
                  </div>
                ))}
              </div>
            </SubSection>
          </SectionWrapper>

          {/* ══════════════════════════════════════════
             3. TYPEWRITER EFFECTS
             ══════════════════════════════════════════ */}
          <SectionWrapper
            id="typewriter"
            title="Typewriter Effects"
            description="Four typewriter variants: single text, multiple cycling texts, highlighted word, and advanced with callbacks and delay."
          >
            <SubSection title="TypewriterEffect — Single text loop">
              <div className="border border-divider rounded-lg p-6 bg-background/80">
                <span className="text-xs font-mono text-foreground-secondary mb-3 block">
                  text=&quot;Hello, World!&quot; speed=&#123;80&#125;
                </span>
                <TypewriterEffect
                  text="Hello, World!"
                  speed={80}
                  className="text-2xl font-mono text-foreground"
                />
              </div>
            </SubSection>

            <SubSection title="TypewriterMultiple — Cycles through an array">
              <div className="border border-divider rounded-lg p-6 bg-background/80">
                <span className="text-xs font-mono text-foreground-secondary mb-3 block">
                  texts=&#123;[&quot;React&quot;, &quot;Next.js&quot;, &quot;TypeScript&quot;]&#125;
                </span>
                <TypewriterMultiple
                  texts={["React", "Next.js", "TypeScript"]}
                  speed={90}
                  className="text-3xl font-bold text-foreground"
                />
              </div>
            </SubSection>

            <SubSection title="TypewriterWord — With highlight color">
              <div className="space-y-6">
                {([
                  { color: "text-primary-500", label: "primary" },
                  { color: "text-success-500", label: "success" },
                  { color: "text-danger-500", label: "danger" },
                ] as const).map((item) => (
                  <div key={item.label} className="border border-divider rounded-lg p-6 bg-background/80">
                    <span className="text-xs font-mono text-foreground-secondary mb-3 block">
                      highlightColor=&quot;{item.color}&quot;
                    </span>
                    <TypewriterWord
                      text="Frontend Developer"
                      highlightColor={item.color}
                      speed={100}
                      className="text-2xl font-bold"
                    />
                  </div>
                ))}
              </div>
            </SubSection>

            <SubSection title="TypewriterAdvanced — With start delay">
              <div className="border border-divider rounded-lg p-6 bg-background/80">
                <span className="text-xs font-mono text-foreground-secondary mb-3 block">
                  startDelay=&#123;1500&#125; speed=&#123;60&#125;
                </span>
                <div className="flex items-center gap-2">
                  <span className="text-foreground-secondary text-lg">Delayed start:</span>
                  <TypewriterAdvanced
                    text="I appear after 1.5 seconds"
                    startDelay={1500}
                    speed={60}
                    className="text-xl font-mono text-foreground"
                  />
                </div>
              </div>
            </SubSection>
          </SectionWrapper>

          {/* ══════════════════════════════════════════
             4. CONTAINER ANIMATION
             ══════════════════════════════════════════ */}
          <SectionWrapper
            id="container-animation"
            title="Container Animation"
            description="Wrapper that applies a fade-up entrance animation with a configurable delay to its children."
          >
            <SubSection title="Different delay values">
              <div className="space-y-6">
                {[0.0, 0.3, 0.6, 1.0].map((delay) => (
                  <div key={delay} className="border border-divider rounded-lg p-4">
                    <span className="text-xs font-mono text-foreground-secondary mb-3 block">
                      delay=&#123;{delay}&#125;
                    </span>
                    <ContainerAnimated delay={delay}>
                      <div className="px-4 py-3 rounded-lg bg-primary-100 dark:bg-primary-900/30 text-primary-700 dark:text-primary-300 font-medium">
                        Item A
                      </div>
                      <div className="px-4 py-3 rounded-lg bg-success-100 dark:bg-success-900/30 text-success-700 dark:text-success-300 font-medium">
                        Item B
                      </div>
                      <div className="px-4 py-3 rounded-lg bg-warning-100 dark:bg-warning-900/30 text-warning-700 dark:text-warning-300 font-medium">
                        Item C
                      </div>
                    </ContainerAnimated>
                  </div>
                ))}
              </div>
            </SubSection>

            <SubSection title="With Button children">
              <div className="border border-divider rounded-lg p-4">
                <span className="text-xs font-mono text-foreground-secondary mb-3 block">
                  delay=&#123;0.4&#125; — grouping buttons
                </span>
                <ContainerAnimated delay={0.4}>
                  <Button color="primary" variant="solid">Accept</Button>
                  <Button color="danger" variant="bordered">Decline</Button>
                  <Button color="default" variant="ghost">Maybe Later</Button>
                </ContainerAnimated>
              </div>
            </SubSection>
          </SectionWrapper>

          {/* ══════════════════════════════════════════
             5. DIVIDERS
             ══════════════════════════════════════════ */}
          <SectionWrapper
            id="dividers"
            title="Dividers"
            description="Spacing components with 7 sizes, horizontal & vertical orientations. Includes Divider, SpaceDivider, and InlineDivider exports."
          >
            {/* Horizontal sizes */}
            <SubSection title="Divider — Horizontal sizes">
              <div className="space-y-2">
                {(["xs", "sm", "md", "lg", "xl", "2xl", "3xl"] as const).map((size) => (
                  <div key={size} className="flex items-center gap-4">
                    <span className="text-xs font-mono text-foreground-secondary w-12 text-right flex-shrink-0">
                      {size}
                    </span>
                    <div className="flex-1 border border-dashed border-divider rounded-lg overflow-hidden relative">
                      <div className="bg-primary-100 dark:bg-primary-900/30">
                        <Divider size={size} />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </SubSection>

            {/* Vertical / InlineDivider */}
            <SubSection title="InlineDivider — Between inline elements">
              <div className="border border-divider rounded-lg p-6">
                <div className="flex items-center gap-0">
                  <span className="text-foreground font-medium">Home</span>
                  <InlineDivider size="sm" className="mx-2 border-l border-divider" />
                  <span className="text-foreground font-medium">Blog</span>
                  <InlineDivider size="sm" className="mx-2 border-l border-divider" />
                  <span className="text-foreground font-medium">Experience</span>
                  <InlineDivider size="sm" className="mx-2 border-l border-divider" />
                  <span className="text-foreground font-medium">Contact</span>
                </div>
              </div>
            </SubSection>

            {/* SpaceDivider */}
            <SubSection title="SpaceDivider — Vertical spacing between blocks">
              <div className="border border-divider rounded-lg p-6">
                <div className="bg-primary-100 dark:bg-primary-900/30 rounded-lg p-4 text-center text-primary-700 dark:text-primary-300 font-medium">
                  Block A
                </div>
                <SpaceDivider size="lg" />
                <div className="bg-success-100 dark:bg-success-900/30 rounded-lg p-4 text-center text-success-700 dark:text-success-300 font-medium">
                  Block B (SpaceDivider size=&quot;lg&quot; above)
                </div>
                <SpaceDivider size="xl" />
                <div className="bg-warning-100 dark:bg-warning-900/30 rounded-lg p-4 text-center text-warning-700 dark:text-warning-300 font-medium">
                  Block C (SpaceDivider size=&quot;xl&quot; above)
                </div>
              </div>
            </SubSection>
          </SectionWrapper>

          {/* ══════════════════════════════════════════
             6. THEME TOGGLE
             ══════════════════════════════════════════ */}
          <SectionWrapper
            id="theme-toggle"
            title="Theme Toggle"
            description="Three built-in variants for switching between light, dark, and system themes."
          >
            <SubSection title="Icon variant (default)">
              <div className="border border-divider rounded-lg p-6 flex items-center gap-4">
                <span className="text-xs font-mono text-foreground-secondary">
                  variant=&quot;icon&quot;
                </span>
                <ThemeToggle variant="icon" />
              </div>
            </SubSection>

            <SubSection title="Button variant">
              <div className="border border-divider rounded-lg p-6 flex items-center gap-4">
                <span className="text-xs font-mono text-foreground-secondary">
                  variant=&quot;button&quot; showLabel
                </span>
                <ThemeToggle variant="button" showLabel />
              </div>
            </SubSection>

            <SubSection title="Dropdown variant">
              <div className="border border-divider rounded-lg p-6 flex items-center gap-4">
                <span className="text-xs font-mono text-foreground-secondary">
                  variant=&quot;dropdown&quot;
                </span>
                <ThemeToggle variant="dropdown" />
              </div>
            </SubSection>

            <SubSection title="All three side by side">
              <div className="border border-divider rounded-lg p-6 flex flex-wrap items-center gap-6">
                <div className="flex flex-col items-center gap-2">
                  <ThemeToggle variant="icon" />
                  <span className="text-xs text-foreground-secondary">Icon</span>
                </div>
                <div className="flex flex-col items-center gap-2">
                  <ThemeToggle variant="button" showLabel />
                  <span className="text-xs text-foreground-secondary">Button</span>
                </div>
                <div className="flex flex-col items-center gap-2">
                  <ThemeToggle variant="dropdown" />
                  <span className="text-xs text-foreground-secondary">Dropdown</span>
                </div>
              </div>
            </SubSection>
          </SectionWrapper>
        </div>
      </div>
    </div>
  );
}
