"use client";

/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from "react";
import { Check, ArrowUpRight, X } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

const planData = [
  { feature: "Companies", free: "1", pro: "5", max: "15", enterprise: "Unlimited" },
  { feature: "Agents", free: "1", pro: "15", max: "75", enterprise: "Unlimited" },
  { feature: "Teams", free: "0", pro: "5", max: "20", enterprise: "Unlimited" },
  { feature: "Workflows", free: "1", pro: "25", max: "150", enterprise: "Unlimited" },
  { feature: "Monthly tasks", free: "25", pro: "1,500", max: "10,000", enterprise: "Unlimited" },
  { feature: "Monthly credits", free: "100", pro: "2,500", max: "15,000", enterprise: "Unlimited" },
  { feature: "BYOK", free: "✗", pro: "✓", max: "✓", enterprise: "✓" },
  { feature: "Marketplace selling", free: "✗", pro: "✗", max: "✓", enterprise: "✓" },
  { feature: "Autopilot", free: "✗", pro: "✗", max: "✓", enterprise: "✓" },
  { feature: "Private deployment", free: "✗", pro: "✗", max: "✗", enterprise: "✓" },
  { feature: "SSO", free: "✗", pro: "✗", max: "✗", enterprise: "✓" },
  { feature: "Dedicated support", free: "✗", pro: "✗", max: "✗", enterprise: "✓" },
];

const creditPacks = [
  { amount: "1,000", price: "$—" },
  { amount: "5,000", price: "$—" },
  { amount: "25,000", price: "$—" },
  { amount: "100,000", price: "$—" },
];

export default function BillingSection() {
  const [isUpgradeModalOpen, setIsUpgradeModalOpen] = useState(false);

  return (
    <div className="space-y-12 pb-20">
      {/* Current Plan Card */}
      <div className="bg-brand-card border border-brand-border rounded-[32px] p-10 shadow-sm flex flex-col md:flex-row gap-10">
        <div className="flex-1 space-y-6">
          <div className="flex items-center gap-3">
            <h2 className="text-4xl font-black text-brand-primary tracking-tighter">Pro</h2>
            <span className="px-3 py-1 bg-brand-accent text-brand-accent-text text-[10px] font-black rounded-full uppercase tracking-widest shadow-sm">Current Plan</span>
          </div>
          <div className="space-y-2">
            <div className="flex justify-between text-xs font-bold text-brand-secondary uppercase tracking-widest">
              <span>Credits</span>
              <span>847 / 2,500 used</span>
            </div>
            <div className="w-full h-3 bg-brand-bg border border-brand-border rounded-full overflow-hidden">
              <div className="h-full bg-brand-accent w-[34%]" />
            </div>
          </div>
          <button 
            onClick={() => setIsUpgradeModalOpen(true)}
            className="px-6 py-2.5 bg-brand-accent text-brand-accent-text font-bold rounded-xl shadow-lg shadow-brand-accent/20 hover:bg-brand-accent-hover transition-all text-sm"
          >
            Upgrade Plan
          </button>
        </div>

        <div className="w-px bg-brand-border hidden md:block" />

        <div className="grid grid-cols-2 md:grid-cols-1 lg:grid-cols-3 gap-4 min-w-[280px]">
          <div className="p-4 bg-brand-bg rounded-2xl border border-brand-border text-center">
            <div className="text-xl font-black text-brand-primary">3/15</div>
            <div className="text-[10px] font-bold text-brand-secondary uppercase tracking-tighter">Agents</div>
          </div>
          <div className="p-4 bg-brand-bg rounded-2xl border border-brand-border text-center">
            <div className="text-xl font-black text-brand-primary">1/5</div>
            <div className="text-[10px] font-bold text-brand-secondary uppercase tracking-tighter">Teams</div>
          </div>
          <div className="p-4 bg-brand-bg rounded-2xl border border-brand-border text-center">
            <div className="text-xl font-black text-brand-primary">1/5</div>
            <div className="text-[10px] font-bold text-brand-secondary uppercase tracking-tighter">Companies</div>
          </div>
        </div>
      </div>

      {/* Comparison Table */}
      <div className="space-y-6">
        <h3 className="text-xl font-bold text-brand-primary">Plan Comparison</h3>
        <div className="bg-brand-card border border-brand-border rounded-[32px] overflow-hidden shadow-sm">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-brand-bg text-[10px] font-bold text-brand-secondary uppercase tracking-widest">
                <th className="px-6 py-4">Feature</th>
                <th className="px-6 py-4">Free</th>
                <th className="px-6 py-4 bg-brand-accent/5 text-brand-accent">Pro</th>
                <th className="px-6 py-4">Max</th>
                <th className="px-6 py-4">Enterprise</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-brand-border">
              {planData.map((row, i) => (
                <tr key={i} className="hover:bg-brand-card-hover transition-colors">
                  <td className="px-6 py-4 text-sm font-medium text-brand-primary">{row.feature}</td>
                  <td className="px-6 py-4 text-sm text-brand-secondary">{row.free}</td>
                  <td className="px-6 py-4 text-sm font-bold text-brand-accent bg-brand-accent/10">{row.pro}</td>
                  <td className="px-6 py-4 text-sm text-brand-secondary">{row.max}</td>
                  <td className="px-6 py-4 text-sm text-brand-secondary">{row.enterprise}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Credit Packs */}
      <div className="space-y-6">
        <h3 className="text-xl font-bold text-brand-primary">Add Credits</h3>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {creditPacks.map((pack) => (
            <div key={pack.amount} className="bg-brand-card border border-brand-border rounded-[32px] p-6 text-center shadow-sm hover:border-brand-accent/30 transition-all group">
              <div className="text-xs font-bold text-brand-secondary uppercase tracking-widest mb-2">{pack.amount} Credits</div>
              <div className="text-2xl font-black text-brand-primary mb-6">{pack.price}</div>
              <button className="w-full py-2.5 bg-brand-bg text-brand-primary font-bold rounded-xl text-xs hover:bg-brand-accent hover:text-brand-accent-text transition-all">
                Buy Pack
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Upgrade Modal */}
      <AnimatePresence>
        {isUpgradeModalOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsUpgradeModalOpen(false)}
              className="fixed inset-0 bg-black/60 backdrop-blur-md z-[100]"
            />
            <div className="fixed inset-0 flex items-center justify-center z-[101] p-6 pointer-events-none">
              <motion.div
                initial={{ opacity: 0, scale: 0.95, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: 20 }}
                className="bg-brand-modal border border-brand-border rounded-[32px] p-12 max-w-5xl w-full shadow-2xl relative overflow-hidden pointer-events-auto max-h-[90vh] overflow-y-auto no-scrollbar"
              >
                <div className="flex justify-between items-start mb-12">
                  <div>
                    <h2 className="text-3xl font-bold text-brand-primary mb-2">Select a plan</h2>
                    <p className="text-brand-secondary">Find the right scale for your organization.</p>
                  </div>
                  <button onClick={() => setIsUpgradeModalOpen(false)} className="p-2 text-brand-secondary hover:text-brand-primary transition-all">
                    <X className="w-6 h-6" />
                  </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {["Pro", "Max", "Enterprise"].map((p) => (
                    <div key={p} className={`p-8 rounded-[32px] border-2 transition-all ${p === 'Pro' ? 'border-brand-accent bg-brand-accent/10' : 'border-brand-border bg-brand-card hover:border-brand-accent/20'}`}>
                      <h3 className="text-2xl font-black mb-1">{p}</h3>
                      <div className="text-3xl font-black text-brand-primary mb-8">$— <span className="text-sm font-medium text-brand-secondary">/mo</span></div>
                      <button className={`w-full py-4 font-bold rounded-xl shadow-lg transition-all ${p === 'Pro' ? 'bg-brand-accent text-brand-accent-text shadow-brand-accent/20' : 'bg-brand-bg text-brand-primary hover:bg-brand-card-hover'}`}>
                        {p === 'Pro' ? 'Current Plan' : `Upgrade to ${p}`}
                      </button>
                    </div>
                  ))}
                </div>
              </motion.div>
            </div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
