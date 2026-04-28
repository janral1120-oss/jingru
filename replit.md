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

- `artifacts/portfolio` — Single-page interactive personal portfolio for 王静茹 (Jingru Wang). Vintage-meets-modern aesthetic (deep coffee + amber + grain texture, Playfair Display + Inter). All editable content lives in `src/lib/portfolioData.ts`. Sections (in order): Hero (with amber sub-tagline), CoreSectors (3×2 grid of 6 capability pillars with signature metrics), CareerJourney (2-card image grid with timeline dots), Manifesto, SkillMap (7-cluster constellation: 管理力核心 + 用户洞察 dual cores at center, surrounded by AI 营销工具 / AI 学习能力 / 整合营销策划 / 产品化运营 SOP / 数据分析与复盘), FeaturedProjects (7 magazine cards with STAR modals — including split 常营/五棵松 发布会 cases), SocialOps (3 stacked blocks for 小红书达人矩阵 / @Lululune / @Lune漫游手册 with stats + screenshot placeholder slots), Testimonials (3-col grid of 6 placeholder cards for client feedback screenshots). Section images live in `src/assets/`.
