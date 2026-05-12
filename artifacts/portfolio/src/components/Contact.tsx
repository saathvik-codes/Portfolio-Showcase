import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function Contact() {
  const sectionRef = useRef<HTMLElement>(null);
  const headRef = useRef<HTMLDivElement>(null);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(headRef.current, {
        y: 60,
        opacity: 0,
        duration: 1.2,
        ease: "power3.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 75%",
        },
      });

      gsap.from(".contact-item", {
        x: -40,
        opacity: 0,
        duration: 0.8,
        stagger: 0.12,
        ease: "power3.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 65%",
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const copyEmail = () => {
    navigator.clipboard.writeText("saathvikk202@gmail.com");
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section
      ref={sectionRef}
      id="contact"
      className="relative py-40 px-8 md:px-16 overflow-hidden"
      data-testid="contact-section"
    >
      {/* Large background text */}
      <div
        className="absolute inset-0 flex items-center justify-center pointer-events-none select-none overflow-hidden"
        aria-hidden="true"
      >
        <span
          className="text-[clamp(8rem,20vw,18rem)] font-800 text-white/[0.015] leading-none"
          style={{ fontFamily: "'Syne', sans-serif", fontWeight: 800 }}
        >
          Hello.
        </span>
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="section-index mb-6">05 — Contact</div>

        <div ref={headRef} className="max-w-3xl mb-20">
          <h2
            className="font-serif text-[clamp(3rem,7vw,7rem)] font-800 leading-tight text-white"
            style={{ fontFamily: "'Syne', sans-serif", fontWeight: 800 }}
            data-testid="contact-heading"
          >
            Let's build<br />
            <span className="gradient-text">something.</span>
          </h2>
          <p className="text-white/35 text-lg leading-relaxed mt-8 max-w-lg">
            Open to internships, full-time roles, and interesting projects.
            If you have something in mind, reach out — I'd love to connect.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-16 items-start">
          {/* Left: CTA */}
          <div className="space-y-8">
            <a
              href="mailto:saathvikk202@gmail.com"
              className="group flex items-center gap-5 text-white hover:text-violet-300 transition-colors duration-300"
              data-hover="true"
              data-testid="contact-email-link"
            >
              <div className="w-12 h-12 border border-violet-500/30 flex items-center justify-center rounded-sm group-hover:border-violet-400/60 group-hover:bg-violet-500/10 transition-all duration-300">
                <span className="text-violet-400 text-lg">✉</span>
              </div>
              <div>
                <div className="font-mono text-xs text-white/30 tracking-widest uppercase mb-1">Email</div>
                <div className="text-base font-medium">saathvikk202@gmail.com</div>
              </div>
            </a>

            <div
              className="group flex items-center gap-5 cursor-pointer"
              onClick={copyEmail}
              data-hover="true"
              data-testid="contact-copy-email"
            >
              <div className="w-12 h-12 border border-white/10 flex items-center justify-center rounded-sm group-hover:border-violet-400/30 group-hover:bg-violet-500/5 transition-all duration-300">
                <span className="text-white/30 text-lg group-hover:text-violet-400 transition-colors duration-300">
                  {copied ? "✓" : "⎘"}
                </span>
              </div>
              <div className="font-mono text-xs text-white/30 tracking-widest uppercase transition-colors duration-300 group-hover:text-white/50">
                {copied ? "Copied!" : "Copy Email"}
              </div>
            </div>

            <a
              href="tel:+919908179816"
              className="group flex items-center gap-5 text-white/30 hover:text-white/70 transition-colors duration-300"
              data-hover="true"
              data-testid="contact-phone"
            >
              <div className="w-12 h-12 border border-white/8 flex items-center justify-center rounded-sm group-hover:border-violet-400/30 transition-all duration-300">
                <span className="text-lg">☎</span>
              </div>
              <div>
                <div className="font-mono text-xs text-white/20 tracking-widest uppercase mb-1">Phone</div>
                <div className="text-base">+91 9908179816</div>
              </div>
            </a>
          </div>

          {/* Right: Links */}
          <div className="space-y-4">
            <div className="font-mono text-xs text-violet-400/60 tracking-widest uppercase mb-8">Find me online</div>

            {[
              {
                label: "LinkedIn",
                handle: "saathvik-kalepu-17041228b",
                href: "https://linkedin.com/in/saathvik-kalepu-17041228b",
                icon: "in",
              },
              {
                label: "GitHub",
                handle: "saathvik-codes",
                href: "https://github.com/saathvik-codes",
                icon: "gh",
              },
              {
                label: "Location",
                handle: "Hyderabad, India",
                href: "#",
                icon: "◉",
              },
            ].map((link, i) => (
              <a
                key={i}
                href={link.href}
                target={link.href !== "#" ? "_blank" : undefined}
                rel="noreferrer"
                className="contact-item group flex items-center justify-between py-5 border-b border-white/5 hover:border-violet-500/30 transition-all duration-300"
                data-hover="true"
                data-testid={`contact-social-${link.label.toLowerCase()}`}
              >
                <div className="flex items-center gap-4">
                  <span className="font-mono text-xs text-violet-400/50 w-6">{link.icon}</span>
                  <div>
                    <div className="font-mono text-xs text-white/25 tracking-widest uppercase">{link.label}</div>
                    <div className="text-white/60 text-sm mt-0.5 group-hover:text-white/90 transition-colors duration-300">
                      {link.handle}
                    </div>
                  </div>
                </div>
                <span className="text-white/20 group-hover:text-violet-400 transition-all duration-300 -translate-x-2 group-hover:translate-x-0">
                  ↗
                </span>
              </a>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
