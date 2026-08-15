import React, { useEffect, useState } from 'react';

export const ScrollProgress: React.FC = () => {
  const [scrollPercentage, setScrollPercentage] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (totalHeight > 0) {
        const currentProgress = (window.scrollY / totalHeight) * 100;
        setScrollPercentage(Math.min(100, Math.max(0, currentProgress)));
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div 
      id="scroll-progress-bar"
      className="fixed top-0 left-0 right-0 h-[3px] bg-transparent z-[100] pointer-events-none"
    >
      <div 
        className="h-full bg-gradient-to-r from-emerald-600 via-emerald-400 to-teal-300 transition-all duration-75 ease-out shadow-[0_0_8px_rgba(16,185,129,0.7)]"
        style={{ width: `${scrollPercentage}%` }}
      />
    </div>
  );
};
