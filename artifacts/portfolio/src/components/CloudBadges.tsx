import { motion } from "framer-motion";
import { Award, BadgeCheck } from "lucide-react";
import { cloudBadges, googleProfiles } from "@/data/portfolioData";
import { IconLink, Reveal } from "./primitives";

export default function CloudBadges() {
  return (
    <div className="mt-20">
      <Reveal className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="eyebrow mb-3">Google Cloud skill badges</p>
          <p className="max-w-xl text-muted">
            Hands-on labs graded inside real Google Cloud projects.
            Click a badge to verify it on Credly.
          </p>
        </div>
        <p className="flex flex-wrap gap-x-5 gap-y-2 text-sm">
          <IconLink href={googleProfiles.credly} icon={BadgeCheck}>All on Credly</IconLink>
          <IconLink href={googleProfiles.skills} icon={Award}>Google Skills profile</IconLink>
        </p>
      </Reveal>

      <ul className="mt-8 grid grid-cols-2 sm:grid-cols-4 gap-px border border-hairline bg-hairline">
        {cloudBadges.map((b, i) => (
          <motion.li
            key={b.id}
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-10% 0px" }}
            transition={{ duration: 0.5, delay: (i % 4) * 0.06 }}
            className="bg-surface"
          >
            <a
              href={`https://www.credly.com/badges/${b.id}`}
              target="_blank"
              rel="noreferrer noopener"
              className="group flex h-full flex-col items-center gap-3 p-5 text-center"
              aria-label={`${b.title}, verify on Credly`}
            >
              <img
                src={b.image}
                alt=""
                width={96}
                height={96}
                loading="lazy"
                className="h-20 w-20 sm:h-24 sm:w-24 object-contain transition-transform duration-300 group-hover:-translate-y-1 group-hover:rotate-[-3deg]"
              />
              <span className="text-[.85rem] leading-snug text-ink group-hover:text-accent">{b.title}</span>
              <span className="mt-auto inline-flex items-center gap-1 text-xs text-faint">
                <BadgeCheck size={12} aria-hidden /> {b.date}
              </span>
            </a>
          </motion.li>
        ))}
      </ul>
      <p className="mt-4 text-sm text-faint">
        Also three Google Cloud Arcade game badges, listed on the{" "}
        <a href={googleProfiles.skills} target="_blank" rel="noreferrer noopener" className="underline underline-offset-4 hover:text-accent">Google Skills profile</a>.
      </p>
    </div>
  );
}
