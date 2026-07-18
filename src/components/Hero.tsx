"use client";

/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { motion } from "motion/react";
import Link from "next/link";
import { Play, ArrowRight } from "lucide-react";

export default function Hero() {
  return (
    <section className="relative pt-20 pb-32 overflow-hidden">
      <div className="absolute inset-0 hero-glow -z-10" />
      
      <div className="max-w-7xl mx-auto px-6 text-center">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="inline-flex items-center px-4 py-1.5 rounded-full border border-hero-badge-border bg-hero-badge-bg text-hero-badge-text text-xs font-semibold mb-8 tracking-wide"
        >
          Company Operating System
        </motion.div>
        
        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-5xl md:text-[72px] font-bold text-brand-primary leading-[1.1] tracking-tight mb-8"
        >
          Run your company <br className="hidden md:block" />
          <span className="text-brand-accent">with AI workers.</span>
        </motion.h1>
        
        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-xl md:text-2xl text-brand-secondary max-w-2xl mx-auto mb-10 leading-relaxed"
        >
          Create workers, approve decisions, and receive completed work. Your company runs — you stay in control.
        </motion.p>
        
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-20"
        >
          <Link href="/signup" 
            className="w-full sm:w-auto px-8 py-4 bg-brand-accent text-brand-accent-text font-semibold rounded-xl hover:bg-brand-accent-hover transition-all text-lg shadow-xl shadow-brand-accent/20"
          >
            Start Free
          </Link>
          <button className="w-full sm:w-auto px-8 py-4 bg-brand-card text-brand-primary border border-brand-border font-semibold rounded-xl hover:bg-brand-card-hover transition-all text-lg flex items-center justify-center gap-2">
            <Play className="w-5 h-5 fill-current" />
            See how it works
          </button>
        </motion.div>
        
        <motion.div 
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="relative max-w-5xl mx-auto"
        >
          <div className="browser-frame bg-brand-card rounded-2xl overflow-hidden border border-brand-border">
            {/* Browser Header */}
            <div className="bg-brand-bg border-b border-brand-border px-4 py-3 flex items-center gap-2">
              <div className="flex gap-1.5">
                <div className="w-3 h-3 rounded-full bg-status-failed-dot" />
                <div className="w-3 h-3 rounded-full bg-status-paused-dot" />
                <div className="w-3 h-3 rounded-full bg-status-active-dot" />
              </div>
              <div className="flex-1 max-w-md mx-auto h-6 bg-brand-bg border border-brand-border rounded flex items-center px-3">
                <div className="w-full h-2 bg-brand-border rounded" />
              </div>
            </div>
            
            {/* App Content UI Mockup */}
            <div className="p-8 bg-brand-card min-h-[400px] text-left">
              <div className="flex justify-between items-center mb-8">
                <div>
                  <h3 className="text-xl font-bold">Active Workers</h3>
                  <p className="text-sm text-brand-secondary">3 workers running 12 tasks</p>
                </div>
                <button className="px-4 py-2 bg-brand-accent/10 text-brand-accent text-sm font-semibold rounded-lg">
                  + New Worker
                </button>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {[
                  { name: "Legal Ops", status: "Reviewing Contract", progress: 65 },
                  { name: "Sales Outreach", status: "Personalizing Emails", progress: 82 },
                  { name: "Product Analyst", status: "Summarizing Feedback", progress: 30 }
                ].map((worker, i) => (
                  <div key={i} className="p-5 border border-brand-border rounded-xl bg-brand-bg">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="w-10 h-10 rounded-lg bg-brand-accent flex items-center justify-center text-brand-accent-text font-bold">
                        {worker.name[0]}
                      </div>
                      <div>
                        <div className="font-semibold">{worker.name}</div>
                        <div className="text-xs text-brand-secondary">{worker.status}</div>
                      </div>
                    </div>
                    <div className="w-full bg-brand-border h-1.5 rounded-full overflow-hidden">
                      <div className="bg-brand-accent h-full" style={{ width: `${worker.progress}%` }} />
                    </div>
                  </div>
                ))}
              </div>
              
              <div className="mt-8 p-6 border border-brand-border bg-brand-card rounded-xl flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-brand-accent/10 flex items-center justify-center text-brand-accent">
                    <ArrowRight className="w-6 h-6" />
                  </div>
                  <div>
                    <div className="font-bold text-brand-primary">Approval Needed</div>
                    <div className="text-sm text-brand-secondary">Legal Ops needs approval on the partnership terms</div>
                  </div>
                </div>
                <button className="px-6 py-2.5 bg-brand-accent text-brand-accent-text font-semibold rounded-lg text-sm">
                  Review & Approve
                </button>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
