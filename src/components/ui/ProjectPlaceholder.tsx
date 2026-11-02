import type { ProjectTint } from "@/data/projects";

/**
 * Temporary art-directed visuals, one motif per project, drawn inside a phone
 * outline. They exist only until real screenshots are supplied (set `image`
 * in data/projects.ts). Colors come from the --tint-* tokens.
 */

const PHONE = { x: 250, y: 50, w: 140, h: 380 };

function Phone({ children }: { children: React.ReactNode }) {
  return (
    <>
      <rect
        x={PHONE.x}
        y={PHONE.y}
        width={PHONE.w}
        height={PHONE.h}
        rx={22}
        fill="var(--bg)"
        fillOpacity={0.55}
        stroke="currentColor"
        strokeOpacity={0.6}
        strokeWidth={1.5}
      />
      {children}
    </>
  );
}

const ink = { fill: "currentColor" } as const;

function Artevo() {
  return (
    <Phone>
      <rect x={268} y={90} width={104} height={136} stroke="currentColor" strokeOpacity={0.7} fill="none" strokeWidth={1.5} />
      <circle cx={306} cy={142} r={18} {...ink} fillOpacity={0.35} />
      <path d="M268 226 L320 170 L372 226 Z" {...ink} fillOpacity={0.25} />
      <rect x={268} y={244} width={70} height={6} rx={3} {...ink} fillOpacity={0.5} />
      <rect x={268} y={258} width={44} height={6} rx={3} {...ink} fillOpacity={0.25} />
      <rect x={268} y={288} width={48} height={62} stroke="currentColor" strokeOpacity={0.5} fill="none" strokeWidth={1.5} />
      <rect x={324} y={288} width={48} height={62} stroke="currentColor" strokeOpacity={0.5} fill="none" strokeWidth={1.5} />
      <rect x={324} y={300} width={48} height={20} {...ink} fillOpacity={0.2} />
      <rect x={268} y={386} width={104} height={20} rx={10} {...ink} fillOpacity={0.55} />
    </Phone>
  );
}

function FoJo() {
  return (
    <Phone>
      <rect x={268} y={84} width={104} height={22} rx={11} fill="none" stroke="currentColor" strokeOpacity={0.5} strokeWidth={1.5} />
      {[128, 188, 248, 308].map((y, i) => (
        <g key={y}>
          <circle cx={282} cy={y + 14} r={12} {...ink} fillOpacity={i === 0 ? 0.55 : 0.28} />
          <rect x={302} y={y + 4} width={i % 2 ? 56 : 68} height={6} rx={3} {...ink} fillOpacity={0.55} />
          <rect x={302} y={y + 18} width={40} height={5} rx={2.5} {...ink} fillOpacity={0.25} />
          <line x1={268} x2={372} y1={y + 44} y2={y + 44} stroke="currentColor" strokeOpacity={0.2} />
        </g>
      ))}
      <rect x={268} y={386} width={104} height={20} rx={10} {...ink} fillOpacity={0.55} />
    </Phone>
  );
}

function ToolHub() {
  return (
    <Phone>
      <rect x={268} y={84} width={104} height={22} rx={4} fill="none" stroke="currentColor" strokeOpacity={0.5} strokeWidth={1.5} />
      {[0, 1, 2].map((row) =>
        [0, 1].map((col) => {
          const x = 268 + col * 56;
          const y = 124 + row * 84;
          return (
            <g key={`${row}-${col}`}>
              <rect x={x} y={y} width={48} height={50} {...ink} fillOpacity={(row + col) % 2 ? 0.2 : 0.35} />
              <path d={`M${x + 8} ${y + 40} h14 v-12 h10 v-10 h8`} fill="none" stroke="currentColor" strokeOpacity={0.7} strokeWidth={1.5} />
              <rect x={x} y={y + 58} width={34} height={5} rx={2.5} {...ink} fillOpacity={0.5} />
              <rect x={x} y={y + 68} width={22} height={4} rx={2} {...ink} fillOpacity={0.25} />
            </g>
          );
        }),
      )}
    </Phone>
  );
}

function LockSpot() {
  return (
    <Phone>
      <rect x={268} y={84} width={60} height={7} rx={3.5} {...ink} fillOpacity={0.5} />
      <rect x={268} y={98} width={38} height={5} rx={2.5} {...ink} fillOpacity={0.25} />
      {[0, 1, 2, 3].map((row) =>
        [0, 1, 2].map((col) => {
          const x = 268 + col * 36;
          const y = 124 + row * 62;
          const selected = row === 1 && col === 1;
          return (
            <g key={`${row}-${col}`}>
              <rect
                x={x}
                y={y}
                width={32}
                height={54}
                fill={selected ? "currentColor" : "none"}
                fillOpacity={selected ? 0.4 : 0}
                stroke="currentColor"
                strokeOpacity={0.6}
                strokeWidth={1.5}
              />
              <circle cx={x + 16} cy={y + 30} r={3} {...ink} fillOpacity={0.7} />
            </g>
          );
        }),
      )}
      <rect x={268} y={386} width={104} height={20} rx={10} {...ink} fillOpacity={0.55} />
    </Phone>
  );
}

const motifs: Record<ProjectTint, () => React.JSX.Element> = {
  stone: Artevo,
  sage: FoJo,
  concrete: ToolHub,
  slate: LockSpot,
};

export function ProjectPlaceholder({ tint, label }: { tint: ProjectTint; label: string }) {
  const Motif = motifs[tint];
  return (
    <div
      role="img"
      aria-label={label}
      className="size-full"
      style={{ backgroundColor: `var(--tint-${tint})`, color: `var(--tint-${tint}-ink)` }}
    >
      <svg viewBox="0 0 640 480" className="size-full" preserveAspectRatio="xMidYMid slice" aria-hidden>
        <Motif />
      </svg>
    </div>
  );
}
