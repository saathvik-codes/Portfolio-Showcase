export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <div className="text-center">
        <div className="font-mono text-violet-400/60 text-xs tracking-widest uppercase mb-4">404</div>
        <h1 className="font-serif text-4xl text-white mb-3" style={{ fontFamily: "'Syne', sans-serif" }}>
          Page not found
        </h1>
        <p className="text-white/30 text-sm font-mono">
          <a href="/" className="hover:text-violet-400 transition-colors">Go home ↗</a>
        </p>
      </div>
    </div>
  );
}
