import "leaflet/dist/leaflet.css";
import L from "leaflet";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowUpRight, Building2, CalendarDays, GraduationCap, MapPin, RotateCcw } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { experiences, journey } from "@/data/portfolioData";
import { ChapterHead, IconLink, Mark } from "./primitives";
import { TechList } from "./TechIcon";

type Stop = (typeof journey)[number];
const xp = (s: Stop) => ("experience" in s ? experiences.find((e) => e.id === s.experience) : undefined);

const pin = (on: boolean, label: string) =>
  L.divIcon({
    className: "",
    iconSize: [0, 0],
    html: `<div style="transform:translate(-50%,-50%);display:flex;align-items:center;gap:6px;white-space:nowrap">
      <span style="display:block;width:${on ? 14 : 10}px;height:${on ? 14 : 10}px;border-radius:50%;background:${on ? "#23408e" : "#fffefb"};border:2px solid #23408e;box-shadow:0 0 0 ${on ? 6 : 0}px rgba(35,64,142,.18);transition:all .3s"></span>
      <span style="font:500 12px Inter,sans-serif;color:#16181d;background:rgba(255,254,251,.9);padding:1px 6px;border-radius:2px;opacity:${on ? 1 : 0.75}">${label}</span>
    </div>`,
  });

/** Watercolour map that flies to each stop as the journey timeline scrolls. */
function JourneyMap({ active }: { active: number }) {
  const el = useRef<HTMLDivElement>(null);
  const map = useRef<L.Map | null>(null);
  const markers = useRef<L.Marker[]>([]);
  const trail = useRef<L.Polyline | null>(null);
  const reduce = useReducedMotion();

  useEffect(() => {
    if (!el.current || map.current) return;
    const m = L.map(el.current, { zoomControl: false, scrollWheelZoom: false, dragging: !L.Browser.mobile, attributionControl: true })
      .setView(journey[0].coords, 6);
    L.tileLayer("https://watercolormaps.collection.cooperhewitt.org/tile/watercolor/{z}/{x}/{y}.jpg", {
      maxZoom: 12,
      attribution: "Watercolor tiles © Stamen Design / Cooper Hewitt · © OpenStreetMap",
    }).addTo(m);
    L.control.zoom({ position: "bottomright" }).addTo(m);
    markers.current = journey.map((s) => L.marker(s.coords, { icon: pin(false, s.place), keyboard: false }).addTo(m));
    trail.current = L.polyline([], { color: "#a8541f", weight: 2, dashArray: "6 6" }).addTo(m);
    map.current = m;
    return () => { m.remove(); map.current = null; };
  }, []);

  useEffect(() => {
    const m = map.current;
    if (!m) return;
    const s = journey[active];
    markers.current.forEach((mk, i) => mk.setIcon(pin(i === active, journey[i].place)));
    trail.current?.setLatLngs(journey.slice(0, active + 1).map((j) => j.coords));
    const prev = journey[Math.max(active - 1, 0)];
    const far = Math.abs(prev.coords[0] - s.coords[0]) > 5;
    m.flyTo(s.coords, far ? 5 : 7, { duration: reduce ? 0 : 1.4 });
  }, [active, reduce]);

  const reset = () => map.current?.flyToBounds(L.latLngBounds(journey.map((j) => j.coords)).pad(0.3), { duration: 1 });

  return (
    <div className="relative h-full w-full overflow-hidden rounded-sm border border-hairline bg-sand">
      <div ref={el} className="h-full w-full" aria-label="Map of places in my journey" role="img" />
      <button onClick={reset} className="absolute left-3 top-3 z-[500] inline-flex items-center gap-1.5 rounded-sm border border-hairline bg-surface/95 px-2.5 py-1.5 text-xs text-ink hover:border-ink">
        <RotateCcw size={13} aria-hidden /> Whole route
      </button>
    </div>
  );
}

export default function Experience() {
  const [active, setActive] = useState(0);
  const refs = useRef<(HTMLLIElement | null)[]>([]);

  useEffect(() => {
    const io = new IntersectionObserver(
      (es) => es.forEach((e) => e.isIntersecting && setActive(Number((e.target as HTMLElement).dataset.i))),
      { rootMargin: "-40% 0px -45% 0px" },
    );
    refs.current.forEach((r) => r && io.observe(r));
    return () => io.disconnect();
  }, []);

  return (
    <section id="experience" className="py-24 sm:py-32 border-t border-hairline">
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <ChapterHead
          no="II"
          label="Journey"
          title={<>From Hyderabad to Gurugram, <Mark>one stop at a time</Mark>.</>}
          lede="Education and internships in order. The map follows along as you scroll."
        />

        <div className="mt-14 grid lg:grid-cols-[minmax(0,6fr)_minmax(0,5fr)] gap-10 lg:gap-16">
          {/* Map: sticky on every screen size so it always follows the timeline */}
          <div className="lg:order-2 sticky top-[66px] lg:top-28 z-10 h-52 sm:h-64 lg:h-[calc(100vh-10rem)] -mx-5 sm:mx-0 bg-paper pb-3 lg:pb-0">
            <JourneyMap active={active} />
          </div>

          <ol className="relative lg:order-1 border-l border-hairline ml-2" style={{ perspective: 1200 }}>
            {journey.map((s, i) => {
              const x = xp(s);
              const on = i === active;
              return (
                <li key={s.id} data-i={i} ref={(r) => { refs.current[i] = r; }} className="relative pl-8 sm:pl-10 py-10 lg:py-[12vh] first:pt-4">
                  <span aria-hidden className={`absolute -left-[7px] top-[3.2rem] lg:top-[calc(12vh+.6rem)] h-3 w-3 rounded-full border-2 border-accent transition-colors ${on ? "bg-accent" : "bg-paper"}`} />
                  <motion.div
                    initial={{ opacity: 0, rotateY: -25, x: -10 }}
                    whileInView={{ opacity: 1, rotateY: 0, x: 0 }}
                    viewport={{ once: true, margin: "-15% 0px" }}
                    transition={{ duration: 0.7, ease: [0.22, 0.61, 0.36, 1] }}
                    style={{ transformOrigin: "left center" }}
                    className={`transition-opacity duration-500 ${on ? "opacity-100" : "lg:opacity-60"}`}
                  >
                    <p className="flex flex-wrap items-center gap-x-4 gap-y-1 text-sm text-faint">
                      <span className="inline-flex items-center gap-1.5"><CalendarDays size={14} aria-hidden />{x ? x.period : s.when}</span>
                      <span className="inline-flex items-center gap-1.5"><MapPin size={14} aria-hidden />{x ? x.location : s.place}</span>
                    </p>
                    {x ? (
                      <>
                        <h3 className="mt-3 font-serif text-3xl leading-tight text-ink">{x.role}</h3>
                        <p className="mt-1 inline-flex items-center gap-1.5 text-accent">
                          <Building2 size={16} aria-hidden />
                          {x.companyUrl ? <IconLink href={x.companyUrl} icon={ArrowUpRight} className="!text-accent">{x.company}</IconLink> : x.company}
                        </p>
                        <p className="mt-5 text-muted leading-relaxed">{x.summary}</p>
                        <ul className="mt-5 space-y-3 text-[.95rem] text-ink/85 leading-relaxed">
                          {x.highlights.map((h) => (
                            <li key={h} className="flex gap-3"><span aria-hidden className="mt-[.7em] h-px w-4 shrink-0 bg-clay" />{h}</li>
                          ))}
                        </ul>
                        <div className="mt-5"><TechList items={x.tags} /></div>
                      </>
                    ) : (
                      <>
                        <h3 className="mt-3 font-serif text-3xl leading-tight text-ink">{"title" in s ? s.title : ""}</h3>
                        <p className="mt-1 inline-flex items-center gap-1.5 text-accent"><GraduationCap size={16} aria-hidden />{"org" in s ? s.org : ""}</p>
                        <p className="mt-5 text-muted leading-relaxed">{"body" in s ? s.body : ""}</p>
                      </>
                    )}
                  </motion.div>
                </li>
              );
            })}
          </ol>
        </div>
      </div>
    </section>
  );
}
