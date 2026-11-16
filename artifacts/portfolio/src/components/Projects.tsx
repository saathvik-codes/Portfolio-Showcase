import { useState } from "react";
import { archiveProjects, flagshipProjects, visualBuilds } from "@/data/portfolioData";
import { BookOpen, ExternalLink, Filter, Github } from "lucide-react";
import { ChapterHead, IconLink, Mark, Reveal } from "./primitives";
import { TechList } from "./TechIcon";
import ScrollStage, { type StageItem } from "./ScrollStage";

const caption: Record<string, string> = {
  quorumdb: "Killing a node under live write load.",
  aetherflow: "Checking frame headers and checksums byte by byte.",
  onroad: "Explaining where the on-road price actually comes from.",
  switchboard: "Walking a support lead through the edge cases.",
  querymind: "Letting a merchandiser ask questions in plain English.",
  pulse: "Finding which customers are quietly drifting away.",
  "hybrid-llm-rbac": "Reviewing access boundaries with a security architect.",
};

const stage: StageItem[] = flagshipProjects.map((p) => ({
  id: `p-${p.slug}`,
  image: `proj-${p.slug}.jpg`,
  alt: `${p.title}: ${caption[p.slug]}`,
  caption: caption[p.slug],
}));

const cats = ["All", "Systems & Backend", "AI / ML & Data", "Full-Stack & Mobile"] as const;

export default function Projects() {
  const [cat, setCat] = useState<(typeof cats)[number]>("All");
  const list = archiveProjects.filter((p) => cat === "All" || p.category === cat);

  return (
    <section id="projects" className="py-24 sm:py-32 border-t border-hairline bg-surface">
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <ChapterHead
          no="III"
          label="Projects"
          title={<>Seven projects, each one starting from a <Mark from="right">real question</Mark>.</>}
          lede="Every entry below is framed the way it began: who was asking, what they needed to be true, and what I built to prove it."
        />
        <div className="mt-16 lg:mt-24">
          <ScrollStage
            items={stage}
            render={(i) => {
              const p = flagshipProjects[i];
              return (
                <Reveal>
                  <p className="eyebrow mb-3">{p.index} · {p.category} · {p.year}</p>
                  <h3 className="font-serif text-3xl sm:text-4xl text-ink">{p.title}</h3>
                  <p className="mt-6 font-serif text-xl italic leading-snug text-muted">&ldquo;{p.question}&rdquo;</p>
                  <p className="mt-5 text-ink/90 leading-relaxed">{p.answer}</p>
                  <p className="mt-5 text-[.92rem] text-muted leading-relaxed">{p.architecture}</p>
                  <p className="mt-6 border-l-2 border-clay pl-4 font-mono text-[.8rem] leading-relaxed text-clay">{p.proofMetric}</p>
                  <div className="mt-5"><TechList items={p.tags} /></div>
                  <p className="mt-6 flex flex-wrap gap-x-6 gap-y-2 text-sm">
                    {p.repo && <IconLink href={p.repo} icon={Github}>Source</IconLink>}
                    {p.companionRepo && <IconLink href={p.companionRepo.url} icon={Github}>{p.companionRepo.label}</IconLink>}
                    {p.live && <IconLink href={p.live} icon={ExternalLink}>Live demo</IconLink>}
                    {p.docsUrl && <IconLink href={p.docsUrl} icon={BookOpen}>API docs</IconLink>}
                  </p>
                </Reveal>
              );
            }}
          />
        </div>

        <div className="mt-28">
          <Reveal className="flex flex-wrap items-end justify-between gap-6">
            <h3 className="font-serif text-3xl text-ink">More builds</h3>
            <div role="group" aria-label="Filter" className="flex flex-wrap items-center gap-2">
              <Filter size={15} aria-hidden className="text-faint" />
              {cats.map((c) => (
                <button
                  key={c}
                  onClick={() => setCat(c)}
                  aria-pressed={cat === c}
                  className={`rounded-sm border px-3 py-1.5 text-sm ${cat === c ? "border-ink bg-ink text-paper" : "border-hairline text-muted hover:border-ink hover:text-ink"}`}
                >
                  {c}
                </button>
              ))}
            </div>
          </Reveal>
          <ul className="mt-8 grid md:grid-cols-2 border-t border-hairline">
            {list.map((p) => (
              <li key={p.title} className="border-b border-hairline py-6 md:odd:pr-8 md:even:pl-8 md:even:border-l">
                <h4 className="font-medium text-ink">{p.title}</h4>
                <p className="mt-2 text-sm text-muted leading-relaxed">{p.summary}</p>
                <div className="mt-3"><TechList items={p.stack} /></div>
                <p className="mt-3 flex gap-5 text-sm">
                  {p.repo && <IconLink href={p.repo} icon={Github}>Source</IconLink>}
                  {p.live && <IconLink href={p.live} icon={ExternalLink}>Live</IconLink>}
                </p>
              </li>
            ))}
          </ul>
        </div>

        <div className="mt-24">
          <Reveal>
            <h3 className="font-serif text-3xl text-ink">Interface studio</h3>
            <p className="mt-3 max-w-2xl text-muted">Front-end casebooks I build under Saathvik Visuals: motion, typography and storytelling for small businesses and cultural projects.</p>
          </Reveal>
          <ul className="mt-8 grid sm:grid-cols-2 lg:grid-cols-3 gap-px bg-hairline border border-hairline">
            {visualBuilds.map((v) => (
              <li key={v.title} className="bg-surface p-6">
                <h4 className="font-serif text-xl text-ink">{v.title}</h4>
                <p className="text-sm text-accent">{v.subtitle}</p>
                <p className="mt-3 text-sm text-muted leading-relaxed">{v.focus}</p>
                <p className="mt-4 flex gap-5 text-sm">{v.live && <IconLink href={v.live} icon={ExternalLink}>Live</IconLink>}<IconLink href={v.repo} icon={Github}>Source</IconLink></p>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
