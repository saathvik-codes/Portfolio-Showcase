import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

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
      gsap.from(".cert-card", {
        y: 24,
        opacity: 0,
        duration: 0.5,
        ease: "power2.out",
        stagger: 0.05,
        scrollTrigger: { trigger: sectionRef.current, start: "top 80%" },
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  const featured = certifications.filter((c) => c.featured);
  const rest = certifications.filter((c) => !c.featured);

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
          <h2
            className="font-serif text-[clamp(2rem,5vw,4.5rem)] leading-tight text-white"
            style={{ fontFamily: "'Syne', sans-serif", fontWeight: 800 }}
          >
            Certifications<br />
            <span className="gradient-text">&amp; Activities.</span>
          </h2>
          <p className="md:ml-auto text-white/40 text-sm font-mono max-w-xs">
            Continuous learning across AI, cloud, data, and development.
          </p>
        </div>

        {/* Featured: Microsoft — large prominent cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-5">
          {featured.map((cert, i) => (
            <div
              key={i}
              className="cert-card group flex items-center gap-4 p-5 rounded-2xl border transition-all duration-300 hover:scale-[1.01]"
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

        {/* Rest — responsive grid, always visible */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 mb-12">
          {rest.map((cert, i) => (
            <div
              key={i}
              className="cert-card group flex items-start gap-3 p-4 rounded-xl border transition-all duration-300 hover:scale-[1.01]"
              style={{ background: cert.bg, borderColor: cert.border }}
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
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {extras.map((item, i) => (
              <div
                key={i}
                className="cert-card p-5 rounded-2xl border transition-all duration-300 hover:scale-[1.02]"
                style={{ background: "#111111", borderColor: `${item.color}20` }}
              >
                <div className="text-2xl mb-3">{item.icon}</div>
                <div className="text-white/85 text-sm font-semibold mb-2">{item.label}</div>
                <div className="text-white/40 text-xs leading-relaxed mb-3">{item.detail}</div>
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
