"use client";

/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import Link from "next/link";
import { usePathname } from "next/navigation";
import { 
  Home, 
  Users, 
  Cpu, 
  BookOpen, 
  ShoppingBag, 
  Settings, 
  ChevronRight,
  LogOut
} from "lucide-react";

const navItems = [
  { icon: Home, label: "Home", href: "/home", badge: 3 },
  { icon: Users, label: "Workforce", href: "/workforce" },
  { icon: Cpu, label: "Build", href: "/build" },
  { icon: BookOpen, label: "Knowledge", href: "/knowledge" },
  { icon: ShoppingBag, label: "Marketplace", href: "/marketplace" },
  { icon: Settings, label: "Settings", href: "/settings" },
];

export default function Sidebar() {
  const pathname = usePathname();
  
  return (
    <aside className="fixed inset-y-0 left-0 w-[240px] bg-brand-sidebar border-r border-brand-border flex flex-col z-40">
      <div className="p-6">
        <Link href="/" className="text-2xl font-bold tracking-tighter text-brand-primary">
          Helm
        </Link>
      </div>
      
      <nav className="flex-1 px-4 space-y-1">
        {navItems.map((item) => {
          const isActive = pathname === item.href;
          const Icon = item.icon;
          
          return (
            <Link
              key={item.label}
              href={item.href}
              className={`flex items-center justify-between px-3 py-2.5 rounded-xl transition-all group relative overflow-hidden ${
                isActive 
                  ? 'bg-brand-card-hover text-brand-primary font-semibold border-l-4 border-brand-accent' 
                  : 'text-nav-default hover:bg-brand-nav-hover hover:text-brand-primary'
              }`}
            >
              <div className="flex items-center gap-3">
                <Icon className={`w-5 h-5 ${isActive ? 'text-brand-accent' : 'text-nav-default group-hover:text-brand-primary'}`} />
                <span className="text-sm">{item.label}</span>
              </div>
              {item.badge && (
                <div className="w-5 h-5 rounded-full bg-approval-badge-bg text-approval-badge-text text-[10px] flex items-center justify-center font-bold">
                  {item.badge}
                </div>
              )}
            </Link>
          );
        })}
      </nav>
      
      <div className="p-4 border-t border-brand-border">
        <button className="w-full p-3 rounded-xl hover:bg-brand-card-hover transition-all flex items-center gap-3 group text-left">
          <div className="w-10 h-10 rounded-full bg-brand-primary/10 flex items-center justify-center text-brand-primary font-bold">
            JD
          </div>
          <div className="flex-1 min-w-0">
            <div className="text-sm font-bold text-brand-primary truncate">John Doe</div>
            <div className="text-xs text-brand-secondary truncate">john@acme.com</div>
          </div>
          <Settings className="w-4 h-4 text-brand-secondary group-hover:text-brand-primary" />
        </button>
      </div>
    </aside>
  );
}
