"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.seedDatabase = void 0;
const dotenv_1 = __importDefault(require("dotenv"));
const mongoose_1 = __importDefault(require("mongoose"));
const db_1 = require("../config/db");
const User_1 = require("../models/User");
const Home_1 = require("../models/Home");
const About_1 = require("../models/About");
const Skill_1 = require("../models/Skill");
const Education_1 = require("../models/Education");
const Project_1 = require("../models/Project");
const Travel_1 = require("../models/Travel");
const Social_1 = require("../models/Social");
const ContactInfo_1 = require("../models/ContactInfo");
const ContactMessage_1 = require("../models/ContactMessage");
const Settings_1 = require("../models/Settings");
const ActivityLog_1 = require("../models/ActivityLog");
dotenv_1.default.config();
const initialUserData = {
    customId: 'admin_1',
    name: 'Abdul Hamid Khokon',
    email: process.env.ADMIN_EMAIL || 'admin@example.com',
    password: process.env.ADMIN_PASSWORD || 'admin123',
    role: 'Portfolio Owner & Super Admin',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80',
};
const initialHomeData = {
    name: 'Abdul Hamid Khokon',
    badge: 'CSE GRADUATE • MACHINE LEARNING ENTHUSIAST',
    heading: 'Turning Ideas Into Intelligent Digital Experiences.',
    description: 'A Computer Science & Engineering graduate passionate about Machine Learning, software development, and scalable modern web architecture. Crafting intelligent systems with data and clean code.',
    location: 'Dhaka, Bangladesh',
    availability: 'Available for full-time roles & projects',
    heroImage: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=800&q=80',
    primaryButtonText: 'Explore Projects',
    primaryButtonUrl: '#projects',
    secondaryButtonText: 'Download CV',
    secondaryButtonUrl: '/resume.pdf',
    floatingTags: ['Machine Learning', 'Python', 'PyTorch', 'Computer Vision', 'React', 'Full-Stack'],
};
const initialAboutData = {
    badge: 'ABOUT ME',
    title: 'Engineer, Learner & Explorer',
    description: 'Focused on combining analytical problem solving with software engineering to build applications that learn, adapt, and scale.',
    paragraphs: [
        'I graduated with a B.Sc. in Computer Science and Engineering, specializing in Machine Learning algorithms, predictive analytics, and end-to-end full-stack architectures.',
        'Over the past few years, I have engineered deep learning models for image segmentation, built interactive web platforms, and maintained an ongoing curiosity for emerging AI technologies.',
        'When not coding or training models, I travel to quiet landscapes with my camera, seeking new horizons and storytelling inspiration.',
    ],
    profileImage: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=800&q=80',
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
const initialSkillsData = [
    {
        customId: 'sk_1',
        name: 'Python',
        category: 'Programming',
        icon: 'Terminal',
        description: 'Core language for scripting, data science pipelines, and backend APIs.',
        level: 95,
        order: 1,
        active: true,
    },
    {
        customId: 'sk_2',
        name: 'PyTorch & TensorFlow',
        category: 'Machine Learning',
        icon: 'BrainCircuit',
        description: 'Deep neural networks, CNNs, Transformers, and transfer learning workflows.',
        level: 90,
        order: 2,
        active: true,
    },
    {
        customId: 'sk_3',
        name: 'Scikit-Learn & Pandas',
        category: 'Machine Learning',
        icon: 'BarChart2',
        description: 'Feature engineering, regression, clustering, and high-throughput data munging.',
        level: 92,
        order: 3,
        active: true,
    },
    {
        customId: 'sk_4',
        name: 'React.js & TypeScript',
        category: 'Web Development',
        icon: 'Code2',
        description: 'Modern single-page applications, design systems, and responsive frontends.',
        level: 88,
        order: 4,
        active: true,
    },
    {
        customId: 'sk_5',
        name: 'FastAPI & Node.js',
        category: 'Web Development',
        icon: 'Server',
        description: 'High-performance asynchronous RESTful microservices and model serving.',
        level: 85,
        order: 5,
        active: true,
    },
    {
        customId: 'sk_6',
        name: 'PostgreSQL & MongoDB',
        category: 'Database',
        icon: 'Database',
        description: 'Relational data modeling, indexing, aggregation pipelines, and ACID transactions.',
        level: 84,
        order: 6,
        active: true,
    },
    {
        customId: 'sk_7',
        name: 'Docker & Git CI/CD',
        category: 'Tools',
        icon: 'Container',
        description: 'Containerized deployment pipelines, reproducible ML environments, and GitHub Actions.',
        level: 86,
        order: 7,
        active: true,
    },
    {
        customId: 'sk_8',
        name: 'C++ & Algorithms',
        category: 'Programming',
        icon: 'Cpu',
        description: 'Strong foundation in data structures, time complexity, and memory management.',
        level: 82,
        order: 8,
        active: true,
    },
];
const initialEducationData = [
    {
        customId: 'edu_1',
        degree: 'Bachelor of Science (B.Sc.)',
        institution: 'Leading University',
        department: 'Computer Science & Engineering',
        startYear: '2022',
        endYear: '2026',
        gpa: 'CGPA: 3.82 / 4.00',
        description: 'Major focus on Artificial Intelligence, Pattern Recognition, Computer Architecture, Advanced Algorithms, and Software Engineering methodologies.',
        achievement: 'Dean’s Honor List for 6 consecutive trimesters; Lead of AI Research Club.',
        location: 'Sylhet, Bangladesh',
        icon: 'GraduationCap',
        order: 1,
        active: true,
    },
    {
        customId: 'edu_2',
        degree: 'Higher Secondary Certificate (HSC)',
        institution: 'Sylhet Govt. College',
        department: 'Science Division',
        startYear: '2019',
        endYear: '2021',
        gpa: 'GPA: 5.00 / 5.00',
        description: 'Rigorous studies in Higher Mathematics, Physics, Chemistry, and Information Technology.',
        achievement: 'Board Talentpool Scholarship recipient.',
        location: 'Sylhet, Bangladesh',
        icon: 'Award',
        order: 2,
        active: true,
    },
    {
        customId: 'edu_3',
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
const initialProjectsData = [
    {
        customId: 'proj_1',
        title: 'AgroVision: Deep Learning Crop Disease Classifier',
        slug: 'agrovision-crop-disease-classifier',
        shortDescription: 'Automated plant foliage lesion detection with 97.4% validation accuracy using Vision Transformers & ResNet-50.',
        description: 'An end-to-end computer vision platform designed for agricultural monitoring. Utilizes transfer-learned deep neural networks running on quantized ONNX runtimes for edge classification of over 38 plant disease classes. Includes a FastAPI microservice backend and an intuitive responsive web portal.',
        category: 'Machine Learning',
        image: 'https://images.unsplash.com/photo-1530836369250-ef72a3f5cda8?auto=format&fit=crop&w=800&q=80',
        technologies: ['PyTorch', 'FastAPI', 'React', 'Docker', 'OpenCV', 'TailwindCSS'],
        githubUrl: 'https://github.com/shagorahmed/agrovision-ai',
        liveUrl: 'https://agrovision-demo.app',
        featured: true,
        order: 1,
        active: true,
    },
    {
        customId: 'proj_2',
        title: 'NeuroLens: Medical MRI Brain Tumor Segmentation',
        slug: 'neurolens-mri-segmentation',
        shortDescription: 'U-Net based volumetric 3D segmentation pipeline for brain lesion perimeter detection.',
        description: 'Engineered an automated MRI anomaly segmentation tool trained on the BraTS dataset. Employs a modified 3D U-Net with attention gates to segment glioma sub-regions with a 0.88 Dice score.',
        category: 'Computer Vision',
        image: 'https://images.unsplash.com/photo-1559757175-5700dde675bc?auto=format&fit=crop&w=800&q=80',
        technologies: ['TensorFlow', 'Python', 'NiBabel', 'NumPy', 'Flask'],
        githubUrl: 'https://github.com/shagorahmed/neurolens-mri',
        liveUrl: 'https://neurolens-research.org',
        featured: false,
        order: 2,
        active: true,
    },
    {
        customId: 'proj_3',
        title: 'PulseSense: Real-Time Financial Sentiment Tracker',
        slug: 'pulsesense-financial-sentiment',
        shortDescription: 'Fine-tuned FinBERT transformer processing 50k+ market headlines per minute for volatility signaling.',
        description: 'Streamlit and Redis-powered pipeline extracting sentiment signals from social feeds and financial news feeds with low latency. Connects to quantitative risk estimation models.',
        category: 'Natural Language Processing',
        image: 'https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?auto=format&fit=crop&w=800&q=80',
        technologies: ['HuggingFace', 'Transformers', 'FastAPI', 'Redis', 'TailwindCSS'],
        githubUrl: 'https://github.com/shagorahmed/pulsesense-nlp',
        liveUrl: 'https://pulsesense.finance',
        featured: false,
        order: 3,
        active: true,
    },
    {
        customId: 'proj_4',
        title: 'OmniFlow: Distributed Microservice Orchestrator',
        slug: 'omniflow-orchestrator',
        shortDescription: 'Lightweight asynchronous task orchestration engine built with Go and TypeScript dashboard.',
        description: 'A resilient task queue supporting delayed execution, automatic retry policies with exponential backoff, and real-time WebSocket telemetry visualization.',
        category: 'Web Development',
        image: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=800&q=80',
        technologies: ['Go', 'TypeScript', 'React', 'Docker', 'PostgreSQL'],
        githubUrl: 'https://github.com/shagorahmed/omniflow-engine',
        liveUrl: 'https://omniflow.dev',
        featured: false,
        order: 4,
        active: true,
    },
];
const initialTravelData = [
    {
        customId: 'trv_1',
        location: 'Sreemangal & Lawachara',
        country: 'Bangladesh',
        date: '2025',
        shortDescription: 'A peaceful journey through misty tea gardens and ancient rainforest trails.',
        longDescription: 'Spent a week traversing the rolling green carpets of Grand Sultan and the remote rainforest of Lawachara National Park. The sound of gibbons in the morning mist and the emerald reflections on early dawn dew left an indelible imprint on my visual journal.',
        coverImage: 'https://images.unsplash.com/photo-1588880331179-bc9b93a8cb5e?auto=format&fit=crop&w=800&q=80',
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
        ],
        featured: true,
        order: 1,
        active: true,
    },
    {
        customId: 'trv_2',
        location: 'Sajek Valley & Helipad Peak',
        country: 'Bangladesh',
        date: '2024',
        shortDescription: 'Floating above the clouds on the ridgeline of Rangamati hills.',
        longDescription: 'Known as the kingdom of clouds, Sajek provided breathtaking views where white cotton clouds drift through wooden cottage balconies at 1,800 feet above sea level.',
        coverImage: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=800&q=80',
        photos: [
            {
                id: 'p5',
                url: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=800&q=80',
                caption: 'Early dawn cloud sea from Konglak hill',
                isCover: true,
                showInGallery: true,
                order: 1,
            },
        ],
        featured: true,
        order: 2,
        active: true,
    },
];
const initialSocialsData = [
    {
        customId: 'soc_1',
        platform: 'GitHub',
        url: 'https://github.com/shagorahmed',
        icon: 'Github',
        visible: true,
        order: 1,
    },
    {
        customId: 'soc_2',
        platform: 'LinkedIn',
        url: 'https://linkedin.com/in/shagorahmed',
        icon: 'Linkedin',
        visible: true,
        order: 2,
    },
    {
        customId: 'soc_3',
        platform: 'X / Twitter',
        url: 'https://x.com/shagorahmed_ml',
        icon: 'Twitter',
        visible: true,
        order: 3,
    },
    {
        customId: 'soc_4',
        platform: 'Instagram',
        url: 'https://instagram.com/shagor.travels',
        icon: 'Instagram',
        visible: true,
        order: 4,
    },
];
const initialContactDetails = {
    email: 'shagor.ahmed.cse@gmail.com',
    phone: '+880 1700-123456',
    location: 'Dhaka / Sylhet, Bangladesh',
    availability: 'Open for Remote & Onsite Opportunities',
    contactDescription: 'Whether you have a question about machine learning research, a collaborative project idea, or just want to say hi, feel free to drop a message!',
    contactFormEnabled: true,
    badge: 'GET IN TOUCH',
    title: "Let's Build Something Intelligent",
    responseTime: 'Usually responds within 24 hours',
};
const initialMessagesData = [
    {
        customId: 'msg_1',
        name: 'Dr. Rafiqul Islam',
        email: 'dr.rafiqul@university.edu.bd',
        subject: 'Collaboration on Deep Learning & Crop Disease Vision',
        message: 'Hello Shagor, I reviewed your AgroVision project repository and was very impressed with your model benchmarks. Would you be open to collaborating on an applied research paper regarding Vision Transformers for agriculture?',
        status: 'unread',
        starred: true,
    },
    {
        customId: 'msg_2',
        name: 'Elena Rostova',
        email: 'elena.techrecruiter@innovatesoft.com',
        subject: 'AI Engineer Opportunity at InnovateSoft',
        message: 'Hi Shagor, We have an opening for an AI Engineer with PyTorch and computer vision experience. Your portfolio showcases precisely the skill set we are looking for. Are you available for a brief introductory call?',
        status: 'read',
        starred: true,
    },
];
const initialSettingsData = {
    siteTitle: 'Abdul Hamid Khokon | Machine Learning & CSE Portfolio',
    siteTagline: 'Intelligent Systems & Applied AI',
    metaDescription: 'Official portfolio of Abdul Hamid Khokon, Computer Science graduate specializing in Machine Learning, Computer Vision, and Full Stack digital experiences.',
    keywords: ['Machine Learning', 'Computer Vision', 'Deep Learning', 'PyTorch', 'Python', 'Full Stack', 'Software Engineer'],
    favicon: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=128&q=80',
    ogImage: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=1200&q=80',
    googleAnalyticsId: 'G-SHAGOR2026',
    searchConsoleTag: 'google-site-verification=shagor-portfolio-verified',
    websiteName: 'Abdul Hamid Khokon Portfolio',
    browserTitle: 'Abdul Hamid Khokon — Portfolio & CMS',
    footerName: 'Abdul Hamid Khokon',
    footerDescription: 'Designing robust AI workflows and digital systems.',
    copyrightText: '© 2026 Abdul Hamid Khokon. All rights reserved.',
    previewUrl: 'http://hamidkhokon.sites.bd',
};
const initialActivitiesData = [
    {
        customId: 'act_1',
        action: 'Initialized MongoDB database with seed portfolio data',
        section: 'System',
        timestamp: 'Just now',
    },
];
const seedDatabase = async () => {
    console.log('[Seeder]: Wiping existing collections...');
    await User_1.User.deleteMany({});
    await Home_1.Home.deleteMany({});
    await About_1.About.deleteMany({});
    await Skill_1.Skill.deleteMany({});
    await Education_1.Education.deleteMany({});
    await Project_1.Project.deleteMany({});
    await Travel_1.Travel.deleteMany({});
    await Social_1.Social.deleteMany({});
    await ContactInfo_1.ContactInfo.deleteMany({});
    await ContactMessage_1.ContactMessage.deleteMany({});
    await Settings_1.Settings.deleteMany({});
    await ActivityLog_1.ActivityLog.deleteMany({});
    console.log('[Seeder]: Inserting default collections...');
    await User_1.User.create(initialUserData);
    await Home_1.Home.create(initialHomeData);
    await About_1.About.create(initialAboutData);
    await Skill_1.Skill.insertMany(initialSkillsData);
    await Education_1.Education.insertMany(initialEducationData);
    await Project_1.Project.insertMany(initialProjectsData);
    await Travel_1.Travel.insertMany(initialTravelData);
    await Social_1.Social.insertMany(initialSocialsData);
    await ContactInfo_1.ContactInfo.create(initialContactDetails);
    await ContactMessage_1.ContactMessage.insertMany(initialMessagesData);
    await Settings_1.Settings.create(initialSettingsData);
    await ActivityLog_1.ActivityLog.insertMany(initialActivitiesData);
    console.log('[Seeder]: Database seeded successfully!');
};
exports.seedDatabase = seedDatabase;
// Run directly from CLI if called with node/tsx
if (require.main === module) {
    (0, db_1.connectDB)().then(async () => {
        await (0, exports.seedDatabase)();
        mongoose_1.default.connection.close();
        process.exit(0);
    });
}
