"use client";

/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { motion } from "motion/react";
import { Database, Plus, Trash2, Zap } from "lucide-react";

const datasets = [
  {
    id: 1,
    name: "Customer Feedback 2023",
    source: "Intercom",
    status: "Synced",
    lastUpdated: "4 hours ago"
  }
];

export default function DatasetsTab() {
  return (
    <div className="space-y-8">
      <div className="flex justify-end">
        <button className="px-6 py-2.5 bg-brand-accent text-brand-accent-text font-bold rounded-xl shadow-lg shadow-brand-accent/20 flex items-center gap-2 hover:bg-brand-accent-hover transition-all">
          <Plus className="w-4 h-4" />
          Connect Dataset
        </button>
      </div>

      {datasets.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 text-brand-primary">
          {datasets.map((ds) => (
            <motion.div 
              key={ds.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="p-8 bg-brand-card border border-brand-border rounded-[32px] shadow-sm hover:border-brand-accent/40 transition-all group"
            >
              <div className="flex items-center gap-4 mb-6">
                <div className="w-12 h-12 rounded-2xl bg-brand-bg flex items-center justify-center text-brand-secondary group-hover:text-brand-accent transition-all">
                  <Database className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="font-bold text-brand-primary truncate max-w-[160px]">{ds.name}</h3>
                  <span className="px-1.5 py-0.5 bg-brand-bg text-[10px] font-bold text-brand-secondary rounded border border-brand-border uppercase tracking-widest">
                    {ds.source}
                  </span>
                </div>
              </div>

              <div className="flex items-center justify-between mb-8">
                <div className="px-2.5 py-1 bg-status-active-bg text-status-active-text rounded-full text-[10px] font-bold border border-brand-border flex items-center gap-1.5 uppercase tracking-wider">
                  <div className="w-1.5 h-1.5 rounded-full bg-status-active-text" />
                  {ds.status}
                </div>
                <span className="text-[10px] text-brand-secondary font-medium uppercase tracking-widest">{ds.lastUpdated}</span>
              </div>

              <div className="flex gap-3">
                <button className="flex-1 py-3 bg-brand-accent text-brand-accent-text font-bold rounded-xl text-xs hover:bg-brand-accent-hover transition-all flex items-center justify-center gap-2">
                  <Zap className="w-3.5 h-3.5" />
                  Learn
                </button>
                <button className="p-3 bg-brand-card-hover text-brand-secondary rounded-xl hover:text-brand-destructive transition-all">
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      ) : (
        <div className="py-20 text-center bg-brand-card border border-brand-border rounded-[32px] border-dashed text-brand-primary">
          <Database className="w-12 h-12 text-brand-secondary/20 mx-auto mb-4" />
          <h3 className="text-xl font-bold mb-2">No datasets connected</h3>
          <p className="text-brand-secondary text-sm mb-8">Connect external data sources like CRM, Support, or Analytics.</p>
          <button className="px-8 py-3 bg-brand-accent text-brand-accent-text font-bold rounded-xl shadow-lg shadow-brand-accent/20 hover:bg-brand-accent-hover transition-all">
            Connect First Dataset
          </button>
        </div>
      )}
    </div>
  );
}
