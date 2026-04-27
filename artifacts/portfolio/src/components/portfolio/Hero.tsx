import { motion } from 'framer-motion';
import { Mail, MessageCircle, Link as LinkIcon, Smartphone } from 'lucide-react';
import { Tooltip, TooltipContent, TooltipTrigger, TooltipProvider } from '@/components/ui/tooltip';
import { useToast } from '@/hooks/use-toast';

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
    <section className="relative min-h-[90vh] flex flex-col justify-center pt-20 pb-12 overflow-hidden">
      <div className="container mx-auto px-6 z-10">
        <div className="flex flex-col md:flex-row items-center gap-12 lg:gap-24">
          
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="relative flex-shrink-0"
          >
            <div className="absolute inset-0 rounded-full bg-primary/20 blur-3xl scale-110" />
            <img 
              src="/portrait.png" 
              alt="王静茹 (Jingru Wang)" 
              className="relative w-64 h-64 md:w-80 md:h-80 object-cover rounded-full border border-primary/20 shadow-2xl"
            />
          </motion.div>

          <div className="flex flex-col flex-1 space-y-6 text-center md:text-left">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <h2 className="text-xl md:text-2xl font-serif text-muted-foreground mb-2">王静茹 (Jingru Wang)</h2>
              <h1 className="text-4xl md:text-6xl lg:text-7xl font-serif font-bold tracking-tight text-foreground leading-tight">
                品牌营销 & <br />
                <span className="text-primary interactive-glow transition-all duration-300">AI智能体架构师</span>
              </h1>
            </motion.div>

            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="text-lg md:text-xl text-muted-foreground font-light max-w-2xl leading-relaxed"
            >
              3年+品牌营销与活动策划 <span className="mx-2 text-primary/50">|</span> 
              从0到1孵化IP <span className="mx-2 text-primary/50">|</span> 
              AI内容提效40% <span className="mx-2 text-primary/50">|</span> 
              跨界资源整合
            </motion.p>

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