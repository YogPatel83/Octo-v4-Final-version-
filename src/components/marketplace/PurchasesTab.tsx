"use client";

/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { ShoppingBag } from "lucide-react";

const purchases = [
  {
    id: 1,
    name: "Market Research Specialist",
    type: "Agent",
    seller: "InsightCorp",
    date: "Oct 24, 2023",
    status: "Installed",
  }
];

interface PurchasesTabProps {
  onBrowse: () => void;
}

export default function PurchasesTab({ onBrowse }: PurchasesTabProps) {
  return (
    <div className="bg-brand-card border border-brand-border rounded-[32px] overflow-hidden shadow-sm">
      {purchases.length > 0 ? (
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="border-b border-brand-border bg-brand-bg/30">
                <th className="px-6 py-4 text-xs font-bold text-brand-secondary uppercase tracking-widest">Item</th>
                <th className="px-6 py-4 text-xs font-bold text-brand-secondary uppercase tracking-widest">Type</th>
                <th className="px-6 py-4 text-xs font-bold text-brand-secondary uppercase tracking-widest">Seller</th>
                <th className="px-6 py-4 text-xs font-bold text-brand-secondary uppercase tracking-widest">Date</th>
                <th className="px-6 py-4 text-xs font-bold text-brand-secondary uppercase tracking-widest">Status</th>
                <th className="px-6 py-4"></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-brand-border">
              {purchases.map((item) => (
                <tr key={item.id} className="hover:bg-brand-card-hover transition-colors">
                  <td className="px-6 py-4 font-bold text-brand-primary">{item.name}</td>
                  <td className="px-6 py-4 text-sm text-brand-secondary">{item.type}</td>
                  <td className="px-6 py-4 text-sm text-brand-secondary">{item.seller}</td>
                  <td className="px-6 py-4 text-sm text-brand-secondary">{item.date}</td>
                  <td className="px-6 py-4">
                    <span className="px-2 py-0.5 bg-status-active-bg text-status-active-text text-[10px] font-bold rounded-full border border-brand-border uppercase tracking-widest">
                      {item.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <button className="px-4 py-1.5 bg-brand-bg text-brand-primary font-bold rounded-lg text-xs hover:bg-brand-card-hover transition-all">
                      Manage
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <div className="py-24 flex flex-col items-center justify-center text-center">
          <div className="w-16 h-16 rounded-full bg-brand-bg flex items-center justify-center text-brand-secondary mb-6">
            <ShoppingBag className="w-8 h-8" />
          </div>
          <h3 className="text-xl font-bold text-brand-primary mb-2">No purchases yet</h3>
          <p className="text-brand-secondary max-w-sm mb-8">
            When you purchase items from the marketplace, they'll appear here.
          </p>
          <button 
            onClick={onBrowse}
            className="px-8 py-3 bg-brand-accent text-brand-accent-text font-bold rounded-xl shadow-lg shadow-brand-accent/20 hover:bg-brand-accent-hover transition-all"
          >
            Browse Marketplace
          </button>
        </div>
      )}
    </div>
  );
}
