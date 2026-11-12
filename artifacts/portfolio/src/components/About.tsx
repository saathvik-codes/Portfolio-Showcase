import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import AnimatedCinemaPlate from "./AnimatedCinemaPlate";
import CountUp from "./CountUp";
import { education, profile } from "@/data/portfolioData";

gsap.registerPlugin(ScrollTrigger);

export default function About() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".about-reveal",
        { y: 26, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.72,
          stagger: 0.1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 78%",
            toggleActions: "play none none reverse",
          },
        },
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const stats = [
    { num: 8.2, decimals: 1, label: "CGPA at IIITDM", suffix: "" },
    { num: 350, decimals: 0, label: "LeetCode Solved (35 Hard)", suffix: "+" },
    { num: 3, decimals: 0, label: "Production Internships", suffix: "" },
    { num: 1500, decimals: 0, label: "Candidates via Voice AI", suffix: "+" },
  ];

  return (
    <section
      ref={sectionRef}
      id="about"
      className="relative py-20 md:py-32 px-5 sm:px-10 md:px-14"
      data-testid="about-section"
    >
      <div className="max-w-7xl mx-auto space-y-12 md:space-y-16">
        <div className="about-reveal flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-white/[0.1] pb-8">
          <div>
            <div className="section-index mb-3">01 — Engineering Philosophy</div>
            <h2 className="text-[clamp(2.2rem,5.2vw,4.4rem)] leading-[0.95] font-display font-bold text-[#f2ede4]">
              Built for production,{" "}
              <span className="font-serif-editorial italic font-normal text-[#e8a85a]">
                explained simply.
              </span>
            </h2>
          </div>
          <p className="text-sm sm:text-base text-white/55 max-w-md leading-relaxed">
            CS undergrad at <span className="text-[#f2ede4]">IIITDM Kurnool</span> focused on
            making distributed backends, AI agent workflows, and user interfaces agree cleanly.
          </p>
        </div>

        <div className="grid lg:grid-cols-12 gap-10 lg:gap-12 items-start">
          {/* Left: Animated convo whiteboard frame + verified education */}
          <div className="lg:col-span-6 space-y-8 about-reveal">
            <AnimatedCinemaPlate
              src="/illustrations/about-convo.jpg"
              alt="Saathvik and a product teammate aligning system diagrams on a frosted glass whiteboard"
              badgeLeft="Act I · Whiteboard Alignment"
              kenBurnsDirection="left"
              captionAuthor="Product & Backend Conversation"
              caption="“If a user has to wonder why a workflow stalled, either the state machine is hiding an edge case or the interface didn’t tell the truth.”"
            />

            <div className="space-y-4">
              <div className="font-mono text-[10px] uppercase tracking-[0.24em] text-[#e8a85a]/80">
                Education &amp; Academic Foundations
              </div>
              <div className="space-y-4 divide-y divide-white/[0.08]">
                {education.map((edu, i) => (
                  <div key={i} className={i > 0 ? "pt-4" : ""}>
                    <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-1">
                      <h3 className="text-base font-semibold text-[#f2ede4]">{edu.degree}</h3>
                      <span className="font-mono text-xs text-[#e8a85a] shrink-0">{edu.metric}</span>
                    </div>
                    <p className="text-xs sm:text-sm text-white/55 mt-1">{edu.institution}</p>
                    <p className="font-mono text-[11px] text-white/35 mt-1.5">{edu.coursework}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right: Editorial biography + metrics + principles */}
          <div className="lg:col-span-6 space-y-8 about-reveal">
            <div className="space-y-4 text-sm sm:text-base text-white/65 leading-relaxed">
              <p>
                Most software breaks in the handoffs: between a webhook and a queue, between an LLM
                tool call and deterministic business state, or between a complex pricing database and
                a first-time user.
              </p>
              <p>
                That is where I spend my time. Over internships at{" "}
                <span className="text-[#f2ede4] font-medium">Darwix AI</span>,{" "}
                <span className="text-[#f2ede4] font-medium">Caterworld.ai</span>, and{" "}
                <span className="text-[#f2ede4] font-medium">AIMaster.live</span>, alongside systems
                projects in <span className="text-[#e8a85a]">Go</span>,{" "}
                <span className="text-[#e8a85a]">C++</span>, and{" "}
                <span className="text-[#9d8cff]">Python/TypeScript</span>, I work from storage and
                sockets up through evaluation harnesses and interface craft.
              </p>
            </div>

            <div
              className="grid grid-cols-2 gap-4 sm:gap-5"
              data-testid="stats-grid"
            >
              {stats.map(({ num, decimals, label, suffix }) => (
                <div
                  key={label}
                  className="studio-plate rounded-2xl p-4 sm:p-5"
                  data-testid={`stat-${label.replace(/\s+/g, "-").toLowerCase()}`}
                >
                  <div className="font-display text-3xl sm:text-4xl font-bold text-[#f2ede4]">
                    <CountUp to={num} decimals={decimals} />
                    <span className="text-[#e8a85a]">{suffix}</span>
                  </div>
                  <div className="font-mono text-[11px] text-white/45 mt-1.5">{label}</div>
                </div>
              ))}
            </div>

            <div className="studio-plate rounded-2xl p-5 space-y-3">
              <div className="font-mono text-[10px] uppercase tracking-[0.22em] text-white/40">
                Direct Links
              </div>
              <div className="flex flex-wrap gap-3">
                <a
                  href="https://github.com/saathvik-codes"
                  target="_blank"
                  rel="noreferrer"
                  className="px-3.5 py-2 rounded-full border border-white/[0.12] font-mono text-[11px] text-white/75 hover:border-[#e8a85a] hover:text-[#e8a85a] transition-colors"
                  data-testid="about-github"
                >
                  GitHub ↗
                </a>
                <a
                  href="https://linkedin.com/in/saathvik-kalepu-17041228b"
                  target="_blank"
                  rel="noreferrer"
                  className="px-3.5 py-2 rounded-full border border-white/[0.12] font-mono text-[11px] text-white/75 hover:border-[#e8a85a] hover:text-[#e8a85a] transition-colors"
                  data-testid="about-linkedin"
                >
                  LinkedIn ↗
                </a>
                <a
                  href="https://leetcode.com/u/Sunny550/"
                  target="_blank"
                  rel="noreferrer"
                  className="px-3.5 py-2 rounded-full border border-white/[0.12] font-mono text-[11px] text-white/75 hover:border-[#9d8cff] hover:text-[#9d8cff] transition-colors"
                >
                  LeetCode Sunny550 ↗
                </a>
                <a
                  href={profile.resumePath}
                  download
                  className="px-3.5 py-2 rounded-full border border-[#e8a85a]/40 bg-[#e8a85a]/10 font-mono text-[11px] text-[#e8a85a] hover:bg-[#e8a85a]/20 transition-colors"
                  data-testid="about-resume"
                >
                  Download Resume ↓
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
