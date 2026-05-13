import { useEffect, useMemo, useRef, type CSSProperties } from "react";

type RollingLine = {
  text: string;
  gradient?: boolean;
};

interface RollingTitleProps {
  lines: RollingLine[];
  className?: string;
  testId?: string;
}

export default function RollingTitle({
  lines,
  className = "",
  testId,
}: RollingTitleProps) {
  const titleRef = useRef<HTMLHeadingElement>(null);
  const label = useMemo(() => lines.map((line) => line.text).join(" "), [lines]);

  useEffect(() => {
    const title = titleRef.current;
    if (!title) return;

    const reveal = () => title.classList.add("is-visible");
    const fallback = window.setTimeout(reveal, 2500);

    if (!("IntersectionObserver" in window)) {
      reveal();
      clearTimeout(fallback);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          reveal();
          clearTimeout(fallback);
          observer.disconnect();
        }
      },
      { threshold: 0.25, rootMargin: "0px 0px -10% 0px" },
    );

    observer.observe(title);
    return () => {
      clearTimeout(fallback);
      observer.disconnect();
    };
  }, []);

  let letterIndex = 0;

  return (
    <h2
      ref={titleRef}
      className={`rolling-title ${className}`}
      aria-label={label}
      data-testid={testId}
    >
      {lines.map((line, lineIndex) => (
        <span
          key={`${line.text}-${lineIndex}`}
          className={`rolling-line ${line.gradient ? "gradient-text" : ""}`}
          aria-hidden="true"
          style={{ "--line-index": lineIndex } as CSSProperties}
        >
          {Array.from(line.text).map((letter, i) => {
            const currentIndex = letterIndex++;
            return (
              <span
                key={`${line.text}-${lineIndex}-${i}`}
                className="roll-letter"
                style={{ "--letter-index": currentIndex } as CSSProperties}
              >
                {letter === " " ? "\u00A0" : letter}
              </span>
            );
          })}
        </span>
      ))}
    </h2>
  );
}
