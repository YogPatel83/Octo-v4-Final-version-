"use client";

/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { ChevronDown, Sparkles } from "lucide-react";

const learningCategories = [
  "Company Patterns",
  "Supplier Preferences",
  "Customer Preferences",
  "Workflow Improvements",
  "Department Intelligence",
  "Long-Term Strategy"
];

function LearningAccordion({ title }: { title: string; key?: any }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="bg-brand-card border border-brand-border rounded-2xl shadow-sm overflow-hidden mb-4 last:mb-0">
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="w-full p-6 flex items-center justify-between hover:bg-brand-card-hover transition-all focus:outline-none"
      >
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-brand-accent/10 flex items-center justify-center text-brand-accent">
            <Sparkles className="w-4 h-4" />
          </div>
          <h3 className="font-bold text-brand-primary">{title}</h3>
        </div>
        <ChevronDown className={`w-5 h-5 text-brand-secondary transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`} />
      </button>
      
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
          >
            <div className="p-10 border-t border-brand-border bg-brand-bg/20 flex flex-col items-center justify-center text-center">
              <p className="text-sm text-brand-secondary mb-4 italic">
                {title} insights will appear here as Helm learns from your files, workflows, and decisions.
              </p>
              <button className="text-xs font-bold text-brand-accent hover:underline uppercase tracking-widest">
                Start Learning Session
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function LearningTab() {
  return (
    <div className="max-w-3xl mx-auto py-4">
      <div className="mb-10 text-center">
        <h2 className="text-2xl font-bold text-brand-primary mb-2 tracking-tight">Active Learning</h2>
        <p className="text-brand-secondary text-sm">Helm automatically identifies patterns and proposes improvements for your business.</p>
      </div>
      
      {learningCategories.map((cat, i) => (
        <LearningAccordion key={i} title={cat} />
      ))}
    </div>
  );
}
