import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import ProjectVisualStage from "./ProjectVisualStage";
import { archiveProjects, flagshipProjects, visualBuilds } from "@/data/portfolioData";

gsap.registerPlugin(ScrollTrigger);

export default function Projects() {
  const sectionRef = useRef<HTMLElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [archiveFilter, setArchiveFilter] = useState<
    "All" | "Systems & Backend" | "AI / ML & Data" | "Full-Stack & Mobile"
  >("All");

  const activeProject = flagshipProjects[activeIndex] ?? flagshipProjects[0];

  useEffect(() => {
    const ctx = gsap.context(() => {
      const caseCards = gsap.utils.toArray<HTMLElement>(".walkthrough-case-card");
      caseCards.forEach((card, idx) => {
        ScrollTrigger.create({
          trigger: card,
          start: "top 52%",
          end: "bottom 48%",
          onEnter: () => setActiveIndex(idx),
          onEnterBack: () => setActiveIndex(idx),
        });
      });

      gsap.fromTo(
        ".projects-header-reveal",
        { y: 24, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.7,
          ease: "power3.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 80%",
            toggleActions: "play none none reverse",
          },
        },
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const scrollToProject = (idx: number) => {
    setActiveIndex(idx);
    const el = document.getElementById(`case-${flagshipProjects[idx].slug}`);
    el?.scrollIntoView({ behavior: "smooth", block: "center" });
  };

  const filteredArchive =
    archiveFilter === "All"
      ? archiveProjects
      : archiveProjects.filter((p) => p.category === archiveFilter);

  return (
    <>
      {/* Flagship Walkthrough Case Reel */}
      <section
        ref={sectionRef}
        id="projects"
        className="relative py-20 md:py-32 px-5 sm:px-10 md:px-14"
        data-testid="projects-section"
      >
        <div className="max-w-7xl mx-auto space-y-12">
          <div className="projects-header-reveal flex flex-col lg:flex-row lg:items-end justify-between gap-6 border-b border-white/[0.1] pb-8">
            <div>
              <div className="section-index mb-3">03 — Selected Engineering Walkthrough</div>
              <h2 className="text-[clamp(2.2rem,5.2vw,4.4rem)] leading-[0.95] font-display font-bold text-[#f2ede4]">
                Seven problems,{" "}
                <span className="font-serif-editorial italic font-normal text-[#e8a85a]">
                  verified live.
                </span>
              </h2>
            </div>

            {/* Chapter index switcher */}
            <div className="flex flex-wrap gap-1.5">
              {flagshipProjects.map((proj, idx) => (
                <button
                  key={proj.slug}
                  type="button"
                  onClick={() => scrollToProject(idx)}
                  className={`px-3 py-1.5 rounded-full font-mono text-[10px] tracking-wider uppercase transition-all cursor-pointer border ${
                    activeIndex === idx
                      ? "bg-[#e8a85a] text-[#08080a] border-[#e8a85a] font-medium"
                      : "border-white/[0.12] text-white/50 hover:text-white hover:border-white/30"
                  }`}
                >
                  {proj.index} {proj.title}
                </button>
              ))}
            </div>
          </div>

          {/* Sticky Dual-Pane Cinema Walkthrough on desktop */}
          <div className="grid lg:grid-cols-12 gap-8 lg:gap-10 items-start">
            {/* Left sticky cinema viewport */}
            <div className="lg:col-span-6 lg:sticky lg:top-20 space-y-3.5">
              <ProjectVisualStage project={activeProject} />

              <div className="studio-plate rounded-2xl p-4 space-y-2.5">
                <div className="flex items-center justify-between font-mono text-[10px] uppercase tracking-[0.2em]">
                  <span style={{ color: activeProject.accent }}>
                    Case {activeProject.index} / {flagshipProjects.length} · {activeProject.category}
                  </span>
                  <span className="text-white/40">{activeProject.year}</span>
                </div>
                <p className="text-xs sm:text-sm text-white/80 leading-relaxed">
                  {activeProject.convoReply}
                </p>
                <div className="font-mono text-[11px] pt-2 border-t border-white/[0.08]" style={{ color: activeProject.accent }}>
                  Proof → {activeProject.proofMetric}
                </div>
              </div>
            </div>

            {/* Right scrolling case stack */}
            <div className="lg:col-span-6 space-y-6">
              {flagshipProjects.map((project, idx) => {
                const isActive = idx === activeIndex;
                return (
                  <article
                    id={`case-${project.slug}`}
                    key={project.slug}
                    onMouseEnter={() => setActiveIndex(idx)}
                    className={`walkthrough-case-card studio-plate rounded-2xl p-6 sm:p-7 transition-all duration-300 ${
                      isActive
                        ? "border-white/[0.28] shadow-[0_18px_50px_-24px_rgba(232,168,90,0.35)]"
                        : "opacity-80 hover:opacity-100"
                    }`}
                  >
                    <div className="flex items-center justify-between gap-4 mb-3">
                      <span className="font-mono text-[10px] uppercase tracking-[0.22em]" style={{ color: project.accent }}>
                        {project.index} · {project.category}
                      </span>
                      <button
                        type="button"
                        onClick={() => setActiveIndex(idx)}
                        className="font-mono text-[10px] uppercase tracking-widest text-white/45 hover:text-[#e8a85a] cursor-pointer"
                      >
                        {isActive ? "Active on Stage ●" : "Focus Stage →"}
                      </button>
                    </div>

                    <h3 className="font-display text-2xl sm:text-3xl font-bold text-[#f2ede4] mb-3">
                      {project.title}
                    </h3>

                    <p className="font-serif-editorial italic text-lg text-[#e8a85a]/90 mb-3 leading-snug">
                      {project.convoPrompt}
                    </p>

                    <p className="text-sm text-white/65 leading-relaxed mb-4">
                      {project.architecture}
                    </p>

                    <div className="flex flex-wrap gap-1.5 mb-5">
                      {project.tags.map((tag) => (
                        <span
                          key={tag}
                          className="font-mono text-[10px] px-2.5 py-1 rounded-full border border-white/[0.11] text-white/65 bg-white/[0.02]"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>

                    <div className="flex flex-wrap items-center gap-4 pt-3 border-t border-white/[0.08]">
                      {project.live && (
                        <a
                          href={project.live}
                          target="_blank"
                          rel="noreferrer"
                          className="font-mono text-[11px] uppercase tracking-[0.16em] text-[#e8a85a] hover:text-[#f2ede4] transition-colors"
                          data-hover="true"
                        >
                          Live Product ↗
                        </a>
                      )}
                      {project.docsUrl && (
                        <a
                          href={project.docsUrl}
                          target="_blank"
                          rel="noreferrer"
                          className="font-mono text-[11px] uppercase tracking-[0.16em] text-[#7dd3fc] hover:text-white transition-colors"
                          data-hover="true"
                        >
                          API Docs ↗
                        </a>
                      )}
                      {project.repo && (
                        <a
                          href={project.repo}
                          target="_blank"
                          rel="noreferrer"
                          className="font-mono text-[11px] uppercase tracking-[0.16em] text-white/65 hover:text-white transition-colors"
                          data-hover="true"
                        >
                          Source on GitHub ↗
                        </a>
                      )}
                      {project.secondaryRepo && (
                        <a
                          href={project.secondaryRepo.url}
                          target="_blank"
                          rel="noreferrer"
                          className="font-mono text-[11px] uppercase tracking-[0.16em] text-[#6ee7b7] hover:text-white transition-colors"
                          data-hover="true"
                        >
                          {project.secondaryRepo.label} ↗
                        </a>
                      )}
                    </div>
                  </article>
                );
              })}
            </div>
          </div>

          {/* Extended Engineering Repository Archive */}
          <div className="pt-12 border-t border-white/[0.1] space-y-8">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
              <div>
                <div className="section-index mb-2">Engineering Archive · saathvik-codes</div>
                <h3 className="font-display text-2xl sm:text-3xl font-bold text-[#f2ede4]">
                  More Systems, ML &amp; Mobile Builds
                </h3>
              </div>
              <div className="flex flex-wrap gap-2">
                {(["All", "Systems & Backend", "AI / ML & Data", "Full-Stack & Mobile"] as const).map(
                  (cat) => (
                    <button
                      key={cat}
                      type="button"
                      onClick={() => setArchiveFilter(cat)}
                      className={`px-3.5 py-1.5 rounded-full font-mono text-[10px] uppercase tracking-wider border transition-colors cursor-pointer ${
                        archiveFilter === cat
                          ? "border-[#9d8cff] bg-[#9d8cff]/15 text-[#f2ede4]"
                          : "border-white/[0.12] text-white/45 hover:text-white/80"
                      }`}
                    >
                      {cat}
                    </button>
                  ),
                )}
              </div>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
              {filteredArchive.map((item) => (
                <article
                  key={item.title}
                  className="studio-plate rounded-2xl p-5 flex flex-col justify-between gap-4 hover:border-white/[0.22] transition-colors"
                >
                  <div className="space-y-2.5">
                    <div className="flex items-center justify-between font-mono text-[10px] uppercase tracking-wider text-[#9d8cff]/85">
                      <span>{item.category}</span>
                      {item.note && <span className="text-[#e8a85a]">{item.note}</span>}
                    </div>
                    <h4 className="font-display text-lg font-bold text-[#f2ede4]">{item.title}</h4>
                    <p className="text-xs sm:text-sm text-white/60 leading-relaxed">{item.summary}</p>
                  </div>

                  <div className="space-y-3 pt-2">
                    <div className="flex flex-wrap gap-1.5">
                      {item.stack.map((tech) => (
                        <span
                          key={tech}
                          className="font-mono text-[10px] px-2 py-0.5 rounded-full border border-white/[0.09] text-white/55"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                    <div className="flex items-center gap-4 pt-2 border-t border-white/[0.07] font-mono text-[10px] uppercase tracking-widest">
                      {item.live && (
                        <a
                          href={item.live}
                          target="_blank"
                          rel="noreferrer"
                          className="text-[#e8a85a] hover:text-white transition-colors"
                        >
                          Live ↗
                        </a>
                      )}
                      {item.repo && (
                        <a
                          href={item.repo}
                          target="_blank"
                          rel="noreferrer"
                          className="text-white/60 hover:text-white transition-colors"
                        >
                          GitHub ↗
                        </a>
                      )}
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Saathvik Visuals UI/UX Studio — no nested anchor elements */}
      <section className="relative py-20 md:py-24 px-5 sm:px-10 md:px-14 border-t border-white/[0.08]">
        <div className="max-w-7xl mx-auto space-y-10">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div>
              <div className="section-index mb-3">Saathvik Visuals — Frontend Craft Studio</div>
              <h2 className="text-[clamp(2rem,5vw,3.8rem)] leading-[0.98] font-display font-bold text-[#f2ede4]">
                Interface &amp; Visual{" "}
                <span className="font-serif-editorial italic font-normal text-[#9d8cff]">
                  Monographs.
                </span>
              </h2>
            </div>
            <div className="flex flex-wrap items-center gap-4 font-mono text-xs uppercase tracking-widest">
              <a
                href="https://saathvik-visuals-portfolio.vercel.app"
                target="_blank"
                rel="noreferrer"
                className="text-[#e8a85a] hover:text-white transition-colors"
              >
                Visuals Casebook ↗
              </a>
              <a
                href="https://github.com/saathvikvisuals"
                target="_blank"
                rel="noreferrer"
                className="text-white/50 hover:text-white transition-colors"
              >
                github.com/saathvikvisuals ↗
              </a>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {visualBuilds.map((vp) => (
              <div
                key={vp.title}
                className="studio-plate rounded-2xl p-6 flex flex-col justify-between min-h-[210px] hover:-translate-y-1 transition-all duration-300"
                style={{ borderColor: `${vp.accent}2c` }}
              >
                <div className="space-y-2.5">
                  <div className="font-mono text-[10px] uppercase tracking-[0.22em]" style={{ color: vp.accent }}>
                    {vp.subtitle}
                  </div>
                  <h3 className="font-display text-2xl font-bold text-[#f2ede4]">{vp.title}</h3>
                  <p className="text-xs sm:text-sm text-white/60 leading-relaxed">{vp.focus}</p>
                </div>

                <div className="mt-6 pt-3 border-t border-white/[0.08] flex items-center justify-between font-mono text-[10px] uppercase tracking-widest">
                  <a
                    href={vp.live}
                    target="_blank"
                    rel="noreferrer"
                    className="hover:text-white transition-colors"
                    style={{ color: vp.accent }}
                    data-hover="true"
                  >
                    Visit Live ↗
                  </a>
                  <a
                    href={vp.repo}
                    target="_blank"
                    rel="noreferrer"
                    className="text-white/45 hover:text-white transition-colors"
                    data-hover="true"
                  >
                    Source Repo ↗
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
