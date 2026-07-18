/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { ChevronDown, Bell, Search } from "lucide-react";

export default function TopBar() {
  return (
    <header className="h-16 border-b border-brand-border bg-brand-topbar flex items-center justify-between px-8 sticky top-0 z-30">
      <div className="flex items-center gap-4">
        <button className="flex items-center gap-2 px-3 py-1.5 rounded-lg hover:bg-brand-card-hover transition-all border border-transparent hover:border-brand-border">
          <span className="font-bold text-brand-primary">Acme Corp</span>
          <ChevronDown className="w-4 h-4 text-brand-secondary" />
        </button>
        <div className="h-4 w-px bg-brand-border mx-2" />
        <div className="px-3 py-1 bg-brand-accent/10 rounded-full border border-brand-accent/20">
          <span className="text-xs font-bold text-brand-accent">847 credits</span>
        </div>
      </div>
      
      <div className="flex items-center gap-4">
        <button className="p-2 text-brand-secondary hover:text-brand-primary hover:bg-brand-card-hover rounded-lg transition-all">
          <Search className="w-5 h-5" />
        </button>
        <button className="p-2 text-brand-secondary hover:text-brand-primary hover:bg-brand-card-hover rounded-lg transition-all relative">
          <Bell className="w-5 h-5" />
          <div className="absolute top-2 right-2 w-2 h-2 bg-approval-badge-bg rounded-full border-2 border-brand-topbar" />
        </button>
        <div className="w-8 h-8 rounded-full bg-brand-accent flex items-center justify-center text-brand-accent-text text-xs font-bold border-2 border-brand-topbar shadow-sm">
          JD
        </div>
      </div>
    </header>
  );
}
