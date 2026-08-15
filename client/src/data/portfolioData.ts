import { ProfileData, SocialLinks, EducationItem, MLProjectItem } from '../types';

export const profileData: ProfileData = {
  name: "Abdul",
  fullName: "Abdul Hamid Khokon",
  initials: "AHK",
  title: "CSE Graduate & Machine Learning Enthusiast",
  subtitle: "Turning ideas into intelligent, high-impact digital experiences.",
  badge: "CSE GRADUATE • MACHINE LEARNING ENTHUSIAST",
  location: "Dhaka, Bangladesh",
  cityCountry: "Dhaka, Bangladesh",
  email: "abdulhamid.cse@gmail.com",
  phone: "+880 1700-000000",
  availability: "Available for full-time engineering & ML opportunities",
  bio: {
    intro: "I am a Computer Science & Engineering graduate with a profound fascination for Machine Learning, deep learning architectures, and scalable software systems.",
    body1: "Throughout my academic journey, I've focused on turning complex mathematical concepts and raw data into practical, deployable AI applications. Whether it's training predictive models, analyzing high-dimensional datasets, or architecting responsive web interfaces, I thrive at the intersection of rigorous logic and modern engineering.",
    body2: "When I'm away from code and research papers, you will likely find me trekking through remote mountain ridges, exploring coastal shores, or documenting stories from the road. Travel keeps my perspective fresh, curious, and grounded.",
    quote: "Building with code by day, learning through data, and wandering into uncharted landscapes whenever the opportunity arises."
  },
  // High quality professional representation
  profileImage: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=800&q=85",
  aboutImage: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=900&q=85",
  stats: [
    {
      value: "01+",
      numericValue: 1,
      suffix: "+",
      label: "ML Research Project",
      sublabel: "Published & Benchmarked"
    },
    {
      value: "04+",
      numericValue: 4,
      suffix: "+",
      label: "Core Tech Domains",
      sublabel: "ML, Web, Data, Systems"
    },
    {
      value: "10+",
      numericValue: 10,
      suffix: "+",
      label: "Places Explored",
      sublabel: "Hills, Valleys & Coasts"
    },
    {
      value: "∞",
      label: "Curiosity & Passion",
      sublabel: "Lifelong Growth"
    }
  ]
};

export const socialLinks: SocialLinks = {
  youtube: "https://youtube.com/@shagor_cse",
  facebook: "https://facebook.com/shagor.dev",
  instagram: "https://instagram.com/shagor_wanderlust",
  linkedin: "https://linkedin.com/in/shagor-ahmed-cse",
  twitter: "https://x.com/shagor_ml",
  github: "https://github.com/shagor-cse",
  kaggle: "https://kaggle.com/shagorahmed",
  googleScholar: "https://scholar.google.com/citations?user=shagor"
};

export const educationData: EducationItem[] = [
  {
    id: "undergrad",
    badgeLabel: "Undergraduate Degree",
    period: "2022 — 2026",
    startYear: "2022",
    endYear: "2026",
    degree: "Bachelor of Science in Computer Science & Engineering (B.Sc in CSE)",
    major: "Major in Intelligent Systems, AI & Software Architecture",
    institution: "Department of Computer Science & Engineering",
    location: "Dhaka, Bangladesh",
    resultLabel: "ACADEMIC RESULT",
    grade: "CGPA 3.82 / 4.00 (Graduated with Honors)",
    status: "Graduated with Honors",
    description: "Built deep theoretical and engineering mastery across Machine Learning, Algorithm Design, Operating Systems, Database Systems, Computer Networks, and Neural Network Architectures with 148 completed academic credits.",
    coursework: [
      "Machine Learning & Pattern Recognition",
      "Deep Learning & Neural Networks",
      "Data Structures & Algorithms (Advanced)",
      "Database Management Systems & SQL",
      "Operating Systems & Systems Programming",
      "Computer Networks & Distributed Systems",
      "Object-Oriented Software Engineering (C++/Java)",
      "Digital Image Processing & Vision"
    ],
    achievements: [
      "Dean's Honor List for 6 consecutive academic trimesters (Top 5% departmental merit standing)",
      "Lead Researcher for Undergraduate AI Capstone Thesis in Clinical Diagnostic Vision Models",
      "Active Member & Problem Setter at University Competitive Programming Society",
      "Mentored junior cohorts in Python for Data Science and Applied Algorithms"
    ],
    thesis: {
      title: "Optimized Deep Convolutional Neural Networks for Early-Stage Multi-Class Disease Diagnostics from Radiological Imagery",
      area: "Applied Computer Vision & Clinical AI",
      description: "Proposed an efficient lightweight attention-augmented CNN architecture reducing false negatives by 18.4% while maintaining sub-50ms inference time on edge hardware.",
      methodology: "Custom ResNet backbone augmented with Spatial Attention Gates and Grad-CAM interpretability layers, trained on 7,000+ multi-sequence radiological scans.",
      advisor: "Senior Faculty & AI Lab Director, Dept. of CSE",
      outcomes: [
        "98.4% Classification Accuracy on 4 clinical pathology classes",
        "18.4% reduction in critical false-negative diagnostic rate",
        "Sub-50ms inference throughput suitable for edge deployment",
        "Co-authored research preprint submitted to medical imaging venue"
      ]
    }
  },
  {
    id: "hsc",
    badgeLabel: "Foundational Milestone",
    period: "2019 — 2021",
    startYear: "2019",
    endYear: "2021",
    degree: "Higher Secondary Certificate (HSC)",
    major: "Science Division (Physics, Chemistry, Higher Math)",
    institution: "Dhaka College",
    location: "Dhaka, Bangladesh",
    resultLabel: "BOARD RESULT",
    grade: "GPA 5.00 / 5.00 (Golden A+)",
    status: "Completed with Distinction",
    description: "Built strong foundations in advanced calculus, mechanics, electromagnetism, logic gates, and introductory algorithmic computing.",
    coursework: ["Higher Mathematics", "Physics", "Information & Communication Technology", "Chemistry"],
    achievements: [
      "Board Merit Scholarship recipient",
      "First Runner-Up at Regional Inter-College Science Olympiad",
      "Top percentile scoring in Higher Mathematics and Physics board exams"
    ]
  },
  {
    id: "ssc",
    badgeLabel: "Secondary Education",
    period: "2017 — 2019",
    startYear: "2017",
    endYear: "2019",
    degree: "Secondary School Certificate (SSC)",
    major: "Science Group (Higher Mathematics, Physics, Chemistry, Biology)",
    institution: "Govt. Laboratory High School",
    location: "Dhaka, Bangladesh",
    resultLabel: "BOARD RESULT",
    grade: "GPA 5.00 / 5.00 (Golden A+)",
    status: "Completed with Distinction",
    description: "Graduated with perfect academic record, cultivating core analytical discipline in mathematics, general science, and computational thinking.",
    coursework: ["Higher Mathematics", "Physics", "Chemistry", "Biology", "Information Technology"],
    achievements: [
      "Junior School Certificate (JSC) Talentpool Scholarship recipient",
      "Champion at Inter-School National Math Olympiad (Regional Round)",
      "Consistent academic top ranker throughout secondary school"
    ]
  }
];

export const academicStats = [
  { label: "Degree Standing", value: "Top 5%", sublabel: "Dept. of Computer Science" },
  { label: "Cumulative GPA", value: "3.82 / 4.00", sublabel: "Graduated with Honors" },
  { label: "Academic Credits", value: "148 Cr.", sublabel: "Rigorous 4-Year Syllabus" },
  { label: "Honor Awards", value: "6x Dean's List", sublabel: "Consecutive Trimesters" },
];

export interface AcademicCourse {
  code: string;
  name: string;
  category: string;
  credits: number;
  grade: string;
  skills: string[];
}

export const academicCourseworkList: AcademicCourse[] = [
  {
    code: "CSE 471",
    name: "Machine Learning & Pattern Recognition",
    category: "AI & Machine Learning",
    credits: 3,
    grade: "A+",
    skills: ["Supervised/Unsupervised Models", "Loss Optimization", "Feature Engineering", "Scikit-Learn"]
  },
  {
    code: "CSE 473",
    name: "Deep Learning & Neural Networks",
    category: "AI & Machine Learning",
    credits: 3,
    grade: "A+",
    skills: ["CNNs & Transformers", "PyTorch", "Backpropagation", "Computer Vision"]
  },
  {
    code: "CSE 365",
    name: "Artificial Intelligence",
    category: "AI & Machine Learning",
    credits: 3,
    grade: "A",
    skills: ["Heuristic Search", "A* & Minimax", "Knowledge Graphs", "Bayesian Networks"]
  },
  {
    code: "CSE 425",
    name: "Digital Image Processing",
    category: "AI & Machine Learning",
    credits: 3,
    grade: "A+",
    skills: ["Spatial Filtering", "Morphological Ops", "Fourier Transform", "OpenCV"]
  },
  {
    code: "CSE 215",
    name: "Data Structures & Algorithms (Advanced)",
    category: "Algorithms & Theory",
    credits: 4,
    grade: "A+",
    skills: ["Graphs & Trees", "Dynamic Programming", "Greedy Strategies", "Big-O Analysis"]
  },
  {
    code: "CSE 323",
    name: "Design & Analysis of Algorithms",
    category: "Algorithms & Theory",
    credits: 3,
    grade: "A",
    skills: ["Divide & Conquer", "Network Flows", "NP-Completeness", "Amortized Analysis"]
  },
  {
    code: "CSE 311",
    name: "Database Management Systems",
    category: "Systems & Architecture",
    credits: 4,
    grade: "A+",
    skills: ["Relational Algebra", "SQL Queries", "Query Optimization", "B+ Tree Indexing"]
  },
  {
    code: "CSE 325",
    name: "Operating Systems & Systems Programming",
    category: "Systems & Architecture",
    credits: 3,
    grade: "A",
    skills: ["Concurrency & Semaphores", "Memory Virtualization", "Process Scheduling", "C/Linux"]
  },
  {
    code: "CSE 331",
    name: "Computer Networks & Protocols",
    category: "Systems & Architecture",
    credits: 3,
    grade: "A",
    skills: ["TCP/IP Stack", "Socket Programming", "Routing Algorithms", "HTTP/DNS Protocols"]
  },
  {
    code: "MAT 247",
    name: "Linear Algebra & Vector Spaces",
    category: "Mathematics & Statistics",
    credits: 3,
    grade: "A+",
    skills: ["Matrix Decomposition", "Eigenvalues/Eigenvectors", "SVD", "Vector Projections"]
  },
  {
    code: "MAT 361",
    name: "Probability & Applied Statistics",
    category: "Mathematics & Statistics",
    credits: 3,
    grade: "A+",
    skills: ["Hypothesis Testing", "Bayes Theorem", "Probability Distributions", "MLE"]
  },
  {
    code: "CSE 225",
    name: "Object-Oriented Software Engineering",
    category: "Systems & Architecture",
    credits: 4,
    grade: "A+",
    skills: ["Design Patterns", "Clean Architecture", "Unit Testing", "Java/C++"]
  }
];

export const mlProjectsData: MLProjectItem[] = [
  {
    id: "neuro-vision",
    title: "NeuroVision: Multi-Class Brain MRI Lesion Detection & Explainable AI",
    tagline: "High-accuracy diagnostic pipeline with Grad-CAM heatmaps and interactive clinical risk scoring.",
    featured: true,
    category: "Deep Learning & Medical Imaging",
    problem: "Manual MRI tumor identification is time-intensive and susceptible to human cognitive fatigue, especially under acute emergency radiology workloads.",
    solution: "Engineered an end-to-end deep learning framework using custom ResNet-50 + Spatial Attention mechanisms trained on 7,028 multi-sequence MRI scans. Integrated Grad-CAM to visualize neural activation areas, providing clinical interpretability.",
    results: "Attained 98.4% validation accuracy with 0.982 F1-score across 4 distinct diagnostic classes (Glioma, Meningioma, Pituitary, Healthy), decreasing false negative diagnostics by 21.6%.",
    tags: ["Python", "PyTorch", "Scikit-Learn", "OpenCV", "Grad-CAM", "NumPy", "Pandas", "Streamlit"],
    metrics: [
      { label: "Accuracy", value: "98.4%" },
      { label: "F1 Score", value: "0.982" },
      { label: "Inference Latency", value: "32ms" },
      { label: "Dataset Size", value: "7,000+ Scans" }
    ],
    image: "https://images.unsplash.com/photo-1559757175-5700dde675bc?auto=format&fit=crop&w=1200&q=85",
    githubUrl: "https://github.com/shagor-cse/neuro-vision-mri-ai",
    demoUrl: "https://huggingface.co/spaces/shagor-cse/neurovision",
    paperUrl: "https://arxiv.org/abs/example",
    features: [
      "Custom Spatial Attention Module highlighting localized micro-lesions",
      "Real-time Grad-CAM saliency map generation for interpretable diagnosis",
      "Robust data augmentation pipeline overcoming class imbalance",
      "Model quantisation reducing memory footprint by 64% without accuracy loss"
    ],
    architectureOverview: "Input MRI (256x256x3) -> Conv2D Pre-processing -> ResNet Feature Extractor -> Attention Gating Block -> Adaptive Pooling -> Dense Classifier (4 Classes) -> Grad-CAM Heatmap Generator",
    sampleInputFields: [
      { name: "contrast_ratio", label: "Tissue Contrast Index", min: 0.1, max: 1.0, defaultValue: 0.78, unit: "ratio", description: "T1/T2 signal intensity variation" },
      { name: "voxel_density", label: "Mean Lesion Voxel Density", min: 100, max: 1200, defaultValue: 740, unit: "HU", description: "Hounsfield Unit tissue attenuation" },
      { name: "symmetry_score", label: "Hemispheric Symmetry Score", min: 0.0, max: 1.0, defaultValue: 0.35, unit: "index", description: "Bilateral anatomical alignment" },
      { name: "edge_gradient", label: "Boundary Gradient Sharpness", min: 5, max: 95, defaultValue: 62, unit: "scale", description: "Sobel filter border sharpness score" }
    ]
  },
  {
    id: "eco-crop",
    title: "AgriPredict: Crop Disease & Yield Forecast Engine",
    tagline: "Multivariate machine learning model for plant pathology diagnosis and weather-adapted harvest projections.",
    featured: false,
    category: "Machine Learning & Tabular Analysis",
    problem: "Unpredictable seasonal weather shifts and delayed crop blight identification cause millions in agricultural harvest loss annually.",
    solution: "Developed an ensemble Random Forest and XGBoost regression/classification architecture analyzing soil chemistry, atmospheric parameters, and spectral leaf health metrics.",
    results: "Demonstrated 94.6% classification accuracy across 12 crop foliage diseases and R² = 0.91 on regional yield prediction.",
    tags: ["Python", "Scikit-learn", "XGBoost", "Pandas", "Matplotlib", "FastAPI"],
    metrics: [
      { label: "Accuracy", value: "94.6%" },
      { label: "R² Yield Metric", value: "0.91" },
      { label: "Data Records", value: "45,000+" }
    ],
    image: "https://images.unsplash.com/photo-1586771107445-d3ca888129ff?auto=format&fit=crop&w=1000&q=85",
    githubUrl: "https://github.com/shagor-cse/agripredict-crop-ml",
    demoUrl: "https://github.com/shagor-cse/agripredict-crop-ml",
    features: [
      "SHAP feature importance plots identifying key agricultural risk factors",
      "Automated outlier removal and SMOTE balancing for rare fungal strains",
      "FastAPI microservice endpoint for edge mobile device queries"
    ],
    architectureOverview: "Soil & Climate Inputs + Image Tensor -> Preprocessing Pipeline -> XGBoost Ensemble Classifier + Regressor -> Forecast Report"
  },
  {
    id: "sentilyzer",
    title: "SentimentPulse: Aspect-Based Bengali & English NLP Engine",
    tagline: "Fine-tuned transformer models for bilingual user feedback and contextual sentiment polarity breakdown.",
    featured: false,
    category: "Natural Language Processing (NLP)",
    problem: "Standard commercial sentiment tools fail dramatically on code-mixed Banglish and localized colloquial phrasing in e-commerce reviews.",
    solution: "Trained a customized RoBERTa and Banglish tokenizer pipeline with aspect-level polarity extraction (Delivery, Quality, Price, Support).",
    results: "Achieved 91.2% macro F1-score outperforming generic multilingual baselines by 14.5% on benchmark consumer review datasets.",
    tags: ["Python", "HuggingFace", "PyTorch", "Tokenizers", "React", "Docker"],
    metrics: [
      { label: "Macro F1", value: "0.912" },
      { label: "Vocabulary", value: "50,000+" },
      { label: "Languages", value: "EN + BN + Banglish" }
    ],
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1000&q=85",
    githubUrl: "https://github.com/shagor-cse/sentiment-pulse-nlp",
    demoUrl: "https://github.com/shagor-cse/sentiment-pulse-nlp",
    features: [
      "Sub-word byte-pair tokenization for mixed dialect resilience",
      "Visual aspect sentiment radar chart dashboard in React",
      "Batch inference support with asynchronous queue handling"
    ],
    architectureOverview: "Raw Review String -> Bilingual Tokenizer -> Fine-Tuned Transformer Encoder -> Aspect Classification Heads -> Sentiment Scores"
  }
];
