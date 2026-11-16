import { ArrowUpRight, Building2, CalendarDays, MapPin } from "lucide-react";
import { experiences } from "@/data/portfolioData";
import { ChapterHead, IconLink, Reveal } from "./primitives";
import ScrollStage, { type StageItem } from "./ScrollStage";
import { TechList } from "./TechIcon";

const items: StageItem[] = [
  { id: "xp-darwix", image: "experience-darwix.jpg", alt: "Saathvik with a hiring operations lead reviewing voice screening flows", caption: "Darwix AI: voice and video hiring systems." },
  { id: "xp-caterworld", image: "experience-caterworld.jpg", alt: "Saathvik pairing with a teammate on a release pipeline", caption: "Caterworld.ai: release automation and an offline-first PWA." },
  { id: "xp-aimaster", image: "experience-aimaster.jpg", alt: "Saathvik reviewing API endpoints with a product lead", caption: "AIMaster.live: backend APIs and SQL tuning." },
];

export default function Experience() {
  return (
    <section id="experience" className="py-24 sm:py-32 border-t border-hairline bg-surface">
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <ChapterHead no="II" label="Experience" title={<>Three internships, each with something real in production.</>} />
        <div className="mt-16 lg:mt-24">
          <ScrollStage
            items={items}
            render={(i) => {
              const x = experiences[i];
              return (
                <Reveal>
                  <p className="flex flex-wrap items-center gap-x-4 gap-y-1 text-sm text-faint">
                    <span className="inline-flex items-center gap-1.5"><CalendarDays size={14} aria-hidden />{x.period}</span>
                    <span className="inline-flex items-center gap-1.5"><MapPin size={14} aria-hidden />{x.location}</span>
                  </p>
                  <h3 className="mt-3 font-serif text-3xl sm:text-4xl leading-tight text-ink">{x.role}</h3>
                  <p className="mt-1 inline-flex items-center gap-1.5 text-lg text-accent">
                    <Building2 size={17} aria-hidden />
                    {x.companyUrl ? <IconLink href={x.companyUrl} icon={ArrowUpRight} className="!text-accent">{x.company}</IconLink> : x.company}
                  </p>
                  <p className="mt-6 text-muted leading-relaxed">{x.summary}</p>
                  <ul className="mt-6 space-y-3 text-[.95rem] text-ink/85 leading-relaxed">
                    {x.highlights.map((h) => (
                      <li key={h} className="flex gap-3"><span aria-hidden className="mt-[.7em] h-px w-4 shrink-0 bg-clay" />{h}</li>
                    ))}
                  </ul>
                  <div className="mt-6"><TechList items={x.tags} /></div>
                </Reveal>
              );
            }}
          />
        </div>
      </div>
    </section>
  );
}
