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
      gsap.from(leftRef.current, {
        x: -60,
        opacity: 0,
        duration: 1.2,
        ease: "power3.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 75%",
        },
      });

      gsap.from(rightRef.current, {
        x: 60,
        opacity: 0,
        duration: 1.2,
        ease: "power3.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 75%",
        },
      });

      if (statsRef.current) {
        gsap.from(statsRef.current.children, {
          y: 40,
          opacity: 0,
          duration: 0.8,
          stagger: 0.15,
          ease: "power3.out",
          scrollTrigger: {
            trigger: statsRef.current,
            start: "top 85%",
          },
        });
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const stats = [
    { num: "8.2", label: "CGPA at IITDM", suffix: "" },
    { num: "500", label: "LeetCode Problems", suffix: "+" },
    { num: "5", label: "Full-stack Projects", suffix: "+" },
    { num: "6", label: "Months Internship", suffix: "" },
  ];

  return (
    <section
      ref={sectionRef}
      id="about"
      className="relative py-32 px-8 md:px-16 overflow-hidden"
      data-testid="about-section"
    >
      {/* Vertical line decoration */}
      <div className="absolute left-0 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-violet-500/20 to-transparent" />

      <div className="max-w-7xl mx-auto">
        {/* Section index */}
        <div className="section-index mb-6">01 — About</div>

        <div className="grid md:grid-cols-2 gap-20 items-start">
          {/* Left */}
          <div ref={leftRef}>
            <h2
              className="font-serif text-[clamp(2.5rem,5vw,4.5rem)] font-800 leading-tight text-white mb-8"
              style={{ fontFamily: "'Syne', sans-serif", fontWeight: 800 }}
              data-testid="about-heading"
            >
              Crafting software<br />
              <span className="gradient-text">that matters.</span>
            </h2>

            <div className="space-y-5 text-white/50 text-base leading-relaxed">
              <p>
                I'm a Computer Science student at <span className="text-violet-400">IITDM Kurnool</span> with
                a strong foundation in software engineering, data structures, and scalable system design.
              </p>
              <p>
                My work spans full-cycle application development — from backend API design and microservices
                to type-safe frontend architectures — with a growing focus on AI/ML integrations and cloud-native
                deployment.
              </p>
              <p>
                I believe the best software is invisible: it just works, it's fast, and it gets out of the
                user's way. I bring that philosophy to every project I build.
              </p>
            </div>

            {/* Education highlight */}
            <div className="mt-10 p-5 border border-violet-500/15 bg-violet-500/5 rounded-sm">
              <div className="font-mono text-xs text-violet-400/60 tracking-widest uppercase mb-2">Education</div>
              <div className="font-semibold text-white text-sm">B.Tech — Computer Science & Engineering</div>
              <div className="text-white/40 text-sm mt-1">IITDM Kurnool · Expected 2027 · CGPA 8.2</div>
            </div>

            {/* Links */}
            <div className="flex gap-6 mt-8">
              <a
                href="https://linkedin.com/in/saathvik-kalepu-17041228b"
                target="_blank"
                rel="noreferrer"
                className="font-mono text-xs tracking-widest uppercase text-white/30 hover:text-violet-400 transition-colors duration-300 flex items-center gap-2"
                data-hover="true"
                data-testid="about-linkedin"
              >
                LinkedIn ↗
              </a>
              <a
                href="https://github.com/saathvik-codes"
                target="_blank"
                rel="noreferrer"
                className="font-mono text-xs tracking-widest uppercase text-white/30 hover:text-violet-400 transition-colors duration-300 flex items-center gap-2"
                data-hover="true"
                data-testid="about-github"
              >
                GitHub ↗
              </a>
            </div>
          </div>

          {/* Right */}
          <div ref={rightRef} className="space-y-8">
            {/* Stats grid */}
            <div
              ref={statsRef}
              className="grid grid-cols-2 gap-4"
              data-testid="stats-grid"
            >
              {stats.map(({ num, label, suffix }) => (
                <div
                  key={label}
                  className="p-6 border border-white/5 bg-white/[0.02] rounded-sm hover:border-violet-500/25 transition-all duration-300 group"
                  data-testid={`stat-${label.replace(/\s+/g, "-").toLowerCase()}`}
                >
                  <div className="font-serif text-4xl font-800 text-white group-hover:text-violet-300 transition-colors duration-300"
                    style={{ fontFamily: "'Syne', sans-serif", fontWeight: 800 }}>
                    {num}<span className="text-violet-400">{suffix}</span>
                  </div>
                  <div className="font-mono text-xs text-white/30 mt-2 tracking-wide">{label}</div>
                </div>
              ))}
            </div>

            {/* Competencies */}
            <div className="space-y-3">
              <div className="font-mono text-xs text-violet-400/60 tracking-widest uppercase mb-4">Core Areas</div>
              {[
                "Object-Oriented Design & Patterns",
                "Backend Engineering & REST APIs",
                "Distributed Systems & Microservices",
                "AI/ML & Behavioral Analytics",
                "CI/CD & Cloud-Native Development",
              ].map((item) => (
                <div
                  key={item}
                  className="flex items-center gap-3 text-white/40 text-sm hover:text-white/70 transition-colors duration-300 group"
                  data-testid={`competency-${item.slice(0, 10).replace(/\s+/g, "-").toLowerCase()}`}
                >
                  <div className="w-1 h-1 rounded-full bg-violet-500/50 group-hover:bg-violet-400 transition-colors duration-300" />
                  {item}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
