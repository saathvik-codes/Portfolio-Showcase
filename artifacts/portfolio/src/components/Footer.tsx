export default function Footer() {
  return (
    <footer
      className="relative py-12 px-8 md:px-16 border-t border-white/5"
      data-testid="footer"
    >
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
        {/* Logo */}
        <div className="flex items-center gap-3">
          <svg viewBox="0 0 60 36" width="36" height="21" fill="none">
            <path d="M 4 9 C 4 9 17 5 17 12 C 17 18 4 18 4 24 C 4 30 17 28 17 28" stroke="#a78bfa" strokeWidth="2.5" strokeLinecap="round" fill="none" />
            <path d="M 26 5 L 26 28" stroke="#a78bfa" strokeWidth="2.5" strokeLinecap="round" fill="none" />
            <path d="M 26 17 L 44 5" stroke="#a78bfa" strokeWidth="2.5" strokeLinecap="round" fill="none" />
            <path d="M 26 17 L 44 28" stroke="#a78bfa" strokeWidth="2.5" strokeLinecap="round" fill="none" />
            <circle cx="48" cy="28" r="2.5" stroke="#c084fc" strokeWidth="1.5" fill="none" />
          </svg>
          <span className="font-mono text-xs text-white/20 tracking-widest">Saathvik Kalepu</span>
        </div>

        <div className="font-mono text-xs text-white/15 tracking-wide">
          © 2025 · Built with passion · Hyderabad, India
        </div>

        <div className="flex items-center gap-1">
          <div className="glow-dot" style={{ width: 5, height: 5 }} />
          <span className="font-mono text-xs text-white/20 ml-2">Available for work</span>
        </div>
      </div>
    </footer>
  );
}
