import { motion } from "motion/react";

export function SocialProof() {
  return (
    <section className="py-20 bg-white dark:bg-slate-900 transition-colors duration-500 border-b border-slate-200 dark:border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {[
            { label: "Hours Saved", value: "2M+" },
            { label: "Invoices Generated", value: "15M+" },
            { label: "Businesses Automated", value: "10k+" },
            { label: "Uptime", value: "99.9%" },
          ].map((stat, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.5 }}
              className="text-center"
            >
              <div className="text-4xl md:text-5xl font-bold text-slate-900 dark:text-white mb-2 font-sans tracking-tight">
                {stat.value}
              </div>
              <div className="text-sm font-medium text-slate-500 dark:text-slate-400 uppercase tracking-wider font-sans">
                {stat.label}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

// synced
