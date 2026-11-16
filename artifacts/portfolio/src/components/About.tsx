import { skillMatrix } from "@/data/portfolioData";
import Illustration from "./Illustration";
import { ChapterHead, Mark, Reveal } from "./primitives";
import { TechList } from "./TechIcon";

export default function About() {
  return (
    <section id="about" className="pt-16 pb-24 sm:pb-32 bg-surface">
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <div className="grid lg:grid-cols-[minmax(0,6fr)_minmax(0,5fr)] gap-14 lg:gap-20">
          <div>
            <ChapterHead
              no="I"
              label="About"
              title={<>Get the <Mark>shape of the problem</Mark> right, then write the code.</>}
              lede="I like systems where the rules can be stated plainly and tested: a quorum, a state machine, a tax slab, a read-only SQL guard. Most of what I build starts by writing those rules down and trying to break them."
            />
          </div>
          <Reveal delay={0.1}>
            <Illustration name="about-convo.jpg" alt="Saathvik sketching a system diagram on a whiteboard with a product designer" caption="Aligning on tradeoffs before any code gets written." ratio="4 / 5" />
          </Reveal>
        </div>

        <Reveal className="mt-24">
          <p className="eyebrow mb-6">Toolbox</p>
          <dl className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {skillMatrix.map((g, k) => (
              <div key={g.label} className={`relative border border-hairline bg-paper p-5 shadow-[3px_3px_0_0_var(--color-hairline)] ${k % 2 ? "rotate-[0.4deg]" : "-rotate-[0.4deg]"}`}>
                <dt className="mb-3 font-serif text-lg text-ink">{g.label}</dt>
                <dd><TechList items={g.items.split(" · ")} /></dd>
              </div>
            ))}
          </dl>
        </Reveal>
      </div>
    </section>
  );
}
