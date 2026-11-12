import { WALKTHROUGH_ACTS, THEATRE_SEQUENCE_LENGTH } from "@/theatre/portfolioStage";

interface WalkthroughHudProps {
  currentTime: number;
  activeActIndex: number;
  onJumpToAct: (selector: string) => void;
}

function formatTimecode(sec: number) {
  const whole = Math.floor(sec);
  const frames = Math.floor((sec - whole) * 24);
  return `${String(whole).padStart(2, "0")}:${String(frames).padStart(2, "0")}`;
}

export default function WalkthroughHud({
  currentTime,
  activeActIndex,
  onJumpToAct,
}: WalkthroughHudProps) {
  const currentAct = WALKTHROUGH_ACTS[activeActIndex] ?? WALKTHROUGH_ACTS[0];
  const pct = Math.round((currentTime / THEATRE_SEQUENCE_LENGTH) * 100);

  return (
    <aside
      className="fixed bottom-4 left-1/2 -translate-x-1/2 z-40 hidden lg:flex items-center gap-2.5 max-w-[calc(100vw-2rem)] px-3.5 py-2 rounded-full border border-white/[0.09] bg-[#0b0b0e]/82 backdrop-blur-xl shadow-[0_12px_40px_rgba(0,0,0,0.55)]"
      aria-label="Walkthrough chapters"
      data-testid="walkthrough-hud"
    >
      <div className="flex items-center gap-2 pr-3 border-r border-white/[0.08] shrink-0 whitespace-nowrap">
        <span className="h-1.5 w-1.5 rounded-full bg-[#e8a85a] shadow-[0_0_8px_rgba(232,168,90,0.8)]" />
        <span className="font-mono text-[10px] tracking-[0.2em] text-white/55 uppercase">
          Reel {formatTimecode(currentTime)}
        </span>
        <span className="font-mono text-[10px] text-white/25">/ {pct}%</span>
      </div>

      <div className="flex items-center gap-1 shrink-0">
        {WALKTHROUGH_ACTS.map((act, idx) => {
          const isActive = idx === activeActIndex;
          return (
            <button
              key={act.id}
              type="button"
              onClick={() => onJumpToAct(act.selector)}
              className={`px-2 xl:px-2.5 py-1 rounded-full font-mono text-[10px] tracking-[0.12em] uppercase whitespace-nowrap transition-all duration-300 cursor-pointer ${
                isActive
                  ? "bg-white/[0.11] text-[#f3efe6] border border-[#e8a85a]/45"
                  : "text-white/40 hover:text-white/80 border border-transparent"
              }`}
              title={`${act.index} — ${act.title}: ${act.subtitle}`}
            >
              {act.index} {act.title}
            </button>
          );
        })}
      </div>

      <div className="hidden xl:block pl-2.5 border-l border-white/[0.08] font-mono text-[10px] tracking-[0.16em] text-[#9d8cff]/80 uppercase whitespace-nowrap">
        {currentAct.subtitle}
      </div>
    </aside>
  );
}
