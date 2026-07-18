"use client";

/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Check, X, ShieldAlert, DollarSign, Send } from "lucide-react";

interface Approval {
  id: number;
  type: "Money" | "Deployment" | "Messages";
  title: string;
  reason: string;
  risk: "Low" | "Medium" | "High";
  cost?: string;
}

const initialApprovals: Approval[] = [
  { 
    id: 1, 
    type: "Money", 
    title: "AWS Bill Payment", 
    reason: "Monthly infrastructure payment for production systems.", 
    risk: "Low",
    cost: "$1,240.00"
  },
  { 
    id: 2, 
    type: "Deployment", 
    title: "Deploy V2.4 to Main", 
    reason: "Contains 3 new features and 12 security patches.", 
    risk: "High" 
  },
  { 
    id: 3, 
    type: "Messages", 
    title: "Response to VIP Client", 
    reason: "Drafted response to inquiry about partnership expansion.", 
    risk: "Medium" 
  }
];

export default function ApprovalsPanelContent() {
  const [approvals, setApprovals] = useState(initialApprovals);
  const [activeFilter, setActiveFilter] = useState("All");
  
  const handleAction = (id: number) => {
    setApprovals(prev => prev.filter(a => a.id !== id));
  };

  const filtered = approvals.filter(a => activeFilter === "All" || a.type === activeFilter);

  return (
    <div className="space-y-6">
      <div className="flex gap-2 p-1 bg-brand-bg rounded-xl border border-brand-border">
        {["All", "Money", "Deployment", "Messages"].map(filter => (
          <button
            key={filter}
            onClick={() => setActiveFilter(filter)}
            className={`flex-1 py-2 text-xs font-bold rounded-lg transition-all ${
              activeFilter === filter 
                ? "bg-brand-accent text-brand-accent-text shadow-sm" 
                : "bg-brand-card text-brand-secondary border border-brand-border hover:text-brand-primary"
            }`}
          >
            {filter}
          </button>
        ))}
      </div>
      
      <div className="space-y-4">
        <AnimatePresence mode="popLayout">
          {filtered.length > 0 ? (
            filtered.map((item) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, x: 20 }}
                className="p-5 bg-brand-card border border-brand-border rounded-2xl shadow-sm"
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${
                      item.type === "Money" ? "bg-status-active-bg text-status-active-text" :
                      item.type === "Deployment" ? "bg-status-paused-bg text-status-paused-text" : "bg-brand-accent/10 text-brand-accent"
                    }`}>
                      {item.type === "Money" && <DollarSign className="w-4 h-4" />}
                      {item.type === "Deployment" && <ShieldAlert className="w-4 h-4" />}
                      {item.type === "Messages" && <Send className="w-4 h-4" />}
                    </div>
                    <div>
                      <h4 className="font-bold text-brand-primary">{item.title}</h4>
                      <div className={`text-[10px] font-black uppercase tracking-widest ${
                        item.risk === "High" ? "text-status-failed-text" :
                        item.risk === "Medium" ? "text-status-paused-text" : "text-status-active-text"
                      }`}>
                        {item.risk} Risk
                      </div>
                    </div>
                  </div>
                  {item.cost && <div className="font-bold text-brand-primary">{item.cost}</div>}
                </div>
                
                <p className="text-sm text-brand-secondary mb-6 leading-relaxed">
                  {item.reason}
                </p>
                
                <div className="flex gap-3">
                  <button 
                    onClick={() => handleAction(item.id)}
                    className="flex-1 py-2.5 bg-brand-accent text-brand-accent-text font-bold rounded-xl text-sm shadow-md shadow-brand-accent/20 hover:bg-brand-accent-hover transition-all flex items-center justify-center gap-2"
                  >
                    <Check className="w-4 h-4" />
                    Approve
                  </button>
                  <button 
                    onClick={() => handleAction(item.id)}
                    className="flex-1 py-2.5 text-brand-destructive font-bold rounded-xl text-sm hover:bg-brand-destructive/10 transition-all flex items-center justify-center gap-2"
                  >
                    <X className="w-4 h-4" />
                    Reject
                  </button>
                </div>
              </motion.div>
            ))
          ) : (
            <div className="text-center py-20">
              <Check className="w-12 h-12 text-status-active-text mx-auto mb-4 opacity-20" />
              <h3 className="font-bold text-brand-primary">All caught up!</h3>
              <p className="text-sm text-brand-secondary">No pending approvals for this category.</p>
            </div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
