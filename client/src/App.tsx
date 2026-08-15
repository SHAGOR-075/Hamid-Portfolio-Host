/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { AnimatePresence } from 'motion/react';
import { ThemeProvider } from './context/ThemeContext';
import { DataProvider, useData } from './context/DataContext';
import { Navbar } from './components/Navbar';
import { Home } from './pages/Home';
import { Footer } from './components/Footer';
import { CustomCursor } from './components/CustomCursor';
import { ScrollProgress } from './components/ScrollProgress';
import { ResumeModal } from './components/ResumeModal';
import { GlobalLoadingScreen } from './components/GlobalLoadingScreen';

const MainContent: React.FC = () => {
  const { isLoading: isDataLoading } = useData();
  const [isResumeOpen, setIsResumeOpen] = useState(false);
  
  // Track initial cold load / reload only once per session
  const [isInitialLoading, setIsInitialLoading] = useState(true);

  useEffect(() => {
    // Determine when critical data and document assets are ready
    const handleAssetsLoaded = () => {
      // Ensure smooth minimum brand loading display (900ms)
      const timer = setTimeout(() => {
        setIsInitialLoading(false);
      }, 900);
      return () => clearTimeout(timer);
    };

    if (!isDataLoading) {
      if (document.readyState === 'complete') {
        handleAssetsLoaded();
      } else {
        window.addEventListener('load', handleAssetsLoaded);
        return () => window.removeEventListener('load', handleAssetsLoaded);
      }
    }
  }, [isDataLoading]);

  return (
    <div className="min-h-screen bg-[#050505] dark:bg-[#050505] light:bg-[#FFFFFF] text-white dark:text-white light:text-neutral-900 transition-colors duration-300 relative selection:bg-emerald-500/30 selection:text-emerald-300">
      {/* Global Brand Loading Screen with smooth Framer-Motion Fade Out */}
      <AnimatePresence mode="wait">
        {isInitialLoading && <GlobalLoadingScreen key="global-loading-screen" />}
      </AnimatePresence>

      {/* Scroll Progress Bar */}
      <ScrollProgress />

      {/* Subtle Desktop Custom Cursor */}
      <CustomCursor />

      {/* Sticky Navbar */}
      <Navbar onOpenResume={() => setIsResumeOpen(true)} />

      {/* Main Content Layout */}
      <Home onOpenResume={() => setIsResumeOpen(true)} />

      {/* Global Footer */}
      <Footer />

      {/* Interactive Resume / CV Modal */}
      <ResumeModal
        isOpen={isResumeOpen}
        onClose={() => setIsResumeOpen(false)}
      />
    </div>
  );
};

export default function App() {
  return (
    <ThemeProvider>
      <DataProvider>
        <MainContent />
      </DataProvider>
    </ThemeProvider>
  );
}
