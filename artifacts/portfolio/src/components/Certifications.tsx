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
    badgeBg: "rgba(0,120,212,0.15)",
    featured: true,
    logo: (
      <svg viewBox="0 0 23 23" width="28" height="28">
        <path fill="#f35325" d="M1 1h10v10H1z"/>
        <path fill="#81bc06" d="M12 1h10v10H12z"/>
        <path fill="#05a6f0" d="M1 12h10v10H1z"/>
        <path fill="#ffba08" d="M12 12h10v10H12z"/>
      </svg>
    ),
  },
  {
    title: "Career Essentials in Generative AI",
    issuer: "Microsoft & LinkedIn",
    date: "2024",
    color: "#0078d4",
    badgeBg: "rgba(0,120,212,0.15)",
    featured: true,
    logo: (
      <svg viewBox="0 0 23 23" width="28" height="28">
        <path fill="#f35325" d="M1 1h10v10H1z"/>
        <path fill="#81bc06" d="M12 1h10v10H12z"/>
        <path fill="#05a6f0" d="M1 12h10v10H1z"/>
        <path fill="#ffba08" d="M12 12h10v10H12z"/>
      </svg>
    ),
  },
  {
    title: "Java",
    issuer: "HackerRank",
    date: "2024",
    color: "#00ea64",
    badgeBg: "rgba(0,234,100,0.10)",
    featured: false,
    logo: (
      <svg viewBox="0 0 50 50" width="26" height="26">
        <rect width="50" height="50" rx="8" fill="#1ba94c"/>
        <text x="25" y="34" textAnchor="middle" fontSize="22" fontWeight="bold" fill="white" fontFamily="sans-serif">H</text>
      </svg>
    ),
  },
  {
    title: "Python",
    issuer: "HackerRank",
    date: "2024",
    color: "#00ea64",
    badgeBg: "rgba(0,234,100,0.10)",
    featured: false,
    logo: (
      <svg viewBox="0 0 50 50" width="26" height="26">
        <rect width="50" height="50" rx="8" fill="#1ba94c"/>
        <text x="25" y="34" textAnchor="middle" fontSize="22" fontWeight="bold" fill="white" fontFamily="sans-serif">H</text>
      </svg>
    ),
  },
  {
    title: "AI Workshop",
    issuer: "HackerRank",
    date: "2024",
    color: "#00ea64",
    badgeBg: "rgba(0,234,100,0.10)",
    featured: false,
    logo: (
      <svg viewBox="0 0 50 50" width="26" height="26">
        <rect width="50" height="50" rx="8" fill="#1ba94c"/>
        <text x="25" y="34" textAnchor="middle" fontSize="22" fontWeight="bold" fill="white" fontFamily="sans-serif">H</text>
      </svg>
    ),
  },
  {
    title: "Data Science Certification",
    issuer: "DataCamp",
    date: "2024",
    color: "#03ef62",
    badgeBg: "rgba(3,239,98,0.10)",
    featured: false,
    logo: (
      <svg viewBox="0 0 50 50" width="26" height="26">
        <rect width="50" height="50" rx="8" fill="#05192d"/>
        <text x="25" y="34" textAnchor="middle" fontSize="13" fontWeight="bold" fill="#03ef62" fontFamily="monospace">DC</text>
      </svg>
    ),
  },
  {
    title: "Full Stack Development",
    issuer: "Udemy",
    date: "2023",
    color: "#a435f0",
    badgeBg: "rgba(164,53,240,0.10)",
    featured: false,
    logo: (
      <svg viewBox="0 0 50 50" width="26" height="26">
        <rect width="50" height="50" rx="8" fill="#a435f0"/>
        <text x="25" y="34" textAnchor="middle" fontSize="18" fontWeight="bold" fill="white" fontFamily="sans-serif">U</text>
      </svg>
    ),
  },
  {
    title: "Career Skills in Data Analytics",
    issuer: "LinkedIn Learning",
    date: "Dec 2024",
    color: "#0a66c2",
    badgeBg: "rgba(10,102,194,0.12)",
    featured: false,
    logo: (
      <svg viewBox="0 0 50 50" width="26" height="26">
        <rect width="50" height="50" rx="8" fill="#0a66c2"/>
        <text x="25" y="34" textAnchor="middle" fontSize="16" fontWeight="bold" fill="white" fontFamily="sans-serif">in</text>
      </svg>
    ),
  },
  {
    title: "Practical GitHub Actions",
    issuer: "LinkedIn Learning",
    date: "Dec 2024",
    color: "#0a66c2",
    badgeBg: "rgba(10,102,194,0.12)",
    featured: false,
    logo: (
      <svg viewBox="0 0 50 50" width="26" height="26">
        <rect width="50" height="50" rx="8" fill="#0a66c2"/>
        <text x="25" y="34" textAnchor="middle" fontSize="16" fontWeight="bold" fill="white" fontFamily="sans-serif">in</text>
      </svg>
    ),
  },
  {
    title: "CCST Networking Cert Prep",
    issuer: "Cisco",
    date: "Dec 2024",
    color: "#1ba0d7",
    badgeBg: "rgba(27,160,215,0.10)",
    featured: false,
    logo: (
      <svg viewBox="0 0 50 50" width="26" height="26">
        <rect width="50" height="50" rx="8" fill="#049fd9"/>
        <text x="25" y="34" textAnchor="middle" fontSize="11" fontWeight="bold" fill="white" fontFamily="sans-serif">CISCO</text>
      </svg>
    ),
  },
];

const extras = [
  {
    icon: "🤝",
    label: "NSS Volunteer",
    detail: "Social service and community development initiatives at IITDM Kurnool",
    tag: "Social Impact",
  },
  {
    icon: "🏃",
    label: "NSO Participant",
    detail: "Sports activities promoting teamwork, fitness, and discipline",
    tag: "Sports & Fitness",
  },
  {
    icon: "💡",
    label: "Technical Club Member",
    detail: "Peer learning sessions, technical seminars, and inter-college workshops",
    tag: "Tech Community",
  },
  {
    icon: "🏆",
    label: "Hackathon Participant",
    detail: "Active participant in hackathons, coding contests, and competitive programming events",
    tag: "Competitions",
  },
];

export default function Certifications() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".cert-card", {
        y: 40,
        opacity: 0,
        duration: 0.7,
        ease: "power3.out",
        stagger: 0.07,
        scrollTrigger: { trigger: sectionRef.current, start: "top 70%" },
      });
      gsap.from(".extra-item", {
        y: 30,
        opacity: 0,
        duration: 0.6,
        ease: "power3.out",
        stagger: 0.1,
        scrollTrigger: { trigger: ".extras-row", start: "top 80%" },
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
      className="relative py-24 md:py-28 px-4 sm:px-8 md:px-16 overflow-hidden"
      data-testid="certifications-section"
    >
      <div className="absolute inset-0 pointer-events-none"
        style={{ background: "radial-gradient(ellipse 50% 60% at 100% 0%, rgba(139,92,246,0.04) 0%, transparent 70%)" }} />

      <div className="max-w-7xl mx-auto">
        <div className="section-index mb-6">05 — Credentials</div>

        <div className="flex flex-col md:flex-row md:items-end gap-6 mb-12 md:mb-14">
          <h2
            className="font-serif text-[clamp(2rem,5vw,4.5rem)] leading-tight text-white"
            style={{ fontFamily: "'Syne', sans-serif", fontWeight: 800 }}
          >
            Certifications<br />
            <span className="gradient-text">&amp; Activities.</span>
          </h2>
          <p className="md:ml-auto text-white/25 text-sm font-mono max-w-xs leading-relaxed">
            Continuous learning through structured courses, platforms, and community.
          </p>
        </div>

        {/* Featured — Microsoft hero cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
          {featured.map((cert, i) => (
            <div
              key={i}
              className="cert-card group flex items-center gap-4 p-5 rounded-2xl border border-blue-500/15 bg-gradient-to-r from-blue-500/[0.06] to-transparent hover:from-blue-500/[0.10] hover:border-blue-500/30 transition-all duration-300"
            >
              <div className="w-12 h-12 shrink-0 rounded-xl flex items-center justify-center"
                style={{ background: cert.badgeBg }}>
                {cert.logo}
              </div>
              <div className="min-w-0 flex-1">
                <div className="font-semibold text-white/90 text-sm leading-snug group-hover:text-white transition-colors">
                  {cert.title}
                </div>
                <div className="font-mono text-xs text-white/30 mt-1.5 flex items-center gap-2">
                  <span>{cert.issuer}</span>
                  <span className="text-white/15">·</span>
                  <span>{cert.date}</span>
                </div>
              </div>
              <div className="shrink-0 w-6 h-6 rounded-full flex items-center justify-center text-xs"
                style={{ background: cert.badgeBg, color: cert.color }}>
                ✓
              </div>
            </div>
          ))}
        </div>

        {/* Rest — 4-col compact grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 mb-14">
          {rest.map((cert, i) => (
            <div
              key={i}
              className="cert-card group flex items-start gap-3 p-4 rounded-xl border border-white/[0.05] bg-white/[0.02] hover:bg-white/[0.04] hover:border-white/10 transition-all duration-300"
            >
              <div className="shrink-0 mt-0.5">{cert.logo}</div>
              <div className="min-w-0">
                <div className="text-white/70 text-xs font-medium leading-snug group-hover:text-white/90 transition-colors">
                  {cert.title}
                </div>
                <div className="font-mono text-xs mt-1.5 flex items-center gap-1.5" style={{ color: cert.color + "80" }}>
                  <span>{cert.issuer}</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Extra-curricular */}
        <div className="extras-row">
          <div className="flex items-center gap-3 mb-6">
            <div className="font-mono text-xs text-violet-400/50 tracking-widest uppercase">
              Extra-Curricular Activities
            </div>
            <div className="flex-1 h-px bg-white/[0.04]" />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {extras.map((item, i) => (
              <div
                key={i}
                className="extra-item group relative p-5 rounded-2xl border border-white/[0.05] bg-white/[0.015] hover:bg-violet-500/[0.04] hover:border-violet-500/20 transition-all duration-300 overflow-hidden"
              >
                <div className="absolute top-0 right-0 w-16 h-16 rounded-full bg-violet-500/[0.04] -mr-6 -mt-6 group-hover:bg-violet-500/[0.08] transition-all" />
                <div className="text-2xl mb-3">{item.icon}</div>
                <div className="font-semibold text-white/75 text-sm mb-2 group-hover:text-white/90 transition-colors">
                  {item.label}
                </div>
                <div className="text-white/28 text-xs leading-relaxed mb-3">{item.detail}</div>
                <div className="inline-block font-mono text-xs px-2 py-1 rounded-full border border-violet-500/15 text-violet-400/50">
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
