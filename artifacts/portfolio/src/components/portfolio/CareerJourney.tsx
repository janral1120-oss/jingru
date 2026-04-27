import { useRef, useState, MouseEvent } from 'react';
import { motion } from 'framer-motion';
import { careerJourney } from '@/lib/portfolioData';
import { ChevronLeft, ChevronRight } from 'lucide-react';

export function CareerJourney() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);

  const handleMouseDown = (e: MouseEvent) => {
    setIsDragging(true);
    if (!containerRef.current) return;
    setStartX(e.pageX - containerRef.current.offsetLeft);
    setScrollLeft(containerRef.current.scrollLeft);
  };

  const handleMouseLeave = () => {
    setIsDragging(false);
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const handleMouseMove = (e: MouseEvent) => {
    if (!isDragging || !containerRef.current) return;
    e.preventDefault();
    const x = e.pageX - containerRef.current.offsetLeft;
    const walk = (x - startX) * 2; // Scroll fast
    containerRef.current.scrollLeft = scrollLeft - walk;
  };

  const scrollBy = (amount: number) => {
    if (containerRef.current) {
      containerRef.current.scrollBy({ left: amount, behavior: 'smooth' });
    }
  };

  return (
    <section className="py-24 relative overflow-hidden" id="career">
      <div className="container mx-auto px-6 mb-12 flex justify-between items-end">
        <motion.h2 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          className="text-3xl md:text-4xl font-serif font-bold text-foreground"
        >
          职业脉络 <span className="text-primary">Career Journey</span>
        </motion.h2>
        
        <div className="hidden md:flex gap-4">
          <button 
            onClick={() => scrollBy(-400)}
            className="w-10 h-10 rounded-full border border-border flex items-center justify-center hover:bg-primary/10 hover:border-primary/50 transition-colors text-muted-foreground hover:text-primary"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <button 
            onClick={() => scrollBy(400)}
            className="w-10 h-10 rounded-full border border-border flex items-center justify-center hover:bg-primary/10 hover:border-primary/50 transition-colors text-muted-foreground hover:text-primary"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      </div>

      <div className="relative w-full">
        {/* Timeline Line */}
        <div className="absolute top-1/2 left-0 right-0 h-px bg-border -translate-y-1/2 hidden md:block z-0" />
        
        <div 
          ref={containerRef}
          onMouseDown={handleMouseDown}
          onMouseLeave={handleMouseLeave}
          onMouseUp={handleMouseUp}
          onMouseMove={handleMouseMove}
          className={`flex overflow-x-auto gap-6 px-6 md:px-[calc((100vw-min(100vw,1536px))/2+1.5rem)] pb-12 pt-6 snap-x snap-mandatory timeline-scroll-area relative z-10 ${isDragging ? 'cursor-grabbing select-none' : 'cursor-grab'}`}
          style={{ scrollbarWidth: 'none' }}
        >
          {careerJourney.map((node, index) => (
            <motion.div
              key={node.id}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className={`snap-center flex-shrink-0 w-[85vw] md:w-[450px] bg-card border ${node.isAchievement ? 'border-primary/50 shadow-[0_0_15px_rgba(230,161,87,0.1)]' : 'border-border'} rounded-xl p-8 hover:border-primary/50 transition-colors duration-300 group interactive-glow relative`}
            >
              {/* Node dot on timeline */}
              <div className="hidden md:block absolute top-1/2 -left-[15px] -translate-y-1/2 w-4 h-4 rounded-full bg-background border-2 border-primary z-20 group-hover:scale-125 transition-transform" />

              <div className="flex flex-col h-full pointer-events-none">
                <div className="mb-6">
                  <span className="inline-block px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-semibold tracking-wider mb-4">
                    {node.period}
                  </span>
                  <h3 className="text-xl md:text-2xl font-bold text-foreground font-serif">{node.company}</h3>
                  <h4 className="text-md text-secondary font-medium mt-2">{node.role}</h4>
                </div>
                
                <ul className="mt-4 space-y-4 flex-1">
                  {node.highlights.map((highlight, idx) => (
                    <li key={idx} className="flex items-start text-sm md:text-base text-muted-foreground group-hover:text-foreground/90 transition-colors">
                      <span className="mr-3 mt-2 w-1.5 h-1.5 rounded-full bg-primary/50 flex-shrink-0" />
                      <span className="leading-relaxed">{highlight}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}