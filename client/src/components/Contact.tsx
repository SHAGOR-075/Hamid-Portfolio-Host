import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { motion, AnimatePresence } from 'motion/react';
import confetti from 'canvas-confetti';
import { 
  Mail, 
  MapPin, 
  Send, 
  Copy, 
  Check, 
  Sparkles, 
  CheckCircle2, 
  MessageSquare,
  Clock
} from 'lucide-react';
import { SectionHeader } from './SectionHeader';
import { SocialLinks } from './SocialLinks';
import { useData } from '../context/DataContext';
import { buildWhatsAppUrl } from '../utils/whatsapp';

interface ContactFormData {
  name: string;
  email: string;
  subject: string;
  message: string;
}

export const Contact: React.FC = () => {
  const { profile } = useData();
  const [copiedEmail, setCopiedEmail] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [emailNotificationSent, setEmailNotificationSent] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors }
  } = useForm<ContactFormData>();

  const copyEmailToClipboard = () => {
    navigator.clipboard.writeText(profile.email);
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2500);
  };

  const whatsappUrl = buildWhatsAppUrl(
    profile.phone || '',
    `Hi ${profile.fullName}, I found your portfolio and would like to connect.`
  );

  const onSubmit = async (data: ContactFormData) => {
    setIsSubmitting(true);
    setSubmitError(null);
    setIsSubmitted(false);

    const API_BASE = (import.meta as any).env?.VITE_API_BASE_URL || 'https://hamid-portfolio-backend.vercel.app/api';

    try {
      const response = await fetch(`${API_BASE}/contact/messages`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      const result = await response.json().catch(() => ({}));

      if (!response.ok) {
        throw new Error(result.message || 'Failed to send your message. Please try again.');
      }

      setIsSubmitted(true);
      setEmailNotificationSent(Boolean(result.emailSent));
      reset();

      try {
        confetti({
          particleCount: 70,
          spread: 60,
          origin: { y: 0.7 },
          colors: ['#10B981', '#063B2A', '#34D399', '#A7F3D0']
        });
      } catch {
        // Fallback gracefully
      }
    } catch (error) {
      setSubmitError(
        error instanceof Error
          ? error.message
          : 'Unable to send your message right now. Please try again later.'
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className="py-20 md:py-28 relative">
      {/* Background ambient glow */}
      <div className="absolute bottom-10 right-10 w-96 h-96 bg-emerald-500/5 rounded-full blur-[140px] pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader
          number="06"
          badge="GET IN TOUCH"
          title="Let's Build Something Meaningful."
          subtitle="Have a challenging ML research problem, software opportunity, or collaboration in mind? Let's talk."
        />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
          {/* Left Column: Direct Contact Info & Socials */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.5 }}
            className="lg:col-span-5 space-y-8"
          >
            <div className="space-y-4">
              <h3 className="text-xl sm:text-2xl font-bold text-white dark:text-white light:text-neutral-900">
                Reach Out Directly
              </h3>
              <p className="text-sm text-neutral-400 dark:text-neutral-400 light:text-neutral-600 leading-relaxed">
                I am actively considering full-time opportunities in Machine Learning engineering, AI research assistance, and full-stack software development.
              </p>
            </div>

            {/* Contact Details Cards */}
            <div className="space-y-3.5">
              {/* Email Card with Copy Button */}
              <div className="p-4 rounded-2xl bg-neutral-900/60 dark:bg-[#0B0F0D] light:bg-white border border-neutral-800/80 dark:border-neutral-800/80 light:border-neutral-200 flex items-center justify-between group hover:border-emerald-500/40 transition-colors shadow-sm">
                <div className="flex items-center gap-3.5 min-w-0">
                  <div className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400 shrink-0">
                    <Mail size={18} />
                  </div>
                  <div className="min-w-0">
                    <p className="text-[11px] font-mono text-neutral-400 uppercase tracking-wider">Email Address</p>
                    <p className="text-sm font-semibold text-white dark:text-white light:text-neutral-900 truncate">
                      {profile.email}
                    </p>
                  </div>
                </div>

                <button
                  id="contact-copy-email-btn"
                  onClick={copyEmailToClipboard}
                  className="p-2 rounded-lg bg-neutral-800 hover:bg-emerald-500 hover:text-black text-neutral-300 transition-colors"
                  title="Copy email to clipboard"
                  aria-label="Copy email address"
                >
                  {copiedEmail ? <Check size={16} className="text-emerald-400 hover:text-black" /> : <Copy size={16} />}
                </button>
              </div>

              {/* WhatsApp Card */}
              {profile.phone && whatsappUrl && (
                <a
                  href={whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-4 rounded-2xl bg-neutral-900/60 dark:bg-[#0B0F0D] light:bg-white border border-neutral-800/80 dark:border-neutral-800/80 light:border-neutral-200 flex items-center justify-between group hover:border-emerald-500/40 transition-colors shadow-sm"
                  aria-label="Open WhatsApp chat"
                >
                  <div className="flex items-center gap-3.5 min-w-0">
                    <div className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400 shrink-0">
                      <MessageSquare size={18} />
                    </div>
                    <div className="min-w-0">
                      <p className="text-[11px] font-mono text-neutral-400 uppercase tracking-wider">WhatsApp</p>
                      <p className="text-sm font-semibold text-white dark:text-white light:text-neutral-900 truncate">
                        {profile.phone}
                      </p>
                    </div>
                  </div>
                  <span className="text-[11px] font-bold text-emerald-400 group-hover:text-emerald-300 shrink-0">
                    Chat Now
                  </span>
                </a>
              )}

              {/* Location Card */}
              <div className="p-4 rounded-2xl bg-neutral-900/60 dark:bg-[#0B0F0D] light:bg-white border border-neutral-800/80 dark:border-neutral-800/80 light:border-neutral-200 flex items-center gap-3.5 shadow-sm">
                <div className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400 shrink-0">
                  <MapPin size={18} />
                </div>
                <div>
                  <p className="text-[11px] font-mono text-neutral-400 uppercase tracking-wider">Location</p>
                  <p className="text-sm font-semibold text-white dark:text-white light:text-neutral-900">
                    {profile.cityCountry} (GMT+6)
                  </p>
                </div>
              </div>

              {/* Availability Status */}
              <div className="p-4 rounded-2xl bg-emerald-950/20 border border-emerald-500/30 flex items-center gap-3.5">
                <div className="w-10 h-10 rounded-xl bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center text-emerald-400 shrink-0">
                  <Clock size={18} />
                </div>
                <div>
                  <p className="text-[11px] font-mono text-emerald-400 uppercase tracking-wider font-bold">Status</p>
                  <p className="text-xs text-neutral-200 font-medium mt-0.5">
                    {profile.availability}
                  </p>
                </div>
              </div>
            </div>

            {/* Social Grid */}
            <div className="pt-2">
              <p className="text-xs font-mono text-neutral-400 uppercase tracking-wider mb-3 font-semibold">
                Social Profiles & Networks
              </p>
              <SocialLinks variant="cards" />
            </div>
          </motion.div>

          {/* Right Column: React Hook Form */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.5 }}
            className="lg:col-span-7"
          >
            <div className="p-6 sm:p-8 lg:p-10 rounded-3xl bg-neutral-900/60 dark:bg-[#0B0F0D] light:bg-white border border-neutral-800/80 dark:border-neutral-800/80 light:border-neutral-200 shadow-xl relative">
              <h3 className="text-xl sm:text-2xl font-bold text-white dark:text-white light:text-neutral-900 mb-2">
                Send a Message
              </h3>
              <p className="text-xs text-neutral-400 dark:text-neutral-400 light:text-neutral-600 mb-6">
                Fill out the form below and I'll get back to you within 24 hours.
              </p>

              <form onSubmit={handleSubmit(onSubmit)} className="space-y-4" noValidate>
                {/* Name & Email Row */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* Name */}
                  <div className="space-y-1.5 text-left">
                    <label htmlFor="contact-name" className="text-xs font-medium text-neutral-300 dark:text-neutral-300 light:text-neutral-700">
                      Your Name <span className="text-emerald-400">*</span>
                    </label>
                    <input
                      id="contact-name"
                      type="text"
                      placeholder="e.g. Sarah Jenkins"
                      {...register('name', { required: 'Please enter your name.' })}
                      className="w-full px-4 py-3 rounded-xl bg-neutral-950/80 dark:bg-neutral-950/80 light:bg-neutral-50 text-white dark:text-white light:text-neutral-900 border border-neutral-800 dark:border-neutral-800 light:border-neutral-300 focus:border-emerald-500 focus:outline-none focus:ring-1 focus:ring-emerald-500 text-sm transition-all"
                    />
                    {errors.name && (
                      <p className="text-[11px] text-rose-400 font-medium">{errors.name.message}</p>
                    )}
                  </div>

                  {/* Email */}
                  <div className="space-y-1.5 text-left">
                    <label htmlFor="contact-email" className="text-xs font-medium text-neutral-300 dark:text-neutral-300 light:text-neutral-700">
                      Your Email <span className="text-emerald-400">*</span>
                    </label>
                    <input
                      id="contact-email"
                      type="email"
                      placeholder="name@company.com"
                      {...register('email', {
                        required: 'Please enter your email address.',
                        pattern: {
                          value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                          message: 'Please enter a valid email address.'
                        }
                      })}
                      className="w-full px-4 py-3 rounded-xl bg-neutral-950/80 dark:bg-neutral-950/80 light:bg-neutral-50 text-white dark:text-white light:text-neutral-900 border border-neutral-800 dark:border-neutral-800 light:border-neutral-300 focus:border-emerald-500 focus:outline-none focus:ring-1 focus:ring-emerald-500 text-sm transition-all"
                    />
                    {errors.email && (
                      <p className="text-[11px] text-rose-400 font-medium">{errors.email.message}</p>
                    )}
                  </div>
                </div>

                {/* Subject */}
                <div className="space-y-1.5 text-left">
                  <label htmlFor="contact-subject" className="text-xs font-medium text-neutral-300 dark:text-neutral-300 light:text-neutral-700">
                    Subject <span className="text-emerald-400">*</span>
                  </label>
                  <input
                    id="contact-subject"
                    type="text"
                    placeholder="ML Project Collaboration / Job Opportunity"
                    {...register('subject', { required: 'Please specify a subject.' })}
                    className="w-full px-4 py-3 rounded-xl bg-neutral-950/80 dark:bg-neutral-950/80 light:bg-neutral-50 text-white dark:text-white light:text-neutral-900 border border-neutral-800 dark:border-neutral-800 light:border-neutral-300 focus:border-emerald-500 focus:outline-none focus:ring-1 focus:ring-emerald-500 text-sm transition-all"
                  />
                  {errors.subject && (
                    <p className="text-[11px] text-rose-400 font-medium">{errors.subject.message}</p>
                  )}
                </div>

                {/* Message */}
                <div className="space-y-1.5 text-left">
                  <label htmlFor="contact-message" className="text-xs font-medium text-neutral-300 dark:text-neutral-300 light:text-neutral-700">
                    Your Message <span className="text-emerald-400">*</span>
                  </label>
                  <textarea
                    id="contact-message"
                    rows={4}
                    placeholder="Describe your project, team goals, or question..."
                    {...register('message', {
                      required: 'Please write a message.',
                      minLength: { value: 10, message: 'Message should be at least 10 characters.' }
                    })}
                    className="w-full px-4 py-3 rounded-xl bg-neutral-950/80 dark:bg-neutral-950/80 light:bg-neutral-50 text-white dark:text-white light:text-neutral-900 border border-neutral-800 dark:border-neutral-800 light:border-neutral-300 focus:border-emerald-500 focus:outline-none focus:ring-1 focus:ring-emerald-500 text-sm transition-all resize-y"
                  />
                  {errors.message && (
                    <p className="text-[11px] text-rose-400 font-medium">{errors.message.message}</p>
                  )}
                </div>

                {/* Submit Button */}
                <button
                  id="contact-submit-btn"
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl text-sm font-bold bg-emerald-500 hover:bg-emerald-400 text-black shadow-lg shadow-emerald-500/20 transition-all duration-200 hover:-translate-y-0.5 active:translate-y-0 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
                >
                  {isSubmitting ? (
                    <span>Sending Dispatch...</span>
                  ) : (
                    <>
                      <Send size={15} />
                      <span>Send Message</span>
                    </>
                  )}
                </button>
              </form>

              {submitError && (
                <div className="mt-5 p-4 rounded-2xl bg-rose-950/40 border border-rose-500/40 text-rose-100 text-xs">
                  {submitError}
                </div>
              )}

              {/* Animated Success Toast */}
              <AnimatePresence>
                {isSubmitted && (
                  <motion.div
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="mt-5 p-4 rounded-2xl bg-[#063B2A] border border-emerald-500/50 flex items-center gap-3 text-emerald-100 shadow-xl"
                  >
                    <div className="p-2 rounded-xl bg-emerald-500 text-black shrink-0">
                      <CheckCircle2 size={18} />
                    </div>
                    <div className="text-left text-xs">
                      <p className="font-bold text-white text-sm">Thanks! Your message was sent successfully.</p>
                      <p className="text-emerald-200/90 mt-0.5">
                        {emailNotificationSent
                          ? 'I received your inquiry by email and will get back to you soon.'
                          : 'Your message was saved. I will review it and get back to you soon.'}
                      </p>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
