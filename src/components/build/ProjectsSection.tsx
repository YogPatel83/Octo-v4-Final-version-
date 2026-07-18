"use client";

/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Plus, Archive, MoreVertical, Layout, Globe, Box } from "lucide-react";

const projects = [
  {
    id: 1,
    name: "Marketing Site V2",
    type: "Website",
    status: "Live",
    updated: "2h ago",
    icon: Globe
  },
  {
    id: 2,
    name: "Internal CRM Tool",
    type: "Tool",
    status: "In Progress",
    updated: "Yesterday",
    icon: Box
  }
];

interface ProjectsSectionProps {
  onNewBuild: () => void;
}

export default function ProjectsSection({ onNewBuild }: ProjectsSectionProps) {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-xs font-bold text-brand-secondary uppercase tracking-widest">Projects</h2>
        <button 
          onClick={onNewBuild}
          className="p-1.5 bg-brand-accent text-brand-accent-text rounded-lg hover:bg-brand-accent-hover transition-all shadow-sm"
        >
          <Plus className="w-4 h-4" />
        </button>
      </div>

      <div className="space-y-3">
        {projects.map((project) => (
          <div 
            key={project.id}
            className="p-4 bg-brand-card border border-brand-border rounded-2xl shadow-sm hover:border-brand-accent/30 transition-all group cursor-pointer"
          >
            <div className="flex items-center gap-3 mb-3">
              <div className="w-8 h-8 rounded-lg bg-brand-bg flex items-center justify-center text-brand-secondary group-hover:text-brand-accent transition-all">
                <project.icon className="w-4 h-4" />
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="font-bold text-sm text-brand-primary truncate">{project.name}</h3>
                <span className="px-1.5 py-0.5 bg-brand-bg text-[10px] font-bold text-brand-secondary rounded border border-brand-border uppercase tracking-tighter">
                  {project.type}
                </span>
              </div>
              <button className="p-1 text-brand-secondary opacity-0 group-hover:opacity-100 transition-all">
                <MoreVertical className="w-4 h-4" />
              </button>
            </div>

            <div className="flex items-center justify-between">
              <div className={`px-2 py-0.5 rounded-full text-[10px] font-bold border ${
                project.status === 'Live' 
                  ? 'bg-status-active-bg text-status-active-text border-brand-border' 
                  : 'bg-status-paused-bg text-status-paused-text border-brand-border'
              }`}>
                {project.status}
              </div>
              <span className="text-[10px] font-medium text-brand-secondary">{project.updated}</span>
            </div>

            <div className="mt-4 flex gap-2 opacity-0 group-hover:opacity-100 transition-all pt-3 border-t border-brand-border">
              <button className="flex-1 text-[10px] font-bold text-brand-accent hover:underline uppercase tracking-widest text-left">Open</button>
              <button className="text-[10px] font-bold text-brand-secondary hover:text-brand-destructive uppercase tracking-widest">Archive</button>
            </div>
          </div>
        ))}
      </div>

      <button 
        onClick={onNewBuild}
        className="w-full py-3 bg-brand-accent text-brand-accent-text font-bold rounded-xl shadow-lg shadow-brand-accent/20 hover:bg-brand-accent-hover transition-all text-sm flex items-center justify-center gap-2"
      >
        <Plus className="w-4 h-4" />
        New Build
      </button>
    </div>
  );
}
