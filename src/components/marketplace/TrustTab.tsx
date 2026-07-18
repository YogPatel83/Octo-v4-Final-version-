/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { ShieldCheck, Star, MessageSquare, AlertCircle, TrendingUp } from "lucide-react";

export default function TrustTab() {
  const metrics = [
    { label: "Verification Status", value: "Not Verified", icon: ShieldCheck, color: "text-status-paused-text", bg: "bg-status-paused-bg" },
    { label: "Trust Score", value: "—", icon: TrendingUp, color: "text-brand-accent", bg: "bg-brand-accent/10" },
    { label: "Reviews", value: "0 reviews", icon: Star, color: "text-brand-primary", bg: "bg-brand-bg" },
    { label: "Open Disputes", value: "0", icon: MessageSquare, color: "text-brand-primary", bg: "bg-brand-bg" },
    { label: "Refund Rate", value: "—%", icon: AlertCircle, color: "text-brand-primary", bg: "bg-brand-bg" },
  ];

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {metrics.map((metric) => (
          <div key={metric.label} className="bg-brand-card border border-brand-border rounded-[32px] p-8 shadow-sm flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className={`w-12 h-12 rounded-2xl ${metric.bg} flex items-center justify-center ${metric.color}`}>
                <metric.icon className="w-6 h-6" />
              </div>
              <div>
                <div className="text-xs font-bold text-brand-secondary uppercase tracking-widest mb-1">{metric.label}</div>
                <div className="text-xl font-bold text-brand-primary">{metric.value}</div>
              </div>
            </div>
            <button className="p-2 text-brand-secondary hover:text-brand-primary transition-all">
              <AlertCircle className="w-5 h-5" />
            </button>
          </div>
        ))}
      </div>

      <div className="bg-brand-card border border-brand-border rounded-[32px] p-12 text-center shadow-sm">
        <h3 className="text-2xl font-bold text-brand-primary mb-4">Building Trust</h3>
        <p className="text-brand-secondary max-w-lg mx-auto leading-relaxed">
          The Helm Marketplace is built on a foundation of verifiable trust. We use behavioral analysis, community reviews, and manual verification to ensure all assets are safe and effective.
        </p>
      </div>
    </div>
  );
}
