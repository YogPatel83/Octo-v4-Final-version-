"use client";

/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from "react";
import { motion } from "motion/react";
import { 
  Plus, 
  Play, 
  Edit3, 
  Pause, 
  Copy, 
  Trash2,
  Workflow,
  Clock,
  ExternalLink,
  ChevronRight
} from "lucide-react";
import SidePanel from "../dashboard/SidePanel";

const workflows = [
  {
    id: 1,
    name: "Weekly Content Calendar",
    trigger: "Scheduled",
    steps: 5,
    status: "Active",
    lastRun: "3 days ago"
  },
  {
    id: 2,
    name: "Customer Sentiment Analysis",
    trigger: "Event",
    steps: 3,
    status: "Active",
    lastRun: "2 hours ago"
  }
];

export default function WorkflowsTab() {
  const [createPanelOpen, setCreatePanelOpen] = useState(false);

  return (
    <div className="space-y-8">
      <div className="flex justify-end gap-3">
        <button 
          onClick={() => setCreatePanelOpen(true)}
          className="px-6 py-2.5 bg-brand-accent text-brand-accent-text font-bold rounded-xl shadow-lg shadow-brand-accent/20 flex items-center gap-2 hover:bg-brand-accent-hover transition-all"
        >
          <Plus className="w-4 h-4" />
          Create Workflow
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {workflows.map((flow) => (
          <motion.div 
            key={flow.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="p-8 bg-brand-card border border-brand-border rounded-2xl shadow-sm hover:border-brand-accent/40 transition-all group"
          >
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-brand-accent/10 flex items-center justify-center text-brand-accent">
                  <Workflow className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="font-bold text-brand-primary">{flow.name}</h3>
                  <div className="flex items-center gap-2 mt-1">
                    <span className="px-2 py-0.5 bg-brand-bg text-brand-secondary text-[10px] font-bold rounded uppercase tracking-wider border border-brand-border">
                      {flow.trigger}
                    </span>
                    <span className="text-[10px] text-brand-secondary font-bold uppercase tracking-widest">{flow.steps} steps</span>
                  </div>
                </div>
              </div>
              <div className="px-2.5 py-1 bg-status-active-bg text-status-active-text rounded-full text-[10px] font-bold border border-brand-border flex items-center gap-1.5 uppercase tracking-wider">
                <div className="w-1.5 h-1.5 rounded-full bg-status-active-text" />
                {flow.status}
              </div>
            </div>

            <div className="flex items-center gap-2 mb-8 text-xs font-medium text-brand-secondary">
              <Clock className="w-3.5 h-3.5" />
              Last run {flow.lastRun}
            </div>

            <div className="flex items-center justify-between pt-6 border-t border-brand-border">
              <div className="flex gap-2">
                {[Edit3, Pause, Copy, Trash2].map((Icon, i) => (
                  <button 
                    key={i}
                    className="p-2.5 text-brand-secondary hover:text-brand-primary hover:bg-brand-card-hover rounded-xl transition-all"
                  >
                    <Icon className="w-4 h-4" />
                  </button>
                ))}
              </div>
              <button className="px-5 py-2.5 bg-brand-accent text-brand-accent-text font-bold rounded-xl text-xs hover:bg-brand-accent-hover transition-all flex items-center gap-2 shadow-md shadow-brand-accent/10">
                Run Now
                <Play className="w-3.5 h-3.5 fill-current" />
              </button>
            </div>
          </motion.div>
        ))}
      </div>

      <SidePanel isOpen={createPanelOpen} onClose={() => setCreatePanelOpen(false)} title="Create Workflow">
        <CreateWorkflowContent onClose={() => setCreatePanelOpen(false)} />
      </SidePanel>
    </div>
  );
}

function CreateWorkflowContent({ onClose }: { onClose: () => void }) {
  const [trigger, setTrigger] = useState("Manual");

  return (
    <div className="space-y-6 pb-24 text-brand-primary">
      <div className="space-y-4">
        <div>
          <label className="block text-xs font-bold uppercase tracking-widest text-brand-secondary mb-2">Workflow Name</label>
          <input type="text" className="w-full px-4 py-3 rounded-xl border border-brand-border focus:ring-2 focus:ring-brand-accent/20 focus:border-brand-accent outline-none bg-brand-input-bg text-brand-input-text" placeholder="e.g. Weekly Content Calendar" />
        </div>
        <div>
          <label className="block text-xs font-bold uppercase tracking-widest text-brand-secondary mb-2">Purpose</label>
          <textarea className="w-full px-4 py-3 rounded-xl border border-brand-border focus:ring-2 focus:ring-brand-accent/20 focus:border-brand-accent outline-none min-h-[80px] bg-brand-input-bg text-brand-input-text" placeholder="What does this workflow accomplish?" />
        </div>
        
        <div>
          <label className="block text-xs font-bold uppercase tracking-widest text-brand-secondary mb-4">Trigger Type</label>
          <div className="grid grid-cols-3 gap-3">
            {["Manual", "Scheduled", "Event"].map(type => (
              <button 
                key={type}
                onClick={() => setTrigger(type)}
                className={`py-2.5 text-xs font-bold rounded-xl border transition-all ${
                  trigger === type 
                    ? "bg-brand-accent/10 border-brand-accent text-brand-accent" 
                    : "bg-brand-card border-brand-border text-brand-secondary hover:bg-brand-card-hover"
                }`}
              >
                {type}
              </button>
            ))}
          </div>
        </div>

        {trigger === "Scheduled" && (
          <div className="p-4 bg-brand-bg rounded-xl border border-brand-border animate-in fade-in duration-300">
            <label className="block text-xs font-bold uppercase tracking-widest text-brand-secondary mb-2">Frequency</label>
            <select className="w-full px-3 py-2 rounded-lg border border-brand-border outline-none bg-brand-input-bg text-brand-input-text text-sm">
              <option>Every Monday at 9:00 AM</option>
              <option>Daily at 12:00 AM</option>
              <option>First day of each month</option>
            </select>
          </div>
        )}

        <div>
          <label className="block text-xs font-bold uppercase tracking-widest text-brand-secondary mb-4">Steps</label>
          <div className="space-y-3">
            {[1, 2].map(step => (
              <div key={step} className="flex items-center gap-3 p-3 bg-brand-card border border-brand-border rounded-xl group">
                <div className="w-6 h-6 rounded-full bg-brand-bg flex items-center justify-center text-[10px] font-black text-brand-secondary">
                  {step}
                </div>
                <div className="flex-1 text-sm font-medium text-brand-secondary">Configure step details...</div>
                <button className="p-1.5 text-brand-secondary opacity-0 group-hover:opacity-100 transition-all hover:text-brand-destructive">
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            ))}
            <button className="w-full py-3 border-2 border-dashed border-brand-border rounded-xl text-xs font-bold text-brand-secondary hover:bg-brand-bg transition-all flex items-center justify-center gap-2">
              <Plus className="w-4 h-4" />
              Add Step
            </button>
          </div>
        </div>
      </div>

      <div className="fixed bottom-0 right-0 w-full max-w-[480px] p-6 bg-brand-modal border-t border-brand-border flex gap-4">
        <button onClick={onClose} className="flex-1 py-3 bg-brand-accent text-brand-accent-text font-bold rounded-xl shadow-lg shadow-brand-accent/20 hover:bg-brand-accent-hover transition-all">
          Create Workflow
        </button>
        <button onClick={onClose} className="flex-1 py-3 bg-brand-card text-brand-primary border border-brand-border font-bold rounded-xl hover:bg-brand-card-hover transition-all">
          Cancel
        </button>
      </div>
    </div>
  );
}
