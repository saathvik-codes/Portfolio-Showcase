import { useEffect, useRef } from "react";
import { motion, useReducedMotion } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import AnimatedCinemaPlate from "./AnimatedCinemaPlate";
import { experiences } from "@/data/portfolioData";

gsap.registerPlugin(ScrollTrigger);

export default function Experience() {
  const sectionRef = useRef<HTMLElement>(null);
  const reduceMotion = useReducedMotion();

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".exp-reveal",
        { y: 28, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.7,
          stagger: 0.12,
          ease: "power3.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 76%",
            toggleActions: "play none none reverse",
          },
        },
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="experience"
      className="relative py-20 md:py-32 px-5 sm:px-10 md:px-14"
      data-testid="experience-section"
    >
      <div className="max-w-7xl mx-auto space-y-12 md:space-y-16">
        <div className="exp-reveal flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-white/[0.1] pb-8">
          <div>
            <div className="section-index mb-3">02 — Production Experience</div>
            <h2 className="text-[clamp(2.2rem,5.2vw,4.4rem)] leading-[0.95] font-display font-bold text-[#f2ede4]">
              Shipped under{" "}
              <span className="font-serif-editorial italic font-normal text-[#e8a85a]">
                real traffic.
              </span>
            </h2>
          </div>
          <div className="font-mono text-xs text-white/45 tracking-wider">
            Darwix AI · Caterworld.ai · AIMaster.live
          </div>
        </div>

        {/* Visual Convo Feature: Darwix AI Voice & Video Systems */}
        <div className="exp-reveal grid lg:grid-cols-12 gap-8 items-center">
          <div className="lg:col-span-6">
            <AnimatedCinemaPlate
              src="/illustrations/experience-darwix.jpg"
              alt="Saathvik reviewing LLM voice screening waveforms and deterministic state flows with a hiring operations lead"
              badgeLeft="Act II · Darwix AI · Aug 2026 – Present"
              badgeRight="226 Tests Verified"
              kenBurnsDirection="right"
            >
              <div className="studio-plate rounded-xl p-3.5 max-w-md border-white/[0.14] space-y-2.5">
                <div className="flex items-center justify-between gap-3">
                  <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-[#e8a85a]">
                    Voice Pipeline Telemetry
                  </span>
                  <div className="flex items-end gap-1 h-3.5" aria-hidden="true">
                    {[0.45, 0.9, 0.65, 1, 0.55].map((heightRatio, idx) => (
                      <motion.span
                        key={idx}
                        className="w-0.5 rounded-full bg-[#e8a85a]"
                        animate={
                          reduceMotion
                            ? { height: `${Math.round(heightRatio * 12)}px` }
                            : { height: ["4px", `${Math.round(heightRatio * 14)}px`, "5px"] }
                        }
                        transition={{
                          duration: 0.9 + idx * 0.14,
                          repeat: Infinity,
                          ease: "easeInOut",
                          delay: idx * 0.12,
                        }}
                      />
                    ))}
                  </div>
                </div>
                <p className="text-xs text-[#f2ede4]/88 leading-relaxed">
                  Voice screening agents + deterministic dialogue state machines across 1,500+ candidates and 80+ hiring campaigns.
                </p>
              </div>
            </AnimatedCinemaPlate>
          </div>

          <div className="lg:col-span-6 space-y-5">
            <div className="font-mono text-[11px] uppercase tracking-[0.22em] text-[#e8a85a]">
              Why Deterministic Guardrails Matter in Voice AI
            </div>
            <p className="text-white/75 text-base sm:text-lg leading-relaxed">
              &ldquo;Letting an LLM talk freely on an insurance pre-issuance call is how compliance breaks. Pairing FastAPI, Deepgram STT, and ElevenLabs TTS with an explicit dialogue state machine meant every transition could be verified across 226 automated tests.&rdquo;
            </p>
            <div className="grid grid-cols-3 gap-3 pt-2">
              <div className="studio-plate rounded-xl p-3.5">
                <div className="font-display text-xl sm:text-2xl font-bold text-[#f2ede4]">1,500+</div>
                <div className="font-mono text-[10px] text-white/45 mt-0.5">Candidates Screened</div>
              </div>
              <div className="studio-plate rounded-xl p-3.5">
                <div className="font-display text-xl sm:text-2xl font-bold text-[#e8a85a]">9 Stages</div>
                <div className="font-mono text-[10px] text-white/45 mt-0.5">Hiring Funnel</div>
              </div>
              <div className="studio-plate rounded-xl p-3.5">
                <div className="font-display text-xl sm:text-2xl font-bold text-[#9d8cff]">226</div>
                <div className="font-mono text-[10px] text-white/45 mt-0.5">Automated Tests</div>
              </div>
            </div>
          </div>
        </div>

        {/* Chronological Timeline */}
        <div className="space-y-6">
          {experiences.map((exp, i) => (
            <article
              key={exp.id}
              className="exp-reveal studio-plate rounded-2xl p-6 sm:p-8 transition-colors duration-300 hover:border-white/[0.2]"
              data-testid={`exp-card-${i}`}
            >
              <div className="grid lg:grid-cols-12 gap-6 items-start">
                <div className="lg:col-span-4 space-y-2">
                  <div className="inline-flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.2em]" style={{ color: exp.accent }}>
                    <span className="h-1.5 w-1.5 rounded-full" style={{ background: exp.accent }} />
                    {exp.type}
                  </div>
                  <h3 className="font-display text-xl sm:text-2xl font-bold text-[#f2ede4]">
                    {exp.role}
                  </h3>
                  <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-sm">
                    {exp.companyUrl ? (
                      <a
                        href={exp.companyUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="font-medium underline underline-offset-4 decoration-white/20 hover:decoration-current transition-colors"
                        style={{ color: exp.accent }}
                      >
                        {exp.company} ↗
                      </a>
                    ) : (
                      <span className="font-medium" style={{ color: exp.accent }}>
                        {exp.company}
                      </span>
                    )}
                    <span className="font-mono text-xs text-white/40">{exp.location}</span>
                  </div>
                  <div className="font-mono text-xs text-white/45 pt-1">{exp.period}</div>
                </div>

                <div className="lg:col-span-8 space-y-4">
                  <p className="font-serif-editorial italic text-lg sm:text-xl text-[#f2ede4]/85 leading-snug">
                    {exp.promptHook}
                  </p>
                  <p className="text-sm text-white/60 leading-relaxed">{exp.summary}</p>
                  <ul className="space-y-2">
                    {exp.highlights.map((bullet, idx) => (
                      <li key={idx} className="flex items-start gap-3 text-xs sm:text-sm text-white/75 leading-relaxed">
                        <span className="mt-1.5 h-1 w-1 rounded-full shrink-0" style={{ background: exp.accent }} />
                        <span>{bullet}</span>
                      </li>
                    ))}
                  </ul>
                  <div className="flex flex-wrap gap-2 pt-2">
                    {exp.tags.map((tag) => (
                      <span
                        key={tag}
                        className="font-mono text-[10px] px-2.5 py-1 rounded-full border"
                        style={{
                          borderColor: `${exp.accent}35`,
                          color: exp.accent,
                          background: `${exp.accent}0f`,
                        }}
                        data-testid={`exp-tag-${tag}`}
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
