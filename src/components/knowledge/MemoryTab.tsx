"use client";

/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { ChevronDown, Inbox } from "lucide-react";

const memoryCategories = [
  { title: "Decisions", count: 0 },
  { title: "Execution History", count: 0 },
  { title: "Approvals", count: 0 },
  { title: "Failures", count: 0 },
  { title: "Successes", count: 0 },
];

function MemoryAccordion({ title, count }: { title: string; count: number; key?: any }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="bg-brand-card border border-brand-border rounded-2xl shadow-sm overflow-hidden mb-4 last:mb-0">
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="w-full p-6 flex items-center justify-between hover:bg-brand-card-hover transition-all focus:outline-none"
      >
        <div className="flex items-center gap-4">
          <h3 className="font-bold text-brand-primary">{title}</h3>
          <span className="px-2 py-0.5 bg-brand-bg text-brand-secondary text-[10px] font-bold rounded-full border border-brand-border">
            {count}
          </span>
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
            <div className="p-12 border-t border-brand-border bg-brand-bg/20 flex flex-col items-center justify-center text-center">
              <Inbox className="w-8 h-8 text-brand-secondary/20 mb-3" />
              <p className="text-sm text-brand-secondary font-medium tracking-tight">Nothing recorded yet.</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function MemoryTab() {
  return (
    <div className="max-w-3xl mx-auto py-4">
      <div className="mb-8">
        <h2 className="text-xs font-bold text-brand-secondary uppercase tracking-widest mb-2">Company Memory</h2>
        <p className="text-sm text-brand-secondary">A persistent record of every significant event within your organization.</p>
      </div>
      
      {memoryCategories.map((cat, i) => (
        <MemoryAccordion key={i} title={cat.title} count={cat.count} />
      ))}
    </div>
  );
}
