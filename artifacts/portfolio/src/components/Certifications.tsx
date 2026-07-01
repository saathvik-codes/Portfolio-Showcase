import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  MicrosoftLogo,
  LinkedInLogo,
  InfosysLogo,
  UdemyLogo,
  CiscoLogo,
  HackerRankLogo,
} from "./CertLogos";

gsap.registerPlugin(ScrollTrigger);

const certifications = [
  {
    title: "Azure AI Essentials Professional Certificate",
    issuer: "Microsoft & LinkedIn",
    date: "Dec 2024",
    accent: "#0078d4",
    tier: "pro",
    Logo: () => (
      <span className="flex items-center gap-1.5">
        <MicrosoftLogo size={14} />
        <LinkedInLogo size={14} />
      </span>
    ),
  },
  {
    title: "Career Essentials in Generative AI",
    issuer: "Microsoft & LinkedIn",
    date: "2024",
    accent: "#0a66c2",
    tier: "pro",
    Logo: () => (
      <span className="flex items-center gap-1.5">
        <MicrosoftLogo size={14} />
        <LinkedInLogo size={14} />
      </span>
    ),
  },
  {
    title: "Data Science Certification",
    issuer: "Infosys Springboard",
    date: "2024",
    accent: "#ff7700",
    tier: "course",
    Logo: () => <InfosysLogo size={14} />,
  },
  {
    title: "Full Stack Web Development",
    issuer: "Udemy",
    date: "2023",
    accent: "#a435f0",
    tier: "course",
    Logo: () => <UdemyLogo size={14} />,
  },
  {
    title: "Cisco CCST Networking",
    issuer: "Cisco",
    date: "Dec 2024",
    accent: "#1ba0d7",
    tier: "course",
    Logo: () => <CiscoLogo size={14} />,
  },
  {
    title: "Python (Basic) Certificate",
    issuer: "HackerRank",
    date: "Jun 2024",
    accent: "#00ea64",
    tier: "course",
    Logo: () => <HackerRankLogo size={14} />,
  },
];

const extras = [
  { label: "Smart India Hackathon", sub: "National-level govt. hackathon", accent: "#f97316" },
  { label: "Analytics Vidhya DataHack", sub: "Data science competition", accent: "#fbbf24" },
  { label: "Adobe India Hackathon", sub: "Creative tech challenge", accent: "#e879f9" },
  { label: "Technical Club Member", sub: "IIITDM Kurnool — seminars & workshops", accent: "#a78bfa" },
  { label: "NSS Volunteer", sub: "Community development programs", accent: "#34d399" },
  { label: "NSO Participant", sub: "Sports, teamwork, discipline", accent: "#818cf8" },
];

export default function Certifications() {
  const sectionRef = useRef<HTMLElement>(null);
  const certRowsRef = useRef<HTMLDivElement>(null);
  const extrasRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const certRows = certRowsRef.current?.querySelectorAll(".cert-row");
      if (certRows) {
        gsap.fromTo(certRows,
          { x: -16, opacity: 0 },
          {
            x: 0, opacity: 1, duration: 0.5, ease: "power2.out", stagger: 0.06,
            scrollTrigger: { trigger: certRowsRef.current, start: "top 82%", toggleActions: "play none none reverse" },
          },
        );
      }
      const extras = extrasRef.current?.querySelectorAll(".extra-item");
      if (extras) {
        gsap.fromTo(extras,
          { y: 14, opacity: 0 },
          {
            y: 0, opacity: 1, duration: 0.45, ease: "power2.out", stagger: 0.05,
            scrollTrigger: { trigger: extrasRef.current, start: "top 84%", toggleActions: "play none none reverse" },
          },
        );
      }
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  const proCerts = certifications.filter(c => c.tier === "pro");
  const courseCerts = certifications.filter(c => c.tier === "course");

  return (
    <section
      ref={sectionRef}
      id="certifications"
      className="relative py-20 md:py-28 px-8 md:px-16 overflow-hidden"
      data-testid="certifications-section"
    >
      <div
        className="absolute inset-0 pointer-events-none"
        style={{ background: "radial-gradient(ellipse 50% 45% at 20% 50%, rgba(139,92,246,0.04) 0%, transparent 65%)" }}
      />

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="section-index mb-6 opacity-60">05 — Credentials</div>

        <h2
          className="text-[clamp(2.5rem,7vw,5.5rem)] leading-[0.95] font-black text-white mb-14"
          style={{ fontFamily: "'Syne', sans-serif" }}
        >
          Certs &<br />
          <span className="bg-gradient-to-r from-violet-400 to-fuchsia-400 bg-clip-text text-transparent">
            Activities.
          </span>
        </h2>

        <div className="grid md:grid-cols-2 gap-12 md:gap-20">

          {/* LEFT: Certifications as table rows */}
          <div>
            <div ref={certRowsRef}>
              <div className="font-mono text-[10px] uppercase tracking-[0.25em] text-violet-400/45 mb-4">Professional</div>
              <div className="divide-y divide-white/[0.055] mb-10">
                {proCerts.map((cert, i) => (
                  <div key={i} className="cert-row flex items-center justify-between gap-4 py-4 group hover:bg-white/[0.018] -mx-2 px-2 rounded-lg transition-colors duration-200">
                    <div className="flex items-center gap-3 min-w-0">
                      <span className="shrink-0 opacity-75 group-hover:opacity-100 transition-opacity">
                        <cert.Logo />
                      </span>
                      <div className="min-w-0">
                        <div className="text-white/80 text-sm font-medium group-hover:text-white transition-colors truncate">
                          {cert.title}
                        </div>
                        <div className="font-mono text-xs mt-0.5" style={{ color: cert.accent + "aa" }}>
                          {cert.issuer}
                        </div>
                      </div>
                    </div>
                    <span className="font-mono text-[10px] text-white/20 shrink-0">{cert.date}</span>
                  </div>
                ))}
              </div>

              <div className="font-mono text-[10px] uppercase tracking-[0.25em] text-white/25 mb-4">Courses</div>
              <div className="divide-y divide-white/[0.045]">
                {courseCerts.map((cert, i) => (
                  <div key={i} className="cert-row flex items-center justify-between gap-4 py-3.5 group hover:bg-white/[0.018] -mx-2 px-2 rounded-lg transition-colors duration-200">
                    <div className="flex items-center gap-3 min-w-0">
                      <span className="shrink-0 opacity-60 group-hover:opacity-90 transition-opacity">
                        <cert.Logo />
                      </span>
                      <div className="min-w-0">
                        <div className="text-white/60 text-sm group-hover:text-white/85 transition-colors truncate">
                          {cert.title}
                        </div>
                        <div className="font-mono text-[10px] mt-0.5" style={{ color: cert.accent + "66" }}>{cert.issuer}</div>
                      </div>
                    </div>
                    <span className="font-mono text-[10px] text-white/18 shrink-0">{cert.date}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* RIGHT: Hackathons + Extra-curricular as compact list */}
          <div>
            <div className="font-mono text-[10px] uppercase tracking-[0.25em] text-white/25 mb-6">Hackathons & Activities</div>
            <div ref={extrasRef} className="space-y-0 divide-y divide-white/[0.05]">
              {extras.map((item, i) => (
                <div
                  key={i}
                  className="extra-item flex items-center gap-4 py-4 group -mx-2 px-2 rounded-lg hover:bg-white/[0.018] transition-colors duration-200"
                >
                  <div
                    className="w-1.5 h-1.5 rounded-full shrink-0 mt-0.5"
                    style={{ background: item.accent, boxShadow: `0 0 6px ${item.accent}66` }}
                  />
                  <div>
                    <div className="text-white/75 text-sm font-medium group-hover:text-white transition-colors">
                      {item.label}
                    </div>
                    <div className="font-mono text-xs text-white/28 mt-0.5">{item.sub}</div>
                  </div>
                </div>
              ))}
            </div>

            {/* Domains */}
            <div className="mt-10 pt-8 border-t border-white/[0.055]">
              <div className="font-mono text-[10px] uppercase tracking-[0.25em] text-white/25 mb-5">Learning Tracks</div>
              <div className="flex flex-wrap gap-2">
                {["AI & ML", "Cloud & Infra", "Data Engineering", "Systems & Networking", "Full Stack Dev"].map((track) => (
                  <span
                    key={track}
                    className="font-mono text-[10px] px-3 py-1.5 rounded-full border border-violet-400/15 text-violet-400/55"
                  >
                    {track}
                  </span>
                ))}
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
