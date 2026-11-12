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
    <footer className="relative border-t border-[#e4e2dd] bg-[#f3f1ec]" data-testid="footer">
      <div className="max-w-6xl mx-auto px-5 sm:px-8 py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 pb-10 border-b border-[#e4e2dd]">
          <div className="md:col-span-5 space-y-4">
            <div className="flex items-center gap-2.5">
              <span className="font-mono text-base font-semibold text-[#141413]">
                SK<span className="text-[#2563eb]">.</span>
              </span>
              <span className="text-sm font-semibold text-[#141413]">{profile.name}</span>
            </div>
            <p className="text-xs sm:text-sm text-[#57534e] max-w-sm leading-relaxed">
              {profile.headlineRole} · {profile.subRole}. Built with React, Three.js, Theatre.js,
              GSAP, and Lenis.
            </p>
            <a
              href={profile.resumePath}
              download
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white border border-[#dcd9d0] text-xs font-medium text-[#141413] hover:border-[#141413] transition-colors"
            >
              Download Resume ↓
            </a>
          </div>

          <div className="md:col-span-3 space-y-3">
            <div className="text-xs font-medium text-[#78716c]">Sections</div>
            <nav className="flex flex-col gap-2">
              {navLinks.map(({ label, href }) => (
                <a
                  key={href}
                  href={href}
                  onClick={(e) => handleNav(e, href)}
                  className="text-xs font-medium text-[#57534e] hover:text-[#2563eb] transition-colors"
                >
                  {label}
                </a>
              ))}
            </nav>
          </div>

          <div className="md:col-span-4 space-y-3">
            <div className="text-xs font-medium text-[#78716c]">Profiles</div>
            <div className="flex flex-col gap-2">
              {socialLinks.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noreferrer"
                  className="text-xs text-[#141413] hover:text-[#2563eb] transition-colors flex items-baseline gap-1.5 min-w-0"
                >
                  <span className="font-medium shrink-0">{s.short} —</span>
                  <span className="font-mono text-[11px] text-[#57534e] truncate">{s.handle}</span>
                  <span className="font-mono text-[11px] text-[#57534e] shrink-0">↗</span>
                </a>
              ))}
            </div>
          </div>
        </div>

        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#78716c]">
          <p>© {year} {profile.name} · {profile.location}</p>
          <a
            href="#hero"
            onClick={(e) => handleNav(e, "#hero")}
            className="font-medium hover:text-[#2563eb] transition-colors"
          >
            Back to top ↑
          </a>
        </div>
      </div>
    </footer>
  );
}
