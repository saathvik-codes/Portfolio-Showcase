import { AnimatePresence, motion } from "framer-motion";
import { ArrowDown, ArrowUp } from "lucide-react";
import { createContext, useContext, useEffect, useState, type ReactNode } from "react";
import { chapters } from "@/data/portfolioData";

interface Ctx { active: number; go: (id: string) => void; }
const ChapterCtx = createContext<Ctx>({ active: 0, go: () => {} });
export const useChapter = () => useContext(ChapterCtx);

const typing = () => {
  const el = document.activeElement;
  return !!el && (el.tagName === "INPUT" || el.tagName === "TEXTAREA" || (el as HTMLElement).isContentEditable);
};

/** Tracks which chapter is on screen and wires keyboard walkthrough keys. */
export function ChapterProvider({ go, children }: { go: (id: string) => void; children: ReactNode }) {
  const [active, setActive] = useState(0);

  useEffect(() => {
    const io = new IntersectionObserver(
      (es) => es.forEach((e) => {
        if (e.isIntersecting) setActive(chapters.findIndex((c) => c.id === e.target.id));
      }),
      { rootMargin: "-45% 0px -50% 0px" },
    );
    chapters.forEach((c) => { const el = document.getElementById(c.id); if (el) io.observe(el); });
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (typing() || e.metaKey || e.ctrlKey || e.altKey) return;
      const k = e.key.toLowerCase();
      if (k === "j" || k === "n") { e.preventDefault(); go(chapters[Math.min(active + 1, chapters.length - 1)].id); }
      if (k === "k" || k === "p") { e.preventDefault(); go(chapters[Math.max(active - 1, 0)].id); }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [active, go]);

  return <ChapterCtx.Provider value={{ active, go }}>{children}</ChapterCtx.Provider>;
}

/** Desktop side rail: chapter numerals with labels on hover/active. */
export function ChapterRail() {
  const { active, go } = useChapter();
  return (
    <nav aria-label="Chapters" className="fixed left-6 top-1/2 z-30 hidden -translate-y-1/2 2xl:block">
      <ol className="space-y-4">
        {chapters.map((c, i) => (
          <li key={c.id}>
            <button onClick={() => go(c.id)} className="group flex items-center gap-3" aria-current={i === active ? "step" : undefined}>
              <span className={`block h-px transition-all duration-500 ${i === active ? "w-8 bg-accent" : "w-4 bg-faint/50 group-hover:w-6 group-hover:bg-ink"}`} />
              <span className={`font-mono text-[.7rem] tracking-wider transition-opacity ${i === active ? "text-ink opacity-100" : "text-faint opacity-0 group-hover:opacity-100"}`}>
                {c.no} {c.label}
              </span>
            </button>
          </li>
        ))}
      </ol>
    </nav>
  );
}

/** Bottom dock: where you are in the walkthrough, what is next, prev/next. */
export function WalkthroughDock() {
  const { active, go } = useChapter();
  const [show, setShow] = useState(false);

  useEffect(() => {
    const onScroll = () => setShow(window.scrollY > window.innerHeight * 0.6);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const cur = chapters[active];
  const prev = chapters[active - 1];
  const next = chapters[active + 1];

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ y: 80, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 80, opacity: 0 }}
          transition={{ duration: 0.4, ease: [0.22, 0.61, 0.36, 1] }}
          className="fixed inset-x-0 bottom-4 z-40 flex justify-center px-4 pointer-events-none"
        >
          <div className="pointer-events-auto flex w-full max-w-xl items-center gap-3 rounded-sm border border-hairline bg-surface/95 py-2 pl-4 pr-2 shadow-[0_8px_30px_-12px_rgba(22,24,29,.25)] backdrop-blur">
            <span className="font-mono text-[.72rem] text-faint tabular-nums">{String(active + 1).padStart(2, "0")}/{String(chapters.length).padStart(2, "0")}</span>
            <div className="min-w-0 flex-1">
              <AnimatePresence mode="wait">
                <motion.p key={cur.id} initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -6 }} transition={{ duration: 0.25 }} className="truncate text-sm">
                  <span className="font-medium text-ink">{cur.label}</span>
                  <span className="hidden sm:inline text-muted"> — {cur.narration}</span>
                </motion.p>
              </AnimatePresence>
            </div>
            <button
              onClick={() => prev && go(prev.id)}
              disabled={!prev}
              aria-label={prev ? `Previous: ${prev.label}` : "No previous chapter"}
              title="Previous (K)"
              className="grid h-9 w-9 place-items-center rounded-sm border border-hairline text-ink hover:border-ink disabled:opacity-30"
            >
              <ArrowUp size={15} />
            </button>
            <button
              onClick={() => next && go(next.id)}
              disabled={!next}
              aria-label={next ? `Next: ${next.label}` : "End of walkthrough"}
              title="Next (J)"
              className="flex h-9 items-center gap-2 rounded-sm bg-ink px-3 text-sm text-paper hover:bg-accent disabled:opacity-30"
            >
              <span className="hidden sm:inline">{next ? next.label : "The end"}</span>
              <ArrowDown size={15} />
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
