import React, { createContext, useContext, useEffect, useState } from 'react';
import { profileData as defaultProfile, socialLinks as defaultSocials } from '../data/portfolioData';
import { skillsData as defaultSkills } from '../data/skills';
import { educationData as defaultEducation, mlProjectsData as defaultProjects } from '../data/portfolioData';
import { travelData as defaultTravel } from '../data/travelData';
import { SkillItem, EducationItem, MLProjectItem, TravelDestination } from '../types';

const API_BASE = (import.meta as any).env?.VITE_API_BASE_URL || 'https://hamid-portfolio-backend.vercel.app/api';

interface DataContextType {
  profile: typeof defaultProfile;
  skills: SkillItem[];
  education: EducationItem[];
  projects: MLProjectItem[];
  travel: TravelDestination[];
  socials: typeof defaultSocials;
  isLoading: boolean;
  isLive: boolean;
  refreshData: () => Promise<void>;
}

const DataContext = createContext<DataContextType | undefined>(undefined);

export const DataProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [profile, setProfile] = useState(defaultProfile);
  const [skills, setSkills] = useState<SkillItem[]>(defaultSkills);
  const [education, setEducation] = useState<EducationItem[]>(defaultEducation);
  const [projects, setProjects] = useState<MLProjectItem[]>(defaultProjects);
  const [travel, setTravel] = useState<TravelDestination[]>(defaultTravel);
  const [socials, setSocials] = useState(defaultSocials);
  const [isLoading, setIsLoading] = useState(true);
  const [isLive, setIsLive] = useState(false);

  const fetchData = async () => {
    try {
      // Fetch Home & About to populate profile
      const [homeRes, aboutRes, skillsRes, eduRes, projRes, trvRes, socRes, contactRes] = await Promise.allSettled([
        fetch(`${API_BASE}/home`).then((r) => (r.ok ? r.json() : null)),
        fetch(`${API_BASE}/about`).then((r) => (r.ok ? r.json() : null)),
        fetch(`${API_BASE}/skills`).then((r) => (r.ok ? r.json() : null)),
        fetch(`${API_BASE}/education`).then((r) => (r.ok ? r.json() : null)),
        fetch(`${API_BASE}/projects`).then((r) => (r.ok ? r.json() : null)),
        fetch(`${API_BASE}/travel`).then((r) => (r.ok ? r.json() : null)),
        fetch(`${API_BASE}/socials`).then((r) => (r.ok ? r.json() : null)),
        fetch(`${API_BASE}/contact`).then((r) => (r.ok ? r.json() : null)),
      ]);

      let liveDetected = false;

      // Map Profile Data
      const home = homeRes.status === 'fulfilled' ? homeRes.value : null;
      const about = aboutRes.status === 'fulfilled' ? aboutRes.value : null;
      const contact = contactRes.status === 'fulfilled' ? contactRes.value : null;

      if (home || about || contact) {
        liveDetected = true;
        setProfile((prev) => ({
          ...prev,
          name: home?.name ? home.name.split(' ')[0] : prev.name,
          fullName: home?.name || prev.fullName,
          badge: home?.badge || prev.badge,
          title: home?.heading || prev.title,
          subtitle: home?.description || prev.subtitle,
          location: home?.location || prev.location,
          cityCountry: home?.location || prev.cityCountry,
          availability: home?.availability || contact?.availability || prev.availability,
          profileImage: about?.profileImage || home?.heroImage || prev.profileImage,
          aboutImage: about?.profileImage || prev.aboutImage,
          email: contact?.email || prev.email,
          phone: contact?.phone || prev.phone,
          bio: {
            ...prev.bio,
            intro: about?.description || prev.bio.intro,
            body1: about?.paragraphs?.[0] || prev.bio.body1,
            body2: about?.paragraphs?.[1] || prev.bio.body2,
            quote: about?.paragraphs?.[2] || prev.bio.quote,
          },
          stats: about?.stats?.length
            ? about.stats.map((s: any) => ({
                value: s.value,
                label: s.label,
                sublabel: s.label,
              }))
            : prev.stats,
        }));
      }

      // Map Skills
      if (skillsRes.status === 'fulfilled' && Array.isArray(skillsRes.value)) {
        liveDetected = true;
        const mappedSkills: SkillItem[] = skillsRes.value.map((s: any) => {
          const c = s.category?.toLowerCase() || '';
          const catKey = (c.includes('machine') || c === 'ml' ? 'ml' :
                          c.includes('web') || c.includes('front') || c.includes('back') ? 'web' :
                          c.includes('tool') || c.includes('data') || c.includes('devops') ? 'tools' : 'programming') as any;
          return {
            name: s.name,
            category: catKey,
            categoryLabel: s.category || 'Programming',
            level: s.level || 80,
            experience: `${s.level || 80}% Proficiency`,
            description: s.description || '',
            iconName: s.icon || 'Code',
            popular: s.level >= 90,
          };
        });
        setSkills(mappedSkills);
      }

      // Map Education
      if (eduRes.status === 'fulfilled' && Array.isArray(eduRes.value)) {
        liveDetected = true;
        const mappedEdu: EducationItem[] = eduRes.value.map((e: any) => ({
          id: e.id || e.customId || e._id,
          degree: e.degree,
          major: e.department || 'Computer Science',
          institution: e.institution,
          location: e.location || 'Bangladesh',
          period: `${e.startYear} — ${e.endYear}`,
          startYear: e.startYear,
          endYear: e.endYear,
          grade: e.gpa,
          resultLabel: e.gpa ? 'Result' : undefined,
          status: 'Completed',
          description: e.description || '',
          coursework: [],
          achievements: e.achievement ? [e.achievement] : [],
        }));
        setEducation(mappedEdu);
      }

      // Map Projects
      if (projRes.status === 'fulfilled' && Array.isArray(projRes.value)) {
        liveDetected = true;
        const mappedProjects: MLProjectItem[] = projRes.value.map((p: any) => ({
          id: p.id || p.customId || p._id,
          title: p.title,
          tagline: p.shortDescription || p.title,
          featured: p.featured ?? false,
          category: p.category || 'Machine Learning',
          problem: p.shortDescription || '',
          solution: p.description || '',
          results: p.metrics?.[0]?.value || 'Production Ready',
          tags: p.technologies || ['Python', 'PyTorch'],
          metrics: p.metrics || [{ label: 'Status', value: 'Deployed' }],
          image: p.image,
          githubUrl: p.githubUrl || '#',
          demoUrl: p.liveUrl || '#',
          features: p.features || [],
          architectureOverview: p.architectureOverview || '',
        }));
        setProjects(mappedProjects);
      }

      // Map Travel
      if (trvRes.status === 'fulfilled' && Array.isArray(trvRes.value)) {
        liveDetected = true;
        const mappedTravel: TravelDestination[] = trvRes.value.map((t: any, idx: number) => ({
          id: idx + 1,
          image: t.coverImage || t.photos?.[0]?.url,
          location: t.location,
          country: t.country || 'Bangladesh',
          date: t.date || '2025',
          category: 'Mountains & Valleys',
          coordinates: '23.8103° N, 90.4125° E',
          description: t.shortDescription || t.longDescription,
          highlight: t.location,
          storyQuote: t.longDescription || t.shortDescription,
        }));
        setTravel(mappedTravel);
      }

      // Map Socials
      if (socRes.status === 'fulfilled' && Array.isArray(socRes.value)) {
        liveDetected = true;
        const socMap: any = { ...defaultSocials };
        socRes.value.forEach((s: any) => {
          const key = s.platform.toLowerCase();
          if (key.includes('github')) socMap.github = s.url;
          if (key.includes('linkedin')) socMap.linkedin = s.url;
          if (key.includes('twitter') || key.includes('x')) socMap.twitter = s.url;
          if (key.includes('instagram')) socMap.instagram = s.url;
          if (key.includes('youtube')) socMap.youtube = s.url;
          if (key.includes('facebook')) socMap.facebook = s.url;
        });
        setSocials(socMap);
      }

      setIsLive(liveDetected);
    } catch {
      // Keep static defaults
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData();

    // Re-fetch automatically when window gets focus or every 10 seconds
    const onFocus = () => fetchData();
    window.addEventListener('focus', onFocus);
    const interval = setInterval(() => {
      fetchData();
    }, 10000);

    return () => {
      window.removeEventListener('focus', onFocus);
      clearInterval(interval);
    };
  }, []);

  return (
    <DataContext.Provider
      value={{
        profile,
        skills,
        education,
        projects,
        travel,
        socials,
        isLoading,
        isLive,
        refreshData: fetchData,
      }}
    >
      {children}
    </DataContext.Provider>
  );
};

export const useData = () => {
  const context = useContext(DataContext);
  if (!context) {
    throw new Error('useData must be used within a DataProvider');
  }
  return context;
};
