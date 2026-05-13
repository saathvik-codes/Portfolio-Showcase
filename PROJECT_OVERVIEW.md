# Saathvik Kalepu Portfolio

A cinematic, dark-themed developer portfolio for Saathvik Kalepu with an SK logo intro, GSAP scroll animations, rolling title text, image-backed project showcases, and a canvas-based particle background.

## Run

- `pnpm install --ignore-scripts` - install workspace dependencies on Windows.
- `PORT=8080 BASE_PATH=/ pnpm --filter @workspace/portfolio run dev` - run the local portfolio app.
- `PORT=8080 BASE_PATH=/ pnpm --filter @workspace/portfolio run build` - build the portfolio.
- `pnpm --filter @workspace/portfolio run typecheck` - run TypeScript checks.

## Stack

- pnpm workspace, TypeScript, React, Vite
- Tailwind CSS v4
- GSAP ScrollTrigger
- EmailJS contact form
- Canvas 2D particle background
- Fonts: Syne, Space Grotesk, Space Mono

## Structure

- `artifacts/portfolio/` - main React and Vite portfolio app
- `artifacts/portfolio/src/pages/Portfolio.tsx` - root page composition
- `artifacts/portfolio/src/components/` - section components
- `artifacts/portfolio/src/components/RollingTitle.tsx` - reusable rolling letter title animation
- `artifacts/portfolio/src/index.css` - design system and animation styles
- `artifacts/portfolio/public/` - resume, favicon, Open Graph assets, robots file

## Environment

Create `artifacts/portfolio/.env.local` for local EmailJS testing:

```env
VITE_EMAILJS_PUBLIC_KEY=your_emailjs_public_key
VITE_EMAILJS_SERVICE_ID=service_rqkh5ys
VITE_EMAILJS_TEMPLATE_ID=template_qzgttb8
VITE_EMAILJS_AUTO_REPLY_ID=template_2tzr8pi
```

For Vercel, add the same variables in project environment settings and redeploy.
