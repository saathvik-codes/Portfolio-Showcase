# Saathvik Kalepu — Portfolio

A cinematic, dark-themed developer portfolio for Saathvik Kalepu with SK logo intro animation, GSAP scroll animations, and a canvas-based particle background.

## Run & Operate

- `pnpm --filter @workspace/portfolio run dev` — run the portfolio (main artifact at `/`)
- `pnpm --filter @workspace/api-server run dev` — run the API server (port 5000)
- `pnpm run typecheck` — full typecheck across all packages
- `pnpm run build` — typecheck + build all packages

## Stack

- pnpm workspaces, Node.js 24, TypeScript 5.9
- Frontend: React + Vite, Tailwind CSS v4
- Animations: GSAP 3 (ScrollTrigger, timeline), Canvas 2D particle system
- Fonts: Syne (display), Space Grotesk (body), Space Mono (mono)
- API: Express 5 (api-server artifact)

## Where things live

- `artifacts/portfolio/` — main portfolio React+Vite app (preview at `/`)
- `artifacts/portfolio/src/pages/Portfolio.tsx` — root page composition
- `artifacts/portfolio/src/components/SKIntro.tsx` — SK logo intro animation
- `artifacts/portfolio/src/components/ThreeBackground.tsx` — Canvas 2D particle field
- `artifacts/portfolio/src/components/Hero.tsx` — hero section with GSAP
- `artifacts/portfolio/src/components/About.tsx` — about + stats
- `artifacts/portfolio/src/components/Experience.tsx` — internship timeline
- `artifacts/portfolio/src/components/Projects.tsx` — 5 projects with hover reveals
- `artifacts/portfolio/src/components/Skills.tsx` — skills grid + marquee
- `artifacts/portfolio/src/components/Contact.tsx` — contact info + copy email
- `artifacts/portfolio/src/components/Navigation.tsx` — sticky nav with scroll blur
- `artifacts/portfolio/src/components/CustomCursor.tsx` — custom cursor with follower
- `artifacts/portfolio/src/index.css` — full design system (dark theme, CSS variables)

## Architecture decisions

- All CSS variables use HSL space-separated values (no `hsl()` wrapper) per Tailwind v4 convention
- Canvas 2D used for particle background instead of Three.js WebGL (WebGL unavailable in sandbox)
- GSAP ScrollTrigger drives all scroll animations; each section registers its own context
- SK intro uses SVG strokeDashoffset path-drawing animation with GSAP timeline
- Custom cursor uses RAF loop for smooth follower interpolation

## Product

A single-page portfolio for Saathvik Kalepu featuring:
- Cinematic SK logo intro with path-drawing animation and loading counter
- Full-screen hero with animated name and particle canvas
- About section with stats and education highlights
- Experience timeline (aimaster.live internship)
- 5 projects with hover-reveal descriptions
- Skills grid with scrolling marquee
- Contact section with email copy utility

## User preferences

- Dark cinematic theme (near-black background, violet accent #a78bfa)
- Inspired by: thiswasmajor.com, aboutluca.com, creativecue.co, saividesh.vercel.app
- GSAP animations throughout, SK brand logo intro
- Fonts: Syne (display 800), Space Grotesk (body), Space Mono (mono)

## Gotchas

- WebGL is not available in the Replit preview sandbox — use Canvas 2D for particle effects
- GSAP SplitText is a premium plugin — not available in free GSAP; use manual ref-based animation
- Google Fonts `@import url()` MUST be first line in index.css before all other imports
- `getTotalLength()` on SVG path elements requires them to be mounted before calling in useEffect

## Pointers

- See the `pnpm-workspace` skill for workspace structure, TypeScript setup, and package details
