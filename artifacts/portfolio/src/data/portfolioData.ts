export interface WalkthroughTopic {
  id: string;
  label: string;
  question: string;
  answer: string;
  metric: string;
}

export interface ExperienceItem {
  id: string;
  role: string;
  company: string;
  companyUrl?: string;
  period: string;
  location: string;
  type: string;
  accent: string;
  summary: string;
  highlights: string[];
  tags: string[];
}

export interface FlagshipProject {
  index: string;
  slug: string;
  title: string;
  category: string;
  year: string;
  accent: string;
  question: string;
  answer: string;
  architecture: string;
  proofMetric: string;
  tags: string[];
  repo?: string;
  companionRepo?: { label: string; url: string };
  live?: string;
  docsUrl?: string;
}

export interface ArchiveProject {
  title: string;
  category: "Systems & Backend" | "AI / ML & Data" | "Full-Stack & Mobile";
  summary: string;
  stack: string[];
  repo?: string;
  live?: string;
  note?: string;
}

export interface VisualBuild {
  title: string;
  subtitle: string;
  focus: string;
  live: string;
  repo: string;
  accent: string;
}

export interface CertificationItem {
  title: string;
  issuer: string;
  date: string;
  detail: string;
  credentialId?: string;
  verifyUrl?: string;
  accent: string;
  tier: "verified-core" | "specialization";
  brand: "nptel" | "microsoft-linkedin" | "cisco" | "linkedin" | "udemy" | "infosys" | "hackerrank";
}

export const profile = {
  name: "Saathvik Kalepu",
  monogram: "SK.",
  headlineRole: "Software Engineer",
  subRole: "Distributed Systems · Backend · Applied AI",
  location: "Hyderabad, India",
  university: "IIITDM Kurnool · B.Tech CSE (2023–2027)",
  cgpa: "8.2 / 10.0",
  email: "saathvikk202@gmail.com",
  phone: "+91 99081 79816",
  phoneHref: "tel:+919908179816",
  resumePath: "/Saathvik_Kalepu_Resume.pdf",
  availability: "Open to SWE & Applied AI roles",
};

export const socialLinks = [
  {
    label: "GitHub (Systems & AI)",
    short: "GitHub",
    handle: "github.com/saathvik-codes",
    href: "https://github.com/saathvik-codes",
  },
  {
    label: "LinkedIn",
    short: "LinkedIn",
    handle: "linkedin.com/in/saathvik-kalepu-17041228b",
    href: "https://linkedin.com/in/saathvik-kalepu-17041228b",
  },
  {
    label: "LeetCode (350+ Solved)",
    short: "LeetCode",
    handle: "leetcode.com/u/Sunny550",
    href: "https://leetcode.com/u/Sunny550/",
  },
  {
    label: "Saathvik Visuals Studio",
    short: "Visuals",
    handle: "github.com/saathvikvisuals",
    href: "https://github.com/saathvikvisuals",
  },
  {
    label: "Instagram",
    short: "Instagram",
    handle: "@itz._.sunnyyy18",
    href: "https://www.instagram.com/itz._.sunnyyy18/",
  },
];

export const heroWalkthroughTopics: WalkthroughTopic[] = [
  {
    id: "systems",
    label: "Storage & Consensus",
    question: "How do you prove a distributed key-value store handles crashes safely?",
    answer:
      "In QuorumDB I kill random nodes while 17,658 writes are in flight. Raft elects a new leader, quorum reads and writes carry on, and the WAL replays on restart. Nothing was lost.",
    metric: "~2s failover · 0 data loss",
  },
  {
    id: "voice-ai",
    label: "Production Voice AI",
    question: "How do you stop an LLM voice agent from skipping mandatory checks?",
    answer:
      "Don't let the model decide the order. At Darwix AI the video agent follows a fixed state machine, and 226 tests walk every path through it. The phone screening side has called 1,500+ candidates.",
    metric: "1,500+ candidates · 226 tests",
  },
  {
    id: "product",
    label: "Full-Stack Data",
    question: "Where do data tools usually fail first-time users?",
    answer:
      "When the rules are hidden. OnRoad shows every tax line for each state, and QueryMind refuses any SQL that would change data. In both, you can see why you got the answer you did.",
    metric: "36 States & UTs · 1M+ rows",
  },
];

export const education = [
  {
    degree: "B.Tech — Computer Science & Engineering",
    institution: "Indian Institute of Information Technology, Design & Manufacturing (IIITDM) Kurnool",
    period: "Aug 2023 – May 2027",
    metric: "CGPA 8.2 / 10.0",
    coursework: "Data Structures & Algorithms · OOP · DBMS · Operating Systems · Computer Networks · Distributed Systems",
  },
  {
    degree: "Higher Secondary (Class XII) & Secondary (Class X)",
    institution: "Valley Oak Junior College, Hyderabad",
    period: "2021 – 2023",
    metric: "98.8% (XII) · 10.0 GPA (X)",
    coursework: "Mathematics, Physics & Analytical Foundations",
  },
];

export const experiences: ExperienceItem[] = [
  {
    id: "darwix",
    role: "AI Engineer Intern",
    company: "Darwix AI",
    period: "Aug 2026 – Present",
    location: "Gurugram, India",
    type: "Current Internship",
    accent: "#1d4ed8",
    summary:
      "Hiring automation and voice/video verification systems used across recruiting campaigns.",
    highlights: [
      "Built an end-to-end hiring automation platform (Python, Flask, MySQL, OpenAI) that runs a 9-stage recruiting funnel: WhatsApp outreach, voice screening, assessments, shortlisting, interviews and offers.",
      "Developed LLM voice screening agents (Vapi, GPT-4o-mini) that call candidates, score fit from transcripts and route qualified candidates to intern or full-time tracks.",
      "Made it config-driven with 12 role-specific screening profiles; processed 1,500+ candidates across 80+ campaigns, with assessments sent within 2 minutes via webhooks.",
      "Built a real-time video verification agent for insurance pre-issuance checks (FastAPI, Deepgram STT, ElevenLabs TTS) with a deterministic dialogue state machine and 226 automated tests.",
    ],
    tags: ["Python", "Flask", "FastAPI", "MySQL", "OpenAI", "WhatsApp", "Deepgram", "ElevenLabs"],
  },
  {
    id: "caterworld",
    role: "Software Development Intern",
    company: "Caterworld.ai",
    companyUrl: "https://www.caterworld.ai/",
    period: "Apr 2026 – Jul 2026",
    location: "Chennai, India",
    type: "Internship",
    accent: "#0f766e",
    summary:
      "Release automation and Progressive Web App work on the Caterworld platform.",
    highlights: [
      "Built and maintained CI/CD pipelines automating build, test and deployment across 10 application modules, replacing manual releases.",
      "Developed PWA modules for the main website in React (service workers, offline caching, installable app shell), improving frontend load performance by 15%.",
    ],
    tags: ["React", "PWA", "Service Workers", "CI/CD"],
  },
  {
    id: "aimaster",
    role: "Software Engineering Intern",
    company: "AIMaster.live",
    period: "Jul 2024 – Jan 2025",
    location: "Hyderabad, India",
    type: "Internship",
    accent: "#4338ca",
    summary:
      "Backend APIs and product features for an early-stage team.",
    highlights: [
      "Built 20+ REST API endpoints in Python/Flask and Node.js covering authentication, session management and request workflows.",
      "Optimized SQL queries to cut retrieval latency by 15%; shipped user-facing features in TypeScript/React.",
    ],
    tags: ["Python", "Flask", "Node.js", "TypeScript", "React", "SQL"],
  },
];

export const flagshipProjects: FlagshipProject[] = [
  {
    index: "01",
    slug: "quorumdb",
    title: "QuorumDB",
    category: "Distributed Systems · Go",
    year: "2026",
    accent: "#1d4ed8",
    question: "If a storage node goes dark mid-write, do any client requests drop?",
    answer:
      "No. Raft elects a new leader in ~2 seconds, Dynamo quorum keeps writes consistent across live replicas, and acknowledged writes replay cleanly from the WAL.",
    architecture:
      "Built from scratch in Go with zero third-party dependencies: Raft consensus, Dynamo quorum R/W, consistent hashing ring, hinted handoff, and an LSM-tree storage engine (WAL, memtable, SSTables, bloom filters, compaction).",
    proofMetric: "17,658 concurrent writes · 0 failures under node-kills · ~2s failover",
    tags: ["Go", "Raft Consensus", "LSM Tree", "WAL & Bloom Filters", "Docker"],
    repo: "https://github.com/saathvik-codes/quorumdb",
  },
  {
    index: "02",
    slug: "aetherflow",
    title: "AetherFlow",
    category: "Systems · Binary Protocol",
    year: "2026",
    accent: "#4338ca",
    question: "Why build a raw binary wire framing protocol instead of standard JSON/HTTP?",
    answer:
      "To see what HTTP normally hides. Every frame carries an 8-byte header and an RFC 1071 checksum over Winsock2, and every file is checked with SHA-256 once it lands on disk.",
    architecture:
      "Multi-threaded C++ binary protocol engine implementing an 8-byte RBFTP frame header with RFC 1071 checksums, SHA-256 persistence verification, and a Python HTTP-to-TCP bridge gateway.",
    proofMetric: "8-byte RBFTP header · RFC 1071 checksums · SHA-256 verified",
    tags: ["C++", "Winsock2", "Python Bridge", "SHA-256", "Binary Sockets"],
    repo: "https://github.com/saathvik-codes/aetherflow",
  },
  {
    index: "03",
    slug: "onroad",
    title: "OnRoad",
    category: "Full-Stack · Pricing Engine",
    year: "2026",
    accent: "#0369a1",
    question: "Why does the on-road price of a car differ so much from its ex-showroom sticker?",
    answer:
      "Each Indian state computes RTO road tax slabs, cess, insurance, and green tax differently. OnRoad computes every line item deterministically upfront.",
    architecture:
      "Full-stack Indian automotive pricing platform combining Next.js 16, Three.js interactive vehicle inspection, MapLibre dealer locator, and FastAPI + SQLite WAL.",
    proofMetric: "36 States & UTs · 2,500+ variants · 2,200+ dealers",
    tags: ["Next.js 16", "FastAPI", "Three.js", "MapLibre", "SQLite WAL"],
    repo: "https://github.com/saathvik-codes/OnRoad",
    live: "https://onroad-frontend.onrender.com/",
  },
  {
    index: "04",
    slug: "switchboard",
    title: "Switchboard AI",
    category: "Applied NLP · Agent Evals",
    year: "2026",
    accent: "#0f766e",
    question: "How do you prevent tool-calling agents from misrouting ambiguous support tickets?",
    answer:
      "Classify intent explicitly before invoking tools: our Banking77 classifier routes 77 classes at 93% top-1 accuracy, and systematic evals lifted agent pass rate from 67% to 83%.",
    architecture:
      "Two-stage routing pipeline: HuggingFace encoder evaluated across 3,080 held-out Banking77 cases feeding a structured LangChain tool agent behind FastAPI.",
    proofMetric: "93% test accuracy (98.4% top-3) · Eval pass rate 67% → 83%",
    tags: ["Python", "HuggingFace", "LangChain", "Ollama", "FastAPI", "Evals"],
    repo: "https://github.com/saathvik-codes/switchboard-ai",
  },
  {
    index: "05",
    slug: "querymind",
    title: "QueryMind",
    category: "NL2SQL · Read-Only Data",
    year: "2026",
    accent: "#b45309",
    question: "How can non-technical analysts query 1M+ retail rows safely in natural language?",
    answer:
      "Every LLM-generated query runs through a strict read-only SQL AST guard (blocking all mutations) with automatic schema self-repair over DuckDB.",
    architecture:
      "Natural-language analytics engine over 1M+ UK retail transactions in DuckDB with iterative SQL repair and hard read-only execution boundaries exposed via FastAPI + React.",
    proofMetric: "1,041,670 real retail rows · read-only SQL guard · Live",
    tags: ["Python", "LangChain", "DuckDB", "FastAPI", "React", "SQL Guard"],
    repo: "https://github.com/saathvik-codes/querymind",
    live: "https://querymind-app.vercel.app",
  },
  {
    index: "06",
    slug: "pulse",
    title: "Pulse",
    category: "Behavioral Analytics · BI",
    year: "2026",
    accent: "#be123c",
    question: "When top-line revenue looks flat, where is repeat customer retention slipping?",
    answer:
      "Recency-Frequency-Monetary cohort segmentation in DuckDB pinpoints Champions cooling off months before churn shows up in total revenue.",
    architecture:
      "End-to-end customer intelligence pipeline transforming two years of UCI Online Retail II invoices via pandas + DuckDB into cohort retention matrices and Next.js + Recharts views.",
    proofMetric: "£17.7M revenue · 36,969 orders segmented · Live on Vercel",
    tags: ["Python", "pandas", "DuckDB", "Next.js", "Recharts"],
    repo: "https://github.com/saathvik-codes/pulse-customer-intelligence",
    live: "https://eccomerce-analytics-ztf9.vercel.app",
  },
  {
    index: "07",
    slug: "hybrid-llm-rbac",
    title: "Hybrid Gateway & RBAC",
    category: "AI Infra · Security",
    year: "2026",
    accent: "#047857",
    question: "How do you cut cloud LLM spend while enforcing strict role-based data boundaries?",
    answer:
      "Answer repeated queries from a cosine-similarity semantic cache, route new prompts across local Ollama and Gemini, and bind retrieval to SQLite role ACLs with PII redaction.",
    architecture:
      "Two companion repositories: a FastAPI Hybrid LLM Router with semantic vector caching and a Multi-Agent RBAC Workflow Engine with output PII guardrails.",
    proofMetric: "Semantic cache · local-first routing · role-scoped RAG with PII guard",
    tags: ["FastAPI", "Ollama", "Gemini", "SQLite RBAC", "Cosine Cache", "PII Guard"],
    repo: "https://github.com/saathvik-codes/hybrid-llm-gateway",
    companionRepo: {
      label: "RBAC Repo",
      url: "https://github.com/saathvik-codes/multi-agent-rbac-workflow",
    },
  },
];

export const archiveProjects: ArchiveProject[] = [
  {
    title: "ClaimFlow — Prior-Authorization Platform",
    category: "AI / ML & Data",
    summary:
      "Predicts which insurance claims are likely to be denied and explains why. GPT-4o-mini pulls ICD-10 and CPT codes out of clinical notes, with a regex fallback when it fails. Covered by 20 tests.",
    stack: ["FastAPI", "PostgreSQL", "Redis", "scikit-learn", "Prometheus"],
  },
  {
    title: "CareerFlow — Multi-Agent Application Compiler",
    category: "AI / ML & Data",
    summary:
      "Built for Google Cloud × AIM Code Kitchen S01 (Track 3). A set of agents that drafts tailored application documents, using only the data each user is allowed to see.",
    stack: ["Python", "Multi-Agent RAG", "RBAC", "Full-Stack"],
    repo: "https://github.com/saathvik-codes/careerflow",
  },
  {
    title: "AutoVista AI — Valuation & Hot-Swap MLOps",
    category: "AI / ML & Data",
    summary:
      "Prices used cars with gradient boosting, 46% lower error than the baseline. A retrained model can be swapped in without taking the API down.",
    stack: ["Python", "scikit-learn", "FastAPI", "MongoDB"],
    repo: "https://github.com/saathvik-codes/autovista-ai",
  },
  {
    title: "Road Hazard CV — YOLOv8 Segmentation",
    category: "AI / ML & Data",
    summary:
      "Finds potholes and road damage in photos with a fine-tuned YOLOv8 model, then pins them on Google Maps by severity. Upload to map in under 30 seconds.",
    stack: ["YOLOv8", "Python", "Node.js", "React", "SQLite"],
    repo: "https://github.com/saathvik-codes/road-hazard-monitoring-system",
  },
  {
    title: "RouteForge — Supply Chain LP Optimizer",
    category: "AI / ML & Data",
    summary:
      "Forecasts demand from UK and EU e-commerce orders with statsmodels, then uses linear programming (PuLP) to decide where stock should ship from.",
    stack: ["Python", "statsmodels", "PuLP", "Optimization"],
    repo: "https://github.com/saathvik-codes/routeforge",
  },
  {
    title: "TruthLens AI — Misinformation Triage",
    category: "AI / ML & Data",
    summary:
      "Checks a post's text and images for signs of misinformation and explains each score with the evidence it found.",
    stack: ["Python", "NLP", "Computer Vision", "Next.js"],
    repo: "https://github.com/saathvik-codes/truthlens-ai",
    live: "https://truthlens-ai-two.vercel.app",
  },
  {
    title: "RAG Document Assistant",
    category: "AI / ML & Data",
    summary:
      "Answers questions from your documents and says so when the answer isn't there. Combines semantic and keyword search; 16/16 tests and 11/11 eval cases pass.",
    stack: ["Python", "LangChain", "FAISS", "FastAPI", "Docker"],
    repo: "https://github.com/saathvik-codes/RAG-Document-Assistant",
  },
  {
    title: "Spring Boot Service Collection",
    category: "Systems & Backend",
    summary:
      "Ten focused Spring Boot services, including HiveCRM, GateKeeper (sliding-window rate limiter), FraudShield, TaskWave (STOMP WebSockets), StockSeer, LaunchDeck, CarePulse and FleetPulse.",
    stack: ["Java", "Spring Boot", "PostgreSQL", "MongoDB", "Docker"],
    repo: "https://github.com/saathvik-codes",
  },
  {
    title: "HabitLoop — Offline-First Android App",
    category: "Full-Stack & Mobile",
    summary:
      "A habit tracker for Android that keeps your data on the phone (Room), with weekly insights and optional Firebase sync.",
    stack: ["Kotlin", "Jetpack Compose", "Room DB", "Firebase"],
    repo: "https://github.com/saathvik-codes/HabitLoop",
  },
  {
    title: "SpiceTrail — Full-Stack Recipe Discovery",
    category: "Full-Stack & Mobile",
    summary:
      "Search recipes, save them into collections and come back to them later. Next.js front end, Express and MongoDB behind it.",
    stack: ["Next.js 16", "TypeScript", "Express", "MongoDB", "Docker"],
    repo: "https://github.com/saathvik-codes/SpiceTrail-Recipe-Finder",
    live: "https://spice-trail-zeta.vercel.app/",
  },
];

export const visualBuilds: VisualBuild[] = [
  {
    title: "Saathvik Visuals",
    subtitle: "Interactive UI/UX Casebook",
    focus: "My design casebook: layout experiments, type studies and write-ups of client work.",
    live: "",
    repo: "https://github.com/saathvikvisuals/saathvik-visuals",
    accent: "#1d4ed8",
  },
  {
    title: "Aryav",
    subtitle: "Architectural 3D Real Estate",
    focus: "A 3D villa you can walk around, plus a scrolling property page and a short journal.",
    live: "https://aryav-cinematic-real-estate-api-ser.vercel.app",
    repo: "https://github.com/saathvikvisuals/aryav-cinematic-real-estate",
    accent: "#4338ca",
  },
  {
    title: "NAAD",
    subtitle: "Indian Classical Sound Heritage",
    focus: "A site about ragas, taal and handmade instruments, in more than one language.",
    live: "https://naad-music-label.vercel.app",
    repo: "https://github.com/saathvikvisuals/naad-music-label",
    accent: "#0369a1",
  },
  {
    title: "AARNA Salon",
    subtitle: "Luxury Beauty Editorial",
    focus: "Services, stylists and appointment booking for a salon, laid out like a magazine.",
    live: "https://aarna-salon.vercel.app",
    repo: "https://github.com/saathvikvisuals/aarna-salon",
    accent: "#be123c",
  },
  {
    title: "Jaabili Tourism",
    subtitle: "Travel Destination Monograph",
    focus: "Destination guide with filters, postcard-style cards and a simple trip planner.",
    live: "https://jaabili-tourism.vercel.app",
    repo: "https://github.com/saathvikvisuals/jaabili-tourism",
    accent: "#0f766e",
  },
  {
    title: "BazaarX & Pawly",
    subtitle: "Multi-Vendor & Pet Care Commerce",
    focus: "A multi-vendor shop with vendor and admin dashboards, and a pet-care store built for phones.",
    live: "https://bazaarx-tau.vercel.app",
    repo: "https://github.com/saathvikvisuals/BazaarX",
    accent: "#b45309",
  },
];

export const skillMatrix = [
  {
    label: "Languages",
    items: "Go · Python · Java · C / C++ · TypeScript · JavaScript · SQL · Kotlin",
  },
  {
    label: "Backend & Systems",
    items: "FastAPI · Flask · Spring Boot 3 · Node.js · Express · REST / WebSockets · Raft & LSM Storage",
  },
  {
    label: "Frontend & 3D",
    items: "React · Next.js 16 · Three.js · Tailwind CSS · Jetpack Compose",
  },
  {
    label: "AI, Voice & Data",
    items: "OpenAI · Vapi Voice AI · Deepgram · ElevenLabs · LangChain · HuggingFace · FAISS · DuckDB · scikit-learn",
  },
  {
    label: "Databases & Infra",
    items: "PostgreSQL · MySQL · MongoDB · Redis · SQLite WAL · Docker · AWS · CI/CD · Prometheus · Linux",
  },
  {
    label: "CS Foundations",
    items: "Data Structures & Algorithms · System Design · Distributed Consensus · OOP · Operating Systems · Networks",
  },
];

export const certifications: CertificationItem[] = [
  {
    title: "Introduction to Large Language Models (LLMs)",
    issuer: "NPTEL · Ministry of Education",
    date: "Jul–Oct 2026",
    detail: "73% consolidated score (25/25 assignments, 47.25/75 exam · 4 credits)",
    credentialId: "NPTEL26CS171S755400054",
    verifyUrl: "/certificates/nptel-llm-2026.pdf",
    accent: "#23408e",
    tier: "verified-core",
    brand: "nptel",
  },
  {
    title: "Natural Language Processing",
    issuer: "NPTEL · Ministry of Education",
    date: "Jul–Oct 2026",
    detail: "66% consolidated score (19.53/25 assignments, 45.75/75 exam · 4 credits)",
    credentialId: "NPTEL26CS180S455400615",
    verifyUrl: "/certificates/nptel-nlp-2026.pdf",
    accent: "#23408e",
    tier: "verified-core",
    brand: "nptel",
  },
  {
    title: "NPTEL Elite — Cloud Computing (12 Weeks)",
    issuer: "IIT Kharagpur · Ministry of Education",
    date: "Jan–Apr 2026",
    detail: "81% Consolidated Score (25/25 Assignments, 55.85/75 Exam · 4 Credits)",
    credentialId: "NPTEL26CS55S1056201365",
    verifyUrl: "https://nptel.ac.in/noc/E_Certificate/NPTEL26CS55S105620136504202281",
    accent: "#b45309",
    tier: "verified-core",
    brand: "nptel",
  },
  {
    title: "Microsoft Azure AI Essentials Professional Certificate",
    issuer: "Microsoft & LinkedIn Learning",
    date: "Dec 2025",
    detail: "Azure ML, Generative AI workloads & cognitive pipeline architecture (3h 23m)",
    credentialId: "cbc473cf04f5...f8990",
    verifyUrl: "https://www.linkedin.com/learning/certificates/cbc473cf04f51df630034192f01b90eb2982586c641adec0d12b59fbae6f8990",
    accent: "#0369a1",
    tier: "verified-core",
    brand: "microsoft-linkedin",
  },
  {
    title: "Cisco Certified Support Technician (CCST) Networking Prep",
    issuer: "Cisco / LinkedIn Learning",
    date: "Jan 2026",
    detail: "TCP/IP addressing, routing/switching diagnostics & network security (10h 10m)",
    credentialId: "2042dce64861...61f36",
    verifyUrl: "https://www.linkedin.com/learning/certificates/2042dce6486153593958376dc5a53c6c2b1fe32b584cce3492dbce0154d61f36",
    accent: "#0f766e",
    tier: "verified-core",
    brand: "cisco",
  },
  {
    title: "Career Essentials in Generative AI",
    issuer: "Microsoft & LinkedIn Learning",
    date: "Jun 2024",
    detail: "Responsible AI engineering, prompt systems & transformer fundamentals (4h 30m)",
    credentialId: "8f66abed98f9...dda77",
    verifyUrl: "https://www.linkedin.com/learning/certificates/8f66abed98f9537294815f06da57112ccadbf6836a980362e9751895704dda77",
    accent: "#1d4ed8",
    tier: "verified-core",
    brand: "microsoft-linkedin",
  },
  {
    title: "Introduction to Career Skills in Data Analytics",
    issuer: "LinkedIn Learning",
    date: "Dec 2025",
    detail: "Exploratory analysis, decision framing & KPI instrumentation (2h 21m)",
    credentialId: "6186b2416e4a...c0753",
    verifyUrl: "https://www.linkedin.com/learning/certificates/6186b2416e4a25e88bf4a9cd8cb33f6db47ef0951542b111f8bccfa0ff0c0753",
    accent: "#4338ca",
    tier: "specialization",
    brand: "linkedin",
  },
  {
    title: "The Complete Full-Stack Web Development Bootcamp",
    issuer: "Udemy · Dr. Angela Yu",
    date: "Jul 2025",
    detail: "61.5 hours covering React, Node.js, PostgreSQL, REST & Auth",
    credentialId: "UC-29b8caee-d946-47fe-9fad-d236fc544ed6",
    verifyUrl: "https://ude.my/UC-29b8caee-d946-47fe-9fad-d236fc544ed6",
    accent: "#6d28d9",
    tier: "specialization",
    brand: "udemy",
  },
  {
    title: "Data Science Course Completion",
    issuer: "Infosys Springboard",
    date: "Nov 2025",
    detail: "Statistical modeling, Python workflows & supervised learning pipelines",
    verifyUrl: "/certificates/infosys-data-science.pdf",
    accent: "#c2410c",
    tier: "specialization",
    brand: "infosys",
  },
];

export const communityAndHackathons = [
  {
    label: "Google Developer Groups on Campus (GDG), IIITDM Kurnool — Member",
    sub: "Campus developer community: workshops and peer study on backend and cloud.",
  },
  {
    label: "Google Cloud × AIM Code Kitchen S01 (Track 3)",
    sub: "Shipped CareerFlow multi-agent RBAC document compiler",
  },
];


export const chapters = [
  { id: "prologue", no: "00", label: "Intro", narration: "Start here: who I am and the questions I like." },
  { id: "about", no: "I", label: "About", narration: "How I approach a problem before writing code." },
  { id: "experience", no: "II", label: "Journey", narration: "School to Gurugram, on a map: education and internships." },
  { id: "projects", no: "III", label: "Projects", narration: "Seven builds, each answering one hard question." },
  { id: "credentials", no: "IV", label: "Credentials", narration: "Coursework, certificates and community work." },
  { id: "contact", no: "V", label: "Contact", narration: "Last stop. Say hello, I reply personally." },
];

export const heroStats = [
  { value: 3, suffix: "", label: "software internships" },
  { value: 7, suffix: "", label: "flagship projects, all on GitHub" },
  { value: 350, suffix: "+", label: "LeetCode problems solved" },
  { value: 7, suffix: "", label: "certifications, verifiable below" },
];

export const journey = [
  { id: "j-school", when: "2021 – 2023", title: "Class X & XII", org: "Valley Oak Junior College", place: "Hyderabad", coords: [17.385, 78.4867] as [number, number],
    body: "98.8% in Class XII and a 10.0 GPA in Class X. Mathematics and physics first, code soon after." },
  { id: "j-iiitdm", when: "Aug 2023 – May 2027", title: "B.Tech, Computer Science & Engineering", org: "IIITDM Kurnool", place: "Kurnool", coords: [15.8281, 78.0373] as [number, number],
    body: "CGPA 8.2 / 10. Data structures, operating systems, networks, DBMS and distributed systems." },
  { id: "j-aimaster", experience: "aimaster", place: "Hyderabad", coords: [17.44, 78.38] as [number, number] },
  { id: "j-caterworld", experience: "caterworld", place: "Chennai", coords: [13.0827, 80.2707] as [number, number] },
  { id: "j-darwix", experience: "darwix", place: "Gurugram", coords: [28.4595, 77.0266] as [number, number] },
];

export const googleProfiles = {
  skills: "https://www.skills.google/public_profiles/14e43afb-2b3d-4255-a98e-eaf6c0a41338",
  credly: "https://www.credly.com/users/saathvik-kalepu/badges",
};

import credly from "./credly.generated.json";

/** Google Cloud skill badges. Refreshed from Credly by scripts/sync-credly.mjs on every build. */
export const cloudBadges = credly.badges.map((b) => ({
  title: b.title,
  date: new Date(b.issued + "T00:00:00").toLocaleDateString("en-GB", { month: "short", year: "numeric" }),
  img: b.img,
  id: b.id,
}));
