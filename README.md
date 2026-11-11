# Personal Blog

A personal blog built with **Next.js 15** (App Router), **TypeScript**, **Tailwind CSS 4**, and **Motion**. It ships the blog itself: a home with the latest posts, a full post index with category filters, post detail pages, and a small authoring area (login, create, edit, delete).

## Routes

| Route | Description |
|-------|-------------|
| `/` | Short presentation plus the latest 5 posts |
| `/blog` | Full post list with category filters |
| `/blog/[slug]` | Post detail |
| `/blog/crear` | Create a post (authenticated only) |
| `/blog/editar/[slug]` | Edit a post (authenticated only) |
| `/login` | Author login |

Plus the usual App Router files: `error.tsx`, `global-error.tsx`, `loading.tsx`, `not-found.tsx`, `robots.ts`, `sitemap.ts`.

## Tech stack

| Category | Technologies |
|----------|--------------|
| Framework | Next.js 15 with App Router (Turbopack) |
| Language | TypeScript |
| Styling | Tailwind CSS 4 |
| Animations | Motion (`motion/react`) |
| State | Zustand (auth and theme stores) |
| Quality | ESLint |

## Getting started

```bash
npm install
npm run dev
```

The dev server starts on <http://localhost:3000> and expects the blog API on <http://localhost:4856>.

### Environment variables

| Variable | Default | Purpose |
|----------|---------|---------|
| `NEXT_PUBLIC_API_URL` | `http://localhost:4856` | Base URL of the blog API |

## Scripts

```bash
npm run dev     # dev server with Turbopack
npm run build   # production build
npm run start   # serve the production build
npm run lint    # ESLint
```

## Project structure

```
app/
├── layout.tsx              # Root layout: fonts, theme provider, analytics
├── page.tsx                # Home: presentation + latest posts
├── blog/                   # List, detail, create and edit routes
├── login/                  # Author login
├── components/             # Header and Footer
├── features/
│   ├── Blog/               # Blog list, create/edit forms, BlogCard
│   ├── Home/               # Home presentation + latest posts
│   └── Login/              # Login form
├── view/                   # Page-level views (post detail, login)
├── layouts/                # App shell (header, content, footer)
└── shared/
    ├── components/         # Button, ThemeProvider, ThemeToggle, AnimatedBackground
    ├── data/data.json      # Site basics: name, label, summary, social links
    ├── hooks/              # useAuth, useTheme
    ├── services/           # Blog API client
    ├── stores/             # Zustand stores (auth, theme)
    └── types/              # API types
```

`app/features/Blog/components/BlogCard` is shared by the home page and the blog index.

## Blog API contract

All post content comes from the blog API (`app/shared/services/api.service.ts`), not from local files.

| Method | Endpoint | Auth |
|--------|----------|------|
| `POST` | `/api/auth/login` | public |
| `POST` | `/api/auth/logout` | Bearer token |
| `GET` | `/api/posts?page&limit&category&featured` | public |
| `GET` | `/api/posts/:slug` | public |
| `POST` | `/api/posts` | Bearer token |
| `PUT` | `/api/posts/:id` | Bearer token |
| `DELETE` | `/api/posts/:id` | Bearer token |

## Theme system

Three modes (light, dark, system) persisted in `localStorage` under `theme-storage` and managed by a Zustand store. An inline script in `app/layout.tsx` applies the saved theme before first paint to avoid a flash of the wrong theme.

## Site content

`app/shared/data/data.json` holds the personal basics used by the home page, the header, and the footer: `name`, `label`, `email`, `summary`, and the `social` links.
