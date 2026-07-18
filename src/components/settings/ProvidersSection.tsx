"use client";

/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from "react";
import { Plus, Search, Brain, Cpu, MessageSquare, Code, Sparkles, X } from "lucide-react";
import SidePanel from "../dashboard/SidePanel";

const popularProviders = [
  { name: "OpenAI", icon: Brain, color: "text-brand-accent", bg: "bg-brand-accent/10" },
  { name: "Anthropic", icon: Sparkles, color: "text-brand-accent", bg: "bg-brand-accent/10" },
  { name: "Mistral", icon: Cpu, color: "text-brand-accent", bg: "bg-brand-accent/10" },
  { name: "Groq", icon: Code, color: "text-brand-accent", bg: "bg-brand-accent/10" },
  { name: "Replicate", icon: MessageSquare, color: "text-brand-accent", bg: "bg-brand-accent/10" },
  { name: "ElevenLabs", icon: Sparkles, color: "text-brand-accent", bg: "bg-brand-accent/10" },
];

export default function ProvidersSection() {
  const [isPanelOpen, setIsPanelOpen] = useState(false);

  return (
    <div className="space-y-12">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-xs font-bold text-brand-secondary uppercase tracking-widest mb-1">Connected Providers</h2>
          <p className="text-sm text-brand-secondary">Your linked AI model and infrastructure providers.</p>
        </div>
        <button 
          onClick={() => setIsPanelOpen(true)}
          className="px-6 py-2.5 bg-brand-accent text-brand-accent-text font-bold rounded-xl shadow-lg shadow-brand-accent/20 hover:bg-brand-accent-hover transition-all flex items-center gap-2"
        >
          <Plus className="w-4 h-4" />
          Add Provider
        </button>
      </div>

      <div className="bg-brand-card border border-brand-border rounded-[32px] p-16 text-center shadow-sm">
        <div className="w-16 h-16 rounded-full bg-brand-bg flex items-center justify-center text-brand-secondary/20 mx-auto mb-6">
          <Brain className="w-8 h-8" />
        </div>
        <h3 className="text-xl font-bold text-brand-primary mb-2">No providers connected</h3>
        <p className="text-brand-secondary max-w-sm mx-auto mb-8">
          Connect your first AI provider to start building and running intelligent workflows.
        </p>
      </div>

      <section className="space-y-6">
        <h3 className="text-xl font-bold text-brand-primary">Search Providers</h3>
        <div className="relative mb-6">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-brand-secondary w-5 h-5" />
          <input 
            type="text" 
            placeholder="Search popular providers..." 
            className="w-full pl-12 pr-4 py-4 bg-brand-input-bg border border-brand-border rounded-2xl shadow-sm focus:ring-2 focus:ring-brand-accent/20 focus:border-brand-accent outline-none text-brand-primary transition-all"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {popularProviders.map((provider) => (
            <div key={provider.name} className="p-6 bg-brand-card border border-brand-border rounded-[24px] flex items-center justify-between hover:border-brand-accent/30 transition-all group cursor-pointer shadow-sm">
              <div className="flex items-center gap-4">
                <div className={`w-12 h-12 rounded-xl ${provider.bg} flex items-center justify-center ${provider.color}`}>
                  <provider.icon className="w-6 h-6" />
                </div>
                <span className="font-bold text-brand-primary">{provider.name}</span>
              </div>
              <Plus className="w-5 h-5 text-brand-border group-hover:text-brand-accent transition-all" />
            </div>
          ))}
        </div>
      </section>

      <SidePanel isOpen={isPanelOpen} onClose={() => setIsPanelOpen(false)} title="Add Provider">
        <div className="space-y-8 pb-24">
          <div className="space-y-6">
            <div>
              <label className="block text-xs font-bold uppercase tracking-widest text-brand-secondary mb-3">Provider Name</label>
              <input type="text" className="w-full px-4 py-3 rounded-xl border border-brand-border bg-brand-input-bg text-brand-input-text outline-none focus:ring-2 focus:ring-brand-accent/20" placeholder="e.g. OpenAI Production" />
            </div>
            <div>
              <label className="block text-xs font-bold uppercase tracking-widest text-brand-secondary mb-3">Category</label>
              <div className="grid grid-cols-2 gap-2">
                {["Text", "Image", "Video", "Voice", "Audio", "Coding"].map(cat => (
                  <label key={cat} className="flex items-center gap-3 p-3 bg-brand-bg rounded-xl border border-brand-border cursor-pointer hover:bg-brand-card-hover transition-all">
                    <input type="checkbox" className="w-4 h-4 text-brand-accent rounded" />
                    <span className="text-xs font-bold text-brand-primary">{cat}</span>
                  </label>
                ))}
              </div>
            </div>
            <div>
              <label className="block text-xs font-bold uppercase tracking-widest text-brand-secondary mb-3">API Key</label>
              <input type="password" placeholder="sk-..." className="w-full px-4 py-3 rounded-xl border border-brand-border bg-brand-input-bg text-brand-input-text outline-none focus:ring-2 focus:ring-brand-accent/20" />
              <p className="text-[10px] text-brand-secondary uppercase tracking-widest mt-2">Key will be encrypted and masked immediately.</p>
            </div>
            <div>
              <label className="block text-xs font-bold uppercase tracking-widest text-brand-secondary mb-3">Base URL (Optional)</label>
              <input type="text" className="w-full px-4 py-3 rounded-xl border border-brand-border bg-brand-input-bg text-brand-input-text outline-none focus:ring-2 focus:ring-brand-accent/20" placeholder="https://api.openai.com/v1" />
            </div>
          </div>
          
          <div className="fixed bottom-0 right-0 w-full max-w-[480px] p-6 bg-brand-modal border-t border-brand-border flex gap-4">
            <button onClick={() => setIsPanelOpen(false)} className="flex-1 py-4 bg-brand-accent text-brand-accent-text font-bold rounded-xl shadow-lg shadow-brand-accent/20 hover:bg-brand-accent-hover transition-all">
              Save Provider
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
