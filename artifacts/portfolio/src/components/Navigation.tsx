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
  const mobileMenuRef = useRef<HTMLDivElement>(null);
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeHref, setActiveHref] = useState("#hero");

  useEffect(() => {
    if (!navRef.current) return;
    gsap.fromTo(navRef.current,
      { yPercent: -100, opacity: 0 },
      { yPercent: 0, opacity: 1, duration: 1, ease: "power3.out", delay: 0.2 }
    );
  }, [visible]);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const sections = NAV_LINKS
      .map(({ href }) => document.querySelector(href))
      .filter((el): el is Element => !!el);

    if (sections.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries.filter((e) => e.isIntersecting);
        if (visible.length > 0) {
          const top = visible.reduce((a, b) => (a.intersectionRatio > b.intersectionRatio ? a : b));
          setActiveHref(`#${top.target.id}`);
        }
      },
      { rootMargin: "-45% 0px -45% 0px", threshold: [0, 0.25, 0.5, 0.75, 1] },
    );

    sections.forEach((s) => observer.observe(s));
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!mobileMenuRef.current) return;
    if (menuOpen) {
      gsap.fromTo(mobileMenuRef.current,
        { opacity: 0, y: -10 },
        { opacity: 1, y: 0, duration: 0.3, ease: "power2.out" }
      );
    }
  }, [menuOpen]);

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    setMenuOpen(false);
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  if (!visible) return null;

  return (
    <>
      <nav
        ref={navRef}
        className="fixed top-0 inset-x-0 z-50 flex items-center justify-between px-4 sm:px-8 md:px-12 py-3 md:py-5 transition-all duration-500"
        style={{
          background: scrolled || menuOpen ? "rgba(10,10,10,0.92)" : "transparent",
          backdropFilter: scrolled || menuOpen ? "blur(24px) saturate(1.4)" : "none",
          borderBottom: scrolled || menuOpen ? "1px solid rgba(255,255,255,0.04)" : "none",
        }}
        data-testid="navigation"
      >
        {/* Logo */}
        <a
          href="#"
          onClick={(e) => { e.preventDefault(); setMenuOpen(false); window.scrollTo({ top: 0, behavior: "smooth" }); }}
          className="flex items-center gap-2 group shrink-0"
          data-hover="true"
          data-testid="nav-logo"
        >
          <svg viewBox="0 0 60 36" width="36" height="22" fill="none" className="sm:w-10 sm:h-6">
            <path d="M 4 9 C 4 9 17 5 17 12 C 17 18 4 18 4 24 C 4 30 17 28 17 28" stroke="#a78bfa" strokeWidth="2.5" strokeLinecap="round" fill="none" className="transition-all duration-300 group-hover:stroke-purple-300"/>
            <path d="M 26 5 L 26 28" stroke="#a78bfa" strokeWidth="2.5" strokeLinecap="round" fill="none" className="transition-all duration-300 group-hover:stroke-purple-300"/>
            <path d="M 26 17 L 44 5" stroke="#a78bfa" strokeWidth="2.5" strokeLinecap="round" fill="none" className="transition-all duration-300 group-hover:stroke-purple-300"/>
            <path d="M 26 17 L 44 28" stroke="#a78bfa" strokeWidth="2.5" strokeLinecap="round" fill="none" className="transition-all duration-300 group-hover:stroke-purple-300"/>
            <circle cx="48" cy="28" r="2.5" fill="#c084fc"/>
          </svg>
        </a>

        {/* Desktop links */}
        <div className="hidden md:flex items-center gap-7 lg:gap-9" data-testid="nav-links">
          {NAV_LINKS.map(({ label, href }) => (
            <a key={href} href={href} onClick={(e) => handleClick(e, href)}
              className={`nav-link ${activeHref === href ? "nav-link-active" : ""}`}
              data-hover="true" data-testid={`nav-link-${label.toLowerCase()}`}>
              {label}
            </a>
          ))}
        </div>

        <div className="hidden md:flex items-center gap-3">
          <a href="/Saathvik_Kalepu_Resume.pdf" download
            className="shimmer-btn flex items-center gap-2 font-mono text-xs tracking-widest uppercase px-4 py-2 border border-white/10 text-white/35 hover:text-violet-400 hover:border-violet-500/40 transition-all duration-300 rounded-full"
            data-hover="true" data-testid="nav-resume">
            <svg viewBox="0 0 12 12" width="11" height="11" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
              <path d="M 6 1 L 6 8 M 3 6 L 6 9 L 9 6"/><path d="M 1 11 L 11 11"/>
            </svg>
            Resume
          </a>
        </div>

        {/* Mobile: hamburger */}
        <div className="flex md:hidden items-center gap-2">
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="w-11 h-11 flex flex-col items-center justify-center gap-1.5 text-white/50 hover:text-white transition-colors"
            aria-label="Toggle menu"
          >
            <span className={`block w-5 h-px bg-current transition-all duration-300 ${menuOpen ? "rotate-45 translate-y-[5px]" : ""}`}/>
            <span className={`block w-5 h-px bg-current transition-all duration-300 ${menuOpen ? "opacity-0" : ""}`}/>
            <span className={`block w-5 h-px bg-current transition-all duration-300 ${menuOpen ? "-rotate-45 -translate-y-[5px]" : ""}`}/>
          </button>
        </div>
      </nav>

      {/* Mobile dropdown menu */}
      {menuOpen && (
        <div
          ref={mobileMenuRef}
          className="fixed top-[54px] sm:top-[60px] inset-x-0 z-40 bg-[#0a0a0a]/95 backdrop-blur-2xl border-b border-white/[0.08] px-4 sm:px-6 pt-3 sm:pt-4 pb-6 sm:pb-8 md:hidden"
          style={{ borderTop: "1px solid rgba(255,255,255,0.04)" }}
        >
          <nav className="flex flex-col gap-1 mb-6">
            {NAV_LINKS.map(({ label, href }) => (
              <a key={href} href={href} onClick={(e) => handleClick(e, href)}
                className={`flex items-center justify-between py-3 font-mono text-xs sm:text-sm tracking-widest uppercase transition-colors border-b border-white/[0.064] ${activeHref === href ? "text-violet-400" : "text-white/50 hover:text-violet-400"}`}>
                {label}
                {activeHref === href && <span className="h-1.5 w-1.5 rounded-full bg-violet-400 shadow-[0_0_8px_rgba(167,139,250,0.8)]" />}
              </a>
            ))}
          </nav>
          <a href="/Saathvik_Kalepu_Resume.pdf" download
            className="flex items-center justify-center gap-2 py-3 border border-white/10 text-white/40 hover:text-violet-400 font-mono text-[11px] sm:text-xs tracking-widest uppercase rounded-xl transition-all">
            <svg viewBox="0 0 12 12" width="11" height="11" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
              <path d="M 6 1 L 6 8 M 3 6 L 6 9 L 9 6"/><path d="M 1 11 L 11 11"/>
            </svg>
            Download Resume
          </a>
        </div>
      )}
    </>
  );
}
