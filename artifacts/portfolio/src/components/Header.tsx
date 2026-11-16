import { AnimatePresence, motion, useScroll, useSpring } from "framer-motion";
import { Menu, X } from "lucide-react";
import { useEffect, useState } from "react";
import { chapters, profile } from "@/data/portfolioData";
import { useChapter } from "./walkthrough";

export default function Header() {
  const { active, go } = useChapter();
  const { scrollYProgress } = useScroll();
  const w = useSpring(scrollYProgress, { stiffness: 120, damping: 28 });
  const [open, setOpen] = useState(false);
  const [hidden, setHidden] = useState(false);

  useEffect(() => {
    let last = window.scrollY;
    const onScroll = () => {
      const y = window.scrollY;
      setHidden(y > last && y > 160);
      last = y;
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  const nav = (id: string) => { setOpen(false); go(id); };

  return (
    <header className={`fixed inset-x-0 top-0 z-50 border-b border-hairline bg-paper/90 backdrop-blur transition-transform duration-300 ${hidden && !open ? "-translate-y-full" : ""}`}>
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-5 sm:px-8">
        <button onClick={() => nav("prologue")} className="font-serif text-xl tracking-tight text-ink">
          {profile.name}
        </button>
        <nav className="hidden md:flex items-center gap-7" aria-label="Sections">
          {chapters.slice(1).map((c) => {
            const on = chapters[active]?.id === c.id;
            return (
              <button key={c.id} onClick={() => nav(c.id)} aria-current={on ? "true" : undefined}
                className={`relative text-sm py-1 ${on ? "text-ink" : "text-muted hover:text-ink"}`}>
                {c.label}
                {on && <motion.span layoutId="nav-underline" className="absolute inset-x-0 -bottom-[1px] h-px bg-ink" />}
              </button>
            );
          })}
        </nav>
        <div className="flex items-center gap-2">
          <a href={profile.resumePath} target="_blank" rel="noreferrer" className="rounded-sm border border-ink px-4 py-1.5 text-sm text-ink hover:bg-ink hover:text-paper">
            Resume
          </a>
          <button onClick={() => setOpen((o) => !o)} aria-expanded={open} aria-controls="mobile-menu" aria-label={open ? "Close menu" : "Open menu"}
            className="md:hidden grid h-9 w-9 place-items-center rounded-sm border border-hairline text-ink">
            {open ? <X size={17} /> : <Menu size={17} />}
          </button>
        </div>
      </div>
      <motion.div style={{ scaleX: w }} className="h-[2px] origin-left bg-accent" />

      <AnimatePresence>
        {open && (
          <motion.nav id="mobile-menu" aria-label="Chapters"
            initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }} transition={{ duration: 0.2 }}
            className="md:hidden fixed inset-x-0 top-[66px] bottom-0 bg-paper px-5 pt-6 overflow-y-auto">
            <ol>
              {chapters.map((c, i) => (
                <li key={c.id} className="border-b border-hairline">
                  <button onClick={() => nav(c.id)} className="flex w-full items-baseline gap-4 py-5 text-left">
                    <span className="w-8 font-mono text-[.72rem] text-faint">{c.no}</span>
                    <span className="flex-1">
                      <span className={`block font-serif text-2xl ${i === active ? "text-accent" : "text-ink"}`}>{c.label}</span>
                      <span className="block text-sm text-muted">{c.narration}</span>
                    </span>
                  </button>
                </li>
              ))}
            </ol>
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  );
}
