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
        { y: 14, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.45,
          stagger: 0.045,
          ease: "power2.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 85%",
            toggleActions: "play none none none",
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
      className="relative py-20 md:py-28 px-5 sm:px-8 border-b border-[#e4e2dd]"
      data-testid="certifications-section"
    >
      <div className="max-w-6xl mx-auto space-y-12">
        <div className="cert-reveal flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <div className="section-kicker mb-2">05 · Credentials &amp; Community</div>
            <h2 className="text-3xl sm:text-4xl font-bold tracking-[-0.025em] text-[#141413]">
              Audited{" "}
              <span className="font-serif-editorial italic font-normal text-[#57534e]">
                foundations.
              </span>
            </h2>
          </div>
          <p className="text-sm text-[#57534e] max-w-md">
            Every certificate lists its issuer, completion metric, credential ID, and direct verification link.
          </p>
        </div>

        <div className="grid lg:grid-cols-12 gap-10">
          {/* Left: Core + Specialization Certificates */}
          <div className="lg:col-span-7 space-y-8">
            <div className="space-y-3">
              <div className="font-mono text-xs font-medium text-[#2563eb]">
                Cloud, Networking &amp; AI Core
              </div>
              <div className="space-y-3">
                {coreCerts.map((cert) => (
                  <div
                    key={cert.title}
                    className="cert-reveal clean-card rounded-xl p-4 sm:p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4 hover:border-[#c8c4ba] transition-colors"
                  >
                    <div className="flex items-start gap-3.5 min-w-0">
                      <span className="mt-0.5 shrink-0">{renderBrandMark(cert.brand)}</span>
                      <div className="min-w-0 space-y-1">
                        <h3 className="text-sm sm:text-base font-semibold text-[#141413]">
                          {cert.title}
                        </h3>
                        <p className="font-mono text-[11px]" style={{ color: cert.accent }}>
                          {cert.issuer} · {cert.date}
                        </p>
                        <p className="text-xs text-[#57534e]">{cert.detail}</p>
                        {cert.credentialId && (
                          <p className="font-mono text-[10px] text-[#78716c] break-all">
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
                        className="shrink-0 self-start sm:self-center px-3.5 py-1.5 rounded-full bg-[#f3f1ec] border border-[#dcd9d0] font-mono text-[11px] font-medium text-[#141413] hover:bg-[#141413] hover:text-[#faf9f6] hover:border-[#141413] transition-colors"
                      >
                        Verify ↗
                      </a>
                    )}
                  </div>
                ))}
              </div>
            </div>

            <div className="space-y-3">
              <div className="font-mono text-xs font-medium text-[#57534e]">
                Engineering Specializations
              </div>
              <div className="divide-y divide-[#e4e2dd] border-y border-[#e4e2dd]">
                {specCerts.map((cert) => (
                  <div
                    key={cert.title}
                    className="cert-reveal py-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3"
                  >
                    <div className="flex items-start gap-3 min-w-0">
                      <span className="mt-0.5 shrink-0">{renderBrandMark(cert.brand)}</span>
                      <div className="min-w-0">
                        <div className="text-sm font-semibold text-[#141413]">{cert.title}</div>
                        <div className="font-mono text-[11px] text-[#57534e] mt-0.5">
                          {cert.issuer} · {cert.date}
                          {cert.credentialId ? ` · ${cert.credentialId}` : ""}
                        </div>
                        <div className="text-xs text-[#78716c] mt-0.5">{cert.detail}</div>
                      </div>
                    </div>
                    {cert.verifyUrl ? (
                      <a
                        href={cert.verifyUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="shrink-0 self-start sm:self-center font-mono text-[11px] font-medium text-[#2563eb] hover:underline underline-offset-4"
                      >
                        Verify ↗
                      </a>
                    ) : (
                      <span className="shrink-0 self-start sm:self-center font-mono text-[11px] text-[#78716c]">
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
            <div className="cert-reveal clean-card rounded-2xl p-6 space-y-4">
              <div className="font-mono text-xs font-medium text-[#2563eb]">
                Hackathons &amp; Leadership
              </div>
              <div className="divide-y divide-[#eceae4]">
                {communityAndHackathons.map((item) => (
                  <div key={item.label} className="py-3.5 first:pt-1 last:pb-1 flex items-start gap-3">
                    <span className="mt-2 h-1.5 w-1.5 rounded-full bg-[#2563eb] shrink-0" />
                    <div>
                      <div className="text-sm font-semibold text-[#141413]">{item.label}</div>
                      <p className="text-xs text-[#57534e] mt-1 leading-relaxed">{item.sub}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="cert-reveal clean-card rounded-2xl p-6 space-y-3">
              <div className="font-mono text-xs font-medium text-[#57534e]">
                Focus Tracks · 2026
              </div>
              <div className="flex flex-wrap gap-1.5">
                {[
                  "Consensus & Storage Engines",
                  "Voice & Dialogue AI Agents",
                  "Read-Only NL2SQL Safety",
                  "Cloud & CI/CD Automation",
                  "Clean Product Interfaces",
                ].map((track) => (
                  <span
                    key={track}
                    className="font-mono text-[11px] px-3 py-1 rounded-full bg-[#f3f1ec] border border-[#e4e2dd] text-[#57534e]"
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
