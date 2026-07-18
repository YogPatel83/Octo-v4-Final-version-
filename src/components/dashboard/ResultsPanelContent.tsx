/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { FileText, Megaphone, FileBox, ExternalLink } from "lucide-react";

const results = [
  { type: "Report", title: "Japan Market Entry Strategy", time: "2h ago", icon: FileText },
  { type: "Campaign", title: "Autumn Product Launch Email", time: "5h ago", icon: Megaphone },
  { type: "Document", title: "Q3 Stakeholder Summary", time: "Yesterday", icon: FileBox },
  { type: "Document", title: "Legal Review - NDA Draft", time: "2 days ago", icon: FileBox },
  { type: "Report", title: "Sales Performance Q2", time: "3 days ago", icon: FileText },
];

export default function ResultsPanelContent() {
  return (
    <div className="space-y-3">
      {results.map((item, i) => (
        <div 
          key={i} 
          className="p-4 bg-brand-card border border-brand-border rounded-2xl flex items-center justify-between hover:border-brand-accent/30 transition-all group cursor-pointer"
        >
          <div className="flex items-center gap-4">
            <div className="w-10 h-10 rounded-xl bg-brand-bg flex items-center justify-center text-brand-secondary group-hover:bg-brand-accent/5 group-hover:text-brand-accent transition-all">
              <item.icon className="w-5 h-5" />
            </div>
            <div>
              <div className="font-bold text-brand-primary text-sm group-hover:text-brand-accent transition-all">{item.title}</div>
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-bold text-brand-secondary uppercase tracking-widest">{item.type}</span>
                <span className="w-1 h-1 rounded-full bg-brand-border" />
                <span className="text-[10px] font-medium text-brand-secondary">{item.time}</span>
              </div>
            </div>
          </div>
          <ExternalLink className="w-4 h-4 text-brand-border group-hover:text-brand-accent transition-all" />
        </div>
      ))}
    </div>
  );
}
