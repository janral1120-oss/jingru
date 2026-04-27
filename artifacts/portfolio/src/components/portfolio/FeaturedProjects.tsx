import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { featuredProjects, ProjectCase } from '@/lib/portfolioData';
import { X, ArrowRight } from 'lucide-react';

export function FeaturedProjects() {
  const [selectedProject, setSelectedProject] = useState<ProjectCase | null>(null);

  return (
    <section className="py-24" id="projects">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          className="mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-serif font-bold text-foreground">
            重点项目深挖 <span className="text-primary">Featured Projects</span>
          </h2>
          <p className="mt-4 text-muted-foreground">Click cards to explore the STAR breakdown.</p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {featuredProjects.map((project, index) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              onClick={() => setSelectedProject(project)}
              className="group cursor-pointer bg-card border border-border rounded-xl overflow-hidden hover:border-primary/50 transition-all duration-500 interactive-glow flex flex-col h-full relative"
            >
              <div className="p-6 flex-1 flex flex-col">
                <div className="flex flex-wrap gap-2 mb-4">
                  {project.tags.map(tag => (
                    <span key={tag} className="text-[10px] px-2 py-1 rounded bg-secondary/10 text-secondary font-mono tracking-wide uppercase">
                      {tag}
                    </span>
                  ))}
                </div>
                
                <h3 className="text-xl font-bold text-foreground mb-4 group-hover:text-primary transition-colors leading-snug">
                  {project.title}
                </h3>
                
                <div className="mt-auto pt-6 border-t border-border">
                  <p className="text-sm font-medium text-primary mb-2">Key Data:</p>
                  <p className="text-foreground/80 text-sm font-bold tracking-wide">{project.keyData}</p>
                </div>
              </div>
              
              <div className="absolute top-6 right-6 opacity-0 group-hover:opacity-100 transition-opacity transform translate-x-2 group-hover:translate-x-0">
                <ArrowRight className="w-5 h-5 text-primary" />
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Modal / Side Panel for Details */}
      <AnimatePresence>
        {selectedProject && (
          <>
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedProject(null)}
              className="fixed inset-0 bg-background/80 backdrop-blur-sm z-50"
            />
            <motion.div 
              initial={{ x: '100%', opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: '100%', opacity: 0 }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="fixed top-0 right-0 bottom-0 w-full max-w-2xl bg-card border-l border-border z-50 overflow-y-auto shadow-2xl"
            >
              <div className="p-8 md:p-12">
                <button 
                  onClick={() => setSelectedProject(null)}
                  className="absolute top-8 right-8 p-2 rounded-full hover:bg-muted transition-colors"
                >
                  <X className="w-6 h-6 text-muted-foreground hover:text-foreground" />
                </button>

                <div className="mb-8 pr-12">
                  <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-4 leading-tight">{selectedProject.title}</h2>
                  <p className="text-secondary font-medium pb-6 border-b border-border/50">{selectedProject.role}</p>
                </div>

                <div className="space-y-8 text-muted-foreground">
                  <div>
                    <h4 className="text-primary font-bold mb-2 flex items-center gap-2">
                      <span className="w-6 h-6 rounded bg-primary/10 flex items-center justify-center text-sm font-mono">S</span>
                      Situation 场景
                    </h4>
                    <p className="leading-relaxed">{selectedProject.star.s}</p>
                  </div>
                  <div>
                    <h4 className="text-primary font-bold mb-2 flex items-center gap-2">
                      <span className="w-6 h-6 rounded bg-primary/10 flex items-center justify-center text-sm font-mono">T</span>
                      Task 任务
                    </h4>
                    <p className="leading-relaxed">{selectedProject.star.t}</p>
                  </div>
                  <div>
                    <h4 className="text-primary font-bold mb-2 flex items-center gap-2">
                      <span className="w-6 h-6 rounded bg-primary/10 flex items-center justify-center text-sm font-mono">A</span>
                      Action 行动
                    </h4>
                    <p className="leading-relaxed whitespace-pre-line">{selectedProject.star.a}</p>
                  </div>
                  <div>
                    <h4 className="text-primary font-bold mb-2 flex items-center gap-2">
                      <span className="w-6 h-6 rounded bg-primary/10 flex items-center justify-center text-sm font-mono">R</span>
                      Result 结果
                    </h4>
                    <p className="leading-relaxed text-foreground/90 font-medium">{selectedProject.star.r}</p>
                  </div>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </section>
  );
}