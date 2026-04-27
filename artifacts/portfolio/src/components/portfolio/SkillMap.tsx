import { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { skillClusters } from '@/lib/portfolioData';

export function SkillMap() {
  const [activeCluster, setActiveCluster] = useState<string | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  return (
    <section className="py-24 bg-card/30 relative overflow-hidden" id="skills">
      <div className="container mx-auto px-6">
        <motion.h2 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          className="text-3xl md:text-4xl font-serif font-bold text-foreground text-center mb-16"
        >
          能力图谱 <span className="text-primary">Skill Map</span>
        </motion.h2>

        <div 
          ref={containerRef}
          className="relative w-full max-w-5xl mx-auto h-[600px] md:h-[700px] flex items-center justify-center"
        >
          
          {/* Center Node */}
          <motion.div 
            className="absolute z-20 w-28 h-28 md:w-32 md:h-32 rounded-full bg-background border border-primary flex items-center justify-center shadow-[0_0_30px_rgba(230,161,87,0.2)] cursor-grab active:cursor-grabbing"
            drag
            dragConstraints={containerRef}
            dragElastic={0.1}
            whileHover={{ scale: 1.05 }}
            animate={{ 
              boxShadow: ['0 0 20px rgba(230,161,87,0.2)', '0 0 40px rgba(230,161,87,0.4)', '0 0 20px rgba(230,161,87,0.2)']
            }}
            transition={{ repeat: Infinity, duration: 3, ease: "easeInOut" }}
          >
            <span className="font-serif font-bold text-foreground text-xl">王静茹</span>
          </motion.div>

          {/* Radial Layout */}
          {skillClusters.map((cluster, index) => {
            const isMobile = typeof window !== 'undefined' && window.innerWidth < 768;
            const radius = isMobile ? 140 : 250; // Distance from center
            
            // Adjust angles for better distribution depending on screen size
            const angleOffset = isMobile ? -Math.PI / 2 : -Math.PI / 2; // start from top
            const angle = angleOffset + (index * (360 / skillClusters.length)) * (Math.PI / 180);
            
            const x = Math.cos(angle) * radius;
            const y = Math.sin(angle) * radius;
            
            const isActive = activeCluster === cluster.id;

            return (
              <motion.div
                key={cluster.id}
                className="absolute z-10"
                initial={{ opacity: 0, scale: 0 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.15 }}
                style={{ x, y }}
              >
                {/* Connecting Line (visual only, attached to initial pos) */}
                <svg className="absolute top-1/2 left-1/2 w-[600px] h-[600px] -translate-x-1/2 -translate-y-1/2 pointer-events-none z-0" style={{ transform: `translate(-50%, -50%) rotate(${angle}rad)` }}>
                  <line x1="300" y1="300" x2="300" y2={300 - radius + 30} stroke="hsl(var(--border))" strokeWidth="1.5" strokeDasharray="4 4" />
                </svg>

                <motion.div 
                  className="relative group cursor-grab active:cursor-grabbing"
                  onMouseEnter={() => setActiveCluster(cluster.id)}
                  onMouseLeave={() => setActiveCluster(null)}
                  onClick={() => setActiveCluster(isActive ? null : cluster.id)}
                  drag
                  dragConstraints={{ top: -50, bottom: 50, left: -50, right: 50 }}
                  dragElastic={0.2}
                >
                  <motion.div 
                    className={`px-5 py-3 rounded-full border backdrop-blur-md whitespace-nowrap transition-all duration-300 shadow-lg ${
                      isActive ? 'bg-primary/20 border-primary text-primary shadow-primary/20' : 'bg-card border-border text-foreground hover:border-primary/50 shadow-black/10'
                    }`}
                    whileHover={{ scale: 1.05 }}
                  >
                    <span className="font-semibold text-sm md:text-base">{cluster.label}</span>
                  </motion.div>

                  {/* Children popup */}
                  <AnimatePresence>
                    {isActive && (
                      <motion.div
                        initial={{ opacity: 0, y: 10, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 10, scale: 0.95 }}
                        className="absolute top-full left-1/2 -translate-x-1/2 mt-4 w-64 md:w-72 bg-card border border-primary/30 rounded-xl p-5 shadow-2xl z-30 pointer-events-none"
                      >
                        <ul className="space-y-4">
                          {cluster.children.map(child => (
                            <li key={child.id} className="text-sm border-b border-border/50 last:border-0 pb-2 last:pb-0">
                              <span className="text-foreground font-semibold block">{child.label}</span>
                              {child.detail && <span className="text-muted-foreground text-xs block mt-1">{child.detail}</span>}
                            </li>
                          ))}
                        </ul>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}