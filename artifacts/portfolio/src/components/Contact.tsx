import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
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
        { y: 14, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.45,
          stagger: 0.06,
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
      className="relative py-20 md:py-28 px-5 sm:px-8"
      data-testid="contact-section"
    >
      <div className="max-w-6xl mx-auto space-y-12">
        <div className="contact-reveal flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <div className="section-kicker mb-2">06 · Contact</div>
            <h2 className="text-3xl sm:text-4xl font-bold tracking-[-0.025em] text-[#141413]">
              Have a problem worth solving?{" "}
              <span className="font-serif-editorial italic font-normal text-[#57534e]">
                Let&rsquo;s talk.
              </span>
            </h2>
          </div>
          <p className="text-sm text-[#57534e] max-w-md leading-relaxed">
            Open to backend, full-stack, and applied AI roles, internships, and focused engineering builds. Usually respond within 24 hours.
          </p>
        </div>

        <div className="grid lg:grid-cols-12 gap-8 lg:gap-10 items-start">
          {/* Left: Direct Channels & Links */}
          <div className="lg:col-span-5 space-y-5 contact-reveal">
            <div className="clean-card rounded-2xl p-6 space-y-5">
              <div className="font-mono text-xs font-medium text-[#2563eb]">
                Direct Channels
              </div>

              <div className="space-y-4">
                <a href={`mailto:${profile.email}`} className="block group">
                  <div className="text-xs text-[#78716c]">Email</div>
                  <div className="text-sm sm:text-base font-medium text-[#141413] group-hover:text-[#2563eb] transition-colors mt-0.5 break-all">
                    {profile.email}
                  </div>
                </a>

                <a href={profile.phoneHref} className="block group">
                  <div className="text-xs text-[#78716c]">Phone</div>
                  <div className="text-sm sm:text-base font-medium text-[#141413] group-hover:text-[#2563eb] transition-colors mt-0.5">
                    {profile.phone}
                  </div>
                </a>

                <div>
                  <div className="text-xs text-[#78716c]">Location</div>
                  <div className="text-sm text-[#57534e] mt-0.5">{profile.location}</div>
                </div>
              </div>

              <button
                type="button"
                onClick={copyEmail}
                className="w-full py-2.5 rounded-xl bg-[#f3f1ec] border border-[#dcd9d0] font-mono text-xs font-medium text-[#141413] hover:bg-[#141413] hover:text-[#faf9f6] hover:border-[#141413] transition-colors cursor-pointer"
              >
                {copied ? "Copied to clipboard ✓" : "Copy Email Address"}
              </button>
            </div>

            <div className="clean-card rounded-2xl p-6 space-y-3">
              <div className="font-mono text-xs font-medium text-[#57534e]">
                Profiles &amp; Code
              </div>
              <div className="divide-y divide-[#eceae4]">
                {socialLinks.map((s) => (
                  <a
                    key={s.label}
                    href={s.href}
                    target="_blank"
                    rel="noreferrer"
                    className="py-2.5 flex items-center justify-between gap-3 text-xs sm:text-sm text-[#141413] hover:text-[#2563eb] transition-colors"
                  >
                    <span className="font-medium">{s.label}</span>
                    <span className="font-mono text-[11px] text-[#78716c] truncate max-w-[190px]">
                      {s.handle} ↗
                    </span>
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* Right: Clean Inquiry Form */}
          <div className="lg:col-span-7 contact-reveal">
            {sent ? (
              <div className="clean-card rounded-2xl p-10 text-center space-y-4">
                <div className="w-11 h-11 mx-auto rounded-full bg-[#eff6ff] border border-[#bfdbfe] flex items-center justify-center text-[#2563eb] font-bold">
                  ✓
                </div>
                <h3 className="text-xl font-bold text-[#141413]">Note Received</h3>
                <p className="text-sm text-[#57534e] max-w-md mx-auto">
                  Thanks for reaching out. I will reply directly from {profile.email} within 24 hours.
                </p>
                <button
                  type="button"
                  onClick={() => setSent(false)}
                  className="text-xs font-medium text-[#2563eb] hover:underline underline-offset-4 cursor-pointer pt-1"
                >
                  Send another note →
                </button>
              </div>
            ) : (
              <form
                onSubmit={handleSubmit}
                className="clean-card rounded-2xl p-6 sm:p-8 space-y-5 shadow-[0_1px_2px_rgba(20,20,19,0.03)]"
                data-testid="contact-form"
              >
                <div className="font-mono text-xs font-medium text-[#2563eb]">
                  Send a Note
                </div>

                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-medium text-[#57534e] mb-1.5">
                      Name *
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={form.name}
                      onChange={handleChange}
                      placeholder="Your name"
                      className="form-input-clean"
                      data-testid="contact-input-name"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-[#57534e] mb-1.5">
                      Email *
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={form.email}
                      onChange={handleChange}
                      placeholder="you@company.com"
                      className="form-input-clean"
                      data-testid="contact-input-email"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-medium text-[#57534e] mb-1.5">
                    Topic / Role
                  </label>
                  <input
                    type="text"
                    name="subject"
                    value={form.subject}
                    onChange={handleChange}
                    placeholder="Backend role, AI systems collaboration, or project question"
                    className="form-input-clean"
                    data-testid="contact-input-subject"
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-[#57534e] mb-1.5">
                    Message *
                  </label>
                  <textarea
                    name="message"
                    value={form.message}
                    onChange={handleChange}
                    rows={5}
                    placeholder="What problem are you working on?"
                    className="form-input-clean resize-none"
                    data-testid="contact-input-message"
                  />
                </div>

                {error && <p className="text-xs font-medium text-[#dc2626]">{error}</p>}

                <button
                  type="submit"
                  disabled={sending}
                  className="w-full py-3 rounded-xl bg-[#141413] text-[#faf9f6] text-xs sm:text-sm font-medium hover:bg-[#2563eb] transition-colors disabled:opacity-45 cursor-pointer"
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
