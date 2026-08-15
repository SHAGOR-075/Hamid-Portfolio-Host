"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendContactNotificationEmail = exports.isValidEmail = void 0;
const nodemailer_1 = __importDefault(require("nodemailer"));
const isValidEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email.trim());
};
exports.isValidEmail = isValidEmail;
const sendContactNotificationEmail = async (payload) => {
    const { name, email, subject, message } = payload;
    const smtpHost = process.env.SMTP_HOST || 'smtp.gmail.com';
    const smtpPort = parseInt(process.env.SMTP_PORT || '587', 10);
    const smtpUser = process.env.SMTP_USER;
    const smtpPass = process.env.SMTP_PASS;
    const receiverEmail = process.env.NOTIFICATION_RECEIVER_EMAIL ||
        process.env.ADMIN_EMAIL ||
        'abdulhamid.cse@gmail.com';
    if (!smtpUser || !smtpPass) {
        console.log(`[Email Notification]: SMTP_USER / SMTP_PASS not set in .env. Form submission from ${name} (${email}) saved to MongoDB inbox.`);
        return false;
    }
    try {
        const transporter = nodemailer_1.default.createTransport({
            host: smtpHost,
            port: smtpPort,
            secure: smtpPort === 465,
            auth: {
                user: smtpUser,
                pass: smtpPass,
            },
        });
        const htmlContent = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; background-color: #0b1511; color: #ffffff; padding: 24px; border-radius: 12px; border: 1px solid #1e2e25;">
        <div style="border-b: 1px solid #1a2e24; padding-bottom: 16px; margin-bottom: 20px;">
          <h2 style="color: #10b981; margin: 0 0 6px 0;">New Portfolio Contact Inquiry</h2>
          <p style="color: #9ca3af; font-size: 13px; margin: 0;">Received via Public Contact Form</p>
        </div>

        <div style="margin-bottom: 20px; background-color: #07100c; padding: 16px; border-radius: 8px; border: 1px solid #16261f;">
          <p style="margin: 0 0 8px 0; font-size: 14px;"><strong>From:</strong> ${name}</p>
          <p style="margin: 0 0 8px 0; font-size: 14px;"><strong>Sender Email:</strong> <a href="mailto:${email}" style="color: #34d399; text-decoration: none;">${email}</a></p>
          <p style="margin: 0; font-size: 14px;"><strong>Subject:</strong> ${subject}</p>
        </div>

        <div style="margin-bottom: 24px;">
          <h3 style="color: #10b981; font-size: 15px; margin: 0 0 10px 0;">Message Content:</h3>
          <div style="background-color: #07100c; padding: 16px; border-radius: 8px; border: 1px solid #16261f; line-height: 1.6; font-size: 14px; color: #e5e7eb; whitespace: pre-wrap;">
            ${message}
          </div>
        </div>

        <div style="border-t: 1px solid #1a2e24; pt-16px; text-align: center; font-size: 12px; color: #6b7280; padding-top: 16px;">
          <p style="margin: 0;">Reply directly to this email to respond to <strong>${name}</strong> (${email}).</p>
        </div>
      </div>
    `;
        await transporter.sendMail({
            from: `"Portfolio Contact Form" <${smtpUser}>`,
            replyTo: email,
            to: receiverEmail,
            subject: `[Portfolio Inquiry] ${subject} - from ${name}`,
            text: `New message from ${name} (${email}):\n\nSubject: ${subject}\n\nMessage:\n${message}`,
            html: htmlContent,
        });
        console.log(`[Email Notification]: ✅ Successfully dispatched notification email to ${receiverEmail}`);
        return true;
    }
    catch (error) {
        console.error('[Email Notification Error]: Failed to send notification email:', error);
        return false;
    }
};
exports.sendContactNotificationEmail = sendContactNotificationEmail;
