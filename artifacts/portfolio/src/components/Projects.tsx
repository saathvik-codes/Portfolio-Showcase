import { useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import ProjectVisualStage from "./ProjectVisualStage";
import { archiveProjects, flagshipProjects, visualBuilds } from "@/data/portfolioData";

export default function Projects() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [catalogTab, setCatalogTab] = useState<"archive" | "visuals">("archive");
  const [archiveFilter, setArchiveFilter] = useState<
    "All" | "Systems & Backend" | "AI / ML & Data" | "Full-Stack & Mobile"
  >("All");
  const reduceMotion = useReducedMotion();

  const activeProject = flagshipProjects[activeIndex] ?? flagshipProjects[0];

  const filteredArchive =
    archiveFilter === "All"
      ? archiveProjects
      : archiveProjects.filter((p) => p.category === archiveFilter);

  return (
    <section
      id="projects"
      className="relative py-20 md:py-28 px-5 sm:px-8 border-b border-[#e4e2dd]"
      data-testid="projects-section"
    >
      <div className="max-w-6xl mx-auto space-y-14">
        {/* Flagship Workbench Header */}
        <div className="space-y-6">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div>
              <div className="section-kicker mb-2">03 · Selected Engineering Work</div>
              <h2 className="text-3xl sm:text-4xl font-bold tracking-[-0.025em] text-[#141413]">
                Seven systems,{" "}
                <span className="font-serif-editorial italic font-normal text-[#57534e]">
                  verified interactively.
                </span>
              </h2>
            </div>
            <p className="text-sm text-[#57534e] max-w-md">
              Select a flagship build below to inspect its interactive topology, state guard, or framing breakdown.
            </p>
          </div>

          {/* Clean Flagship Selector Pills */}
          <div
            className="flex flex-wrap gap-2"
            role="tablist"
            aria-label="Flagship engineering projects"
          >
            {flagshipProjects.map((proj, idx) => {
              const selected = idx === activeIndex;
              return (
                <button
                  key={proj.slug}
                  type="button"
                  role="tab"
                  aria-selected={selected}
                  onClick={() => setActiveIndex(idx)}
                  data-testid={`project-tab-${proj.slug}`}
                  className={`px-3.5 py-2 rounded-full text-xs font-medium border transition-colors cursor-pointer ${
                    selected
                      ? "bg-[#141413] text-[#faf9f6] border-[#141413]"
                      : "bg-white text-[#57534e] border-[#dcd9d0] hover:border-[#141413] hover:text-[#141413]"
                  }`}
                >
                  <span className="font-mono text-[10px] mr-1.5 opacity-70">{proj.index}</span>
                  {proj.title}
                </button>
              );
            })}
          </div>

          {/* Single Spacious Active Workbench Card */}
          <AnimatePresence mode="wait">
            <motion.div
              key={activeProject.slug}
              initial={reduceMotion ? false : { opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={reduceMotion ? undefined : { opacity: 0, y: -6 }}
              transition={{ duration: 0.22 }}
              className="clean-card rounded-2xl p-5 sm:p-8 shadow-[0_1px_2px_rgba(20,20,19,0.04),0_16px_40px_-24px_rgba(20,20,19,0.09)]"
              data-testid="flagship-workbench"
            >
              <div className="grid lg:grid-cols-12 gap-8 items-center">
                {/* Left: Interactive Architecture Stage */}
                <div className="lg:col-span-6">
                  <ProjectVisualStage project={activeProject} />
                </div>

                {/* Right: Problem, Proof & Links */}
                <div className="lg:col-span-6 space-y-5">
                  <div className="flex items-center justify-between gap-4 font-mono text-[11px]">
                    <span className="font-medium" style={{ color: activeProject.accent }}>
                      {activeProject.index} · {activeProject.category}
                    </span>
                    <span className="text-[#78716c]">{activeProject.year}</span>
                  </div>

                  <div className="space-y-2.5">
                    <h3 className="text-2xl sm:text-3xl font-bold tracking-tight text-[#141413]">
                      {activeProject.title}
                    </h3>
                    <p className="font-serif-editorial italic text-xl leading-snug text-[#2563eb]">
                      &ldquo;{activeProject.question}&rdquo;
                    </p>
                  </div>

                  <div className="space-y-3 text-sm leading-relaxed">
                    <p className="text-[#141413]">{activeProject.answer}</p>
                    <p className="text-[#57534e]">{activeProject.architecture}</p>
                  </div>

                  <div className="px-3.5 py-2.5 rounded-xl bg-[#f3f1ec] border border-[#e4e2dd] font-mono text-xs text-[#141413]">
                    <span className="text-[#78716c] mr-2">Proof:</span>
                    <span style={{ color: activeProject.accent }} className="font-medium">
                      {activeProject.proofMetric}
                    </span>
                  </div>

                  <div className="flex flex-wrap gap-1.5">
                    {activeProject.tags.map((tag) => (
                      <span
                        key={tag}
                        className="font-mono text-[11px] px-2.5 py-1 rounded-full bg-white border border-[#dcd9d0] text-[#57534e]"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  <div className="flex flex-wrap items-center gap-4 pt-3 border-t border-[#eceae4] text-xs font-medium">
                    {activeProject.live && (
                      <a
                        href={activeProject.live}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center gap-1 px-3.5 py-1.5 rounded-full bg-[#141413] text-[#faf9f6] hover:bg-[#2563eb] transition-colors"
                      >
                        Live Product ↗
                      </a>
                    )}
                    {activeProject.docsUrl && (
                      <a
                        href={activeProject.docsUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="text-[#0369a1] hover:underline underline-offset-4"
                      >
                        API Docs ↗
                      </a>
                    )}
                    {activeProject.repo && (
                      <a
                        href={activeProject.repo}
                        target="_blank"
                        rel="noreferrer"
                        className="text-[#141413] hover:text-[#2563eb] hover:underline underline-offset-4"
                      >
                        Source on GitHub ↗
                      </a>
                    )}
                    {activeProject.companionRepo && (
                      <a
                        href={activeProject.companionRepo.url}
                        target="_blank"
                        rel="noreferrer"
                        className="text-[#047857] hover:underline underline-offset-4"
                      >
                        {activeProject.companionRepo.label} ↗
                      </a>
                    )}
                  </div>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Clean 2-Tab Secondary Catalog (Progressive Disclosure) */}
        <div className="space-y-8 pt-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#e4e2dd] pb-4">
            <div className="inline-flex p-1 rounded-full bg-[#f3f1ec] border border-[#e4e2dd] self-start" role="tablist">
              <button
                type="button"
                role="tab"
                aria-selected={catalogTab === "archive"}
                onClick={() => setCatalogTab("archive")}
                data-testid="catalog-tab-archive"
                className={`px-4 py-1.5 rounded-full text-xs font-medium transition-colors cursor-pointer ${
                  catalogTab === "archive"
                    ? "bg-white text-[#141413] shadow-xs"
                    : "text-[#57534e] hover:text-[#141413]"
                }`}
              >
                Engineering Archive ({archiveProjects.length})
              </button>
              <button
                type="button"
                role="tab"
                aria-selected={catalogTab === "visuals"}
                onClick={() => setCatalogTab("visuals")}
                data-testid="catalog-tab-visuals"
                className={`px-4 py-1.5 rounded-full text-xs font-medium transition-colors cursor-pointer ${
                  catalogTab === "visuals"
                    ? "bg-white text-[#141413] shadow-xs"
                    : "text-[#57534e] hover:text-[#141413]"
                }`}
              >
                Visuals Studio ({visualBuilds.length})
              </button>
            </div>

            {catalogTab === "archive" ? (
              <div className="flex flex-wrap gap-1.5">
                {(["All", "Systems & Backend", "AI / ML & Data", "Full-Stack & Mobile"] as const).map(
                  (cat) => (
                    <button
                      key={cat}
                      type="button"
                      onClick={() => setArchiveFilter(cat)}
                      data-testid={`archive-filter-${cat.toLowerCase().replace(/[^a-z0-9]+/g, "-")}`}
                      className={`px-3 py-1 rounded-full text-[11px] font-medium border transition-colors cursor-pointer ${
                        archiveFilter === cat
                          ? "bg-[#2563eb] text-white border-[#2563eb]"
                          : "bg-white text-[#57534e] border-[#dcd9d0] hover:border-[#141413]"
                      }`}
                    >
                      {cat}
                    </button>
                  ),
                )}
              </div>
            ) : (
              <div className="flex flex-wrap items-center gap-4 text-xs font-medium">
                <a
                  href="https://saathvik-visuals-portfolio.vercel.app"
                  target="_blank"
                  rel="noreferrer"
                  className="text-[#2563eb] hover:underline underline-offset-4"
                >
                  Visuals Casebook ↗
                </a>
                <a
                  href="https://github.com/saathvikvisuals"
                  target="_blank"
                  rel="noreferrer"
                  className="text-[#57534e] hover:text-[#141413] hover:underline underline-offset-4"
                >
                  github.com/saathvikvisuals ↗
                </a>
              </div>
            )}
          </div>

          {catalogTab === "archive" ? (
            <div className="grid md:grid-cols-2 gap-4" data-testid="archive-grid">
              {filteredArchive.map((item) => (
                <article
                  key={item.title}
                  className="clean-card rounded-xl p-5 flex flex-col justify-between gap-4 hover:border-[#c8c4ba] transition-colors"
                >
                  <div className="space-y-2">
                    <div className="flex items-center justify-between font-mono text-[10px] text-[#2563eb]">
                      <span>{item.category}</span>
                      {item.note && (
                        <span className="text-[#78716c] bg-[#f3f1ec] px-2 py-0.5 rounded-full">
                          {item.note}
                        </span>
                      )}
                    </div>
                    <h4 className="text-base font-bold text-[#141413]">{item.title}</h4>
                    <p className="text-xs sm:text-sm text-[#57534e] leading-relaxed">
                      {item.summary}
                    </p>
                  </div>

                  <div className="space-y-3 pt-1">
                    <div className="flex flex-wrap gap-1.5">
                      {item.stack.map((tech) => (
                        <span
                          key={tech}
                          className="font-mono text-[10px] px-2 py-0.5 rounded-full bg-[#f3f1ec] text-[#57534e]"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                    <div className="flex items-center gap-4 pt-2.5 border-t border-[#eceae4] text-xs font-medium">
                      {item.live && (
                        <a
                          href={item.live}
                          target="_blank"
                          rel="noreferrer"
                          className="text-[#2563eb] hover:underline underline-offset-4"
                        >
                          Live ↗
                        </a>
                      )}
                      {item.repo && (
                        <a
                          href={item.repo}
                          target="_blank"
                          rel="noreferrer"
                          className="text-[#57534e] hover:text-[#141413] hover:underline underline-offset-4"
                        >
                          GitHub ↗
                        </a>
                      )}
                    </div>
                  </div>
                </article>
              ))}
            </div>
          ) : (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4" data-testid="visuals-grid">
              {visualBuilds.map((vp) => (
                <article
                  key={vp.title}
                  className="clean-card rounded-xl p-5 flex flex-col justify-between min-h-[195px] hover:border-[#c8c4ba] transition-colors"
                >
                  <div className="space-y-2">
                    <div className="font-mono text-[10px] font-medium" style={{ color: vp.accent }}>
                      {vp.subtitle}
                    </div>
                    <h4 className="text-lg font-bold text-[#141413]">{vp.title}</h4>
                    <p className="text-xs sm:text-sm text-[#57534e] leading-relaxed">{vp.focus}</p>
                  </div>

                  <div className="mt-5 pt-3 border-t border-[#eceae4] flex items-center justify-between text-xs font-medium">
                    <a
                      href={vp.live}
                      target="_blank"
                      rel="noreferrer"
                      className="hover:underline underline-offset-4"
                      style={{ color: vp.accent }}
                    >
                      Visit Live ↗
                    </a>
                    <a
                      href={vp.repo}
                      target="_blank"
                      rel="noreferrer"
                      className="text-[#57534e] hover:text-[#141413] hover:underline underline-offset-4"
                    >
                      Source Repo ↗
                    </a>
                  </div>
                </article>
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
