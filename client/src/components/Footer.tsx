import React from 'react';
import { ArrowUp, Sparkles, Heart } from 'lucide-react';
import { useData } from '../context/DataContext';
import { SocialLinks } from './SocialLinks';

export const Footer: React.FC = () => {
  const { profile } = useData();
  const profileData = profile;
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const navLinks = [
    { name: 'Home', href: '#hero' },
    { name: 'About', href: '#about' },
    { name: 'Skills', href: '#skills' },
    { name: 'Education', href: '#education' },
    { name: 'Project', href: '#projects' },
    { name: 'Travel', href: '#travel' },
    { name: 'Contact', href: '#contact' },
  ];

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    const targetId = href.replace('#', '');
    const element = document.getElementById(targetId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <footer className="border-t border-neutral-800/80 dark:border-neutral-800/80 light:border-neutral-200 bg-[#040705] dark:bg-[#040705] light:bg-neutral-100 text-white dark:text-white light:text-neutral-900 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14 lg:py-18">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 items-center justify-between pb-12 border-b border-neutral-800/60 dark:border-neutral-800/60 light:border-neutral-200">
          {/* Logo & Headline */}
          <div className="md:col-span-6 space-y-3 text-left">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400 font-extrabold text-sm">
                <span>{profileData.initials}</span>
              </div>
              <span className="text-xl font-extrabold tracking-tight">
                {profileData.fullName.toUpperCase()}
                <span className="text-emerald-400 font-black">.</span>
              </span>
            </div>
            <p className="text-xs font-mono text-emerald-400">
              {profileData.badge}
            </p>
            <p className="text-sm text-neutral-400 dark:text-neutral-400 light:text-neutral-600 max-w-md leading-relaxed">
              Synthesizing data intelligence with clean modern software systems and real-world exploration.
            </p>
          </div>

          {/* Social Links & Back to Top */}
          <div className="md:col-span-6 flex flex-col md:items-end gap-5">
            <SocialLinks iconSize={16} />
            <button
              onClick={scrollToTop}
              className="inline-flex items-center gap-2 text-xs font-mono text-neutral-400 hover:text-emerald-400 transition-colors w-fit group"
            >
              <span>Back to top</span>
              <div className="p-2 rounded-lg bg-neutral-900 dark:bg-neutral-900 light:bg-white border border-neutral-800 dark:border-neutral-800 light:border-neutral-300 group-hover:border-emerald-500/50 group-hover:text-emerald-400 transition-all">
                <ArrowUp size={14} className="group-hover:-translate-y-0.5 transition-transform" />
              </div>
            </button>
          </div>
        </div>

        {/* Quick Links Navigation & Copyright */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-6">
          {/* Nav links */}
          <div className="flex flex-wrap justify-center sm:justify-start gap-4 sm:gap-6 text-xs text-neutral-400 dark:text-neutral-400 light:text-neutral-600">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={(e) => handleNavClick(e, link.href)}
                className="hover:text-emerald-400 transition-colors"
              >
                {link.name}
              </a>
            ))}
          </div>

          {/* Copyright */}
          <p className="text-xs font-mono text-neutral-500 dark:text-neutral-500 light:text-neutral-600 text-center sm:text-right">
            © 2026 {profileData.fullName}. All Rights Reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};
