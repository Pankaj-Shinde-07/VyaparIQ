import { motion } from "motion/react";
import { Check } from "lucide-react";
import { cn } from "../../lib/utils.js";

export function Pricing() {
  const plans = [
    {
      name: "Starter",
      desc: "For freelancers and solopreneurs.",
      price: "₹999",
      period: "/month",
      features: [
        "Up to 50 Invoices/month",
        "Basic WhatsApp Reminders",
        "1 User Account",
        "Standard Analytics",
        "Email Support"
      ],
      button: "Start Free Trial",
      highlight: false
    },
    {
      name: "Growth",
      desc: "For growing teams and local businesses.",
      price: "₹2,499",
      period: "/month",
      features: [
        "Unlimited Invoices",
        "Advanced AI Follow-ups",
        "Up to 5 User Accounts",
        "Predictive Analytics dashboard",
        "Appointment Scheduling",
        "Priority Support"
      ],
      button: "Get Growth Plan",
      highlight: true
    },
    {
      name: "Enterprise",
      desc: "For multi-branch operations.",
      price: "Custom",
      period: "",
      features: [
        "Everything in Growth",
        "Multi-Branch Support",
        "Custom Workflow Automation",
        "Dedicated Account Manager",
        "API Access",
        "Staff Training"
      ],
      button: "Contact Sales",
      highlight: false
    }
  ];

  return (
    <section id="pricing" className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold text-slate-900 mb-6 font-display">
            Simple, transparent pricing
          </h2>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto">
            Try any plan free for 14 days. No credit card required. Cancel anytime.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-center max-w-6xl mx-auto">
          {plans.map((plan, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.5 }}
              className={cn(
                "rounded-3xl p-8 relative",
                plan.highlight 
                  ? "bg-slate-900 text-white shadow-2xl scale-100 md:scale-105 border border-slate-800 z-10" 
                  : "bg-white text-slate-900 border border-slate-200 shadow-sm"
              )}
            >
              {plan.highlight && (
                <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 px-4 py-1 bg-gradient-to-r from-brand-teal to-brand-navy text-white text-xs font-bold uppercase tracking-wider rounded-full">
                  Most Popular
                </div>
              )}
              <h3 className="text-xl font-bold mb-2">{plan.name}</h3>
              <p className={cn("text-sm mb-6", plan.highlight ? "text-slate-400" : "text-slate-500")}>{plan.desc}</p>
              
              <div className="flex items-baseline gap-1 mb-8">
                <span className="text-5xl font-bold tracking-tight">{plan.price}</span>
                <span className={cn("font-medium", plan.highlight ? "text-slate-400" : "text-slate-500")}>{plan.period}</span>
              </div>

              <button className={cn(
                "w-full py-3 px-6 rounded-xl font-medium transition-all active:scale-95 mb-8",
                plan.highlight 
                  ? "bg-brand-teal hover:bg-blue-600 text-white" 
                  : "bg-slate-100 hover:bg-slate-200 text-slate-900"
              )}>
                {plan.button}
              </button>

              <ul className="space-y-4">
                {plan.features.map((feature, idx) => (
                  <li key={idx} className="flex items-center gap-3 text-sm">
                    <Check className={cn("w-5 h-5 shrink-0", plan.highlight ? "text-brand-blue" : "text-brand-teal")} />
                    <span className={plan.highlight ? "text-slate-300" : "text-slate-600"}>{feature}</span>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

// synced
