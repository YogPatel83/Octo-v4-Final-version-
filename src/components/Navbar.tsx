/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import Link from "next/link";

export default function Navbar() {
  return (
    <nav className="sticky top-0 z-50 w-full bg-brand-topbar/80 backdrop-blur-md border-b border-brand-border">
      <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2">
          <span className="text-2xl font-bold tracking-tighter text-brand-primary">Helm</span>
        </Link>
        
        <div className="hidden md:flex items-center gap-8">
          <Link href="/pricing" className="text-sm font-medium text-brand-secondary hover:text-brand-primary transition-colors">
            Pricing
          </Link>
          <Link href="/login" className="text-sm font-medium text-brand-secondary hover:text-brand-primary transition-colors">
            Login
          </Link>
          <Link href="/signup" 
            className="px-5 py-2.5 bg-brand-accent text-brand-accent-text text-sm font-semibold rounded-lg hover:bg-brand-accent-hover transition-all shadow-sm shadow-brand-accent/20"
          >
            Start Free
          </Link>
        </div>
        
        {/* Mobile menu button could go here if needed, keeping it simple as requested */}
      </div>
    </nav>
  );
}
