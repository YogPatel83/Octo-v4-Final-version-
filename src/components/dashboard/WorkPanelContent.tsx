/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Play, Pause, CheckCircle2 } from "lucide-react";

const tasks = [
  { id: 1, name: "Market Research - Japan", agent: "ResearchBot", status: "Running", time: "2m ago" },
  { id: 2, name: "Legal Document Review", agent: "LawyerAgent", status: "Running", time: "14m ago" },
  { id: 3, name: "Sales Outreach Pipeline", agent: "SalesPro", status: "Paused", time: "1h ago" },
];

export default function WorkPanelContent() {
  return (
    <div className="space-y-4">
      {tasks.length > 0 ? (
        tasks.map((task) => (
          <div 
            key={task.id} 
            className="p-5 border border-brand-border rounded-2xl hover:border-brand-accent/30 transition-all cursor-pointer group bg-brand-card shadow-sm hover:shadow-md"
          >
            <div className="flex justify-between items-start mb-3">
              <div className="font-bold text-brand-primary group-hover:text-brand-accent transition-colors">{task.name}</div>
              <div className={`px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                task.status === "Running" 
                  ? "bg-status-active-bg text-status-active-text border border-brand-border" 
                  : "bg-status-paused-bg text-status-paused-text border border-brand-border"
              }`}>
                {task.status}
              </div>
            </div>
            
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-6 h-6 rounded bg-brand-accent/10 flex items-center justify-center text-brand-accent">
                  <Play className="w-3 h-3 fill-current" />
                </div>
                <span className="text-xs text-brand-secondary font-medium">Assigned to <span className="font-bold text-brand-primary">{task.agent}</span></span>
              </div>
              <span className="text-[10px] text-brand-secondary font-medium uppercase tracking-tighter">{task.time}</span>
            </div>
          </div>
        ))
      ) : (
        <div className="text-center py-20 text-brand-primary">
          <div className="w-12 h-12 bg-brand-card-hover rounded-full flex items-center justify-center text-brand-secondary mx-auto mb-4">
            <Pause className="w-6 h-6" />
          </div>
          <h3 className="font-bold">No active work</h3>
          <p className="text-sm text-brand-secondary">Start a new workflow to see it here.</p>
        </div>
      )}
    </div>
  );
}
