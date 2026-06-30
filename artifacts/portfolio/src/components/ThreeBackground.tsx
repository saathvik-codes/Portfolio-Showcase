import { useEffect, useRef } from "react";

export default function ThreeBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    let animId: number;
    let W = canvas.width = window.innerWidth;
    let H = canvas.height = window.innerHeight;

    const onResize = () => {
      W = canvas.width = window.innerWidth;
      H = canvas.height = window.innerHeight;
    };
    window.addEventListener("resize", onResize);

    // Cinematic floating light dust — soft depth-of-field motes drifting upward,
    // no connecting lines (avoids the generic "AI neural network" look).
    interface Mote {
      x: number; y: number; vx: number; vy: number;
      r: number; alpha: number; blur: number; color: string;
      twinklePhase: number; twinkleSpeed: number;
    }

    const colors = ["167,139,250", "196,132,252", "240,171,252", "139,92,246"];
    const motes: Mote[] = Array.from({ length: 55 }, () => {
      const depth = Math.random();
      return {
        x: Math.random() * W,
        y: Math.random() * H,
        vx: (Math.random() - 0.5) * 0.08,
        vy: -0.06 - depth * 0.14,
        r: 0.6 + depth * 2.2,
        alpha: 0.15 + depth * 0.45,
        blur: depth > 0.6 ? (depth - 0.6) * 12 : 0,
        color: colors[Math.floor(Math.random() * colors.length)],
        twinklePhase: Math.random() * Math.PI * 2,
        twinkleSpeed: 0.004 + Math.random() * 0.006,
      };
    });

    let t = 0;
    const draw = () => {
      ctx.clearRect(0, 0, W, H);

      for (const m of motes) {
        m.x += m.vx;
        m.y += m.vy;
        if (m.y < -10) { m.y = H + 10; m.x = Math.random() * W; }
        if (m.x < -10) m.x = W + 10;
        if (m.x > W + 10) m.x = -10;

        const twinkle = 0.7 + 0.3 * Math.sin(t * m.twinkleSpeed + m.twinklePhase);
        const a = m.alpha * twinkle;

        if (m.blur > 0) {
          ctx.save();
          ctx.filter = `blur(${m.blur}px)`;
        }
        ctx.beginPath();
        ctx.arc(m.x, m.y, m.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${m.color},${a})`;
        ctx.fill();
        if (m.blur > 0) ctx.restore();
      }

      t += 1;
      if (!reduceMotion) animId = requestAnimationFrame(draw);
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
      {/* Minimal lens-ring accent — subtle, cinematic, not a tech/AI motif */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <svg
          className="absolute right-10 top-1/2 -translate-y-1/2 opacity-[0.1]"
          width="380" height="380" viewBox="0 0 380 380" fill="none"
          style={{ animation: "spin 90s linear infinite" }}
        >
          <style>{`@keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }`}</style>
          <circle cx="190" cy="190" r="175" stroke="#a78bfa" strokeWidth="0.6" strokeDasharray="1 14" strokeLinecap="round" />
          <circle cx="190" cy="190" r="120" stroke="#c084fc" strokeWidth="0.5" strokeDasharray="0.5 10" strokeLinecap="round" />
        </svg>
      </div>
    </div>
  );
}
