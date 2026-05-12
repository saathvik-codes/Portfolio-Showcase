import { useEffect, useRef } from "react";

export default function ThreeBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animId: number;
    let W = canvas.width = window.innerWidth;
    let H = canvas.height = window.innerHeight;

    const onResize = () => {
      W = canvas.width = window.innerWidth;
      H = canvas.height = window.innerHeight;
    };
    window.addEventListener("resize", onResize);

    interface Particle {
      x: number; y: number; vx: number; vy: number;
      r: number; alpha: number; color: string;
    }

    const colors = ["rgba(167,139,250,", "rgba(196,132,252,", "rgba(240,171,252,", "rgba(139,92,246,"];
    const particles: Particle[] = Array.from({ length: 120 }, () => ({
      x: Math.random() * W,
      y: Math.random() * H,
      vx: (Math.random() - 0.5) * 0.3,
      vy: (Math.random() - 0.5) * 0.3,
      r: Math.random() * 1.5 + 0.3,
      alpha: Math.random() * 0.6 + 0.1,
      color: colors[Math.floor(Math.random() * colors.length)],
    }));

    const draw = () => {
      ctx.clearRect(0, 0, W, H);

      for (const p of particles) {
        p.x += p.vx;
        p.y += p.vy;
        if (p.x < 0) p.x = W;
        if (p.x > W) p.x = 0;
        if (p.y < 0) p.y = H;
        if (p.y > H) p.y = 0;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = p.color + p.alpha + ")";
        ctx.fill();
      }

      // Draw connections
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 120) {
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.strokeStyle = `rgba(139,92,246,${0.06 * (1 - dist / 120)})`;
            ctx.lineWidth = 0.5;
            ctx.stroke();
          }
        }
      }

      animId = requestAnimationFrame(draw);
    };

    draw();
    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("resize", onResize);
    };
  }, []);

  return (
    <div className="three-canvas" aria-hidden="true" data-testid="three-background">
      <canvas ref={canvasRef} style={{ width: "100%", height: "100%", display: "block" }} />
      {/* Decorative geometry overlays */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {/* Rotating icosahedron-like wireframe */}
        <svg
          className="absolute right-16 top-1/2 -translate-y-1/2 opacity-[0.07]"
          width="420" height="420" viewBox="0 0 420 420" fill="none"
          style={{ animation: "spin 40s linear infinite" }}
        >
          <style>{`@keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }`}</style>
          <circle cx="210" cy="210" r="200" stroke="#a78bfa" strokeWidth="0.5" />
          <circle cx="210" cy="210" r="140" stroke="#a78bfa" strokeWidth="0.5" />
          <circle cx="210" cy="210" r="80" stroke="#a78bfa" strokeWidth="0.5" />
          {/* Icosahedron lines */}
          {[0,30,60,90,120,150,180,210,240,270,300,330].map((deg, i) => {
            const r = Math.PI * deg / 180;
            const x1 = 210 + 200 * Math.cos(r);
            const y1 = 210 + 200 * Math.sin(r);
            const x2 = 210 + 140 * Math.cos(r + Math.PI / 6);
            const y2 = 210 + 140 * Math.sin(r + Math.PI / 6);
            return <line key={i} x1={x1} y1={y1} x2={x2} y2={y2} stroke="#c084fc" strokeWidth="0.4" />;
          })}
          {[0,60,120,180,240,300].map((deg, i) => {
            const r = Math.PI * deg / 180;
            const x1 = 210 + 80 * Math.cos(r);
            const y1 = 210 + 80 * Math.sin(r);
            return <line key={i} x1="210" y1="210" x2={x1} y2={y1} stroke="#a78bfa" strokeWidth="0.4" />;
          })}
        </svg>

        {/* Torus-like ring */}
        <svg
          className="absolute -left-20 bottom-1/4 opacity-[0.06]"
          width="300" height="300" viewBox="0 0 300 300" fill="none"
          style={{ animation: "spin 60s linear infinite reverse" }}
        >
          <ellipse cx="150" cy="150" rx="140" ry="60" stroke="#c084fc" strokeWidth="0.8" />
          <ellipse cx="150" cy="150" rx="140" ry="60" stroke="#a78bfa" strokeWidth="0.4"
            transform="rotate(45 150 150)" />
          <ellipse cx="150" cy="150" rx="140" ry="60" stroke="#a78bfa" strokeWidth="0.4"
            transform="rotate(90 150 150)" />
          <ellipse cx="150" cy="150" rx="140" ry="60" stroke="#c084fc" strokeWidth="0.4"
            transform="rotate(135 150 150)" />
        </svg>
      </div>
    </div>
  );
}
