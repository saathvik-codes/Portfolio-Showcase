// Live Google Cloud badges from Credly. Cached at Vercel's edge for 6 hours,
// so a newly earned badge shows up on the site the same day.
const USER = "saathvik-kalepu";

export default async function handler(req, res) {
  try {
    const r = await fetch(`https://www.credly.com/users/${USER}/badges.json`, {
      headers: { Accept: "application/json", "User-Agent": "portfolio" },
      signal: AbortSignal.timeout(8000),
    });
    if (!r.ok) throw new Error(`Credly ${r.status}`);
    const { data } = await r.json();
    const badges = (data || [])
      .filter((b) => b.state === "accepted" && b.public !== false)
      .map((b) => ({
        title: b.badge_template.name.replace(/\s*Skill Badge$/i, ""),
        issued: b.issued_at_date,
        id: b.id,
        image: b.badge_template.image_url,
      }))
      .sort((a, b) => b.issued.localeCompare(a.issued) || a.title.localeCompare(b.title));
    res.setHeader("Cache-Control", "public, s-maxage=21600, stale-while-revalidate=86400");
    return res.status(200).json({ badges });
  } catch (err) {
    console.error("badges:", err);
    res.setHeader("Cache-Control", "public, s-maxage=300");
    return res.status(502).json({ message: "Credly unavailable" });
  }
}
