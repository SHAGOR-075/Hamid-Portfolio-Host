import React, { createContext, useContext, useEffect, useState } from 'react';
import { profileData as defaultProfile, socialLinks as defaultSocials } from '../data/portfolioData';
import { skillsData as defaultSkills } from '../data/skills';
import { educationData as defaultEducation, mlProjectsData as defaultProjects } from '../data/portfolioData';
import { travelData as defaultTravel } from '../data/travelData';
import { SkillItem, EducationItem, MLProjectItem, TravelDestination } from '../types';

const API_BASE = (import.meta as any).env?.VITE_API_BASE_URL || 'https://hamid-portfolio-backend.vercel.app/api';
const CACHE_KEY = 'portfolio_client_data_swr_v1';

interface DataCachePayload {
  profile: typeof defaultProfile;
  skills: SkillItem[];
  education: EducationItem[];
  projects: MLProjectItem[];
  travel: TravelDestination[];
  socials: typeof defaultSocials;
  timestamp: number;
}

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

// Helper to read initial cache from LocalStorage for 0ms SWR instant paint
function readInitialCache(): DataCachePayload | null {
  try {
    const raw = localStorage.getItem(CACHE_KEY);
    if (raw) {
      return JSON.parse(raw) as DataCachePayload;
    }
  } catch {
    // Ignore storage parse errors
  }
  return null;
}

export const DataProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const initialCache = readInitialCache();

  const [profile, setProfile] = useState(initialCache?.profile || defaultProfile);
  const [skills, setSkills] = useState<SkillItem[]>(initialCache?.skills || defaultSkills);
  const [education, setEducation] = useState<EducationItem[]>(initialCache?.education || defaultEducation);
  const [projects, setProjects] = useState<MLProjectItem[]>(initialCache?.projects || defaultProjects);
  const [travel, setTravel] = useState<TravelDestination[]>(initialCache?.travel || defaultTravel);
  const [socials, setSocials] = useState(initialCache?.socials || defaultSocials);

  // If we have cached data, start with isLoading = false immediately (0ms paint!)
  const [isLoading, setIsLoading] = useState(!initialCache);
  const [isLive, setIsLive] = useState(Boolean(initialCache));

  const fetchData = async () => {
    try {
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

      // Temporary variables for caching
      let nextProfile = profile;
      let nextSkills = skills;
      let nextEdu = education;
      let nextProjects = projects;
      let nextTravel = travel;
      let nextSocials = socials;

      // Map Profile Data
      const home = homeRes.status === 'fulfilled' ? homeRes.value : null;
      const about = aboutRes.status === 'fulfilled' ? aboutRes.value : null;
      const contact = contactRes.status === 'fulfilled' ? contactRes.value : null;

      if (home || about || contact) {
        liveDetected = true;
        setProfile((prev) => {
          const updated = {
            ...prev,
            name: home?.name ? home.name.split(' ')[0] : prev.name,
            fullName: home?.name || prev.fullName,
            badge: home?.badge || prev.badge,
            title: home?.heading || prev.title,
            subtitle: home?.description || prev.subtitle,
            location: home?.location || prev.location,
            cityCountry: home?.location || prev.cityCountry,
            availability: home?.availability || contact?.availability || prev.availability,
            profileImage: home?.heroImage || prev.profileImage,
            heroImage: home?.heroImage || prev.heroImage || prev.profileImage,
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
          };
          nextProfile = updated;
          return updated;
        });
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
        nextSkills = mappedSkills;
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
        nextEdu = mappedEdu;
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
        nextProjects = mappedProjects;
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
        nextTravel = mappedTravel;
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
        nextSocials = socMap;
        setSocials(socMap);
      }

      setIsLive(liveDetected);

      // Save fresh data to SWR LocalStorage Cache
      try {
        const payloadToCache: DataCachePayload = {
          profile: nextProfile,
          skills: nextSkills,
          education: nextEdu,
          projects: nextProjects,
          travel: nextTravel,
          socials: nextSocials,
          timestamp: Date.now(),
        };
        localStorage.setItem(CACHE_KEY, JSON.stringify(payloadToCache));
      } catch {
        // Ignore quota errors
      }
    } catch {
      // Keep static or cached defaults
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData();

    // Re-fetch automatically when window gets focus or every 30 seconds
    const onFocus = () => fetchData();
    window.addEventListener('focus', onFocus);
    const interval = setInterval(() => {
      fetchData();
    }, 30000);

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
