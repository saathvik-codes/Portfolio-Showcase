import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import RollingTitle from "./RollingTitle";

gsap.registerPlugin(ScrollTrigger);

const softwareProjects = [
  {
    title: "Serenity",
    eyebrow: "Featured full-stack build",
    subtitle: "AI Mental Wellness Platform",
    description:
      "A mental wellness platform with engagement flows, journal-style interactions, AI-assisted support, and a calm product surface.",
    tags: ["TypeScript", "React", "Flask", "NLP", "Firebase"],
    href: "https://github.com/saathvik-codes/Serenity-Mental-Wellness-Platform",
    image: "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=1400&q=80",
    color: "#a78bfa",
  },
  {
    title: "TaskVise",
    eyebrow: "Team workflow system",
    subtitle: "Company Task Management",
    description:
      "A typed task management experience for assigning, tracking, and organizing team work across departments.",
    tags: ["React", "Node.js", "Express", "MongoDB"],
    href: "https://github.com/saathvik-codes/Taskvise-flask",
    image: "https://images.unsplash.com/photo-1556761175-b413da4baf72?auto=format&fit=crop&w=1200&q=80",
    color: "#c084fc",
  },
  {
    title: "CogniShield",
    eyebrow: "AI security prototype",
    subtitle: "Explainable Behavioral Security",
    description:
      "Detects anomalous user activity with behavioral biometrics and explains decisions with human-readable model outputs.",
    tags: ["Python", "ML", "SHAP/XAI", "Security"],
    href: "https://github.com/saathvik-codes/Explainable-Behavioral-Security-Platform",
    image: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=1200&q=80",
    color: "#e879f9",
  },
];

const designProjects = [
  {
    title: "Aryav",
    subtitle: "Cinematic luxury real estate",
    description:
      "Immersive 3D architecture, cinematic storytelling, GSAP motion, responsive pages, and premium ARYAV branding.",
    tags: ["Real Estate", "3D", "GSAP", "Brand Site"],
    repo: "https://github.com/saathvikvisuals/aryav-cinematic-real-estate",
    live: "https://aryav-cinematic-real-estate-api-ser.vercel.app",
    image: "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&w=1300&q=80",
    color: "#c084fc",
  },
  {
    title: "AARNA Salon",
    subtitle: "Luxury salon and beauty ritual",
    description:
      "A polished beauty website with services, packages, artist profiles, gallery editorials, and a booking-oriented flow.",
    tags: ["Beauty", "Luxury UI", "Booking", "Editorial"],
    repo: "https://github.com/saathvikvisuals/aarna-salon",
    live: "https://aarna-salon.vercel.app",
    image: "https://images.unsplash.com/photo-1560066984-138dadb4c035?auto=format&fit=crop&w=1300&q=80",
    color: "#f0abfc",
  },
  {
    title: "Jaabili Tourism",
    subtitle: "Premium travel experiences",
    description:
      "A travel experience site built with React, Vite, Tailwind, Framer Motion, GSAP, and atmospheric visual composition.",
    tags: ["Travel", "Motion", "Three.js", "Experience"],
    repo: "https://github.com/saathvikvisuals/jaabili-tourism",
    live: "https://jaabili-tourism.vercel.app",
    image: "https://images.unsplash.com/photo-1500534314209-a25ddb2bd429?auto=format&fit=crop&w=1300&q=80",
    color: "#818cf8",
  },
];

export default function Projects() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".work-card",
        { y: 24, opacity: 0, scale: 0.985 },
        {
          y: 0,
          opacity: 1,
          scale: 1,
          duration: 0.55,
          ease: "power2.out",
          stagger: 0.06,
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 82%",
            end: "bottom 12%",
            toggleActions: "play reverse play reverse",
          },
        },
      );
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="projects"
      className="relative py-20 md:py-32 px-4 sm:px-8 md:px-16 overflow-hidden"
      data-testid="projects-section"
    >
      <div
        className="absolute inset-0 pointer-events-none"
        style={{ background: "radial-gradient(ellipse 70% 38% at 50% 18%, rgba(139,92,246,0.05) 0%, transparent 72%)" }}
      />

      <div className="relative z-10 max-w-7xl mx-auto">
        <div className="section-index mb-6">03 - Selected Work</div>

        <div className="mb-10 md:mb-14 flex flex-col gap-5 md:flex-row md:items-end md:justify-between">
          <RollingTitle
            lines={[
              { text: "Selected" },
              { text: "Work.", gradient: true },
            ]}
            className="font-serif text-[clamp(1.75rem,8.4vw,2.15rem)] md:text-[clamp(2.2rem,5vw,4.75rem)] leading-[1.06] md:leading-[1.02] text-white"
          />
          <p className="max-w-sm text-xs sm:text-sm leading-relaxed text-white/38">
            A curated mix of engineering builds and visual UI/UX projects, shaped as case-study cards instead of a dense repository list.
          </p>
        </div>

        <div className="grid gap-4 lg:grid-cols-[1.08fr_0.92fr]">
          <a
            href={softwareProjects[0].href}
            target="_blank"
            rel="noreferrer"
            className="work-card group relative min-h-[390px] overflow-hidden rounded-xl border border-violet-400/20 bg-[#101014] p-4 sm:p-6 md:p-8 transition-all duration-300 hover:-translate-y-1 hover:border-violet-300/45"
            data-hover="true"
          >
            <img src={softwareProjects[0].image} alt="" className="absolute inset-0 h-full w-full object-cover opacity-30 grayscale transition duration-700 group-hover:scale-105 group-hover:opacity-45 group-hover:grayscale-0" loading="lazy" />
            <div className="absolute inset-0 bg-gradient-to-br from-black/86 via-[#101014]/70 to-violet-950/40" />
            <div className="relative z-10 flex h-full flex-col justify-between gap-12">
              <div>
                <div className="font-mono text-[10px] sm:text-xs uppercase tracking-[0.22em] text-violet-200/65">{softwareProjects[0].eyebrow}</div>
                <h3 className="mt-4 text-3xl sm:text-5xl md:text-6xl leading-none text-white" style={{ fontFamily: "'Syne', sans-serif", fontWeight: 800 }}>
                  {softwareProjects[0].title}
                </h3>
                <p className="mt-3 font-mono text-xs sm:text-sm text-violet-100/58">{softwareProjects[0].subtitle}</p>
              </div>
              <div>
                <p className="max-w-2xl text-sm sm:text-base leading-relaxed text-white/58">{softwareProjects[0].description}</p>
                <div className="mt-6 flex flex-wrap gap-2">
                  {softwareProjects[0].tags.map((tag) => (
                    <span key={tag} className="rounded-full border border-violet-300/15 bg-violet-300/[0.06] px-2.5 py-1 font-mono text-[10px] sm:text-xs text-violet-100/60">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </a>

          <div className="grid gap-4">
            {softwareProjects.slice(1).map((project) => (
              <a
                key={project.title}
                href={project.href}
                target="_blank"
                rel="noreferrer"
                className="work-card group relative min-h-[235px] overflow-hidden rounded-xl border border-white/[0.07] bg-white/[0.015] p-4 sm:p-5 transition-all duration-300 hover:-translate-y-1"
                data-hover="true"
              >
                <img src={project.image} alt="" className="absolute inset-0 h-full w-full object-cover opacity-18 grayscale transition duration-500 group-hover:scale-105 group-hover:opacity-34 group-hover:grayscale-0" loading="lazy" />
                <div className="absolute inset-0 bg-gradient-to-br from-black/88 via-[#101010]/76 to-black/55" />
                <div className="relative z-10 flex h-full flex-col justify-between gap-6">
                  <div>
                    <div className="font-mono text-[10px] uppercase tracking-[0.2em]" style={{ color: project.color }}>{project.eyebrow}</div>
                    <h3 className="mt-3 text-xl sm:text-2xl text-white" style={{ fontFamily: "'Syne', sans-serif", fontWeight: 800 }}>{project.title}</h3>
                    <p className="mt-1 font-mono text-xs text-white/32">{project.subtitle}</p>
                  </div>
                  <p className="text-xs sm:text-sm leading-relaxed text-white/45">{project.description}</p>
                </div>
              </a>
            ))}
          </div>
        </div>

        <div className="work-card mt-4 flex justify-center">
          <a
            href="https://github.com/saathvik-codes"
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 rounded-full border border-white/[0.08] bg-white/[0.018] px-3.5 py-2 font-mono text-[10px] uppercase tracking-widest text-white/38 transition-all duration-300 hover:border-violet-500/35 hover:bg-violet-500/[0.06] hover:text-violet-200"
            data-hover="true"
          >
            <svg viewBox="0 0 24 24" width="13" height="13" fill="currentColor" aria-hidden="true">
              <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0 1 12 6.844a9.59 9.59 0 0 1 2.504.337c1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0 0 22 12.017C22 6.484 17.522 2 12 2z"/>
            </svg>
            View more on GitHub
            <span aria-hidden="true">-&gt;</span>
          </a>
        </div>

        <div className="mt-10 md:mt-14">
          <div className="mb-5 flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <div className="font-mono text-[10px] sm:text-xs uppercase tracking-[0.22em] text-violet-400/55">UI/UX Studio</div>
              <h3 className="mt-2 text-2xl sm:text-3xl md:text-4xl text-white" style={{ fontFamily: "'Syne', sans-serif", fontWeight: 800 }}>
                Saathvik Visuals
              </h3>
            </div>
            <a href="https://github.com/saathvikvisuals" target="_blank" rel="noreferrer" className="font-mono text-[10px] sm:text-xs uppercase tracking-widest text-white/28 transition-colors hover:text-violet-300">
              github.com/saathvikvisuals
            </a>
          </div>

          <div className="grid gap-4 md:grid-cols-3">
            {designProjects.map((project) => (
              <article
                key={project.title}
                className="work-card group overflow-hidden rounded-xl border border-white/[0.07] bg-white/[0.018] transition-all duration-300 hover:-translate-y-1"
              >
                <a href={project.live} target="_blank" rel="noreferrer" className="block" data-hover="true">
                  <div className="relative aspect-[1.12] overflow-hidden">
                    <img src={project.image} alt={`${project.title} visual direction`} className="h-full w-full object-cover opacity-72 grayscale transition duration-700 group-hover:scale-105 group-hover:opacity-95 group-hover:grayscale-0" loading="lazy" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black via-black/34 to-transparent" />
                    <div className="absolute bottom-4 left-4 right-4">
                      <div className="font-mono text-[10px] uppercase tracking-[0.2em]" style={{ color: project.color }}>Live UI/UX build</div>
                      <h4 className="mt-2 text-xl text-white" style={{ fontFamily: "'Syne', sans-serif", fontWeight: 800 }}>{project.title}</h4>
                    </div>
                  </div>
                </a>
                <div className="p-4">
                  <p className="font-mono text-xs text-white/35">{project.subtitle}</p>
                  <p className="mt-3 text-xs sm:text-sm leading-relaxed text-white/45">{project.description}</p>
                  <div className="mt-4 flex flex-wrap gap-1.5">
                    {project.tags.map((tag) => (
                      <span key={tag} className="rounded-full border border-white/[0.06] px-2 py-1 font-mono text-[10px] text-white/34">
                        {tag}
                      </span>
                    ))}
                  </div>
                  <div className="mt-5 flex items-center justify-between border-t border-white/[0.06] pt-4">
                    <a href={project.live} target="_blank" rel="noreferrer" className="font-mono text-[10px] uppercase tracking-widest text-violet-200/70 hover:text-violet-200" data-hover="true">
                      View live
                    </a>
                    <a href={project.repo} target="_blank" rel="noreferrer" className="font-mono text-[10px] uppercase tracking-widest text-white/28 hover:text-white/70" data-hover="true">
                      Repo
                    </a>
                  </div>
                </div>
              </article>
            ))}
          </div>

          <div className="work-card mt-4 flex justify-center">
            <a
              href="https://github.com/saathvikvisuals"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 rounded-full border border-violet-400/15 bg-violet-400/[0.035] px-3.5 py-2 font-mono text-[10px] uppercase tracking-widest text-white/40 transition-all duration-300 hover:border-violet-400/40 hover:bg-violet-400/[0.07] hover:text-violet-100"
              data-hover="true"
            >
              <svg viewBox="0 0 24 24" width="13" height="13" fill="currentColor" aria-hidden="true">
                <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0 1 12 6.844a9.59 9.59 0 0 1 2.504.337c1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0 0 22 12.017C22 6.484 17.522 2 12 2z"/>
              </svg>
              View more on GitHub
              <span aria-hidden="true">-&gt;</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
