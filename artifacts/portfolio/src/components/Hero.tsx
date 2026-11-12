import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import gsap from "gsap";
import { heroWalkthroughTopics, profile } from "@/data/portfolioData";

interface HeroProps {
  onNavigate?: (href: string) => void;
}

export default function Hero({ onNavigate }: HeroProps) {
  const heroRef = useRef<HTMLElement>(null);
  const [topicIdx, setTopicIdx] = useState(0);
  const reduceMotion = useReducedMotion();

  const activeTopic = heroWalkthroughTopics[topicIdx] ?? heroWalkthroughTopics[0];

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".hero-enter",
        { y: 14, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.55,
          stagger: 0.06,
          ease: "power3.out",
          clearProps: "transform",
        },
      );
    }, heroRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={heroRef}
      id="hero"
      className="relative pt-28 sm:pt-36 pb-16 sm:pb-24 px-5 sm:px-8 border-b border-[#e4e2dd]"
      data-testid="hero-section"
    >
      <div className="max-w-6xl mx-auto grid lg:grid-cols-12 gap-10 lg:gap-14 items-center">
        {/* Left: Editorial Intro */}
        <div className="lg:col-span-6 space-y-6">
          <div className="hero-enter flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-[#57534e]">
            <span>{profile.university}</span>
            <span aria-hidden="true" className="text-[#a8a29e]">·</span>
            <span>{profile.location}</span>
            <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-[#ecfdf5] text-[#047857] border border-[#a7f3d0] text-[11px] font-medium">
              <span className="h-1.5 w-1.5 rounded-full bg-[#059669]" />
              {profile.availability}
            </span>
          </div>

          <h1
            className="hero-enter text-4xl sm:text-5xl lg:text-[3.5rem] font-bold tracking-[-0.03em] leading-[1.05] text-[#141413]"
            aria-label={profile.name}
          >
            {profile.name}
            <span className="block mt-1 font-serif-editorial italic font-normal text-[#2563eb] text-[0.95em]">
              {profile.headlineRole}.
            </span>
          </h1>

          <p className="hero-enter text-base sm:text-lg text-[#57534e] leading-relaxed max-w-xl">
            Building distributed storage engines in Go &amp; C++, production voice &amp; retrieval AI
            pipelines, and responsive web systems with deterministic guarantees.
          </p>

          <div className="hero-enter flex flex-wrap items-center gap-3.5 pt-2">
            <a
              href="#projects"
              onClick={(e) => {
                e.preventDefault();
                if (onNavigate) onNavigate("#projects");
                else document.querySelector("#projects")?.scrollIntoView({ behavior: "smooth" });
              }}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#141413] text-[#faf9f6] text-xs sm:text-sm font-medium hover:bg-[#2563eb] transition-colors"
              data-testid="hero-cta-work"
            >
              Explore Work <span>↓</span>
            </a>

            <a
              href={profile.resumePath}
              download
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-white border border-[#dcd9d0] text-xs sm:text-sm font-medium text-[#141413] hover:border-[#141413] transition-colors"
            >
              Resume PDF ↓
            </a>

            <a
              href="#contact"
              onClick={(e) => {
                e.preventDefault();
                if (onNavigate) onNavigate("#contact");
                else document.querySelector("#contact")?.scrollIntoView({ behavior: "smooth" });
              }}
              className="text-xs sm:text-sm font-medium text-[#57534e] hover:text-[#2563eb] underline underline-offset-4 decoration-[#dcd9d0] hover:decoration-[#2563eb] px-2 py-2 transition-colors"
              data-testid="hero-cta-contact"
            >
              Get in Touch ↗
            </a>
          </div>
        </div>

        {/* Right: Concise Interactive Architecture Q&A Card */}
        <div className="hero-enter lg:col-span-6">
          <div
            className="clean-card rounded-2xl p-6 sm:p-7 shadow-[0_1px_2px_rgba(20,20,19,0.04),0_12px_32px_-16px_rgba(20,20,19,0.08)] space-y-5"
            data-testid="hero-walkthrough-card"
          >
            <div className="flex flex-wrap items-center justify-between gap-2 pb-4 border-b border-[#eceae4]">
              <span className="text-xs font-medium text-[#57534e]">
                Architecture Walkthrough
              </span>
              <span className="font-mono text-[11px] text-[#78716c]">
                0{topicIdx + 1} / 0{heroWalkthroughTopics.length}
              </span>
            </div>

            {/* Topic Switcher */}
            <div className="flex flex-wrap gap-1.5" role="tablist" aria-label="Engineering focus areas">
              {heroWalkthroughTopics.map((topic, idx) => {
                const selected = idx === topicIdx;
                return (
                  <button
                    key={topic.id}
                    type="button"
                    role="tab"
                    aria-selected={selected}
                    onClick={() => setTopicIdx(idx)}
                    className={`px-3 py-1.5 rounded-full text-xs font-medium transition-colors cursor-pointer ${
                      selected
                        ? "bg-[#141413] text-[#faf9f6]"
                        : "bg-[#f3f1ec] text-[#57534e] hover:text-[#141413]"
                    }`}
                  >
                    {topic.label}
                  </button>
                );
              })}
            </div>

            <AnimatePresence mode="wait">
              <motion.div
                key={activeTopic.id}
                initial={reduceMotion ? false : { opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                exit={reduceMotion ? undefined : { opacity: 0, y: -4 }}
                transition={{ duration: 0.2 }}
                className="space-y-3 min-h-[146px]"
              >
                <p className="font-serif-editorial italic text-xl sm:text-[1.35rem] leading-snug text-[#141413]">
                  &ldquo;{activeTopic.question}&rdquo;
                </p>
                <p className="text-sm text-[#57534e] leading-relaxed">
                  {activeTopic.answer}
                </p>
              </motion.div>
            </AnimatePresence>

            <div className="pt-3 border-t border-[#eceae4] flex flex-wrap items-center justify-between gap-2 text-xs">
              <span className="font-mono text-[11px] text-[#2563eb] font-medium">
                {activeTopic.metric}
              </span>
              <span className="text-[#78716c] text-[11px]">
                Verified benchmarks &amp; shipped production code
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
