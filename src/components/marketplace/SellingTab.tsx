"use client";

/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Plus, ChevronDown, ShieldAlert, Star, MessageSquare, AlertCircle, RefreshCw } from "lucide-react";

export default function SellingTab() {
  const [expandedSection, setExpandedSection] = useState<string | null>("My Listings");

  const sections = [
    { title: "My Listings", empty: "No listings yet." },
    { title: "Reviews", empty: "No reviews yet." },
    { title: "Disputes", empty: "No disputes yet." },
    { title: "Refunds", empty: "No refunds yet." },
  ];

  return (
    <div className="space-y-8">
      <div className="flex justify-end">
        <button className="px-6 py-2.5 bg-brand-accent text-brand-accent-text font-bold rounded-xl shadow-lg shadow-brand-accent/20 flex items-center gap-2 hover:bg-brand-accent-hover transition-all">
          <Plus className="w-4 h-4" />
          Create Listing
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 text-brand-primary">
        <div className="lg:col-span-2 space-y-4">
          {sections.map((section) => (
            <div key={section.title} className="bg-brand-card border border-brand-border rounded-[32px] overflow-hidden shadow-sm">
              <button 
                onClick={() => setExpandedSection(expandedSection === section.title ? null : section.title)}
                className="w-full p-8 flex items-center justify-between hover:bg-brand-card-hover transition-all"
              >
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-xl bg-brand-bg flex items-center justify-center text-brand-secondary">
                    {section.title === "My Listings" && <Plus className="w-5 h-5" />}
                    {section.title === "Reviews" && <Star className="w-5 h-5" />}
                    {section.title === "Disputes" && <MessageSquare className="w-5 h-5" />}
                    {section.title === "Refunds" && <RefreshCw className="w-5 h-5" />}
                  </div>
                  <h3 className="text-xl font-bold text-brand-primary">{section.title}</h3>
                </div>
                <ChevronDown className={`w-5 h-5 text-brand-secondary transition-transform duration-300 ${expandedSection === section.title ? "rotate-180" : ""}`} />
              </button>
              
              <AnimatePresence>
                {expandedSection === section.title && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    className="border-t border-brand-border"
                  >
                    <div className="p-12 flex flex-col items-center justify-center text-center">
                      <div className="w-16 h-16 rounded-full bg-brand-card-hover flex items-center justify-center text-brand-secondary/20 mb-4">
                        <AlertCircle className="w-8 h-8" />
                      </div>
                      <p className="text-brand-secondary font-medium">{section.empty}</p>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>

        <div className="space-y-6">
          <div className="p-8 bg-brand-card border border-brand-border rounded-[32px] shadow-sm">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-xl bg-status-paused-bg text-status-paused-text flex items-center justify-center">
                <ShieldAlert className="w-6 h-6" />
              </div>
              <h3 className="font-bold text-brand-primary">Verification</h3>
            </div>
            
            <div className="mb-8">
              <div className="flex items-center justify-between mb-4">
                <span className="text-sm font-bold text-brand-secondary uppercase tracking-widest">Status</span>
                <span className="px-2 py-0.5 bg-status-paused-bg text-status-paused-text text-[10px] font-bold rounded border border-brand-border uppercase tracking-widest">Not Verified</span>
              </div>
              
              <div className="space-y-4">
                {["Identity", "Payment", "Agreement"].map((step, i) => (
                  <div key={step} className="flex items-center gap-3">
                    <div className="w-6 h-6 rounded-full bg-brand-bg border border-brand-border flex items-center justify-center text-[10px] font-black text-brand-secondary">
                      {i + 1}
                    </div>
                    <span className="text-sm text-brand-secondary">{step}</span>
                  </div>
                ))}
              </div>
            </div>
            
            <button className="w-full py-3 bg-brand-accent text-brand-accent-text font-bold rounded-xl shadow-lg shadow-brand-accent/20 hover:bg-brand-accent-hover transition-all">
              Start Verification
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
