"use client";

/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from "react";
import { Upload, X } from "lucide-react";

interface NewBuildPanelProps {
  onClose: () => void;
}

export default function NewBuildPanel({ onClose }: NewBuildPanelProps) {
  const [type, setType] = useState("Website");
  const [useDefaultBrand, setUseDefaultBrand] = useState(true);

  return (
    <div className="space-y-8 pb-24">
      <div className="space-y-6">
        <div>
          <label className="block text-xs font-bold uppercase tracking-widest text-brand-secondary mb-3">What are we building?</label>
          <textarea 
            className="w-full px-4 py-3 rounded-xl border border-brand-border focus:ring-2 focus:ring-brand-accent/20 focus:border-brand-accent outline-none min-h-[120px] text-sm"
            placeholder="Describe your project in detail..."
          />
        </div>

        <div>
          <label className="block text-xs font-bold uppercase tracking-widest text-brand-secondary mb-3">Type</label>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
            {["Website", "App", "Tool", "System"].map((t) => (
              <button
                key={t}
                onClick={() => setType(t)}
                className={`py-2 text-xs font-bold rounded-xl border transition-all ${
                  type === t 
                    ? "bg-brand-accent/10 border-brand-accent text-brand-accent" 
                    : "bg-brand-card border-brand-border text-brand-secondary hover:bg-brand-card-hover"
                }`}
              >
                {t}
              </button>
            ))}
          </div>
        </div>

        <div>
          <label className="block text-xs font-bold uppercase tracking-widest text-brand-secondary mb-3">Upload example</label>
          <div className="border-2 border-dashed border-brand-border rounded-2xl p-8 flex flex-col items-center justify-center text-center bg-brand-bg/50 group hover:bg-brand-bg hover:border-brand-accent/30 transition-all cursor-pointer">
            <Upload className="w-8 h-8 text-brand-secondary mb-3 group-hover:text-brand-accent transition-all" />
            <div className="text-sm font-bold text-brand-primary">Drag and drop assets</div>
            <p className="text-[10px] text-brand-secondary uppercase tracking-widest mt-1">Images, logos, or design files</p>
          </div>
        </div>

        <div>
          <div className="flex items-center justify-between mb-4">
            <label className="text-xs font-bold uppercase tracking-widest text-brand-secondary">Brand rules</label>
            <div className="flex bg-brand-bg p-1 rounded-lg border border-brand-border">
              <button 
                onClick={() => setUseDefaultBrand(true)}
                className={`px-3 py-1 text-[10px] font-bold rounded-md transition-all ${useDefaultBrand ? 'bg-brand-card-hover text-brand-primary shadow-sm' : 'text-brand-secondary'}`}
              >
                Default
              </button>
              <button 
                onClick={() => setUseDefaultBrand(false)}
                className={`px-3 py-1 text-[10px] font-bold rounded-md transition-all ${!useDefaultBrand ? 'bg-brand-card-hover text-brand-primary shadow-sm' : 'text-brand-secondary'}`}
              >
                Custom
              </button>
            </div>
          </div>
          
          {!useDefaultBrand && (
            <div className="space-y-4 animate-in fade-in slide-in-from-top-2 duration-300">
              <div className="grid grid-cols-2 gap-4 text-brand-primary">
                <input type="text" className="w-full px-4 py-2 rounded-xl border border-brand-border bg-brand-input-bg text-brand-input-text text-sm" placeholder="Primary Color (#)" />
                <input type="text" className="w-full px-4 py-2 rounded-xl border border-brand-border bg-brand-input-bg text-brand-input-text text-sm" placeholder="Font Family" />
              </div>
            </div>
          )}
        </div>

        <div className="space-y-4 text-brand-primary">
          <div>
            <label className="block text-xs font-bold uppercase tracking-widest text-brand-secondary mb-2">Pages needed</label>
            <input type="text" className="w-full px-4 py-3 rounded-xl border border-brand-border bg-brand-input-bg text-brand-input-text text-sm" placeholder="Home, About, Contact..." />
          </div>
          <div>
            <label className="block text-xs font-bold uppercase tracking-widest text-brand-secondary mb-2">Features needed</label>
            <input type="text" className="w-full px-4 py-3 rounded-xl border border-brand-border bg-brand-input-bg text-brand-input-text text-sm" placeholder="Auth, Checkout, Search..." />
          </div>
          <div>
            <label className="block text-xs font-bold uppercase tracking-widest text-brand-secondary mb-2">Data needed</label>
            <input type="text" className="w-full px-4 py-3 rounded-xl border border-brand-border bg-brand-input-bg text-brand-input-text text-sm" placeholder="Products, Users, Posts..." />
          </div>
        </div>
      </div>

      <div className="fixed bottom-0 right-0 w-full max-w-[480px] p-6 bg-brand-modal border-t border-brand-border flex gap-4">
        <button onClick={onClose} className="flex-1 py-4 bg-brand-accent text-brand-accent-text font-bold rounded-xl shadow-lg shadow-brand-accent/20 hover:bg-brand-accent-hover transition-all">
          Generate Plan
        </button>
        <button onClick={onClose} className="flex-1 py-4 bg-brand-card-hover text-brand-primary border border-brand-border font-bold rounded-xl hover:bg-brand-card transition-all">
          Create Preview
        </button>
      </div>
    </div>
  );
}
