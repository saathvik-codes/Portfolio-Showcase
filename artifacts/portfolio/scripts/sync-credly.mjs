// Pulls the public badge list from Credly before every build so new badges
// appear on the site without editing code. Never fails the build: if Credly is
// unreachable the previously committed snapshot is used.
import { mkdir, writeFile, access } from "node:fs/promises";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const USER = "saathvik-kalepu";
const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const jsonPath = join(root, "src/data/credly.generated.json");
const badgeDir = join(root, "public/badges");
const exists = (p) => access(p).then(() => true, () => false);

try {
  const res = await fetch(`https://www.credly.com/users/${USER}/badges.json`, {
    headers: { Accept: "application/json", "User-Agent": "portfolio-build" },
    signal: AbortSignal.timeout(15000),
  });
  if (!res.ok) throw new Error(`Credly responded ${res.status}`);
  const { data } = await res.json();
  if (!Array.isArray(data) || data.length === 0) throw new Error("empty badge list");

  await mkdir(badgeDir, { recursive: true });
  const badges = [];
  for (const b of data) {
    if (b.state !== "accepted" || b.public === false) continue;
    const t = b.badge_template;
    const title = t.name.replace(/\s*Skill Badge$/i, "");
    const img = title.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "").slice(0, 48);
    const file = join(badgeDir, `${img}.png`);
    if (!(await exists(file))) {
      // Credly serves resized copies, so we keep images small.
      const small = t.image_url.replace("images.credly.com/images/", "images.credly.com/size/240x240/images/");
      const r = await fetch(small, { signal: AbortSignal.timeout(20000) });
      if (r.ok) await writeFile(file, Buffer.from(await r.arrayBuffer()));
    }
    badges.push({
      title,
      issuer: (b.issuer?.entities?.[0]?.entity?.name) || "Google Cloud",
      issued: b.issued_at_date,
      img,
      id: b.id,
    });
  }
  badges.sort((a, b) => b.issued.localeCompare(a.issued) || a.title.localeCompare(b.title));
  await writeFile(jsonPath, JSON.stringify({ syncedAt: new Date().toISOString().slice(0, 10), badges }, null, 2) + "\n");
  console.log(`credly: ${badges.length} badges synced`);
} catch (err) {
  console.warn(`credly: sync skipped (${err.message}); using committed snapshot`);
}
