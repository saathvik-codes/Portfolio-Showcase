import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import RollingTitle from "./RollingTitle";
import { magneticMove, magneticLeave } from "@/lib/utils";

gsap.registerPlugin(ScrollTrigger);

const socials = [
  {
    label: "LinkedIn",
    handle: "linkedin.com/in/saathvik-kalepu-17041228b",
    href: "https://linkedin.com/in/saathvik-kalepu-17041228b",
    icon: (
      <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor">
        <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6zM2 9h4v12H2z"/>
        <circle cx="4" cy="4" r="2"/>
      </svg>
    ),
  },
  {
    label: "GitHub",
    handle: "github.com/saathvik-codes",
    href: "https://github.com/saathvik-codes",
    icon: (
      <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor">
        <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0 1 12 6.844a9.59 9.59 0 0 1 2.504.337c1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0 0 22 12.017C22 6.484 17.522 2 12 2z"/>
      </svg>
    ),
  },
  {
    label: "LeetCode",
    handle: "leetcode.com/u/Sunny550",
    href: "https://leetcode.com/u/Sunny550/",
    icon: (
      <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M14 4L6 12l8 8"/>
        <path d="M8 12h10"/>
        <path d="M15 6l3 3"/>
      </svg>
    ),
  },
  {
    label: "Instagram",
    handle: "instagram.com/itz._.sunnyyy18",
    href: "https://www.instagram.com/itz._.sunnyyy18/",
    icon: (
      <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="2" width="20" height="20" rx="5"/>
        <circle cx="12" cy="12" r="4"/>
        <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none"/>
      </svg>
    ),
  },
];

export default function Contact() {
  const sectionRef = useRef<HTMLElement>(null);
  const formRef = useRef<HTMLFormElement>(null);
  const [copied, setCopied] = useState(false);
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);
  const [error, setError] = useState("");
  const [form, setForm] = useState({ name: "", email: "", subject: "", message: "" });

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".contact-left > *",
        { y: 24, opacity: 0, scale: 0.98 },
        {
          y: 0,
          opacity: 1,
          scale: 1,
          duration: 0.55,
          stagger: 0.07,
          ease: "power2.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 74%",
            end: "bottom 18%",
            toggleActions: "play reverse play reverse",
          },
        },
      );
      gsap.fromTo(
        ".form-field-anim",
        { y: 18, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.45,
          stagger: 0.06,
          ease: "power2.out",
          scrollTrigger: {
            trigger: formRef.current,
            start: "top 86%",
            end: "bottom 12%",
            toggleActions: "play reverse play reverse",
          },
        },
      );
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  const copyEmail = () => {
    navigator.clipboard.writeText("saathvikk202@gmail.com");
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));
    setError("");
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.message) {
      setError("Please fill in all required fields.");
      return;
    }
    setSending(true);
    setError("");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(form),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || "Something went wrong.");
      }

      setSent(true);
      setForm({ name: "", email: "", subject: "", message: "" });
    } catch (sendError) {
      console.error("API send failed", sendError);
      const message = sendError instanceof Error ? sendError.message : "Unknown error";
      setError(`Failed: ${message}. Please email me directly at saathvikk202@gmail.com`);
    } finally {
      setSending(false);
    }
  };

  return (
    <section
      ref={sectionRef}
      id="contact"
      className="relative py-20 md:py-36 px-4 sm:px-8 md:px-16 overflow-hidden"
      data-testid="contact-section"
    >
      {/* Ambient bg */}
      <div className="absolute inset-0 pointer-events-none"
        style={{ background: "radial-gradient(ellipse 50% 60% at 80% 50%, rgba(139,92,246,0.06) 0%, transparent 70%)" }} />

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="section-index mb-6">06 — Contact</div>

        {/* Section heading */}
        <div className="mb-10 md:mb-16">
          <RollingTitle
            lines={[
              { text: "Let's build" },
              { text: "something.", gradient: true },
            ]}
            className="font-serif text-[clamp(1.75rem,8.4vw,2.15rem)] md:text-[clamp(2.5rem,7vw,7rem)] leading-[1.06] md:leading-[1.05] text-white mb-4"
            testId="contact-heading"
          />
          <p className="text-white/40 text-sm sm:text-base md:text-lg leading-relaxed max-w-xl">
            Open to internships, full-time roles, and interesting projects.
            Drop a message — I respond within 24 hours.
          </p>
        </div>

        {/* Main 2-col layout */}
        <div className="grid lg:grid-cols-[340px_1fr] gap-8 md:gap-14 items-start">

          {/* LEFT COLUMN: contact info + socials */}
          <div className="contact-left space-y-6">

            {/* Contact details block */}
            <div className="glass-card rounded-2xl p-4 sm:p-6 space-y-5">
              <div className="font-mono text-xs text-white/30 tracking-widest uppercase mb-2">Get in touch</div>

              {/* Email */}
              <a
                href="mailto:saathvikk202@gmail.com"
                className="group flex items-center gap-3 hover:text-violet-300 transition-colors duration-300"
                data-hover="true"
              >
                <div className="w-9 h-9 rounded-lg flex items-center justify-center shrink-0 text-violet-400/70 group-hover:text-violet-400 group-hover:bg-violet-500/10 transition-all"
                  style={{ border: "1px solid rgba(167,139,250,0.2)" }}>
                  <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round">
                    <rect x="2" y="4" width="20" height="16" rx="2.5"/><path d="M2 8L12 14L22 8"/>
                  </svg>
                </div>
                <div>
                  <div className="font-mono text-xs text-white/25 tracking-widest uppercase">Email</div>
                  <div className="text-white/80 text-xs sm:text-sm font-medium group-hover:text-white transition-colors break-all">saathvikk202@gmail.com</div>
                </div>
              </a>

              {/* Phone */}
              <a
                href="tel:+919908179816"
                className="group flex items-center gap-3 hover:text-violet-300 transition-colors duration-300"
                data-hover="true"
              >
                <div className="w-9 h-9 rounded-lg flex items-center justify-center shrink-0 text-violet-400/50 group-hover:text-violet-400 group-hover:bg-violet-500/10 transition-all"
                  style={{ border: "1px solid rgba(255,255,255,0.08)" }}>
                  <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round">
                    <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 9.8 19.79 19.79 0 01.0 1.18 2 2 0 012 0h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L6.91 7.91a16 16 0 006.06 6.06l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z"/>
                  </svg>
                </div>
                <div>
                  <div className="font-mono text-xs text-white/25 tracking-widest uppercase">Phone</div>
                  <div className="text-white/70 text-xs sm:text-sm group-hover:text-white/90 transition-colors">+91 9908179816</div>
                </div>
              </a>

              {/* Location */}
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-lg flex items-center justify-center shrink-0 text-violet-400/40"
                  style={{ border: "1px solid rgba(255,255,255,0.07)" }}>
                  <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round">
                    <path d="M12 22s-8-4.5-8-11.8A8 8 0 0112 2a8 8 0 018 8.2c0 7.3-8 11.8-8 11.8z"/>
                    <circle cx="12" cy="10" r="3"/>
                  </svg>
                </div>
                <div>
                  <div className="font-mono text-xs text-white/25 tracking-widest uppercase">Location</div>
                  <div className="text-white/55 text-sm">Hyderabad, India</div>
                </div>
              </div>

              {/* Copy email button */}
              <button
                onClick={copyEmail}
                className="group w-full flex items-center justify-center gap-2 py-2.5 rounded-xl border border-white/[0.096] text-white/30 hover:text-violet-400 hover:border-violet-500/25 hover:bg-violet-500/[0.04] transition-all duration-300 font-mono text-xs tracking-widest uppercase"
                data-hover="true"
              >
                <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
                  {copied ? <path d="M5 12L10 17L19 8"/> : <><rect x="9" y="9" width="13" height="13" rx="2"/><path d="M5 15H4a2 2 0 01-2-2V4a2 2 0 012-2h9a2 2 0 012 2v1"/></>}
                </svg>
                {copied ? "Copied!" : "Copy email address"}
              </button>
            </div>

            {/* Social links */}
            <div>
              <div className="font-mono text-xs text-white/25 tracking-widest uppercase mb-3">Find me online</div>
              <div className="flex flex-wrap gap-3">
                {socials.map((s, i) => (
                  <a
                    key={i}
                    href={s.href}
                    target="_blank"
                    rel="noreferrer"
                    className="group flex h-11 w-11 items-center justify-center rounded-xl border border-white/[0.096] text-white/32 hover:border-violet-500/30 hover:bg-violet-500/[0.06] hover:text-violet-300 transition-all duration-300"
                    data-hover="true"
                    aria-label={s.label}
                    title={s.label}
                  >
                    {s.icon}
                  </a>
                ))}
              </div>
            </div>

            {/* Availability */}
            <div className="flex items-center gap-3 px-4 py-3 rounded-xl border border-emerald-500/15 bg-emerald-500/[0.04]">
              <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse shrink-0" />
              <span className="font-mono text-[11px] sm:text-xs text-emerald-400/70">Usually replies within 24 hours</span>
            </div>
          </div>

          {/* RIGHT COLUMN: form */}
          <div>
            <div className="font-mono text-xs text-violet-400/50 tracking-widest uppercase mb-6">Send a Message</div>

            {sent ? (
              <div className="glass-card flex flex-col items-center justify-center py-24 text-center rounded-2xl">
                <div className="w-16 h-16 rounded-full border border-violet-500/30 bg-violet-500/10 flex items-center justify-center mb-6">
                  <svg viewBox="0 0 24 24" width="28" height="28" fill="none" stroke="#a78bfa" strokeWidth="2" strokeLinecap="round">
                    <path d="M5 12L10 17L19 8"/>
                  </svg>
                </div>
                <h3 className="font-serif text-2xl text-white mb-2" style={{ fontFamily: "'Syne', sans-serif" }}>Message Sent!</h3>
                <p className="text-white/35 text-sm">I'll get back to you within 24 hours.</p>
                <button onClick={() => setSent(false)}
                  className="mt-8 font-mono text-xs tracking-widest uppercase text-violet-400/60 hover:text-violet-400 transition-colors">
                  Send Another →
                </button>
              </div>
            ) : (
              <form ref={formRef} onSubmit={handleSubmit} className="space-y-4" data-testid="contact-form">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="form-field-anim">
                    <label className="block font-mono text-xs text-white/30 tracking-widest uppercase mb-2">Name *</label>
                    <input type="text" name="name" value={form.name} onChange={handleChange}
                      placeholder="Your name" className="form-input-rounded" data-testid="contact-input-name"/>
                  </div>
                  <div className="form-field-anim">
                    <label className="block font-mono text-xs text-white/30 tracking-widest uppercase mb-2">Email *</label>
                    <input type="email" name="email" value={form.email} onChange={handleChange}
                      placeholder="your@email.com" className="form-input-rounded" data-testid="contact-input-email"/>
                  </div>
                </div>
                <div className="form-field-anim">
                  <label className="block font-mono text-xs text-white/30 tracking-widest uppercase mb-2">Subject</label>
                  <input type="text" name="subject" value={form.subject} onChange={handleChange}
                    placeholder="What's this about?" className="form-input-rounded" data-testid="contact-input-subject"/>
                </div>
                <div className="form-field-anim">
                  <label className="block font-mono text-xs text-white/30 tracking-widest uppercase mb-2">Message *</label>
                  <textarea name="message" value={form.message} onChange={handleChange}
                    placeholder="Tell me about your project or opportunity..." rows={6}
                    className="form-input-rounded resize-none" data-testid="contact-input-message"/>
                </div>

                {error && (
                  <p className="font-mono text-xs text-red-400/80 px-1">{error}</p>
                )}

                <div className="form-field-anim pt-1">
                  <button type="submit" disabled={sending}
                    className="shimmer-btn w-full py-3.5 sm:py-4 rounded-xl sm:rounded-2xl font-mono text-xs sm:text-sm tracking-widest uppercase border border-violet-500/40 text-violet-400 hover:bg-violet-500/10 hover:border-violet-400/70 transition-all duration-300 disabled:opacity-40 disabled:cursor-not-allowed flex items-center justify-center gap-3 will-change-transform"
                    style={{ transition: "transform 0.2s ease, background-color 0.3s ease, border-color 0.3s ease" }}
                    onMouseMove={(e) => !sending && magneticMove(e, 0.15)}
                    onMouseLeave={magneticLeave}
                    data-hover="true" data-testid="contact-submit">
                    {sending ? (
                      <>
                        <svg className="animate-spin" viewBox="0 0 24 24" width="16" height="16" fill="none">
                          <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2" opacity="0.2"/>
                          <path d="M12 2C6.48 2 2 6.48 2 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                        </svg>
                        Sending…
                      </>
                    ) : "Send Message →"}
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
