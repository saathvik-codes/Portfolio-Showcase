import { useMemo } from "react";

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
        >
          {line.text}
        </span>
      ))}
    </h2>
  );
}
