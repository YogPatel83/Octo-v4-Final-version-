"use client";

/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from "react";
import { motion } from "motion/react";
import { 
  Plus, 
  Users, 
  Edit3, 
  Pause, 
  Copy, 
  Trash2,
  ExternalLink,
  ShieldAlert
} from "lucide-react";
import SidePanel from "../dashboard/SidePanel";

const teams = [
  {
    id: 1,
    name: "Marketing Team",
    purpose: "Handle all marketing campaigns",
    leader: "Marketing Agent",
    members: ["MA", "RA", "CW", "SA"],
    status: "Active",
    budget: "500 credits / month"
  },
  {
    id: 2,
    name: "Legal Review Squad",
    purpose: "Analyze and flag contract risks",
    leader: "Legal Agent",
    members: ["LA", "RA"],
    status: "Active",
    budget: "200 credits / month"
  }
];

export default function TeamsTab() {
  const [createPanelOpen, setCreatePanelOpen] = useState(false);

  return (
    <div className="space-y-8">
      <div className="flex justify-end gap-3">
        <button 
          onClick={() => setCreatePanelOpen(true)}
          className="px-6 py-2.5 bg-brand-accent text-brand-accent-text font-bold rounded-xl shadow-lg shadow-brand-accent/20 flex items-center gap-2 hover:bg-brand-accent-hover transition-all"
        >
          <Plus className="w-4 h-4" />
          Create Team
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {teams.map((team) => (
          <motion.div 
            key={team.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="p-8 bg-brand-card border border-brand-border rounded-2xl shadow-sm hover:border-brand-accent/40 transition-all group"
          >
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-brand-accent/10 flex items-center justify-center text-brand-accent">
                  <Users className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="font-bold text-brand-primary">{team.name}</h3>
                  <div className="text-xs text-brand-secondary">{team.purpose}</div>
                </div>
              </div>
              <div className="px-2.5 py-1 bg-status-active-bg text-status-active-text rounded-full text-[10px] font-bold border border-brand-border flex items-center gap-1.5 uppercase tracking-wider">
                <div className="w-1.5 h-1.5 rounded-full bg-status-active-text" />
                {team.status}
              </div>
            </div>

            <div className="space-y-4 mb-8">
              <div className="flex justify-between items-center text-sm">
                <span className="text-brand-secondary">Leader</span>
                <span className="font-bold text-brand-primary">{team.leader}</span>
              </div>
              <div className="flex justify-between items-center text-sm">
                <span className="text-brand-secondary">Members</span>
                <div className="flex -space-x-2">
                  {team.members.map((m, i) => (
                    <div key={i} className="w-8 h-8 rounded-full bg-brand-bg border-2 border-brand-card flex items-center justify-center text-[10px] font-bold text-brand-primary">
                      {m}
                    </div>
                  ))}
                </div>
              </div>
              <div className="flex justify-between items-center text-sm">
                <span className="text-brand-secondary">Budget</span>
                <span className="font-bold text-brand-accent">{team.budget}</span>
              </div>
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
              <button className="px-5 py-2.5 bg-brand-bg text-brand-primary font-bold rounded-xl text-xs hover:bg-brand-card-hover transition-all flex items-center gap-2">
                Open Details
                <ExternalLink className="w-3.5 h-3.5" />
              </button>
            </div>
          </motion.div>
        ))}
      </div>

      <SidePanel isOpen={createPanelOpen} onClose={() => setCreatePanelOpen(false)} title="Create Team">
        <CreateTeamContent onClose={() => setCreatePanelOpen(false)} />
      </SidePanel>
    </div>
  );
}

function CreateTeamContent({ onClose }: { onClose: () => void }) {
  return (
    <div className="space-y-6 pb-24 text-brand-primary">
      <div className="space-y-4">
        <div>
          <label className="block text-xs font-bold uppercase tracking-widest text-brand-secondary mb-2">Team Name</label>
          <input type="text" className="w-full px-4 py-3 rounded-xl border border-brand-border focus:ring-2 focus:ring-brand-accent/20 focus:border-brand-accent outline-none bg-brand-input-bg text-brand-input-text" placeholder="e.g. Marketing Team" />
        </div>
        <div>
          <label className="block text-xs font-bold uppercase tracking-widest text-brand-secondary mb-2">Purpose</label>
          <textarea className="w-full px-4 py-3 rounded-xl border border-brand-border focus:ring-2 focus:ring-brand-accent/20 focus:border-brand-accent outline-none min-h-[100px] bg-brand-input-bg text-brand-input-text" placeholder="What is this team's primary goal?" />
        </div>
        <div>
          <label className="block text-xs font-bold uppercase tracking-widest text-brand-secondary mb-2">Leader</label>
          <select className="w-full px-4 py-3 rounded-xl border border-brand-border focus:ring-2 focus:ring-brand-accent/20 focus:border-brand-accent outline-none appearance-none bg-brand-input-bg text-brand-input-text">
            <option>Select Leader Agent...</option>
            <option>Marketing Agent</option>
            <option>Legal Agent</option>
            <option>Research Agent</option>
          </select>
        </div>
        <div>
          <label className="block text-xs font-bold uppercase tracking-widest text-brand-secondary mb-2">Budget (Credits / Month)</label>
          <input type="number" className="w-full px-4 py-3 rounded-xl border border-brand-border focus:ring-2 focus:ring-brand-accent/20 focus:border-brand-accent outline-none bg-brand-input-bg text-brand-input-text" placeholder="500" />
        </div>
        
        <div>
          <label className="block text-xs font-bold uppercase tracking-widest text-brand-secondary mb-4">Approval Rules</label>
          <div className="p-4 bg-brand-bg rounded-xl border border-brand-border flex items-center gap-4 text-sm text-brand-secondary">
            <ShieldAlert className="w-5 h-5 text-status-paused-text" />
            Every major action requires human approval by default.
          </div>
        </div>
      </div>

      <div className="fixed bottom-0 right-0 w-full max-w-[480px] p-6 bg-brand-modal border-t border-brand-border flex gap-4">
        <button onClick={onClose} className="flex-1 py-3 bg-brand-accent text-brand-accent-text font-bold rounded-xl shadow-lg shadow-brand-accent/20 hover:bg-brand-accent-hover transition-all">
          Create Team
        </button>
        <button onClick={onClose} className="flex-1 py-3 bg-brand-card text-brand-primary border border-brand-border font-bold rounded-xl hover:bg-brand-card-hover transition-all">
          Cancel
        </button>
      </div>
    </div>
  );
}
