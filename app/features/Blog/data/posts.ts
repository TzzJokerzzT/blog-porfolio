export interface BlogPost {
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  date: string;
  readTime: string;
  tags: string[];
  category: string;
  featured?: boolean;
}

export const blogPosts: BlogPost[] = [
  {
    slug: "building-modern-web-apps-with-nextjs",
    title: "Building Modern Web Apps with Next.js 15",
    excerpt:
      "Exploring the latest features of Next.js 15 including the App Router, Server Components, and Turbopack for building performant web applications.",
    content: `Next.js 15 has brought significant improvements to the developer experience and application performance. In this post, I'll share my experience building this very portfolio with the latest version.

## The App Router

The App Router is a paradigm shift in how we think about routing in Next.js. Instead of the pages directory, we now use the app directory with file conventions like page.tsx, layout.tsx, and loading.tsx.

The key advantage is the ability to colocate components, styles, and tests alongside your routes. This makes the codebase more organized and easier to navigate.

## Server Components by Default

One of the most impactful changes is that components are Server Components by default. This means they render on the server and send minimal JavaScript to the client. Only components that need interactivity should use the "use client" directive.

This pattern has helped me reduce the JavaScript bundle size significantly while maintaining a rich, interactive user experience where it matters.

## Turbopack

Turbopack is the new Rust-based bundler that replaces Webpack. In my experience, it has reduced dev server startup time by over 70% and hot module replacement is nearly instantaneous.

## Key Takeaways

- Use Server Components for static content and data fetching
- Reserve "use client" for interactive components only
- Leverage the new metadata API for SEO
- Take advantage of Turbopack for faster development cycles
- Use the new caching strategies wisely`,
    date: "2026-02-10",
    readTime: "5 min read",
    tags: ["Next.js", "React", "TypeScript", "Web Development"],
    category: "Frontend",
    featured: true,
  },
  {
    slug: "mastering-tailwind-css-v4",
    title: "Mastering Tailwind CSS v4: The CSS-First Approach",
    excerpt:
      "Tailwind CSS v4 introduces a revolutionary CSS-first configuration approach. Learn how to leverage design tokens and the new @theme directive.",
    content: `Tailwind CSS v4 represents a fundamental shift in how we configure and use the framework. Gone is the JavaScript config file, replaced by a CSS-first approach using the @theme directive.

## CSS-First Configuration

In v4, all your design tokens live directly in your CSS file using the @theme block. This means your IDE can provide better autocomplete, and your configuration is closer to where it's actually used.

## Design Tokens with CSS Variables

The combination of CSS custom properties and Tailwind's @theme directive creates a powerful system for theming. You can define your entire color palette as CSS variables and map them to Tailwind utilities.

This approach makes it trivial to implement features like dark mode — just redefine your CSS variables under a .dark selector.

## Performance Improvements

Tailwind v4 is built on a new engine called Oxide, written in Rust. It's significantly faster than v3 at both build time and when generating styles on-demand during development.

## Migration Tips

- Replace tailwind.config.js with @theme blocks in your CSS
- Use CSS custom properties for dynamic values
- Take advantage of the new color-mix() functions
- Leverage the improved container query support`,
    date: "2026-02-05",
    readTime: "4 min read",
    tags: ["Tailwind CSS", "CSS", "Design Systems"],
    category: "Styling",
  },
  {
    slug: "react-19-new-features",
    title: "React 19: What's New and Why It Matters",
    excerpt:
      "React 19 brings Actions, use() hook, and improved Server Components. A deep dive into the features that will change how we build React apps.",
    content: `React 19 is a landmark release that introduces several features aimed at simplifying common patterns and improving performance. Let's explore what's new.

## Actions

Actions simplify handling form submissions and data mutations. Instead of manually managing loading states, error handling, and optimistic updates, Actions handle these automatically.

The useActionState hook provides a clean API for tracking the state of an async action, while useFormStatus lets child components react to form submission state.

## The use() Hook

The new use() hook is a versatile addition that can read resources like Promises and Contexts. Unlike other hooks, use() can be called conditionally, making it more flexible.

## Improved Server Components

Server Components in React 19 are more mature and better integrated with the rest of the React ecosystem. They now support async/await natively, making data fetching more intuitive.

## Document Metadata

React 19 natively supports rendering <title>, <meta>, and <link> tags from any component. They're automatically hoisted to the document <head>, simplifying SEO management.

## Key Takeaways

- Actions reduce boilerplate for data mutations
- use() hook provides flexible resource reading
- Server Components are now production-ready
- Built-in metadata support simplifies SEO`,
    date: "2026-01-28",
    readTime: "6 min read",
    tags: ["React", "JavaScript", "Frontend"],
    category: "Frontend",
    featured: true,
  },
  {
    slug: "framer-motion-animations-guide",
    title: "Creating Stunning Animations with Framer Motion",
    excerpt:
      "A practical guide to building smooth, performant animations in React using Framer Motion. From basic transitions to scroll-triggered effects.",
    content: `Framer Motion (now the motion package) is the most powerful animation library for React. In this guide, I'll share patterns I've used extensively in my projects.

## Basic Animations

The simplest way to animate is with the motion component's initial and animate props. These create entrance animations that run when the component mounts.

## Gesture Animations

whileHover and whileTap props let you create interactive feedback. Combined with spring physics, these create natural-feeling interactions that delight users.

## Scroll-Triggered Animations

The whileInView prop is perfect for creating scroll-triggered animations. Combined with viewport options, you can control exactly when animations trigger as users scroll through your content.

## Layout Animations

The layout prop enables automatic animations when an element's position or size changes. This is incredibly powerful for list reordering, expanding cards, and shared layout transitions.

## Performance Tips

- Use transform-based animations (x, y, scale, rotate) over layout properties
- Set layout={true} judiciously — it can be expensive
- Use willChange for frequently animated elements
- Prefer spring transitions over duration-based ones for natural feel
- Use once: true in viewport options to avoid re-triggering`,
    date: "2026-01-20",
    readTime: "7 min read",
    tags: ["Animation", "React", "Framer Motion", "UI/UX"],
    category: "Animation",
  },
  {
    slug: "typescript-advanced-patterns",
    title: "Advanced TypeScript Patterns for React Developers",
    excerpt:
      "Level up your TypeScript skills with advanced patterns including discriminated unions, template literals, and conditional types for React components.",
    content: `TypeScript is essential for building reliable React applications at scale. Let's explore advanced patterns that go beyond basic typing.

## Discriminated Unions

Discriminated unions are perfect for modeling component variants. By using a shared literal type as a discriminant, TypeScript can narrow types automatically in switch statements and conditionals.

This pattern is ideal for components that behave differently based on a variant prop, like buttons, alerts, or badges.

## Template Literal Types

Template literal types let you create string types from combinations. This is powerful for creating type-safe class name utilities or event handler props.

## Conditional Types

Conditional types enable you to create types that depend on other types. The infer keyword is particularly useful for extracting types from complex structures.

## Utility Type Patterns

Building custom utility types from TypeScript's built-in ones (Pick, Omit, Partial, Required) creates expressive, self-documenting type definitions that make your components easier to use.

## Key Patterns

- Use discriminated unions for variant components
- Leverage template literals for string type safety
- Build custom utility types for common patterns
- Use const assertions for literal type inference
- Prefer interfaces for component props, types for unions`,
    date: "2026-01-15",
    readTime: "8 min read",
    tags: ["TypeScript", "React", "Design Patterns"],
    category: "TypeScript",
  },
];

export function getPostBySlug(slug: string): BlogPost | undefined {
  return blogPosts.find((post) => post.slug === slug);
}

export function getFeaturedPosts(): BlogPost[] {
  return blogPosts.filter((post) => post.featured);
}

export function getPostsByCategory(category: string): BlogPost[] {
  return blogPosts.filter((post) => post.category === category);
}

export function getAllCategories(): string[] {
  return [...new Set(blogPosts.map((post) => post.category))];
}

export function getAllTags(): string[] {
  return [...new Set(blogPosts.flatMap((post) => post.tags))];
}
