import nodemailer from "nodemailer";

const OWNER_NAME = "Saathvik Kalepu";
// Used for email images when the request comes from localhost (images must be public).
const FALLBACK_SITE = "https://saathvik-kalepu-walkthrough.vercel.app";
const LINKS = {
  github: "https://github.com/saathvik-codes",
  linkedin: "https://linkedin.com/in/saathvik-kalepu-17041228b",
  leetcode: "https://leetcode.com/u/Sunny550/",
};

// Best-effort per-instance rate limit (serverless instances are short-lived).
const hits = new Map();
function limited(ip) {
  const now = Date.now();
  const recent = (hits.get(ip) || []).filter((t) => now - t < 10 * 60 * 1000);
  recent.push(now);
  hits.set(ip, recent);
  return recent.length > 5;
}

const esc = (s) =>
  String(s).replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c]);
const clean = (s, max) => String(s ?? "").replace(/[\r\n]+/g, " ").trim().slice(0, max);

/* ---------- Email building blocks (table layout, inline styles: works in Gmail, Outlook, Apple Mail) ---------- */

const FONT = "-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Helvetica,Arial,sans-serif";
const C = { paper: "#f7f5f0", card: "#ffffff", ink: "#16181d", muted: "#555b66", faint: "#80858f", line: "#e1ddd3", accent: "#23408e", soft: "#f3f1ec" };

const icon = (site, name, size, alt = "") =>
  `<img src="${site}/email/${name}.png" width="${size}" height="${size}" alt="${alt}" style="display:block;border:0;outline:none;width:${size}px;height:${size}px">`;

function layout(site, { preheader, label, body, footer }) {
  return `<!doctype html>
<html><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><meta name="color-scheme" content="light"></head>
<body style="margin:0;padding:0;background:${C.paper}">
<span style="display:none;max-height:0;overflow:hidden;opacity:0">${esc(preheader)}</span>
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:${C.paper}">
<tr><td align="center" style="padding:32px 12px">
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="max-width:600px;background:${C.card};border:1px solid ${C.line};border-radius:6px">
    <tr><td style="padding:24px 32px;border-bottom:1px solid ${C.line}">
      <table role="presentation" width="100%" cellpadding="0" cellspacing="0"><tr>
        <td valign="middle"><a href="${site}" style="text-decoration:none"><img src="${site}/email/sk.png" width="52" height="42" alt="SK" style="display:block;border:0;width:52px;height:42px"></a></td>
        <td valign="middle" align="right" style="font:600 11px/1 ${FONT};letter-spacing:.14em;text-transform:uppercase;color:${C.faint}">${label}</td>
      </tr></table>
    </td></tr>
    <tr><td style="padding:32px;font:15px/1.65 ${FONT};color:${C.ink}">${body}</td></tr>
    <tr><td style="padding:20px 32px;border-top:1px solid ${C.line};background:${C.soft};border-radius:0 0 6px 6px;font:12px/1.6 ${FONT};color:${C.faint}">${footer}</td></tr>
  </table>
</td></tr>
</table>
</body></html>`;
}

/** One labelled detail row: icon, small label, value. */
const detail = (site, name, label, value) => `
<tr>
  <td width="28" valign="top" style="padding:10px 0">${icon(site, name, 18, "")}</td>
  <td valign="top" style="padding:10px 0;border-bottom:1px solid ${C.line}">
    <div style="font:600 11px/1.4 ${FONT};letter-spacing:.1em;text-transform:uppercase;color:${C.faint}">${label}</div>
    <div style="font:15px/1.5 ${FONT};color:${C.ink};margin-top:2px">${value}</div>
  </td>
</tr>`;

const quote = (text, border) =>
  `<div style="white-space:pre-wrap;font:15px/1.65 ${FONT};color:${C.ink};background:${C.soft};border-left:3px solid ${border};padding:16px 18px;border-radius:0 4px 4px 0">${esc(text)}</div>`;

/** Round icon-only link (alt + title carry the label for screen readers and hover). */
const iconLink = (site, name, href, label) => `
<td style="padding:0 6px">
  <a href="${href}" title="${label}" style="display:block;width:44px;height:44px;border:1px solid ${C.line};border-radius:22px;background:${C.card};text-decoration:none">
    <table role="presentation" width="44" height="44" cellpadding="0" cellspacing="0"><tr><td align="center" valign="middle">${icon(site, name, 22, label)}</td></tr></table>
  </a>
</td>`;

function ownerEmail(site, { name, email, label, message }) {
  const first = esc(name.split(" ")[0]);
  const replyHref = `mailto:${encodeURIComponent(email)}?subject=${encodeURIComponent("Re: " + label)}`;
  return layout(site, {
    preheader: `${name}: ${message.slice(0, 90)}`,
    label: "New message",
    body: `
      <h1 style="margin:0 0 6px;font:600 22px/1.3 ${FONT};color:${C.ink}">${esc(name)} wrote to you</h1>
      <p style="margin:0 0 20px;color:${C.muted}">Via the contact form on your portfolio.</p>
      <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="margin-bottom:24px">
        ${detail(site, "user", "Name", esc(name))}
        ${detail(site, "mail", "Email", `<a href="mailto:${esc(email)}" style="color:${C.accent};text-decoration:none">${esc(email)}</a>`)}
        ${detail(site, "tag", "Subject", esc(label))}
      </table>
      <table role="presentation" cellpadding="0" cellspacing="0" style="margin-bottom:10px"><tr>
        <td width="26" valign="middle">${icon(site, "message", 18)}</td>
        <td style="font:600 11px/1 ${FONT};letter-spacing:.1em;text-transform:uppercase;color:${C.faint}">Message</td>
      </tr></table>
      ${quote(message, C.accent)}
      <table role="presentation" cellpadding="0" cellspacing="0" style="margin-top:28px"><tr>
        <td style="background:${C.ink};border-radius:4px">
          <a href="${replyHref}" style="display:block;padding:12px 20px;font:600 14px/1 ${FONT};color:#ffffff;text-decoration:none">
            <table role="presentation" cellpadding="0" cellspacing="0"><tr>
              <td valign="middle" style="padding-right:8px">${icon(site, "reply", 16)}</td>
              <td valign="middle" style="font:600 14px/1 ${FONT};color:#ffffff">Reply to ${first}</td>
            </tr></table>
          </a>
        </td>
      </tr></table>`,
    footer: `Hitting reply in your mail app also goes straight to ${esc(name)}.`,
  });
}

function autoReply(site, { name, message }) {
  const first = esc(name.split(" ")[0]);
  return layout(site, {
    preheader: "Got your message. I'll reply personally, usually within a day or two.",
    label: "Message received",
    body: `
      <h1 style="margin:0 0 16px;font:600 22px/1.3 ${FONT};color:${C.ink}">Thanks, ${first}.</h1>
      <p style="margin:0 0 14px">Your message reached me. I read every one myself and usually reply within one or two days.</p>
      <p style="margin:0 0 22px;color:${C.muted}">For your records, here is what you sent:</p>
      ${quote(message, C.line)}
      <p style="margin:28px 0 12px;font:600 11px/1 ${FONT};letter-spacing:.1em;text-transform:uppercase;color:${C.faint}">While you wait</p>
      <table role="presentation" cellpadding="0" cellspacing="0" style="margin-left:-6px"><tr>
        ${iconLink(site, "resume", `${site}/Saathvik_Kalepu_Resume.pdf`, "Resume")}
        ${iconLink(site, "github", LINKS.github, "GitHub")}
        ${iconLink(site, "linkedin", LINKS.linkedin, "LinkedIn")}
        ${iconLink(site, "leetcode", LINKS.leetcode, "LeetCode")}
        ${iconLink(site, "site", site, "Portfolio")}
      </tr></table>
      <p style="margin:28px 0 0">Talk soon,<br>Saathvik</p>`,
    footer: `This is an automatic confirmation from ${esc(site.replace(/^https?:\/\//, ""))}. Replying to it reaches me directly.`,
  });
}

/* ---------- Handler ---------- */

export default async function handler(req, res) {
  if (req.method !== "POST") {
    res.setHeader("Allow", "POST");
    return res.status(405).json({ message: "Method not allowed" });
  }

  const body = typeof req.body === "string" ? safeParse(req.body) : req.body || {};
  if (body.website) return res.status(200).json({ success: true }); // honeypot

  const name = clean(body.name, 100);
  const email = clean(body.email, 200);
  const subject = clean(body.subject, 150);
  const message = String(body.message ?? "").trim().slice(0, 4000);

  if (!name || !email || message.length < 10) {
    return res.status(400).json({ message: "Please fill in your name, email and a message of at least 10 characters." });
  }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email)) {
    return res.status(400).json({ message: "That email address does not look valid." });
  }

  const ip = String(req.headers["x-forwarded-for"] || req.socket?.remoteAddress || "unknown").split(",")[0].trim();
  if (limited(ip)) return res.status(429).json({ message: "Too many messages. Please try again later." });

  const user = process.env.SMTP_USER || process.env.SMTP_EMAIL;
  const pass = process.env.SMTP_PASS || process.env.SMTP_APP_PASSWORD;
  if (!user || !pass) {
    console.error("SMTP credentials are not configured");
    return res.status(500).json({ message: "Email is not configured on the server." });
  }
  const owner = process.env.CONTACT_TO || user;

  // Images in the emails are served from whichever deployment handled the request.
  const host = String(req.headers["x-forwarded-host"] || req.headers.host || "");
  const site = process.env.SITE_URL || (host && !/localhost|127\.0\.0\.1/.test(host) ? `https://${host}` : FALLBACK_SITE);

  const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: { user, pass: pass.replace(/\s+/g, "") },
  });

  const label = subject || "Portfolio inquiry";
  const first = name.split(" ")[0];

  try {
    await transporter.sendMail({
      from: `"${OWNER_NAME} (Portfolio)" <${user}>`,
      to: owner,
      replyTo: `"${name.replace(/"/g, "")}" <${email}>`,
      subject: `Portfolio: ${label} — ${name}`,
      text: `From: ${name} <${email}>\nSubject: ${label}\n\n${message}`,
      html: ownerEmail(site, { name, email, label, message }),
    });
    // Auto-reply failure should not hide that the owner already received the message.
    try {
      await transporter.sendMail({
        from: `"${OWNER_NAME}" <${user}>`,
        to: email,
        replyTo: owner,
        subject: `Thanks for reaching out, ${first}`,
        text: `Hi ${first},\n\nYour message reached me. I read every one myself and usually reply within one or two days.\n\nTalk soon,\nSaathvik\n\nResume: ${site}/Saathvik_Kalepu_Resume.pdf\nGitHub: ${LINKS.github}\nLinkedIn: ${LINKS.linkedin}`,
        html: autoReply(site, { name, message }),
      });
    } catch (err) {
      console.error("Auto-reply failed:", err);
    }
    return res.status(200).json({ success: true, message: "Message sent." });
  } catch (err) {
    console.error("SMTP error:", err);
    return res.status(500).json({ message: "Could not send your message. Please email me directly." });
  }
}

function safeParse(s) {
  try { return JSON.parse(s); } catch { return {}; }
}

// Exposed for local previews of the templates.
export const __templates = { ownerEmail, autoReply };
