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
  availability: "Open to SWE & Applied AI Roles",
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
      "In QuorumDB (Go, zero third-party deps), Raft leader election, Dynamo quorum R/W, and WAL replay were chaos-tested under node kills across 17,658 concurrent writes with zero dropped writes.",
    metric: "~2s failover · 0 data loss",
  },
  {
    id: "voice-ai",
    label: "Production Voice AI",
    question: "How do you stop an LLM voice agent from skipping mandatory checks?",
    answer:
      "At Darwix AI, I paired FastAPI, Deepgram STT, and ElevenLabs TTS with an explicit deterministic dialogue state machine verified across 226 automated tests, plus Vapi phone screens for 1,500+ applicants.",
    metric: "1,500+ candidates · 226 tests",
  },
  {
    id: "product",
    label: "Full-Stack Data",
    question: "Where do data tools usually fail first-time users?",
    answer:
      "Hidden state rules. Whether computing state-wise Indian RTO taxes in OnRoad or enforcing read-only AST guards over 1M+ DuckDB rows in QueryMind, every rule is deterministic and inspectable.",
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
      "Architected a config-driven AI hiring & voice/video verification suite connecting WhatsApp outreach, Vapi phone screens, webhook assessments, and deterministic insurance pre-issuance video interviews.",
    highlights: [
      "Built an end-to-end AI hiring automation platform (Python, Flask, MySQL, OpenAI) orchestrating a 9-stage recruiting funnel from outreach to final offers.",
      "Developed LLM voice screening agents (Vapi, GPT-4o-mini) across 12 configurable role profiles, processing 1,500+ candidates across 80+ campaigns with sub-2-minute webhook triggers.",
      "Engineered a real-time AI video verification agent (FastAPI, Deepgram STT, ElevenLabs TTS) using a deterministic dialogue state machine covered by 226 automated tests.",
    ],
    tags: ["Python", "FastAPI", "Flask", "MySQL", "Vapi", "Deepgram", "ElevenLabs", "226 Tests"],
  },
  {
    id: "caterworld",
    role: "Software Development Intern",
    company: "Caterworld.ai",
    companyUrl: "https://www.caterworld.ai/",
    period: "Apr 2026 – Jul 2026",
    location: "Chennai, India · Hybrid",
    type: "Internship",
    accent: "#0f766e",
    summary:
      "Automated release engineering across 10 web modules and re-architected the client shell into an offline-capable React Progressive Web App.",
    highlights: [
      "Built and maintained CI/CD pipelines automating build, test, and deployment across 10 application modules.",
      "Engineered React Progressive Web App modules using service workers and offline asset caching, cutting frontend load time by 15%.",
    ],
    tags: ["React.js", "PWA", "Service Workers", "CI/CD", "Release Automation"],
  },
  {
    id: "aimaster",
    role: "Software Engineering Intern",
    company: "AIMaster.live",
    period: "Jul 2024 – Jan 2025",
    location: "Hyderabad, India · Remote",
    type: "Internship",
    accent: "#4338ca",
    summary:
      "Built core backend REST APIs, tuned SQL reporting queries, and shipped responsive TypeScript/React product views.",
    highlights: [
      "Engineered 20+ RESTful backend API endpoints in Python/Flask and Node.js covering authentication, session state, and routing.",
      "Optimized SQL queries and pandas aggregation pipelines, reducing data retrieval latency by 15%.",
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
      "To own every byte across socket boundaries — validating an 8-byte RBFTP header, RFC 1071 checksums in C++ Winsock2, and SHA-256 disk integrity.",
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
    question: "Why do ex-showroom sticker prices jump 14–22% unpredictably at dealerships?",
    answer:
      "Each Indian state computes RTO road tax slabs, cess, insurance, and green tax differently. OnRoad computes every line item deterministically upfront.",
    architecture:
      "Full-stack Indian automotive pricing platform combining Next.js 16, Three.js interactive vehicle inspection, MapLibre dealer locator, and FastAPI + SQLite WAL.",
    proofMetric: "36 States & UTs · 50+ brands · 2,500+ variants · 2,200+ dealers",
    tags: ["Next.js 16", "FastAPI", "Three.js", "MapLibre", "SQLite WAL"],
    repo: "https://github.com/saathvik-codes/OnRoad",
    live: "https://onroad-frontend.onrender.com/",
    docsUrl: "https://onroad-uu9c.onrender.com/api/docs",
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
    proofMetric: "1M+ real retail rows · 12/12 query classes validated · Live",
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
      "Serve repeated queries in <10ms from a cosine semantic cache, route cold prompts across Ollama + Gemini, and bind vector retrieval chunks to SQLite role ACLs + PII redaction.",
    architecture:
      "Two companion production repositories: a FastAPI Hybrid LLM Router with semantic vector caching and a Multi-Agent RBAC Workflow Engine with output PII guardrails.",
    proofMetric: "<10ms semantic cache hit · Role-scoped vector RAG & PII guard",
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
      "Gradient-boosting denial-risk scoring (15 features) + GPT-4o-mini ICD-10/CPT extraction with regex fallback, Redis TTL cache, JWT RBAC, Prometheus metrics & 20 pytest tests.",
    stack: ["FastAPI", "PostgreSQL", "Redis", "scikit-learn", "Prometheus"],
    note: "Master Resume",
  },
  {
    title: "CareerFlow — Multi-Agent Application Compiler",
    category: "AI / ML & Data",
    summary:
      "Google Cloud × AIM Code Kitchen S01 Track 3 build with RBAC-scoped vector grounding, automated follow-ups, and tailored document compilation.",
    stack: ["Python", "Multi-Agent RAG", "RBAC", "Full-Stack"],
    repo: "https://github.com/saathvik-codes/careerflow",
  },
  {
    title: "AutoVista AI — Valuation & Hot-Swap MLOps",
    category: "AI / ML & Data",
    summary:
      "Used-car pricing cutting MAE 46% vs baseline using Gradient Boosting with zero-downtime model retraining pipelines over MongoDB.",
    stack: ["Python", "scikit-learn", "FastAPI", "MongoDB"],
    repo: "https://github.com/saathvik-codes/autovista-ai",
  },
  {
    title: "Road Hazard CV — YOLOv8 Segmentation",
    category: "AI / ML & Data",
    summary:
      "Fine-tuned YOLOv8 instance segmentation served via REST with Google Maps severity tagging and sub-30s end-to-end detection.",
    stack: ["YOLOv8", "Python", "Node.js", "React", "SQLite"],
    repo: "https://github.com/saathvik-codes/road-hazard-monitoring-system",
  },
  {
    title: "RouteForge — Supply Chain LP Optimizer",
    category: "AI / ML & Data",
    summary:
      "Statsmodels demand forecasting paired with PuLP linear-programming network optimization over UK/EU e-commerce orders.",
    stack: ["Python", "statsmodels", "PuLP", "Optimization"],
    repo: "https://github.com/saathvik-codes/routeforge",
  },
  {
    title: "TruthLens AI — Misinformation Triage",
    category: "AI / ML & Data",
    summary:
      "Multimodal NLP + computer vision credibility analyzer scoring claims, visual cues, and evidence rationales.",
    stack: ["Python", "NLP", "Computer Vision", "Next.js"],
    repo: "https://github.com/saathvik-codes/truthlens-ai",
    live: "https://truthlens-ai-two.vercel.app",
  },
  {
    title: "RAG Document Assistant",
    category: "AI / ML & Data",
    summary:
      "Hybrid semantic + keyword retrieval with hallucination rejection, 16 unit tests, and an 11-case evaluation harness (100% pass).",
    stack: ["Python", "LangChain", "FAISS", "FastAPI", "Docker"],
    repo: "https://github.com/saathvik-codes/RAG-Document-Assistant",
  },
  {
    title: "Spring Boot 3 / Java 21 Microservices Suite",
    category: "Systems & Backend",
    summary:
      "Seven production services: HiveCRM, GateKeeper (sliding-window rate limiter), FraudShield, TaskWave (STOMP WebSockets), StockSeer, and LaunchDeck.",
    stack: ["Java 21", "Spring Boot 3", "PostgreSQL", "MongoDB", "Docker"],
    repo: "https://github.com/saathvik-codes",
    note: "7 Repos",
  },
  {
    title: "HabitLoop — Offline-First Android App",
    category: "Full-Stack & Mobile",
    summary:
      "Privacy-first Android tracker with local Room persistence, Jetpack Compose UI, adaptive Growth Lab insights & optional Firebase sync.",
    stack: ["Kotlin", "Jetpack Compose", "Room DB", "Firebase"],
    repo: "https://github.com/saathvik-codes/HabitLoop",
  },
  {
    title: "SpiceTrail — Full-Stack Recipe Discovery",
    category: "Full-Stack & Mobile",
    summary:
      "Next.js 16 + Express/MongoDB app with JWT auth, saved recipe collections, and Dockerized deployment.",
    stack: ["Next.js 16", "TypeScript", "Express", "MongoDB", "Docker"],
    repo: "https://github.com/saathvik-codes/SpiceTrail-Recipe-Finder",
    live: "https://spice-trail-zeta.vercel.app/",
  },
];

export const visualBuilds: VisualBuild[] = [
  {
    title: "Saathvik Visuals",
    subtitle: "Interactive UI/UX Casebook",
    focus: "Four adaptive experience modes, localized typography & visual storytelling studio.",
    live: "https://saathvik-visuals-portfolio.vercel.app",
    repo: "https://github.com/saathvikvisuals/saathvik-visuals",
    accent: "#1d4ed8",
  },
  {
    title: "Aryav",
    subtitle: "Architectural 3D Real Estate",
    focus: "Interactive 3D villa showcase, editorial journal & scroll-choreographed property staging.",
    live: "https://aryav-cinematic-real-estate-api-ser.vercel.app",
    repo: "https://github.com/saathvikvisuals/aryav-cinematic-real-estate",
    accent: "#4338ca",
  },
  {
    title: "NAAD",
    subtitle: "Indian Classical Sound Heritage",
    focus: "Multilingual cultural discovery around ragas, taal & handcrafted instruments.",
    live: "https://naad-music-label.vercel.app",
    repo: "https://github.com/saathvikvisuals/naad-music-label",
    accent: "#0369a1",
  },
  {
    title: "AARNA Salon",
    subtitle: "Luxury Beauty Editorial",
    focus: "Editorial package presentation, artist profiles & appointment booking experience.",
    live: "https://aarna-salon.vercel.app",
    repo: "https://github.com/saathvikvisuals/aarna-salon",
    accent: "#be123c",
  },
  {
    title: "Jaabili Tourism",
    subtitle: "Travel Destination Monograph",
    focus: "Story-led destination filtering, visual postcards & guided journey planning.",
    live: "https://jaabili-tourism.vercel.app",
    repo: "https://github.com/saathvikvisuals/jaabili-tourism",
    accent: "#0f766e",
  },
  {
    title: "BazaarX & Pawly",
    subtitle: "Multi-Vendor & Pet Care Commerce",
    focus: "Vendor/admin analytics storefronts & warm mobile-first checkout flows.",
    live: "https://bazaarx.vercel.app",
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
    items: "React · Next.js 16 · Three.js · Theatre.js · GSAP · Lenis · Tailwind CSS · Jetpack Compose",
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
    verifyUrl: "https://verify.onwingspan.com/",
    accent: "#c2410c",
    tier: "specialization",
    brand: "infosys",
  },
  {
    title: "Python (Basic) Assessment Certificate",
    issuer: "HackerRank",
    date: "Jun 2024",
    detail: "Verified algorithmic problem solving & core Python constructs",
    accent: "#047857",
    tier: "specialization",
    brand: "hackerrank",
  },
];

export const communityAndHackathons = [
  {
    label: "Google Developer Groups on Campus (GDG) — Member & Organizer",
    sub: "Peer workshops on backend APIs, cloud workflows & applied systems at IIITDM Kurnool",
  },
  {
    label: "Google Cloud × AIM Code Kitchen S01 (Track 3)",
    sub: "Shipped CareerFlow multi-agent RBAC document compiler",
  },
  {
    label: "Smart India Hackathon · Adobe India Hackathon · Analytics Vidhya DataHack",
    sub: "Rapid prototyping across civic tech, computer vision & competitive data science",
  },
  {
    label: "NSS Volunteer & NSO Participant",
    sub: "Community outreach initiatives & inter-collegiate athletics discipline",
  },
];
