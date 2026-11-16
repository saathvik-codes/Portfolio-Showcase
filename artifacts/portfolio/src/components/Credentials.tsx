import { achievements, certifications, communityAndHackathons } from "@/data/portfolioData";
import CloudBadges from "./CloudBadges";
import Illustration from "./Illustration";
import { BadgeCheck, CalendarDays, Trophy, Users } from "lucide-react";
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

        <div className="mt-20 grid lg:grid-cols-[minmax(0,4fr)_minmax(0,7fr)] gap-14 lg:gap-20">
          <div>
            <p className="eyebrow mb-6">Recent</p>
            <ol className="border-l border-hairline">
              {achievements.map((a) => (
                <li key={a.title} className="relative pl-7 pb-8 last:pb-0">
                  <span aria-hidden className="absolute -left-[12px] top-0 grid h-6 w-6 place-items-center rounded-full border border-hairline bg-surface text-accent"><Trophy size={12} /></span>
                  <p className="font-mono text-[.74rem] text-faint">{a.year}</p>
                  <p className="font-medium text-ink">{a.title}</p>
                  <p className="text-sm text-muted leading-relaxed">{a.body}</p>
                </li>
              ))}
            </ol>
          </div>
          <div>
            <p className="eyebrow mb-6">Certifications</p>
            <ul>
              {certifications.map((c) => (
                <li key={c.title} className="grid sm:grid-cols-[1fr_auto] gap-x-8 gap-y-1 border-t border-hairline py-5 last:border-b">
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

        <Reveal className="mt-20">
          <p className="eyebrow mb-6">Community &amp; hackathons</p>
          <ul className="grid md:grid-cols-2 gap-x-14">
            {communityAndHackathons.map((c) => (
              <li key={c.label} className="border-t border-hairline py-5">
                <p className="inline-flex items-start gap-2 font-medium text-ink"><Users size={16} aria-hidden className="mt-1 shrink-0 text-accent" />{c.label}</p>
                <p className="mt-1 text-sm text-muted">{c.sub}</p>
              </li>
            ))}
          </ul>
        </Reveal>
      </div>
    </section>
  );
}
