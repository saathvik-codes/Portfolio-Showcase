import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { useRef, useState } from "react";

/**
 * Framed illustration slot. Loads /illustrations/<name>. If the file is not
 * present yet, shows a quiet drafting-paper placeholder so layout never breaks.
 */
export default function Illustration({
  name,
  alt,
  caption,
  ratio = "4 / 3",
  parallax = true,
  priority = false,
}: {
  name: string;
  alt: string;
  caption?: string;
  ratio?: string;
  parallax?: boolean;
  priority?: boolean;
}) {
  const [missing, setMissing] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], ["-4%", "4%"]);

  return (
    <figure className="m-0">
      <div
        ref={ref}
        className="relative overflow-hidden rounded-sm border border-hairline bg-sand"
        style={{ aspectRatio: ratio }}
      >
        {missing ? (
          <div
            aria-hidden
            className="absolute inset-0"
            style={{
              backgroundImage:
                "repeating-linear-gradient(135deg, transparent 0 14px, rgba(22,24,29,.035) 14px 15px)",
            }}
          />
        ) : (
          <motion.img
            src={`/illustrations/${name}`}
            alt={alt}
            loading={priority ? "eager" : "lazy"}
            decoding="async"
            onError={() => setMissing(true)}
            style={parallax && !reduce ? { y, scale: 1.1 } : undefined}
            className="absolute inset-0 h-full w-full object-cover"
          />
        )}
      </div>
      {caption && <figcaption className="mt-3 text-[.82rem] text-faint">{caption}</figcaption>}
    </figure>
  );
}
