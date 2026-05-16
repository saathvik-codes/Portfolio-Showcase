import { useMemo, type CSSProperties } from "react";

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
  const label = useMemo(() => lines.map((line) => line.text).join(" "), [lines]);

  let letterIndex = 0;

  return (
    <h2
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
