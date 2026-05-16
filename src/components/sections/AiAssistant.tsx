import { motion } from "motion/react";
import { Sparkles, ArrowRight, Zap, CheckCircle2 } from "lucide-react";

export function AiAssistant() {
  return (
    <section className="py-24 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          
          {/* Visual Side */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="relative"
          >
            {/* Background Blob Removed for formal look */}
            <div className="relative bg-slate-900 border border-slate-800 rounded-3xl p-6 shadow-2xl">
              <div className="flex items-center gap-3 mb-6 pb-6 border-b border-slate-800">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-brand-navy to-brand-teal flex items-center justify-center">
                  <Sparkles className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h4 className="text-white font-medium">Vyapar AI Agent</h4>
                  <p className="text-xs text-slate-400">Always active</p>
                </div>
              </div>

              <div className="space-y-4">
                {/* AI messages */}
                <div className="bg-slate-800/50 border border-slate-700/50 rounded-2xl rounded-tl-sm p-4 text-sm text-slate-300 w-[85%]">
                  Good morning! You have 3 invoices overdue. I've drafted polite reminder messages for them. Would you like me to send them via WhatsApp?
                </div>
                
                <div className="flex justify-end">
                  <div className="bg-brand-teal rounded-2xl rounded-tr-sm p-4 text-sm text-white max-w-[70%]">
                    Yes, send them now.
                  </div>
                </div>

                <div className="bg-slate-800/50 border border-slate-700/50 rounded-2xl rounded-tl-sm p-4 text-sm text-slate-300 w-[85%]">
                  <div className="flex items-center gap-2 mb-2 text-green-400">
                    <CheckCircle2 className="w-4 h-4" /> Reminders sent.
                  </div>
                  Also, I noticed 'Client A' usually orders stock on the 15th. I've queued up a reorder suggestion for them.
                </div>
              </div>

              <div className="mt-6 pt-4 border-t border-slate-800 flex items-center gap-3">
                <div className="h-10 bg-slate-800 rounded-full flex-1 border border-slate-700" />
                <div className="w-10 h-10 bg-brand-teal rounded-full flex items-center justify-center">
                  <Zap className="w-4 h-4 text-white" />
                </div>
              </div>
            </div>
          </motion.div>

          {/* Content Side */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-purple-100 text-purple-700 text-sm font-semibold mb-6">
              <Sparkles className="w-4 h-4" /> Meet your Mini Office Manager
            </div>
            
            <h3 className="text-4xl md:text-5xl font-bold text-slate-900 mb-6 tracking-tight">
              An assistant that works <span className="text-brand-teal">24/7 without a salary.</span>
            </h3>
            
            <p className="text-lg text-slate-600 mb-8 leading-relaxed">
              VyaparIQ isn't just software; it's an intelligent agent that actively monitors your business. It identifies opportunities, chases payments, and suggests the next best action to grow your revenue.
            </p>

            <ul className="space-y-5 mb-10">
              {[
                "Drafts and sends personalized payment reminders",
                "Identifies buying patterns and suggests up-sells",
                "Automatically categorizes expenses and highlights anomalies",
                "Generates end-of-day health summaries for your business"
              ].map((item, i) => (
                <li key={i} className="flex items-start gap-3">
                  <CheckCircle2 className="w-6 h-6 text-brand-teal shrink-0" />
                  <span className="text-slate-700">{item}</span>
                </li>
              ))}
            </ul>

            <button className="px-6 py-3 bg-slate-900 hover:bg-slate-800 text-white rounded-full font-medium transition-all active:scale-95 flex items-center justify-center gap-2">
              See AI in Action <ArrowRight className="w-4 h-4" />
            </button>
          </motion.div>

        </div>
      </div>
    </section>
  );
}

// synced
