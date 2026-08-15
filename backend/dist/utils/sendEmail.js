"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendContactNotificationEmail = exports.getEmailConfigStatus = exports.isEmailConfigured = exports.isValidEmail = void 0;
const nodemailer_1 = __importDefault(require("nodemailer"));
function escapeHtml(text) {
    return text
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&#039;');
}
const isValidEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email.trim());
};
exports.isValidEmail = isValidEmail;
const isEmailConfigured = () => {
    return Boolean(process.env.SMTP_USER?.trim() && process.env.SMTP_PASS?.trim());
};
exports.isEmailConfigured = isEmailConfigured;
const getEmailConfigStatus = () => ({
    configured: (0, exports.isEmailConfigured)(),
    host: process.env.SMTP_HOST?.trim() || 'smtp.gmail.com',
    port: process.env.SMTP_PORT?.trim() || '465',
    sender: process.env.SMTP_USER?.trim() || null,
    receiver: process.env.NOTIFICATION_RECEIVER_EMAIL?.trim() ||
        process.env.ADMIN_EMAIL?.trim() ||
        null,
});
exports.getEmailConfigStatus = getEmailConfigStatus;
function getReceiverEmail() {
    return (process.env.NOTIFICATION_RECEIVER_EMAIL?.trim() ||
        process.env.ADMIN_EMAIL?.trim() ||
        'abdulhamid.cse@gmail.com');
}
function createTransporter() {
    const smtpHost = process.env.SMTP_HOST?.trim() || 'smtp.gmail.com';
    const smtpPort = parseInt(process.env.SMTP_PORT || '465', 10);
    const smtpUser = process.env.SMTP_USER?.trim();
    const smtpPass = process.env.SMTP_PASS?.trim();
    if (!smtpUser || !smtpPass) {
        throw new Error('SMTP credentials are not configured');
    }
    const transportOptions = {
        host: smtpHost,
        port: smtpPort,
        secure: smtpPort === 465,
        auth: {
            user: smtpUser,
            pass: smtpPass,
        },
        tls: {
            minVersion: 'TLSv1.2',
        },
        connectionTimeout: 15000,
        greetingTimeout: 15000,
        socketTimeout: 20000,
    };
    if (smtpPort === 587) {
        transportOptions.requireTLS = true;
    }
    return nodemailer_1.default.createTransport(transportOptions);
}
const sendContactNotificationEmail = async (payload) => {
    const { name, email, subject, message } = payload;
    const receiverEmail = getReceiverEmail();
    if (!(0, exports.isEmailConfigured)()) {
        console.error(`[Email Notification]: SMTP_USER / SMTP_PASS missing. Message from ${name} (${email}) saved, but email was not sent.`);
        return false;
    }
    const safeName = escapeHtml(name.trim());
    const safeEmail = escapeHtml(email.trim());
    const safeSubject = escapeHtml(subject.trim());
    const safeMessage = escapeHtml(message.trim()).replace(/\n/g, '<br />');
    const htmlContent = `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; background-color: #0b1511; color: #ffffff; padding: 24px; border-radius: 12px; border: 1px solid #1e2e25;">
      <div style="border-bottom: 1px solid #1a2e24; padding-bottom: 16px; margin-bottom: 20px;">
        <h2 style="color: #10b981; margin: 0 0 6px 0;">New Portfolio Contact Inquiry</h2>
        <p style="color: #9ca3af; font-size: 13px; margin: 0;">Received via Public Contact Form</p>
      </div>

      <div style="margin-bottom: 20px; background-color: #07100c; padding: 16px; border-radius: 8px; border: 1px solid #16261f;">
        <p style="margin: 0 0 8px 0; font-size: 14px;"><strong>From:</strong> ${safeName}</p>
        <p style="margin: 0 0 8px 0; font-size: 14px;"><strong>Sender Email:</strong> <a href="mailto:${safeEmail}" style="color: #34d399; text-decoration: none;">${safeEmail}</a></p>
        <p style="margin: 0; font-size: 14px;"><strong>Subject:</strong> ${safeSubject}</p>
      </div>

      <div style="margin-bottom: 24px;">
        <h3 style="color: #10b981; font-size: 15px; margin: 0 0 10px 0;">Message Content:</h3>
        <div style="background-color: #07100c; padding: 16px; border-radius: 8px; border: 1px solid #16261f; line-height: 1.6; font-size: 14px; color: #e5e7eb;">
          ${safeMessage}
        </div>
      </div>

      <div style="border-top: 1px solid #1a2e24; text-align: center; font-size: 12px; color: #6b7280; padding-top: 16px;">
        <p style="margin: 0;">Reply directly to this email to respond to <strong>${safeName}</strong> (${safeEmail}).</p>
      </div>
    </div>
  `;
    const mailOptions = {
        from: `"Portfolio Contact Form" <${process.env.SMTP_USER}>`,
        replyTo: email.trim(),
        to: receiverEmail,
        subject: `[Portfolio Inquiry] ${subject.trim()} - from ${name.trim()}`,
        text: `New message from ${name.trim()} (${email.trim()}):\n\nSubject: ${subject.trim()}\n\nMessage:\n${message.trim()}`,
        html: htmlContent,
    };
    for (let attempt = 1; attempt <= 2; attempt += 1) {
        try {
            const transporter = createTransporter();
            await transporter.verify();
            await transporter.sendMail(mailOptions);
            console.log(`[Email Notification]: Successfully sent notification email to ${receiverEmail}`);
            return true;
        }
        catch (error) {
            const message = error instanceof Error ? error.message : String(error);
            console.error(`[Email Notification Error]: Attempt ${attempt} failed to send email:`, message);
            if (attempt === 2) {
                return false;
            }
        }
    }
    return false;
};
exports.sendContactNotificationEmail = sendContactNotificationEmail;
