/**
 * Live content. Both portfolio designs read the same profile.json from the
 * `portfolio-content` branch on GitHub, so editing that one file updates every
 * deployed design without a rebuild. Badges come live from Credly via /api/badges.
 *
 * The data bundled in portfolioData.ts is the fallback: if a fetch fails, is slow,
 * or returns something malformed, the site renders with the bundled copy.
 */
import * as data from "./portfolioData";

export const CONTENT_URL =
  "https://raw.githubusercontent.com/saathvik-codes/Portfolio-Showcase/portfolio-content/profile.json";

// Keys that can be overridden from profile.json, and the shape each must have.
const ARRAYS = [
  "socialLinks", "education", "experiences", "flagshipProjects", "archiveProjects",
  "visualBuilds", "skillMatrix", "certifications", "communityAndHackathons", "journey",
] as const;

function timeout<T>(p: Promise<T>, ms: number) {
  return Promise.race([p, new Promise<never>((_, rej) => setTimeout(() => rej(new Error("timeout")), ms))]);
}

function replaceArray<T>(target: T[], next: unknown) {
  if (!Array.isArray(next) || next.length === 0) return;
  target.splice(0, target.length, ...(next as T[]));
}

async function loadProfile() {
  const res = await timeout(fetch(CONTENT_URL, { cache: "no-cache" }), 2500);
  if (!res.ok) throw new Error(`content ${res.status}`);
  const json = (await res.json()) as Record<string, unknown>;
  if (json.profile && typeof json.profile === "object") Object.assign(data.profile, json.profile);
  for (const key of ARRAYS) {
    const target = (data as unknown as Record<string, unknown[]>)[key];
    if (Array.isArray(target)) replaceArray(target, json[key]);
  }
}

async function loadBadges() {
  const res = await timeout(fetch("/api/badges"), 2500);
  if (!res.ok) throw new Error(`badges ${res.status}`);
  const { badges } = (await res.json()) as { badges: { title: string; issued: string; id: string; image: string }[] };
  replaceArray(data.cloudBadges, badges.map(data.toBadge));
}

/** Numbers in the intro are counted from the content, never typed by hand. */
function deriveStats() {
  const s = data.heroStats;
  s[0].value = data.experiences.length;
  s[1].value = data.flagshipProjects.length;
  s[2].value = data.profile.leetcodeSolved;
  s[3].value = data.certifications.length + data.cloudBadges.length;
}

export async function loadContent() {
  await Promise.allSettled([loadProfile(), loadBadges()]);
  deriveStats();
}
