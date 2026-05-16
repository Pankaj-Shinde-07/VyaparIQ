import { motion } from "motion/react";
import { Stethoscope, Store, Scissors, Dumbbell, Briefcase, Pill, Laptop } from "lucide-react";

export function Industries() {
  const industries = [
    { title: "Medical Stores & Pharmacies", icon: <Pill className="w-6 h-6" />, color: "bg-emerald-100 text-emerald-600 border-emerald-200" },
    { title: "Clinics & Doctors", icon: <Stethoscope className="w-6 h-6" />, color: "bg-blue-100 text-blue-600 border-blue-200" },
    { title: "Retail Shops & Boutiques", icon: <Store className="w-6 h-6" />, color: "bg-rose-100 text-rose-600 border-rose-200" },
    { title: "Salons & Spas", icon: <Scissors className="w-6 h-6" />, color: "bg-fuchsia-100 text-fuchsia-600 border-fuchsia-200" },
    { title: "Gyms & Fitness Centers", icon: <Dumbbell className="w-6 h-6" />, color: "bg-teal-100 text-teal-600 border-teal-200" },
    { title: "Freelancers & Agencies", icon: <Laptop className="w-6 h-6" />, color: "bg-indigo-100 text-indigo-600 border-indigo-200" },
    { title: "Service Providers", icon: <Briefcase className="w-6 h-6" />, color: "bg-slate-100 text-slate-800 border-slate-200" },
  ];

  return (
    <section id="industries" className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="text-3xl md:text-5xl font-bold text-slate-900 mb-6 font-display">
          Built for every business type
        </h2>
        <p className="text-lg text-slate-600 max-w-2xl mx-auto mb-16">
          Whether you sell products, time, or services, VyaparIQ adapts to your specific business model with pre-built templates.
        </p>

        <div className="flex flex-wrap justify-center gap-4">
          {industries.map((ind, i) => (
            <motion.div
              key={i}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className={`flex items-center gap-3 px-6 py-4 rounded-full border border-slate-200 hover:shadow-md transition-shadow cursor-pointer bg-white`}
            >
              <div className={`p-2 rounded-full ${ind.color}`}>
                {ind.icon}
              </div>
              <span className="font-semibold text-slate-800">{ind.title}</span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

// synced
