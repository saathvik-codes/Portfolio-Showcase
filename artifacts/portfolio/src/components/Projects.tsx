import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const projects = [
  {
    index: "01",
    title: "QueryMind",
    category: "AI · Data Systems",
    tagline: "Natural-language interface over 1M+ real retail transactions — NL to SQL, self-correcting, 12/12 query types validated.",
    tags: ["Python", "LangChain", "DuckDB", "FastAPI", "React"],
    href: "https://github.com/saathvik-codes",
    accent: "#8b5cf6",
  },
  {
    index: "02",
    title: "Switchboard",
    category: "ML Engineering",
    tagline: "Intent classifier trained on 13K+ real queries, 93% accuracy. LangChain agent raises tool-selection pass rate 67 → 83%.",
    tags: ["HuggingFace", "LangChain", "Ollama", "scikit-learn", "FastAPI"],
    href: "https://github.com/saathvik-codes",
    accent: "#c084fc",
  },
  {
    index: "03",
    title: "AutoVista AI",
    category: "ML · Prediction",
    tagline: "Gradient Boosting model cuts pricing error 46% vs naive baseline. Zero-downtime retraining pipeline — hot-swaps on new data.",
    tags: ["Python", "scikit-learn", "FastAPI", "MongoDB"],
    href: "https://github.com/saathvik-codes",
    accent: "#818cf8",
  },
  {
    index: "04",
    title: "Pulse",
    category: "Analytics · BI",
    tagline: "GBP 17.7M revenue across 36,969 orders — RFM segmentation, cohort retention, churn-risk scoring. Live on Vercel.",
    tags: ["Python", "pandas", "DuckDB", "Next.js", "Recharts"],
    href: "https://github.com/saathvik-codes",
    accent: "#e879f9",
  },
  {
    index: "05",
    title: "Road Hazard CV",
    category: "Computer Vision · Systems",
    tagline: "Fine-tuned YOLOv8 instance-segmentation served as REST API. Live React dashboard with detections under 30 seconds.",
    tags: ["YOLOv8", "Node.js", "React", "SQLite", "Python"],
    href: "https://github.com/saathvik-codes",
    accent: "#a78bfa",
  },
  {
    index: "06",
    title: "RAG Assistant",
    category: "LLM · Backend",
    tagline: "Hybrid semantic + keyword retrieval with hallucination-rejection. 16 unit tests + 11-case eval harness, 100% pass.",
    tags: ["Python", "LangChain", "FAISS", "FastAPI", "Docker"],
    href: "https://github.com/saathvik-codes",
    accent: "#7c3aed",
  },
];

const visualProjects = [
  {
    title: "Aryav",
    subtitle: "Cinematic luxury real estate",
    live: "https://aryav-cinematic-real-estate-api-ser.vercel.app",
    repo: "https://github.com/saathvikvisuals/aryav-cinematic-real-estate",
    accent: "#c084fc",
  },
  {
    title: "AARNA Salon",
    subtitle: "Luxury beauty editorial",
    live: "https://aarna-salon.vercel.app",
    repo: "https://github.com/saathvikvisuals/aarna-salon",
    accent: "#f0abfc",
  },
  {
    title: "Jaabili Tourism",
    subtitle: "Premium travel experience",
    live: "https://jaabili-tourism.vercel.app",
    repo: "https://github.com/saathvikvisuals/jaabili-tourism",
    accent: "#818cf8",
  },
];

export default function Projects() {
  const outerRef = useRef<HTMLElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const labelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const outer = outerRef.current;
    const track = trackRef.current;
    if (!outer || !track) return;

    const panels = track.querySelectorAll<HTMLElement>(".proj-panel");
    const totalWidth = track.scrollWidth - window.innerWidth;

    const ctx = gsap.context(() => {
      // Horizontal scroll pin
      const hTween = gsap.to(track, {
        x: () => -totalWidth,
        ease: "none",
        scrollTrigger: {
          trigger: outer,
          pin: true,
          scrub: 0.9,
          end: () => `+=${totalWidth}`,
          invalidateOnRefresh: true,
        },
      });

      // Per-panel content reveal
      panels.forEach((panel) => {
        const num = panel.querySelector(".proj-num");
        const cat = panel.querySelector(".proj-cat");
        const title = panel.querySelector(".proj-title");
        const line = panel.querySelector(".proj-line");
        const tagline = panel.querySelector(".proj-tagline");
        const tags = panel.querySelectorAll(".proj-tag");
        const cta = panel.querySelector(".proj-cta");

        gsap.set([num, cat, title, line, tagline, tags, cta], { opacity: 0, y: 24 });

        ScrollTrigger.create({
          trigger: panel,
          containerAnimation: hTween,
          start: "left 80%",
          end: "left 20%",
          toggleActions: "play none none reverse",
          onEnter: () => {
            gsap.timeline()
              .to(num, { opacity: 0.15, y: 0, duration: 0.4, ease: "power2.out" })
              .to(cat, { opacity: 1, y: 0, duration: 0.4, ease: "power2.out" }, "-=0.25")
              .to(title, { opacity: 1, y: 0, duration: 0.6, ease: "power3.out" }, "-=0.3")
              .to(line, { opacity: 1, y: 0, scaleX: 1, duration: 0.5, transformOrigin: "left", ease: "power3.out" }, "-=0.4")
              .to(tagline, { opacity: 1, y: 0, duration: 0.55, ease: "power2.out" }, "-=0.35")
              .to(tags, { opacity: 1, y: 0, duration: 0.4, stagger: 0.05, ease: "power2.out" }, "-=0.3")
              .to(cta, { opacity: 1, y: 0, duration: 0.4, ease: "power2.out" }, "-=0.2");
          },
          onLeaveBack: () => {
            gsap.to([num, cat, title, line, tagline, tags, cta], { opacity: 0, y: 24, duration: 0.3 });
          },
        });
      });

      // Progress label counter
      ScrollTrigger.create({
        trigger: outer,
        scrub: true,
        end: () => `+=${totalWidth}`,
        onUpdate: (self) => {
          const idx = Math.min(projects.length - 1, Math.floor(self.progress * projects.length));
          if (labelRef.current) labelRef.current.textContent = `${idx + 1} / ${projects.length}`;
        },
      });
    }, outer);

    return () => ctx.revert();
  }, []);

  return (
    <>
      {/* ---- Horizontal scroll ---- */}
      <section
        ref={outerRef}
        id="projects"
        className="relative overflow-hidden"
        style={{ height: "100vh" }}
        data-testid="projects-section"
      >
        {/* Progress counter */}
        <div className="absolute top-8 right-8 z-20 font-mono text-xs text-white/25 tracking-widest pointer-events-none">
          <div ref={labelRef}>1 / {projects.length}</div>
        </div>

        {/* Section label */}
        <div className="absolute top-8 left-8 z-20 flex items-center gap-3 pointer-events-none">
          <span className="section-index opacity-60">03 — Selected Work</span>
        </div>

        {/* Drag hint */}
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 z-20 flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.25em] text-white/20 pointer-events-none">
          <svg width="18" height="8" viewBox="0 0 18 8" fill="none" className="opacity-50">
            <path d="M1 4H17M13 1L17 4L13 7" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
          </svg>
          Scroll to explore
        </div>

        {/* Track */}
        <div
          ref={trackRef}
          className="flex items-center h-full will-change-transform"
          style={{ width: `${projects.length * 100}vw` }}
        >
          {projects.map((p, i) => (
            <div
              key={p.index}
              className="proj-panel relative flex flex-col justify-center px-10 sm:px-16 md:px-24 shrink-0"
              style={{ width: "100vw", height: "100vh" }}
            >
              {/* Ambient glow */}
              <div
                className="absolute inset-0 pointer-events-none"
                style={{
                  background: `radial-gradient(ellipse 55% 60% at ${i % 2 === 0 ? "30%" : "70%"} 50%, ${p.accent}10 0%, transparent 65%)`,
                }}
              />

              <div className="relative z-10 max-w-3xl">
                <div className="proj-num font-mono text-[clamp(5rem,18vw,14rem)] font-black leading-none text-white select-none pointer-events-none absolute -top-4 -left-2 opacity-0"
                  style={{ fontFamily: "'Syne', sans-serif", WebkitTextStroke: `1px ${p.accent}25`, color: "transparent" }}>
                  {p.index}
                </div>

                <div className="proj-cat font-mono text-[10px] sm:text-xs uppercase tracking-[0.28em] mb-5 opacity-0" style={{ color: p.accent }}>
                  {p.category}
                </div>

                <h2
                  className="proj-title text-[clamp(3rem,8vw,7rem)] leading-[0.92] font-black text-white mb-6 opacity-0"
                  style={{ fontFamily: "'Syne', sans-serif" }}
                >
                  {p.title}
                </h2>

                <div className="proj-line h-px w-16 mb-6 opacity-0" style={{ background: p.accent }} />

                <p className="proj-tagline text-white/55 text-base sm:text-lg leading-relaxed max-w-xl mb-8 opacity-0">
                  {p.tagline}
                </p>

                <div className="flex flex-wrap gap-2 mb-10">
                  {p.tags.map((tag) => (
                    <span
                      key={tag}
                      className="proj-tag font-mono text-[10px] sm:text-xs px-3 py-1.5 rounded-full border opacity-0"
                      style={{ borderColor: `${p.accent}35`, color: `${p.accent}cc`, background: `${p.accent}0d` }}
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                <a
                  href={p.href}
                  target="_blank"
                  rel="noreferrer"
                  className="proj-cta group inline-flex items-center gap-3 font-mono text-xs uppercase tracking-[0.22em] text-white/60 hover:text-white transition-colors duration-300 opacity-0"
                  data-hover="true"
                >
                  View on GitHub
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" className="transition-transform duration-300 group-hover:translate-x-1">
                    <path d="M3 8H13M9 4L13 8L9 12" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" />
                  </svg>
                </a>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ---- Visual / UI builds ---- */}
      <section className="relative py-20 md:py-28 px-8 md:px-16 overflow-hidden">
        <div
          className="absolute inset-0 pointer-events-none"
          style={{ background: "radial-gradient(ellipse 55% 40% at 50% 0%, rgba(139,92,246,0.05) 0%, transparent 65%)" }}
        />

        <div className="max-w-7xl mx-auto relative z-10">
          <div className="section-index mb-6 opacity-60">Saathvik Visuals — UI/UX Studio</div>

          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-12">
            <h2
              className="text-[clamp(2rem,6vw,4.5rem)] leading-[1.0] font-black text-white"
              style={{ fontFamily: "'Syne', sans-serif" }}
            >
              Design<br />
              <span className="bg-gradient-to-r from-violet-400 to-fuchsia-400 bg-clip-text text-transparent">
                Builds.
              </span>
            </h2>
            <a
              href="https://github.com/saathvikvisuals"
              target="_blank"
              rel="noreferrer"
              className="font-mono text-xs uppercase tracking-widest text-white/28 hover:text-violet-300 transition-colors"
              data-hover="true"
            >
              github.com/saathvikvisuals ↗
            </a>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {visualProjects.map((vp, i) => (
              <a
                key={i}
                href={vp.live}
                target="_blank"
                rel="noreferrer"
                className="group relative border rounded-2xl overflow-hidden transition-all duration-500 hover:-translate-y-2"
                style={{
                  borderColor: `${vp.accent}20`,
                  background: `linear-gradient(160deg, ${vp.accent}08 0%, transparent 50%)`,
                  minHeight: 200,
                }}
                data-hover="true"
              >
                <div className="p-6 sm:p-8 flex flex-col justify-between h-full min-h-[200px]">
                  <div>
                    <div className="font-mono text-[10px] uppercase tracking-[0.25em] mb-4 opacity-60" style={{ color: vp.accent }}>
                      Live UI/UX Build
                    </div>
                    <h3
                      className="text-2xl sm:text-3xl font-black text-white mb-2 group-hover:text-opacity-90"
                      style={{ fontFamily: "'Syne', sans-serif" }}
                    >
                      {vp.title}
                    </h3>
                    <p className="font-mono text-xs text-white/30">{vp.subtitle}</p>
                  </div>
                  <div className="mt-8 flex items-center justify-between">
                    <span className="font-mono text-[10px] uppercase tracking-widest transition-colors duration-300" style={{ color: vp.accent }}>
                      View Live ↗
                    </span>
                    <a
                      href={vp.repo}
                      target="_blank"
                      rel="noreferrer"
                      onClick={(e) => e.stopPropagation()}
                      className="font-mono text-[10px] uppercase tracking-widest text-white/20 hover:text-white/60 transition-colors"
                      data-hover="true"
                    >
                      Repo
                    </a>
                  </div>
                </div>
                <div
                  className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                  style={{ background: `radial-gradient(circle at 30% 40%, ${vp.accent}14, transparent 65%)` }}
                />
              </a>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
