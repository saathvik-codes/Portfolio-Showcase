export function NptelLogo({ size = 20 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" aria-label="NPTEL IIT Kharagpur">
      <rect width="24" height="24" rx="5" fill="#1b150e" stroke="#f59e0b" strokeOpacity="0.45" />
      <path
        d="M5.5 16.5V7.5L11.5 16.5V7.5"
        stroke="#f59e0b"
        strokeWidth="1.9"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <circle cx="17" cy="9.5" r="2.2" stroke="#fcd34d" strokeWidth="1.6" />
      <path d="M17 13.2V17" stroke="#f59e0b" strokeWidth="1.8" strokeLinecap="round" />
    </svg>
  );
}

export function MicrosoftLogo({ size = 20 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 23 23" aria-label="Microsoft">
      <rect x="1" y="1" width="10" height="10" fill="#F25022" />
      <rect x="12" y="1" width="10" height="10" fill="#7FBA00" />
      <rect x="1" y="12" width="10" height="10" fill="#00A4EF" />
      <rect x="12" y="12" width="10" height="10" fill="#FFB900" />
    </svg>
  );
}

export function LinkedInLogo({ size = 20 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="#0A66C2" aria-label="LinkedIn">
      <rect width="24" height="24" rx="4" />
      <path
        fill="#fff"
        d="M7.12 9.4H4.2V19h2.92V9.4ZM5.66 8.16a1.7 1.7 0 1 0 0-3.4 1.7 1.7 0 0 0 0 3.4ZM19.8 19h-2.92v-5.04c0-1.2-.43-2.02-1.5-2.02-.82 0-1.31.55-1.52 1.08-.08.19-.1.46-.1.73V19H10.8s.04-8.74 0-9.6h2.92v1.36c.39-.6 1.08-1.46 2.63-1.46 1.92 0 3.36 1.25 3.36 3.95V19Z"
      />
    </svg>
  );
}

export function UdemyLogo({ size = 20 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" aria-label="Udemy">
      <rect width="24" height="24" rx="5" fill="#A435F0" />
      <path
        fill="#fff"
        d="M7 7h2.4v7.1c0 1.6.9 2.5 2.6 2.5s2.6-.9 2.6-2.5V7H17v7.2c0 3-2.1 4.8-5 4.8s-5-1.8-5-4.8V7Z"
      />
    </svg>
  );
}

export function CiscoLogo({ size = 20 }: { size?: number }) {
  const bars = [7, 11, 14, 16, 14, 11, 7];
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" aria-label="Cisco">
      <g fill="#22d3ee">
        {bars.map((h, i) => (
          <rect key={i} x={1 + i * 3.3} y={18 - h} width="2" height={h} rx="1" />
        ))}
      </g>
    </svg>
  );
}

export function HackerRankLogo({ size = 20 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" aria-label="HackerRank">
      <path d="M12 1 22 6.5V17.5L12 23 2 17.5V6.5L12 1Z" fill="#00EA64" />
      <path fill="#0a0a0a" d="M8.5 7.5h2v3.2h3v-3.2h2v9h-2v-3.8h-3v3.8h-2v-9Z" />
    </svg>
  );
}

export function InfosysLogo({ size = 20 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" aria-label="Infosys Springboard">
      <rect width="24" height="24" rx="4" fill="#FF7700" />
      <circle cx="12" cy="6.5" r="2" fill="#fff" />
      <rect x="9.5" y="10" width="5" height="9" rx="1.5" fill="#fff" />
      <path d="M8 21 Q12 18.5 16 21" stroke="#FF7700" strokeWidth="1.5" strokeLinecap="round" fill="none" />
    </svg>
  );
}
