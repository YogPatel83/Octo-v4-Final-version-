"use client";

/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from "react";
import { motion } from "motion/react";
import { 
  Plus, 
  Download, 
  ExternalLink, 
  Edit3, 
  Pause, 
  Copy, 
  Trash2,
  Brain
} from "lucide-react";
import SidePanel from "../dashboard/SidePanel";

const agents = [
  {
    id: 1,
    name: "Research Agent",
    role: "Market Research Specialist",
    status: "Active",
    model: "GPT-4o",
    skills: 12,
    lastActive: "2 hours ago",
    color: "bg-brand-accent"
  },
  {
    id: 2,
    name: "Content Writer",
    role: "SEO & Copywriting",
    status: "Active",
    model: "Claude 3.5 Sonnet",
    skills: 8,
    lastActive: "5 hours ago",
    color: "bg-brand-accent"
  }
];

export default function AgentsTab() {
  const [createPanelOpen, setCreatePanelOpen] = useState(false);
  const [detailPanelOpen, setDetailPanelOpen] = useState(false);
  const [selectedAgent, setSelectedAgent] = useState<any>(null);

  const openDetails = (agent: any) => {
    setSelectedAgent(agent);
    setDetailPanelOpen(true);
  };

  return (
    <div className="space-y-8">
      <div className="flex justify-end gap-3">
        <button 
          onClick={() => setCreatePanelOpen(true)}
          className="px-6 py-2.5 bg-brand-accent text-brand-accent-text font-bold rounded-xl shadow-lg shadow-brand-accent/20 flex items-center gap-2 hover:bg-brand-accent-hover transition-all"
        >
          <Plus className="w-4 h-4" />
          Create Agent
        </button>
        <button className="px-6 py-2.5 bg-brand-card text-brand-primary border border-brand-border font-bold rounded-xl flex items-center gap-2 hover:bg-brand-card-hover transition-all">
          <Download className="w-4 h-4" />
          Import Agent
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {agents.map((agent) => (
          <motion.div 
            key={agent.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="p-6 bg-brand-card border border-brand-border rounded-2xl shadow-sm hover:border-brand-accent/40 transition-all group cursor-pointer"
            onClick={() => openDetails(agent)}
          >
            <div className="flex items-center gap-4 mb-6">
              <div className={`w-12 h-12 rounded-full ${agent.color} text-brand-accent-text flex items-center justify-center font-bold text-xl`}>
                {agent.name[0]}
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="font-bold text-brand-primary truncate">{agent.name}</h3>
                <p className="text-xs text-brand-secondary truncate">{agent.role}</p>
              </div>
              <div className="px-2 py-1 bg-status-active-bg text-status-active-text rounded-full text-[10px] font-bold border border-brand-border flex items-center gap-1.5 uppercase">
                <div className="w-1.5 h-1.5 rounded-full bg-status-active-text" />
                {agent.status}
              </div>
            </div>

            <div className="space-y-3 mb-6">
              <div className="flex justify-between text-xs">
                <span className="text-brand-secondary">Model</span>
                <span className="font-bold">{agent.model}</span>
              </div>
              <div className="flex justify-between text-xs">
                <span className="text-brand-secondary">Skills</span>
                <span className="font-bold">{agent.skills} skills</span>
              </div>
              <div className="flex justify-between text-xs">
                <span className="text-brand-secondary">Last Active</span>
                <span className="font-bold">{agent.lastActive}</span>
              </div>
            </div>

            <div className="flex items-center justify-between pt-4 border-t border-brand-border">
              <div className="flex gap-1">
                {[Edit3, Pause, Copy, Trash2].map((Icon, i) => (
                  <button 
                    key={i}
                    onClick={(e) => e.stopPropagation()}
                    className="p-2 text-brand-secondary hover:text-brand-primary hover:bg-brand-card-hover rounded-lg transition-all"
                  >
                    <Icon className="w-4 h-4" />
                  </button>
                ))}
              </div>
              <button className="p-2 text-brand-accent hover:bg-brand-accent/5 rounded-lg transition-all">
                <ExternalLink className="w-4 h-4" />
              </button>
            </div>
          </motion.div>
        ))}

        <div 
          onClick={() => setCreatePanelOpen(true)}
          className="p-6 bg-brand-bg/50 border-2 border-dashed border-brand-border rounded-2xl flex flex-col items-center justify-center text-center gap-4 cursor-pointer hover:bg-brand-bg transition-all group"
        >
          <div className="w-12 h-12 rounded-full bg-brand-card border border-brand-border flex items-center justify-center text-brand-secondary group-hover:text-brand-accent group-hover:border-brand-accent/30 transition-all">
            <Plus className="w-6 h-6" />
          </div>
          <div>
            <div className="font-bold text-brand-primary">New Agent</div>
            <p className="text-xs text-brand-secondary">Hire a new AI worker</p>
          </div>
        </div>
      </div>

      <SidePanel isOpen={createPanelOpen} onClose={() => setCreatePanelOpen(false)} title="Create Agent">
        <CreateAgentContent onClose={() => setCreatePanelOpen(false)} />
      </SidePanel>

      <SidePanel isOpen={detailPanelOpen} onClose={() => setDetailPanelOpen(false)} title={selectedAgent?.name || "Agent Details"}>
        <AgentDetailContent agent={selectedAgent} onClose={() => setDetailPanelOpen(false)} />
      </SidePanel>
    </div>
  );
}

function CreateAgentContent({ onClose }: { onClose: () => void }) {
  return (
    <div className="space-y-6 pb-24">
      <div className="space-y-4">
        <div>
          <label className="block text-xs font-bold uppercase tracking-widest text-brand-secondary mb-2">Agent Name</label>
          <input type="text" className="w-full px-4 py-3 rounded-xl border border-brand-border bg-brand-input-bg text-brand-input-text focus:ring-2 focus:ring-brand-accent/20 focus:border-brand-accent outline-none" placeholder="e.g. Research Agent" />
        </div>
        <div>
          <label className="block text-xs font-bold uppercase tracking-widest text-brand-secondary mb-2">Role</label>
          <input type="text" className="w-full px-4 py-3 rounded-xl border border-brand-border bg-brand-input-bg text-brand-input-text focus:ring-2 focus:ring-brand-accent/20 focus:border-brand-accent outline-none" placeholder="e.g. Market Research Specialist" />
        </div>
        <div>
          <label className="block text-xs font-bold uppercase tracking-widest text-brand-secondary mb-2">Goal</label>
          <textarea className="w-full px-4 py-3 rounded-xl border border-brand-border bg-brand-input-bg text-brand-input-text focus:ring-2 focus:ring-brand-accent/20 focus:border-brand-accent outline-none min-h-[100px]" placeholder="What is this agent's primary purpose?" />
        </div>
        <div>
          <label className="block text-xs font-bold uppercase tracking-widest text-brand-secondary mb-2">Instructions</label>
          <textarea className="w-full px-4 py-3 rounded-xl border border-brand-border bg-brand-input-bg text-brand-input-text focus:ring-2 focus:ring-brand-accent/20 focus:border-brand-accent outline-none min-h-[150px]" placeholder="Step-by-step instructions for the agent..." />
        </div>
        
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-bold uppercase tracking-widest text-brand-secondary mb-2">Model Provider</label>
            <select className="w-full px-4 py-3 rounded-xl border border-brand-border focus:ring-2 focus:ring-brand-accent/20 focus:border-brand-accent outline-none appearance-none bg-brand-input-bg text-brand-input-text">
              <option>OpenAI</option>
              <option>Anthropic</option>
              <option>Google</option>
            </select>
          </div>
          <div>
            <label className="block text-xs font-bold uppercase tracking-widest text-brand-secondary mb-2">Model</label>
            <select className="w-full px-4 py-3 rounded-xl border border-brand-border focus:ring-2 focus:ring-brand-accent/20 focus:border-brand-accent outline-none appearance-none bg-brand-input-bg text-brand-input-text">
              <option>GPT-4o</option>
              <option>GPT-4 Turbo</option>
              <option>GPT-3.5 Turbo</option>
            </select>
          </div>
        </div>

        <div>
          <label className="block text-xs font-bold uppercase tracking-widest text-brand-secondary mb-4">API Key Source</label>
          <div className="space-y-3">
            {[
              { id: "default", label: "Use company default" },
              { id: "new", label: "Add new key" },
              { id: "none", label: "No key yet" }
            ].map(opt => (
              <label key={opt.id} className="flex items-center gap-3 cursor-pointer group">
                <input type="radio" name="apiKey" className="w-4 h-4 text-brand-accent focus:ring-brand-accent" />
                <span className="text-sm text-brand-primary group-hover:text-brand-accent transition-colors">{opt.label}</span>
              </label>
            ))}
          </div>
        </div>
      </div>

      <div className="fixed bottom-0 right-0 w-full max-w-[480px] p-6 bg-brand-modal border-t border-brand-border flex gap-4">
        <button onClick={onClose} className="flex-1 py-3 bg-brand-accent text-brand-accent-text font-bold rounded-xl shadow-lg shadow-brand-accent/20 hover:bg-brand-accent-hover transition-all">
          Create Agent
        </button>
        <button onClick={onClose} className="flex-1 py-3 bg-brand-card text-brand-primary border border-brand-border font-bold rounded-xl hover:bg-brand-card-hover transition-all">
          Cancel
        </button>
      </div>
    </div>
  );
}

function AgentDetailContent({ agent, onClose }: { agent: any, onClose: () => void }) {
  const [activeTab, setActiveTab] = useState("Overview");
  const tabs = ["Overview", "Instructions", "Model & Keys", "Permissions", "Knowledge", "Skills", "Connections", "Activity", "Usage"];

  if (!agent) return null;

  return (
    <div className="space-y-8 pb-24">
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
              <div className="text-[10px] font-bold text-brand-secondary uppercase tracking-widest mb-1">Status</div>
              <div className="font-bold text-status-active-text">{agent.status}</div>
            </div>
            <div className="p-4 bg-brand-bg rounded-2xl border border-brand-border">
              <div className="text-[10px] font-bold text-brand-secondary uppercase tracking-widest mb-1">Model</div>
              <div className="font-bold text-brand-primary">{agent.model}</div>
            </div>
          </div>

          <div className="p-6 bg-brand-card border border-brand-border rounded-2xl space-y-4">
            <div>
              <h4 className="text-xs font-bold text-brand-secondary uppercase tracking-widest mb-2">Role</h4>
              <p className="text-sm font-medium">{agent.role}</p>
            </div>
            <div>
              <h4 className="text-xs font-bold text-brand-secondary uppercase tracking-widest mb-2">Primary Goal</h4>
              <p className="text-sm text-brand-secondary leading-relaxed">
                Analyze market trends, competitor movements, and customer sentiment to provide actionable insights for product development.
              </p>
            </div>
          </div>
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center py-20 text-center">
          <div className="w-16 h-16 rounded-full bg-brand-card-hover flex items-center justify-center text-brand-secondary mb-4">
            <Brain className="w-8 h-8" />
          </div>
          <h3 className="font-bold text-brand-primary mb-2">No {activeTab.toLowerCase()} data</h3>
          <button className="mt-4 px-6 py-2.5 bg-brand-accent text-brand-accent-text font-bold rounded-xl shadow-lg shadow-brand-accent/20">
            Configure {activeTab}
          </button>
        </div>
      )}

      <div className="fixed bottom-0 right-0 w-full max-w-[480px] p-6 bg-brand-modal border-t border-brand-border grid grid-cols-4 gap-3">
        <button className="p-3 bg-brand-bg text-brand-secondary rounded-xl hover:text-brand-primary transition-all flex items-center justify-center" title="Edit">
          <Edit3 className="w-5 h-5" />
        </button>
        <button className="p-3 bg-brand-bg text-brand-secondary rounded-xl hover:text-brand-primary transition-all flex items-center justify-center" title="Pause">
          <Pause className="w-5 h-5" />
        </button>
        <button className="p-3 bg-brand-bg text-brand-secondary rounded-xl hover:text-brand-primary transition-all flex items-center justify-center" title="Clone">
          <Copy className="w-5 h-5" />
        </button>
        <button className="p-3 bg-brand-destructive/10 text-brand-destructive rounded-xl hover:bg-brand-destructive/20 transition-all flex items-center justify-center" title="Delete">
          <Trash2 className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
}
