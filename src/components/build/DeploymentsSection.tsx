/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Github, Database, Cloud, Globe, Monitor } from "lucide-react";

const deployments = [
  { name: "GitHub", status: "Not connected", icon: Github },
  { name: "Supabase", status: "Not connected", icon: Database },
  { name: "Vercel", status: "Not connected", icon: Cloud },
  { name: "Domain", status: "Not connected", icon: Globe },
  { name: "Preview Environments", status: "Not configured", icon: Monitor },
];

export default function DeploymentsSection() {
  return (
    <div className="space-y-6">
      <h2 className="text-xs font-bold text-brand-secondary uppercase tracking-widest">Deployments</h2>

      <div className="space-y-3">
        {deployments.map((item) => (
          <div 
            key={item.name}
            className="p-4 bg-brand-card border border-brand-border rounded-2xl flex items-center justify-between shadow-sm group hover:border-brand-accent/20 transition-all"
          >
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-brand-bg flex items-center justify-center text-brand-secondary group-hover:bg-brand-accent/5 group-hover:text-brand-accent transition-all">
                <item.icon className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-sm font-bold text-brand-primary">{item.name}</h4>
                <div className="text-[10px] font-bold text-brand-secondary uppercase tracking-widest flex items-center gap-1.5">
                  <div className="w-1.5 h-1.5 rounded-full bg-brand-border" />
                  {item.status}
                </div>
              </div>
            </div>
            <button className="px-3 py-1.5 bg-brand-bg text-brand-primary border border-brand-border rounded-lg text-xs font-bold hover:bg-brand-card-hover transition-all">
              {item.name === 'Preview Environments' ? 'Set up' : 'Connect'}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
