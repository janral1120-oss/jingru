import { useScroll, useTransform, motion } from 'framer-motion';

export function BackgroundNoise() {
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 4000], [0, -120]);

  return (
    <div className="pointer-events-none fixed inset-0 z-40 opacity-[0.04] mix-blend-overlay overflow-hidden">
      <motion.div style={{ y }} className="absolute inset-0 scale-[1.08] origin-center">
        <svg className="h-full w-full">
          <filter id="global-noise">
            <feTurbulence
              type="fractalNoise"
              baseFrequency="0.68"
              numOctaves="3"
              stitchTiles="stitch"
            />
            <feColorMatrix
              type="matrix"
              values="1 0 0 0 0, 0 1 0 0 0, 0 0 1 0 0, 0 0 0 1 0"
            />
          </filter>
          <rect width="100%" height="100%" filter="url(#global-noise)" />
        </svg>
      </motion.div>
    </div>
  );
}
