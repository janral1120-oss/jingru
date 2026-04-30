import img1 from '@assets/IMG_8420_1777533145822.jpg';
import img2 from '@assets/IMG_8421_1777533145822.jpg';
import img3 from '@assets/IMG_8423_1777533155582.jpg';
import img4 from '@assets/IMG_8424_1777533155582.PNG';
import img5 from '@assets/IMG_8425_1777533155582.PNG';
import img6 from '@assets/IMG_8426_1777533155582.PNG';
import img7 from '@assets/IMG_8427_1777533155583.PNG';
import img8 from '@assets/IMG_8429_1777533155583.PNG';
import img9 from '@assets/IMG_8430_1777533155583.PNG';
import img10 from '@assets/IMG_8434_1777533155583.PNG';
import img11 from '@assets/IMG_8435_1777533155584.PNG';
import img12 from '@assets/96e82ea56f2e8589915c732ebd47dc37_1777533170675.png';
import { motion } from 'framer-motion';

const SCREENSHOTS = [img1, img2, img3, img4, img5, img6, img7, img8, img9, img10, img11, img12];

export function MarqueeProof() {
  const doubled = [...SCREENSHOTS, ...SCREENSHOTS];

  return (
    <div className="relative pb-16">
      {/* Section label — tight top spacing since Manifesto is above */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-60px' }}
        transition={{ duration: 0.7 }}
        className="text-center mb-8 px-6"
      >
        <p className="text-[9px] tracking-[0.38em] text-primary/70 font-mono uppercase mb-2">
          MARKET VALIDATION
        </p>
        <h3 className="font-serif text-xl md:text-2xl text-foreground">
          市场回声与真实流量图谱
        </h3>
        <p className="mt-2 text-[12px] text-muted-foreground/60 font-mono tracking-wide">
          真实内容数据 · 自然流量验证
        </p>
      </motion.div>

      {/* Marquee container */}
      <div
        className="overflow-hidden relative"
        style={{ WebkitMaskImage: 'linear-gradient(to right, transparent, black 6%, black 94%, transparent)' }}
      >
        {/* Scrolling strip — pause on hover */}
        <div className="marquee-strip flex gap-3 w-max py-2">
          {doubled.map((src, i) => (
            <div
              key={i}
              className="flex-shrink-0 transition-all duration-300 hover:scale-[1.03] hover:-translate-y-1"
              style={{
                width: '165px',
                height: '264px',
                borderRadius: '14px',
                border: '1.5px solid rgba(230,161,87,0.28)',
                background: 'rgba(26,20,16,0.7)',
                boxShadow: '0 4px 20px rgba(12,10,7,0.5), inset 0 1px 0 rgba(230,161,87,0.12)',
                overflow: 'hidden',
              }}
            >
              {/* Clip top ~8% to remove phone status bar */}
              <div style={{ clipPath: 'inset(8% 0 0 0 round 14px)', height: '100%' }}>
                <img
                  src={src}
                  alt={`social proof ${(i % SCREENSHOTS.length) + 1}`}
                  className="w-full h-full"
                  style={{ objectFit: 'cover', objectPosition: 'top center' }}
                  loading="lazy"
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Amber accent */}
      <div className="mt-10 mx-auto w-24 h-px rounded-full bg-gradient-to-r from-transparent via-primary/40 to-transparent" />

      <style>{`
        .marquee-strip {
          animation: marquee-scroll 55s linear infinite;
          will-change: transform;
        }
        .marquee-strip:hover {
          animation-play-state: paused;
        }
        @keyframes marquee-scroll {
          0%   { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
      `}</style>
    </div>
  );
}
