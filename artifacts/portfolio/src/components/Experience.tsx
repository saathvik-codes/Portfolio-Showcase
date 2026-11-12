import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { experiences } from "@/data/portfolioData";

gsap.registerPlugin(ScrollTrigger);

export default function Experience() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".exp-reveal",
        { y: 16, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.55,
          stagger: 0.08,
          ease: "power2.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 85%",
            toggleActions: "play none none none",
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
      className="relative py-20 md:py-28 px-5 sm:px-8 border-b border-[#e4e2dd]"
      data-testid="experience-section"
    >
      <div className="max-w-6xl mx-auto space-y-12">
        <div className="exp-reveal flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <div className="section-kicker mb-2">02 · Production Experience</div>
            <h2 className="text-3xl sm:text-4xl font-bold tracking-[-0.025em] text-[#141413]">
              Shipped under{" "}
              <span className="font-serif-editorial italic font-normal text-[#57534e]">
                real traffic.
              </span>
            </h2>
          </div>
          <p className="font-mono text-xs text-[#78716c]">
            Darwix AI · Caterworld.ai · AIMaster.live
          </p>
        </div>

        <div className="divide-y divide-[#e4e2dd] border-t border-[#e4e2dd]">
          {experiences.map((exp, i) => (
            <article
              key={exp.id}
              className="exp-reveal py-8 sm:py-10 grid lg:grid-cols-12 gap-6 lg:gap-10 items-start"
              data-testid={`exp-card-${i}`}
            >
              {/* Role & Meta */}
              <div className="lg:col-span-4 space-y-1.5">
                <div className="flex items-center gap-2 text-xs font-medium text-[#57534e]">
                  <span
                    className="h-2 w-2 rounded-full shrink-0"
                    style={{ background: exp.accent }}
                  />
                  <span>{exp.type}</span>
                </div>
                <h3 className="text-xl font-bold text-[#141413] tracking-tight pt-0.5">
                  {exp.role}
                </h3>
                <div className="flex flex-wrap items-center gap-x-2.5 gap-y-1 text-sm">
                  {exp.companyUrl ? (
                    <a
                      href={exp.companyUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="font-semibold underline underline-offset-4 decoration-[#d6d3cb] hover:decoration-current transition-colors"
                      style={{ color: exp.accent }}
                    >
                      {exp.company} ↗
                    </a>
                  ) : (
                    <span className="font-semibold" style={{ color: exp.accent }}>
                      {exp.company}
                    </span>
                  )}
                  <span className="text-xs text-[#78716c]">{exp.location}</span>
                </div>
                <div className="font-mono text-xs text-[#78716c] pt-0.5">{exp.period}</div>
              </div>

              {/* Impact & Bullets */}
              <div className="lg:col-span-8 space-y-4">
                <p className="text-sm sm:text-base text-[#141413] font-medium leading-relaxed">
                  {exp.summary}
                </p>
                <ul className="space-y-2.5">
                  {exp.highlights.map((bullet, idx) => (
                    <li
                      key={idx}
                      className="flex items-start gap-3 text-sm text-[#57534e] leading-relaxed"
                    >
                      <span
                        className="mt-2 h-1.5 w-1.5 rounded-full shrink-0"
                        style={{ background: exp.accent }}
                      />
                      <span>{bullet}</span>
                    </li>
                  ))}
                </ul>
                <div className="flex flex-wrap gap-1.5 pt-1">
                  {exp.tags.map((tag) => (
                    <span
                      key={tag}
                      className="font-mono text-[11px] px-2.5 py-1 rounded-full bg-[#f3f1ec] text-[#57534e] border border-[#e4e2dd]"
                      data-testid={`exp-tag-${tag}`}
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
