import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import emailjs from "@emailjs/browser";

gsap.registerPlugin(ScrollTrigger);

const EMAILJS_SERVICE_ID = "service_rqkh5ys";
const EMAILJS_TEMPLATE_ID = "template_qzgttb8";
const EMAILJS_AUTO_REPLY_ID = "template_2tzr8pi";
const EMAILJS_PUBLIC_KEY = import.meta.env.VITE_EMAILJS_PUBLIC_KEY as string | undefined;

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
      gsap.from(".contact-item", {
        x: -40, opacity: 0, duration: 0.8, stagger: 0.12, ease: "power3.out",
        scrollTrigger: { trigger: sectionRef.current, start: "top 65%" },
      });
      gsap.from(".contact-form-field", {
        y: 30, opacity: 0, duration: 0.7, stagger: 0.1, ease: "power3.out",
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
      const publicKey = EMAILJS_PUBLIC_KEY || "";
      await emailjs.send(
        EMAILJS_SERVICE_ID,
        EMAILJS_TEMPLATE_ID,
        {
          from_name: form.name,
          from_email: form.email,
          subject: form.subject || "Portfolio Contact",
          message: form.message,
          to_name: "Saathvik",
        },
        publicKey
      );
      // Auto-reply
      if (publicKey) {
        await emailjs.send(
          EMAILJS_SERVICE_ID,
          EMAILJS_AUTO_REPLY_ID,
          { to_name: form.name, to_email: form.email },
          publicKey
        );
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
      className="relative py-36 px-8 md:px-16 overflow-hidden"
      data-testid="contact-section"
    >
      {/* Large bg text */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none overflow-hidden" aria-hidden="true">
        <span className="text-[clamp(8rem,20vw,18rem)] font-800 text-white/[0.015] leading-none"
          style={{ fontFamily: "'Syne', sans-serif", fontWeight: 800 }}>
          Hello.
        </span>
      </div>
      {/* Radial glow */}
      <div className="absolute inset-0 pointer-events-none"
        style={{ background: "radial-gradient(ellipse 60% 50% at 100% 50%, rgba(139,92,246,0.05) 0%, transparent 70%)" }} />

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="section-index mb-6">06 — Contact</div>

        <div ref={headRef} className="mb-16">
          <h2
            className="font-serif text-[clamp(3rem,7vw,7rem)] font-800 leading-tight text-white"
            style={{ fontFamily: "'Syne', sans-serif", fontWeight: 800 }}
            data-testid="contact-heading"
          >
            Let's build<br />
            <span className="gradient-text">something.</span>
          </h2>
          <p className="text-white/35 text-lg leading-relaxed mt-6 max-w-lg">
            Open to internships, full-time roles, and interesting projects.
            Drop me a message — I respond within 24 hours.
          </p>
        </div>

        <div className="grid lg:grid-cols-[1fr_1.4fr] gap-16 items-start">
          {/* Left: Info */}
          <div className="space-y-10">
            <a
              href="mailto:saathvikk202@gmail.com"
              className="contact-item group flex items-center gap-5 text-white hover:text-violet-300 transition-colors duration-300"
              data-hover="true"
              data-testid="contact-email-link"
            >
              <div className="w-14 h-14 border border-violet-500/25 flex items-center justify-center rounded-lg group-hover:border-violet-400/50 group-hover:bg-violet-500/10 transition-all duration-300">
                <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="#a78bfa" strokeWidth="1.5" strokeLinecap="round">
                  <rect x="2" y="4" width="20" height="16" rx="2"/>
                  <path d="M2 8L12 14L22 8"/>
                </svg>
              </div>
              <div>
                <div className="font-mono text-xs text-white/25 tracking-widest uppercase mb-1">Email</div>
                <div className="text-base font-medium">saathvikk202@gmail.com</div>
              </div>
            </a>

            <div
              className="contact-item group flex items-center gap-5 cursor-pointer"
              onClick={copyEmail}
              data-hover="true"
              data-testid="contact-copy-email"
            >
              <div className="w-14 h-14 border border-white/8 flex items-center justify-center rounded-lg group-hover:border-violet-400/25 group-hover:bg-violet-500/5 transition-all duration-300">
                <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" className="text-white/30 group-hover:text-violet-400 transition-colors">
                  {copied ? (
                    <path d="M5 12L10 17L19 8"/>
                  ) : (
                    <>
                      <rect x="9" y="9" width="13" height="13" rx="2"/>
                      <path d="M5 15H4C2.9 15 2 14.1 2 13V4C2 2.9 2.9 2 4 2H13C14.1 2 15 2.9 15 4V5"/>
                    </>
                  )}
                </svg>
              </div>
              <div className="font-mono text-xs text-white/25 tracking-widest uppercase transition-colors duration-300 group-hover:text-violet-400/70">
                {copied ? "Copied!" : "Copy Email"}
              </div>
            </div>

            <a
              href="tel:+919908179816"
              className="contact-item group flex items-center gap-5 text-white/30 hover:text-white/70 transition-colors duration-300"
              data-hover="true"
              data-testid="contact-phone"
            >
              <div className="w-14 h-14 border border-white/6 flex items-center justify-center rounded-lg group-hover:border-violet-400/20 transition-all duration-300">
                <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
                  <path d="M22 16.92V19.92C22 20.48 21.73 21 21.27 21.34C20.81 21.68 20.23 21.79 19.69 21.64C16.41 20.71 13.33 19.02 10.77 16.73C8.39 14.62 6.53 12.07 5.44 9.24C5.29 8.7 5.41 8.12 5.75 7.66C6.09 7.2 6.61 6.94 7.17 6.94H10.17C10.99 6.94 11.71 7.51 11.92 8.31L12.87 12.06C13.05 12.76 12.79 13.5 12.24 13.93L10.91 14.94C11.79 16.47 13.45 17.85 15.23 18.62L16.06 17.5C16.5 16.95 17.24 16.71 17.94 16.9L21.69 17.85C22.49 18.06 23.06 18.78 23.06 19.6"/>
                </svg>
              </div>
              <div>
                <div className="font-mono text-xs text-white/20 tracking-widest uppercase mb-1">Phone</div>
                <div className="text-base">+91 9908179816</div>
              </div>
            </a>

            {/* Socials */}
            <div className="pt-6 border-t border-white/5">
              <div className="font-mono text-xs text-violet-400/50 tracking-widest uppercase mb-5">Find me online</div>
              {[
                {
                  label: "LinkedIn", handle: "saathvik-kalepu-17041228b",
                  href: "https://linkedin.com/in/saathvik-kalepu-17041228b",
                  icon: <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6zM2 9h4v12H2z"/><circle cx="4" cy="4" r="2"/></svg>,
                },
                {
                  label: "GitHub", handle: "saathvik-codes",
                  href: "https://github.com/saathvik-codes",
                  icon: <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor"><path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0 1 12 6.844a9.59 9.59 0 0 1 2.504.337c1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0 0 22 12.017C22 6.484 17.522 2 12 2z"/></svg>,
                },
              ].map((link, i) => (
                <a
                  key={i}
                  href={link.href}
                  target="_blank"
                  rel="noreferrer"
                  className="contact-item group flex items-center justify-between py-4 border-b border-white/5 hover:border-violet-500/25 transition-all duration-300"
                  data-hover="true"
                  data-testid={`contact-social-${link.label.toLowerCase()}`}
                >
                  <div className="flex items-center gap-3">
                    <span className="text-violet-400/40 group-hover:text-violet-400 transition-colors duration-300">{link.icon}</span>
                    <div>
                      <div className="font-mono text-xs text-white/20 tracking-widest uppercase">{link.label}</div>
                      <div className="text-white/50 text-sm mt-0.5 group-hover:text-white/80 transition-colors duration-300">{link.handle}</div>
                    </div>
                  </div>
                  <span className="text-white/15 group-hover:text-violet-400 transition-all duration-300 -translate-x-1 group-hover:translate-x-0">↗</span>
                </a>
              ))}
            </div>
          </div>

          {/* Right: Form */}
          <div>
            <div className="font-mono text-xs text-violet-400/60 tracking-widest uppercase mb-8">Send a Message</div>

            {sent ? (
              <div className="flex flex-col items-center justify-center py-20 text-center">
                <div className="w-16 h-16 rounded-full bg-violet-500/10 border border-violet-500/30 flex items-center justify-center mb-6">
                  <svg viewBox="0 0 24 24" width="28" height="28" fill="none" stroke="#a78bfa" strokeWidth="2" strokeLinecap="round">
                    <path d="M5 12L10 17L19 8"/>
                  </svg>
                </div>
                <h3 className="font-serif text-2xl text-white mb-2" style={{ fontFamily: "'Syne', sans-serif" }}>
                  Message Sent!
                </h3>
                <p className="text-white/35 text-sm">I'll get back to you within 24 hours.</p>
                <button
                  onClick={() => setSent(false)}
                  className="mt-8 font-mono text-xs tracking-widest uppercase text-violet-400/60 hover:text-violet-400 transition-colors duration-300"
                  data-testid="send-another"
                >
                  Send Another →
                </button>
              </div>
            ) : (
              <form ref={formRef} onSubmit={handleSubmit} className="space-y-8" data-testid="contact-form">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                  <div className="contact-form-field">
                    <label className="block font-mono text-xs text-white/25 tracking-widest uppercase mb-3">Name *</label>
                    <input
                      type="text"
                      name="name"
                      value={form.name}
                      onChange={handleChange}
                      placeholder="Your name"
                      className="form-input"
                      data-testid="contact-input-name"
                    />
                  </div>
                  <div className="contact-form-field">
                    <label className="block font-mono text-xs text-white/25 tracking-widest uppercase mb-3">Email *</label>
                    <input
                      type="email"
                      name="email"
                      value={form.email}
                      onChange={handleChange}
                      placeholder="your@email.com"
                      className="form-input"
                      data-testid="contact-input-email"
                    />
                  </div>
                </div>

                <div className="contact-form-field">
                  <label className="block font-mono text-xs text-white/25 tracking-widest uppercase mb-3">Subject</label>
                  <input
                    type="text"
                    name="subject"
                    value={form.subject}
                    onChange={handleChange}
                    placeholder="What's this about?"
                    className="form-input"
                    data-testid="contact-input-subject"
                  />
                </div>

                <div className="contact-form-field">
                  <label className="block font-mono text-xs text-white/25 tracking-widest uppercase mb-3">Message *</label>
                  <textarea
                    name="message"
                    value={form.message}
                    onChange={handleChange}
                    placeholder="Tell me about your project or opportunity..."
                    rows={5}
                    className="form-input resize-none"
                    data-testid="contact-input-message"
                  />
                </div>

                {error && (
                  <p className="font-mono text-xs text-red-400/80 tracking-wide">{error}</p>
                )}

                <button
                  type="submit"
                  disabled={sending}
                  className="w-full py-4 font-mono text-sm tracking-widest uppercase border border-violet-500/40 text-violet-400 hover:bg-violet-500/10 hover:border-violet-400 transition-all duration-300 rounded-sm disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-3"
                  data-hover="true"
                  data-testid="contact-submit"
                >
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

                {!EMAILJS_PUBLIC_KEY && (
                  <p className="font-mono text-xs text-white/15 text-center">
                    Set <code className="text-violet-400/40">VITE_EMAILJS_PUBLIC_KEY</code> in Secrets to enable form submission.
                  </p>
                )}
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
