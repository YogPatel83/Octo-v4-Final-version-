"use client";

/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from "react";
import { Plus } from "lucide-react";

export default function CompanyPanelContent() {
  const [activeTab, setActiveTab] = useState("Overview");
  
  const tabs = ["Overview", "Identity", "Objectives", "Members", "Rules", "Intelligence"];
  
  return (
    <div className="space-y-8">
      <div className="flex border-b border-brand-border overflow-x-auto no-scrollbar">
        {tabs.map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-4 py-3 text-sm font-medium whitespace-nowrap border-b-2 transition-all ${
              activeTab === tab 
                ? 'border-brand-accent text-brand-accent' 
                : 'border-transparent text-brand-secondary hover:text-brand-primary'
            }`}
          >
            {tab}
          </button>
        ))}
      </div>
      
      {activeTab === "Overview" ? (
        <div className="space-y-6">
          <div className="grid grid-cols-2 gap-4">
            <div className="p-4 bg-brand-bg rounded-2xl border border-brand-border">
              <div className="text-xs font-bold text-brand-secondary uppercase tracking-widest mb-1">Plan</div>
              <div className="font-bold text-brand-primary">Pro</div>
            </div>
            <div className="p-4 bg-brand-bg rounded-2xl border border-brand-border">
              <div className="text-xs font-bold text-brand-secondary uppercase tracking-widest mb-1">Credits</div>
              <div className="font-bold text-brand-primary">847 left</div>
            </div>
            <div className="p-4 bg-brand-bg rounded-2xl border border-brand-border">
              <div className="text-xs font-bold text-brand-secondary uppercase tracking-widest mb-1">Agents</div>
              <div className="font-bold text-brand-primary">12 Active</div>
            </div>
            <div className="p-4 bg-brand-bg rounded-2xl border border-brand-border">
              <div className="text-xs font-bold text-brand-secondary uppercase tracking-widest mb-1">Work</div>
              <div className="font-bold text-brand-primary">3 Running</div>
            </div>
          </div>
          
          <div className="p-6 bg-brand-card border border-brand-border rounded-2xl">
            <h3 className="font-bold mb-4 text-brand-primary">Current Objective</h3>
            <p className="text-brand-secondary text-sm leading-relaxed mb-4">
              Launch new product website by Q4 focusing on high-performance landing pages and seamless checkout.
            </p>
            <div className="w-full bg-brand-border h-2 rounded-full overflow-hidden">
              <div className="bg-brand-accent h-full w-[65%]" />
            </div>
            <div className="mt-2 text-[10px] font-bold text-brand-secondary flex justify-between uppercase tracking-widest">
              <span>Progress</span>
              <span>65%</span>
            </div>
          </div>
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center py-20 text-center text-brand-primary">
          <div className="w-16 h-16 rounded-full bg-brand-card-hover flex items-center justify-center text-brand-secondary mb-4">
            <Plus className="w-8 h-8" />
          </div>
          <h3 className="font-bold mb-2">Nothing here yet</h3>
          <p className="text-sm text-brand-secondary max-w-xs mb-8">
            You haven't defined any {activeTab.toLowerCase()} for Acme Corp.
          </p>
          <button className="px-6 py-2.5 bg-brand-accent text-brand-accent-text font-bold rounded-xl shadow-lg shadow-brand-accent/20 hover:bg-brand-accent-hover transition-all">
            Configure {activeTab}
          </button>
        </div>
      )}
    </div>
  );
}
