# Workspace

## Overview

pnpm workspace monorepo using TypeScript. Each package manages its own dependencies.

## Stack

- **Monorepo tool**: pnpm workspaces
- **Node.js version**: 24
- **Package manager**: pnpm
- **TypeScript version**: 5.9
- **API framework**: Express 5
- **Database**: PostgreSQL + Drizzle ORM
- **Validation**: Zod (`zod/v4`), `drizzle-zod`
- **API codegen**: Orval (from OpenAPI spec)
- **Build**: esbuild (CJS bundle)

## Key Commands

- `pnpm run typecheck` — full typecheck across all packages
- `pnpm run build` — typecheck + build all packages
- `pnpm --filter @workspace/api-spec run codegen` — regenerate API hooks and Zod schemas from OpenAPI spec
- `pnpm --filter @workspace/db run push` — push DB schema changes (dev only)
- `pnpm --filter @workspace/api-server run dev` — run API server locally

See the `pnpm-workspace` skill for workspace structure, TypeScript setup, and package details.

## Artifacts

- `artifacts/portfolio` — Single-page interactive personal portfolio for 王静茹 (Jingru Wang). Vintage-meets-modern aesthetic (deep coffee + amber + grain texture, Playfair Display + Inter). All editable content lives in `src/lib/portfolioData.ts`. Sections (in order): Hero (ParticleSphere canvas — 1500 amber particles, mouse repulsion + spring return, pure Canvas 2D with Fibonacci distribution + 3D perspective projection), CoreSectors (3×2 flip-card toolbox with amber glow), CareerJourney (2-card image grid with CareerAmbience overlay — spotlight → sunset lighting transition driven by scroll), Manifesto, SkillMap (5-cluster pentagonal layout: 管理力/AI工具与应用/整合营销/数据与运营/用户洞察, all fanFromCenter around center "Skill Map" italic capsule), FeaturedProjects (6 magazine cards with STAR modals — case-3 has combined 常营/五棵松 timeline), SocialOps, Testimonials, Contact footer. Global: BackgroundNoise with framer-motion parallax; JourneyIndicator floating icon (剧场票根 → 行李牌 morph on scroll through career section). Section images live in `src/assets/`.
