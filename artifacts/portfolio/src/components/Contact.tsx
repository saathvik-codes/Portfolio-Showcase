import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import emailjs from "@emailjs/browser";

gsap.registerPlugin(ScrollTrigger);

const EMAILJS_SERVICE_ID = "service_rqkh5ys";
const EMAILJS_TEMPLATE_ID = "template_qzgttb8";
const EMAILJS_AUTO_REPLY_ID = "template_2tzr8pi";
const EMAILJS_PUBLIC_KEY = import.meta.env.VITE_EMAILJS_PUBLIC_KEY as string | undefined;

const socials = [
  {
    label: "LinkedIn",
    handle: "saathvik-kalepu-17041228b",
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
    handle: "saathvik-codes",
    href: "https://github.com/saathvik-codes",
    icon: (
      <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor">
        <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0 1 12 6.844a9.59 9.59 0 0 1 2.504.337c1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0 0 22 12.017C22 6.484 17.522 2 12 2z"/>
      </svg>
    ),
  },
  {
    label: "Instagram",
    handle: "itz._.sunnyyy18",
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

const contactInfo = [
  {
    label: "Email",
    value: "saathvikk202@gmail.com",
    href: "mailto:saathvikk202@gmail.com",
    icon: (
      <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
        <rect x="2" y="4" width="20" height="16" rx="2"/>
        <path d="M2 8L12 14L22 8"/>
      </svg>
    ),
  },
  {
    label: "Phone",
    value: "+91 9908179816",
    href: "tel:+919908179816",
    icon: (
      <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
        <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 9.8 19.79 19.79 0 01.0 1.18 2 2 0 012 0h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L6.91 7.91a16 16 0 006.06 6.06l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z"/>
      </svg>
    ),
  },
  {
    label: "Location",
    value: "Hyderabad, India",
    href: null,
    icon: (
      <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
        <path d="M12 22s-8-4.5-8-11.8A8 8 0 0112 2a8 8 0 018 8.2c0 7.3-8 11.8-8 11.8z"/>
        <circle cx="12" cy="10" r="3"/>
      </svg>
    ),
  },
];

export default function Contact() {
  const sectionRef = useRef<HTMLElement>(null);
  const headRef = useRef<HTMLDivElement>(null);
  const formRef = useRef<HTMLFormElement>(null);
  const [copied, setCopied] = useState(false);
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);
  const [error, setError] = useState("");
  const [form, setForm] = useState({ name: "", email: "", subject: "", message: "" });

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(headRef.current, {
        y: 60, opacity: 0, duration: 1.2, ease: "power3.out",
        scrollTrigger: { trigger: sectionRef.current, start: "top 75%" },
      });
      gsap.from(".contact-info-chip", {
        y: 20, opacity: 0, duration: 0.5, stagger: 0.08, ease: "power3.out",
        scrollTrigger: { trigger: sectionRef.current, start: "top 68%" },
      });
      gsap.from(".contact-side-item", {
        x: -30, opacity: 0, duration: 0.7, stagger: 0.1, ease: "power3.out",
        scrollTrigger: { trigger: sectionRef.current, start: "top 60%" },
      });
      gsap.from(".form-field-anim", {
        y: 24, opacity: 0, duration: 0.6, stagger: 0.08, ease: "power3.out",
        scrollTrigger: { trigger: formRef.current, start: "top 80%" },
      });
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
      const pk = EMAILJS_PUBLIC_KEY || "";
      await emailjs.send(EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID, {
        from_name: form.name,
        from_email: form.email,
        subject: form.subject || "Portfolio Contact",
        message: form.message,
        to_name: "Saathvik",
      }, pk);
      if (pk) {
        await emailjs.send(EMAILJS_SERVICE_ID, EMAILJS_AUTO_REPLY_ID, {
          to_name: form.name,
          to_email: form.email,
        }, pk);
      }
      setSent(true);
      setForm({ name: "", email: "", subject: "", message: "" });
    } catch {
      setError("Something went wrong. Please email me directly.");
    } finally {
      setSending(false);
    }
  };

  return (
    <section
      ref={sectionRef}
      id="contact"
      className="relative py-24 md:py-36 px-4 sm:px-8 md:px-16 overflow-hidden"
      data-testid="contact-section"
    >
      {/* Ambient bg */}
      <div className="absolute inset-0 pointer-events-none" aria-hidden="true"
        style={{ background: "radial-gradient(ellipse 60% 60% at 80% 50%, rgba(139,92,246,0.06) 0%, transparent 70%)" }} />
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none overflow-hidden" aria-hidden="true">
        <span className="text-[clamp(6rem,18vw,16rem)] leading-none text-white/[0.012]"
          style={{ fontFamily: "'Syne', sans-serif", fontWeight: 800 }}>Hello.</span>
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="section-index mb-6">06 — Contact</div>

        {/* Big heading + info chips */}
        <div ref={headRef} className="mb-12 md:mb-16">
          <h2
            className="font-serif text-[clamp(2.5rem,7vw,7rem)] leading-tight text-white mb-5"
            style={{ fontFamily: "'Syne', sans-serif", fontWeight: 800 }}
            data-testid="contact-heading"
          >
            Let's build<br />
            <span className="gradient-text">something.</span>
          </h2>
          <p className="text-white/35 text-base md:text-lg leading-relaxed mb-8 max-w-lg">
            Open to internships, full-time roles, and interesting projects.
            Drop me a message — I respond within 24 hours.
          </p>

          {/* Contact info chips — prominently below heading */}
          <div className="flex flex-wrap gap-3">
            {contactInfo.map((info, i) => (
              info.href ? (
                <a key={i} href={info.href}
                  className="contact-info-chip group flex items-center gap-2.5 px-4 py-2.5 rounded-full border border-white/[0.07] bg-white/[0.03] hover:bg-violet-500/[0.08] hover:border-violet-500/30 transition-all duration-300"
                  data-hover="true">
                  <span className="text-violet-400/70 group-hover:text-violet-400 transition-colors">{info.icon}</span>
                  <div>
                    <div className="font-mono text-xs text-white/20 tracking-widest uppercase leading-none mb-0.5">{info.label}</div>
                    <div className="text-white/70 text-sm font-medium group-hover:text-white transition-colors">{info.value}</div>
                  </div>
                </a>
              ) : (
                <div key={i}
                  className="contact-info-chip flex items-center gap-2.5 px-4 py-2.5 rounded-full border border-white/[0.07] bg-white/[0.03]">
                  <span className="text-violet-400/50">{info.icon}</span>
                  <div>
                    <div className="font-mono text-xs text-white/20 tracking-widest uppercase leading-none mb-0.5">{info.label}</div>
                    <div className="text-white/50 text-sm">{info.value}</div>
                  </div>
                </div>
              )
            ))}

            {/* Copy email button */}
            <button onClick={copyEmail}
              className="contact-info-chip group flex items-center gap-2.5 px-4 py-2.5 rounded-full border border-white/[0.07] bg-white/[0.03] hover:bg-violet-500/[0.06] hover:border-violet-500/25 transition-all duration-300 cursor-pointer"
              data-hover="true">
              <span className="text-white/30 group-hover:text-violet-400 transition-colors">
                <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
                  {copied ? <path d="M5 12L10 17L19 8"/> : <><rect x="9" y="9" width="13" height="13" rx="2"/><path d="M5 15H4a2 2 0 01-2-2V4a2 2 0 012-2h9a2 2 0 012 2v1"/></>}
                </svg>
              </span>
              <span className="font-mono text-xs text-white/30 tracking-widest uppercase group-hover:text-violet-400/80 transition-colors">
                {copied ? "Copied!" : "Copy Email"}
              </span>
            </button>
          </div>
        </div>

        <div className="grid lg:grid-cols-[300px_1fr] gap-10 md:gap-14 items-start">
          {/* Left: socials */}
          <div>
            <div className="font-mono text-xs text-white/20 tracking-widest uppercase mb-4">Find me online</div>
            <div className="flex flex-col gap-2 mb-8">
              {socials.map((s, i) => (
                <a key={i} href={s.href} target="_blank" rel="noreferrer"
                  className="contact-side-item group flex items-center justify-between py-3.5 px-4 rounded-xl border border-white/[0.04] hover:border-violet-500/25 hover:bg-violet-500/[0.04] transition-all duration-300"
                  data-hover="true">
                  <div className="flex items-center gap-3">
                    <span className="text-white/25 group-hover:text-violet-400 transition-colors">{s.icon}</span>
                    <div>
                      <div className="font-mono text-xs text-white/20 tracking-widest uppercase">{s.label}</div>
                      <div className="text-white/50 text-xs mt-0.5 group-hover:text-white/80 transition-colors">{s.handle}</div>
                    </div>
                  </div>
                  <span className="text-white/15 group-hover:text-violet-400 transition-all group-hover:translate-x-0.5">↗</span>
                </a>
              ))}
            </div>

            {/* Availability badge */}
            <div className="p-4 rounded-xl border border-emerald-500/15 bg-emerald-500/[0.04]">
              <div className="flex items-center gap-2 mb-1">
                <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                <span className="font-mono text-xs text-emerald-400/80 tracking-widest uppercase">Available</span>
              </div>
              <p className="text-white/35 text-xs leading-relaxed">
                Open to internships and full-time opportunities starting 2025.
              </p>
            </div>
          </div>

          {/* Right: form */}
          <div>
            <div className="font-mono text-xs text-violet-400/50 tracking-widest uppercase mb-6">Send a Message</div>

            {sent ? (
              <div className="flex flex-col items-center justify-center py-20 text-center">
                <div className="w-16 h-16 rounded-full bg-violet-500/10 border border-violet-500/30 flex items-center justify-center mb-6">
                  <svg viewBox="0 0 24 24" width="28" height="28" fill="none" stroke="#a78bfa" strokeWidth="2" strokeLinecap="round">
                    <path d="M5 12L10 17L19 8"/>
                  </svg>
                </div>
                <h3 className="font-serif text-2xl text-white mb-2" style={{ fontFamily: "'Syne', sans-serif" }}>Message Sent!</h3>
                <p className="text-white/35 text-sm">I'll get back to you within 24 hours.</p>
                <button onClick={() => setSent(false)}
                  className="mt-8 font-mono text-xs tracking-widest uppercase text-violet-400/60 hover:text-violet-400 transition-colors duration-300">
                  Send Another →
                </button>
              </div>
            ) : (
              <form ref={formRef} onSubmit={handleSubmit} className="space-y-4" data-testid="contact-form">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="form-field-anim">
                    <label className="block font-mono text-xs text-white/25 tracking-widest uppercase mb-2">Name *</label>
                    <input type="text" name="name" value={form.name} onChange={handleChange}
                      placeholder="Your name" className="form-input-rounded" data-testid="contact-input-name"/>
                  </div>
                  <div className="form-field-anim">
                    <label className="block font-mono text-xs text-white/25 tracking-widest uppercase mb-2">Email *</label>
                    <input type="email" name="email" value={form.email} onChange={handleChange}
                      placeholder="your@email.com" className="form-input-rounded" data-testid="contact-input-email"/>
                  </div>
                </div>
                <div className="form-field-anim">
                  <label className="block font-mono text-xs text-white/25 tracking-widest uppercase mb-2">Subject</label>
                  <input type="text" name="subject" value={form.subject} onChange={handleChange}
                    placeholder="What's this about?" className="form-input-rounded" data-testid="contact-input-subject"/>
                </div>
                <div className="form-field-anim">
                  <label className="block font-mono text-xs text-white/25 tracking-widest uppercase mb-2">Message *</label>
                  <textarea name="message" value={form.message} onChange={handleChange}
                    placeholder="Tell me about your project or opportunity..." rows={5}
                    className="form-input-rounded resize-none" data-testid="contact-input-message"/>
                </div>

                {error && <p className="font-mono text-xs text-red-400/80">{error}</p>}

                <div className="form-field-anim pt-2">
                  <button type="submit" disabled={sending}
                    className="w-full py-4 rounded-2xl font-mono text-sm tracking-widest uppercase border border-violet-500/35 text-violet-400 hover:bg-violet-500/10 hover:border-violet-400/60 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-3"
                    data-hover="true" data-testid="contact-submit">
                    {sending ? (
                      <>
                        <svg className="animate-spin" viewBox="0 0 24 24" width="16" height="16" fill="none">
                          <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2" opacity="0.25"/>
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
