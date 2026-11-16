import nodemailer from "nodemailer";

const OWNER_NAME = "Saathvik Kalepu";
const SITE = "https://saathvik-kalepu.vercel.app";
const LINKS = {
  github: "https://github.com/saathvik-codes",
  linkedin: "https://linkedin.com/in/saathvik-kalepu-17041228b",
  resume: `${SITE}/Saathvik_Kalepu_Resume.pdf`,
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

const shell = (body) => `
<div style="background:#f7f5f0;padding:32px 12px;font-family:Georgia,'Times New Roman',serif;color:#16181d">
  <div style="max-width:560px;margin:0 auto;background:#fffefb;border:1px solid #e1ddd3">
    <div style="padding:28px 32px;border-bottom:1px solid #e1ddd3">
      <div style="font-size:22px;letter-spacing:-0.01em">${OWNER_NAME}</div>
      <div style="font:12px/1.4 Arial,Helvetica,sans-serif;letter-spacing:.12em;text-transform:uppercase;color:#80858f;margin-top:4px">Software Engineer</div>
    </div>
    <div style="padding:32px;font:15px/1.7 Arial,Helvetica,sans-serif">${body}</div>
  </div>
</div>`;

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

  const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: { user, pass: pass.replace(/\s+/g, "") },
  });

  const label = subject || "Portfolio inquiry";

  const ownerHtml = shell(`
    <p style="margin:0 0 4px;color:#80858f;font-size:12px;letter-spacing:.1em;text-transform:uppercase">From</p>
    <p style="margin:0 0 20px"><strong>${esc(name)}</strong> &lt;<a href="mailto:${esc(email)}" style="color:#23408e">${esc(email)}</a>&gt;</p>
    <p style="margin:0 0 4px;color:#80858f;font-size:12px;letter-spacing:.1em;text-transform:uppercase">Subject</p>
    <p style="margin:0 0 20px">${esc(label)}</p>
    <p style="margin:0 0 4px;color:#80858f;font-size:12px;letter-spacing:.1em;text-transform:uppercase">Message</p>
    <div style="white-space:pre-wrap;border-left:2px solid #a8541f;padding-left:14px">${esc(message)}</div>
    <p style="margin:24px 0 0;color:#80858f;font-size:12px">Reply to this email to respond directly to ${esc(name)}.</p>`);

  const replyHtml = shell(`
    <p style="margin:0 0 16px">Hi ${esc(name.split(" ")[0])},</p>
    <p style="margin:0 0 16px">Thanks for getting in touch. I have received your message and will reply personally, usually within one to two days.</p>
    <p style="margin:0 0 4px;color:#80858f;font-size:12px;letter-spacing:.1em;text-transform:uppercase">Your message</p>
    <div style="white-space:pre-wrap;border-left:2px solid #e1ddd3;padding-left:14px;color:#555b66;margin-bottom:20px">${esc(message)}</div>
    <p style="margin:0 0 16px">In the meantime: <a href="${LINKS.resume}" style="color:#23408e">resume</a> · <a href="${LINKS.github}" style="color:#23408e">GitHub</a> · <a href="${LINKS.linkedin}" style="color:#23408e">LinkedIn</a></p>
    <p style="margin:0">Regards,<br/>${OWNER_NAME}</p>
    <p style="margin:24px 0 0;color:#80858f;font-size:12px">This is an automatic confirmation. You can reply to it and it will reach me.</p>`);

  try {
    await transporter.sendMail({
      from: `"${OWNER_NAME} (Portfolio)" <${user}>`,
      to: owner,
      replyTo: `"${name.replace(/"/g, "")}" <${email}>`,
      subject: `Portfolio: ${label} — ${name}`,
      text: `From: ${name} <${email}>\nSubject: ${label}\n\n${message}`,
      html: ownerHtml,
    });
    // Auto-reply failure should not hide that the owner already received the message.
    try {
      await transporter.sendMail({
        from: `"${OWNER_NAME}" <${user}>`,
        to: email,
        replyTo: owner,
        subject: `Thanks for reaching out, ${name.split(" ")[0]}`,
        text: `Hi ${name.split(" ")[0]},\n\nThanks for getting in touch. I have received your message and will reply personally, usually within one to two days.\n\nRegards,\n${OWNER_NAME}`,
        html: replyHtml,
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
