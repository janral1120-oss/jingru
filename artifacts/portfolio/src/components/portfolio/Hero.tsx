import { motion } from 'framer-motion';
import { Mail, MessageCircle, Link as LinkIcon, Smartphone } from 'lucide-react';
import { Tooltip, TooltipContent, TooltipTrigger, TooltipProvider } from '@/components/ui/tooltip';
import { useToast } from '@/hooks/use-toast';
import { heroSubTagline, heroPortrait } from '@/lib/portfolioData';
import { ParticleSphere } from '@/components/portfolio/ParticleSphere';

export function Hero() {
  const { toast } = useToast();

  const handleCopy = (text: string, label: string) => {
    navigator.clipboard.writeText(text);
    toast({
      title: "Copied to clipboard",
      description: `${label}: ${text}`,
      duration: 2000,
    });
  };

  const contacts = [
    { icon: <LinkIcon className="w-5 h-5" />, label: "飞书", value: "王静茹的飞书" },
    { icon: <Smartphone className="w-5 h-5" />, label: "小红书", value: "@Lululune" },
    { icon: <MessageCircle className="w-5 h-5" />, label: "微信", value: "jrlune" },
    { icon: <Mail className="w-5 h-5" />, label: "邮箱", value: "13898171261@163.com" }
  ];

  return (
    <section id="hero" className="relative min-h-[90vh] flex flex-col justify-center pt-20 pb-12 overflow-hidden">
      {/* 3D particle sphere — sits in background, tracks mouse */}
      <ParticleSphere className="z-0" />
      {/* Soft radial gradient so sphere blends into the dark bg */}
      <div className="absolute inset-0 pointer-events-none z-[1] bg-[radial-gradient(ellipse_60%_80%_at_28%_50%,transparent_35%,rgba(12,10,7,0.55)_80%)]" />
      <div className="container mx-auto px-6 z-10">
        <div className="flex flex-col md:flex-row items-center gap-12 lg:gap-24">
          
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="relative flex-shrink-0 w-64 h-64 md:w-80 md:h-80"
          >
            {/* Deep amber glow */}
            <div className="absolute inset-[-12%] rounded-full bg-primary/15 blur-3xl" />

            {/* Slow-spin outer dashed orbit */}
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 32, repeat: Infinity, ease: 'linear' }}
              className="absolute inset-[-8px] rounded-full pointer-events-none"
              style={{
                border: '1px dashed rgba(230,161,87,0.30)',
                boxSizing: 'border-box',
              }}
            />

            {/* Static thin solid ring */}
            <div
              className="absolute inset-[-4px] rounded-full pointer-events-none"
              style={{ border: '1px solid rgba(230,161,87,0.18)', boxSizing: 'border-box' }}
            />

            {/* Diamond accent marks at compass positions */}
            {[0, 90, 180, 270].map((deg) => (
              <div
                key={deg}
                className="absolute w-2 h-2 pointer-events-none"
                style={{
                  top: '50%',
                  left: '50%',
                  transform: `rotate(${deg}deg) translateY(-142%) translateX(-50%) rotate(45deg)`,
                  background: 'rgba(230,161,87,0.75)',
                  boxSizing: 'border-box',
                }}
              />
            ))}

            {/* Portrait — octagonal clip via clip-path for editorial crop */}
            <div className="absolute inset-0 overflow-hidden rounded-full shadow-2xl">
              <img 
                src={heroPortrait} 
                alt="王静茹 (Jingru Wang)" 
                className="w-full h-full object-cover"
                style={{ objectPosition: 'center 18%' }}
              />
              {/* subtle warm inner vignette */}
              <div className="absolute inset-0 rounded-full ring-1 ring-inset ring-primary/15 shadow-[inset_0_0_32px_rgba(12,10,7,0.45)]" />
            </div>

            {/* Amber arc segments: two short arcs at top-left / bottom-right */}
            <svg
              className="absolute inset-[-12px] pointer-events-none"
              viewBox="0 0 320 320"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <circle cx="160" cy="160" r="152"
                stroke="#e6a157" strokeWidth="1.5" strokeOpacity="0.45"
                strokeDasharray="48 208"
                strokeDashoffset="0"
                strokeLinecap="round"
              />
              <circle cx="160" cy="160" r="152"
                stroke="#e6a157" strokeWidth="1.5" strokeOpacity="0.25"
                strokeDasharray="48 208"
                strokeDashoffset="128"
                strokeLinecap="round"
              />
            </svg>
          </motion.div>

          <div className="flex flex-col flex-1 gap-3 text-center md:text-left">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <h2 className="text-base md:text-lg font-serif text-muted-foreground mb-1 tracking-wide">王静茹 (Jingru Wang)</h2>
              <h1
                className="font-serif font-bold tracking-tight text-foreground"
                style={{ fontSize: 'clamp(2rem, 5.2vw, 3.6rem)', lineHeight: 1.12 }}
              >
                品效合一的整合营销<br />
                <span className="text-primary interactive-glow transition-all duration-300">与增长操盘手</span>
              </h1>
            </motion.div>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.35 }}
              className="text-sm md:text-base text-muted-foreground font-mono tracking-wide"
            >
              3年+整合营销与直播销售&nbsp;<span className="text-primary/50">|</span>&nbsp;
              单场ROI 1:10&nbsp;<span className="text-primary/50">|</span>&nbsp;
              累计GMV百万+&nbsp;<span className="text-primary/50">|</span>&nbsp;
              从0到1孵化IP
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.48 }}
              className="flex items-center justify-center md:justify-start gap-3"
            >
              <span className="hidden md:inline-block w-8 h-px bg-primary/60" />
              <p className="text-[12px] md:text-[13px] font-mono tracking-[0.18em] text-primary/85">
                {heroSubTagline}
              </p>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
              className="flex items-center justify-center md:justify-start gap-4 pt-4"
            >
              <TooltipProvider>
                {contacts.map((contact, idx) => (
                  <Tooltip key={idx} delayDuration={100}>
                    <TooltipTrigger asChild>
                      <button 
                        onClick={() => handleCopy(contact.value, contact.label)}
                        className="p-3 rounded-full bg-card border border-border hover:border-primary/50 hover:bg-primary/10 transition-all duration-300 interactive-glow group"
                        aria-label={contact.label}
                      >
                        <span className="text-foreground group-hover:text-primary transition-colors">
                          {contact.icon}
                        </span>
                      </button>
                    </TooltipTrigger>
                    <TooltipContent className="bg-popover border-border text-foreground font-sans">
                      <p className="text-sm font-medium">{contact.label}</p>
                      <p className="text-xs text-muted-foreground">{contact.value}</p>
                      <p className="text-[10px] text-primary/70 mt-1">Click to copy</p>
                    </TooltipContent>
                  </Tooltip>
                ))}
              </TooltipProvider>
            </motion.div>
          </div>

        </div>
      </div>
      
      {/* Subtle bottom fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent z-0" />
    </section>
  );
}