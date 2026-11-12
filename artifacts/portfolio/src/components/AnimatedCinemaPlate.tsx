import { type ReactNode, useRef } from "react";
import {
  motion,
  useMotionValue,
  useReducedMotion,
  useSpring,
  useTransform,
} from "framer-motion";

interface AnimatedCinemaPlateProps {
  src: string;
  alt: string;
  badgeLeft: string;
  badgeRight?: string;
  caption?: string;
  captionAuthor?: string;
  kenBurnsDirection?: "left" | "right" | "zoom";
  colorGradePreset?: "editorial" | "matte-deep";
  priority?: boolean;
  children?: ReactNode;
}

export default function AnimatedCinemaPlate({
  src,
  alt,
  badgeLeft,
  badgeRight,
  caption,
  captionAuthor,
  kenBurnsDirection = "zoom",
  colorGradePreset = "editorial",
  priority = false,
  children,
}: AnimatedCinemaPlateProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const reduceMotion = useReducedMotion();

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springCfg = { stiffness: 115, damping: 22, mass: 0.65 };
  const smoothX = useSpring(mouseX, springCfg);
  const smoothY = useSpring(mouseY, springCfg);

  const rotateX = useTransform(smoothY, [-0.5, 0.5], [3.2, -3.2]);
  const rotateY = useTransform(smoothX, [-0.5, 0.5], [-4.2, 4.2]);
  const layerOffsetX = useTransform(smoothX, [-0.5, 0.5], [-9, 9]);
  const layerOffsetY = useTransform(smoothY, [-0.5, 0.5], [-7, 7]);

  const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (reduceMotion || !cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    mouseX.set((e.clientX - rect.left) / rect.width - 0.5);
    mouseY.set((e.clientY - rect.top) / rect.height - 0.5);
  };

  const handlePointerLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
  };

  const kenBurnsAnimation = reduceMotion
    ? undefined
    : kenBurnsDirection === "left"
      ? {
          scale: [1.04, 1.11, 1.04],
          x: ["0%", "-2.4%", "0%"],
          y: ["0%", "-1.1%", "0%"],
        }
      : kenBurnsDirection === "right"
        ? {
            scale: [1.05, 1.11, 1.05],
            x: ["-1.6%", "1.8%", "-1.6%"],
            y: ["0%", "-1%", "0%"],
          }
        : {
            scale: [1.02, 1.09, 1.02],
            y: ["0%", "-1.4%", "0%"],
          };

  const imageFilter =
    colorGradePreset === "matte-deep"
      ? "saturate(0.75) contrast(1.12) brightness(0.86) sepia(0.05)"
      : "saturate(0.84) contrast(1.07) brightness(0.9)";

  return (
    <motion.div
      ref={cardRef}
      onPointerMove={handlePointerMove}
      onPointerLeave={handlePointerLeave}
      style={
        reduceMotion
          ? undefined
          : {
              rotateX,
              rotateY,
              transformPerspective: 1100,
            }
      }
      className="studio-frame rounded-2xl aspect-[16/10] w-full group will-change-transform"
    >
      {/* Animated matte color-graded film plane */}
      <motion.div
        animate={kenBurnsAnimation}
        transition={{
          duration: 18,
          ease: "easeInOut",
          repeat: Infinity,
        }}
        className="absolute inset-0 w-full h-full will-change-transform"
      >
        <img
          src={src}
          alt={alt}
          loading={priority ? "eager" : "lazy"}
          className="w-full h-full object-cover object-center"
          style={{ filter: imageFilter }}
        />
      </motion.div>

      {/* Atmospheric film vignette & darkroom LUT so images feel cohesive with the obsidian canvas */}
      <div
        className="absolute inset-0 pointer-events-none z-[1]"
        style={{
          background:
            "radial-gradient(ellipse at 50% 45%, transparent 36%, rgba(8,8,10,0.74) 100%), linear-gradient(180deg, rgba(8,8,10,0.32) 0%, rgba(8,8,10,0.06) 44%, rgba(8,8,10,0.88) 100%)",
          boxShadow: "inset 0 0 42px rgba(8,8,10,0.68)",
        }}
      />

      {/* Subtle moving tungsten anamorphic sweep */}
      {!reduceMotion && (
        <motion.div
          aria-hidden="true"
          animate={{ x: ["-45%", "145%"] }}
          transition={{ duration: 12, repeat: Infinity, repeatDelay: 4.5, ease: "easeInOut" }}
          className="absolute inset-y-0 w-1/3 pointer-events-none z-[2] opacity-[0.065]"
          style={{
            background:
              "linear-gradient(90deg, transparent, rgba(232,168,90,0.9), rgba(157,140,255,0.4), transparent)",
            transform: "skewX(-18deg)",
          }}
        />
      )}

      {/* Floating foreground parallax overlay */}
      <motion.div
        style={reduceMotion ? undefined : { x: layerOffsetX, y: layerOffsetY }}
        className="relative z-10 h-full flex flex-col justify-between p-4 sm:p-5"
      >
        <div className="flex items-center justify-between gap-2">
          <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#08080a]/82 backdrop-blur-md border border-white/[0.14] font-mono text-[10px] tracking-[0.2em] uppercase text-[#f2ede4]/88">
            <span
              className={`h-1.5 w-1.5 rounded-full bg-[#e8a85a] ${
                reduceMotion ? "" : "animate-pulse"
              }`}
            />
            {badgeLeft}
          </span>
          {badgeRight && (
            <span className="px-2.5 py-1 rounded-full bg-[#08080a]/78 backdrop-blur-md border border-[#e8a85a]/30 font-mono text-[10px] text-[#e8a85a]">
              {badgeRight}
            </span>
          )}
        </div>

        {children ? (
          children
        ) : (
          caption && (
            <div className="studio-plate rounded-xl p-3.5 max-w-md border-white/[0.14]">
              {captionAuthor && (
                <div className="font-mono text-[10px] uppercase tracking-[0.18em] text-[#e8a85a] mb-1">
                  {captionAuthor}
                </div>
              )}
              <p className="text-xs text-[#f2ede4]/88 leading-relaxed">{caption}</p>
            </div>
          )
        )}
      </motion.div>
    </motion.div>
  );
}
