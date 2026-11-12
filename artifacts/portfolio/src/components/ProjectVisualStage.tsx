import { useEffect, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import AnimatedCinemaPlate from "./AnimatedCinemaPlate";
import type { FlagshipProject } from "@/data/portfolioData";

interface ProjectVisualStageProps {
  project: FlagshipProject;
}

const PHOTO_ILLUSTRATED_SLUGS = new Set(["aetherflow", "onroad"]);

function QuorumInteractiveBlueprint({ accent }: { accent: string }) {
  const [failedNode, setFailedNode] = useState<number | null>(null);
  const [phase, setPhase] = useState<"steady" | "electing" | "recovered">("steady");
  const reduceMotion = useReducedMotion();

  const triggerChaos = () => {
    const victim = failedNode === 2 ? 4 : 2;
    setFailedNode(victim);
    setPhase("electing");
    window.setTimeout(() => {
      setPhase("recovered");
    }, 850);
  };

  const resetNodes = () => {
    setFailedNode(null);
    setPhase("steady");
  };

  const nodes = [
    { id: 1, x: 200, y: 42, role: "Leader" },
    { id: 2, x: 318, y: 112, role: "Follower" },
    { id: 3, x: 274, y: 214, role: "Follower" },
    { id: 4, x: 126, y: 214, role: "Follower" },
    { id: 5, x: 82, y: 112, role: "Follower" },
  ];

  const activeLeader = failedNode === 1 ? 2 : 1;
  const leaderNode = nodes.find((x) => x.id === activeLeader)!;

  return (
    <div className="h-full w-full flex flex-col justify-between p-5 sm:p-6 bg-[#0b0b10]">
      <div className="flex items-center justify-between gap-3">
        <span className="font-mono text-[10px] tracking-[0.22em] uppercase text-white/45">
          Raft Quorum + LSM Storage Topology
        </span>
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={failedNode ? resetNodes : triggerChaos}
            className="px-2.5 py-1 rounded-full font-mono text-[10px] tracking-wider uppercase border transition-colors cursor-pointer"
            style={{
              borderColor: `${accent}66`,
              color: accent,
              background: `${accent}14`,
            }}
          >
            {failedNode ? "Restore Cluster" : "Simulate Node Kill"}
          </button>
        </div>
      </div>

      <svg viewBox="0 0 400 250" className="w-full max-h-[230px] my-2">
        {/* Ring links */}
        {nodes.map((n, idx) => {
          const next = nodes[(idx + 1) % nodes.length];
          const deadEdge = failedNode === n.id || failedNode === next.id;
          return (
            <line
              key={`edge-${n.id}`}
              x1={n.x}
              y1={n.y}
              x2={next.x}
              y2={next.y}
              stroke={deadEdge ? "rgba(248,113,113,0.22)" : "rgba(232,168,90,0.28)"}
              strokeDasharray={deadEdge ? "4 4" : undefined}
              strokeWidth="1.2"
            />
          );
        })}

        {/* Leader heartbeats + live animated appendEntries packets */}
        {nodes
          .filter((n) => n.id !== activeLeader && n.id !== failedNode)
          .map((n, idx) => (
            <g key={`hb-${n.id}`}>
              <line
                x1={leaderNode.x}
                y1={leaderNode.y}
                x2={n.x}
                y2={n.y}
                stroke="#9d8cff"
                strokeOpacity="0.34"
                strokeWidth="1"
              />
              {!reduceMotion && (
                <motion.g
                  initial={{ x: leaderNode.x, y: leaderNode.y, opacity: 0 }}
                  animate={{
                    x: [leaderNode.x, n.x],
                    y: [leaderNode.y, n.y],
                    opacity: [0, 1, 1, 0],
                  }}
                  transition={{
                    duration: 1.8,
                    repeat: Infinity,
                    ease: "linear",
                    delay: idx * 0.35,
                  }}
                >
                  <circle cx={0} cy={0} r={2.8} fill={accent} />
                </motion.g>
              )}
            </g>
          ))}

        {nodes.map((n) => {
          const isDead = failedNode === n.id;
          const isLeader = n.id === activeLeader && !isDead;
          return (
            <g key={n.id}>
              {isLeader && !reduceMotion && (
                <motion.g
                  style={{ transformOrigin: `${n.x}px ${n.y}px` }}
                  initial={{ scale: 1, opacity: 0.65 }}
                  animate={{ scale: [1, 1.42], opacity: [0.65, 0] }}
                  transition={{ duration: 2.2, repeat: Infinity, ease: "easeOut" }}
                >
                  <circle
                    cx={n.x}
                    cy={n.y}
                    r={22}
                    fill="none"
                    stroke={accent}
                    strokeWidth="1"
                  />
                </motion.g>
              )}
              <circle
                cx={n.x}
                cy={n.y}
                r={isLeader ? 22 : 18}
                fill={
                  isDead
                    ? "#1f1215"
                    : isLeader
                      ? "rgba(232,168,90,0.16)"
                      : "rgba(157,140,255,0.09)"
                }
                stroke={isDead ? "#f87171" : isLeader ? accent : "rgba(242,237,228,0.28)"}
                strokeWidth={isLeader ? 2 : 1.2}
              />
              <text
                x={n.x}
                y={n.y + 3}
                textAnchor="middle"
                fill={isDead ? "#fca5a5" : "#f2ede4"}
                fontSize="10"
                fontFamily="DM Mono, monospace"
              >
                {isDead ? "DOWN" : isLeader ? `N${n.id}*` : `N${n.id}`}
              </text>
            </g>
          );
        })}
      </svg>

      <div className="grid grid-cols-3 gap-2 border-t border-white/[0.08] pt-3 font-mono text-[10px]">
        <div>
          <div className="text-white/35 uppercase">State</div>
          <div className="text-emerald-400 mt-0.5">
            {phase === "steady" && "QUORUM 5/5 OK"}
            {phase === "electing" && "RAFT FAILOVER (~2s)"}
            {phase === "recovered" && "QUORUM 4/5 SERVING"}
          </div>
        </div>
        <div>
          <div className="text-white/35 uppercase">Write Path</div>
          <div className="text-white/75 mt-0.5">WAL → MemTable → SST</div>
        </div>
        <div>
          <div className="text-white/35 uppercase">Chaos Result</div>
          <div style={{ color: accent }} className="mt-0.5">
            17,658 Writes · 0 Loss
          </div>
        </div>
      </div>
    </div>
  );
}

function SwitchboardBlueprint({ accent }: { accent: string }) {
  const reduceMotion = useReducedMotion();

  return (
    <div className="h-full w-full flex flex-col justify-between p-5 sm:p-6 bg-[#0b0b10]">
      <div className="flex items-center justify-between gap-2 font-mono text-[10px] tracking-[0.22em] uppercase text-white/45">
        <span>77-Intent Banking Agent Pipeline &amp; Eval Loop</span>
        <span className="inline-flex items-center gap-1.5 text-[9.5px]" style={{ color: accent }}>
          <span
            className={`h-1.5 w-1.5 rounded-full ${reduceMotion ? "" : "animate-pulse"}`}
            style={{ background: accent }}
          />
          Eval Stream
        </span>
      </div>
      <svg viewBox="0 0 420 210" className="w-full max-h-[210px] my-2">
        {[
          { x: 14, y: 74, w: 96, h: 58, t: "Query", s: "13K Banking77" },
          { x: 142, y: 74, w: 112, h: 58, t: "Classifier", s: "93% Top-1 Acc" },
          { x: 286, y: 26, w: 118, h: 52, t: "Tool Agent", s: "Constrained Schema" },
          { x: 286, y: 122, w: 118, h: 52, t: "Eval Suite", s: "Pass: 67% → 83%" },
        ].map((b, i) => (
          <g key={i}>
            <rect
              x={b.x}
              y={b.y}
              width={b.w}
              height={b.h}
              rx="10"
              fill="rgba(255,255,255,0.03)"
              stroke={i === 1 || i === 3 ? accent : "rgba(242,237,228,0.22)"}
              strokeWidth="1.2"
            />
            <text
              x={b.x + 12}
              y={b.y + 24}
              fill="#f2ede4"
              fontSize="11"
              fontFamily="Manrope, sans-serif"
              fontWeight="600"
            >
              {b.t}
            </text>
            <text
              x={b.x + 12}
              y={b.y + 42}
              fill={accent}
              fontSize="9.5"
              fontFamily="DM Mono, monospace"
            >
              {b.s}
            </text>
          </g>
        ))}

        <path d="M110 103 L142 103" stroke={accent} strokeWidth="1.4" />
        <path d="M254 96 L286 52" stroke="rgba(242,237,228,0.38)" strokeWidth="1.3" />
        <path d="M254 110 L286 148" stroke={accent} strokeWidth="1.3" strokeDasharray="3 3" />
        <path d="M345 78 L345 122" stroke="rgba(242,237,228,0.28)" strokeWidth="1.2" />

        {!reduceMotion && (
          <>
            <motion.g
              initial={{ x: 110, y: 103, opacity: 0 }}
              animate={{ x: [110, 142], y: [103, 103], opacity: [0, 1, 0] }}
              transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
            >
              <circle cx={0} cy={0} r={3} fill={accent} />
            </motion.g>
            <motion.g
              initial={{ x: 254, y: 96, opacity: 0 }}
              animate={{ x: [254, 286], y: [96, 52], opacity: [0, 1, 0] }}
              transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
            >
              <circle cx={0} cy={0} r={3} fill="#f2ede4" />
            </motion.g>
            <motion.g
              initial={{ x: 254, y: 110, opacity: 0 }}
              animate={{ x: [254, 286], y: [110, 148], opacity: [0, 1, 0] }}
              transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut", delay: 0.9 }}
            >
              <circle cx={0} cy={0} r={3} fill={accent} />
            </motion.g>
            <motion.g
              initial={{ x: 345, y: 78, opacity: 0 }}
              animate={{ x: [345, 345], y: [78, 122], opacity: [0, 1, 0] }}
              transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut", delay: 1.25 }}
            >
              <circle cx={0} cy={0} r={2.5} fill="#34d399" />
            </motion.g>
          </>
        )}
      </svg>
      <div className="flex items-center justify-between border-t border-white/[0.08] pt-3 font-mono text-[10px] text-white/55">
        <span>3,080 Held-Out Examples</span>
        <span style={{ color: accent }}>98.4% Top-3 Intent Recall</span>
      </div>
    </div>
  );
}

function QueryMindBlueprint({ accent }: { accent: string }) {
  const [activeStage, setActiveStage] = useState(0);
  const reduceMotion = useReducedMotion();

  useEffect(() => {
    if (reduceMotion) return;
    const id = window.setInterval(() => {
      setActiveStage((s) => (s + 1) % 3);
    }, 1800);
    return () => window.clearInterval(id);
  }, [reduceMotion]);

  const stages = ["1. LangChain SQL Gen", "2. Read-Only AST Guard", "3. DuckDB 1M+ Scan"];

  return (
    <div className="h-full w-full flex flex-col justify-between p-5 sm:p-6 bg-[#0b0b10]">
      <div className="font-mono text-[10px] tracking-[0.22em] uppercase text-white/45">
        Read-Only NL2SQL Guarded Execution Flow
      </div>
      <div className="space-y-2.5 my-3 font-mono text-[11px]">
        <div className="p-3 rounded-lg border border-white/[0.08] bg-white/[0.02] text-white/75">
          USER → &ldquo;Compare Q4 basket retention vs returns by SKU tier&rdquo;
        </div>
        <div className="grid grid-cols-3 gap-2 text-center">
          {stages.map((label, idx) => {
            const focused = activeStage === idx;
            return (
              <motion.div
                key={label}
                animate={
                  reduceMotion
                    ? undefined
                    : {
                        scale: focused ? 1.02 : 1,
                        borderColor: focused
                          ? idx === 2
                            ? "rgba(52,211,153,0.75)"
                            : `${accent}88`
                          : "rgba(255,255,255,0.08)",
                      }
                }
                transition={{ duration: 0.35 }}
                className="p-2.5 rounded-lg border text-white/80"
                style={{
                  background: focused ? `${accent}14` : "rgba(255,255,255,0.015)",
                }}
              >
                {label}
              </motion.div>
            );
          })}
        </div>
        <div className="p-2.5 rounded-lg border border-red-400/20 bg-red-500/[0.04] text-red-300/80 flex items-center justify-between text-[10px]">
          <span>BLOCKED: DROP / DELETE / ALTER / PRAGMA</span>
          <span>SELF-REPAIR ON SCHEMA ERR</span>
        </div>
      </div>
      <div className="flex items-center justify-between border-t border-white/[0.08] pt-3 font-mono text-[10px] text-white/55">
        <span>UCI Online Retail Dataset</span>
        <span style={{ color: accent }}>12 / 12 Query Classes Validated</span>
      </div>
    </div>
  );
}

function PulseBlueprint({ accent }: { accent: string }) {
  const [highlightCol, setHighlightCol] = useState(1);
  const reduceMotion = useReducedMotion();

  useEffect(() => {
    if (reduceMotion) return;
    const id = window.setInterval(() => {
      setHighlightCol((c) => (c + 1) % 5);
    }, 2000);
    return () => window.clearInterval(id);
  }, [reduceMotion]);

  const cohortRows = [
    ["M1", 100, 42, 34, 29, 25],
    ["M2", 100, 46, 36, 31, 0],
    ["M3", 100, 49, 39, 0, 0],
    ["M4", 100, 52, 0, 0, 0],
  ];

  return (
    <div className="h-full w-full flex flex-col justify-between p-5 sm:p-6 bg-[#0b0b10]">
      <div className="font-mono text-[10px] tracking-[0.22em] uppercase text-white/45">
        RFM Cohort Retention Matrix · £17.7M Invoice Ledger
      </div>
      <div className="space-y-2 my-3">
        {cohortRows.map((row) => (
          <div key={String(row[0])} className="grid grid-cols-6 gap-1.5 items-center font-mono text-[10px]">
            <span className="text-white/45">{row[0]}</span>
            {(row.slice(1) as number[]).map((val, idx) => {
              const isHighlighted = !reduceMotion && val > 0 && idx === highlightCol;
              return (
                <motion.div
                  key={idx}
                  animate={{
                    borderColor: isHighlighted ? accent : "rgba(255,255,255,0.06)",
                    scale: isHighlighted ? 1.03 : 1,
                  }}
                  transition={{ duration: 0.35 }}
                  className="h-8 rounded flex items-center justify-center border"
                  style={{
                    background:
                      val > 0
                        ? `rgba(232,168,90,${0.08 + val * 0.0045})`
                        : "rgba(255,255,255,0.015)",
                    color: val > 0 ? "#f2ede4" : "rgba(255,255,255,0.18)",
                  }}
                >
                  {val > 0 ? `${val}%` : "—"}
                </motion.div>
              );
            })}
          </div>
        ))}
      </div>
      <div className="flex items-center justify-between border-t border-white/[0.08] pt-3 font-mono text-[10px] text-white/55">
        <span>36,969 Verified Orders · DuckDB</span>
        <span style={{ color: accent }}>Champions · At-Risk · Hibernating</span>
      </div>
    </div>
  );
}

function HybridGatewayBlueprint({ accent }: { accent: string }) {
  const [pulseSide, setPulseSide] = useState<"cache" | "guard">("cache");
  const reduceMotion = useReducedMotion();

  useEffect(() => {
    if (reduceMotion) return;
    const id = window.setInterval(() => {
      setPulseSide((p) => (p === "cache" ? "guard" : "cache"));
    }, 2200);
    return () => window.clearInterval(id);
  }, [reduceMotion]);

  return (
    <div className="h-full w-full flex flex-col justify-between p-5 sm:p-6 bg-[#0b0b10]">
      <div className="font-mono text-[10px] tracking-[0.22em] uppercase text-white/45">
        Semantic Cache Router + SQLite RBAC Guardrails
      </div>
      <div className="grid grid-cols-2 gap-3 my-3 font-mono text-[10px]">
        <motion.div
          animate={
            reduceMotion
              ? undefined
              : {
                  borderColor:
                    pulseSide === "cache" ? `${accent}88` : "rgba(255,255,255,0.09)",
                }
          }
          transition={{ duration: 0.4 }}
          className="p-3 rounded-xl border bg-white/[0.02] space-y-1.5"
        >
          <div className="text-white/40 uppercase">Gateway Path</div>
          <div className="text-white/85">Cosine Cache ({"<10ms"})</div>
          <div style={{ color: accent }}>Hit → Zero Token Cost</div>
          <div className="text-white/50">Miss → Ollama Local / Gemini</div>
        </motion.div>
        <motion.div
          animate={
            reduceMotion
              ? undefined
              : {
                  borderColor:
                    pulseSide === "guard" ? `${accent}88` : "rgba(255,255,255,0.09)",
                }
          }
          transition={{ duration: 0.4 }}
          className="p-3 rounded-xl border bg-white/[0.02] space-y-1.5"
        >
          <div className="text-white/40 uppercase">Security Plane</div>
          <div className="text-white/85">SQLite Role Scoping</div>
          <div style={{ color: accent }}>PII Redaction Middleware</div>
          <div className="text-white/50">Self-Correcting Critic Loop</div>
        </motion.div>
      </div>
      <div className="flex items-center justify-between border-t border-white/[0.08] pt-3 font-mono text-[10px] text-white/55">
        <span>Local-First Cost &amp; Privacy Routing</span>
        <span style={{ color: accent }}>2 Production Repos</span>
      </div>
    </div>
  );
}

export default function ProjectVisualStage({ project }: ProjectVisualStageProps) {
  const hasPhoto = PHOTO_ILLUSTRATED_SLUGS.has(project.slug);
  const [viewMode, setViewMode] = useState<"scene" | "convo">("scene");

  useEffect(() => {
    setViewMode("scene");
  }, [project.slug]);

  if (hasPhoto) {
    return (
      <AnimatedCinemaPlate
        key={project.slug}
        src={project.illustration}
        alt={`${project.title} conversational walkthrough scene`}
        badgeLeft={`Convo Scene · ${project.index}`}
        badgeRight={project.category}
        kenBurnsDirection={project.slug === "aetherflow" ? "left" : "right"}
        colorGradePreset={project.slug === "onroad" ? "matte-deep" : "editorial"}
      >
        <div className="flex flex-col justify-end gap-3 mt-auto">
          <div className="flex items-center justify-end">
            <button
              type="button"
              onClick={() => setViewMode((m) => (m === "scene" ? "convo" : "scene"))}
              className="px-3 py-1.5 rounded-full bg-[#08080a]/82 backdrop-blur-md border border-white/[0.16] font-mono text-[10px] uppercase tracking-[0.14em] text-[#e8a85a] hover:border-[#e8a85a]/65 transition-colors cursor-pointer"
            >
              {viewMode === "scene" ? "Read Dialogue Notes" : "Hide Notes"}
            </button>
          </div>
          {viewMode === "convo" && (
            <div className="p-3.5 rounded-xl bg-[#08080a]/88 backdrop-blur-xl border border-white/[0.14] space-y-1.5">
              <p className="font-mono text-[10px] uppercase tracking-wider text-[#e8a85a]">
                Use-Case Question
              </p>
              <p className="text-xs text-[#f2ede4]/88 leading-relaxed">{project.convoPrompt}</p>
            </div>
          )}
        </div>
      </AnimatedCinemaPlate>
    );
  }

  return (
    <div className="studio-frame rounded-2xl aspect-[16/10] w-full flex flex-col justify-between">
      <div className="relative z-10 h-full w-full">
        {project.slug === "quorumdb" && <QuorumInteractiveBlueprint accent={project.accent} />}
        {project.slug === "switchboard" && <SwitchboardBlueprint accent={project.accent} />}
        {project.slug === "querymind" && <QueryMindBlueprint accent={project.accent} />}
        {project.slug === "pulse" && <PulseBlueprint accent={project.accent} />}
        {project.slug === "hybrid-llm-rbac" && <HybridGatewayBlueprint accent={project.accent} />}
      </div>
    </div>
  );
}
