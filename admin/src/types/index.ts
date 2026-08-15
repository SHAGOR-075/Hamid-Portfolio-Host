export interface User {
  id: string;
  name: string;
  email: string;
  role: string;
  avatar: string;
}

export interface HomeData {
  name: string;
  badge: string;
  heading: string;
  description: string;
  location: string;
  availability: string;
  heroImage: string;
  primaryButtonText: string;
  primaryButtonUrl: string;
  secondaryButtonText: string;
  secondaryButtonUrl: string;
  floatingTags: string[];
}

export interface AboutStat {
  id: string;
  value: string;
  label: string;
  iconName: string;
  order: number;
  active: boolean;
}

export interface AboutData {
  badge: string;
  title: string;
  description: string;
  paragraphs: string[];
  profileImage: string;
  buttonText: string;
  buttonLink: string;
  stats: AboutStat[];
}

export type SkillCategory = 
  | 'Programming'
  | 'Machine Learning'
  | 'Web Development'
  | 'Database'
  | 'Tools'
  | 'Other';

export interface Skill {
  id: string;
  name: string;
  category: SkillCategory;
  icon: string;
  description: string;
  level: number; // 0 to 100
  order: number;
  active: boolean;
}

export interface Education {
  id: string;
  degree: string;
  institution: string;
  department: string;
  startYear: string;
  endYear: string;
  gpa: string;
  description: string;
  achievement: string;
  location: string;
  icon: string;
  order: number;
  active: boolean;
}

export interface Project {
  id: string;
  title: string;
  slug: string;
  shortDescription: string;
  description: string;
  category: string;
  image: string;
  technologies: string[];
  githubUrl: string;
  liveUrl: string;
  featured: boolean;
  order: number;
  active: boolean;
  updatedAt: string;
}

export interface TravelPhoto {
  id: string;
  url: string;
  caption?: string;
  isCover?: boolean;
  showInGallery: boolean;
  order: number;
}

export interface TravelCarouselSettings {
  autoplay: boolean;
  autoplaySpeed: number; // ms
  loop: boolean;
  navigation: boolean;
  pagination: boolean;
}

export interface TravelPost {
  id: string;
  location: string;
  country: string;
  date: string;
  shortDescription: string;
  longDescription: string;
  coverImage: string;
  photos: TravelPhoto[];
  featured: boolean;
  order: number;
  active: boolean;
  carouselSettings: TravelCarouselSettings;
  updatedAt: string;
}

export interface SocialLink {
  id: string;
  platform: string;
  url: string;
  username?: string;
  icon: string;
  active?: boolean;
  visible?: boolean;
  order: number;
}

export interface ContactData {
  badge?: string;
  title?: string;
  description?: string;
  email: string;
  phone?: string;
  location?: string;
  responseTime?: string;
  availability?: string;
  contactDescription?: string;
  contactFormEnabled?: boolean;
}

export interface ContactMessage {
  id: string;
  name: string;
  email: string;
  subject: string;
  message: string;
  createdAt: string;
  status: 'unread' | 'read' | 'replied';
  starred?: boolean;
}

export interface SiteSettings {
  siteTitle: string;
  siteTagline: string;
  metaDescription: string;
  keywords: string[];
  favicon: string;
  ogImage: string;
  googleAnalyticsId?: string;
  searchConsoleTag?: string;
  customHeaderScript?: string;
  websiteName?: string;
  browserTitle?: string;
  footerName?: string;
  footerDescription?: string;
  copyrightText?: string;
  profileImage?: string;
  previewUrl?: string;
}

export type WebsiteSettings = SiteSettings;

export interface ActivityLog {
  id: string;
  action: string;
  section: string;
  timestamp: string;
}
