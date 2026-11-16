import { motion, useInView, useReducedMotion } from "framer-motion";
import { CodeXml, Github, Instagram, Linkedin, Mail, Palette, type LucideIcon } from "lucide-react";
import { useEffect, useRef, useState, type ReactNode } from "react";
import { profile, socialLinks } from "@/data/portfolioData";

export function Reveal({ children, delay = 0, className = "" }: { children: ReactNode; delay?: number; className?: string }) {
  const reduce = useReducedMotion();
  return (
    <motion.div
      className={className}
      initial={reduce ? false : { opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-8% 0px" }}
      transition={{ duration: 0.7, delay, ease: [0.22, 0.61, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}

/** Highlighter-marker stroke that sweeps across a phrase as it scrolls into view. */
export function Mark({ children, from = "left" }: { children: ReactNode; from?: "left" | "right" }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-20% 0px" });
  return (
    <span
      ref={ref}
      className="box-decoration-clone px-1 -mx-1 transition-[background-size] duration-[900ms] ease-out"
      style={{
        backgroundImage: "linear-gradient(104deg, rgba(240,196,92,.0) 0.5%, rgba(240,196,92,.55) 2.5%, rgba(240,196,92,.42) 96%, rgba(240,196,92,0) 99%)",
        backgroundRepeat: "no-repeat",
        backgroundPosition: from === "left" ? "0 70%" : "100% 70%",
        backgroundSize: inView ? "100% 62%" : "0% 62%",
      }}
    >
      {children}
    </span>
  );
}

export function ChapterHead({ no, label, title, lede }: { no: string; label: string; title: ReactNode; lede?: ReactNode }) {
  return (
    <Reveal className="max-w-3xl">
      <p className="eyebrow mb-5">{no} — {label}</p>
      <h2 className="display text-4xl sm:text-5xl lg:text-[3.4rem] text-ink">{title}</h2>
      {lede && <p className="mt-6 text-lg text-muted leading-relaxed max-w-2xl">{lede}</p>}
    </Reveal>
  );
}

export function CountUp({ to, suffix = "" }: { to: number; suffix?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true });
  const reduce = useReducedMotion();
  const [n, setN] = useState(reduce ? to : 0);
  useEffect(() => {
    if (!inView || reduce) return;
    const t0 = performance.now();
    let raf = 0;
    const tick = (t: number) => {
      const k = Math.min((t - t0) / 1400, 1);
      setN(Math.round(to * (1 - Math.pow(1 - k, 3))));
      if (k < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [inView, to, reduce]);
  return <span ref={ref}>{n.toLocaleString("en-IN")}{suffix}</span>;
}

/** Text link with a leading Lucide icon. */
export function IconLink({ href, icon: Icon, children, className = "" }: { href: string; icon: LucideIcon; children: ReactNode; className?: string }) {
  const external = /^https?:/.test(href) || href.endsWith(".pdf");
  return (
    <a
      href={href}
      {...(external ? { target: "_blank", rel: "noreferrer noopener" } : {})}
      className={`group inline-flex items-center gap-1.5 text-ink hover:text-accent ${className}`}
    >
      <Icon size={15} strokeWidth={1.8} className="shrink-0 text-faint group-hover:text-accent" aria-hidden />
      <span className="underline decoration-hairline decoration-1 underline-offset-4 group-hover:decoration-accent">{children}</span>
    </a>
  );
}

const socialIcon: Record<string, LucideIcon> = { GitHub: Github, LinkedIn: Linkedin, LeetCode: CodeXml, Visuals: Palette, Instagram };

/** Round icon buttons for social profiles (+ email). */
export function SocialRow({ withEmail = true, className = "" }: { withEmail?: boolean; className?: string }) {
  const items = [
    ...socialLinks.map((s) => ({ label: s.label, href: s.href, Icon: socialIcon[s.short] ?? CodeXml })),
    ...(withEmail ? [{ label: `Email ${profile.email}`, href: `mailto:${profile.email}`, Icon: Mail }] : []),
  ];
  return (
    <ul className={`flex flex-wrap gap-2 ${className}`}>
      {items.map(({ label, href, Icon }) => (
        <li key={href}>
          <a
            href={href}
            {...(href.startsWith("http") ? { target: "_blank", rel: "noreferrer noopener" } : {})}
            aria-label={label}
            title={label}
            className="grid h-10 w-10 place-items-center rounded-full border border-hairline bg-surface text-muted hover:-translate-y-0.5 hover:border-ink hover:text-ink transition-transform"
          >
            <Icon size={17} strokeWidth={1.8} aria-hidden />
          </a>
        </li>
      ))}
    </ul>
  );
}

/** Torn-paper edge with a strip of tape, used between chapters. */
export function PaperTear({ fill = "var(--color-surface)", tape = true }: { fill?: string; tape?: boolean }) {
  return (
    <div aria-hidden className="relative -mb-px h-10 sm:h-14 select-none">
      <svg viewBox="0 0 1200 60" preserveAspectRatio="none" className="absolute inset-0 h-full w-full">
        <path
          d="M0 60 L0 34 L28 30 L52 38 L80 27 L112 35 L140 24 L171 33 L198 26 L232 36 L260 22 L292 31 L321 25 L350 37 L384 28 L410 34 L442 21 L470 30 L503 26 L530 38 L562 27 L590 33 L622 23 L650 32 L683 28 L710 39 L742 25 L771 31 L800 22 L832 35 L860 29 L893 36 L920 24 L952 31 L980 27 L1012 38 L1040 26 L1071 33 L1100 23 L1130 34 L1160 28 L1200 32 L1200 60 Z"
          fill={fill}
          stroke="var(--color-hairline)"
          strokeWidth="1"
          vectorEffect="non-scaling-stroke"
        />
      </svg>
      {tape && (
        <motion.span
          initial={{ opacity: 0, y: -24, rotate: -14 }}
          whileInView={{ opacity: 1, y: 0, rotate: -6 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: "backOut" }}
          className="absolute left-[12%] top-1 h-7 w-28 bg-[#efe3c4]/80 shadow-[0_1px_2px_rgba(0,0,0,.08)]"
          style={{ clipPath: "polygon(3% 0, 97% 4%, 100% 50%, 97% 96%, 2% 100%, 0 50%)" }}
        />
      )}
    </div>
  );
}
