import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const skillGroups = [
  {
    category: "Languages",
    icon: "⌨",
    skills: ["Java", "Python", "JavaScript", "TypeScript", "C++", "SQL"],
  },
  {
    category: "Frontend",
    icon: "◻",
    skills: ["React.js", "HTML5", "CSS3", "Tailwind CSS"],
  },
  {
    category: "Backend",
    icon: "⬡",
    skills: ["Node.js", "Express", "Flask", "Django", "REST APIs", "Microservices"],
  },
  {
    category: "AI / ML",
    icon: "◈",
    skills: ["NLP", "Behavioral Biometrics", "Explainable AI (SHAP)", "scikit-learn"],
  },
  {
    category: "Cloud & DevOps",
    icon: "▲",
    skills: ["Docker", "Kubernetes", "CI/CD", "AWS", "Firebase"],
  },
  {
    category: "Databases",
    icon: "◆",
    skills: ["MongoDB", "MySQL", "PostgreSQL", "SQLite"],
  },
  {
    category: "Testing",
    icon: "✦",
    skills: ["Unit Testing (xUnit)", "Integration Testing", "Mocking", "Debugging"],
  },
  {
    category: "Tools",
    icon: "⬢",
    skills: ["Git", "Linux", "Windows API"],
  },
];

const marqueeItems = [
  "TypeScript", "React", "Node.js", "Python", "Flask", "Django",
  "MongoDB", "PostgreSQL", "Docker", "AWS", "Firebase", "scikit-learn",
  "NLP", "SHAP", "Express", "CI/CD", "Kubernetes", "Java", "C++",
];

export default function Skills() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".skill-group", {
        y: 50,
        opacity: 0,
        duration: 0.8,
        ease: "power3.out",
        stagger: 0.1,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 70%",
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="skills"
      className="relative py-32 overflow-hidden"
      data-testid="skills-section"
    >
      {/* Background gradient */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: "radial-gradient(ellipse 60% 50% at 50% 50%, rgba(139,92,246,0.04) 0%, transparent 70%)",
        }}
      />

      <div className="px-8 md:px-16 max-w-7xl mx-auto mb-16">
        <div className="section-index mb-6">04 — Skills</div>

        <h2
          className="font-serif text-[clamp(2.5rem,5vw,4.5rem)] font-800 leading-tight text-white"
          style={{ fontFamily: "'Syne', sans-serif", fontWeight: 800 }}
          data-testid="skills-heading"
        >
          Technical<br />
          <span className="gradient-text">Arsenal.</span>
        </h2>
      </div>

      {/* Marquee */}
      <div className="marquee py-5 mb-16 border-y border-white/5">
        <div className="marquee-inner">
          {[...marqueeItems, ...marqueeItems].map((item, i) => (
            <span
              key={i}
              className="mx-8 font-mono text-sm text-white/20 tracking-widest uppercase"
            >
              {item}
              <span className="mx-8 text-violet-500/40">·</span>
            </span>
          ))}
        </div>
      </div>

      {/* Skills grid */}
      <div className="px-8 md:px-16 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {skillGroups.map((group, i) => (
            <div
              key={i}
              className="skill-group project-card p-6 rounded-sm bg-white/[0.02] hover:bg-white/[0.03] transition-all duration-300"
              data-testid={`skill-group-${group.category.toLowerCase().replace(/\s+/g, "-")}`}
            >
              <div className="flex items-center gap-3 mb-5">
                <span className="text-violet-400/60 text-lg">{group.icon}</span>
                <div className="font-mono text-xs tracking-widest uppercase text-violet-400/70">
                  {group.category}
                </div>
              </div>
              <div className="flex flex-wrap gap-2">
                {group.skills.map((skill) => (
                  <span
                    key={skill}
                    className="skill-pill"
                    data-testid={`skill-${skill.toLowerCase().replace(/\s+/g, "-")}`}
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Achievements */}
        <div className="mt-16 h-line" />
        <div className="mt-16 grid md:grid-cols-3 gap-6">
          {[
            {
              title: "Production Experience",
              desc: "Led and contributed to production-oriented software projects during internship at aimaster.live.",
              icon: "◆",
            },
            {
              title: "500+ LeetCode Problems",
              desc: "Strengthened algorithmic proficiency through consistent competitive programming practice.",
              icon: "⚡",
            },
            {
              title: "Active in Tech Community",
              desc: "Participant in hackathons, coding contests, technical workshops, and open source collaboration.",
              icon: "◈",
            },
          ].map((item, i) => (
            <div
              key={i}
              className="project-card p-6 rounded-sm bg-white/[0.015] hover:bg-white/[0.03] transition-all duration-300"
              data-testid={`achievement-${i}`}
            >
              <div className="text-violet-400/50 text-xl mb-4">{item.icon}</div>
              <div className="font-semibold text-white text-sm mb-2">{item.title}</div>
              <div className="text-white/35 text-sm leading-relaxed">{item.desc}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
