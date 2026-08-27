import { cn } from '@/lib/cn';

/**
 * The GetGeoAgent mark.
 *
 * An open orbital ring — the aperture and bar read as a "G" — with a luminous
 * core at the centre and a travelling node on the orbit. Search path, AI orbit
 * and a directional data node in one shape that survives down to 16px.
 */
export function LogoMark({ className = 'size-8', animated = false, id = 'gga' }) {
  return (
    <svg
      viewBox="0 0 32 32"
      fill="none"
      aria-hidden="true"
      className={cn('shrink-0 overflow-visible', className)}
    >
      <defs>
        <linearGradient id={`${id}-ring`} x1="4" y1="3" x2="28" y2="29" gradientUnits="userSpaceOnUse">
          <stop stopColor="#7ee3f5" />
          <stop offset="0.55" stopColor="#3d7dfb" />
          <stop offset="1" stopColor="#7c5cff" />
        </linearGradient>
        <radialGradient id={`${id}-core`} cx="0.5" cy="0.5" r="0.5">
          <stop stopColor="#ffffff" />
          <stop offset="0.45" stopColor="#9fd8ff" />
          <stop offset="1" stopColor="#3d7dfb" />
        </radialGradient>
      </defs>

      {/* Open orbital ring: the G aperture */}
      <path
        d="M25.4 9.2A11 11 0 1 0 27 16v-0.2h-8.6"
        stroke={`url(#${id}-ring)`}
        strokeWidth="2.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />

      {/* Inclined intelligence ring */}
      <ellipse
        cx="16"
        cy="16"
        rx="12.6"
        ry="5"
        transform="rotate(-32 16 16)"
        stroke={`url(#${id}-ring)`}
        strokeWidth="1.1"
        opacity="0.42"
        className={animated ? 'origin-center [animation:ggaSpinSlow_22s_linear_infinite]' : undefined}
      />

      {/* Luminous core */}
      <circle cx="16" cy="16" r="3.6" fill={`url(#${id}-core)`} />

      {/* Travelling data node */}
      <circle cx="25.4" cy="9.2" r="2.1" fill="#7ee3f5" />
    </svg>
  );
}

export default function Logo({ className, markClassName = 'size-8', showWordmark = true }) {
  return (
    <span className={cn('inline-flex items-center gap-2.5', className)}>
      <LogoMark className={markClassName} />
      {showWordmark ? (
        <span className="font-display text-[1.0625rem] font-semibold tracking-[-0.035em] text-ink">
          GetGeo<span className="text-[var(--scene-glow)]">Agent</span>
        </span>
      ) : null}
    </span>
  );
}
