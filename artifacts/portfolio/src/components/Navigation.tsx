import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { profile } from "@/data/portfolioData";

const NAV_LINKS = [
  { label: "About", href: "#about" },
  { label: "Experience", href: "#experience" },
  { label: "Work", href: "#projects" },
  { label: "Skills", href: "#skills" },
  { label: "Credentials", href: "#certifications" },
  { label: "Contact", href: "#contact" },
];

interface NavigationProps {
  visible: boolean;
  onNavigate?: (href: string) => void;
}

export default function Navigation({ visible, onNavigate }: NavigationProps) {
  const navRef = useRef<HTMLElement>(null);
  const mobileMenuRef = useRef<HTMLDivElement>(null);
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeHref, setActiveHref] = useState("#hero");

  useEffect(() => {
    if (!navRef.current || !visible) return;
    gsap.fromTo(
      navRef.current,
      { yPercent: -100, opacity: 0 },
      { yPercent: 0, opacity: 1, duration: 0.85, ease: "power3.out", delay: 0.1 },
    );
  }, [visible]);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 42);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const targets = ["#hero", ...NAV_LINKS.map((l) => l.href)]
      .map((href) => document.querySelector(href))
      .filter((el): el is Element => Boolean(el));

    if (targets.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const showing = entries.filter((e) => e.isIntersecting);
        if (showing.length > 0) {
          const top = showing.reduce((a, b) => (a.intersectionRatio > b.intersectionRatio ? a : b));
          setActiveHref(`#${top.target.id}`);
        }
      },
      { rootMargin: "-42% 0px -42% 0px", threshold: [0, 0.25, 0.5, 0.75] },
    );

    targets.forEach((s) => observer.observe(s));
    return () => observer.disconnect();
  }, [visible]);

  useEffect(() => {
    if (!mobileMenuRef.current || !menuOpen) return;
    gsap.fromTo(
      mobileMenuRef.current,
      { opacity: 0, y: -8 },
      { opacity: 1, y: 0, duration: 0.28, ease: "power2.out" },
    );
  }, [menuOpen]);

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    setMenuOpen(false);
    if (onNavigate) {
      onNavigate(href);
    } else {
      document.querySelector(href)?.scrollIntoView({ behavior: "smooth" });
    }
  };

  if (!visible) return null;

  return (
    <>
      <nav
        ref={navRef}
        className="fixed top-0 inset-x-0 z-50 flex items-center justify-between px-4 sm:px-8 md:px-12 py-3.5 md:py-4 transition-all duration-500"
        style={{
          background: scrolled || menuOpen ? "rgba(8, 8, 10, 0.88)" : "transparent",
          backdropFilter: scrolled || menuOpen ? "blur(20px) saturate(1.3)" : "none",
          borderBottom: scrolled || menuOpen ? "1px solid rgba(242, 237, 228, 0.08)" : "none",
        }}
        data-testid="navigation"
      >
        <a
          href="#hero"
          onClick={(e) => handleClick(e, "#hero")}
          className="flex items-center gap-2.5 group shrink-0"
          data-hover="true"
          data-testid="nav-logo"
          aria-label="Saathvik Kalepu, top"
        >
          <svg viewBox="0 0 60 36" width="36" height="22" fill="none">
            <path
              d="M 4 9 C 4 9 17 5 17 12 C 17 18 4 18 4 24 C 4 30 17 28 17 28"
              stroke="#e8a85a"
              strokeWidth="2.4"
              strokeLinecap="round"
            />
            <path d="M 26 5 L 26 28" stroke="#f2ede4" strokeWidth="2.4" strokeLinecap="round" />
            <path d="M 26 17 L 44 5" stroke="#f2ede4" strokeWidth="2.4" strokeLinecap="round" />
            <path d="M 26 17 L 44 28" stroke="#f2ede4" strokeWidth="2.4" strokeLinecap="round" />
            <circle cx="48" cy="28" r="2.5" fill="#9d8cff" />
          </svg>
          <span className="hidden sm:inline font-mono text-[10px] tracking-[0.26em] uppercase text-white/45 group-hover:text-white/80 transition-colors">
            Saathvik
          </span>
        </a>

        <div className="hidden md:flex items-center gap-7 lg:gap-9" data-testid="nav-links">
          {NAV_LINKS.map(({ label, href }) => {
            const active = activeHref === href;
            return (
              <a
                key={href}
                href={href}
                onClick={(e) => handleClick(e, href)}
                className={`relative font-mono text-[11px] tracking-[0.16em] uppercase transition-colors duration-300 ${
                  active ? "text-[#e8a85a]" : "text-white/45 hover:text-white/85"
                }`}
                data-hover="true"
                data-testid={`nav-link-${label.toLowerCase()}`}
              >
                {label}
                {active && (
                  <span className="absolute -bottom-1.5 left-0 right-0 h-px bg-[#e8a85a] shadow-[0_0_8px_rgba(232,168,90,0.8)]" />
                )}
              </a>
            );
          })}
        </div>

        <div className="hidden md:flex items-center gap-3">
          <a
            href={profile.resumePath}
            download
            className="flex items-center gap-2 font-mono text-[11px] tracking-[0.18em] uppercase px-4 py-2 rounded-full border border-white/[0.14] text-white/70 hover:text-[#08080a] hover:bg-[#e8a85a] hover:border-[#e8a85a] transition-all duration-300"
            data-hover="true"
            data-testid="nav-resume"
          >
            <svg viewBox="0 0 12 12" width="11" height="11" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
              <path d="M 6 1 L 6 8 M 3 6 L 6 9 L 9 6" />
              <path d="M 1 11 L 11 11" />
            </svg>
            Resume
          </a>
        </div>

        <div className="flex md:hidden items-center gap-2">
          <button
            type="button"
            onClick={() => setMenuOpen(!menuOpen)}
            className="w-10 h-10 flex flex-col items-center justify-center gap-1.5 text-white/70 hover:text-white transition-colors"
            aria-label="Toggle menu"
          >
            <span className={`block w-5 h-px bg-current transition-all duration-300 ${menuOpen ? "rotate-45 translate-y-[5px]" : ""}`} />
            <span className={`block w-5 h-px bg-current transition-all duration-300 ${menuOpen ? "opacity-0" : ""}`} />
            <span className={`block w-5 h-px bg-current transition-all duration-300 ${menuOpen ? "-rotate-45 -translate-y-[5px]" : ""}`} />
          </button>
        </div>
      </nav>

      {menuOpen && (
        <div
          ref={mobileMenuRef}
          className="fixed top-[56px] inset-x-0 z-40 bg-[#08080a]/95 backdrop-blur-2xl border-b border-white/[0.1] px-5 pt-4 pb-6 md:hidden"
        >
          <nav className="flex flex-col gap-1 mb-5">
            {NAV_LINKS.map(({ label, href }) => (
              <a
                key={href}
                href={href}
                onClick={(e) => handleClick(e, href)}
                className={`flex items-center justify-between py-3 font-mono text-xs tracking-[0.2em] uppercase border-b border-white/[0.07] ${
                  activeHref === href ? "text-[#e8a85a]" : "text-white/60"
                }`}
              >
                {label}
                {activeHref === href && <span className="h-1.5 w-1.5 rounded-full bg-[#e8a85a]" />}
              </a>
            ))}
          </nav>
          <a
            href={profile.resumePath}
            download
            className="flex items-center justify-center gap-2 py-3 rounded-xl border border-[#e8a85a]/45 text-[#e8a85a] font-mono text-xs tracking-[0.2em] uppercase"
          >
            Download Resume ↓
          </a>
        </div>
      )}
    </>
  );
}
