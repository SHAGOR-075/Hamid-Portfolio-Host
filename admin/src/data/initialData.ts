import {
  HomeData,
  AboutData,
  Skill,
  Education,
  Project,
  TravelPost,
  SocialLink,
  ContactData,
  WebsiteSettings,
  ActivityLog,
  User,
} from '../types';

export const initialUser: User = {
  id: 'admin_1',
  name: 'Shagor Ahmed',
  email: 'admin@example.com',
  role: 'Portfolio Owner & Super Admin',
  avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80',
};

export const initialHomeData: HomeData = {
  name: 'Shagor Ahmed',
  badge: 'CSE GRADUATE • MACHINE LEARNING ENTHUSIAST',
  heading: 'Turning Ideas Into Intelligent Digital Experiences.',
  description:
    'A Computer Science & Engineering graduate passionate about Machine Learning, software development, and scalable modern web architecture. Crafting intelligent systems with data and clean code.',
  location: 'Dhaka, Bangladesh',
  availability: 'Available for full-time roles & projects',
  heroImage:
    'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=800&q=80',
  primaryButtonText: 'Explore Projects',
  primaryButtonUrl: '#projects',
  secondaryButtonText: 'Download CV',
  secondaryButtonUrl: '/resume.pdf',
  floatingTags: ['Machine Learning', 'Python', 'PyTorch', 'Computer Vision', 'React', 'Full-Stack'],
};

export const initialAboutData: AboutData = {
  badge: 'ABOUT ME',
  title: 'Engineer, Learner & Explorer',
  description:
    'Focused on combining analytical problem solving with software engineering to build applications that learn, adapt, and scale.',
  paragraphs: [
    'I graduated with a B.Sc. in Computer Science and Engineering, specializing in Machine Learning algorithms, predictive analytics, and end-to-end full-stack architectures.',
    'Over the past few years, I have engineered deep learning models for image segmentation, built interactive web platforms, and maintained an ongoing curiosity for emerging AI technologies.',
    'When not coding or training models, I travel to quiet landscapes with my camera, seeking new horizons and storytelling inspiration.',
  ],
  profileImage:
    'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=800&q=80',
  buttonText: 'Get In Touch',
  buttonLink: '#contact',
  stats: [
    {
      id: 'stat_1',
      value: '08+',
      label: 'ML Projects',
      iconName: 'BrainCircuit',
      order: 1,
      active: true,
    },
    {
      id: 'stat_2',
      value: '05+',
      label: 'Tech Areas',
      iconName: 'Layers',
      order: 2,
      active: true,
    },
    {
      id: 'stat_3',
      value: '14+',
      label: 'Places Explored',
      iconName: 'Compass',
      order: 3,
      active: true,
    },
    {
      id: 'stat_4',
      value: '∞',
      label: 'Curiosity',
      iconName: 'Sparkles',
      order: 4,
      active: true,
    },
  ],
};

export const initialSkills: Skill[] = [
  {
    id: 'sk_1',
    name: 'Python',
    category: 'Programming',
    icon: 'Terminal',
    description: 'Core language for scripting, data science pipelines, and backend APIs.',
    level: 95,
    order: 1,
    active: true,
  },
  {
    id: 'sk_2',
    name: 'PyTorch & TensorFlow',
    category: 'Machine Learning',
    icon: 'BrainCircuit',
    description: 'Deep neural networks, CNNs, Transformers, and transfer learning workflows.',
    level: 90,
    order: 2,
    active: true,
  },
  {
    id: 'sk_3',
    name: 'Scikit-Learn & Pandas',
    category: 'Machine Learning',
    icon: 'BarChart2',
    description: 'Feature engineering, regression, clustering, and high-throughput data munging.',
    level: 92,
    order: 3,
    active: true,
  },
  {
    id: 'sk_4',
    name: 'React.js & TypeScript',
    category: 'Web Development',
    icon: 'Code2',
    description: 'Modern single-page applications, design systems, and responsive frontends.',
    level: 88,
    order: 4,
    active: true,
  },
  {
    id: 'sk_5',
    name: 'FastAPI & Node.js',
    category: 'Web Development',
    icon: 'Server',
    description: 'High-performance asynchronous RESTful microservices and model serving.',
    level: 85,
    order: 5,
    active: true,
  },
  {
    id: 'sk_6',
    name: 'PostgreSQL & MongoDB',
    category: 'Database',
    icon: 'Database',
    description: 'Relational data modeling, indexing, aggregation pipelines, and ACID transactions.',
    level: 84,
    order: 6,
    active: true,
  },
  {
    id: 'sk_7',
    name: 'Docker & Git CI/CD',
    category: 'Tools',
    icon: 'Container',
    description: 'Containerized deployment pipelines, reproducible ML environments, and GitHub Actions.',
    level: 86,
    order: 7,
    active: true,
  },
  {
    id: 'sk_8',
    name: 'C++ & Algorithms',
    category: 'Programming',
    icon: 'Cpu',
    description: 'Strong foundation in data structures, time complexity, and memory management.',
    level: 82,
    order: 8,
    active: true,
  },
];

export const initialEducation: Education[] = [
  {
    id: 'edu_1',
    degree: 'Bachelor of Science (B.Sc.)',
    institution: 'Leading University',
    department: 'Computer Science & Engineering',
    startYear: '2022',
    endYear: '2026',
    gpa: 'CGPA: 3.82 / 4.00',
    description:
      'Major focus on Artificial Intelligence, Pattern Recognition, Computer Architecture, Advanced Algorithms, and Software Engineering methodologies.',
    achievement: 'Dean’s Honor List for 6 consecutive trimesters; Lead of AI Research Club.',
    location: 'Sylhet, Bangladesh',
    icon: 'GraduationCap',
    order: 1,
    active: true,
  },
  {
    id: 'edu_2',
    degree: 'Higher Secondary Certificate (HSC)',
    institution: 'Sylhet Govt. College',
    department: 'Science Division',
    startYear: '2019',
    endYear: '2021',
    gpa: 'GPA: 5.00 / 5.00',
    description:
      'Rigorous studies in Higher Mathematics, Physics, Chemistry, and Information Technology.',
    achievement: 'Board Talentpool Scholarship recipient.',
    location: 'Sylhet, Bangladesh',
    icon: 'Award',
    order: 2,
    active: true,
  },
  {
    id: 'edu_3',
    degree: 'Secondary School Certificate (SSC)',
    institution: 'Sylhet Govt. Pilot High School',
    department: 'Science',
    startYear: '2017',
    endYear: '2019',
    gpa: 'GPA: 5.00 / 5.00',
    description: 'Completed foundational secondary education with distinction.',
    achievement: 'District Champion in National Mathematics Olympiad (Junior Category).',
    location: 'Sylhet, Bangladesh',
    icon: 'BookOpen',
    order: 3,
    active: true,
  },
];

export const initialProjects: Project[] = [
  {
    id: 'proj_1',
    title: 'AgroVision: Deep Learning Crop Disease Classifier',
    slug: 'agrovision-crop-disease-classifier',
    shortDescription:
      'Automated plant foliage lesion detection with 97.4% validation accuracy using Vision Transformers & ResNet-50.',
    description:
      'An end-to-end computer vision platform designed for agricultural monitoring. Utilizes transfer-learned deep neural networks running on quantized ONNX runtimes for edge classification of over 38 plant disease classes. Includes a FastAPI microservice backend and an intuitive responsive web portal.',
    category: 'Machine Learning',
    image:
      'https://images.unsplash.com/photo-1530836369250-ef72a3f5cda8?auto=format&fit=crop&w=800&q=80',
    technologies: ['PyTorch', 'FastAPI', 'React', 'Docker', 'OpenCV', 'TailwindCSS'],
    githubUrl: 'https://github.com/shagorahmed/agrovision-ai',
    liveUrl: 'https://agrovision-demo.app',
    featured: true,
    order: 1,
    active: true,
    updatedAt: '2026-08-10T14:30:00Z',
  },
  {
    id: 'proj_2',
    title: 'NeuroLens: Medical MRI Brain Tumor Segmentation',
    slug: 'neurolens-mri-segmentation',
    shortDescription:
      'U-Net based volumetric 3D segmentation pipeline for brain lesion perimeter detection.',
    description:
      'Engineered an automated MRI anomaly segmentation tool trained on the BraTS dataset. Employs a modified 3D U-Net with attention gates to segment glioma sub-regions with a 0.88 Dice score.',
    category: 'Computer Vision',
    image:
      'https://images.unsplash.com/photo-1559757175-5700dde675bc?auto=format&fit=crop&w=800&q=80',
    technologies: ['TensorFlow', 'Python', 'NiBabel', 'NumPy', 'Flask'],
    githubUrl: 'https://github.com/shagorahmed/neurolens-mri',
    liveUrl: 'https://neurolens-research.org',
    featured: false,
    order: 2,
    active: true,
    updatedAt: '2026-07-28T09:15:00Z',
  },
  {
    id: 'proj_3',
    title: 'PulseSense: Real-Time Financial Sentiment Tracker',
    slug: 'pulsesense-financial-sentiment',
    shortDescription:
      'Fine-tuned FinBERT transformer processing 50k+ market headlines per minute for volatility signaling.',
    description:
      'Streamlit and Redis-powered pipeline extracting sentiment signals from social feeds and financial news feeds with low latency. Connects to quantitative risk estimation models.',
    category: 'Natural Language Processing',
    image:
      'https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?auto=format&fit=crop&w=800&q=80',
    technologies: ['HuggingFace', 'Transformers', 'FastAPI', 'Redis', 'TailwindCSS'],
    githubUrl: 'https://github.com/shagorahmed/pulsesense-nlp',
    liveUrl: 'https://pulsesense.finance',
    featured: false,
    order: 3,
    active: true,
    updatedAt: '2026-08-02T16:45:00Z',
  },
  {
    id: 'proj_4',
    title: 'OmniFlow: Distributed Microservice Orchestrator',
    slug: 'omniflow-orchestrator',
    shortDescription:
      'Lightweight asynchronous task orchestration engine built with Go and TypeScript dashboard.',
    description:
      'A resilient task queue supporting delayed execution, automatic retry policies with exponential backoff, and real-time WebSocket telemetry visualization.',
    category: 'Web Development',
    image:
      'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=800&q=80',
    technologies: ['Go', 'TypeScript', 'React', 'Docker', 'PostgreSQL'],
    githubUrl: 'https://github.com/shagorahmed/omniflow-engine',
    liveUrl: 'https://omniflow.dev',
    featured: false,
    order: 4,
    active: true,
    updatedAt: '2026-06-15T11:20:00Z',
  },
];

export const initialTravelPosts: TravelPost[] = [
  {
    id: 'trv_1',
    location: 'Sreemangal & Lawachara',
    country: 'Bangladesh',
    date: '2025',
    shortDescription: 'A peaceful journey through misty tea gardens and ancient rainforest trails.',
    longDescription:
      'Spent a week traversing the rolling green carpets of Grand Sultan and the remote rainforest of Lawachara National Park. The sound of gibbons in the morning mist and the emerald reflections on early dawn dew left an indelible imprint on my visual journal.',
    coverImage:
      'https://images.unsplash.com/photo-1588880331179-bc9b93a8cb5e?auto=format&fit=crop&w=800&q=80',
    photos: [
      {
        id: 'p1',
        url: 'https://images.unsplash.com/photo-1588880331179-bc9b93a8cb5e?auto=format&fit=crop&w=800&q=80',
        caption: 'Misty tea estates at sunrise',
        isCover: true,
        showInGallery: true,
        order: 1,
      },
      {
        id: 'p2',
        url: 'https://images.unsplash.com/photo-1501785888041-af3ef285b470?auto=format&fit=crop&w=800&q=80',
        caption: 'Canopy canopy walk through Lawachara',
        isCover: false,
        showInGallery: true,
        order: 2,
      },
      {
        id: 'p3',
        url: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=800&q=80',
        caption: 'Reflective stream in Baikka Beel wetland',
        isCover: false,
        showInGallery: true,
        order: 3,
      },
      {
        id: 'p4',
        url: 'https://images.unsplash.com/photo-1470246973918-29a93221c455?auto=format&fit=crop&w=800&q=80',
        caption: 'Local tea harvesters at dusk',
        isCover: false,
        showInGallery: true,
        order: 4,
      },
    ],
    featured: true,
    order: 1,
    active: true,
    carouselSettings: {
      autoplay: true,
      autoplaySpeed: 4000,
      loop: true,
      navigation: true,
      pagination: true,
    },
    updatedAt: '2026-08-05T10:00:00Z',
  },
  {
    id: 'trv_2',
    location: 'Sajek Valley & Helipad Peak',
    country: 'Bangladesh',
    date: '2024',
    shortDescription: 'Floating above the clouds on the ridgeline of Rangamati hills.',
    longDescription:
      'Known as the kingdom of clouds, Sajek provided breathtaking views where white cotton clouds drift through wooden cottage balconies at 1,800 feet above sea level.',
    coverImage:
      'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=800&q=80',
    photos: [
      {
        id: 'p5',
        url: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=800&q=80',
        caption: 'Early dawn cloud sea from Konglak hill',
        isCover: true,
        showInGallery: true,
        order: 1,
      },
      {
        id: 'p6',
        url: 'https://images.unsplash.com/photo-1519681393784-d120267933ba?auto=format&fit=crop&w=800&q=80',
        caption: 'Starry night sky over the wooden cottages',
        isCover: false,
        showInGallery: true,
        order: 2,
      },
      {
        id: 'p7',
        url: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=800&q=80',
        caption: 'Mountain contours in the late afternoon sun',
        isCover: false,
        showInGallery: false,
        order: 3,
      },
    ],
    featured: true,
    order: 2,
    active: true,
    carouselSettings: {
      autoplay: true,
      autoplaySpeed: 5000,
      loop: true,
      navigation: true,
      pagination: true,
    },
    updatedAt: '2026-07-15T15:20:00Z',
  },
  {
    id: 'trv_3',
    location: 'Saint Martin’s Coral Island',
    country: 'Bangladesh',
    date: '2023',
    shortDescription: 'Turquoise Bay of Bengal shores and starry nights on coconut groves.',
    longDescription:
      'Exploring the only coral island of Bangladesh on foot. Crystal clear azure waves during low tide and serene solitary night walks under coconut trees.',
    coverImage:
      'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=800&q=80',
    photos: [
      {
        id: 'p8',
        url: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=800&q=80',
        caption: 'Chhera Dwip coral shoreline',
        isCover: true,
        showInGallery: true,
        order: 1,
      },
      {
        id: 'p9',
        url: 'https://images.unsplash.com/photo-1510414842594-a61c69b5ae57?auto=format&fit=crop&w=800&q=80',
        caption: 'Golden hour waves on West Beach',
        isCover: false,
        showInGallery: true,
        order: 2,
      },
    ],
    featured: false,
    order: 3,
    active: true,
    carouselSettings: {
      autoplay: false,
      autoplaySpeed: 4000,
      loop: true,
      navigation: true,
      pagination: true,
    },
    updatedAt: '2026-05-19T18:00:00Z',
  },
];

export const initialSocialLinks: SocialLink[] = [
  {
    id: 'soc_1',
    platform: 'GitHub',
    url: 'https://github.com/shagorahmed',
    icon: 'Github',
    visible: true,
    order: 1,
  },
  {
    id: 'soc_2',
    platform: 'LinkedIn',
    url: 'https://linkedin.com/in/shagorahmed',
    icon: 'Linkedin',
    visible: true,
    order: 2,
  },
  {
    id: 'soc_3',
    platform: 'X / Twitter',
    url: 'https://x.com/shagorahmed_ml',
    icon: 'Twitter',
    visible: true,
    order: 3,
  },
  {
    id: 'soc_4',
    platform: 'Instagram',
    url: 'https://instagram.com/shagor.travels',
    icon: 'Instagram',
    visible: true,
    order: 4,
  },
  {
    id: 'soc_5',
    platform: 'YouTube',
    url: 'https://youtube.com/@shagortech',
    icon: 'Youtube',
    visible: false,
    order: 5,
  },
  {
    id: 'soc_6',
    platform: 'Facebook',
    url: 'https://facebook.com/shagorahmed.official',
    icon: 'Facebook',
    visible: false,
    order: 6,
  },
];

export const initialContactData: ContactData = {
  email: 'shagor.ahmed.cse@gmail.com',
  phone: '+880 1700-123456',
  location: 'Dhaka / Sylhet, Bangladesh',
  availability: 'Open for Remote & Onsite Opportunities',
  contactDescription:
    'Whether you have a question about machine learning research, a collaborative project idea, or just want to say hi, feel free to drop a message!',
  contactFormEnabled: true,
};

export const initialWebsiteSettings: WebsiteSettings = {
  siteTitle: 'Shagor Ahmed | Machine Learning & CSE Portfolio',
  siteTagline: 'Intelligent Systems & Computational Research',
  keywords: ['Machine Learning', 'Computer Vision', 'Deep Learning', 'PyTorch', 'Python', 'Full Stack', 'Software Engineer'],
  ogImage: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=1200&q=80',
  websiteName: 'Shagor Ahmed — Portfolio',
  browserTitle: 'Shagor Ahmed | Machine Learning Engineer & CSE Graduate',
  metaDescription:
    'Official portfolio of Shagor Ahmed: Computer Science & Engineering graduate specializing in Machine Learning, Deep Learning, and Full-Stack Engineering.',
  footerName: 'Shagor Ahmed',
  footerDescription:
    'Crafting intelligent systems and digital experiences through data and engineering.',
  copyrightText: '© 2026 Shagor Ahmed. All rights reserved.',
  favicon: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=64&q=80',
  profileImage:
    'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=80',
  googleAnalyticsId: 'G-SHAGOR2026ML',
  previewUrl: 'https://shagorahmed.dev',
};

export const initialActivityLogs: ActivityLog[] = [
  {
    id: 'act_1',
    action: 'Updated Home hero banner & availability tag',
    section: 'Home',
    timestamp: '2 minutes ago',
  },
  {
    id: 'act_2',
    action: 'Added new project "AgroVision AI"',
    section: 'Projects',
    timestamp: '1 hour ago',
  },
  {
    id: 'act_3',
    action: 'Uploaded 4 high-res photos to Sreemangal travel post',
    section: 'Travel',
    timestamp: '3 hours ago',
  },
  {
    id: 'act_4',
    action: 'Updated PyTorch & TensorFlow proficiency level to 90%',
    section: 'Skills',
    timestamp: 'Yesterday',
  },
  {
    id: 'act_5',
    action: 'Edited education timeline GPA result',
    section: 'Education',
    timestamp: '2 days ago',
  },
];
