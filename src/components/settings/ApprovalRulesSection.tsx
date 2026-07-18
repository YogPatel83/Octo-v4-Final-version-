"use client";

/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from "react";
import { ShieldCheck, DollarSign, Cloud, MessageSquare, ShoppingBag, Plus, Edit3 } from "lucide-react";

export default function ApprovalRulesSection() {
  const [rules, setRules] = useState([
    { id: 1, title: "Money Approvals", desc: "Require approval for purchases over $—", icon: DollarSign, isToggle: false },
    { id: 2, title: "Deployment Approvals", desc: "Require approval before any deployment", icon: Cloud, isToggle: true, active: true },
    { id: 3, title: "External Message Approvals", desc: "Require approval before sending external messages", icon: MessageSquare, isToggle: true, active: false },
    { id: 4, title: "Purchase Approvals", desc: "Require approval for marketplace purchases", icon: ShoppingBag, isToggle: true, active: true },
    { id: 5, title: "Legal Approvals", desc: "Require approval for any legal action", icon: ShieldCheck, isToggle: true, active: true },
  ]);

  const toggleRule = (id: number) => {
    setRules(prev => prev.map(r => r.id === id ? { ...r, active: !r.active } : r));
  };

  return (
    <div className="space-y-8 pb-20">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-xs font-bold text-brand-secondary uppercase tracking-widest mb-1">Approval Governance</h2>
          <p className="text-sm text-brand-secondary">Set human-in-the-loop checkpoints for AI actions.</p>
        </div>
        <button className="px-6 py-2.5 bg-brand-accent text-brand-accent-text font-bold rounded-xl shadow-lg shadow-brand-accent/20 hover:bg-brand-accent-hover transition-all flex items-center gap-2">
          <Plus className="w-4 h-4" />
          Create Rule
        </button>
      </div>

      <div className="space-y-4">
        {rules.map((rule) => (
          <div key={rule.id} className="p-8 bg-brand-card border border-brand-border rounded-[32px] shadow-sm flex items-center justify-between group hover:border-brand-accent/20 transition-all">
            <div className="flex items-center gap-6">
              <div className="w-12 h-12 rounded-2xl bg-brand-bg flex items-center justify-center text-brand-secondary group-hover:bg-brand-accent/10 group-hover:text-brand-accent transition-all">
                <rule.icon className="w-6 h-6" />
              </div>
              <div>
                <h3 className="font-bold text-brand-primary">{rule.title}</h3>
                <p className="text-sm text-brand-secondary">{rule.desc}</p>
              </div>
            </div>

            {rule.isToggle ? (
              <button 
                onClick={() => toggleRule(rule.id)}
                className={`w-14 h-8 rounded-full p-1 transition-all duration-300 ${rule.active ? 'bg-brand-accent' : 'bg-brand-bg border border-brand-border'}`}
              >
                <div className={`w-6 h-6 rounded-full bg-brand-primary shadow-sm transform transition-transform duration-300 ${rule.active ? 'translate-x-6' : 'translate-x-0'}`} />
              </button>
            ) : (
              <button className="p-3 bg-brand-bg text-brand-secondary rounded-xl hover:text-brand-primary transition-all">
                <Edit3 className="w-5 h-5" />
              </button>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
