import { motion, useReducedMotion } from "framer-motion";
import { CircleAlert, CircleCheck, LoaderCircle, Mail, Phone, Send } from "lucide-react";
import { useState, type FormEvent } from "react";
import { profile } from "@/data/portfolioData";
import Illustration from "./Illustration";
import { ChapterHead, IconLink, Mark, Reveal, SocialRow } from "./primitives";

type Status = "idle" | "sending" | "sent" | "error";

// Inputs sit on the postcard's ruled lines.
const line = "w-full border-0 border-b border-dashed border-ink/25 bg-transparent px-0 py-2 text-[.95rem] text-ink placeholder:text-faint focus:border-accent focus:outline-none focus:ring-0";

function Stamp() {
  return (
    <div className="relative grid h-24 w-20 place-items-center bg-surface p-1.5 rotate-[4deg]"
      style={{ maskImage: "radial-gradient(circle at 4px 4px, transparent 3px, #000 3.5px)", maskSize: "8px 8px", maskPosition: "-4px -4px" }}>
      <div className="grid h-full w-full place-items-center border border-accent/40 bg-accent-soft">
        <svg viewBox="0 0 172 140" width="54" height="44" fill="none" aria-label="SK">
          <path d="M 26 42 C 26 42 70 28 70 50 C 70 68 26 68 26 86 C 26 105 70 100 70 100" stroke="#221d17" strokeWidth="7" strokeLinecap="round" />
          <path d="M 96 28 L 96 108 M 96 68 L 144 28 M 96 68 L 144 108" stroke="#221d17" strokeWidth="7" strokeLinecap="round" />
          <circle cx="154" cy="108" r="8" fill="#b4532a" />
        </svg>
      </div>
    </div>
  );
}

export default function Contact() {
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState("");
  const reduce = useReducedMotion();

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    setStatus("sending");
    setError("");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(Object.fromEntries(new FormData(form).entries())),
      });
      const json = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error(json.message || "Something went wrong.");
      setStatus("sent");
      form.reset();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong.");
      setStatus("error");
    }
  }

  return (
    <section id="contact" className="pt-16 pb-24 sm:pb-32 bg-surface">
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <div className="grid items-end gap-10 lg:grid-cols-[minmax(0,7fr)_minmax(0,4fr)]">
          <ChapterHead
            no="V"
            label="Contact"
            title={<>Have a hard problem? <Mark from="right">Send me a postcard.</Mark></>}
            lede="Roles, projects or a technical question. Write a few lines and I'll reply myself; you'll get a confirmation in your inbox straight away."
          />
          <motion.div
            initial={reduce ? false : { opacity: 0, rotate: 8, y: 30 }}
            whileInView={{ opacity: 1, rotate: 3, y: 0 }}
            viewport={{ once: true }}
            transition={{ type: "spring", stiffness: 70, damping: 14 }}
            className="relative mx-auto hidden w-full max-w-[16rem] bg-surface p-2.5 pb-9 border border-hairline shadow-[0_14px_30px_-20px_rgba(34,29,23,.5)] lg:block"
          >
            <span aria-hidden className="tape -top-3 left-1/2 -translate-x-1/2 rotate-[3deg]" />
            <Illustration name="contact-convo.jpg" alt="Saathvik across a café table with a spare cup of coffee" ratio="1 / 1" parallax={false} />
            <p className="hand absolute inset-x-0 bottom-1 text-center text-xl text-muted">coffee's on me</p>
          </motion.div>
        </div>

        {/* The postcard */}
        <motion.div
          initial={reduce ? false : { opacity: 0, y: 40, rotate: -2 }}
          whileInView={{ opacity: 1, y: 0, rotate: -0.6 }}
          viewport={{ once: true, margin: "-10% 0px" }}
          transition={{ type: "spring", stiffness: 60, damping: 15 }}
          className="relative mt-14 grid border border-hairline bg-[#fbf6ea] shadow-[0_24px_50px_-30px_rgba(34,29,23,.55)] md:grid-cols-[minmax(0,7fr)_minmax(0,5fr)]"
        >
          <form onSubmit={onSubmit} className="space-y-5 p-6 sm:p-10 md:border-r md:border-dashed md:border-ink/20">
            <div className="hidden" aria-hidden><label>Website<input name="website" tabIndex={-1} autoComplete="off" /></label></div>
            <p className="hand text-3xl text-ink">Dear Saathvik,</p>
            <label className="block">
              <span className="sr-only">Message</span>
              <textarea name="message" required rows={6} minLength={10} maxLength={4000} placeholder="What are you working on?"
                className={`${line} resize-y leading-[2.1rem]`}
                style={{ backgroundImage: "repeating-linear-gradient(transparent 0 2.05rem, rgba(34,29,23,.12) 2.05rem 2.1rem)", border: 0 }} />
            </label>
            <div className="grid gap-5 sm:grid-cols-2">
              <label className="block text-xs uppercase tracking-wider text-faint">From
                <input name="name" required maxLength={100} autoComplete="name" placeholder="Your name" className={`${line} mt-1 normal-case tracking-normal`} />
              </label>
              <label className="block text-xs uppercase tracking-wider text-faint">Reply to
                <input name="email" type="email" required maxLength={200} autoComplete="email" placeholder="you@example.com" className={`${line} mt-1 normal-case tracking-normal`} />
              </label>
            </div>
            <label className="block text-xs uppercase tracking-wider text-faint">Subject (optional)
              <input name="subject" maxLength={150} className={`${line} mt-1 normal-case tracking-normal`} />
            </label>
            <div className="flex flex-wrap items-center gap-5 pt-2">
              <button type="submit" disabled={status === "sending"}
                className="inline-flex items-center gap-2 rounded-full bg-accent px-6 py-3 text-sm font-medium text-white hover:bg-ink disabled:opacity-60">
                {status === "sending" ? <LoaderCircle size={16} className="animate-spin" aria-hidden /> : <Send size={16} aria-hidden />}
                {status === "sending" ? "Posting…" : "Post it"}
              </button>
              <p role="status" aria-live="polite" className={`inline-flex items-center gap-1.5 text-sm ${status === "error" ? "text-red-700" : "text-clay"}`}>
                {status === "sent" && <><CircleCheck size={16} aria-hidden />Delivered. Check your inbox for a confirmation.</>}
                {status === "error" && <><CircleAlert size={16} aria-hidden />{error}</>}
              </p>
            </div>
          </form>

          <div className="relative flex flex-col gap-6 p-6 sm:p-10">
            <div className="flex items-start justify-between gap-4">
              <p className="font-mono text-[.7rem] uppercase tracking-[.2em] text-faint">Post card</p>
              <Stamp />
            </div>
            <div className="space-y-3">
              {[profile.name, "Software Engineer", profile.location].map((l) => (
                <p key={l} className="hand border-b border-ink/20 pb-1 text-2xl text-ink">{l}</p>
              ))}
            </div>
            <div className="mt-auto space-y-2 text-sm">
              <p className="text-faint">Or skip the post:</p>
              <IconLink href={`mailto:${profile.email}`} icon={Mail}>{profile.email}</IconLink><br />
              <IconLink href={profile.phoneHref} icon={Phone}>{profile.phone}</IconLink>
              <SocialRow withEmail={false} className="pt-3" />
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
