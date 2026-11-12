import { useEffect, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import type { FlagshipProject } from "@/data/portfolioData";

interface ProjectVisualStageProps {
  project: FlagshipProject;
}

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
    { id: 1, x: 200, y: 42 },
    { id: 2, x: 318, y: 112 },
    { id: 3, x: 274, y: 214 },
    { id: 4, x: 126, y: 214 },
    { id: 5, x: 82, y: 112 },
  ];

  const activeLeader = failedNode === 1 ? 2 : 1;
  const leaderNode = nodes.find((x) => x.id === activeLeader)!;

  return (
    <div className="h-full w-full flex flex-col justify-between p-5 bg-[#f8f7f4] border border-[#e4e2dd] rounded-xl">
      <div className="flex items-center justify-between gap-3">
        <span className="font-mono text-[10px] tracking-[0.14em] uppercase text-[#57534e]">
          Raft Quorum + LSM Topology
        </span>
        <button
          type="button"
          onClick={failedNode ? resetNodes : triggerChaos}
          data-testid="quorum-chaos-btn"
          className="px-3 py-1 rounded-full font-mono text-[10px] tracking-wide border transition-colors cursor-pointer bg-white"
          style={{
            borderColor: `${accent}55`,
            color: accent,
          }}
        >
          {failedNode ? "Restore Cluster" : "Simulate Node Kill"}
        </button>
      </div>

      <svg viewBox="0 0 400 250" className="w-full max-h-[225px] my-2">
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
              stroke={deadEdge ? "#fca5a5" : "#d6d3cb"}
              strokeDasharray={deadEdge ? "4 4" : undefined}
              strokeWidth="1.25"
            />
          );
        })}

        {nodes
          .filter((n) => n.id !== activeLeader && n.id !== failedNode)
          .map((n, idx) => (
            <g key={`hb-${n.id}`}>
              <line
                x1={leaderNode.x}
                y1={leaderNode.y}
                x2={n.x}
                y2={n.y}
                stroke={accent}
                strokeOpacity="0.28"
                strokeWidth="1.2"
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
                  initial={{ scale: 1, opacity: 0.55 }}
                  animate={{ scale: [1, 1.38], opacity: [0.55, 0] }}
                  transition={{ duration: 2.2, repeat: Infinity, ease: "easeOut" }}
                >
                  <circle
                    cx={n.x}
                    cy={n.y}
                    r={22}
                    fill="none"
                    stroke={accent}
                    strokeWidth="1.1"
                  />
                </motion.g>
              )}
              <circle
                cx={n.x}
                cy={n.y}
                r={isLeader ? 22 : 18}
                fill={isDead ? "#fef2f2" : isLeader ? "#eff6ff" : "#ffffff"}
                stroke={isDead ? "#dc2626" : isLeader ? accent : "#cbd5e1"}
                strokeWidth={isLeader ? 2 : 1.4}
              />
              <text
                x={n.x}
                y={n.y + 3.5}
                textAnchor="middle"
                fill={isDead ? "#dc2626" : isLeader ? accent : "#141413"}
                fontSize="10"
                fontWeight="600"
                fontFamily="DM Mono, monospace"
              >
                {isDead ? "DOWN" : isLeader ? `N${n.id}*` : `N${n.id}`}
              </text>
            </g>
          );
        })}
      </svg>

      <div className="grid grid-cols-3 gap-2 border-t border-[#e4e2dd] pt-3 font-mono text-[10px]">
        <div>
          <div className="text-[#78716c] uppercase">State</div>
          <div className="text-[#047857] font-medium mt-0.5" data-testid="quorum-state-text">
            {phase === "steady" && "QUORUM 5/5 OK"}
            {phase === "electing" && "RAFT FAILOVER (~2s)"}
            {phase === "recovered" && "QUORUM 4/5 SERVING"}
          </div>
        </div>
        <div>
          <div className="text-[#78716c] uppercase">Write Path</div>
          <div className="text-[#141413] mt-0.5">WAL → MemTable → SST</div>
        </div>
        <div>
          <div className="text-[#78716c] uppercase">Chaos Test</div>
          <div style={{ color: accent }} className="font-medium mt-0.5">
            17,658 Writes · 0 Loss
          </div>
        </div>
      </div>
    </div>
  );
}

const RBFTP_FIELDS = [
  {
    id: "magic",
    bytes: "0x00–01",
    hex: "AF 52",
    label: "Magic Header",
    detail: "2-byte protocol signature (0xAF52) rejects malformed socket streams before buffer allocation.",
  },
  {
    id: "flags",
    bytes: "0x02",
    hex: "01",
    label: "Version & Flags",
    detail: "Protocol v1 + operation flags (PUT / GET / ACK / STREAM_END) packed in a single byte.",
  },
  {
    id: "seq",
    bytes: "0x03",
    hex: "1C",
    label: "Frame Seq",
    detail: "Monotonic frame sequence counter detecting out-of-order or dropped TCP chunks.",
  },
  {
    id: "len",
    bytes: "0x04–05",
    hex: "04 00",
    label: "Payload Length",
    detail: "Network-endian uint16 declaring exact chunk size (1,024 B default block) for deterministic framing.",
  },
  {
    id: "cksum",
    bytes: "0x06–07",
    hex: "E9 4B",
    label: "RFC 1071 Checksum",
    detail: "16-bit one's-complement checksum verified in C++ Winsock2 before disk commit + SHA-256 hash.",
  },
];

function AetherFlowBlueprint({ accent }: { accent: string }) {
  const [selectedField, setSelectedField] = useState(0);
  const current = RBFTP_FIELDS[selectedField] ?? RBFTP_FIELDS[0];

  return (
    <div className="h-full w-full flex flex-col justify-between p-5 bg-[#f8f7f4] border border-[#e4e2dd] rounded-xl">
      <div className="flex items-center justify-between gap-2">
        <span className="font-mono text-[10px] tracking-[0.14em] uppercase text-[#57534e]">
          8-Byte RBFTP Binary Frame Inspector
        </span>
        <span className="font-mono text-[10px] font-medium" style={{ color: accent }}>
          C++ Winsock2 + Python Bridge
        </span>
      </div>

      {/* Interactive 8-byte header cells */}
      <div className="space-y-3 my-3">
        <div className="grid grid-cols-5 gap-1.5">
          {RBFTP_FIELDS.map((field, idx) => {
            const active = selectedField === idx;
            return (
              <button
                key={field.id}
                type="button"
                onClick={() => setSelectedField(idx)}
                data-testid={`rbftp-byte-${field.id}`}
                className="p-2 rounded-lg border text-left transition-all cursor-pointer"
                style={{
                  background: active ? "#ffffff" : "#f1efe9",
                  borderColor: active ? accent : "#dcd9d0",
                }}
              >
                <div className="font-mono text-[9px] text-[#78716c]">{field.bytes}</div>
                <div
                  className="font-mono text-xs font-semibold mt-0.5"
                  style={{ color: active ? accent : "#141413" }}
                >
                  {field.hex}
                </div>
                <div className="text-[10px] text-[#57534e] truncate mt-0.5">{field.label}</div>
              </button>
            );
          })}
        </div>

        {/* Active field callout */}
        <div className="bg-white border border-[#e4e2dd] rounded-lg p-3.5 space-y-1">
          <div className="flex items-center justify-between font-mono text-[10px]">
            <span className="font-semibold" style={{ color: accent }}>
              {current.label} ({current.bytes})
            </span>
            <span className="text-[#78716c]">HEX {current.hex}</span>
          </div>
          <p className="text-xs text-[#57534e] leading-relaxed">{current.detail}</p>
        </div>

        {/* Clean transport strip */}
        <div className="grid grid-cols-3 gap-2 text-center font-mono text-[10px]">
          <div className="bg-white border border-[#e4e2dd] rounded-md py-1.5 px-2 text-[#141413]">
            HTTP Client
          </div>
          <div
            className="bg-white border rounded-md py-1.5 px-2 font-medium"
            style={{ borderColor: `${accent}44`, color: accent }}
          >
            Python Gateway
          </div>
          <div className="bg-white border border-[#e4e2dd] rounded-md py-1.5 px-2 text-[#141413]">
            C++ TCP → SHA-256
          </div>
        </div>
      </div>

      <div className="flex items-center justify-between border-t border-[#e4e2dd] pt-3 font-mono text-[10px] text-[#57534e]">
        <span>Deterministic Byte Framing</span>
        <span style={{ color: accent }} className="font-medium">
          Zero Partial Disk Writes
        </span>
      </div>
    </div>
  );
}

const RTO_STATES = [
  { code: "KA", name: "Karnataka", rtoPct: 18, cess: "₹18,750", insurance: "₹52,400", total: "₹14,96,150" },
  { code: "MH", name: "Maharashtra", rtoPct: 13, cess: "₹12,500", insurance: "₹51,800", total: "₹14,26,800" },
  { code: "TS", name: "Telangana", rtoPct: 17, cess: "₹14,000", insurance: "₹52,100", total: "₹14,78,600" },
  { code: "DL", name: "Delhi NCR", rtoPct: 10, cess: "₹4,000", insurance: "₹50,900", total: "₹13,79,900" },
];

function OnRoadBlueprint({ accent }: { accent: string }) {
  const [stateIdx, setStateIdx] = useState(0);
  const s = RTO_STATES[stateIdx] ?? RTO_STATES[0];
  const exShowroom = 1250000;
  const rtoAmount = `₹${Math.round((exShowroom * s.rtoPct) / 100).toLocaleString("en-IN")}`;

  return (
    <div className="h-full w-full flex flex-col justify-between p-5 bg-[#f8f7f4] border border-[#e4e2dd] rounded-xl">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <span className="font-mono text-[10px] tracking-[0.14em] uppercase text-[#57534e]">
          Deterministic State RTO Engine
        </span>
        <div className="flex items-center gap-1">
          {RTO_STATES.map((item, idx) => {
            const active = idx === stateIdx;
            return (
              <button
                key={item.code}
                type="button"
                onClick={() => setStateIdx(idx)}
                data-testid={`onroad-state-${item.code}`}
                className="px-2 py-0.5 rounded font-mono text-[10px] border transition-colors cursor-pointer"
                style={{
                  background: active ? accent : "#ffffff",
                  borderColor: active ? accent : "#dcd9d0",
                  color: active ? "#ffffff" : "#57534e",
                }}
              >
                {item.code}
              </button>
            );
          })}
        </div>
      </div>

      {/* Deterministic price breakdown ledger */}
      <div className="bg-white border border-[#e4e2dd] rounded-lg p-3.5 my-3 space-y-2">
        <div className="flex items-center justify-between pb-2 border-b border-[#eceae4] text-xs">
          <span className="font-semibold text-[#141413]">Sample SUV · {s.name}</span>
          <span className="font-mono text-[10px]" style={{ color: accent }}>
            RTO Slab {s.rtoPct}%
          </span>
        </div>
        <div className="grid grid-cols-2 gap-y-1.5 text-xs">
          <span className="text-[#57534e]">Ex-Showroom</span>
          <span className="text-right font-mono text-[#141413]">₹12,50,000</span>
          <span className="text-[#57534e]">State Road Tax ({s.rtoPct}%)</span>
          <span className="text-right font-mono text-[#141413]">{rtoAmount}</span>
          <span className="text-[#57534e]">Safety Cess &amp; Reg</span>
          <span className="text-right font-mono text-[#141413]">{s.cess}</span>
          <span className="text-[#57534e]">Insurance (1+3) &amp; FASTag</span>
          <span className="text-right font-mono text-[#141413]">{s.insurance}</span>
        </div>
        <div className="pt-2 border-t border-[#eceae4] flex items-center justify-between text-xs font-semibold">
          <span className="text-[#141413]">Exact On-Road Price</span>
          <span className="font-mono text-sm" style={{ color: accent }} data-testid="onroad-total">
            {s.total}
          </span>
        </div>
      </div>

      <div className="flex items-center justify-between border-t border-[#e4e2dd] pt-3 font-mono text-[10px] text-[#57534e]">
        <span>36 States &amp; UTs · MapLibre + 3D</span>
        <span style={{ color: accent }} className="font-medium">
          2,500+ Variants Indexed
        </span>
      </div>
    </div>
  );
}

function SwitchboardBlueprint({ accent }: { accent: string }) {
  const reduceMotion = useReducedMotion();

  return (
    <div className="h-full w-full flex flex-col justify-between p-5 bg-[#f8f7f4] border border-[#e4e2dd] rounded-xl">
      <div className="flex items-center justify-between gap-2 font-mono text-[10px] tracking-[0.14em] uppercase text-[#57534e]">
        <span>77-Intent Agent &amp; Eval Loop</span>
        <span className="inline-flex items-center gap-1.5 font-medium" style={{ color: accent }}>
          <span
            className={`h-1.5 w-1.5 rounded-full ${reduceMotion ? "" : "animate-pulse"}`}
            style={{ background: accent }}
          />
          Eval Verified
        </span>
      </div>

      <svg viewBox="0 0 420 205" className="w-full max-h-[205px] my-2">
        {[
          { x: 14, y: 72, w: 96, h: 58, t: "Query", s: "13K Banking77" },
          { x: 142, y: 72, w: 112, h: 58, t: "Classifier", s: "93% Top-1 Acc" },
          { x: 286, y: 24, w: 118, h: 52, t: "Tool Agent", s: "Schema Guard" },
          { x: 286, y: 120, w: 118, h: 52, t: "Eval Suite", s: "Pass: 67% → 83%" },
        ].map((b, i) => (
          <g key={i}>
            <rect
              x={b.x}
              y={b.y}
              width={b.w}
              height={b.h}
              rx="10"
              fill="#ffffff"
              stroke={i === 1 || i === 3 ? accent : "#d6d3cb"}
              strokeWidth="1.4"
            />
            <text
              x={b.x + 12}
              y={b.y + 24}
              fill="#141413"
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

        <path d="M110 101 L142 101" stroke={accent} strokeWidth="1.4" />
        <path d="M254 94 L286 50" stroke="#94a3b8" strokeWidth="1.3" />
        <path d="M254 108 L286 146" stroke={accent} strokeWidth="1.3" strokeDasharray="3 3" />
        <path d="M345 76 L345 120" stroke="#94a3b8" strokeWidth="1.2" />

        {!reduceMotion && (
          <>
            <motion.g
              initial={{ x: 110, y: 101, opacity: 0 }}
              animate={{ x: [110, 142], y: [101, 101], opacity: [0, 1, 0] }}
              transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
            >
              <circle cx={0} cy={0} r={3} fill={accent} />
            </motion.g>
            <motion.g
              initial={{ x: 254, y: 94, opacity: 0 }}
              animate={{ x: [254, 286], y: [94, 50], opacity: [0, 1, 0] }}
              transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
            >
              <circle cx={0} cy={0} r={3} fill="#141413" />
            </motion.g>
            <motion.g
              initial={{ x: 254, y: 108, opacity: 0 }}
              animate={{ x: [254, 286], y: [108, 146], opacity: [0, 1, 0] }}
              transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut", delay: 0.9 }}
            >
              <circle cx={0} cy={0} r={3} fill={accent} />
            </motion.g>
          </>
        )}
      </svg>

      <div className="flex items-center justify-between border-t border-[#e4e2dd] pt-3 font-mono text-[10px] text-[#57534e]">
        <span>3,080 Held-Out Examples</span>
        <span style={{ color: accent }} className="font-medium">
          98.4% Top-3 Intent Recall
        </span>
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
    <div className="h-full w-full flex flex-col justify-between p-5 bg-[#f8f7f4] border border-[#e4e2dd] rounded-xl">
      <div className="font-mono text-[10px] tracking-[0.14em] uppercase text-[#57534e]">
        Read-Only NL2SQL AST Execution Flow
      </div>

      <div className="space-y-2.5 my-3 font-mono text-[11px]">
        <div className="p-3 rounded-lg border border-[#e4e2dd] bg-white text-[#141413]">
          PROMPT → &ldquo;Compare Q4 basket retention vs returns by SKU tier&rdquo;
        </div>
        <div className="grid grid-cols-3 gap-2 text-center">
          {stages.map((label, idx) => {
            const focused = activeStage === idx;
            return (
              <div
                key={label}
                className="p-2.5 rounded-lg border transition-colors"
                style={{
                  background: focused ? "#ffffff" : "#f1efe9",
                  borderColor: focused
                    ? idx === 2
                      ? "#059669"
                      : accent
                    : "#dcd9d0",
                  color: focused ? "#141413" : "#57534e",
                  fontWeight: focused ? 600 : 400,
                }}
              >
                {label}
              </div>
            );
          })}
        </div>
        <div className="p-2.5 rounded-lg border border-[#fecdd3] bg-[#fff1f2] text-[#be123c] flex items-center justify-between text-[10px]">
          <span>BLOCKED: DROP / DELETE / ALTER / PRAGMA</span>
          <span className="font-medium">AUTO-REPAIR ON SCHEMA ERR</span>
        </div>
      </div>

      <div className="flex items-center justify-between border-t border-[#e4e2dd] pt-3 font-mono text-[10px] text-[#57534e]">
        <span>UCI Online Retail Dataset</span>
        <span style={{ color: accent }} className="font-medium">
          12 / 12 Query Classes Validated
        </span>
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
    <div className="h-full w-full flex flex-col justify-between p-5 bg-[#f8f7f4] border border-[#e4e2dd] rounded-xl">
      <div className="font-mono text-[10px] tracking-[0.14em] uppercase text-[#57534e]">
        RFM Cohort Retention Matrix · £17.7M Ledger
      </div>

      <div className="space-y-2 my-3">
        {cohortRows.map((row) => (
          <div key={String(row[0])} className="grid grid-cols-6 gap-1.5 items-center font-mono text-[10px]">
            <span className="text-[#57534e] font-medium">{row[0]}</span>
            {(row.slice(1) as number[]).map((val, idx) => {
              const isHighlighted = !reduceMotion && val > 0 && idx === highlightCol;
              return (
                <div
                  key={idx}
                  className="h-8 rounded flex items-center justify-center border transition-all"
                  style={{
                    borderColor: isHighlighted ? accent : "#e4e2dd",
                    background:
                      val > 0
                        ? `rgba(190,18,60,${0.05 + val * 0.0028})`
                        : "#ffffff",
                    color: val > 0 ? (val > 50 ? "#881337" : "#141413") : "#cbd5e1",
                    fontWeight: isHighlighted ? 600 : 400,
                  }}
                >
                  {val > 0 ? `${val}%` : "—"}
                </div>
              );
            })}
          </div>
        ))}
      </div>

      <div className="flex items-center justify-between border-t border-[#e4e2dd] pt-3 font-mono text-[10px] text-[#57534e]">
        <span>36,969 Verified Orders · DuckDB</span>
        <span style={{ color: accent }} className="font-medium">
          Champions · At-Risk · Hibernating
        </span>
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
    <div className="h-full w-full flex flex-col justify-between p-5 bg-[#f8f7f4] border border-[#e4e2dd] rounded-xl">
      <div className="font-mono text-[10px] tracking-[0.14em] uppercase text-[#57534e]">
        Semantic Cache Router + SQLite RBAC Guardrails
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 my-3 font-mono text-[10px]">
        <div
          className="p-3.5 rounded-xl border bg-white space-y-1.5 transition-colors"
          style={{
            borderColor: pulseSide === "cache" ? accent : "#e4e2dd",
          }}
        >
          <div className="text-[#78716c] uppercase">Gateway Path</div>
          <div className="text-[#141413] font-semibold">Cosine Cache ({"<10ms"})</div>
          <div style={{ color: accent }} className="font-medium">
            Hit → Zero Token Cost
          </div>
          <div className="text-[#57534e]">Miss → Ollama Local / Gemini</div>
        </div>

        <div
          className="p-3.5 rounded-xl border bg-white space-y-1.5 transition-colors"
          style={{
            borderColor: pulseSide === "guard" ? accent : "#e4e2dd",
          }}
        >
          <div className="text-[#78716c] uppercase">Security Plane</div>
          <div className="text-[#141413] font-semibold">SQLite Role Scoping</div>
          <div style={{ color: accent }} className="font-medium">
            PII Redaction Middleware
          </div>
          <div className="text-[#57534e]">Self-Correcting Critic Loop</div>
        </div>
      </div>

      <div className="flex items-center justify-between border-t border-[#e4e2dd] pt-3 font-mono text-[10px] text-[#57534e]">
        <span>Local-First Cost &amp; Privacy Routing</span>
        <span style={{ color: accent }} className="font-medium">
          2 Companion Repos
        </span>
      </div>
    </div>
  );
}

export default function ProjectVisualStage({ project }: ProjectVisualStageProps) {
  return (
    <div className="w-full" data-testid={`visual-stage-${project.slug}`}>
      {project.slug === "quorumdb" && <QuorumInteractiveBlueprint accent={project.accent} />}
      {project.slug === "aetherflow" && <AetherFlowBlueprint accent={project.accent} />}
      {project.slug === "onroad" && <OnRoadBlueprint accent={project.accent} />}
      {project.slug === "switchboard" && <SwitchboardBlueprint accent={project.accent} />}
      {project.slug === "querymind" && <QueryMindBlueprint accent={project.accent} />}
      {project.slug === "pulse" && <PulseBlueprint accent={project.accent} />}
      {project.slug === "hybrid-llm-rbac" && <HybridGatewayBlueprint accent={project.accent} />}
    </div>
  );
}
