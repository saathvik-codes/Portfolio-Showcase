import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import RollingTitle from "./RollingTitle";

gsap.registerPlugin(ScrollTrigger);

const certifications = [
  {
    title: "Microsoft Azure AI Essentials Professional Certificate",
    issuer: "Microsoft & LinkedIn",
    date: "Dec 2024",
    color: "#0078d4",
    bg: "#0d1f38",
    border: "rgba(0,120,212,0.3)",
    featured: true,
    logo: (
      <svg viewBox="0 0 21 21" width="30" height="30">
        <rect x="1" y="1" width="9" height="9" fill="#f35325"/>
        <rect x="11" y="1" width="9" height="9" fill="#81bc06"/>
        <rect x="1" y="11" width="9" height="9" fill="#05a6f0"/>
        <rect x="11" y="11" width="9" height="9" fill="#ffba08"/>
      </svg>
    ),
  },
  {
    title: "Career Essentials in Generative AI by Microsoft and LinkedIn",
    issuer: "Microsoft & LinkedIn",
    date: "2024",
    color: "#0078d4",
    bg: "#0d1f38",
    border: "rgba(0,120,212,0.3)",
    featured: true,
    logo: (
      <svg viewBox="0 0 21 21" width="30" height="30">
        <rect x="1" y="1" width="9" height="9" fill="#f35325"/>
        <rect x="11" y="1" width="9" height="9" fill="#81bc06"/>
        <rect x="1" y="11" width="9" height="9" fill="#05a6f0"/>
        <rect x="11" y="11" width="9" height="9" fill="#ffba08"/>
      </svg>
    ),
  },
  {
    title: "Java",
    issuer: "HackerRank",
    date: "Jun 2024",
    color: "#00ea64",
    bg: "#0a1e12",
    border: "rgba(0,234,100,0.2)",
    featured: false,
    logo: (
      <div style={{ background: "#1ba94c", borderRadius: 8, width: 28, height: 28, display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 700, color: "white", fontSize: 13, fontFamily: "sans-serif" }}>H</div>
    ),
  },
  {
    title: "Python",
    issuer: "HackerRank",
    date: "Jun 2024",
    color: "#00ea64",
    bg: "#0a1e12",
    border: "rgba(0,234,100,0.2)",
    featured: false,
    logo: (
      <div style={{ background: "#1ba94c", borderRadius: 8, width: 28, height: 28, display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 700, color: "white", fontSize: 13, fontFamily: "sans-serif" }}>H</div>
    ),
  },
  {
    title: "AI Workshop",
    issuer: "HackerRank",
    date: "Jun 2024",
    color: "#00ea64",
    bg: "#0a1e12",
    border: "rgba(0,234,100,0.2)",
    featured: false,
    logo: (
      <div style={{ background: "#1ba94c", borderRadius: 8, width: 28, height: 28, display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 700, color: "white", fontSize: 13, fontFamily: "sans-serif" }}>H</div>
    ),
  },
  {
    title: "Data Science Certification",
    issuer: "DataCamp",
    date: "2024",
    color: "#03ef62",
    bg: "#061a0e",
    border: "rgba(3,239,98,0.2)",
    featured: false,
    logo: (
      <div style={{ background: "#05192d", borderRadius: 8, width: 28, height: 28, display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 700, color: "#03ef62", fontSize: 9, fontFamily: "monospace" }}>DC</div>
    ),
  },
  {
    title: "Full Stack Development",
    issuer: "Udemy",
    date: "2023",
    color: "#a435f0",
    bg: "#1a0a24",
    border: "rgba(164,53,240,0.2)",
    featured: false,
    logo: (
      <div style={{ background: "#a435f0", borderRadius: 8, width: 28, height: 28, display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 700, color: "white", fontSize: 15, fontFamily: "sans-serif" }}>U</div>
    ),
  },
  {
    title: "Introduction to Career Skills in Data Analytics",
    issuer: "LinkedIn Learning",
    date: "Dec 2024",
    color: "#0a66c2",
    bg: "#091830",
    border: "rgba(10,102,194,0.25)",
    featured: false,
    logo: (
      <div style={{ background: "#0a66c2", borderRadius: 8, width: 28, height: 28, display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 700, color: "white", fontSize: 12, fontFamily: "sans-serif" }}>in</div>
    ),
  },
  {
    title: "Practical GitHub Actions",
    issuer: "LinkedIn Learning",
    date: "Dec 2024",
    color: "#0a66c2",
    bg: "#091830",
    border: "rgba(10,102,194,0.25)",
    featured: false,
    logo: (
      <div style={{ background: "#0a66c2", borderRadius: 8, width: 28, height: 28, display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 700, color: "white", fontSize: 12, fontFamily: "sans-serif" }}>in</div>
    ),
  },
  {
    title: "Cisco CCST Networking Cert Prep",
    issuer: "Cisco",
    date: "Dec 2024",
    color: "#1ba0d7",
    bg: "#071926",
    border: "rgba(27,160,215,0.2)",
    featured: false,
    logo: (
      <div style={{ background: "#049fd9", borderRadius: 8, width: 28, height: 28, display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 700, color: "white", fontSize: 8, fontFamily: "sans-serif" }}>CISCO</div>
    ),
  },
  {
    title: "Generative AI Imaging: What Creative Pros Need to Know",
    issuer: "LinkedIn Learning",
    date: "Dec 2024",
    color: "#0a66c2",
    bg: "#091830",
    border: "rgba(10,102,194,0.25)",
    featured: false,
    logo: (
      <div style={{ background: "#0a66c2", borderRadius: 8, width: 28, height: 28, display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 700, color: "white", fontSize: 12, fontFamily: "sans-serif" }}>in</div>
    ),
  },
  {
    title: "Essential Skills in Generative AI for Creatives (Adobe)",
    issuer: "LinkedIn Learning",
    date: "Dec 2024",
    color: "#0a66c2",
    bg: "#091830",
    border: "rgba(10,102,194,0.25)",
    featured: false,
    logo: (
      <div style={{ background: "#0a66c2", borderRadius: 8, width: 28, height: 28, display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 700, color: "white", fontSize: 12, fontFamily: "sans-serif" }}>in</div>
    ),
  },
];

const extras = [
  {
    icon: "🤝",
    label: "NSS Volunteer",
    detail: "Social service and community development programs at IITDM Kurnool",
    tag: "Social Impact",
    color: "#a78bfa",
  },
  {
    icon: "🏃",
    label: "NSO Participant",
    detail: "Sports and fitness activities promoting teamwork and discipline",
    tag: "Sports & Fitness",
    color: "#34d399",
  },
  {
    icon: "💡",
    label: "Technical Club Member",
    detail: "Peer learning sessions, technical seminars, and inter-college workshops",
    tag: "Tech Community",
    color: "#fbbf24",
  },
  {
    icon: "🏆",
    label: "Hackathon Participant",
    detail: "Adobe India Hackathon, Smart India Hackathon (SIH), AI & ML Innovation Hackathon",
    tag: "Competitions",
    color: "#f97316",
  },
];

export default function Certifications() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".cert-showcase-item", {
        y: 24,
        duration: 0.5,
        ease: "power2.out",
        stagger: 0.05,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 80%",
          invalidateOnRefresh: true,
        },
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  const featured = certifications.filter((c) => c.featured);
  const rest = certifications.filter((c) => !c.featured);
  const credentialImage = "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=1400&q=80";
  const activityImages = [
    "https://images.unsplash.com/photo-1529156069898-49953e39b3ac?auto=format&fit=crop&w=900&q=80",
    "https://images.unsplash.com/photo-1517649763962-0c623066013b?auto=format&fit=crop&w=900&q=80",
    "https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&w=900&q=80",
    "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&w=900&q=80",
  ];

  return (
    <section
      ref={sectionRef}
      id="certifications"
      className="relative py-24 md:py-28 px-4 sm:px-8 md:px-16"
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
            className="font-serif text-[clamp(2rem,5vw,4.5rem)] leading-[1.05] text-white"
          />
          <p className="md:ml-auto text-white/40 text-sm font-mono max-w-xs">
            Continuous learning across AI, cloud, data, and development.
          </p>
        </div>

        {/* Featured: Microsoft — large prominent cards */}
        <div className="cert-showcase-item grid grid-cols-1 lg:grid-cols-[0.82fr_1.18fr] gap-4 mb-5">
          <div className="relative min-h-[360px] overflow-hidden rounded-[2rem] border border-violet-400/16 bg-[#101014] p-6">
            <img
              src={credentialImage}
              alt="Online learning workspace with laptop"
              className="absolute inset-0 h-full w-full object-cover opacity-32 grayscale transition duration-700 hover:scale-105 hover:opacity-45 hover:grayscale-0"
              loading="lazy"
            />
            <div className="absolute inset-0 bg-gradient-to-br from-black/86 via-black/62 to-violet-950/36" />
            <div className="relative z-10 flex h-full flex-col justify-between">
              <div>
                <div className="font-mono text-xs uppercase tracking-[0.24em] text-violet-300/55">Learning stack</div>
                <div className="mt-7 text-6xl leading-none text-white" style={{ fontFamily: "'Syne', sans-serif", fontWeight: 800 }}>10+</div>
                <p className="mt-4 max-w-sm text-sm leading-relaxed text-white/48">
                  Certificates arranged as a skills ledger instead of a generic badge wall.
                </p>
              </div>
              <div className="grid grid-cols-2 gap-3">
                {["AI", "Cloud", "Data", "Dev"].map((track) => (
                  <div key={track} className="rounded-2xl border border-white/[0.07] bg-black/25 p-4">
                    <div className="font-mono text-[10px] uppercase tracking-widest text-white/25">Track</div>
                    <div className="mt-1 text-sm font-semibold text-violet-100/75">{track}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
          <div className="grid gap-4">
          {featured.map((cert, i) => (
            <div
              key={i}
              className="group relative overflow-hidden flex items-center gap-4 p-6 rounded-[1.65rem] border transition-all duration-300 hover:-translate-y-1"
              style={{ background: cert.bg, borderColor: cert.border }}
            >
              <div className="w-12 h-12 rounded-xl flex items-center justify-center shrink-0"
                style={{ background: "rgba(0,120,212,0.15)" }}>
                {cert.logo}
              </div>
              <div className="flex-1 min-w-0">
                <div className="text-white text-sm font-semibold leading-snug mb-1">{cert.title}</div>
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="font-mono text-xs" style={{ color: cert.color }}>{cert.issuer}</span>
                  <span className="text-white/20 text-xs">·</span>
                  <span className="text-white/40 font-mono text-xs">{cert.date}</span>
                </div>
              </div>
              <div className="w-7 h-7 rounded-full flex items-center justify-center shrink-0 text-sm"
                style={{ background: "rgba(0,120,212,0.2)", color: cert.color }}>✓</div>
            </div>
          ))}
          </div>
        </div>

        {/* Rest — responsive grid, always visible */}
        <div className="cert-showcase-item overflow-hidden rounded-[1.75rem] border border-white/[0.06] bg-white/[0.015] mb-12">
          {rest.map((cert, i) => (
            <div
              key={i}
              className="group grid grid-cols-1 gap-3 border-b border-white/[0.045] px-4 py-4 transition-all duration-300 last:border-b-0 hover:bg-white/[0.03] sm:grid-cols-[52px_1fr_160px_80px] sm:items-center"
              style={{ borderColor: cert.border }}
            >
              <div className="shrink-0 mt-0.5">{cert.logo}</div>
              <div className="min-w-0">
                <div className="text-white/85 text-sm font-medium leading-snug mb-1.5">{cert.title}</div>
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="font-mono text-xs" style={{ color: cert.color + "cc" }}>{cert.issuer}</span>
                  <span className="text-white/20 text-xs">·</span>
                  <span className="text-white/35 font-mono text-xs">{cert.date}</span>
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
                className="group relative min-h-[230px] overflow-hidden p-5 rounded-[1.5rem] border transition-all duration-300 hover:-translate-y-1"
                style={{ background: "#111111", borderColor: `${item.color}20` }}
              >
                <img
                  src={activityImages[i]}
                  alt={`${item.label} visual`}
                  className="absolute inset-0 h-full w-full object-cover opacity-16 grayscale transition duration-500 group-hover:scale-105 group-hover:opacity-28 group-hover:grayscale-0"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-b from-black/58 via-[#111]/76 to-[#111]" />
                <div className="inline-flex h-12 min-w-12 items-center justify-center rounded-2xl border px-2 font-mono text-xs font-bold mb-4"
                  style={{ color: item.color, borderColor: `${item.color}35`, background: `${item.color}10` }}>{item.label.split(" ").map(word => word[0]).join("").slice(0, 3)}</div>
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
