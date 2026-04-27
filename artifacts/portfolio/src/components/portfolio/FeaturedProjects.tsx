import { useState, MouseEvent } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { featuredProjects, ProjectCase } from '@/lib/portfolioData';
import { X, ArrowUpRight } from 'lucide-react';

function ProjectCard({
  project,
  index,
  onOpen,
}: {
  project: ProjectCase;
  index: number;
  onOpen: () => void;
}) {
  const [tilt, setTilt] = useState({ x: 0, y: 0 });

  const onMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    setTilt({ x: -y * 4, y: x * 4 });
  };

  const reset = () => setTilt({ x: 0, y: 0 });

  return (
    <motion.article
      initial={{ opacity: 0, y: 36 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.7, delay: index * 0.08, ease: [0.22, 1, 0.36, 1] }}
      onMouseMove={onMouseMove}
      onMouseLeave={reset}
      onClick={onOpen}
      className="group relative cursor-pointer rounded-2xl overflow-hidden border border-border/70 bg-card transition-all duration-500 hover:border-primary/60 hover:shadow-[0_25px_80px_-20px_rgba(230,161,87,0.35)] flex flex-col"
      style={{
        transform: `perspective(1200px) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg)`,
        transition: 'transform 250ms ease-out, border-color 400ms, box-shadow 600ms',
      }}
    >
      {/* image area */}
      <div className="relative overflow-hidden aspect-[5/3]">
        <div
          className="absolute inset-0 bg-cover bg-center transition-transform duration-[1.6s] ease-out group-hover:scale-[1.08]"
          style={{ backgroundImage: `url(${project.image})` }}
        />
        {/* layered overlays */}
        <div className="absolute inset-0 bg-gradient-to-t from-card via-card/40 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-secondary/10 mix-blend-overlay opacity-60 group-hover:opacity-90 transition-opacity duration-700" />
        {/* grain */}
        <div
          className="absolute inset-0 opacity-[0.18] mix-blend-overlay pointer-events-none"
          style={{
            backgroundImage:
              'url("data:image/svg+xml;utf8,<svg xmlns=\\"http://www.w3.org/2000/svg\\" width=\\"160\\" height=\\"160\\"><filter id=\\"n\\"><feTurbulence type=\\"fractalNoise\\" baseFrequency=\\"0.85\\" numOctaves=\\"2\\"/></filter><rect width=\\"100%\\" height=\\"100%\\" filter=\\"url(%23n)\\" opacity=\\"0.7\\"/></svg>")',
          }}
        />

        {/* index plate */}
        <div className="absolute top-5 left-5 z-10 inline-flex items-center gap-3 px-3 py-1.5 rounded-full bg-background/70 backdrop-blur-md border border-border/60">
          <span className="font-mono text-[10px] tracking-[0.22em] text-primary">
            № {String(index + 1).padStart(2, '0')}
          </span>
          <span className="w-1 h-1 rounded-full bg-primary/60" />
          <span className="font-mono text-[10px] tracking-[0.18em] text-muted-foreground uppercase">
            Case Study
          </span>
        </div>

        {/* arrow */}
        <div className="absolute top-5 right-5 z-10 w-10 h-10 rounded-full bg-background/60 backdrop-blur-md border border-border/60 flex items-center justify-center transition-all duration-500 group-hover:bg-primary/90 group-hover:border-primary group-hover:rotate-45">
          <ArrowUpRight className="w-4 h-4 text-foreground/80 group-hover:text-background transition-colors" />
        </div>

        {/* tag chips bottom on image */}
        <div className="absolute bottom-5 left-5 right-5 z-10 flex flex-wrap gap-1.5">
          {project.tags.map((tag) => (
            <span
              key={tag}
              className="text-[10px] font-mono uppercase tracking-wider px-2.5 py-1 rounded-full bg-background/65 backdrop-blur-sm border border-border/50 text-foreground/85"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>

      {/* content area */}
      <div className="relative p-6 md:p-8 flex flex-col flex-1">
        <h3 className="font-serif text-xl md:text-[26px] leading-tight text-foreground group-hover:text-primary transition-colors duration-500 tracking-tight">
          {project.title}
        </h3>

        <div className="mt-5 pt-5 border-t border-dashed border-border/60">
          <p className="text-[10px] tracking-[0.22em] text-muted-foreground/70 uppercase font-mono mb-2">
            Key Outcome
          </p>
          <p className="text-foreground/95 font-medium text-[15px] leading-relaxed">
            {project.keyData}
          </p>
        </div>

        <div className="mt-auto pt-6 flex items-center gap-3 text-[11px] tracking-[0.18em] uppercase text-muted-foreground group-hover:text-primary transition-colors">
          <span>Read Full Case</span>
          <span className="flex-1 h-px bg-border group-hover:bg-primary/60 transition-colors" />
        </div>
      </div>
    </motion.article>
  );
}

export function FeaturedProjects() {
  const [selectedProject, setSelectedProject] = useState<ProjectCase | null>(null);

  return (
    <section className="py-24" id="projects">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          className="mb-14 flex items-end justify-between flex-wrap gap-6"
        >
          <div>
            <h2 className="text-3xl md:text-4xl font-serif font-bold text-foreground tracking-tight">
              重点项目深挖 <span className="text-primary">Featured Projects</span>
            </h2>
            <p className="mt-4 text-muted-foreground max-w-md">
              点击任一卡片，展开 STAR 结构的全案复盘。
            </p>
          </div>
          <div className="hidden md:block font-mono text-[11px] tracking-[0.22em] uppercase text-muted-foreground/70">
            Six Cases · 2023 — 2026
          </div>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
          {featuredProjects.map((project, index) => (
            <ProjectCard
              key={project.id}
              project={project}
              index={index}
              onOpen={() => setSelectedProject(project)}
            />
          ))}
        </div>
      </div>

      <AnimatePresence>
        {selectedProject && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedProject(null)}
              className="fixed inset-0 bg-background/85 backdrop-blur-md z-50"
            />
            <motion.div
              initial={{ x: '100%', opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: '100%', opacity: 0 }}
              transition={{ type: 'spring', damping: 28, stiffness: 220 }}
              className="fixed top-0 right-0 bottom-0 w-full max-w-2xl bg-card border-l border-border z-50 overflow-y-auto shadow-2xl"
            >
              {/* header image */}
              <div className="relative h-56 md:h-72 overflow-hidden">
                <div
                  className="absolute inset-0 bg-cover bg-center"
                  style={{ backgroundImage: `url(${selectedProject.image})` }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-card via-card/40 to-transparent" />
                <button
                  onClick={() => setSelectedProject(null)}
                  className="absolute top-6 right-6 w-10 h-10 rounded-full bg-background/70 backdrop-blur-md border border-border/60 flex items-center justify-center hover:bg-primary/20 hover:border-primary transition-colors"
                >
                  <X className="w-5 h-5 text-foreground" />
                </button>
              </div>

              <div className="p-8 md:p-12 -mt-10 relative">
                <div className="flex flex-wrap gap-2 mb-5">
                  {selectedProject.tags.map((tag) => (
                    <span
                      key={tag}
                      className="text-[10px] font-mono uppercase tracking-wider px-2.5 py-1 rounded-full bg-secondary/15 text-secondary border border-secondary/20"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                <h2 className="font-serif text-2xl md:text-3xl font-bold text-foreground mb-4 leading-tight tracking-tight">
                  {selectedProject.title}
                </h2>

                <div className="pb-6 border-b border-border/50 space-y-4">
                  <div>
                    <p className="text-[10px] tracking-[0.22em] text-muted-foreground/70 font-mono uppercase mb-1.5">
                      Project Brief · 项目介绍
                    </p>
                    <p className="text-foreground/90 text-sm md:text-base leading-relaxed">
                      {selectedProject.intro}
                    </p>
                  </div>
                  <div>
                    <p className="text-[10px] tracking-[0.22em] text-muted-foreground/70 font-mono uppercase mb-1.5">
                      My Role · 核心定位
                    </p>
                    <p className="text-secondary font-medium text-sm md:text-base leading-relaxed">
                      {selectedProject.role}
                    </p>
                  </div>
                </div>

                <div className="mt-6 mb-8 p-5 rounded-xl bg-primary/5 border border-primary/20">
                  <p className="text-[10px] tracking-[0.22em] text-primary/80 font-mono uppercase mb-2">
                    Key Outcome
                  </p>
                  <p className="text-foreground font-semibold tracking-wide">
                    {selectedProject.keyData}
                  </p>
                </div>

                <div className="space-y-8 text-muted-foreground">
                  {(['s', 't', 'a', 'r'] as const).map((k) => {
                    const labels = {
                      s: { letter: 'S', en: 'Situation', cn: '场景' },
                      t: { letter: 'T', en: 'Task', cn: '任务' },
                      a: { letter: 'A', en: 'Action', cn: '行动' },
                      r: { letter: 'R', en: 'Result', cn: '结果' },
                    } as const;
                    const meta = labels[k];
                    return (
                      <div key={k}>
                        <h4 className="text-primary font-bold mb-3 flex items-center gap-3">
                          <span className="w-8 h-8 rounded-md bg-primary/10 border border-primary/30 flex items-center justify-center text-sm font-mono">
                            {meta.letter}
                          </span>
                          <span className="font-serif text-lg">{meta.en}</span>
                          <span className="text-muted-foreground text-sm font-normal">{meta.cn}</span>
                        </h4>
                        <p
                          className={`leading-relaxed whitespace-pre-line pl-11 ${
                            k === 'r' ? 'text-foreground/95 font-medium' : ''
                          }`}
                        >
                          {selectedProject.star[k]}
                        </p>
                      </div>
                    );
                  })}
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </section>
  );
}
