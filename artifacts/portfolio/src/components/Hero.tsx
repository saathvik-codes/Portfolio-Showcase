import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { ArrowDown, FileText, MapPin } from "lucide-react";
import { useEffect, useState } from "react";
import { heroStats, profile } from "@/data/portfolioData";
import Illustration from "./Illustration";
import { CountUp, Mark, Reveal, SocialRow } from "./primitives";

const GREETING = "Hi, I'm Saathvik.";
const GLYPHS = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";

/** Letters resolve from random glyphs into the greeting. */
function useScramble(text: string) {
  const reduce = useReducedMotion();
  const [out, setOut] = useState(reduce ? text : "");
  useEffect(() => {
    if (reduce) return;
    let i = 0;
    const id = setInterval(() => {
      i += 1 / 3;
      setOut(text.split("").map((c, k) => (k < i || c === " " ? c : GLYPHS[(Math.random() * GLYPHS.length) | 0])).join(""));
      if (i >= text.length) clearInterval(id);
    }, 40);
    return () => clearInterval(id);
  }, [text, reduce]);
  return out;
}

export default function Hero({ onNavigate }: { onNavigate: (id: string) => void }) {
  const greeting = useScramble(GREETING);
  const { scrollY } = useScroll();
  const reduce = useReducedMotion();
  const tilt = useTransform(scrollY, [0, 300], [0, -5]);
  const lift = useTransform(scrollY, [0, 300], [0, 30]);

  return (
    <section id="prologue" className="pt-32 sm:pt-40 pb-16">
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <div className="grid lg:grid-cols-[minmax(0,7fr)_minmax(0,5fr)] gap-14 lg:gap-16 items-center">
          <Reveal>
            <p className="font-mono text-sm text-accent h-6" aria-label={GREETING}>{greeting}</p>
            <h1 className="display mt-4 text-[2.7rem] sm:text-6xl lg:text-[4.2rem] text-ink">
              I build <Mark>backend systems</Mark> that keep working when things fail.
            </h1>
            <p className="mt-7 max-w-xl text-lg text-muted leading-relaxed">
              Final-year Computer Science student at IIITDM Kurnool and AI Engineer Intern at Darwix AI.
              I work on distributed storage, voice and video pipelines, and data products.
            </p>
            <p className="mt-4 inline-flex items-center gap-1.5 text-sm text-faint">
              <MapPin size={15} strokeWidth={1.8} aria-hidden /> {profile.location} · {profile.availability}
            </p>
            <div className="mt-8 flex flex-wrap items-center gap-3">
              <button onClick={() => onNavigate("about")} className="inline-flex items-center gap-2 rounded-sm bg-ink px-5 py-3 text-sm font-medium text-paper hover:bg-accent">
                Start the walkthrough <ArrowDown size={16} aria-hidden />
              </button>
              <a href={profile.resumePath} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 rounded-sm border border-hairline bg-surface px-5 py-3 text-sm font-medium text-ink hover:border-ink">
                <FileText size={16} strokeWidth={1.8} aria-hidden /> Resume
              </a>
            </div>
            <SocialRow className="mt-8" />
          </Reveal>

          {/* Polaroid: tilts as you start scrolling, straightens on hover */}
          <Reveal delay={0.15} className="mx-auto w-full max-w-sm">
            <motion.div
              style={reduce ? undefined : { rotate: tilt, y: lift }}
              whileHover={{ rotate: 0, scale: 1.02 }}
              className="relative bg-surface p-3 pb-14 shadow-[0_18px_40px_-20px_rgba(22,24,29,.35)] border border-hairline"
            >
              <span aria-hidden className="absolute -top-3 left-1/2 h-6 w-24 -translate-x-1/2 rotate-2 bg-[#efe3c4]/85" />
              <Illustration name="hero-convo.jpg" alt="Saathvik sketching a system diagram with a founder over coffee" ratio="1 / 1" parallax={false} priority />
              <p className="absolute bottom-4 inset-x-0 text-center font-serif italic text-muted">Most projects start with a conversation.</p>
            </motion.div>
          </Reveal>
        </div>

        <dl className="mt-20 grid grid-cols-2 lg:grid-cols-4 gap-y-10 gap-x-6 border-t border-hairline pt-10">
          {heroStats.map((s) => (
            <div key={s.label}>
              <dt className="display text-4xl sm:text-5xl text-ink"><CountUp to={s.value} suffix={s.suffix} /></dt>
              <dd className="mt-2 text-sm text-muted max-w-[14rem]">{s.label}</dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
