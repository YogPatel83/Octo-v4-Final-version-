"use client";

/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { ChevronDown } from "lucide-react";

const faqs = [
  {
    question: "What are credits?",
    answer: "Credits are the currency of the Helm platform. Every action an AI worker takes—from drafting an email to analyzing a spreadsheet—consumes a set amount of credits depending on complexity."
  },
  {
    question: "Can I change my plan later?",
    answer: "Yes, you can upgrade or downgrade your plan at any time from your organization settings. Changes take effect at the start of your next billing cycle."
  },
  {
    question: "What is BYOK?",
    answer: "BYOK stands for 'Bring Your Own Key'. It allows you to use your own OpenAI or Anthropic API keys within Helm, giving you direct control over model costs and performance."
  },
  {
    question: "What is Autopilot?",
    answer: "Autopilot is our advanced execution mode where AI workers can chain tasks together autonomously based on high-level goals you set, reducing the need for constant manual input."
  },
  {
    question: "Is there a free trial?",
    answer: "Our Free plan is free forever. For Pro and Max plans, we offer a 14-day full-featured trial so you can test the OS with your real business workflows."
  }
];

function FAQItem({ question, answer }: { question: string; answer: string }) {
  const [isOpen, setIsOpen] = useState(false);
  
  return (
    <div className="border-b border-brand-border last:border-0">
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="w-full py-6 flex items-center justify-between text-left focus:outline-none"
      >
        <span className="text-lg font-bold text-brand-primary">{question}</span>
        <ChevronDown className={`w-5 h-5 text-brand-secondary transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`} />
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="overflow-hidden"
          >
            <p className="pb-6 text-brand-secondary leading-relaxed">
              {answer}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function FAQ() {
  return (
    <section className="py-32 bg-brand-bg">
      <div className="max-w-3xl mx-auto px-6">
        <h2 className="text-4xl font-bold text-center mb-16 tracking-tight text-brand-primary">Frequently Asked Questions</h2>
        <div className="bg-brand-card rounded-3xl border border-brand-border p-8 md:p-12 shadow-sm">
          {faqs.map((faq, i) => (
            <div key={i}>
              <FAQItem question={faq.question} answer={faq.answer} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
