/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Monitor, Smartphone, History, Shield, Lock } from "lucide-react";

export default function SecuritySection() {
  return (
    <div className="space-y-10 pb-20">
      <section className="space-y-4">
        <h2 className="text-xs font-bold text-brand-secondary uppercase tracking-widest mb-6">Device Governance</h2>
        
        <div className="bg-brand-card border border-brand-border rounded-[32px] overflow-hidden shadow-sm">
          <div className="p-6 border-b border-brand-border bg-brand-bg/30">
            <h3 className="font-bold text-brand-primary text-sm">Active Sessions</h3>
          </div>
          <div className="p-8 space-y-6 text-brand-primary">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-xl bg-brand-bg flex items-center justify-center text-brand-accent">
                  <Monitor className="w-5 h-5" />
                </div>
                <div>
                  <div className="font-bold text-brand-primary">Chrome on MacOS <span className="ml-2 text-[10px] font-bold text-brand-accent uppercase tracking-widest bg-brand-accent/10 px-2 py-0.5 rounded">This device</span></div>
                  <div className="text-xs text-brand-secondary font-medium tracking-tight">San Francisco, USA • Active now</div>
                </div>
              </div>
              <button disabled className="px-4 py-2 bg-brand-bg text-brand-secondary font-bold rounded-lg text-xs opacity-50 cursor-not-allowed uppercase tracking-widest">
                Revoke
              </button>
            </div>
          </div>
        </div>

        <div className="bg-brand-card border border-brand-border rounded-[32px] overflow-hidden shadow-sm">
          <div className="p-6 border-b border-brand-border bg-brand-bg/30">
            <h3 className="font-bold text-brand-primary text-sm">Connected Devices</h3>
          </div>
          <div className="p-8 text-brand-primary">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-xl bg-brand-bg flex items-center justify-center text-brand-secondary">
                  <Smartphone className="w-5 h-5" />
                </div>
                <div>
                  <div className="font-bold text-brand-primary">iPhone 15 Pro</div>
                  <div className="text-xs text-brand-secondary font-medium tracking-tight">Last active 2 days ago</div>
                </div>
              </div>
              <button className="px-4 py-2 bg-brand-bg text-brand-primary font-bold rounded-lg text-xs hover:text-brand-destructive transition-all uppercase tracking-widest">
                Revoke
              </button>
            </div>
          </div>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-xs font-bold text-brand-secondary uppercase tracking-widest mb-6">System Audit</h2>
        <div className="bg-brand-card border border-brand-border rounded-[32px] overflow-hidden shadow-sm">
          <div className="p-6 border-b border-brand-border bg-brand-bg/30">
            <h3 className="font-bold text-brand-primary text-sm">Audit Log</h3>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="bg-brand-bg/50 text-[10px] font-bold text-brand-secondary uppercase tracking-widest border-b border-brand-border">
                  <th className="px-8 py-4">Timestamp</th>
                  <th className="px-8 py-4">Action</th>
                  <th className="px-8 py-4">Actor</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-brand-border">
                {[
                  { time: "2023-10-25 14:22", action: "API Key Added", actor: "John Doe" },
                  { time: "2023-10-24 09:15", action: "Settings Updated", actor: "System" },
                  { time: "2023-10-23 18:40", action: "Login Success", actor: "John Doe" },
                ].map((log, i) => (
                  <tr key={i} className="hover:bg-brand-card-hover transition-colors">
                    <td className="px-8 py-4 text-xs text-brand-secondary font-mono">{log.time}</td>
                    <td className="px-8 py-4 text-sm font-bold text-brand-primary">{log.action}</td>
                    <td className="px-8 py-4 text-sm text-brand-secondary">{log.actor}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-xs font-bold text-brand-secondary uppercase tracking-widest mb-6">Safety Settings</h2>
        <div className="bg-brand-card border border-brand-border rounded-[32px] p-8 shadow-sm space-y-6 text-brand-primary">
          {[
            { title: "File Safety", desc: "Scan all uploaded files for sensitive data and malware.", icon: Shield },
            { title: "Prompt Safety", desc: "Filter AI prompts for enterprise policy compliance.", icon: Lock },
            { title: "Connected Systems Safety", desc: "Monitor external system interactions for unusual activity.", icon: Monitor },
          ].map((item) => (
            <div key={item.title} className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-xl bg-brand-bg flex items-center justify-center text-brand-secondary">
                  <item.icon className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-bold text-sm text-brand-primary">{item.title}</h4>
                  <p className="text-xs text-brand-secondary">{item.desc}</p>
                </div>
              </div>
              <button className="w-12 h-6 rounded-full bg-brand-accent p-1">
                <div className="w-4 h-4 rounded-full bg-brand-primary translate-x-6" />
              </button>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
