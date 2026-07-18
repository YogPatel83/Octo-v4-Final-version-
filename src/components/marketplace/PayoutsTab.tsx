/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { DollarSign, History } from "lucide-react";

export default function PayoutsTab() {
  const cards = [
    { label: "Available Balance", amount: "$0.00", color: "text-brand-accent" },
    { label: "Pending", amount: "$0.00", color: "text-status-paused-text" },
    { label: "Total Earned", amount: "$0.00", color: "text-brand-primary" },
  ];

  return (
    <div className="space-y-12">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-brand-primary">
        {cards.map((card) => (
          <div key={card.label} className="bg-brand-card border border-brand-border rounded-[32px] p-8 shadow-sm">
            <div className="text-xs font-bold text-brand-secondary uppercase tracking-widest mb-4">{card.label}</div>
            <div className={`text-4xl font-black ${card.color} tracking-tighter mb-8`}>{card.amount}</div>
            <button 
              disabled={true}
              className={`w-full py-3 font-bold rounded-xl text-sm transition-all ${
                card.label === "Available Balance" 
                  ? "bg-brand-accent text-brand-accent-text opacity-50 cursor-not-allowed" 
                  : "bg-brand-card-hover text-brand-secondary border border-brand-border"
              }`}
            >
              {card.label === "Available Balance" ? "Request Payout" : "View Details"}
            </button>
          </div>
        ))}
      </div>

      <div className="bg-brand-card border border-brand-border rounded-[32px] overflow-hidden shadow-sm">
        <div className="p-8 border-b border-brand-border flex items-center justify-between">
          <h3 className="text-xl font-bold text-brand-primary">Payout History</h3>
        </div>
        <div className="py-24 flex flex-col items-center justify-center text-center">
          <div className="w-16 h-16 rounded-full bg-brand-card-hover flex items-center justify-center text-brand-secondary/20 mb-6">
            <History className="w-8 h-8" />
          </div>
          <p className="text-brand-secondary font-medium">No payouts yet.</p>
        </div>
      </div>
    </div>
  );
}
