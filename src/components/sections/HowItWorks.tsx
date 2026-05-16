import { motion } from "motion/react";

export function HowItWorks() {
  const steps = [
    {
      num: "01",
      title: "Connect Your Business",
      desc: "Import your contacts, services, and inventory in seconds. Setup is as easy as creating a social media profile."
    },
    {
      num: "02",
      title: "Automate Operations",
      desc: "Set up auto-invoicing, payment reminders, and WhatsApp integrations. Let the system handle the grunt work."
    },
    {
      num: "03",
      title: "Grow with Insights",
      desc: "Use AI-generated reports to identify growth areas, cut unnecessary costs, and make data-driven decisions."
    }
  ];

  return (
    <section id="how-it-works" className="py-24 bg-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-5xl font-bold text-slate-900 mb-6 font-display">
            Three steps to autopilot
          </h2>
          <p className="text-lg text-slate-600">
            We've stripped away the complexity. Get your business operations running themselves in under 15 minutes.
          </p>
        </div>

        <div className="relative">
          {/* Connecting line */}
          <div className="hidden md:block absolute top-1/2 left-0 w-full h-[2px] bg-slate-200 -translate-y-1/2" />
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 relative z-10">
            {steps.map((step, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.2, duration: 0.5 }}
                className="bg-white rounded-3xl p-8 shadow-sm border border-slate-100 relative group"
              >
                <div className="w-16 h-16 bg-white border-2 border-brand-teal text-brand-teal font-display font-bold text-2xl flex items-center justify-center rounded-2xl mb-6 mx-auto md:mx-0 group-hover:bg-brand-teal group-hover:text-white transition-colors duration-300">
                  {step.num}
                </div>
                <h4 className="text-xl font-bold text-slate-900 mb-4 text-center md:text-left">
                  {step.title}
                </h4>
                <p className="text-slate-600 text-center md:text-left">
                  {step.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

// synced
