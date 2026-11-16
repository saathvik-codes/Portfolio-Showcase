import "leaflet/dist/leaflet.css";
import L from "leaflet";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowUpRight, Building2, CalendarDays, GraduationCap, MapPin, RotateCcw } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { experiences, journey } from "@/data/portfolioData";
import { ChapterHead, IconLink, Mark } from "./primitives";
import { TechList } from "./TechIcon";

type Stop = (typeof journey)[number];
type LL = [number, number];
const xp = (s: Stop) => ("experience" in s ? experiences.find((e) => e.id === s.experience) : undefined);

// One pin per city, even when several stops share it.
const places = Array.from(new Map(journey.map((s) => [s.place, s.coords as LL])).entries());
const placeIndex = (name: string) => places.findIndex(([p]) => p === name);

const pinIcon = (name: string, state: "upcoming" | "visited" | "current") =>
  L.divIcon({
    className: `jpin is-${state}`,
    iconSize: [20, 20],
    iconAnchor: [10, 10],
    html: `<span class="jpin-dot"></span><span class="jpin-label">${name}</span>`,
  });

/** Gentle arc between two points (quadratic Bézier, bulging to one side). */
function arc(a: LL, b: LL, steps = 40): LL[] {
  const [y1, x1] = a, [y2, x2] = b;
  const mx = (x1 + x2) / 2, my = (y1 + y2) / 2;
  const dx = x2 - x1, dy = y2 - y1;
  const k = 0.22; // bulge
  const cx = mx - dy * k, cy = my + dx * k;
  const pts: LL[] = [];
  for (let i = 0; i <= steps; i++) {
    const t = i / steps, u = 1 - t;
    pts.push([u * u * y1 + 2 * u * t * cy + t * t * y2, u * u * x1 + 2 * u * t * cx + t * t * x2]);
  }
  return pts;
}

// Route as a list of points, plus the index where each stop is reached.
const legs: LL[] = [journey[0].coords as LL];
const reachedAt: number[] = [0];
for (let i = 1; i < journey.length; i++) {
  const a = journey[i - 1].coords as LL, b = journey[i].coords as LL;
  if (journey[i - 1].place !== journey[i].place) legs.push(...arc(a, b).slice(1));
  reachedAt.push(legs.length - 1);
}

/** Watercolour map: flies between stops and draws the route travelled so far. */
function JourneyMap({ active }: { active: number }) {
  const el = useRef<HTMLDivElement>(null);
  const map = useRef<L.Map | null>(null);
  const pins = useRef<L.Marker[]>([]);
  const travelled = useRef<L.Polyline | null>(null);
  const drawn = useRef(0);
  const reduce = useReducedMotion();

  useEffect(() => {
    if (!el.current || map.current) return;
    const m = L.map(el.current, {
      zoomControl: false,
      scrollWheelZoom: false,
      dragging: !L.Browser.mobile,
      zoomSnap: 0.25,
      attributionControl: false,
    }).setView(journey[0].coords as LL, 6.5);
    L.tileLayer("https://watercolormaps.collection.cooperhewitt.org/tile/watercolor/{z}/{x}/{y}.jpg", {
      maxZoom: 12,
    }).addTo(m);
    L.control.attribution({ prefix: false, position: "bottomright" }).addAttribution("© Stamen / Cooper Hewitt · © OSM").addTo(m);
    if (!L.Browser.mobile) L.control.zoom({ position: "bottomright" }).addTo(m);
    L.polyline(legs, { color: "#a8541f", weight: 2, opacity: 0.45, dashArray: "1 7", lineCap: "round", interactive: false }).addTo(m);
    travelled.current = L.polyline([], { color: "#a8541f", weight: 3, opacity: 0.95, lineCap: "round", lineJoin: "round", interactive: false }).addTo(m);
    pins.current = places.map(([name, ll]) => L.marker(ll, { icon: pinIcon(name, "upcoming"), keyboard: false, interactive: false }).addTo(m));
    map.current = m;
    const ro = new ResizeObserver(() => m.invalidateSize());
    ro.observe(el.current);
    return () => { ro.disconnect(); m.remove(); map.current = null; };
  }, []);

  useEffect(() => {
    const m = map.current;
    if (!m) return;

    // Pins: current city pulses, cities already passed are filled.
    const cur = placeIndex(journey[active].place);
    const seen = new Set(journey.slice(0, active + 1).map((s) => placeIndex(s.place)));
    pins.current.forEach((mk, i) => mk.setIcon(pinIcon(places[i][0], i === cur ? "current" : seen.has(i) ? "visited" : "upcoming")));
    pins.current[cur]?.setZIndexOffset(1000);

    // Route: animate the solid line from where it was to this stop.
    const from = drawn.current, to = reachedAt[active];
    let raf = 0;
    if (reduce || from === to) {
      travelled.current?.setLatLngs(legs.slice(0, to + 1));
      drawn.current = to;
    } else {
      const t0 = performance.now(), dur = 1100;
      const step = (t: number) => {
        const k = Math.min((t - t0) / dur, 1), e = 1 - Math.pow(1 - k, 3);
        const n = Math.round(from + (to - from) * e);
        travelled.current?.setLatLngs(legs.slice(0, n + 1));
        drawn.current = n;
        if (k < 1) raf = requestAnimationFrame(step);
      };
      raf = requestAnimationFrame(step);
    }

    // Camera: frame the previous and current stop together.
    const here = journey[active].coords as LL;
    const prev = journey[Math.max(active - 1, 0)].coords as LL;
    const opts = { duration: reduce ? 0 : 1.2, padding: [70, 70] as [number, number], maxZoom: 7 };
    if (prev[0] === here[0] && prev[1] === here[1]) m.flyTo(here, 6.5, { duration: opts.duration });
    else m.flyToBounds(L.latLngBounds([prev, here]), opts);
    return () => cancelAnimationFrame(raf);
  }, [active, reduce]);

  const whole = () => map.current?.flyToBounds(L.latLngBounds(places.map(([, ll]) => ll)), { padding: [60, 60], duration: 1 });

  return (
    <div className="relative h-full w-full overflow-hidden rounded-sm border border-hairline bg-sand">
      <div ref={el} className="journey-map h-full w-full" aria-label="Map of the places in my journey" role="img" />
      <button onClick={whole} className="absolute left-3 top-3 z-[500] inline-flex items-center gap-1.5 rounded-sm border border-hairline bg-surface/95 px-2.5 py-1.5 text-xs text-ink hover:border-ink">
        <RotateCcw size={13} aria-hidden /> Whole route
      </button>
      <ol className="absolute right-3 top-3 z-[500] flex gap-1" aria-hidden>
        {journey.map((s, i) => (
          <li key={s.id} className={`h-1.5 w-5 rounded-full transition-colors ${i <= active ? "bg-clay" : "bg-surface/90 border border-hairline"}`} />
        ))}
      </ol>
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
