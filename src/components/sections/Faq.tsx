import { motion, AnimatePresence } from "motion/react";
import React, { useState } from "react";
import { Plus, Minus } from "lucide-react";
import { cn } from "../../lib/utils.js";

const faqs = [
  {
    question: "How long does it take to set up VyaparIQ?",
    answer: "You can get started in less than 2 minutes. Simply sign up, enter your business details, and our AI will automatically configure the best settings for your industry."
  },
  {
    question: "Do I need technical knowledge to use the AI features?",
    answer: "Not at all. The AI works politely in the background. If you know how to use WhatsApp or send an email, you'll feel right at home using VyaparIQ."
  },
  {
    question: "Is my business data safe?",
    answer: "Absolutely. We use bank-level encryption (AES-256) for all data at rest and in transit. Your data is yours, and we never share it with third parties."
  },
  {
    question: "Will the AI send messages to my customers automatically?",
    answer: "By default, the AI will draft messages and ask for your approval. Once you are comfortable, you can enable 'Auto-Pilot' for specific tasks like payment reminders or appointment confirmations."
  },
  {
    question: "Can I integrate my existing accounting software?",
    answer: "Yes, VyaparIQ currently supports One-Click export to Tally, Zoho Books, and Quickbooks, making tax season a breeze for your CA."
  }
];

function FaqItem({ faq, idx }: { key?: string | number, faq: typeof faqs[0], idx: number }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <motion.div 
      initial={{ opacity: 0, y: 10 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: idx * 0.1 }}
      className="border-b border-slate-200"
    >
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="flex w-full items-center justify-between py-6 text-left"
      >
        <span className="text-lg font-medium text-slate-900">{faq.question}</span>
        <span className={cn("ml-6 flex h-8 w-8 shrink-0 items-center justify-center rounded-full border transition-colors", isOpen ? "border-brand-teal text-brand-teal" : "border-slate-300 text-slate-500")}>
          {isOpen ? <Minus className="h-4 w-4" /> : <Plus className="h-4 w-4" />}
        </span>
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="overflow-hidden"
          >
            <p className="pb-6 text-slate-600 leading-relaxed pr-12">
              {faq.answer}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

export function Faq() {
  return (
    <section className="py-24 bg-slate-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold text-slate-900 mb-6 font-display">
            Frequently asked questions
          </h2>
        </div>
        <div className="bg-white rounded-3xl p-8 md:p-12 shadow-sm border border-slate-100">
          {faqs.map((faq, i) => (
            <FaqItem key={i} faq={faq} idx={i} />
          ))}
        </div>
      </div>
    </section>
  );
}

// synced
