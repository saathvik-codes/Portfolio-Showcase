import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { magneticMove, magneticLeave } from "@/lib/utils";
import { profile, socialLinks } from "@/data/portfolioData";

gsap.registerPlugin(ScrollTrigger);

export default function Contact() {
  const sectionRef = useRef<HTMLElement>(null);
  const [copied, setCopied] = useState(false);
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);
  const [error, setError] = useState("");
  const [form, setForm] = useState({ name: "", email: "", subject: "", message: "" });

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".contact-reveal",
        { y: 22, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.6,
          stagger: 0.08,
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

  const copyEmail = () => {
    navigator.clipboard.writeText(profile.email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    setError("");
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.message) {
      setError("Please fill in your name, email, and message.");
      return;
    }
    setSending(true);
    setError("");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Something went wrong.");
      setSent(true);
      setForm({ name: "", email: "", subject: "", message: "" });
    } catch (sendError) {
      const msg = sendError instanceof Error ? sendError.message : "Unknown error";
      setError(`Could not send (${msg}). Reach me directly at ${profile.email}.`);
    } finally {
      setSending(false);
    }
  };

  return (
    <section
      ref={sectionRef}
      id="contact"
      className="relative py-20 md:py-32 px-5 sm:px-10 md:px-14 border-t border-white/[0.08]"
      data-testid="contact-section"
    >
      <div className="max-w-7xl mx-auto space-y-12">
        <div className="contact-reveal flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-white/[0.1] pb-8">
          <div>
            <div className="section-index mb-3">06 — Start a Conversation</div>
            <h2 className="text-[clamp(2.4rem,5.8vw,5rem)] leading-[0.94] font-display font-bold text-[#f2ede4]">
              Have a hard problem?{" "}
              <span className="font-serif-editorial italic font-normal text-[#e8a85a]">
                Let&rsquo;s build through it.
              </span>
            </h2>
          </div>
          <p className="text-sm sm:text-base text-white/55 max-w-md leading-relaxed">
            Open to backend, full-stack, and applied AI roles, internships, and focused engineering work. I reply within 24 hours.
          </p>
        </div>

        <div className="grid lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          {/* Direct Channels */}
          <div className="lg:col-span-5 space-y-6 contact-reveal">
            <div className="studio-plate rounded-2xl p-6 space-y-5">
              <div className="font-mono text-[10px] uppercase tracking-[0.22em] text-[#e8a85a]">
                Direct Contact
              </div>

              <div className="space-y-4">
                <a
                  href={`mailto:${profile.email}`}
                  className="block group"
                  data-hover="true"
                >
                  <div className="font-mono text-[10px] uppercase tracking-wider text-white/35">Email</div>
                  <div className="text-sm sm:text-base text-[#f2ede4] group-hover:text-[#e8a85a] transition-colors mt-0.5 break-all">
                    {profile.email}
                  </div>
                </a>

                <a
                  href={profile.phoneHref}
                  className="block group"
                  data-hover="true"
                >
                  <div className="font-mono text-[10px] uppercase tracking-wider text-white/35">Phone</div>
                  <div className="text-sm sm:text-base text-[#f2ede4]/85 group-hover:text-[#e8a85a] transition-colors mt-0.5">
                    {profile.phone}
                  </div>
                </a>

                <div>
                  <div className="font-mono text-[10px] uppercase tracking-wider text-white/35">Location</div>
                  <div className="text-sm text-white/75 mt-0.5">{profile.location}</div>
                </div>
              </div>

              <button
                type="button"
                onClick={copyEmail}
                className="w-full py-2.5 rounded-xl border border-white/[0.14] font-mono text-[11px] uppercase tracking-widest text-white/75 hover:border-[#e8a85a] hover:text-[#e8a85a] transition-colors cursor-pointer"
                data-hover="true"
              >
                {copied ? "Copied to clipboard ✓" : "Copy Email Address"}
              </button>
            </div>

            <div className="studio-plate rounded-2xl p-6 space-y-3">
              <div className="font-mono text-[10px] uppercase tracking-[0.22em] text-white/40">
                Profiles &amp; Code
              </div>
              <div className="divide-y divide-white/[0.07]">
                {socialLinks.map((s) => (
                  <a
                    key={s.label}
                    href={s.href}
                    target="_blank"
                    rel="noreferrer"
                    className="py-2.5 flex items-center justify-between gap-3 text-xs sm:text-sm text-white/70 hover:text-[#e8a85a] transition-colors"
                    data-hover="true"
                  >
                    <span>{s.label}</span>
                    <span className="font-mono text-[10px] text-white/40 truncate max-w-[200px]">
                      {s.handle} ↗
                    </span>
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="lg:col-span-7 contact-reveal">
            {sent ? (
              <div className="studio-plate rounded-2xl p-10 text-center space-y-4">
                <div className="w-12 h-12 mx-auto rounded-full border border-[#e8a85a]/50 bg-[#e8a85a]/10 flex items-center justify-center text-[#e8a85a] text-lg">
                  ✓
                </div>
                <h3 className="font-display text-2xl font-bold text-[#f2ede4]">Note Received</h3>
                <p className="text-sm text-white/60 max-w-md mx-auto">
                  Thanks for writing. I will respond directly from {profile.email} within 24 hours.
                </p>
                <button
                  type="button"
                  onClick={() => setSent(false)}
                  className="font-mono text-xs uppercase tracking-widest text-[#e8a85a] hover:text-white transition-colors cursor-pointer pt-2"
                >
                  Send another note →
                </button>
              </div>
            ) : (
              <form
                onSubmit={handleSubmit}
                className="studio-plate rounded-2xl p-6 sm:p-8 space-y-5"
                data-testid="contact-form"
              >
                <div className="font-mono text-[10px] uppercase tracking-[0.22em] text-[#e8a85a]">
                  Write Directly
                </div>

                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block font-mono text-[10px] uppercase tracking-widest text-white/45 mb-2">
                      Name *
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={form.name}
                      onChange={handleChange}
                      placeholder="Your name"
                      className="form-input-studio"
                      data-testid="contact-input-name"
                    />
                  </div>
                  <div>
                    <label className="block font-mono text-[10px] uppercase tracking-widest text-white/45 mb-2">
                      Email *
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={form.email}
                      onChange={handleChange}
                      placeholder="you@company.com"
                      className="form-input-studio"
                      data-testid="contact-input-email"
                    />
                  </div>
                </div>

                <div>
                  <label className="block font-mono text-[10px] uppercase tracking-widest text-white/45 mb-2">
                    Topic / Role
                  </label>
                  <input
                    type="text"
                    name="subject"
                    value={form.subject}
                    onChange={handleChange}
                    placeholder="Backend role, AI systems collaboration, or project question"
                    className="form-input-studio"
                    data-testid="contact-input-subject"
                  />
                </div>

                <div>
                  <label className="block font-mono text-[10px] uppercase tracking-widest text-white/45 mb-2">
                    Message *
                  </label>
                  <textarea
                    name="message"
                    value={form.message}
                    onChange={handleChange}
                    rows={5}
                    placeholder="What problem are you working on?"
                    className="form-input-studio resize-none"
                    data-testid="contact-input-message"
                  />
                </div>

                {error && <p className="font-mono text-xs text-red-400">{error}</p>}

                <button
                  type="submit"
                  disabled={sending}
                  onMouseMove={(e) => !sending && magneticMove(e, 0.14)}
                  onMouseLeave={magneticLeave}
                  className="w-full py-3.5 rounded-xl bg-[#e8a85a] text-[#08080a] font-mono text-xs font-medium uppercase tracking-[0.2em] hover:bg-[#f2ede4] transition-colors disabled:opacity-45 cursor-pointer"
                  data-hover="true"
                  data-testid="contact-submit"
                >
                  {sending ? "Sending..." : "Send Note →"}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
