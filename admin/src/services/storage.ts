import {
  initialHomeData,
  initialAboutData,
  initialSkills,
  initialEducation,
  initialProjects,
  initialTravelPosts,
  initialSocialLinks,
  initialContactData,
  initialWebsiteSettings,
  initialActivityLogs,
  initialUser,
} from '../data/initialData';
import {
  HomeData,
  AboutData,
  Skill,
  Education,
  Project,
  TravelPost,
  SocialLink,
  ContactData,
  ContactMessage,
  SiteSettings,
  ActivityLog,
  User,
} from '../types';

const STORAGE_KEYS = {
  USER: 'portfolio_admin_user',
  TOKEN: 'portfolio_admin_token',
  HOME: 'portfolio_admin_home',
  ABOUT: 'portfolio_admin_about',
  SKILLS: 'portfolio_admin_skills',
  EDUCATION: 'portfolio_admin_education',
  PROJECTS: 'portfolio_admin_projects',
  TRAVEL: 'portfolio_admin_travel',
  SOCIALS: 'portfolio_admin_socials',
  CONTACT: 'portfolio_admin_contact',
  CONTACT_MESSAGES: 'portfolio_admin_contact_messages',
  SETTINGS: 'portfolio_admin_settings',
  ACTIVITIES: 'portfolio_admin_activities',
  THEME: 'portfolio_admin_theme',
};

const initialContactMessages: ContactMessage[] = [
  {
    id: 'msg_1',
    name: 'Dr. Rafiqul Islam',
    email: 'dr.rafiqul@university.edu.bd',
    subject: 'Collaboration on Deep Learning & Crop Disease Vision',
    message: 'Hello Shagor, I reviewed your AgroVision project repository and was very impressed with your model benchmarks. Would you be open to collaborating on an applied research paper regarding Vision Transformers for agriculture?',
    createdAt: new Date(Date.now() - 3600000 * 5).toISOString(),
    status: 'unread',
    starred: true,
  },
  {
    id: 'msg_2',
    name: 'Elena Rostova',
    email: 'elena.techrecruiter@innovatesoft.com',
    subject: 'AI Engineer Opportunity at InnovateSoft',
    message: 'Hi Shagor, We have an opening for an AI Engineer with PyTorch and computer vision experience. Your portfolio showcases precisely the skill set we are looking for. Are you available for a brief introductory call?',
    createdAt: new Date(Date.now() - 3600000 * 28).toISOString(),
    status: 'read',
    starred: true,
  },
  {
    id: 'msg_3',
    name: 'Tanvir Hossain',
    email: 'tanvir@startupventures.io',
    subject: 'Contract Machine Learning Consultant',
    message: 'Looking for a skilled developer to build an automated OCR and text parsing pipeline. Can we discuss your availability and project estimates?',
    createdAt: new Date(Date.now() - 3600000 * 72).toISOString(),
    status: 'read',
    starred: false,
  },
];

const normalizedInitialSettings: SiteSettings = {
  siteTitle: 'Shagor Ahmed | Machine Learning & CSE Portfolio',
  siteTagline: 'Intelligent Systems & Applied AI',
  metaDescription: 'Official portfolio of Shagor Ahmed, Computer Science graduate specializing in Machine Learning, Computer Vision, and Full Stack digital experiences.',
  keywords: ['Machine Learning', 'Computer Vision', 'Deep Learning', 'PyTorch', 'Python', 'Full Stack', 'Software Engineer'],
  favicon: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=128&q=80',
  ogImage: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=1200&q=80',
  googleAnalyticsId: 'G-SHAGOR2026',
  searchConsoleTag: 'google-site-verification=shagor-portfolio-verified',
  websiteName: 'Shagor Ahmed Portfolio',
  browserTitle: 'Shagor Ahmed — Portfolio & CMS',
  footerName: 'Shagor Ahmed',
  footerDescription: 'Designing robust AI workflows and digital systems.',
  copyrightText: '© 2026 Shagor Ahmed. All rights reserved.',
  previewUrl: 'https://shagorahmed.dev',
};

function getStored<T>(key: string, fallback: T): T {
  try {
    const item = localStorage.getItem(key);
    if (!item) return fallback;
    return JSON.parse(item) as T;
  } catch (error) {
    console.error(`Error reading ${key} from localStorage`, error);
    return fallback;
  }
}

function setStored<T>(key: string, value: T): void {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch (error) {
    console.error(`Error saving ${key} to localStorage`, error);
  }
}

export const storage = {
  getUser: (): User => getStored(STORAGE_KEYS.USER, initialUser),
  setUser: (user: User) => setStored(STORAGE_KEYS.USER, user),

  getToken: (): string | null => {
    const token = localStorage.getItem(STORAGE_KEYS.TOKEN);
    if (token === null) {
      localStorage.setItem(STORAGE_KEYS.TOKEN, 'demo_session_token');
      return 'demo_session_token';
    }
    return token === '' || token === 'null' ? null : token;
  },
  setToken: (token: string | null) => {
    if (token) {
      localStorage.setItem(STORAGE_KEYS.TOKEN, token);
    } else {
      localStorage.removeItem(STORAGE_KEYS.TOKEN);
    }
  },

  getHome: (): HomeData => getStored(STORAGE_KEYS.HOME, initialHomeData),
  setHome: (data: HomeData) => setStored(STORAGE_KEYS.HOME, data),

  getAbout: (): AboutData => getStored(STORAGE_KEYS.ABOUT, initialAboutData),
  setAbout: (data: AboutData) => setStored(STORAGE_KEYS.ABOUT, data),

  getSkills: (): Skill[] => getStored(STORAGE_KEYS.SKILLS, initialSkills),
  setSkills: (skills: Skill[]) => setStored(STORAGE_KEYS.SKILLS, skills),

  getEducation: (): Education[] => getStored(STORAGE_KEYS.EDUCATION, initialEducation),
  setEducation: (edu: Education[]) => setStored(STORAGE_KEYS.EDUCATION, edu),

  getProjects: (): Project[] => getStored(STORAGE_KEYS.PROJECTS, initialProjects),
  setProjects: (projects: Project[]) => setStored(STORAGE_KEYS.PROJECTS, projects),

  getTravel: (): TravelPost[] => getStored(STORAGE_KEYS.TRAVEL, initialTravelPosts),
  setTravel: (travel: TravelPost[]) => setStored(STORAGE_KEYS.TRAVEL, travel),

  getSocials: (): SocialLink[] => {
    const list = getStored(STORAGE_KEYS.SOCIALS, initialSocialLinks);
    return list.map((s) => ({ ...s, active: s.active ?? s.visible ?? true }));
  },
  setSocials: (socials: SocialLink[]) => setStored(STORAGE_KEYS.SOCIALS, socials),

  getContact: (): ContactData => {
    const data = getStored(STORAGE_KEYS.CONTACT, initialContactData);
    return {
      badge: data.badge || 'GET IN TOUCH',
      title: data.title || "Let's Build Something Intelligent",
      description: data.description || data.contactDescription || 'Have a project, research idea, or role opportunity in mind? Feel free to reach out directly.',
      email: data.email || 'shagor.cse.ml@gmail.com',
      phone: data.phone || '+880 1700-000000',
      location: data.location || 'Dhaka & Sylhet, Bangladesh',
      responseTime: data.responseTime || 'Usually responds within 24 hours',
      availability: data.availability || 'Available for full-time roles & projects',
    };
  },
  getContactData: (): ContactData => storage.getContact(),
  setContact: (data: ContactData) => setStored(STORAGE_KEYS.CONTACT, data),
  setContactData: (data: ContactData) => storage.setContact(data),

  // Contact Messages Inbox
  getContactMessages: (): ContactMessage[] => {
    return getStored(STORAGE_KEYS.CONTACT_MESSAGES, initialContactMessages);
  },
  setContactMessages: (msgs: ContactMessage[]) => {
    setStored(STORAGE_KEYS.CONTACT_MESSAGES, msgs);
  },
  updateContactMessage: (id: string, updates: Partial<ContactMessage>): ContactMessage => {
    const list = getStored(STORAGE_KEYS.CONTACT_MESSAGES, initialContactMessages);
    const updated = list.map((m) => (m.id === id ? { ...m, ...updates } : m));
    setStored(STORAGE_KEYS.CONTACT_MESSAGES, updated);
    return updated.find((m) => m.id === id)!;
  },
  deleteContactMessage: (id: string): void => {
    const list = getStored(STORAGE_KEYS.CONTACT_MESSAGES, initialContactMessages);
    const filtered = list.filter((m) => m.id !== id);
    setStored(STORAGE_KEYS.CONTACT_MESSAGES, filtered);
  },

  getSettings: (): SiteSettings => getStored(STORAGE_KEYS.SETTINGS, normalizedInitialSettings),
  setSettings: (settings: SiteSettings) => setStored(STORAGE_KEYS.SETTINGS, settings),

  getActivities: (): ActivityLog[] => getStored(STORAGE_KEYS.ACTIVITIES, initialActivityLogs),
  addActivity: (action: string, section: string) => {
    const list = getStored(STORAGE_KEYS.ACTIVITIES, initialActivityLogs);
    const newLog: ActivityLog = {
      id: `act_${Date.now()}`,
      action,
      section,
      timestamp: 'Just now',
    };
    const updated = [newLog, ...list.slice(0, 19)];
    setStored(STORAGE_KEYS.ACTIVITIES, updated);
  },

  getTheme: (): 'dark' | 'light' => {
    const theme = localStorage.getItem(STORAGE_KEYS.THEME);
    return theme === 'light' ? 'light' : 'dark';
  },
  setTheme: (theme: 'dark' | 'light') => {
    localStorage.setItem(STORAGE_KEYS.THEME, theme);
  },

  exportDatabase: (): string => {
    const backup = {
      user: storage.getUser(),
      home: storage.getHome(),
      about: storage.getAbout(),
      skills: storage.getSkills(),
      education: storage.getEducation(),
      projects: storage.getProjects(),
      travel: storage.getTravel(),
      socials: storage.getSocials(),
      contact: storage.getContact(),
      contactMessages: storage.getContactMessages(),
      settings: storage.getSettings(),
      exportedAt: new Date().toISOString(),
      version: '1.0.0',
    };
    return JSON.stringify(backup, null, 2);
  },

  importDatabase: (jsonString: string): boolean => {
    try {
      const data = JSON.parse(jsonString);
      if (data.home) storage.setHome(data.home);
      if (data.about) storage.setAbout(data.about);
      if (data.skills) storage.setSkills(data.skills);
      if (data.education) storage.setEducation(data.education);
      if (data.projects) storage.setProjects(data.projects);
      if (data.travel) storage.setTravel(data.travel);
      if (data.socials) storage.setSocials(data.socials);
      if (data.contact) storage.setContact(data.contact);
      if (data.contactMessages) storage.setContactMessages(data.contactMessages);
      if (data.settings) storage.setSettings(data.settings);
      if (data.user) storage.setUser(data.user);
      storage.addActivity('Restored entire database from JSON backup', 'Settings');
      return true;
    } catch (e) {
      console.error('Failed to import database JSON', e);
      return false;
    }
  },

  resetToDefaults: () => {
    storage.setHome(initialHomeData);
    storage.setAbout(initialAboutData);
    storage.setSkills(initialSkills);
    storage.setEducation(initialEducation);
    storage.setProjects(initialProjects);
    storage.setTravel(initialTravelPosts);
    storage.setSocials(initialSocialLinks);
    storage.setContact(initialContactData);
    storage.setContactMessages(initialContactMessages);
    storage.setSettings(normalizedInitialSettings);
    storage.setUser(initialUser);
  },
};
