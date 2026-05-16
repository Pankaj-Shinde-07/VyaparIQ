import { motion } from "motion/react";
import { 
  FileText, MessageSquare, CreditCard, 
  Calendar, PieChart, MessageCircle, 
  LineChart, Building2 
} from "lucide-react";

export function Features() {
  const features = [
    {
      title: "Smart Invoicing",
      description: "Generate professional GST-compliant invoices in seconds. Auto-calculate taxes and send instantly.",
      icon: <FileText className="w-6 h-6 text-brand-teal" />,
    },
    {
      title: "AI Customer Follow-ups",
      description: "Let AI gently remind customers about pending payments and appointments automatically.",
      icon: <MessageSquare className="w-6 h-6 text-brand-navy" />,
    },
    {
      title: "Payment Tracking",
      description: "Track all incoming payments, partial payments, and overdue amounts in one visual dashboard.",
      icon: <CreditCard className="w-6 h-6 text-brand-blue" />,
    },
    {
      title: "Appointment Scheduling",
      description: "Allow clients to book slots online. Syncs with your calendar and sends automated reminders.",
      icon: <Calendar className="w-6 h-6 text-amber-500" />,
    },
    {
      title: "WhatsApp Automation",
      description: "Send invoices, receipts, and marketing broadcasts directly to your customers' WhatsApp.",
      icon: <MessageCircle className="w-6 h-6 text-emerald-500" />,
    },
    {
      title: "Reports & Insights",
      description: "Understand your cash flow, customer acquisition, and growth metrics with AI-generated reports.",
      icon: <LineChart className="w-6 h-6 text-rose-500" />,
    },
    {
      title: "Analytics Dashboard",
      description: "Your business at a glance. See revenue, expenses, and pending tasks categorized neatly.",
      icon: <PieChart className="w-6 h-6 text-indigo-500" />,
    },
    {
      title: "Multi-Business Support",
      description: "Manage multiple shops or branches from a single VyaparIQ account effortlessly.",
      icon: <Building2 className="w-6 h-6 text-slate-700" />,
    },
  ];

  return (
    <section id="features" className="py-24 bg-slate-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-brand-teal font-semibold tracking-wide uppercase text-sm mb-3">
            Fully Featured
          </h2>
          <h3 className="text-3xl md:text-5xl font-bold text-slate-900 mb-6 font-display">
            Everything you need to <br className="hidden md:block"/> automate your workflow
          </h3>
          <p className="text-lg text-slate-600">
            VyaparIQ replaces 5 different tools with one seamless, AI-powered platform designed specifically for the needs of modern SMEs.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.5 }}
              whileHover={{ y: -5 }}
              className="bg-white rounded-2xl p-6 shadow-[0_2px_10px_rgba(0,0,0,0.04)] border border-slate-100 hover:shadow-[0_10px_30px_rgba(0,0,0,0.08)] transition-all duration-300"
            >
              <div className="w-12 h-12 rounded-xl bg-slate-50 flex items-center justify-center mb-6">
                {feature.icon}
              </div>
              <h4 className="text-lg font-bold text-slate-900 mb-2">
                {feature.title}
              </h4>
              <p className="text-slate-600 text-sm leading-relaxed">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

// synced
