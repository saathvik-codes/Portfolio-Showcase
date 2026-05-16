import { useEffect, useState, type CSSProperties } from "react";

const sections = ["hero", "about", "experience", "projects", "skills", "certifications", "contact"] as const;

export default function ScrollProgress() {
  const [progress, setProgress] = useState(0);
  const [active, setActive] = useState("hero");

  useEffect(() => {
    let frame = 0;

    const update = () => {
      const scrollTop = window.scrollY;
      const maxScroll = Math.max(document.documentElement.scrollHeight - window.innerHeight, 1);
      setProgress(Math.min(scrollTop / maxScroll, 1));

      const current = sections.reduce((nearest, id) => {
        const element = document.getElementById(id);
        if (!element) return nearest;
        const distance = Math.abs(element.getBoundingClientRect().top - window.innerHeight * 0.28);
        return distance < nearest.distance ? { id, distance } : nearest;
      }, { id: "hero", distance: Number.POSITIVE_INFINITY });

      setActive(current.id);
    };

    const onScroll = () => {
      window.cancelAnimationFrame(frame);
      frame = window.requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);

    return () => {
      window.cancelAnimationFrame(frame);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  return (
    <div className="motion-rail" aria-hidden="true">
      <div className="motion-rail-line">
        <div className="motion-rail-fill" style={{ "--scroll-progress": progress } as CSSProperties} />
      </div>
      <div className="motion-rail-nodes">
        {sections.map((id) => (
          <span key={id} className={`motion-node ${active === id ? "is-active" : ""}`} />
        ))}
      </div>
      <div className="motion-orbit">
        <span />
        <span />
        <span />
      </div>
    </div>
  );
}
