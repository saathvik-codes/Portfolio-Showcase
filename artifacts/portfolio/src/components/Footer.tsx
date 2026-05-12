export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="relative py-14 px-8 md:px-16 border-t border-white/[0.04]" data-testid="footer">
      {/* Top row */}
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-start md:items-center justify-between gap-8 mb-10">
        {/* Logo + tagline */}
        <div className="flex items-center gap-4">
          <svg viewBox="0 0 60 36" width="40" height="24" fill="none">
            <path d="M 4 9 C 4 9 17 5 17 12 C 17 18 4 18 4 24 C 4 30 17 28 17 28" stroke="#a78bfa" strokeWidth="2.5" strokeLinecap="round" fill="none" />
            <path d="M 26 5 L 26 28" stroke="#a78bfa" strokeWidth="2.5" strokeLinecap="round" fill="none" />
            <path d="M 26 17 L 44 5" stroke="#a78bfa" strokeWidth="2.5" strokeLinecap="round" fill="none" />
            <path d="M 26 17 L 44 28" stroke="#a78bfa" strokeWidth="2.5" strokeLinecap="round" fill="none" />
            <circle cx="48" cy="28" r="2.5" fill="#c084fc" />
          </svg>
          <div>
            <div className="font-semibold text-white/80 text-sm" style={{ fontFamily: "'Syne', sans-serif" }}>
              Saathvik Kalepu
            </div>
            <div className="font-mono text-xs text-white/20 mt-0.5">Software Developer · Hyderabad, IN</div>
          </div>
        </div>

        {/* Quick links */}
        <div className="flex flex-wrap items-center gap-6">
          {[
            { label: "About", href: "#about" },
            { label: "Experience", href: "#experience" },
            { label: "Projects", href: "#projects" },
            { label: "Skills", href: "#skills" },
            { label: "Contact", href: "#contact" },
          ].map(({ label, href }) => (
            <a
              key={href}
              href={href}
              onClick={(e) => {
                e.preventDefault();
                document.querySelector(href)?.scrollIntoView({ behavior: "smooth" });
              }}
              className="font-mono text-xs tracking-widest uppercase text-white/20 hover:text-violet-400 transition-colors duration-300"
              data-hover="true"
            >
              {label}
            </a>
          ))}
        </div>

        {/* Resume CTA */}
        <a
          href="/Saathvik_Kalepu_Resume.pdf"
          download
          className="flex items-center gap-2 font-mono text-xs tracking-widest uppercase px-4 py-2.5 border border-violet-500/25 text-violet-400/70 hover:text-violet-300 hover:border-violet-400/40 transition-all duration-300 rounded-sm"
          data-hover="true"
          data-testid="footer-resume"
        >
          <svg viewBox="0 0 12 12" width="11" height="11" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
            <path d="M 6 1 L 6 8 M 3 6 L 6 9 L 9 6"/>
            <path d="M 1 11 L 11 11"/>
          </svg>
          Download Resume
        </a>
      </div>

      {/* Bottom row */}
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4 pt-8 border-t border-white/[0.04]">
        <div className="font-mono text-xs text-white/12 tracking-wide">
          © {year} Saathvik Kalepu · All rights reserved.
        </div>

        <div className="flex items-center gap-2">
          <div className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
          <span className="font-mono text-xs text-emerald-400/50">Available for new opportunities</span>
        </div>

        <div className="flex items-center gap-4">
          <a
            href="https://linkedin.com/in/saathvik-kalepu-17041228b"
            target="_blank"
            rel="noreferrer"
            className="text-white/15 hover:text-violet-400 transition-colors duration-300"
            data-hover="true"
          >
            <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor">
              <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6zM2 9h4v12H2z"/>
              <circle cx="4" cy="4" r="2"/>
            </svg>
          </a>
          <a
            href="https://github.com/saathvik-codes"
            target="_blank"
            rel="noreferrer"
            className="text-white/15 hover:text-violet-400 transition-colors duration-300"
            data-hover="true"
          >
            <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor">
              <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0 1 12 6.844a9.59 9.59 0 0 1 2.504.337c1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0 0 22 12.017C22 6.484 17.522 2 12 2z"/>
            </svg>
          </a>
          <a
            href="mailto:saathvikk202@gmail.com"
            className="text-white/15 hover:text-violet-400 transition-colors duration-300"
            data-hover="true"
          >
            <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
              <rect x="2" y="4" width="20" height="16" rx="2"/>
              <path d="M2 8L12 14L22 8"/>
            </svg>
          </a>
        </div>
      </div>
    </footer>
  );
}
