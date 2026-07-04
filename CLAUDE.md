# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project

Marketing/corporate website for Imprese Riunite (construction group, since 1971 — Costruzioni Angelico + Nuova C.C.S.). Static content site: company history, certifications, projects, contact. No backend/CMS — content lives in `src/data/companies.ts`.

## Commands

- `npm run dev` — start Vite dev server (port 8080)
- `npm run build` — production build
- `npm run build:dev` — dev-mode build
- `npm run lint` — ESLint
- `npm test` — run vitest once (`npm run test:watch` for watch mode)
  - Single test file: `npx vitest run src/test/example.test.ts`
- `npx playwright test` — run e2e tests (config extends `lovable-agent-playwright-config`)

Package manager: repo has both `bun.lock`/`bun.lockb` and `package-lock.json`; either bun or npm works, commands above assume npm.

## Architecture

- Vite + React 18 + TypeScript, SWC plugin. Routing via `react-router-dom`, single-page app with routes in `src/App.tsx`:
  - `/` → `src/pages/Index.tsx` (composes all landing-page sections)
  - `/azienda/:id` → `src/pages/CompanyDetail.tsx` (reads a company by id from `src/data/companies.ts`)
  - `*` → `NotFound`
- **Content-as-data**: all company/project/certification content is centralized in `src/data/companies.ts` (typed `Company`, `Project`, `Certification`). To update company info, projects, or certs, edit this file rather than JSX — components render off this data.
- **Sections** (`src/components/*.tsx`, e.g. `HeroSection`, `AboutSection`, `CompaniesSection`, `HistoryTimeline`, `ProjectsSection`, `ClientLogosMarquee`, `ContactSection`, `Footer`) are composed in order inside `Index.tsx`.
- **UI primitives** in `src/components/ui/` are shadcn/ui components (Radix UI + `class-variance-authority` + Tailwind) — treat as generated/library code, edit sparingly.
- Path alias `@` → `src/` (configured in both `vite.config.ts` and `vitest.config.ts`).
- Tailwind config (`tailwind.config.ts`) carries the brand theme (colors, fonts, animations) — check it before hardcoding styles.
- `lovable-tagger` Vite plugin is dev-mode only (adds component tagging for the Lovable platform) — not present in production builds.
- Deployed on Vercel; `vercel.json` handles SPA rewrites (all routes → `index.html` except static assets) and sets security headers.
- Vitest environment is `jsdom`; setup file at `src/test/setup.ts`.
