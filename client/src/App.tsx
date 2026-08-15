/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { ThemeProvider } from './context/ThemeContext';
import { DataProvider } from './context/DataContext';
import { Navbar } from './components/Navbar';
import { Home } from './pages/Home';
import { Footer } from './components/Footer';
import { CustomCursor } from './components/CustomCursor';
import { ScrollProgress } from './components/ScrollProgress';
import { ResumeModal } from './components/ResumeModal';

export default function App() {
  const [isResumeOpen, setIsResumeOpen] = useState(false);

  return (
    <ThemeProvider>
      <DataProvider>
        <div className="min-h-screen bg-[#050505] dark:bg-[#050505] light:bg-[#FFFFFF] text-white dark:text-white light:text-neutral-900 transition-colors duration-300 relative selection:bg-emerald-500/30 selection:text-emerald-300">
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
    </DataProvider>
  </ThemeProvider>
  );
}
