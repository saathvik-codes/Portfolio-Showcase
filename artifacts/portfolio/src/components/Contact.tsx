import { useState, type FormEvent } from "react";
import { profile } from "@/data/portfolioData";
import Illustration from "./Illustration";
import { CircleAlert, CircleCheck, LoaderCircle, Mail, Phone, Send } from "lucide-react";
import { ChapterHead, IconLink, Mark, Reveal, SocialRow } from "./primitives";

type Status = "idle" | "sending" | "sent" | "error";

const field =
  "w-full rounded-sm border border-hairline bg-surface px-4 py-3 text-[.95rem] text-ink placeholder:text-faint focus:border-accent focus:outline-none";

export default function Contact() {
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState("");

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = Object.fromEntries(new FormData(form).entries());
    setStatus("sending");
    setError("");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
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
        <div className="grid lg:grid-cols-[minmax(0,6fr)_minmax(0,5fr)] gap-14 lg:gap-20">
          <div>
            <ChapterHead
              no="V"
              label="Contact"
              title={<>Have a hard problem? <Mark from="right">Let&rsquo;s talk it through.</Mark></>}
              lede="Roles, projects or just a technical question: write a few lines and I will reply personally. You will get an automatic confirmation straight away."
            />
            <Reveal delay={0.1}>
              <form onSubmit={onSubmit} className="mt-12 space-y-4" noValidate={false}>
                <div className="hidden" aria-hidden>
                  <label>Website<input name="website" tabIndex={-1} autoComplete="off" /></label>
                </div>
                <div className="grid sm:grid-cols-2 gap-4">
                  <label className="block text-sm text-muted">Name
                    <input name="name" required maxLength={100} autoComplete="name" className={`${field} mt-1.5`} />
                  </label>
                  <label className="block text-sm text-muted">Email
                    <input name="email" type="email" required maxLength={200} autoComplete="email" className={`${field} mt-1.5`} />
                  </label>
                </div>
                <label className="block text-sm text-muted">Subject
                  <input name="subject" maxLength={150} className={`${field} mt-1.5`} />
                </label>
                <label className="block text-sm text-muted">Message
                  <textarea name="message" required rows={6} minLength={10} maxLength={4000} className={`${field} mt-1.5 resize-y`} />
                </label>
                <div className="flex flex-wrap items-center gap-5 pt-2">
                  <button
                    type="submit"
                    disabled={status === "sending"}
                    className="inline-flex items-center gap-2 rounded-sm bg-ink px-7 py-3 text-sm font-medium text-paper hover:bg-accent disabled:opacity-60"
                  >
                    {status === "sending" ? <LoaderCircle size={16} className="animate-spin" aria-hidden /> : <Send size={16} aria-hidden />}
                    {status === "sending" ? "Sending…" : "Send message"}
                  </button>
                  <p role="status" aria-live="polite" className={`inline-flex items-center gap-1.5 text-sm ${status === "error" ? "text-red-700" : "text-accent"}`}>
                    {status === "sent" && <><CircleCheck size={16} aria-hidden />Sent. Check your inbox for a confirmation.</>}
                    {status === "error" && <><CircleAlert size={16} aria-hidden />{error}</>}
                  </p>
                </div>
              </form>
            </Reveal>
            <Reveal delay={0.15} className="mt-14 border-t border-hairline pt-8 text-sm">
              <p className="text-muted mb-4">Prefer direct?</p>
              <p className="flex flex-wrap gap-x-6 gap-y-2">
                <IconLink href={`mailto:${profile.email}`} icon={Mail}>{profile.email}</IconLink>
                <IconLink href={profile.phoneHref} icon={Phone}>{profile.phone}</IconLink>
              </p>
              <SocialRow withEmail={false} className="mt-5" />
            </Reveal>
          </div>
          <Reveal delay={0.1} className="lg:pt-24">
            <Illustration name="contact-convo.jpg" alt="Saathvik smiling across a café table, notebook and coffee between us" caption="The next conversation could be yours." ratio="4 / 5" />
          </Reveal>
        </div>
      </div>
    </section>
  );
}
