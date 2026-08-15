export interface ProfileData {
  name: string;
  fullName: string;
  initials: string;
  title: string;
  subtitle: string;
  badge: string;
  location: string;
  cityCountry: string;
  email: string;
  phone?: string;
  availability: string;
  bio: {
    intro: string;
    body1: string;
    body2: string;
    quote: string;
  };
  profileImage: string;
  heroImage?: string;
  aboutImage: string;
  stats: Array<{
    value: string;
    numericValue?: number;
    suffix?: string;
    label: string;
    sublabel: string;
  }>;
}

export interface SocialLinks {
  youtube: string;
  facebook: string;
  instagram: string;
  linkedin: string;
  twitter: string;
  github: string;
  kaggle?: string;
  googleScholar?: string;
}

export interface SkillItem {
  name: string;
  category: 'programming' | 'ml' | 'web' | 'tools';
  categoryLabel: string;
  level: number; // 1-100
  experience: string;
  description: string;
  iconName: string;
  popular?: boolean;
}

export interface EducationItem {
  id: string;
  badgeLabel?: string;
  period: string;
  startYear: string;
  endYear: string;
  degree: string;
  major: string;
  institution: string;
  location: string;
  resultLabel?: string;
  grade?: string;
  status: string;
  description: string;
  coursework: string[];
  achievements: string[];
  thesis?: {
    title: string;
    area: string;
    description: string;
    methodology?: string;
    advisor?: string;
    outcomes?: string[];
  };
}

export interface ProjectMetric {
  label: string;
  value: string;
}

export interface MLProjectItem {
  id: string;
  title: string;
  tagline: string;
  featured: boolean;
  category: string;
  problem: string;
  solution: string;
  results: string;
  tags: string[];
  metrics: ProjectMetric[];
  image: string;
  githubUrl: string;
  demoUrl: string;
  paperUrl?: string;
  features: string[];
  architectureOverview: string;
  sampleInputFields?: Array<{
    name: string;
    label: string;
    min: number;
    max: number;
    defaultValue: number;
    unit: string;
    description: string;
  }>;
}

export interface TravelDestination {
  id: number;
  image: string;
  location: string;
  country: string;
  date: string;
  category: 'Coastal' | 'Mountains & Valleys' | 'Islands' | 'Forest & Tea Gardens' | 'Rivers & Waterfalls';
  coordinates: string;
  description: string;
  highlight: string;
  storyQuote: string;
  galleryLayout?: 'featured' | 'standard' | 'wide';
}
