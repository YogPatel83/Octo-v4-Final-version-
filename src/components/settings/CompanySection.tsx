/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Upload } from "lucide-react";

export default function CompanySection() {
  return (
    <div className="bg-brand-card border border-brand-border rounded-[32px] p-10 shadow-sm space-y-12 text-brand-primary">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="space-y-2">
          <label className="text-xs font-bold text-brand-secondary uppercase tracking-widest">Company Name</label>
          <input 
            type="text" 
            defaultValue="Acme Corp"
            className="w-full px-4 py-3 rounded-xl border border-brand-border bg-brand-input-bg text-brand-input-text focus:ring-2 focus:ring-brand-accent/20 focus:border-brand-accent outline-none" 
          />
        </div>
        <div className="space-y-2">
          <label className="text-xs font-bold text-brand-secondary uppercase tracking-widest">Currency</label>
          <select className="w-full px-4 py-3 rounded-xl border border-brand-border bg-brand-input-bg text-brand-input-text focus:ring-2 focus:ring-brand-accent/20 focus:border-brand-accent outline-none">
            <option>USD ($)</option>
            <option>EUR (€)</option>
            <option>GBP (£)</option>
          </select>
        </div>
        <div className="space-y-2 col-span-full">
          <label className="text-xs font-bold text-brand-secondary uppercase tracking-widest">Timezone</label>
          <select className="w-full px-4 py-3 rounded-xl border border-brand-border bg-brand-input-bg text-brand-input-text focus:ring-2 focus:ring-brand-accent/20 focus:border-brand-accent outline-none">
            <option>UTC (Coordinated Universal Time)</option>
            <option>America/New_York (EST)</option>
            <option>Europe/London (GMT)</option>
            <option>Asia/Tokyo (JST)</option>
          </select>
        </div>
      </div>

      <section className="space-y-6">
        <h2 className="text-lg font-bold text-brand-primary border-b border-brand-border pb-4">Brand Identity</h2>
        <div className="space-y-8">
          <div>
            <label className="block text-xs font-bold text-brand-secondary uppercase tracking-widest mb-4">Logo</label>
            <div className="border-2 border-dashed border-brand-border rounded-2xl p-10 flex flex-col items-center justify-center text-center bg-brand-bg/50 group hover:bg-brand-bg transition-all cursor-pointer">
              <Upload className="w-8 h-8 text-brand-secondary mb-4 group-hover:text-brand-accent transition-all" />
              <div className="text-sm font-bold text-brand-primary">Upload your logo</div>
              <p className="text-xs text-brand-secondary mt-1">Recommended size 512x512px</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-2">
              <label className="text-xs font-bold text-brand-secondary uppercase tracking-widest">Primary Color</label>
              <div className="flex gap-4 items-center">
                <div className="w-12 h-12 rounded-xl bg-brand-accent border border-brand-border shadow-sm" />
                <input 
                  type="text" 
                  defaultValue="#7B61FF"
                  className="flex-1 px-4 py-3 rounded-xl border border-brand-border bg-brand-input-bg text-brand-input-text focus:ring-2 focus:ring-brand-accent/20 focus:border-brand-accent outline-none font-mono text-sm" 
                />
              </div>
            </div>
            <div className="space-y-2">
              <label className="text-xs font-bold text-brand-secondary uppercase tracking-widest">Tone of Voice</label>
              <select className="w-full px-4 py-3 rounded-xl border border-brand-border bg-brand-input-bg text-brand-input-text focus:ring-2 focus:ring-brand-accent/20 focus:border-brand-accent outline-none">
                <option>Professional</option>
                <option>Friendly</option>
                <option>Direct</option>
                <option>Creative</option>
              </select>
            </div>
          </div>
        </div>
      </section>

      <div className="pt-6">
        <button className="px-8 py-3 bg-brand-accent text-brand-accent-text font-bold rounded-xl shadow-lg shadow-brand-accent/20 hover:bg-brand-accent-hover transition-all">
          Update Company Settings
        </button>
      </div>
    </div>
  );
}
