import { SkillItem } from '../types';

export const skillCategories = [
  { id: 'all', label: 'All Capabilities' },
  { id: 'ml', label: 'Machine Learning & Data' },
  { id: 'programming', label: 'Core Programming' },
  { id: 'web', label: 'Web & Systems' },
  { id: 'tools', label: 'Dev Tools & Workflow' },
] as const;

export const skillsData: SkillItem[] = [
  // Machine Learning & Data
  {
    name: "Python",
    category: "programming",
    categoryLabel: "Programming & ML",
    level: 95,
    experience: "3+ Years",
    description: "Primary language for algorithmic problem-solving, deep learning pipelines, and scripting.",
    iconName: "Code2",
    popular: true
  },
  {
    name: "Machine Learning",
    category: "ml",
    categoryLabel: "ML Core",
    level: 92,
    experience: "2+ Years",
    description: "Supervised & unsupervised learning, classification, regression, clustering, model evaluation.",
    iconName: "BrainCircuit",
    popular: true
  },
  {
    name: "Scikit-Learn",
    category: "ml",
    categoryLabel: "ML Frameworks",
    level: 90,
    experience: "2+ Years",
    description: "Ensemble methods (Random Forest, Gradient Boosting), SVMs, PCA dimensionality reduction, pipeline tuning.",
    iconName: "Cpu",
    popular: true
  },
  {
    name: "NumPy & Pandas",
    category: "ml",
    categoryLabel: "Data Manipulation",
    level: 94,
    experience: "3+ Years",
    description: "Matrix math, vectorized data munging, time series structuring, exploratory data analysis (EDA).",
    iconName: "Table",
    popular: true
  },
  {
    name: "PyTorch & Deep Learning",
    category: "ml",
    categoryLabel: "Neural Networks",
    level: 85,
    experience: "1.5+ Years",
    description: "CNN architectures, transfer learning, backpropagation dynamics, custom loss functions, Grad-CAM.",
    iconName: "Layers",
    popular: true
  },
  {
    name: "Data Analysis & Viz",
    category: "ml",
    categoryLabel: "Insight Extraction",
    level: 90,
    experience: "2.5+ Years",
    description: "Matplotlib, Seaborn, statistical hypothesis testing, data distribution modeling, and SHAP interpretability.",
    iconName: "BarChart3",
    popular: true
  },

  // Programming
  {
    name: "C / C++",
    category: "programming",
    categoryLabel: "Systems & DSA",
    level: 88,
    experience: "3+ Years",
    description: "Memory management, pointers, object-oriented concepts, and competitive programming data structures.",
    iconName: "Terminal",
    popular: true
  },
  {
    name: "JavaScript (ES6+)",
    category: "programming",
    categoryLabel: "Web & Scripting",
    level: 88,
    experience: "2+ Years",
    description: "Asynchronous programming, closures, promises, event loop, and DOM manipulation.",
    iconName: "FileCode2"
  },
  {
    name: "TypeScript",
    category: "programming",
    categoryLabel: "Typed Frontend",
    level: 84,
    experience: "1.5+ Years",
    description: "Strict static typing, interfaces, generics, and enterprise-grade maintainability.",
    iconName: "FileCode"
  },

  // Web Development
  {
    name: "React.js",
    category: "web",
    categoryLabel: "Frontend Architecture",
    level: 90,
    experience: "2+ Years",
    description: "Custom hooks, state management, memoization, Framer Motion animations, and component lifecycle.",
    iconName: "Atom",
    popular: true
  },
  {
    name: "Node.js & Express.js",
    category: "web",
    categoryLabel: "Backend & APIs",
    level: 82,
    experience: "1.5+ Years",
    description: "RESTful architecture, middleware design, JWT auth routines, and server-side logic.",
    iconName: "Server"
  },
  {
    name: "Tailwind CSS & Styling",
    category: "web",
    categoryLabel: "UI & Design System",
    level: 94,
    experience: "2+ Years",
    description: "Utility-first modern layouts, dark mode architectures, micro-interactions, responsive grids.",
    iconName: "Palette"
  },
  {
    name: "REST APIs & JSON",
    category: "web",
    categoryLabel: "Integration",
    level: 92,
    experience: "2+ Years",
    description: "API design, client-server communication, error handling, rate limiting, and serialization.",
    iconName: "Network"
  },

  // Tools & Platforms
  {
    name: "Git & GitHub",
    category: "tools",
    categoryLabel: "Version Control",
    level: 92,
    experience: "3+ Years",
    description: "Branching strategies, pull requests, semantic commit conventions, and team collaboration.",
    iconName: "GitBranch",
    popular: true
  },
  {
    name: "Jupyter & Google Colab",
    category: "tools",
    categoryLabel: "ML Environments",
    level: 96,
    experience: "3+ Years",
    description: "GPU acceleration runtimes, interactive prototyping, markdown documentation, model checkpointing.",
    iconName: "BookOpen"
  },
  {
    name: "VS Code & Terminal",
    category: "tools",
    categoryLabel: "Editor & CLI",
    level: 94,
    experience: "3+ Years",
    description: "Custom keybindings, Bash scripting, debugging workflows, and linting configurations.",
    iconName: "SquareTerminal"
  },
  {
    name: "Linux & Bash",
    category: "tools",
    categoryLabel: "OS & Server Env",
    level: 82,
    experience: "2+ Years",
    description: "Shell navigation, process management, SSH connections, and basic script automation.",
    iconName: "Monitor"
  }
];
