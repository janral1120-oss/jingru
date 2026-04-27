export function BackgroundNoise() {
  return (
    <div className="pointer-events-none fixed inset-0 z-40 opacity-[0.03] mix-blend-overlay">
      <svg className="h-full w-full">
        <filter id="noise">
          <feTurbulence
            type="fractalNoise"
            baseFrequency="0.7"
            numOctaves="3"
            stitchTiles="stitch"
          />
          <feColorMatrix type="matrix" values="1 0 0 0 0, 0 1 0 0 0, 0 0 1 0 0, 0 0 0 1 0" />
        </filter>
        <rect width="100%" height="100%" filter="url(#noise)" />
      </svg>
    </div>
  );
}