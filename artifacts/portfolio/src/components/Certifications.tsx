import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import RollingTitle from "./RollingTitle";
import { hexToRgba } from "@/lib/utils";
import { MicrosoftLogo, LinkedInLogo, DataCampLogo, UdemyLogo, CiscoLogo, HackerRankLogo } from "./CertLogos";

gsap.registerPlugin(ScrollTrigger);

function initials(name: string) {
  return name
    .split(/[\s&]+/)
    .filter(Boolean)
    .map((word) => word[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();
}

const certifications = [
  {
    title: "Azure AI Essentials Professional Certificate",
    issuer: "Microsoft & LinkedIn",
    date: "Dec 2024",
    color: "#0078d4",
    tier: "Professional Certificate",
    skills: ["Azure", "AI Fundamentals"],
    Logo: MicrosoftLogo,
  },
  {
    title: "Career Essentials in Generative AI",
    issuer: "Microsoft & LinkedIn",
    date: "2024",
    color: "#0a66c2",
    tier: "Professional Certificate",
    skills: ["LLMs", "Prompt Engineering"],
    Logo: LinkedInLogo,
  },
  {
    title: "Data Science Certification",
    issuer: "DataCamp",
    date: "2024",
    color: "#03ef62",
    tier: "Course",
    skills: ["Python", "Statistics"],
    Logo: DataCampLogo,
  },
  {
    title: "Full Stack Web Development",
    issuer: "Udemy",
    date: "2023",
    color: "#a435f0",
    tier: "Course",
    skills: ["React", "Node.js"],
    Logo: UdemyLogo,
  },
  {
    title: "Cisco CCST Networking Cert Prep",
    issuer: "Cisco",
    date: "Dec 2024",
    color: "#1ba0d7",
    tier: "Course",
    skills: ["Networking", "TCP/IP"],
    Logo: CiscoLogo,
  },
  {
    title: "Python (Basic) Certificate",
    issuer: "HackerRank",
    date: "Jun 2024",
    color: "#00ea64",
    tier: "Course",
    skills: ["Python"],
    Logo: HackerRankLogo,
  },
];

const featuredCerts = certifications.filter((c) => c.tier === "Professional Certificate");
const courseCerts = certifications.filter((c) => c.tier === "Course");

const tracks = [
  { label: "AI & ML", count: "3" },
  { label: "Cloud", count: "2" },
  { label: "Data", count: "2" },
  { label: "Dev", count: "2" },
];

const extras = [
  {
    label: "NSS Volunteer",
    detail: "Social service and community development programs at IITDM Kurnool.",
    tag: "Social Impact",
    color: "#a78bfa",
  },
  {
    label: "NSO Participant",
    detail: "Sports and fitness activities promoting teamwork and discipline.",
    tag: "Sports & Fitness",
    color: "#34d399",
  },
  {
    label: "Technical Club Member",
    detail: "Peer learning sessions, technical seminars, and inter-college workshops.",
    tag: "Tech Community",
    color: "#fbbf24",
  },
  {
    label: "Hackathon Participant",
    detail: "Smart India Hackathon, Adobe India Hackathon, and an AI/ML innovation hackathon.",
    tag: "Competitions",
    color: "#f97316",
  },
];

const activityImages = [
  "https://images.unsplash.com/photo-1529156069898-49953e39b3ac?auto=format&fit=crop&w=900&q=80",
  "https://images.unsplash.com/photo-1517649763962-0c623066013b?auto=format&fit=crop&w=900&q=80",
  "https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&w=900&q=80",
  "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&w=900&q=80",
];

export default function Certifications() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".cert-showcase-item",
        { y: 28, opacity: 0, scale: 0.985 },
        {
          y: 0,
          opacity: 1,
          scale: 1,
          duration: 0.58,
          ease: "power2.out",
          stagger: 0.05,
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 80%",
            end: "bottom 12%",
            toggleActions: "play reverse play reverse",
            invalidateOnRefresh: true,
          },
        },
      );
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="certifications"
      className="relative py-20 md:py-28 px-4 sm:px-8 md:px-16"
      data-testid="certifications-section"
    >
      <div className="max-w-7xl mx-auto">
        <div className="section-index mb-6">05 — Credentials</div>

        <div className="flex flex-col md:flex-row md:items-end gap-6 mb-10 md:mb-12">
          <RollingTitle
            lines={[
              { text: "Certifications" },
              { text: "& Activities.", gradient: true },
            ]}
            className="font-serif text-[clamp(1.75rem,8.4vw,2.15rem)] md:text-[clamp(2rem,5vw,4.5rem)] leading-[1.06] md:leading-[1.05] text-white"
          />
          <p className="md:ml-auto text-white/40 text-xs sm:text-sm font-mono max-w-xs">
            Continuous learning across AI, cloud, data, and development.
          </p>
        </div>

        {/* Track summary strip */}
        <div className="cert-showcase-item grid grid-cols-2 sm:grid-cols-4 gap-3 mb-6">
          {tracks.map((t) => (
            <div key={t.label} className="glass-card rounded-xl px-4 py-3.5">
              <div className="text-2xl text-white" style={{ fontFamily: "'Syne', sans-serif", fontWeight: 800 }}>{t.count}</div>
              <div className="mt-0.5 font-mono text-[10px] uppercase tracking-widest text-white/40">{t.label}</div>
            </div>
          ))}
        </div>

        {/* Professional Certificates — featured tier, larger cards */}
        <div className="mb-3 font-mono text-[10px] sm:text-xs uppercase tracking-[0.2em] text-violet-400/55">Professional Certificates</div>
        <div className="cert-showcase-item grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
          {featuredCerts.map((cert) => (
            <div
              key={cert.title}
              className="glass-card group relative overflow-hidden rounded-2xl p-5 sm:p-6 transition-all duration-300 hover:-translate-y-1"
              style={{ boxShadow: "0 12px 36px -22px rgba(0,0,0,0.6)" }}
              onMouseEnter={(e) => { e.currentTarget.style.boxShadow = `0 24px 60px -16px ${hexToRgba(cert.color, 0.35)}`; e.currentTarget.style.borderColor = hexToRgba(cert.color, 0.45); }}
              onMouseLeave={(e) => { e.currentTarget.style.boxShadow = "0 12px 36px -22px rgba(0,0,0,0.6)"; e.currentTarget.style.borderColor = ""; }}
            >
              <div className="flex items-start justify-between gap-3 mb-4">
                <div
                  className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-white"
                  style={{ border: `1px solid ${hexToRgba(cert.color, 0.35)}` }}
                >
                  <cert.Logo size={24} />
                </div>
                <div
                  className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-sm"
                  style={{ background: hexToRgba(cert.color, 0.18), color: cert.color }}
                >
                  ✓
                </div>
              </div>
              <div className="text-white text-base sm:text-lg font-semibold leading-snug mb-1.5">{cert.title}</div>
              <div className="flex items-center gap-2 flex-wrap mb-4">
                <span className="font-mono text-xs" style={{ color: cert.color }}>{cert.issuer}</span>
                <span className="text-white/20 text-xs">·</span>
                <span className="text-white/40 font-mono text-xs">{cert.date}</span>
              </div>
              <div className="flex flex-wrap gap-1.5">
                {cert.skills.map((skill) => (
                  <span key={skill} className="rounded-full px-2.5 py-1 font-mono text-[10px] text-white/55" style={{ background: hexToRgba(cert.color, 0.1), border: `1px solid ${hexToRgba(cert.color, 0.22)}` }}>
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Courses — compact tier */}
        <div className="mb-3 font-mono text-[10px] sm:text-xs uppercase tracking-[0.2em] text-white/35">Courses & Practice</div>
        <div className="cert-showcase-item grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-10 md:mb-12">
          {courseCerts.map((cert) => (
            <div
              key={cert.title}
              className="glass-card group flex items-start gap-3 rounded-2xl p-4 transition-all duration-300 hover:-translate-y-1"
              style={{ boxShadow: "0 10px 28px -20px rgba(0,0,0,0.6)" }}
              onMouseEnter={(e) => { e.currentTarget.style.boxShadow = `0 16px 40px -16px ${hexToRgba(cert.color, 0.3)}`; e.currentTarget.style.borderColor = hexToRgba(cert.color, 0.4); }}
              onMouseLeave={(e) => { e.currentTarget.style.boxShadow = "0 10px 28px -20px rgba(0,0,0,0.6)"; e.currentTarget.style.borderColor = ""; }}
            >
              <div
                className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-white"
                style={{ border: `1px solid ${hexToRgba(cert.color, 0.35)}` }}
              >
                <cert.Logo size={20} />
              </div>
              <div className="min-w-0 flex-1">
                <div className="text-white text-sm font-semibold leading-snug mb-1">{cert.title}</div>
                <div className="flex items-center gap-2 flex-wrap mb-2">
                  <span className="font-mono text-xs" style={{ color: cert.color }}>{cert.issuer}</span>
                  <span className="text-white/20 text-xs">·</span>
                  <span className="text-white/40 font-mono text-xs">{cert.date}</span>
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {cert.skills.map((skill) => (
                    <span key={skill} className="rounded-full px-2 py-0.5 font-mono text-[10px] text-white/45" style={{ background: hexToRgba(cert.color, 0.08), border: `1px solid ${hexToRgba(cert.color, 0.18)}` }}>
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Extra-Curricular */}
        <div>
          <div className="flex items-center gap-3 mb-6">
            <span className="font-mono text-xs text-violet-400/60 tracking-widest uppercase">Extra-Curricular Activities</span>
            <div className="flex-1 h-px" style={{ background: "rgba(255,255,255,0.06)" }} />
          </div>
          <div className="cert-showcase-item grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {extras.map((item, i) => (
              <div
                key={i}
                className="group relative min-h-[210px] sm:min-h-[230px] overflow-hidden p-4 sm:p-5 rounded-2xl md:rounded-[1.5rem] border transition-all duration-300 hover:-translate-y-1"
                style={{ background: "#111111", borderColor: `${item.color}20` }}
                onMouseEnter={(e) => { e.currentTarget.style.boxShadow = `0 20px 50px -18px ${item.color}40`; }}
                onMouseLeave={(e) => { e.currentTarget.style.boxShadow = ""; }}
              >
                <img
                  src={activityImages[i]}
                  alt={`${item.label} visual`}
                  className="absolute inset-0 h-full w-full object-cover opacity-40 transition duration-500 group-hover:scale-105 group-hover:opacity-58"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-b from-black/55 via-[#111]/68 to-[#111]/92" />
                <div className="inline-flex h-12 min-w-12 items-center justify-center rounded-2xl border px-2 font-mono text-xs font-bold mb-4"
                  style={{ color: item.color, borderColor: `${item.color}35`, background: `${item.color}10` }}>{initials(item.label)}</div>
                <div className="relative text-white/85 text-sm font-semibold mb-2">{item.label}</div>
                <div className="relative text-white/40 text-xs leading-relaxed mb-3">{item.detail}</div>
                <div className="inline-block font-mono text-xs px-2.5 py-1 rounded-full"
                  style={{ background: `${item.color}15`, color: item.color, border: `1px solid ${item.color}30` }}>
                  {item.tag}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
