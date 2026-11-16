import { AnimatePresence, motion } from "framer-motion";
import { ArrowDown, MapPin, MessageCircle, MessagesSquare } from "lucide-react";
import { useState } from "react";
import { heroStats, heroWalkthroughTopics, profile } from "@/data/portfolioData";
import Illustration from "./Illustration";
import { CountUp, Reveal, SocialRow } from "./primitives";

export default function Hero({ onNavigate }: { onNavigate: (id: string) => void }) {
  const [i, setI] = useState(0);
  const topic = heroWalkthroughTopics[i];

  return (
    <section id="prologue" className="pt-32 sm:pt-40 pb-20">
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <div className="grid lg:grid-cols-[minmax(0,6fr)_minmax(0,5fr)] gap-14 lg:gap-20 items-center">
          <Reveal>
            <p className="eyebrow mb-6 inline-flex items-center gap-1.5">
              <MapPin size={13} aria-hidden /> {profile.headlineRole} · {profile.location}
            </p>
            <h1 className="display text-[2.9rem] sm:text-6xl lg:text-[4.4rem] text-ink">
              Backend systems that keep working when things <em className="italic text-accent">fail</em>.
            </h1>
            <p className="mt-7 max-w-xl text-lg text-muted leading-relaxed">
              I&rsquo;m Saathvik, a final-year CS student at IIITDM Kurnool and AI Engineer Intern at Darwix AI.
              This page is a short walkthrough in five chapters: scroll, use the guide at the bottom, or pick a
              question below.
            </p>
            <p className="mt-3 hidden lg:block text-sm text-faint">
              Tip: press <kbd className="rounded-sm border border-hairline bg-surface px-1.5 font-mono text-[.75rem]">J</kbd> for the next chapter,{" "}
              <kbd className="rounded-sm border border-hairline bg-surface px-1.5 font-mono text-[.75rem]">K</kbd> for the previous one.
            </p>
            <div className="mt-9 flex flex-wrap items-center gap-3">
              <button onClick={() => onNavigate("about")} className="inline-flex items-center gap-2 rounded-sm bg-ink px-5 py-3 text-sm font-medium text-paper hover:bg-accent">
                Start the walkthrough <ArrowDown size={16} aria-hidden />
              </button>
              <button onClick={() => onNavigate("contact")} className="inline-flex items-center gap-2 rounded-sm border border-hairline bg-surface px-5 py-3 text-sm font-medium text-ink hover:border-ink">
                <MessageCircle size={16} strokeWidth={1.8} aria-hidden /> Get in touch
              </button>
            </div>
            <SocialRow className="mt-8" />
          </Reveal>
          <Reveal delay={0.1}>
            <div className="drift">
              <Illustration name="hero-convo.jpg" alt="Saathvik talking through a system sketch with a founder" caption="Where most of my projects start: a conversation about the problem." ratio="4 / 5" priority />
            </div>
          </Reveal>
        </div>

        {/* Conversation panel */}
        <Reveal delay={0.1} className="mt-20">
          <div className="grid md:grid-cols-[minmax(0,4fr)_minmax(0,7fr)] border border-hairline bg-surface rounded-sm">
            <div role="tablist" aria-label="Questions" className="border-b md:border-b-0 md:border-r border-hairline">
              {heroWalkthroughTopics.map((t, k) => (
                <button
                  key={t.id}
                  role="tab"
                  aria-selected={k === i}
                  onClick={() => setI(k)}
                  className={`flex w-full items-start gap-3 text-left px-6 py-5 border-b border-hairline last:border-b-0 ${k === i ? "bg-accent-soft" : "hover:bg-sand"}`}
                >
                  <MessagesSquare size={16} strokeWidth={1.8} aria-hidden className={`mt-1 shrink-0 ${k === i ? "text-accent" : "text-faint"}`} />
                  <span className={`text-[.95rem] ${k === i ? "text-ink font-medium" : "text-muted"}`}>{t.label}</span>
                </button>
              ))}
            </div>
            <div className="p-7 sm:p-10 min-h-[17rem]">
              <AnimatePresence mode="wait">
                <motion.div key={topic.id} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} transition={{ duration: 0.3 }}>
                  <p className="eyebrow mb-3">Question</p>
                  <p className="font-serif text-2xl sm:text-[1.7rem] leading-snug text-ink">{topic.question}</p>
                  <p className="eyebrow mt-7 mb-3">Answer</p>
                  <p className="text-muted leading-relaxed">{topic.answer}</p>
                  <p className="mt-6 inline-block border-t border-clay pt-2 font-mono text-[.8rem] text-clay">{topic.metric}</p>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </Reveal>

        <dl className="mt-16 grid grid-cols-2 lg:grid-cols-4 gap-y-10 gap-x-6 border-t border-hairline pt-10">
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
