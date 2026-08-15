import React from 'react';
import { Hero } from '../components/Hero';
import { About } from '../components/About';
import { Skills } from '../components/Skills';
import { Education } from '../components/Education';
import { MLProject } from '../components/MLProject';
import { TravelSection } from '../components/TravelSection';
import { Contact } from '../components/Contact';

interface HomeProps {
  onOpenResume: () => void;
}

export const Home: React.FC<HomeProps> = ({ onOpenResume }) => {
  return (
    <main className="relative flex flex-col w-full overflow-hidden">
      <Hero onOpenResume={onOpenResume} />
      <About />
      <Skills />
      <Education />
      <MLProject />
      <TravelSection />
      <Contact />
    </main>
  );
};
