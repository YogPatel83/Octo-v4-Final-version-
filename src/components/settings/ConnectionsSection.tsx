"use client";

/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from "react";
import { Plus, Share2, Slack, Github, Mail, CreditCard, Box, X } from "lucide-react";
import SidePanel from "../dashboard/SidePanel";

const popularSystems = [
  { name: "Slack", icon: Slack, color: "text-brand-accent", bg: "bg-brand-accent/10" },
  { name: "Notion", icon: Box, color: "text-brand-primary", bg: "bg-brand-card-hover" },
  { name: "GitHub", icon: Github, color: "text-brand-primary", bg: "bg-brand-card-hover" },
  { name: "Gmail", icon: Mail, color: "text-brand-accent", bg: "bg-brand-accent/10" },
  { name: "Stripe", icon: CreditCard, color: "text-brand-accent", bg: "bg-brand-accent/10" },
];

export default function ConnectionsSection() {
  const [isPanelOpen, setIsPanelOpen] = useState(false);
  const [method, setMethod] = useState("OAuth");

  return (
    <div className="space-y-12">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-xs font-bold text-brand-secondary uppercase tracking-widest mb-1">Connected Systems</h2>
          <p className="text-sm text-brand-secondary">External applications Helm can interact with.</p>
        </div>
        <button 
          onClick={() => setIsPanelOpen(true)}
          className="px-6 py-2.5 bg-brand-accent text-brand-accent-text font-bold rounded-xl shadow-lg shadow-brand-accent/20 hover:bg-brand-accent-hover transition-all flex items-center gap-2"
        >
          <Plus className="w-4 h-4" />
          Add System
        </button>
      </div>

      <div className="bg-brand-card border border-brand-border rounded-[32px] p-16 text-center shadow-sm">
        <div className="w-16 h-16 rounded-full bg-brand-bg flex items-center justify-center text-brand-secondary/20 mx-auto mb-6">
          <Share2 className="w-8 h-8" />
        </div>
        <h3 className="text-xl font-bold text-brand-primary mb-2">No systems connected</h3>
        <p className="text-brand-secondary max-w-sm mx-auto mb-8">
          Connect your company tools to enable autonomous workforce interaction.
        </p>
      </div>

      <section className="space-y-6">
        <h3 className="text-xl font-bold text-brand-primary">Popular Systems</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {popularSystems.map((system) => (
            <div key={system.name} className="p-6 bg-brand-card border border-brand-border rounded-[24px] flex items-center justify-between hover:border-brand-accent/30 transition-all group shadow-sm">
              <div className="flex items-center gap-4">
                <div className={`w-12 h-12 rounded-xl ${system.bg} flex items-center justify-center ${system.color}`}>
                  <system.icon className="w-6 h-6" />
                </div>
                <span className="font-bold text-brand-primary">{system.name}</span>
              </div>
              <button className="px-4 py-2 bg-brand-bg text-brand-primary text-xs font-bold rounded-lg hover:bg-brand-accent hover:text-brand-accent-text transition-all">
                Connect
              </button>
            </div>
          ))}
        </div>
      </section>

      <SidePanel isOpen={isPanelOpen} onClose={() => setIsPanelOpen(false)} title="Add System">
        <div className="space-y-8 pb-24">
          <div className="space-y-6">
            <div>
              <label className="block text-xs font-bold uppercase tracking-widest text-brand-secondary mb-3">System Name</label>
              <input type="text" className="w-full px-4 py-3 rounded-xl border border-brand-border bg-brand-input-bg text-brand-input-text outline-none focus:ring-2 focus:ring-brand-accent/20" placeholder="e.g. Corporate Slack" />
            </div>
            <div>
              <label className="block text-xs font-bold uppercase tracking-widest text-brand-secondary mb-4">Connection Method</label>
              <div className="space-y-2">
                {["OAuth", "API Key", "Webhook", "Custom REST", "Manual"].map(m => (
                  <label key={m} className="flex items-center gap-3 p-4 bg-brand-bg rounded-2xl border border-brand-border cursor-pointer hover:bg-brand-card-hover transition-all group">
                    <input 
                      type="radio" 
                      name="method" 
                      checked={method === m}
                      onChange={() => setMethod(m)}
                      className="w-4 h-4 text-brand-accent focus:ring-brand-accent" 
                    />
                    <span className="text-sm font-bold text-brand-primary group-hover:text-brand-accent transition-colors">{m}</span>
                  </label>
                ))}
              </div>
            </div>

            {method === "API Key" && (
              <div className="space-y-4 animate-in fade-in slide-in-from-top-2 duration-300">
                <div className="text-brand-primary">
                  <label className="block text-[10px] font-bold uppercase tracking-widest text-brand-secondary mb-2">Key Label</label>
                  <input type="text" className="w-full px-4 py-2 rounded-xl border border-brand-border bg-brand-input-bg text-brand-input-text text-sm" placeholder="Production Secret" />
                </div>
                <div className="text-brand-primary">
                  <label className="block text-[10px] font-bold uppercase tracking-widest text-brand-secondary mb-2">Secret Key</label>
                  <input type="password" className="w-full px-4 py-2 rounded-xl border border-brand-border bg-brand-input-bg text-brand-input-text text-sm" placeholder="••••••••••••••••" />
                </div>
              </div>
            )}
          </div>
          
          <div className="fixed bottom-0 right-0 w-full max-w-[480px] p-6 bg-brand-modal border-t border-brand-border flex gap-4">
            <button onClick={() => setIsPanelOpen(false)} className="flex-1 py-4 bg-brand-accent text-brand-accent-text font-bold rounded-xl shadow-lg shadow-brand-accent/20 hover:bg-brand-accent-hover transition-all">
              Connect System
            </button>
            <button onClick={() => setIsPanelOpen(false)} className="flex-1 py-4 bg-brand-bg text-brand-primary border border-brand-border font-bold rounded-xl hover:bg-brand-card-hover transition-all">
              Cancel
            </button>
          </div>
        </div>
      </SidePanel>
    </div>
  );
}
