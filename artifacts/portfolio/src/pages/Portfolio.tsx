import { useEffect, useState } from "react";

const projects = [
  {
    no: "01",
    title: "HabitLoop",
    eyebrow: "Native Android · Product engineering",
    copy: "A privacy-first habit tracker built around local-first data, adaptive insights, social circles and optional Firebase sync.",
    stack: ["Kotlin", "Jetpack Compose", "Room", "Firebase"],
    repo: "https://github.com/saathvik-codes/HabitLoop",
    live: "",
    tone: "lime",
  },
  {
    no: "02",
    title: "SpiceTrail",
    eyebrow: "Full-stack web · Production deployment",
    copy: "Recipe discovery with JWT authentication, saved favourites and an external food API, split across a typed Next.js client and Express API.",
    stack: ["Next.js", "TypeScript", "Express", "MongoDB", "Docker"],
    repo: "https://github.com/saathvik-codes/SpiceTrail-Recipe-Finder",
    live: "https://recipe-finder-swart-six.vercel.app",
    tone: "coral",
  },
  {
    no: "03",
    title: "Switchboard",
    eyebrow: "Agentic AI · Applied NLP",
    copy: "An intent-routing service that combines a trained classifier with an agentic tool layer and exposes the workflow through FastAPI.",
    stack: ["Python", "LangChain", "Hugging Face", "FastAPI"],
    repo: "https://github.com/saathvik-codes/switchboard-ai",
    live: "",
    tone: "violet",
  },
  {
    no: "04",
    title: "QuorumDB",
    eyebrow: "Distributed systems · Systems programming",
    copy: "A learning-led distributed key-value store exploring consistent hashing, Raft consensus and log-structured storage in Go.",
    stack: ["Go", "Raft", "LSM Storage", "Distributed Systems"],
    repo: "https://github.com/saathvik-codes/quorumdb",
    live: "",
    tone: "blue",
  },
];

const capabilities = [
  {
    no: "A",
    title: "Web systems",
    copy: "Typed interfaces, resilient APIs and data layers designed as one coherent product.",
    tools: "React · Next.js · Node.js · FastAPI · SQL · MongoDB",
  },
  {
    no: "B",
    title: "Mobile products",
    copy: "Native Android experiences with thoughtful offline behaviour and dependable persistence.",
    tools: "Kotlin · Jetpack Compose · Room · Firebase",
  },
  {
    no: "C",
    title: "AI workflows",
    copy: "Practical retrieval and agent systems with testable boundaries—not AI added for decoration.",
    tools: "Python · LangChain · Hugging Face · FAISS · scikit-learn",
  },
];

function Arrow() {
  return <span aria-hidden="true">↗</span>;
}

export default function Portfolio() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => entries.forEach((entry) => entry.isIntersecting && entry.target.classList.add("is-visible")),
      { threshold: 0.12 },
    );
    document.querySelectorAll(".reveal").forEach((node) => observer.observe(node));
    return () => observer.disconnect();
  }, []);

  const go = () => setOpen(false);

  return (
    <div className="site-shell">
      <header className="topbar">
        <a className="brand" href="#top" aria-label="Saathvik Kalepu, home">SK<span>.</span></a>
        <button className="menu-button" onClick={() => setOpen(!open)} aria-expanded={open} aria-label="Toggle navigation">
          <span>{open ? "Close" : "Menu"}</span><i />
        </button>
        <nav className={open ? "nav open" : "nav"} aria-label="Primary navigation">
          <a onClick={go} href="#work">Work</a>
          <a onClick={go} href="#about">About</a>
          <a onClick={go} href="#experience">Experience</a>
          <a onClick={go} href="#contact">Contact</a>
        </nav>
        <a className="availability" href="mailto:saathvikk202@gmail.com"><i /> Available for opportunities</a>
      </header>

      <main>
        <section className="hero" id="top">
          <div className="hero-glow" aria-hidden="true"><span /><span /></div>
          <div className="hero-kicker reveal">
            <span>Software engineer</span>
            <span>Hyderabad, India</span>
          </div>
          <div className="hero-copy">
            <h1 className="reveal">I build software<br />that holds up<br /><em>in the real world.</em></h1>
            <div className="hero-aside reveal">
              <p>Full-stack web, native Android and applied AI—designed with product sense and engineered beyond the demo.</p>
              <div className="hero-actions">
                <a className="button primary" href="#work">Explore selected work <span>↓</span></a>
                <a className="text-link" href="/Saathvik_Kalepu_Resume.pdf" download>Download résumé <Arrow /></a>
              </div>
            </div>
          </div>
          <div className="hero-foot reveal">
            <span>Saathvik Kalepu</span>
            <span className="scroll-cue">Scroll to discover <b>↓</b></span>
            <span>IIITDM Kurnool · 2027</span>
          </div>
        </section>

        <section className="manifesto">
          <p className="eyebrow reveal">What I bring</p>
          <p className="manifesto-line reveal">Not another stack of buzzwords.</p>
          <p className="manifesto-line muted reveal">A builder who can move from an ambiguous idea to a working interface, API, data model and deployment.</p>
        </section>

        <section className="section work" id="work">
          <div className="section-head reveal">
            <div><p className="eyebrow">Selected work · 2025–26</p><h2>Built to be used.</h2></div>
            <p>Four projects selected for range, depth and direct relevance to full-stack, mobile and agentic product work.</p>
          </div>
          <div className="project-list">
            {projects.map((project) => (
              <article className={`project reveal ${project.tone}`} key={project.title}>
                <div className="project-number">{project.no}</div>
                <div className="project-body">
                  <p className="eyebrow">{project.eyebrow}</p>
                  <h3>{project.title}</h3>
                  <p className="project-copy">{project.copy}</p>
                  <ul>{project.stack.map((item) => <li key={item}>{item}</li>)}</ul>
                </div>
                <div className="project-links">
                  {project.live && <a href={project.live} target="_blank" rel="noreferrer">Live product <Arrow /></a>}
                  <a href={project.repo} target="_blank" rel="noreferrer">Source code <Arrow /></a>
                </div>
                <div className="project-orbit" aria-hidden="true"><i /><i /><span>{project.no}</span></div>
              </article>
            ))}
          </div>
        </section>

        <section className="section capabilities" id="about">
          <div className="section-head reveal">
            <div><p className="eyebrow">How I build</p><h2>Across the product.</h2></div>
            <p>I am most useful where disciplines meet: product decisions, interface details, backend constraints and delivery.</p>
          </div>
          <div className="capability-grid">
            {capabilities.map((item) => (
              <article className="capability reveal" key={item.no}>
                <span>{item.no}</span><h3>{item.title}</h3><p>{item.copy}</p><small>{item.tools}</small>
              </article>
            ))}
          </div>
        </section>

        <section className="section experience" id="experience">
          <div className="section-head reveal">
            <div><p className="eyebrow">Field notes</p><h2>Experience & education.</h2></div>
            <p>Commercial exposure paired with a strong computer-science foundation and consistent hands-on building.</p>
          </div>
          <div className="timeline">
            <article className="timeline-row reveal">
              <time>Apr–Jun 2026</time>
              <div><p className="eyebrow">Caterworld.ai · Chennai, hybrid</p><h3>DevOps Engineer & UI/UX Designer</h3><p>Worked across CI/CD delivery and responsive product interfaces, helping engineering and design move through releases with fewer handoff gaps.</p></div>
              <span>Internship</span>
            </article>
            <article className="timeline-row reveal">
              <time>Jul 2024–Jan 2025</time>
              <div><p className="eyebrow">AIMaster.live · Remote</p><h3>Software Engineering & Data Analyst Intern</h3><p>Contributed to REST APIs, data-processing workflows and React interfaces while working with product requirements from end to end.</p></div>
              <span>Internship</span>
            </article>
            <article className="timeline-row education-row reveal">
              <time>2023–2027</time>
              <div><p className="eyebrow">IIITDM Kurnool</p><h3>B.Tech, Computer Science & Engineering</h3><p>Coursework across data structures, algorithms, object-oriented programming, databases, operating systems and computer networks.</p></div>
              <span>CGPA 8.2</span>
            </article>
          </div>
        </section>

        <section className="proof reveal" aria-label="Additional credentials">
          <div><strong>200+</strong><span>LeetCode problems</span></div>
          <div><strong>98.8%</strong><span>Class XII</span></div>
          <div><strong>10+</strong><span>technical certifications</span></div>
          <div><strong>3×</strong><span>hackathon participant</span></div>
        </section>

        <section className="contact" id="contact">
          <p className="eyebrow reveal">Start a conversation</p>
          <h2 className="reveal">Have a hard problem?<br /><em>Let’s build through it.</em></h2>
          <div className="contact-bottom reveal">
            <p>I’m currently open to software engineering internships and product-minded collaborations.</p>
            <a className="contact-link" href="mailto:saathvikk202@gmail.com">saathvikk202@gmail.com <Arrow /></a>
          </div>
        </section>
      </main>

      <footer>
        <div><a href="https://github.com/saathvik-codes" target="_blank" rel="noreferrer">GitHub <Arrow /></a><a href="https://linkedin.com/in/saathvik-kalepu-17041228b" target="_blank" rel="noreferrer">LinkedIn <Arrow /></a><a href="https://leetcode.com/u/Sunny550/" target="_blank" rel="noreferrer">LeetCode <Arrow /></a></div>
        <p>Designed & engineered by Saathvik Kalepu · © {new Date().getFullYear()}</p>
        <a href="#top">Back to top ↑</a>
      </footer>
    </div>
  );
}
