import { useEffect, useRef, useState } from "react";
import gsap from "gsap";

const NAV_LINKS = [
  { label: "About", href: "#about" },
  { label: "Experience", href: "#experience" },
  { label: "Work", href: "#projects" },
  { label: "Skills", href: "#skills" },
  { label: "Contact", href: "#contact" },
];

interface NavigationProps {
  visible: boolean;
}

export default function Navigation({ visible }: NavigationProps) {
  const navRef = useRef<HTMLElement>(null);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    if (!navRef.current) return;
    gsap.fromTo(
      navRef.current,
      { yPercent: -100, opacity: 0 },
      { yPercent: 0, opacity: 1, duration: 1, ease: "power3.out", delay: 0.2 }
    );
  }, [visible]);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  if (!visible) return null;

  return (
    <nav
      ref={navRef}
      className="fixed top-0 inset-x-0 z-50 flex items-center justify-between px-8 md:px-12 py-5 transition-all duration-500"
      style={{
        background: scrolled ? "rgba(10,10,10,0.9)" : "transparent",
        backdropFilter: scrolled ? "blur(24px) saturate(1.4)" : "none",
        borderBottom: scrolled ? "1px solid rgba(255,255,255,0.04)" : "none",
      }}
      data-testid="navigation"
    >
      {/* Logo */}
      <a
        href="#"
        onClick={(e) => { e.preventDefault(); window.scrollTo({ top: 0, behavior: "smooth" }); }}
        className="flex items-center gap-2 group"
        data-hover="true"
        data-testid="nav-logo"
      >
        <svg viewBox="0 0 60 36" width="44" height="26" fill="none">
          <path d="M 4 9 C 4 9 17 5 17 12 C 17 18 4 18 4 24 C 4 30 17 28 17 28" stroke="#a78bfa" strokeWidth="2.5" strokeLinecap="round" fill="none" className="transition-all duration-300 group-hover:stroke-purple-300" />
          <path d="M 26 5 L 26 28" stroke="#a78bfa" strokeWidth="2.5" strokeLinecap="round" fill="none" className="transition-all duration-300 group-hover:stroke-purple-300" />
          <path d="M 26 17 L 44 5" stroke="#a78bfa" strokeWidth="2.5" strokeLinecap="round" fill="none" className="transition-all duration-300 group-hover:stroke-purple-300" />
          <path d="M 26 17 L 44 28" stroke="#a78bfa" strokeWidth="2.5" strokeLinecap="round" fill="none" className="transition-all duration-300 group-hover:stroke-purple-300" />
          <circle cx="48" cy="28" r="2.5" fill="#c084fc" />
        </svg>
      </a>

      {/* Links */}
      <div className="hidden md:flex items-center gap-8" data-testid="nav-links">
        {NAV_LINKS.map(({ label, href }) => (
          <a
            key={href}
            href={href}
            onClick={(e) => handleClick(e, href)}
            className="nav-link"
            data-hover="true"
            data-testid={`nav-link-${label.toLowerCase()}`}
          >
            {label}
          </a>
        ))}
      </div>

      {/* Right actions */}
      <div className="flex items-center gap-3">
        <a
          href="/Saathvik_Kalepu_Resume.pdf"
          download
          className="hidden md:flex items-center gap-2 font-mono text-xs tracking-widest uppercase px-4 py-2 border border-white/10 text-white/40 hover:text-violet-400 hover:border-violet-500/40 transition-all duration-300 rounded-sm"
          data-hover="true"
          data-testid="nav-resume"
        >
          <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
            <path d="M 6 1 L 6 8 M 3 6 L 6 9 L 9 6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M 1 10 L 11 10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
          </svg>
          Resume
        </a>
        <a
          href="mailto:saathvikk202@gmail.com"
          className="font-mono text-xs tracking-widest uppercase px-4 py-2 bg-violet-500/10 border border-violet-500/40 text-violet-400 hover:bg-violet-500/20 hover:border-violet-400 transition-all duration-300 rounded-sm"
          data-hover="true"
          data-testid="nav-hire"
        >
          Hire Me
        </a>
      </div>
    </nav>
  );
}
