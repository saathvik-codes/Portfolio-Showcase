import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const certifications = [
  {
    title: "Data Structures & Algorithms",
    issuer: "Coursera / UC San Diego",
    date: "2024",
    color: "#a78bfa",
    icon: (
      <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
        <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z"/>
      </svg>
    ),
  },
  {
    title: "Machine Learning Specialization",
    issuer: "Coursera / DeepLearning.AI",
    date: "2024",
    color: "#c084fc",
    icon: (
      <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
        <circle cx="12" cy="12" r="3"/>
        <path d="M12 3C12 3 8 7 8 12S12 21 12 21"/>
        <path d="M12 3C12 3 16 7 16 12S12 21 12 21"/>
        <path d="M3 12H21"/>
      </svg>
    ),
  },
  {
    title: "Full Stack Web Development",
    issuer: "The Odin Project / Self-paced",
    date: "2024",
    color: "#818cf8",
    icon: (
      <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
        <path d="M8 3L4 12L8 21M16 3L20 12L16 21"/>
      </svg>
    ),
  },
  {
    title: "AWS Cloud Practitioner",
    issuer: "Amazon Web Services",
    date: "2025",
    color: "#e879f9",
    icon: (
      <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
        <path d="M18 10C18.7 8.5 19 7 19 5.5C19 3 17 2 15 2C13.5 2 12 3 11.5 4.5"/>
        <path d="M6 10C5.3 8.5 5 7 5 5.5C5 3 7 2 9 2C10.5 2 12 3 12.5 4.5"/>
        <path d="M5 17C3.5 16.5 2 15 2 13C2 11 3.5 9.5 5 9"/>
        <path d="M19 17C20.5 16.5 22 15 22 13C22 11 20.5 9.5 19 9"/>
        <ellipse cx="12" cy="13" rx="6" ry="4"/>
      </svg>
    ),
  },
  {
    title: "Python for Data Science",
    issuer: "IBM / Coursera",
    date: "2023",
    color: "#34d399",
    icon: (
      <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
        <path d="M12 2L2 7L12 12L22 7L12 2Z"/>
        <path d="M2 17L12 22L22 17"/>
        <path d="M2 12L12 17L22 12"/>
      </svg>
    ),
  },
  {
    title: "NSS Volunteer Certificate",
    issuer: "IITDM Kurnool",
    date: "2024",
    color: "#fbbf24",
    icon: (
      <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
        <path d="M17 21V19C17 17.9 16.1 17 15 17H9C7.9 17 7 17.9 7 19V21"/>
        <circle cx="12" cy="9" r="4"/>
        <path d="M22 21V19C21.99 18.09 21.39 17.29 20.5 17.05"/>
        <path d="M2 21V19C2.01 18.09 2.61 17.29 3.5 17.05"/>
        <path d="M16 3.13C17.42 3.54 18.42 4.86 18.42 6.38C18.42 7.9 17.42 9.22 16 9.63"/>
        <path d="M8 3.13C6.58 3.54 5.58 4.86 5.58 6.38C5.58 7.9 6.58 9.22 8 9.63"/>
      </svg>
    ),
  },
];

const extras = [
  { label: "NSS Volunteer", detail: "Social service & community development initiatives at IITDM" },
  { label: "NSO Participant", detail: "Sports activities promoting teamwork and discipline" },
  { label: "Technical Club Member", detail: "Peer learning, technical seminars, and workshops" },
  { label: "Hackathon Participant", detail: "Active in coding contests and hackathons" },
];

export default function Certifications() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".cert-card", {
        y: 50, opacity: 0, duration: 0.8, ease: "power3.out", stagger: 0.1,
        scrollTrigger: { trigger: sectionRef.current, start: "top 70%" },
      });
      gsap.from(".extra-item", {
        x: -30, opacity: 0, duration: 0.6, ease: "power3.out", stagger: 0.08,
        scrollTrigger: { trigger: ".extras-row", start: "top 80%" },
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="certifications"
      className="relative py-28 px-8 md:px-16 overflow-hidden"
      data-testid="certifications-section"
    >
      <div className="absolute inset-0 pointer-events-none"
        style={{ background: "radial-gradient(ellipse 50% 60% at 100% 0%, rgba(139,92,246,0.04) 0%, transparent 70%)" }} />

      <div className="max-w-7xl mx-auto">
        <div className="section-index mb-6">05 — Credentials</div>

        <div className="flex flex-col md:flex-row md:items-end gap-6 mb-14">
          <h2
            className="font-serif text-[clamp(2.5rem,5vw,4.5rem)] font-800 leading-tight text-white"
            style={{ fontFamily: "'Syne', sans-serif", fontWeight: 800 }}
            data-testid="certs-heading"
          >
            Certifications<br />
            <span className="gradient-text">&amp; Activities.</span>
          </h2>
          <p className="md:ml-auto text-white/25 text-sm font-mono max-w-xs leading-relaxed">
            Continuous learning through structured courses and community involvement.
          </p>
        </div>

        {/* Cert grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-14">
          {certifications.map((cert, i) => (
            <div
              key={i}
              className="cert-card group relative overflow-hidden p-5 rounded-lg border transition-all duration-300 hover:scale-[1.02]"
              style={{
                borderColor: `${cert.color}15`,
                background: `linear-gradient(135deg, ${cert.color}06 0%, transparent 60%)`,
              }}
              data-testid={`cert-card-${i}`}
            >
              <div className="absolute top-0 right-0 w-20 h-20 opacity-[0.07] group-hover:opacity-[0.14] transition-opacity duration-300"
                style={{ background: `radial-gradient(circle, ${cert.color}, transparent)` }} />

              <div className="flex items-start gap-4 relative z-10">
                <div className="shrink-0 w-10 h-10 flex items-center justify-center rounded-lg"
                  style={{ background: `${cert.color}12`, color: cert.color }}>
                  {cert.icon}
                </div>
                <div className="min-w-0 flex-1">
                  <h3 className="font-semibold text-white text-sm leading-snug mb-1 group-hover:text-violet-200 transition-colors duration-300"
                    style={{ fontFamily: "'Syne', sans-serif" }}>
                    {cert.title}
                  </h3>
                  <div className="font-mono text-xs text-white/30">{cert.issuer}</div>
                </div>
                <div className="font-mono text-xs shrink-0" style={{ color: cert.color, opacity: 0.6 }}>
                  {cert.date}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Extras */}
        <div className="extras-row">
          <div className="font-mono text-xs text-violet-400/50 tracking-widest uppercase mb-6">Extra-Curricular</div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {extras.map((item, i) => (
              <div
                key={i}
                className="extra-item p-4 border border-white/5 rounded-lg bg-white/[0.015] hover:bg-white/[0.03] hover:border-violet-500/15 transition-all duration-300"
                data-testid={`extra-${i}`}
              >
                <div className="flex items-center gap-2 mb-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-violet-500/60" />
                  <div className="font-semibold text-white/70 text-sm">{item.label}</div>
                </div>
                <div className="text-white/30 text-xs leading-relaxed">{item.detail}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
