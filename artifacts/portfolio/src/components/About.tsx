import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function About() {
  const sectionRef = useRef<HTMLElement>(null);
  const leftRef = useRef<HTMLDivElement>(null);
  const rightRef = useRef<HTMLDivElement>(null);
  const statsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Rolling title lines
      gsap.from(".about-clip-line", {
        yPercent: 110,
        duration: 1.1,
        ease: "power4.out",
        stagger: 0.08,
        scrollTrigger: { trigger: sectionRef.current, start: "top 82%" },
      });

      gsap.from(leftRef.current, {
        x: -40, opacity: 0, duration: 1.0, ease: "power3.out", delay: 0.1,
        scrollTrigger: { trigger: sectionRef.current, start: "top 78%" },
      });
      gsap.from(rightRef.current, {
        x: 40, opacity: 0, duration: 1.0, ease: "power3.out", delay: 0.15,
        scrollTrigger: { trigger: sectionRef.current, start: "top 78%" },
      });
      if (statsRef.current) {
        gsap.from(statsRef.current.children, {
          y: 40, opacity: 0, duration: 0.7, stagger: 0.1, ease: "power3.out",
          scrollTrigger: { trigger: statsRef.current, start: "top 88%" },
        });
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
      className="relative py-32 px-8 md:px-16 overflow-hidden"
      data-testid="about-section"
    >
      <div className="absolute left-0 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-violet-500/15 to-transparent" />

      <div className="max-w-7xl mx-auto">
        <div className="section-index mb-6">01 — About</div>

        <div className="grid md:grid-cols-2 gap-20 items-start">
          {/* Left */}
          <div ref={leftRef}>
            <h2
              className="font-serif text-[clamp(2.5rem,5vw,4.5rem)] leading-[1.05] text-white mb-8"
              style={{ fontFamily: "'Syne', sans-serif", fontWeight: 800 }}
              data-testid="about-heading"
            >
              <span className="clip-line-wrap"><span className="about-clip-line">Crafting software</span></span>
              <span className="clip-line-wrap"><span className="about-clip-line gradient-text">that matters.</span></span>
            </h2>

            <div className="flex items-center gap-5 mb-8 p-4 rounded-lg border border-white/5 bg-white/[0.02]">
              <div
                className="w-16 h-16 rounded-full shrink-0 flex items-center justify-center text-2xl border border-violet-500/30"
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

            <div className="space-y-5 text-white/45 text-base leading-relaxed">
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

            <div className="mt-8 space-y-3">
              {[
                { degree: "B.Tech — Computer Science & Engineering", inst: "IITDM Kurnool · Expected 2027", detail: "CGPA: 8.2" },
                { degree: "Intermediate (Class XII)", inst: "Valley Oak Junior College, Hyderabad", detail: "98.8%" },
                { degree: "SSC (Class X)", inst: "Dr. KKR Gowtham High School, Hyderabad", detail: "CGPA: 10.0" },
              ].map((edu, i) => (
                <div key={i} className="p-4 border border-white/5 bg-white/[0.02] rounded-lg hover:border-violet-500/15 transition-all duration-300">
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <div className="font-semibold text-white/80 text-sm">{edu.degree}</div>
                      <div className="text-white/35 text-xs mt-0.5 font-mono">{edu.inst}</div>
                    </div>
                    <div className="font-mono text-xs shrink-0" style={{ color: "#a78bfa", opacity: 0.7 }}>{edu.detail}</div>
                  </div>
                </div>
              ))}
            </div>

            <div className="flex gap-6 mt-8">
              <a href="https://linkedin.com/in/saathvik-kalepu-17041228b" target="_blank" rel="noreferrer"
                className="font-mono text-xs tracking-widest uppercase text-white/25 hover:text-violet-400 transition-colors duration-300"
                data-hover="true" data-testid="about-linkedin">LinkedIn ↗</a>
              <a href="https://github.com/saathvik-codes" target="_blank" rel="noreferrer"
                className="font-mono text-xs tracking-widest uppercase text-white/25 hover:text-violet-400 transition-colors duration-300"
                data-hover="true" data-testid="about-github">GitHub ↗</a>
              <a href="/Saathvik_Kalepu_Resume.pdf" download
                className="font-mono text-xs tracking-widest uppercase text-white/25 hover:text-violet-400 transition-colors duration-300"
                data-hover="true" data-testid="about-resume">Resume ↓</a>
            </div>
          </div>

          {/* Right */}
          <div ref={rightRef} className="space-y-6">
            <div ref={statsRef} className="grid grid-cols-2 gap-4" data-testid="stats-grid">
              {stats.map(({ num, label, suffix }) => (
                <div key={label}
                  className="p-6 border border-white/5 bg-white/[0.02] rounded-lg hover:border-violet-500/20 transition-all duration-300 group"
                  data-testid={`stat-${label.replace(/\s+/g, "-").toLowerCase()}`}
                >
                  <div className="font-serif text-4xl text-white group-hover:text-violet-300 transition-colors duration-300"
                    style={{ fontFamily: "'Syne', sans-serif", fontWeight: 800 }}>
                    {num}<span className="text-violet-400">{suffix}</span>
                  </div>
                  <div className="font-mono text-xs text-white/25 mt-2 tracking-wide">{label}</div>
                </div>
              ))}
            </div>

            <div className="p-6 border border-white/5 bg-white/[0.015] rounded-lg">
              <div className="font-mono text-xs text-violet-400/50 tracking-widest uppercase mb-5">Core Competencies</div>
              <div className="space-y-3">
                {[
                  "Object-Oriented Design & Patterns",
                  "Backend Engineering & REST APIs",
                  "Distributed Systems & Microservices",
                  "AI/ML & Behavioral Analytics",
                  "CI/CD & Cloud-Native Development",
                  "Unit Testing & Debugging",
                ].map((item) => (
                  <div key={item} className="flex items-center gap-3 text-white/35 text-sm hover:text-white/65 transition-colors duration-300 group">
                    <svg viewBox="0 0 8 8" width="8" height="8" fill="none">
                      <circle cx="4" cy="4" r="3" stroke="#a78bfa" strokeWidth="1" strokeOpacity="0.5" className="group-hover:stroke-violet-400 transition-colors"/>
                    </svg>
                    {item}
                  </div>
                ))}
              </div>
            </div>

            <div className="p-5 rounded-lg border border-violet-500/15 bg-violet-500/5">
              <div className="font-mono text-xs text-violet-400/50 tracking-widest uppercase mb-3">Quick Profile</div>
              <div className="grid grid-cols-2 gap-y-2 text-sm">
                {[
                  ["Role", "Full Stack Dev"],
                  ["Status", "Student (2027)"],
                  ["Location", "Hyderabad, IN"],
                  ["Focus", "AI + Cloud"],
                ].map(([k, v]) => (
                  <div key={k} className="flex gap-2">
                    <span className="text-white/25 font-mono text-xs">{k}:</span>
                    <span className="text-white/60 text-xs">{v}</span>
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
