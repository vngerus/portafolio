# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

Package manager is pnpm (pinned via `packageManager` in package.json).

```bash
pnpm dev      # dev server (next dev --webpack), http://localhost:3000
pnpm build    # production build (next build --webpack)
pnpm start    # run production build
pnpm lint     # eslint .
```

No test suite / test runner is configured in this repo.

Both `dev` and `build` force the webpack bundler (`--webpack`) instead of Next's default Turbopack — required for the custom `.glb`/`.gltf` asset rule in `next.config.js`.

## Architecture

Next.js App Router portfolio site (single page, `src/app/page.tsx`), React 19, Tailwind CSS 4, TypeScript.

**Page composition**: `app/page.tsx` renders one long page by stacking section components from `src/sections/` (Header, Hero, Experiences, Projects, About, Contact, Footer) inside a shared `main` wrapper, with `Socials` and `Signature` docked outside `main` on desktop only (`hidden md:block`).

**Data-driven content**: content (work experience, etc.) lives in `src/data/index.ts` as typed arrays (e.g. `Experience[]`), not hardcoded in components. Sections/components import from `@/data` and map over it. When adding/editing content, edit the data file rather than JSX.

**3D scene**: `src/components/Scene.tsx` wraps `@react-three/fiber`'s `Canvas` with `@react-three/drei` controls and a GLTF model (`components/model/BananaCat.tsx`). GLTF/GLB assets are loaded via the custom webpack asset rule in `next.config.js`.

**Path aliases** (tsconfig): `@/*` → `src/*`, plus dedicated aliases `@/data`, `@/components/*`, `@/sections/*`.

**Barrel export**: `src/components/index.ts` re-exports select shared components (not all of them) — check it before adding new import paths for those.

**Contact form backend**: `src/app/api/contact/route.ts` is a Route Handler (`force-dynamic`) that sends mail via Resend (`RESEND_API_KEY` env var, defaulting recipient to `CONTACT_EMAIL` env var). No `.env.example` exists in the repo; these vars must be supplied via a local `.env` file (gitignored) or the deploy environment.

**Styling**: Tailwind CSS 4 via `@tailwindcss/postcss`; `src/lib/utils.ts` exports `cn()` (clsx + tailwind-merge) for conditional class composition — use it instead of manual string concatenation.

**ESLint overrides** (`eslint.config.mjs`): `react-hooks/set-state-in-effect` and `react-hooks/refs` are disabled — see inline comments for why (React 19 setState batching pattern, and structural ref arrays for children) before re-enabling or fighting these rules.
