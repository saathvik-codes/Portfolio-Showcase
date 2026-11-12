import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  CiscoLogo,
  HackerRankLogo,
  InfosysLogo,
  LinkedInLogo,
  MicrosoftLogo,
  NptelLogo,
  UdemyLogo,
} from "./CertLogos";
import { certifications, communityAndHackathons, type CertificationItem } from "@/data/portfolioData";

gsap.registerPlugin(ScrollTrigger);

function renderBrandMark(brand: CertificationItem["brand"]) {
  switch (brand) {
    case "nptel":
      return <NptelLogo size={18} />;
    case "microsoft-linkedin":
      return (
        <span className="inline-flex items-center gap-1">
          <MicrosoftLogo size={15} />
          <LinkedInLogo size={15} />
        </span>
      );
    case "cisco":
      return <CiscoLogo size={18} />;
    case "linkedin":
      return <LinkedInLogo size={17} />;
    case "udemy":
      return <UdemyLogo size={17} />;
    case "infosys":
      return <InfosysLogo size={17} />;
    case "hackerrank":
      return <HackerRankLogo size={17} />;
  }
}

export default function Certifications() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".cert-reveal",
        { y: 20, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.55,
          stagger: 0.06,
          ease: "power2.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 78%",
            toggleActions: "play none none reverse",
          },
        },
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const coreCerts = certifications.filter((c) => c.tier === "verified-core");
  const specCerts = certifications.filter((c) => c.tier === "specialization");

  return (
    <section
      ref={sectionRef}
      id="certifications"
      className="relative py-20 md:py-28 px-5 sm:px-10 md:px-14 border-t border-white/[0.08]"
      data-testid="certifications-section"
    >
      <div className="max-w-7xl mx-auto space-y-12">
        <div className="cert-reveal flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-white/[0.1] pb-8">
          <div>
            <div className="section-index mb-3">05 — Verified Credentials &amp; Community</div>
            <h2 className="text-[clamp(2.2rem,5.2vw,4.4rem)] leading-[0.95] font-display font-bold text-[#f2ede4]">
              Audited{" "}
              <span className="font-serif-editorial italic font-normal text-[#e8a85a]">
                foundations.
              </span>
            </h2>
          </div>
          <p className="text-xs sm:text-sm text-white/50 max-w-md font-mono">
            Every certificate below carries its verified ID and official verification URL.
          </p>
        </div>

        <div className="grid lg:grid-cols-12 gap-10">
          {/* Left: Core + Specialization Certificates */}
          <div className="lg:col-span-7 space-y-8">
            <div className="space-y-4">
              <div className="font-mono text-[10px] uppercase tracking-[0.24em] text-[#e8a85a]">
                Cloud, Networking &amp; AI Core
              </div>
              <div className="space-y-3">
                {coreCerts.map((cert) => (
                  <div
                    key={cert.title}
                    className="cert-reveal studio-plate rounded-2xl p-4 sm:p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4 hover:border-white/[0.22] transition-colors"
                  >
                    <div className="flex items-start gap-3.5 min-w-0">
                      <span className="mt-0.5 shrink-0">{renderBrandMark(cert.brand)}</span>
                      <div className="min-w-0 space-y-1">
                        <h3 className="text-sm sm:text-base font-semibold text-[#f2ede4]">
                          {cert.title}
                        </h3>
                        <p className="font-mono text-[11px]" style={{ color: cert.accent }}>
                          {cert.issuer} · {cert.date}
                        </p>
                        <p className="text-xs text-white/55">{cert.detail}</p>
                        {cert.credentialId && (
                          <p className="font-mono text-[10px] text-white/35 break-all">
                            ID: {cert.credentialId}
                          </p>
                        )}
                      </div>
                    </div>

                    {cert.verifyUrl && (
                      <a
                        href={cert.verifyUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="shrink-0 self-start sm:self-center px-3.5 py-1.5 rounded-full border border-white/[0.16] font-mono text-[10px] uppercase tracking-widest text-[#e8a85a] hover:bg-[#e8a85a] hover:text-[#08080a] transition-colors"
                        data-hover="true"
                      >
                        Verify ↗
                      </a>
                    )}
                  </div>
                ))}
              </div>
            </div>

            <div className="space-y-4">
              <div className="font-mono text-[10px] uppercase tracking-[0.24em] text-white/45">
                Engineering Specializations
              </div>
              <div className="divide-y divide-white/[0.08] border-y border-white/[0.08]">
                {specCerts.map((cert) => (
                  <div
                    key={cert.title}
                    className="cert-reveal py-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3"
                  >
                    <div className="flex items-start gap-3 min-w-0">
                      <span className="mt-0.5 shrink-0">{renderBrandMark(cert.brand)}</span>
                      <div className="min-w-0">
                        <div className="text-sm font-medium text-[#f2ede4]">{cert.title}</div>
                        <div className="font-mono text-[11px] text-white/45 mt-0.5">
                          {cert.issuer} · {cert.date}
                          {cert.credentialId ? ` · ${cert.credentialId}` : ""}
                        </div>
                        <div className="text-xs text-white/50 mt-0.5">{cert.detail}</div>
                      </div>
                    </div>
                    {cert.verifyUrl ? (
                      <a
                        href={cert.verifyUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="shrink-0 self-start sm:self-center font-mono text-[10px] uppercase tracking-widest text-[#9d8cff] hover:text-white transition-colors"
                      >
                        Verify ↗
                      </a>
                    ) : (
                      <span className="shrink-0 self-start sm:self-center font-mono text-[10px] uppercase tracking-widest text-white/30">
                        Completed
                      </span>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right: Community, GDG & Hackathons */}
          <div className="lg:col-span-5 space-y-6">
            <div className="cert-reveal studio-plate rounded-2xl p-6 space-y-5">
              <div className="font-mono text-[10px] uppercase tracking-[0.24em] text-[#e8a85a]">
                Hackathons &amp; Leadership
              </div>
              <div className="divide-y divide-white/[0.08]">
                {communityAndHackathons.map((item) => (
                  <div key={item.label} className="py-4 first:pt-1 last:pb-1 flex items-start gap-3">
                    <span
                      className="mt-1.5 h-2 w-2 rounded-full shrink-0"
                      style={{ background: item.accent }}
                    />
                    <div>
                      <div className="text-sm font-medium text-[#f2ede4]">{item.label}</div>
                      <p className="text-xs text-white/55 mt-1 leading-relaxed">{item.sub}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="cert-reveal studio-plate rounded-2xl p-6 space-y-3">
              <div className="font-mono text-[10px] uppercase tracking-[0.24em] text-[#9d8cff]">
                Focus Tracks · 2026
              </div>
              <div className="flex flex-wrap gap-2">
                {[
                  "Consensus & Storage Engines",
                  "Voice & Dialogue AI Agents",
                  "Read-Only NL2SQL Safety",
                  "Cloud & CI/CD Automation",
                  "Editorial Web Systems",
                ].map((track) => (
                  <span
                    key={track}
                    className="font-mono text-[10px] px-3 py-1.5 rounded-full border border-white/[0.12] text-white/70 bg-white/[0.02]"
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
