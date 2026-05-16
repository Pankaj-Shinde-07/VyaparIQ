import { motion } from "motion/react";
import { ArrowRight, Play, CheckCircle2, Zap } from "lucide-react";
import { cn } from "../../lib/utils.js";

export function Hero() {
  return (
    <section className="relative pt-32 pb-20 lg:pt-48 lg:pb-32 overflow-hidden bg-slate-50 dark:bg-slate-900 transition-colors duration-500">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
        <motion.div
           initial={{ opacity: 0, y: 20 }}
           animate={{ opacity: 1, y: 0 }}
           transition={{ duration: 0.5 }}
           className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/50 dark:bg-white/10 border border-slate-200 dark:border-white/20 text-slate-800 dark:text-white/90 text-sm font-medium mb-8 backdrop-blur-sm transition-colors duration-500"
        >
          <span className="flex h-2 w-2 rounded-full bg-brand-teal"></span>
          VyaparIQ AI v2.0 is now live
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="text-5xl md:text-7xl font-bold tracking-tight text-slate-900 dark:text-white mb-6 leading-tight max-w-4xl mx-auto transition-colors duration-500 font-display"
        >
          Run Your Business <br className="hidden md:block" />
          <span className="text-brand-teal">
            Smarter with AI
          </span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="text-lg md:text-xl text-slate-600 dark:text-slate-300 mb-10 max-w-2xl mx-auto leading-relaxed transition-colors duration-500"
        >
          VyaparIQ automates invoicing, reminders, customer communication, analytics, and business workflows for modern SMEs.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12"
        >
          <button className="w-full sm:w-auto px-8 py-4 bg-brand-teal hover:bg-amber-600 text-white rounded-full font-medium text-lg transition-all active:scale-95 flex items-center justify-center gap-2 shadow-[0_0_40px_-10px_rgba(245,158,11,0.5)]">
            Start Free For 14 Days <ArrowRight className="w-5 h-5" />
          </button>
          <button className="w-full sm:w-auto px-8 py-4 bg-white/80 dark:bg-white/10 hover:bg-slate-100 dark:hover:bg-white/15 text-slate-800 dark:text-white border border-slate-200 dark:border-white/20 rounded-full font-medium text-lg transition-all active:scale-95 backdrop-blur-sm flex items-center justify-center gap-2 transition-colors duration-500">
            <Play className="w-5 h-5 fill-current" /> Book Demo
          </button>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.6 }}
          className="flex items-center justify-center gap-6 text-sm text-slate-500 dark:text-slate-400 mb-16 transition-colors duration-500"
        >
          <span className="flex items-center gap-1.5"><CheckCircle2 className="w-4 h-4 text-brand-navy" /> No credit card required</span>
          <span className="flex items-center gap-1.5"><CheckCircle2 className="w-4 h-4 text-brand-navy" /> 2-minute setup</span>
        </motion.div>
      </div>
    </section>
  );
}

// synced
