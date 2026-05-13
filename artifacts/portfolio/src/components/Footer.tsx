export default function Footer() {
  const year = new Date().getFullYear();

  const navLinks = [
    { label: "About", href: "#about" },
    { label: "Experience", href: "#experience" },
    { label: "Projects", href: "#projects" },
    { label: "Skills", href: "#skills" },
    { label: "Certs", href: "#certifications" },
    { label: "Contact", href: "#contact" },
  ];

  const socials = [
    {
      label: "LinkedIn",
      href: "https://linkedin.com/in/saathvik-kalepu-17041228b",
      icon: (
        <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor">
          <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6zM2 9h4v12H2z"/>
          <circle cx="4" cy="4" r="2"/>
        </svg>
      ),
    },
    {
      label: "GitHub",
      href: "https://github.com/saathvik-codes",
      icon: (
        <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor">
          <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0 1 12 6.844a9.59 9.59 0 0 1 2.504.337c1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0 0 22 12.017C22 6.484 17.522 2 12 2z"/>
        </svg>
      ),
    },
    {
      label: "LeetCode",
      href: "https://leetcode.com/u/Sunny550/",
      icon: (
        <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
          <path d="M14 4L6 12l8 8"/>
          <path d="M8 12h10"/>
          <path d="M15 6l3 3"/>
        </svg>
      ),
    },
    {
      label: "Instagram",
      href: "https://www.instagram.com/itz._.sunnyyy18/",
      icon: (
        <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
          <rect x="2" y="2" width="20" height="20" rx="5"/>
          <circle cx="12" cy="12" r="4"/>
          <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none"/>
        </svg>
      ),
    },
    {
      label: "Email",
      href: "mailto:saathvikk202@gmail.com",
      icon: (
        <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
          <rect x="2" y="4" width="20" height="16" rx="2"/>
          <path d="M2 8L12 14L22 8"/>
        </svg>
      ),
    },
  ];

  const handleNav = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    document.querySelector(href)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <footer className="relative border-t border-white/[0.04] overflow-hidden" data-testid="footer">
      {/* Ambient glow */}
      <div className="absolute inset-0 pointer-events-none"
        style={{ background: "radial-gradient(ellipse 60% 100% at 50% 100%, rgba(139,92,246,0.05) 0%, transparent 70%)" }} />

      <div className="max-w-7xl mx-auto px-4 sm:px-8 md:px-16 py-16 relative z-10">
        {/* Top section */}
        <div className="grid grid-cols-1 md:grid-cols-[1fr_auto_auto] gap-10 md:gap-16 mb-12">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-3 mb-4">
              <svg viewBox="0 0 60 36" width="44" height="26" fill="none">
                <path d="M 4 9 C 4 9 17 5 17 12 C 17 18 4 18 4 24 C 4 30 17 28 17 28" stroke="#a78bfa" strokeWidth="2.5" strokeLinecap="round" fill="none"/>
                <path d="M 26 5 L 26 28" stroke="#a78bfa" strokeWidth="2.5" strokeLinecap="round" fill="none"/>
                <path d="M 26 17 L 44 5" stroke="#a78bfa" strokeWidth="2.5" strokeLinecap="round" fill="none"/>
                <path d="M 26 17 L 44 28" stroke="#a78bfa" strokeWidth="2.5" strokeLinecap="round" fill="none"/>
                <circle cx="48" cy="28" r="2.5" fill="#c084fc"/>
              </svg>
              <div>
                <div className="font-semibold text-white/90 text-sm" style={{ fontFamily: "'Syne', sans-serif" }}>
                  Saathvik Kalepu
                </div>
                <div className="font-mono text-xs text-white/20 mt-0.5">Software Developer</div>
              </div>
            </div>
            <p className="text-white/25 text-sm leading-relaxed max-w-xs mb-6">
              Full stack developer & AI enthusiast. Building elegant software from Hyderabad, India.
            </p>
            <div className="flex items-center gap-2 mb-6">
              <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span className="font-mono text-xs text-emerald-400/60">Open to new opportunities</span>
            </div>
            <a
              href="/Saathvik_Kalepu_Resume.pdf"
              download
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full border border-violet-500/30 text-violet-400/80 hover:text-violet-300 hover:border-violet-400/50 hover:bg-violet-500/8 font-mono text-xs tracking-widest uppercase transition-all duration-300"
              data-hover="true"
            >
              <svg viewBox="0 0 14 14" width="12" height="12" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
                <path d="M 7 1 L 7 9 M 4 7 L 7 10 L 10 7"/>
                <path d="M 1 12 L 13 12"/>
              </svg>
              Download Resume
            </a>
          </div>

          {/* Nav links */}
          <div>
            <div className="font-mono text-xs text-white/20 tracking-widest uppercase mb-5">Navigation</div>
            <nav className="flex flex-col gap-3">
              {navLinks.map(({ label, href }) => (
                <a
                  key={href}
                  href={href}
                  onClick={(e) => handleNav(e, href)}
                  className="font-mono text-xs tracking-widest uppercase text-white/30 hover:text-violet-400 transition-colors duration-300"
                  data-hover="true"
                >
                  {label}
                </a>
              ))}
            </nav>
          </div>

          {/* Socials */}
          <div>
            <div className="font-mono text-xs text-white/20 tracking-widest uppercase mb-5">Connect</div>
            <div className="flex flex-col gap-3">
              {socials.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  target={s.href.startsWith("http") ? "_blank" : undefined}
                  rel="noreferrer"
                  className="group flex items-center gap-3 text-white/25 hover:text-violet-400 transition-colors duration-300"
                  data-hover="true"
                >
                  <span className="group-hover:text-violet-400 transition-colors">{s.icon}</span>
                  <span className="font-mono text-xs tracking-widest uppercase">{s.label}</span>
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="h-px bg-gradient-to-r from-transparent via-white/[0.06] to-transparent mb-8" />

        {/* Bottom row */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="font-mono text-xs text-white/12">
            © {year} Saathvik Kalepu · All rights reserved.
          </p>

          {/* Social icon row (compact) */}
          <div className="flex items-center gap-4">
            {socials.map((s) => (
              <a key={s.label} href={s.href}
                target={s.href.startsWith("http") ? "_blank" : undefined}
                rel="noreferrer"
                className="text-white/12 hover:text-violet-400 transition-colors duration-300 p-1"
                data-hover="true" title={s.label}>
                {s.icon}
              </a>
            ))}
          </div>

          <p className="font-mono text-xs text-white/12">
            Hyderabad, India
          </p>
        </div>
      </div>
    </footer>
  );
}
