import { useEffect, useState } from "react";
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
  scrollProgress?: number;
  onNavigate?: (href: string) => void;
}

export default function Navigation({
  visible,
  scrollProgress = 0,
  onNavigate,
}: NavigationProps) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeHref, setActiveHref] = useState("#hero");

  useEffect(() => {
    const targets = ["#hero", ...NAV_LINKS.map((l) => l.href)]
      .map((href) => document.querySelector(href))
      .filter((el): el is Element => Boolean(el));

    if (targets.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const showing = entries.filter((e) => e.isIntersecting);
        if (showing.length > 0) {
          const top = showing.reduce((a, b) =>
            a.intersectionRatio > b.intersectionRatio ? a : b,
          );
          setActiveHref(`#${top.target.id}`);
        }
      },
      { rootMargin: "-38% 0px -45% 0px", threshold: [0, 0.25, 0.5] },
    );

    targets.forEach((s) => observer.observe(s));
    return () => observer.disconnect();
  }, [visible]);

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
      <header
        className="fixed top-0 inset-x-0 z-50 bg-[#faf9f6]/92 backdrop-blur-md border-b border-[#e4e2dd]"
        data-testid="navigation"
      >
        <div className="max-w-6xl mx-auto flex items-center justify-between px-5 sm:px-8 py-3.5">
          <a
            href="#hero"
            onClick={(e) => handleClick(e, "#hero")}
            className="flex items-center gap-2.5 shrink-0"
            data-testid="nav-logo"
            aria-label="Saathvik Kalepu, top"
          >
            <svg viewBox="0 0 60 36" width="32" height="20" fill="none">
              <path
                d="M 4 9 C 4 9 17 5 17 12 C 17 18 4 18 4 24 C 4 30 17 28 17 28"
                stroke="#141413"
                strokeWidth="2.5"
                strokeLinecap="round"
              />
              <path d="M 26 5 L 26 28" stroke="#141413" strokeWidth="2.5" strokeLinecap="round" />
              <path d="M 26 17 L 44 5" stroke="#141413" strokeWidth="2.5" strokeLinecap="round" />
              <path d="M 26 17 L 44 28" stroke="#141413" strokeWidth="2.5" strokeLinecap="round" />
              <circle cx="48" cy="28" r="2.6" fill="#2563eb" />
            </svg>
            <span className="text-xs font-semibold tracking-tight text-[#141413]">
              Saathvik Kalepu
            </span>
          </a>

          <nav className="hidden md:flex items-center gap-7" data-testid="nav-links">
            {NAV_LINKS.map(({ label, href }) => {
              const active = activeHref === href;
              return (
                <a
                  key={href}
                  href={href}
                  onClick={(e) => handleClick(e, href)}
                  className={`text-xs font-medium transition-colors ${
                    active
                      ? "text-[#2563eb]"
                      : "text-[#57534e] hover:text-[#141413]"
                  }`}
                  data-testid={`nav-link-${label.toLowerCase()}`}
                >
                  {label}
                </a>
              );
            })}
          </nav>

          <div className="hidden md:flex items-center">
            <a
              href={profile.resumePath}
              download
              className="inline-flex items-center gap-1.5 text-xs font-medium px-3.5 py-1.5 rounded-full bg-[#141413] text-[#faf9f6] hover:bg-[#2563eb] transition-colors"
              data-testid="nav-resume"
            >
              Resume PDF ↓
            </a>
          </div>

          <button
            type="button"
            onClick={() => setMenuOpen(!menuOpen)}
            className="md:hidden w-9 h-9 flex flex-col items-center justify-center gap-1.5 text-[#141413]"
            aria-label="Toggle menu"
          >
            <span
              className={`block w-5 h-[1.5px] bg-current transition-transform ${
                menuOpen ? "rotate-45 translate-y-[4.5px]" : ""
              }`}
            />
            <span
              className={`block w-5 h-[1.5px] bg-current transition-transform ${
                menuOpen ? "-rotate-45 -translate-y-[3px]" : ""
              }`}
            />
          </button>
        </div>

        {/* Hairline scroll indicator along header base */}
        <div
          className="h-[1.5px] bg-[#2563eb] transition-[width] duration-150 ease-out"
          style={{ width: `${Math.round(scrollProgress * 100)}%` }}
        />
      </header>

      {menuOpen && (
        <div className="fixed top-[57px] inset-x-0 z-40 bg-[#faf9f6] border-b border-[#e4e2dd] px-5 pt-3 pb-6 md:hidden shadow-sm">
          <nav className="flex flex-col divide-y divide-[#ece9e1] mb-4">
            {NAV_LINKS.map(({ label, href }) => (
              <a
                key={href}
                href={href}
                onClick={(e) => handleClick(e, href)}
                className={`py-3 text-sm font-medium ${
                  activeHref === href ? "text-[#2563eb]" : "text-[#141413]"
                }`}
              >
                {label}
              </a>
            ))}
          </nav>
          <a
            href={profile.resumePath}
            download
            className="flex items-center justify-center py-2.5 rounded-full bg-[#141413] text-[#faf9f6] text-xs font-medium"
          >
            Download Resume PDF ↓
          </a>
        </div>
      )}
    </>
  );
}
