import { useEffect, useRef, useState } from "react";
import gsap from "gsap";

interface CountUpProps {
  to: number;
  decimals?: number;
  duration?: number;
  className?: string;
}

export default function CountUp({ to, decimals = 0, duration = 1.4, className }: CountUpProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const [started, setStarted] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      el.textContent = to.toFixed(decimals);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !started) {
          setStarted(true);
          const obj = { val: 0 };
          gsap.to(obj, {
            val: to,
            duration,
            ease: "power2.out",
            onUpdate: () => {
              if (el) el.textContent = obj.val.toFixed(decimals);
            },
          });
          observer.disconnect();
        }
      },
      { threshold: 0.4 },
    );

    observer.observe(el);
    return () => observer.disconnect();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [to, decimals, duration]);

  return <span ref={ref} className={className} style={{ fontVariantNumeric: "tabular-nums" }}>0</span>;
}
