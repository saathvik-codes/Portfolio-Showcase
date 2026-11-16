import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useRef, useState, type ReactNode } from "react";
import Illustration from "./Illustration";

export interface StageItem { id: string; image: string; alt: string; caption: string; }

/**
 * Walkthrough stage: the illustration stays pinned on the left (desktop) and
 * swaps as each panel on the right scrolls through the viewport. On mobile each
 * panel carries its own illustration inline.
 */
export default function ScrollStage({ items, render }: { items: StageItem[]; render: (i: number) => ReactNode }) {
  const [active, setActive] = useState(0);
  const refs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setActive(Number((e.target as HTMLElement).dataset.i));
        });
      },
      { rootMargin: "-45% 0px -45% 0px" },
    );
    refs.current.forEach((el) => el && io.observe(el));
    return () => io.disconnect();
  }, [items.length]);

  const cur = items[active];
  return (
    <div className="grid lg:grid-cols-[minmax(0,5fr)_minmax(0,6fr)] gap-12 lg:gap-20">
      <div className="hidden lg:block">
        <div className="sticky top-28">
          <AnimatePresence mode="wait">
            <motion.div
              key={cur.id}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.45, ease: "easeOut" }}
            >
              <Illustration name={cur.image} alt={cur.alt} caption={cur.caption} ratio="4 / 5" parallax={false} />
            </motion.div>
          </AnimatePresence>
          <div className="mt-6 flex gap-2" aria-hidden>
            {items.map((it, i) => (
              <span key={it.id} className={`h-[3px] flex-1 rounded-full transition-colors duration-500 ${i === active ? "bg-accent" : "bg-hairline"}`} />
            ))}
          </div>
        </div>
      </div>
      <div className="space-y-24 lg:space-y-[28vh] lg:pb-[10vh]">
        {items.map((it, i) => (
          <div key={it.id} data-i={i} ref={(el) => { refs.current[i] = el; }} id={it.id}>
            <div className="lg:hidden mb-8">
              <Illustration name={it.image} alt={it.alt} caption={it.caption} ratio="16 / 10" />
            </div>
            {render(i)}
          </div>
        ))}
      </div>
    </div>
  );
}
