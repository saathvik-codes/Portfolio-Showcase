import { profile, socialLinks } from "@/data/portfolioData";

interface FooterProps {
  onNavigate?: (href: string) => void;
}

export default function Footer({ onNavigate }: FooterProps) {
  const year = new Date().getFullYear();

  const navLinks = [
    { label: "About", href: "#about" },
    { label: "Experience", href: "#experience" },
    { label: "Work", href: "#projects" },
    { label: "Skills", href: "#skills" },
    { label: "Credentials", href: "#certifications" },
    { label: "Contact", href: "#contact" },
  ];

  const handleNav = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    if (onNavigate) {
      onNavigate(href);
    } else {
      document.querySelector(href)?.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <footer className="relative border-t border-white/[0.1] bg-[#08080a]/90" data-testid="footer">
      <div className="max-w-7xl mx-auto px-5 sm:px-10 md:px-14 py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 pb-10 border-b border-white/[0.08]">
          <div className="md:col-span-5 space-y-4">
            <div className="flex items-center gap-3">
              <span className="font-mono text-lg font-medium text-[#f2ede4]">
                SK<span className="text-[#e8a85a]">.</span>
              </span>
              <span className="text-sm font-medium text-white/80">{profile.name}</span>
            </div>
            <p className="text-xs sm:text-sm text-white/50 max-w-sm leading-relaxed">
              {profile.headlineRole} · {profile.subRole}. Built with React, Three.js, Theatre.js,
              GSAP ScrollTrigger, and Lenis.
            </p>
            <a
              href={profile.resumePath}
              download
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-[#e8a85a]/40 font-mono text-[11px] uppercase tracking-widest text-[#e8a85a] hover:bg-[#e8a85a] hover:text-[#08080a] transition-colors"
            >
              Download Resume ↓
            </a>
          </div>

          <div className="md:col-span-3 space-y-3">
            <div className="font-mono text-[10px] uppercase tracking-[0.22em] text-white/35">
              Chapters
            </div>
            <nav className="flex flex-col gap-2">
              {navLinks.map(({ label, href }) => (
                <a
                  key={href}
                  href={href}
                  onClick={(e) => handleNav(e, href)}
                  className="font-mono text-xs uppercase tracking-wider text-white/55 hover:text-[#e8a85a] transition-colors"
                >
                  {label}
                </a>
              ))}
            </nav>
          </div>

          <div className="md:col-span-4 space-y-3">
            <div className="font-mono text-[10px] uppercase tracking-[0.22em] text-white/35">
              Verified Profiles
            </div>
            <div className="flex flex-col gap-2">
              {socialLinks.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noreferrer"
                  className="font-mono text-xs text-white/60 hover:text-[#e8a85a] transition-colors"
                >
                  {s.short} — <span className="text-white/35">{s.handle} ↗</span>
                </a>
              ))}
            </div>
          </div>
        </div>

        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 font-mono text-[11px] text-white/35">
          <p>© {year} {profile.name} · {profile.location}</p>
          <a
            href="#hero"
            onClick={(e) => handleNav(e, "#hero")}
            className="hover:text-[#e8a85a] transition-colors uppercase tracking-widest"
          >
            Back to top ↑
          </a>
        </div>
      </div>
    </footer>
  );
}
