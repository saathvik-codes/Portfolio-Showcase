import { certifications, communityAndHackathons } from "@/data/portfolioData";
import CloudBadges from "./CloudBadges";
import Illustration from "./Illustration";
import { Award, BadgeCheck, CalendarDays, Trophy, Users } from "lucide-react";
import { ChapterHead, IconLink, Mark, Reveal } from "./primitives";

export default function Credentials() {
  return (
    <section id="credentials" className="py-24 sm:py-32 border-t border-hairline">
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <div className="grid lg:grid-cols-[minmax(0,6fr)_minmax(0,5fr)] gap-14 lg:gap-20 items-end">
          <ChapterHead
            no="IV"
            label="Credentials"
            title={<>Steady <Mark>study</Mark> alongside the shipping.</>}
            lede="Courses, certificates, cloud labs and community work. Everything here links to something you can check."
          />
          <Reveal>
            <Illustration name="credentials-study.jpg" alt="Saathvik studying algorithms with two classmates in a university reading room" caption="Study sessions at IIITDM Kurnool." ratio="16 / 10" />
          </Reveal>
        </div>

        <div className="mt-20">
          <div>
            <p className="eyebrow mb-6">Certifications</p>
            <ul className="grid md:grid-cols-2 gap-x-12">
              {certifications.map((c) => (
                <li key={c.title} className="grid grid-cols-[1fr_auto] gap-x-6 gap-y-1 border-t border-hairline py-5">
                  <div>
                    <p className="font-medium text-ink">{c.title}</p>
                    <p className="text-sm text-muted">{c.issuer}</p>
                    <p className="mt-1 text-sm text-faint">{c.detail}</p>
                  </div>
                  <div className="sm:text-right text-sm">
                    <p className="inline-flex items-center gap-1.5 font-mono text-[.76rem] text-faint"><CalendarDays size={13} aria-hidden />{c.date}</p>
                    {c.verifyUrl && <p className="mt-1"><IconLink href={c.verifyUrl} icon={BadgeCheck}>Verify</IconLink></p>}
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <CloudBadges />

        <Hackathons />
      </div>
    </section>
  );
}

type Event = (typeof communityAndHackathons)[number];

/** Hackathons and community: the best result as a certificate-style feature, the rest as ticket stubs. */
function Hackathons() {
  const items = communityAndHackathons as Event[];
  const featured = items.find((c) => c.highlight);
  const rest = items.filter((c) => c !== featured);
  const hackCount = items.filter((c) => c.kind === "hackathon").length;
  return (
    <div className="mt-24">
      <img
        src="/illustrations/pf-hackathon-stage.webp" alt="" width={560} height={320}
        className="mx-auto mb-6 h-auto w-full max-w-[420px]"
      />
      <Reveal>
        <div className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-2">
          <p className="eyebrow">Hackathons &amp; community</p>
          <p className="font-mono text-[.72rem] uppercase tracking-[.18em] text-faint">
            {hackCount} {hackCount === 1 ? "hackathon" : "hackathons"} · {items.length - hackCount} {items.length - hackCount === 1 ? "community" : "communities"}
          </p>
        </div>
      </Reveal>

      {featured && (
        <Reveal className="mt-6">
          <article className="group relative overflow-hidden rounded-[14px] bg-ink text-paper">
            <div aria-hidden className="ticket-grid pointer-events-none absolute inset-0 opacity-[.14]" />
            <div className="relative grid md:grid-cols-[minmax(0,1fr)_auto]">
              <div className="p-7 sm:p-10">
                <p className="inline-flex items-center gap-2 font-mono text-[.72rem] uppercase tracking-[.2em] text-accent-soft/80">
                  <Trophy size={14} aria-hidden /> {featured.org ?? "Hackathon"}{featured.date ? ` · ${featured.date}` : ""}
                </p>
                <h3 className="mt-4 font-serif text-[clamp(2.1rem,5vw,3.6rem)] leading-[1.02] tracking-tight">
                  {featured.event ?? featured.label}
                </h3>
                {featured.tagline && <p className="mt-2 font-mono text-sm uppercase tracking-[.3em] text-paper/55">{featured.tagline}</p>}
                <p className="mt-6 max-w-xl text-[.97rem] leading-relaxed text-paper/80">{featured.sub}</p>
                {featured.verifyUrl && (
                  <a href={featured.verifyUrl} target="_blank" rel="noreferrer noopener"
                     className="mt-7 inline-flex items-center gap-2 rounded-full border border-paper/30 px-4 py-2 text-sm text-paper transition-colors hover:border-accent hover:bg-accent">
                    <BadgeCheck size={15} aria-hidden /> View certificate
                  </a>
                )}
              </div>
              <div className="ticket-stub relative flex items-center justify-center border-t border-dashed border-paper/25 px-10 py-9 md:border-l md:border-t-0">
                <div className="stamp grid h-40 w-40 place-items-center rounded-full border-2 border-accent text-center transition-transform duration-500 group-hover:-rotate-3 group-hover:scale-[1.03]">
                  <div className="px-3">
                    <Award size={22} aria-hidden className="mx-auto text-accent" />
                    <p className="mt-2 font-serif text-[1.3rem] leading-[1.05] text-paper">{featured.result ?? "Finalist"}</p>
                  </div>
                </div>
              </div>
            </div>
          </article>
        </Reveal>
      )}

      <ul className="mt-6 grid gap-4 sm:grid-cols-2">
        {rest.map((c, i) => {
          const hack = c.kind === "hackathon";
          const Icon = hack ? Trophy : Users;
          return (
            <Reveal key={c.label} delay={i * 0.06}>
              <li className="h-full rounded-[14px] border border-hairline bg-surface p-6 transition-colors hover:border-accent/60">
                <div className="flex items-center justify-between gap-4">
                  <span className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 font-mono text-[.66rem] uppercase tracking-[.16em] ${hack ? "bg-accent-soft text-accent" : "bg-sand text-muted"}`}>
                    <Icon size={12} aria-hidden /> {hack ? "Hackathon" : "Community"}
                  </span>
                  {c.date && <span className="inline-flex items-center gap-1.5 font-mono text-[.72rem] text-faint"><CalendarDays size={12} aria-hidden />{c.date}</span>}
                </div>
                <p className="mt-4 font-medium leading-snug text-ink">{c.label}</p>
                {c.result && <p className="mt-1 text-sm font-medium text-accent">{c.result}</p>}
                <p className="mt-1.5 text-sm text-muted">{c.sub}</p>
                {c.verifyUrl && <p className="mt-3 text-sm"><IconLink href={c.verifyUrl} icon={BadgeCheck}>Verify</IconLink></p>}
              </li>
            </Reveal>
          );
        })}
      </ul>
    </div>
  );
}
