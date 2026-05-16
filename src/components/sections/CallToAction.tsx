import { motion } from "motion/react";
import { ArrowRight } from "lucide-react";

export function CallToAction() {
  return (
    <section className="py-24 bg-white relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div 
           initial={{ opacity: 0, scale: 0.95 }}
           whileInView={{ opacity: 1, scale: 1 }}
           viewport={{ once: true }}
           transition={{ duration: 0.7 }}
           className="bg-brand-dark rounded-[40px] p-10 md:p-20 text-center relative overflow-hidden shadow-2xl"
        >
          {/* Background Elements removed */}
          
          <div className="relative z-10">
            <h2 className="text-4xl md:text-6xl font-bold text-white mb-6 font-display leading-tight">
              Start Automating Your <br className="hidden md:block"/> Business Today
            </h2>
            <p className="text-xl text-slate-300 max-w-2xl mx-auto mb-10">
              Join 10,000+ business owners who are saving 15 hours a week with VyaparIQ.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <button className="w-full sm:w-auto px-8 py-4 bg-brand-teal hover:bg-blue-600 text-white rounded-full font-medium text-lg transition-all active:scale-95 flex items-center justify-center gap-2 shadow-[0_0_40px_-10px_rgba(37,99,235,0.5)]">
                Start Free Trial <ArrowRight className="w-5 h-5" />
              </button>
              <button className="w-full sm:w-auto px-8 py-4 bg-white/10 hover:bg-white/15 text-white border border-white/20 rounded-full font-medium text-lg transition-all active:scale-95 backdrop-blur-sm">
                Contact Sales
              </button>
            </div>
            <p className="mt-8 text-sm text-slate-400">14-day free trial • No credit card needed • Cancel anytime</p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

// synced
