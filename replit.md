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

- `artifacts/portfolio` — Single-page interactive personal portfolio for 王静茹 (Jingru Wang). Vintage-meets-modern aesthetic (deep coffee #1a1410 + amber #e6a157 + grain texture). All editable content lives in `src/lib/portfolioData.ts`. Sections (in order): Hero (portrait + contact icons incl. phone tooltip), CoreSectors (accordion bento grid toolbox — click title to explode, click card button to expand story; bento CSS grid-areas "c0 c0 c1" / "c2 c3 c1" / "c2 c4 c5"), CareerJourney, Manifesto (merged visually with MarqueeProof — no bottom padding), MarqueeProof (scrolling 12-photo strip, amber border cards 165×264, clipped top 8%), SkillMap (left SVG hexagonal radar + right glassmorphic info panel; hover crossfade interaction; 6 axes: 活动策划/整合营销/直播销售/社交媒体/项目管理/AI提效), FeaturedProjects (6 STAR modals — case-3 dual-battle 常营/五棵松 with horizontal photo strips), SocialOps, Contact (tungsten bulb easter egg top-left; "我已准备好迎接下一个好故事" removed). Global: BackgroundNoise, JourneyIndicator (7 scroll-spy nodes). @assets alias → attached_assets/. @/assets → src/assets/.
