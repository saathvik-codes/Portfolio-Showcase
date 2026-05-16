import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import RollingTitle from "./RollingTitle";

gsap.registerPlugin(ScrollTrigger);

export default function About() {
  const sectionRef = useRef<HTMLElement>(null);
  const leftRef = useRef<HTMLDivElement>(null);
  const rightRef = useRef<HTMLDivElement>(null);
  const statsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        [leftRef.current, rightRef.current],
        { y: 28, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.75,
          stagger: 0.12,
          ease: "power3.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 78%",
            end: "bottom 18%",
            toggleActions: "play reverse play reverse",
          },
        },
      );
      if (statsRef.current) {
        gsap.fromTo(
          statsRef.current.children,
          { y: 24, opacity: 0, scale: 0.96 },
          {
            y: 0,
            opacity: 1,
            scale: 1,
            duration: 0.55,
            stagger: 0.08,
            ease: "power3.out",
            scrollTrigger: {
              trigger: statsRef.current,
              start: "top 88%",
              end: "bottom 20%",
              toggleActions: "play reverse play reverse",
            },
          },
        );
      }
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  const stats = [
    { num: "8.2", label: "CGPA at IITDM", suffix: "" },
    { num: "200", label: "LeetCode Problems", suffix: "+" },
    { num: "5", label: "Full-stack Projects", suffix: "+" },
    { num: "7", label: "Months at AIMaster", suffix: "" },
  ];

  return (
    <section
      ref={sectionRef}
      id="about"
      className="relative py-20 md:py-32 px-4 sm:px-8 md:px-16 overflow-hidden"
      data-testid="about-section"
    >
      <div className="absolute left-0 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-violet-500/15 to-transparent" />

      <div className="max-w-7xl mx-auto">
        <div className="section-index mb-6">01 — About</div>

        <div className="grid md:grid-cols-2 gap-10 md:gap-20 items-start">
          {/* Left */}
          <div ref={leftRef}>
            <RollingTitle
              lines={[
                { text: "Crafting software" },
                { text: "that matters.", gradient: true },
              ]}
              className="font-serif text-[clamp(1.75rem,8.4vw,2.15rem)] md:text-[clamp(2.5rem,5vw,4.5rem)] leading-[1.06] md:leading-[1.05] text-white mb-6 md:mb-8"
              testId="about-heading"
            />

            <div className="flex items-center gap-3 sm:gap-5 mb-6 md:mb-8 p-3 sm:p-4 rounded-lg border border-white/5 bg-white/[0.02]">
              <div
                className="w-12 h-12 sm:w-16 sm:h-16 rounded-full shrink-0 flex items-center justify-center text-lg sm:text-2xl border border-violet-500/30"
                style={{
                  background: "linear-gradient(135deg, rgba(139,92,246,0.3), rgba(192,132,252,0.15))",
                  fontFamily: "'Syne', sans-serif",
                  fontWeight: 800,
                  color: "#a78bfa",
                }}
              >
                SK
              </div>
              <div>
                <div className="font-semibold text-white text-sm">Saathvik Kalepu</div>
                <div className="font-mono text-xs text-violet-400/60 mt-0.5">Software Developer · Hyderabad, India</div>
                <div className="flex items-center gap-2 mt-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                  <span className="font-mono text-xs text-emerald-400/70">Open to opportunities</span>
                </div>
              </div>
            </div>

            <div className="space-y-4 md:space-y-5 text-white/45 text-sm sm:text-base leading-relaxed">
              <p>
                I'm a Computer Science student at{" "}
                <span className="text-violet-400/80 font-medium">IITDM Kurnool</span>{" "}
                with a strong foundation in software engineering, data structures, and scalable system design.
              </p>
              <p>
                My work spans full-cycle application development — from backend API design and microservices
                to type-safe frontend architectures — with a growing focus on AI/ML integrations and cloud-native deployment.
              </p>
              <p>
                I believe the best software is invisible: it just works, it's fast, and it gets out of the user's way.
                That philosophy drives everything I build.
              </p>
            </div>

            <div className="mt-6 md:mt-8 space-y-2.5 md:space-y-3">
              {[
                { degree: "B.Tech — Computer Science & Engineering", inst: "IITDM Kurnool · Expected 2027", detail: "CGPA: 8.2" },
                { degree: "Intermediate (Class XII)", inst: "Valley Oak Junior College, Hyderabad", detail: "98.8%" },
                { degree: "SSC (Class X)", inst: "Dr. KKR Gowtham High School, Hyderabad", detail: "CGPA: 10.0" },
              ].map((edu, i) => (
                <div key={i} className="p-3 md:p-4 border border-white/5 bg-white/[0.02] rounded-lg hover:border-violet-500/15 transition-all duration-300">
                  <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2 sm:gap-4">
                    <div className="min-w-0">
                      <div className="font-semibold text-white/80 text-xs sm:text-sm leading-snug">{edu.degree}</div>
                      <div className="text-white/35 text-[10px] sm:text-xs mt-1 font-mono leading-relaxed">{edu.inst}</div>
                    </div>
                    <div className="font-mono text-[10px] sm:text-xs shrink-0" style={{ color: "#a78bfa", opacity: 0.7 }}>{edu.detail}</div>
                  </div>
                </div>
              ))}
            </div>

            <div className="flex flex-wrap gap-3 sm:gap-6 mt-6 md:mt-8">
              <a href="https://linkedin.com/in/saathvik-kalepu-17041228b" target="_blank" rel="noreferrer"
                className="font-mono text-[10px] sm:text-xs tracking-widest uppercase text-white/25 hover:text-violet-400 transition-colors duration-300"
                data-hover="true" data-testid="about-linkedin">LinkedIn ↗</a>
              <a href="https://github.com/saathvik-codes" target="_blank" rel="noreferrer"
                className="font-mono text-[10px] sm:text-xs tracking-widest uppercase text-white/25 hover:text-violet-400 transition-colors duration-300"
                data-hover="true" data-testid="about-github">GitHub ↗</a>
              <a href="/Saathvik_Kalepu_Resume.pdf" download
                className="font-mono text-[10px] sm:text-xs tracking-widest uppercase text-white/25 hover:text-violet-400 transition-colors duration-300"
                data-hover="true" data-testid="about-resume">Resume ↓</a>
            </div>
          </div>

          {/* Right */}
          <div ref={rightRef} className="space-y-3 md:space-y-6">
            <div ref={statsRef} className="grid grid-cols-2 gap-2 md:gap-4" data-testid="stats-grid">
              {stats.map(({ num, label, suffix }) => (
                <div key={label}
                  className="min-w-0 p-2.5 sm:p-3 md:p-6 border border-white/5 bg-white/[0.02] rounded-md md:rounded-lg hover:border-violet-500/20 transition-all duration-300 group"
                  data-testid={`stat-${label.replace(/\s+/g, "-").toLowerCase()}`}
                >
                  <div className="font-serif text-lg min-[380px]:text-xl sm:text-3xl md:text-4xl leading-none text-white group-hover:text-violet-300 transition-colors duration-300"
                    style={{ fontFamily: "'Syne', sans-serif", fontWeight: 800 }}>
                    {num}<span className="text-violet-400">{suffix}</span>
                  </div>
                  <div className="font-mono text-[9px] min-[380px]:text-[10px] sm:text-xs text-white/25 mt-1.5 md:mt-2 tracking-wide leading-snug truncate">{label}</div>
                </div>
              ))}
            </div>

            <div className="p-3.5 md:p-6 border border-white/5 bg-white/[0.015] rounded-lg">
              <div className="font-mono text-[10px] sm:text-xs text-violet-400/50 tracking-widest uppercase mb-4 md:mb-5">Core Competencies</div>
              <div className="space-y-2.5 md:space-y-3">
                {[
                  "Object-Oriented Design & Patterns",
                  "Backend Engineering & REST APIs",
                  "Distributed Systems & Microservices",
                  "AI/ML & Behavioral Analytics",
                  "CI/CD & Cloud-Native Development",
                  "Unit Testing & Debugging",
                ].map((item) => (
                  <div key={item} className="flex items-start gap-2.5 sm:gap-3 text-white/35 text-[11px] sm:text-sm leading-relaxed hover:text-white/65 transition-colors duration-300 group">
                    <svg viewBox="0 0 8 8" width="8" height="8" fill="none" className="mt-1.5 shrink-0">
                      <circle cx="4" cy="4" r="3" stroke="#a78bfa" strokeWidth="1" strokeOpacity="0.5" className="group-hover:stroke-violet-400 transition-colors"/>
                    </svg>
                    {item}
                  </div>
                ))}
              </div>
            </div>

            <div className="p-3.5 md:p-5 rounded-lg border border-violet-500/15 bg-violet-500/5">
              <div className="font-mono text-[10px] sm:text-xs text-violet-400/50 tracking-widest uppercase mb-3">Quick Profile</div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-1.5 md:gap-y-2 text-sm">
                {[
                  ["Role", "Full Stack Dev"],
                  ["Status", "Student (2027)"],
                  ["Location", "Hyderabad, IN"],
                  ["Focus", "AI + Cloud"],
                ].map(([k, v]) => (
                  <div key={k} className="flex gap-2">
                    <span className="text-white/25 font-mono text-[10px] sm:text-xs">{k}:</span>
                    <span className="text-white/60 text-[10px] sm:text-xs">{v}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
