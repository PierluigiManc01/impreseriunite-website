# AGENTS.md

This file provides guidance to coding agents when working with code in this repository.

## Project

Marketing/corporate website for Imprese Riunite (construction group, since 1971 — Costruzioni Angelico + Nuova C.C.S.). Static content site: company history, certifications, projects, contact. No backend/CMS — content lives in `src/data/companies.ts`.

## Commands

- `npm run dev` — start Vite dev server (port 8080)
- `npm run build` — production build
- `npm run build:dev` — dev-mode build
- `npm run lint` — ESLint
- `npm test` — run vitest once (`npm run test:watch` for watch mode)
  - Single test file: `npx vitest run src/test/example.test.ts`
- `npx playwright test` — run e2e tests

Package manager: npm. Keep `package-lock.json` synchronized with `package.json`.

## Git Workflow

- `main` is the only long-lived branch and should stay deployable.
- New feature branches are session-scoped: create a branch only for the current requested feature/work session, keep it short-lived, and delete it after the PR is merged.
- Always ask the user before creating a new feature branch. Do not create branches automatically for every small change; this prevents branch sprawl.
- When the user approves a branch, create it from latest `main`:
  - `git switch main`
  - `git pull --ff-only origin main`
  - `git switch -c feature/<short-descriptive-name>`
- Before opening or merging a PR, rebase the feature branch onto latest `main`:
  - `git fetch origin`
  - `git rebase origin/main`
  - resolve conflicts if needed, then `git push --force-with-lease`
- Use squash-merge for PRs so `main` gets one clean commit per feature/session.
- Expect GitHub auto-delete of head branches after PR merge. After merge, prune local refs and delete the local branch when safe:
  - `git fetch --prune`
  - `git branch -d feature/<short-descriptive-name>`

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
- Deployed on Vercel; `vercel.json` handles SPA rewrites (all routes → `index.html` except static assets) and sets security headers.
- Vitest environment is `jsdom`; setup file at `src/test/setup.ts`.
