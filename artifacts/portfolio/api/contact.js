import nodemailer from 'nodemailer';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method Not Allowed' });
  }

  const { name, email, subject, message } = req.body;

  if (!name || !email || !message) {
    return res.status(400).json({ message: 'Missing required fields' });
  }

  const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 465,
    secure: true,
    auth: {
      user: process.env.SMTP_USER || 'saathvikk202@gmail.com',
      pass: process.env.SMTP_PASS || 'sjyj todq exhx jxgk',
    },
  });

  const fromEmail = '"Saathvik Kalepu" <no-reply@saathvik.in>';
  const logoUrl = 'https://saathvik-kalepu.vercel.app/og-thumbnail.svg';

  // Email to you (Notification)
  const notificationHtml = `
    <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; max-width: 600px; margin: 0 auto; background-color: #0a0a0a; color: #fff; border-radius: 12px; overflow: hidden; border: 1px solid rgba(167, 139, 250, 0.2);">
      <div style="background-color: #050505; padding: 30px; text-align: center; border-bottom: 1px solid rgba(167, 139, 250, 0.1);">
        <h1 style="margin: 0; color: #a78bfa; font-size: 24px; letter-spacing: 2px; text-transform: uppercase;">New Contact Message</h1>
      </div>
      <div style="padding: 40px 30px; background-color: #0a0a0a;">
        <p style="margin: 0 0 10px; font-size: 14px; color: #a78bfa; text-transform: uppercase; letter-spacing: 1px;">From:</p>
        <p style="margin: 0 0 25px; font-size: 16px;"><strong>${name}</strong> (${email})</p>
        
        <p style="margin: 0 0 10px; font-size: 14px; color: #a78bfa; text-transform: uppercase; letter-spacing: 1px;">Subject:</p>
        <p style="margin: 0 0 25px; font-size: 16px;">${subject || 'No Subject'}</p>
        
        <p style="margin: 0 0 10px; font-size: 14px; color: #a78bfa; text-transform: uppercase; letter-spacing: 1px;">Message:</p>
        <div style="background-color: rgba(255, 255, 255, 0.03); padding: 20px; border-radius: 8px; font-size: 15px; line-height: 1.6; border: 1px solid rgba(255, 255, 255, 0.05); white-space: pre-wrap;">${message}</div>
      </div>
      <div style="background-color: #050505; padding: 20px; text-align: center; font-size: 12px; color: rgba(255, 255, 255, 0.4); border-top: 1px solid rgba(167, 139, 250, 0.1);">
        This message was sent from your portfolio website contact form.
      </div>
    </div>
  `;

  // Email to user (Auto-reply)
  const autoReplyHtml = `
    <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; max-width: 600px; margin: 0 auto; background-color: #0a0a0a; color: #fff; border-radius: 12px; overflow: hidden; border: 1px solid rgba(167, 139, 250, 0.2);">
      <div style="background-color: #050505; padding: 40px 30px; text-align: center; border-bottom: 1px solid rgba(167, 139, 250, 0.1);">
        <img src="${logoUrl}" alt="Saathvik Kalepu" style="max-width: 150px; margin-bottom: 20px;" />
        <h1 style="margin: 0; color: #a78bfa; font-size: 24px; letter-spacing: 1px;">Message Received!</h1>
      </div>
      <div style="padding: 40px 30px; background-color: #0a0a0a; line-height: 1.6;">
        <p style="font-size: 16px; margin-bottom: 20px;">Hi ${name},</p>
        <p style="font-size: 16px; margin-bottom: 20px; color: rgba(255, 255, 255, 0.8);">
          Thank you for reaching out! I've received your message and will get back to you as soon as possible.
        </p>
        <div style="background-color: rgba(167, 139, 250, 0.05); padding: 20px; border-radius: 8px; margin: 30px 0; border-left: 4px solid #a78bfa;">
          <p style="margin: 0; font-size: 14px; color: rgba(255, 255, 255, 0.6);">Your Message Subject:</p>
          <p style="margin: 5px 0 0; font-weight: 600;">${subject || 'Portfolio Inquiry'}</p>
        </div>
        <p style="font-size: 16px; margin-bottom: 30px; color: rgba(255, 255, 255, 0.8);">
          In the meantime, feel free to check out my <a href="https://github.com/saathvik-codes" style="color: #a78bfa; text-decoration: none;">GitHub</a> or <a href="https://linkedin.com/in/saathvik-kalepu-17041228b" style="color: #a78bfa; text-decoration: none;">LinkedIn</a>.
        </p>
        <p style="font-size: 16px; margin: 0;">
          Best regards,<br/>
          <strong style="color: #a78bfa;">Saathvik Kalepu</strong><br/>
          <span style="font-size: 12px; color: rgba(255, 255, 255, 0.4);">Full Stack Developer & AI Specialist</span>
        </p>
      </div>
      <div style="background-color: #050505; padding: 20px; text-align: center; font-size: 12px; color: rgba(255, 255, 255, 0.4); border-top: 1px solid rgba(167, 139, 250, 0.1);">
        © ${new Date().getFullYear()} Saathvik Kalepu. All rights reserved.<br/>
        Please do not reply to this automated email.
      </div>
    </div>
  `;

  try {
    // 1. Send notification to you
    await transporter.sendMail({
      from: fromEmail,
      to: 'saathvikk202@gmail.com', // Your email
      subject: `New Portfolio Message from ${name} - ${subject || 'No Subject'}`,
      html: notificationHtml,
      replyTo: email,
    });

    // 2. Send auto-reply to the user
    await transporter.sendMail({
      from: fromEmail,
      to: email, // User's email
      subject: `Thanks for reaching out, ${name}!`,
      html: autoReplyHtml,
    });

    return res.status(200).json({ success: true, message: 'Message sent successfully!' });
  } catch (error) {
    console.error('SMTP Error:', error);
    return res.status(500).json({ success: false, message: 'Failed to send message. Please try again later.' });
  }
}
