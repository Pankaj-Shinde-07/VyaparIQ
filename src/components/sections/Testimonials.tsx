import { motion } from "motion/react";
import { Star } from "lucide-react";

export function Testimonials() {
  const testimonials = [
    {
      name: "Rahul Verma",
      role: "Owner, Verma Clinics",
      content: "VyaparIQ has completely transformed how we run the clinic. No more missed appointments or follow-ups. The AI assistant literally acts as a full-time receptionist.",
      rating: 5,
      image: "https://i.pravatar.cc/150?u=rahul"
    },
    {
      name: "Sneha Patel",
      role: "Freelance Designer",
      content: "I used to hate chasing clients for payments. Now, the system automatically sends polite WhatsApp reminders. My cash flow has improved by 40%.",
      rating: 5,
      image: "https://i.pravatar.cc/150?u=sneha"
    },
    {
      name: "Amit Singh",
      role: "Founder, City Grocers",
      content: "The smart invoicing and inventory alerts are incredibly accurate. What used to take me 3 hours every evening now happens automatically.",
      rating: 5,
      image: "https://i.pravatar.cc/150?u=amit"
    }
  ];

  return (
    <section className="py-24 bg-slate-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold text-slate-900 mb-6 font-display">
            Loved by independent business owners
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((t, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.5 }}
              className="bg-white p-8 rounded-3xl shadow-sm border border-slate-100"
            >
              <div className="flex gap-1 mb-6 text-amber-400">
                {[...Array(t.rating)].map((_, idx) => (
                  <Star key={idx} className="w-5 h-5 fill-current" />
                ))}
              </div>
              <p className="text-slate-700 mb-8 leading-relaxed">
                "{t.content}"
              </p>
              <div className="flex items-center gap-4">
                <img src={t.image} alt={t.name} className="w-12 h-12 rounded-full object-cover" />
                <div>
                  <h5 className="font-bold text-slate-900">{t.name}</h5>
                  <p className="text-sm text-slate-500">{t.role}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

// synced
