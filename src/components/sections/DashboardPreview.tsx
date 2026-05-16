import { motion } from "motion/react";

export function DashboardPreview() {
  return (
    <section className="py-24 bg-brand-dark relative overflow-hidden">
      {/* Background Effect removed for formality */}
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
        <h2 className="text-3xl md:text-5xl font-bold text-white mb-6 font-display">
          Everything in one beautiful place
        </h2>
        <p className="text-lg text-slate-300 max-w-2xl mx-auto mb-16">
          Say goodbye to switching between messy spreadsheets, billing software, and WhatsApp. Manage it all from a single, intuitive dashboard.
        </p>

        <motion.div
           initial={{ opacity: 0, y: 40 }}
           whileInView={{ opacity: 1, y: 0 }}
           viewport={{ once: true }}
           transition={{ duration: 0.8 }}
           className="rounded-xl p-2 md:p-4 bg-white/5 border border-white/10 backdrop-blur-sm"
        >
          <img 
            src="https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=2015&auto=format&fit=crop" 
            alt="VyaparIQ Dashboard" 
            className="rounded-lg shadow-2xl border border-white/10 object-cover w-full h-[300px] md:h-[600px] opacity-90 object-left-top"
          />
        </motion.div>
      </div>
    </section>
  );
}

// synced
