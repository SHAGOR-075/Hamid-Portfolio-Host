import React from 'react';
import { 
  Youtube, 
  Facebook, 
  Instagram, 
  Linkedin, 
  Twitter, 
  Github, 
  Globe
} from 'lucide-react';
import { useData } from '../context/DataContext';

interface SocialLinksProps {
  className?: string;
  iconSize?: number;
  variant?: 'minimal' | 'pills' | 'cards';
  showLabels?: boolean;
}

export const SocialLinks: React.FC<SocialLinksProps> = ({
  className = "",
  iconSize = 18,
  variant = 'minimal',
  showLabels = false,
}) => {
  const { socials } = useData();

  const items = [
    {
      name: "GitHub",
      url: socials.github,
      icon: Github,
      color: "hover:text-emerald-400 hover:border-emerald-500/40",
      bgHover: "hover:bg-emerald-500/10",
      tag: "Code & ML Repos"
    },
    {
      name: "LinkedIn",
      url: socials.linkedin,
      icon: Linkedin,
      color: "hover:text-emerald-400 hover:border-emerald-500/40",
      bgHover: "hover:bg-emerald-500/10",
      tag: "Professional Network"
    },
    {
      name: "X / Twitter",
      url: socials.twitter,
      icon: Twitter,
      color: "hover:text-emerald-400 hover:border-emerald-500/40",
      bgHover: "hover:bg-emerald-500/10",
      tag: "Tech Thoughts"
    },
    {
      name: "Instagram",
      url: socials.instagram,
      icon: Instagram,
      color: "hover:text-emerald-400 hover:border-emerald-500/40",
      bgHover: "hover:bg-emerald-500/10",
      tag: "Travel Visuals"
    },
    {
      name: "YouTube",
      url: socials.youtube,
      icon: Youtube,
      color: "hover:text-emerald-400 hover:border-emerald-500/40",
      bgHover: "hover:bg-emerald-500/10",
      tag: "Tech & Vlogs"
    },
    {
      name: "Facebook",
      url: socials.facebook,
      icon: Facebook,
      color: "hover:text-emerald-400 hover:border-emerald-500/40",
      bgHover: "hover:bg-emerald-500/10",
      tag: "Social Connection"
    }
  ];

  if (variant === 'cards') {
    return (
      <div className={`grid grid-cols-2 sm:grid-cols-3 gap-3 ${className}`}>
        {items.map((item) => {
          const Icon = item.icon;
          return (
            <a
              key={item.name}
              id={`social-card-${item.name.toLowerCase().replace(/[^a-z0-9]/g, '-')}`}
              href={item.url}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center gap-3 p-3.5 rounded-xl bg-neutral-900/60 dark:bg-[#0B0F0D] light:bg-neutral-100 border border-neutral-800 dark:border-neutral-800/80 light:border-neutral-200 hover:border-emerald-500/40 transition-all duration-300 hover:-translate-y-1 shadow-sm"
              aria-label={`Visit ${item.name}`}
            >
              <div className="p-2 rounded-lg bg-emerald-500/10 text-emerald-400 group-hover:bg-emerald-500 group-hover:text-black transition-colors duration-300">
                <Icon size={18} />
              </div>
              <div className="min-w-0">
                <p className="text-sm font-semibold text-neutral-200 dark:text-neutral-200 light:text-neutral-900 group-hover:text-emerald-400 transition-colors">
                  {item.name}
                </p>
                <p className="text-xs text-neutral-400 dark:text-neutral-400 light:text-neutral-500 truncate">
                  {item.tag}
                </p>
              </div>
            </a>
          );
        })}
      </div>
    );
  }

  if (variant === 'pills') {
    return (
      <div className={`flex flex-wrap items-center gap-2 ${className}`}>
        {items.map((item) => {
          const Icon = item.icon;
          return (
            <a
              key={item.name}
              id={`social-pill-${item.name.toLowerCase().replace(/[^a-z0-9]/g, '-')}`}
              href={item.url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-medium bg-neutral-900/80 dark:bg-[#0B0F0D] light:bg-neutral-100 text-neutral-300 dark:text-neutral-300 light:text-neutral-700 border border-neutral-800 dark:border-neutral-800 light:border-neutral-200 hover:border-emerald-500/40 hover:text-emerald-400 transition-all duration-200"
              aria-label={`Visit ${item.name}`}
            >
              <Icon size={14} className="text-emerald-400" />
              <span>{item.name}</span>
            </a>
          );
        })}
      </div>
    );
  }

  return (
    <div className={`flex items-center flex-wrap gap-2.5 ${className}`}>
      {items.map((item) => {
        const Icon = item.icon;
        return (
          <a
            key={item.name}
            id={`social-link-${item.name.toLowerCase().replace(/[^a-z0-9]/g, '-')}`}
            href={item.url}
            target="_blank"
            rel="noopener noreferrer"
            className="group relative p-2.5 rounded-xl bg-neutral-900/70 dark:bg-[#0B0F0D] light:bg-neutral-100 text-neutral-400 dark:text-neutral-400 light:text-neutral-600 border border-neutral-800/80 dark:border-neutral-800/80 light:border-neutral-200 hover:text-emerald-400 hover:border-emerald-500/50 hover:bg-emerald-500/10 transition-all duration-300 hover:-translate-y-0.5 active:translate-y-0"
            aria-label={`Visit ${item.name}`}
            title={item.name}
          >
            <Icon size={iconSize} className="transition-transform duration-200 group-hover:scale-110" />
            {showLabels && (
              <span className="ml-2 text-xs font-medium">{item.name}</span>
            )}
          </a>
        );
      })}
    </div>
  );
};
