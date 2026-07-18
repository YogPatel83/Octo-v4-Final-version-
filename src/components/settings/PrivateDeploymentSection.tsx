"use client";

/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from "react";
import { Cloud, Server, Share2, Activity } from "lucide-react";

export default function PrivateDeploymentSection() {
  const [mode, setMode] = useState("Cloud");

  const options = [
    { id: "Cloud", title: "Helm Cloud", desc: "Fully managed, secure, scalable infrastructure.", icon: Cloud },
    { id: "Self-Hosted", title: "Self-Hosted", desc: "Deploy Helm workers in your own VPC.", icon: Server },
    { id: "Hybrid", title: "Hybrid", desc: "Mix managed cloud with on-prem execution.", icon: Share2 },
  ];

  return (
    <div className="space-y-12 pb-20">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {options.map((opt) => (
          <button
            key={opt.id}
            onClick={() => setMode(opt.id)}
            className={`p-8 rounded-[32px] border-2 text-left transition-all relative overflow-hidden ${
              mode === opt.id 
                ? 'border-brand-accent bg-brand-accent/10' 
                : 'border-brand-border bg-brand-card hover:border-brand-accent/20'
            }`}
          >
            <div className={`w-12 h-12 rounded-2xl flex items-center justify-center mb-6 ${mode === opt.id ? 'bg-brand-accent text-brand-accent-text' : 'bg-brand-bg text-brand-secondary'}`}>
              <opt.icon className="w-6 h-6" />
            </div>
            <h3 className="font-bold text-brand-primary mb-2">{opt.title}</h3>
            <p className="text-xs text-brand-secondary leading-relaxed">{opt.desc}</p>
          </button>
        ))}
      </div>

      {(mode === "Self-Hosted" || mode === "Hybrid") && (
        <div className="bg-brand-card border border-brand-border rounded-[32px] p-10 shadow-sm space-y-8 animate-in fade-in slide-in-from-top-4 duration-500">
          <div className="flex items-center justify-between border-b border-brand-border pb-6">
            <h3 className="text-xl font-bold text-brand-primary">Worker Configuration</h3>
            <div className="flex items-center gap-2 px-3 py-1 bg-status-paused-bg text-status-paused-text rounded-full text-[10px] font-bold border border-brand-border uppercase tracking-widest">
              <Activity className="w-3 h-3" />
              Not Connected
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-2">
              <label className="text-xs font-bold text-brand-secondary uppercase tracking-widest">Worker URL</label>
              <input type="text" className="w-full px-4 py-3 rounded-xl border border-brand-border bg-brand-input-bg text-brand-input-text outline-none focus:ring-2 focus:ring-brand-accent/20" placeholder="https://helm-worker.internal.acme.com" />
            </div>
            <div className="space-y-2">
              <label className="text-xs font-bold text-brand-secondary uppercase tracking-widest">Health Check Endpoint</label>
              <input type="text" className="w-full px-4 py-3 rounded-xl border border-brand-border bg-brand-input-bg text-brand-input-text outline-none focus:ring-2 focus:ring-brand-accent/20" placeholder="/health" />
            </div>
          </div>

          <div className="pt-6">
            <button className="px-8 py-3 bg-brand-accent text-brand-accent-text font-bold rounded-xl shadow-lg shadow-brand-accent/20 hover:bg-brand-accent-hover transition-all">
              Save Configuration
            </button>
          </div>
        </div>
      )}

      {mode === "Cloud" && (
        <div className="p-12 text-center bg-brand-card border border-brand-border rounded-[32px] shadow-sm">
          <p className="text-brand-secondary font-medium italic">
            You are currently using Helm Cloud for all autonomous execution. No additional configuration required.
          </p>
        </div>
      )}
    </div>
  );
}
