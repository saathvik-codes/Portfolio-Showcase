import { motion, useReducedMotion } from "framer-motion";
import { BookOpen, ExternalLink, Filter, Github } from "lucide-react";
import { useState } from "react";
import { archiveProjects, flagshipProjects, numberWord, visualBuilds } from "@/data/portfolioData";
import Illustration from "./Illustration";
import { ChapterHead, IconLink, Mark, Reveal } from "./primitives";
import { TechList } from "./TechIcon";

const caption: Record<string, string> = {
  quorumdb: "pulling the plug, on purpose",
  aetherflow: "eight bytes at a time",
  onroad: "what the sticker price leaves out",
  switchboard: "77 ways to ask a bank something",
  querymind: "plain English in, safe SQL out",
  pulse: "who's quietly drifting away",
  "hybrid-llm-rbac": "who gets to see what",
};

const cats = ["All", "Systems & Backend", "AI / ML & Data", "Full-Stack & Mobile"] as const;

function Page({ i }: { i: number }) {
  const p = flagshipProjects[i];
  const reduce = useReducedMotion();
  const flip = i % 2 === 1;
  const tilt = flip ? 2.2 : -2.2;

  return (
    <article className={`grid items-center gap-10 lg:gap-16 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] ${flip ? "lg:[&>*:first-child]:order-2" : ""}`}>
      {/* Polaroid */}
      <motion.div
        initial={reduce ? false : { opacity: 0, y: -40, rotate: tilt * 4 }}
        whileInView={{ opacity: 1, y: 0, rotate: tilt }}
        viewport={{ once: true, margin: "-15% 0px" }}
        transition={{ type: "spring", stiffness: 70, damping: 14 }}
        whileHover={{ rotate: 0, scale: 1.02 }}
        className="relative mx-auto w-full max-w-sm bg-surface p-3 pb-12 border border-hairline shadow-[0_18px_36px_-22px_rgba(34,29,23,.45)]"
      >
        <span aria-hidden className="tape -top-3 left-1/2 -translate-x-1/2 rotate-[-4deg]" />
        <Illustration name={`proj-${p.slug}.jpg`} alt={`${p.title}: ${caption[p.slug] ?? p.category}`} ratio="4 / 5" parallax={false} />
        <p className="hand absolute inset-x-0 bottom-2 text-center text-2xl text-muted">{caption[p.slug] ?? p.category.toLowerCase()}</p>
      </motion.div>

      {/* Notes */}
      <Reveal>
        <div className="flex items-baseline gap-4">
          <span className="display text-6xl text-accent/80">{p.index}</span>
          <div>
            <h3 className="font-serif text-3xl sm:text-4xl text-ink">{p.title}</h3>
            <p className="font-mono text-[.72rem] uppercase tracking-wider text-faint">{p.category} · {p.year}</p>
          </div>
        </div>
        <p className="hand mt-6 text-[1.7rem] leading-tight text-accent">{p.question}</p>
        <p className="mt-4 text-ink/90 leading-relaxed">{p.answer}</p>
        <p className="mt-4 text-[.93rem] text-muted leading-relaxed">{p.architecture}</p>
        <div className="relative mt-6 inline-block max-w-md rotate-[-1deg] bg-[#f6e7b4] px-5 py-3 shadow-[2px_3px_0_rgba(34,29,23,.08)]">
          <span aria-hidden className="tape -top-3 left-6 w-14 rotate-[6deg]" />
          <p className="font-mono text-[.8rem] leading-relaxed text-ink/80">{p.proofMetric}</p>
        </div>
        <div className="mt-6"><TechList items={p.tags} /></div>
        <p className="mt-5 flex flex-wrap gap-x-6 gap-y-2 text-sm">
          {p.repo && <IconLink href={p.repo} icon={Github}>Source</IconLink>}
          {p.companionRepo && <IconLink href={p.companionRepo.url} icon={Github}>{p.companionRepo.label}</IconLink>}
          {p.live && <IconLink href={p.live} icon={ExternalLink}>Live demo</IconLink>}
          {p.docsUrl && <IconLink href={p.docsUrl} icon={BookOpen}>API docs</IconLink>}
        </p>
      </Reveal>
    </article>
  );
}

export default function Projects() {
  const [cat, setCat] = useState<(typeof cats)[number]>("All");
  const list = archiveProjects.filter((p) => cat === "All" || p.category === cat);

  return (
    <section id="projects" className="py-24 sm:py-32 border-t border-hairline bg-surface">
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <ChapterHead
          no="III"
          label="Projects"
          title={<>{numberWord(flagshipProjects.length)} projects, each one starting from a <Mark from="right">real question</Mark>.</>}
          lede="Pages from the build log: the question someone asked, what I made to answer it, and the number that proves it works."
        />

        <div className="mt-20 space-y-28 lg:space-y-36">
          {flagshipProjects.map((p, i) => <Page key={p.slug} i={i} />)}
        </div>

        {/* Index cards */}
        <div className="mt-32">
          <Reveal className="flex flex-wrap items-end justify-between gap-6">
            <h3 className="font-serif text-3xl text-ink">More from the drawer</h3>
            <div role="group" aria-label="Filter" className="flex flex-wrap items-center gap-2">
              <Filter size={15} aria-hidden className="text-faint" />
              {cats.map((c) => (
                <button key={c} onClick={() => setCat(c)} aria-pressed={cat === c}
                  className={`rounded-full border px-3 py-1 text-sm ${cat === c ? "border-ink bg-ink text-paper" : "border-hairline text-muted hover:border-ink hover:text-ink"}`}>
                  {c}
                </button>
              ))}
            </div>
          </Reveal>
          <motion.ul layout className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {list.map((p, k) => (
              <motion.li layout key={p.title}
                initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.35, delay: k * 0.03 }}
                className={`relative bg-paper border border-hairline p-5 pt-6 shadow-[3px_4px_0_rgba(34,29,23,.06)] ${k % 3 === 1 ? "rotate-[0.6deg]" : k % 3 === 2 ? "-rotate-[0.5deg]" : ""}`}
                style={{ backgroundImage: "repeating-linear-gradient(transparent 0 27px, rgba(47,107,102,.12) 27px 28px)" }}>
                <span aria-hidden className="absolute left-0 right-0 top-0 h-1 bg-accent/60" />
                <h4 className="font-medium text-ink">{p.title}</h4>
                <p className="mt-2 text-sm text-muted leading-[28px]">{p.summary}</p>
                <div className="mt-3"><TechList items={p.stack} /></div>
                <p className="mt-3 flex gap-5 text-sm">
                  {p.repo && <IconLink href={p.repo} icon={Github}>Source</IconLink>}
                  {p.live && <IconLink href={p.live} icon={ExternalLink}>Live</IconLink>}
                </p>
              </motion.li>
            ))}
          </motion.ul>
        </div>

        {/* Studio */}
        <div className="mt-28">
          <Reveal>
            <h3 className="font-serif text-3xl text-ink">Interface studio</h3>
            <p className="mt-3 max-w-2xl text-muted">Front-end work I do under the name Saathvik Visuals, mostly for small businesses and cultural projects.</p>
          </Reveal>
          <ul className="mt-8 flex flex-wrap gap-4">
            {visualBuilds.map((v, k) => (
              <motion.li key={v.title}
                initial={{ opacity: 0, scale: 0.9, rotate: 0 }} whileInView={{ opacity: 1, scale: 1, rotate: k % 2 ? 1.5 : -1.5 }}
                viewport={{ once: true }} transition={{ type: "spring", stiffness: 120, damping: 12, delay: k * 0.05 }}
                whileHover={{ rotate: 0, y: -4 }}
                className="w-full sm:w-[calc(50%-.5rem)] lg:w-[calc(33.333%-.7rem)] bg-surface border border-hairline p-5 shadow-[0_10px_24px_-18px_rgba(34,29,23,.5)]">
                <h4 className="font-serif text-xl text-ink">{v.title}</h4>
                <p className="hand text-xl text-accent">{v.subtitle}</p>
                <p className="mt-2 text-sm text-muted leading-relaxed">{v.focus}</p>
                <p className="mt-4 flex gap-5 text-sm">{v.live && <IconLink href={v.live} icon={ExternalLink}>Live</IconLink>}<IconLink href={v.repo} icon={Github}>Source</IconLink></p>
              </motion.li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
