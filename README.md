# Saathvik Kalepu Portfolio

A cinematic developer portfolio built with React, Vite, Tailwind CSS, GSAP, and EmailJS. The site includes an animated SK intro, rolling title typography, image-backed project showcases, certifications, activities, skills, and a working contact form.

## Tech Stack

- React + Vite
- TypeScript
- Tailwind CSS v4
- GSAP + ScrollTrigger
- EmailJS
- Canvas particle background
- pnpm workspace

## Project Structure

```txt
artifacts/portfolio/
  public/                 Static assets, resume, favicon, OG image
  src/
    components/           Portfolio sections and UI components
    pages/Portfolio.tsx   Main page composition
    index.css             Theme, layout, and animation styles
```

## Local Setup

```bash
pnpm install --ignore-scripts
```

Run the portfolio locally:

```bash
PORT=8080 BASE_PATH=/ pnpm --filter @workspace/portfolio run dev
```

Build:

```bash
PORT=8080 BASE_PATH=/ pnpm --filter @workspace/portfolio run build
```

Typecheck:

```bash
pnpm --filter @workspace/portfolio run typecheck
```

## EmailJS Setup

Create `artifacts/portfolio/.env.local` locally:

```env
VITE_EMAILJS_PUBLIC_KEY=your_emailjs_public_key
VITE_EMAILJS_SERVICE_ID=service_rqkh5ys
VITE_EMAILJS_TEMPLATE_ID=template_qzgttb8
VITE_EMAILJS_AUTO_REPLY_ID=template_2tzr8pi
```

For Vercel, add the same variables in:

`Project Settings -> Environment Variables`

Then redeploy, because Vite injects `VITE_*` variables at build time.

## Deployment

Recommended Vercel settings:

- Framework Preset: Vite
- Root Directory: `artifacts/portfolio`
- Build Command: `pnpm run build`
- Output Directory: `dist/public`

Add:

```env
PORT=8080
BASE_PATH=/
```

along with the EmailJS variables above.

## Notes

- `.env.local` is intentionally ignored.
- Email template HTML files are local-only and not tracked in git.
- The contact form uses `user_name`, `user_email`, `subject`, and `message` placeholders for EmailJS templates.
