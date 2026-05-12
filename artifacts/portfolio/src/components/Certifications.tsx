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
    badge: "MS",
    badgeBg: "rgba(0,120,212,0.15)",
    featured: true,
  },
  {
    title: "Career Essentials in Generative AI",
    issuer: "Microsoft & LinkedIn",
    date: "2024",
    color: "#0078d4",
    badge: "MS",
    badgeBg: "rgba(0,120,212,0.15)",
    featured: true,
  },
  {
    title: "Java",
    issuer: "HackerRank",
    date: "2024",
    color: "#00ea64",
    badge: "HR",
    badgeBg: "rgba(0,234,100,0.12)",
    featured: false,
  },
  {
    title: "Python",
    issuer: "HackerRank",
    date: "2024",
    color: "#00ea64",
    badge: "HR",
    badgeBg: "rgba(0,234,100,0.12)",
    featured: false,
  },
  {
    title: "AI Workshop",
    issuer: "HackerRank",
    date: "2024",
    color: "#00ea64",
    badge: "HR",
    badgeBg: "rgba(0,234,100,0.12)",
    featured: false,
  },
  {
    title: "Data Science Certification",
    issuer: "DataCamp",
    date: "2024",
    color: "#03ef62",
    badge: "DC",
    badgeBg: "rgba(3,239,98,0.12)",
    featured: false,
  },
  {
    title: "Full Stack Development",
    issuer: "Udemy",
    date: "2023",
    color: "#a435f0",
    badge: "U",
    badgeBg: "rgba(164,53,240,0.12)",
    featured: false,
  },
  {
    title: "Introduction to Career Skills in Data Analytics",
    issuer: "LinkedIn Learning",
    date: "Dec 2024",
    color: "#0a66c2",
    badge: "in",
    badgeBg: "rgba(10,102,194,0.15)",
    featured: false,
  },
  {
    title: "Practical GitHub Actions",
    issuer: "LinkedIn Learning",
    date: "Dec 2024",
    color: "#0a66c2",
    badge: "in",
    badgeBg: "rgba(10,102,194,0.15)",
    featured: false,
  },
  {
    title: "CCST Networking Cert Prep",
    issuer: "Cisco",
    date: "Dec 2024",
    color: "#1ba0d7",
    badge: "CI",
    badgeBg: "rgba(27,160,215,0.12)",
    featured: false,
  },
];

const extras = [
  {
    icon: "🤝",
    label: "NSS Volunteer",
    detail: "Social service and community development initiatives at IITDM Kurnool",
  },
  {
    icon: "🏃",
    label: "NSO Participant",
    detail: "Sports activities promoting teamwork, fitness, and discipline",
  },
  {
    icon: "💡",
    label: "Technical Club Member",
    detail: "Peer learning sessions, technical seminars, and inter-college workshops",
  },
  {
    icon: "🏆",
    label: "Hackathon Participant",
    detail: "Active participant in hackathons, coding contests, and competitive programming",
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
        x: -20,
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
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 50% 60% at 100% 0%, rgba(139,92,246,0.04) 0%, transparent 70%)",
        }}
      />

      <div className="max-w-7xl mx-auto">
        <div className="section-index mb-6">05 — Credentials</div>

        <div className="flex flex-col md:flex-row md:items-end gap-6 mb-12 md:mb-14">
          <h2
            className="font-serif text-[clamp(2rem,5vw,4.5rem)] font-800 leading-tight text-white"
            style={{ fontFamily: "'Syne', sans-serif", fontWeight: 800 }}
          >
            Certifications<br />
            <span className="gradient-text">&amp; Activities.</span>
          </h2>
          <p className="md:ml-auto text-white/25 text-sm font-mono max-w-xs leading-relaxed">
            Continuous learning through structured courses and community.
          </p>
        </div>

        {/* Featured Microsoft certs — wide cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
          {featured.map((cert, i) => (
            <div
              key={i}
              className="cert-card flex items-center gap-4 p-5 rounded-2xl border border-white/[0.07] bg-white/[0.03] hover:bg-white/[0.05] hover:border-blue-500/30 transition-all duration-300 group"
            >
              <div
                className="w-12 h-12 shrink-0 rounded-xl flex items-center justify-center font-bold text-sm"
                style={{ background: cert.badgeBg, color: cert.color }}
              >
                {cert.badge}
              </div>
              <div className="min-w-0 flex-1">
                <div className="font-semibold text-white/90 text-sm leading-snug group-hover:text-white transition-colors">
                  {cert.title}
                </div>
                <div className="font-mono text-xs text-white/30 mt-1">{cert.issuer} · {cert.date}</div>
              </div>
              <div
                className="shrink-0 text-xs font-mono px-2 py-1 rounded-full"
                style={{ background: cert.badgeBg, color: cert.color }}
              >
                ✓
              </div>
            </div>
          ))}
        </div>

        {/* Rest of certs — compact grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 mb-12">
          {rest.map((cert, i) => (
            <div
              key={i}
              className="cert-card flex items-start gap-3 p-4 rounded-xl border border-white/[0.05] bg-white/[0.02] hover:bg-white/[0.04] hover:border-white/10 transition-all duration-300 group"
            >
              <div
                className="w-8 h-8 shrink-0 rounded-lg flex items-center justify-center font-bold text-xs mt-0.5"
                style={{ background: cert.badgeBg, color: cert.color }}
              >
                {cert.badge}
              </div>
              <div className="min-w-0">
                <div className="text-white/70 text-xs font-medium leading-snug group-hover:text-white/90 transition-colors">
                  {cert.title}
                </div>
                <div className="font-mono text-xs text-white/20 mt-1">{cert.issuer}</div>
              </div>
            </div>
          ))}
        </div>

        {/* Extras */}
        <div className="extras-row">
          <div className="font-mono text-xs text-violet-400/50 tracking-widest uppercase mb-5">
            Extra-Curricular
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {extras.map((item, i) => (
              <div
                key={i}
                className="extra-item p-4 rounded-xl border border-white/[0.05] bg-white/[0.015] hover:bg-white/[0.03] hover:border-violet-500/20 transition-all duration-300"
              >
                <div className="text-xl mb-3">{item.icon}</div>
                <div className="font-semibold text-white/75 text-sm mb-1.5">{item.label}</div>
                <div className="text-white/30 text-xs leading-relaxed">{item.detail}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
