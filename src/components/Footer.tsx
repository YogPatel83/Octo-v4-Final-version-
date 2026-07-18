/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import Link from "next/link";

export default function Footer() {
  return (
    <footer className="py-20 border-t border-brand-border bg-footer-bg text-footer-text">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-start gap-12 mb-20">
          <div>
            <Link href="/" className="text-2xl font-bold tracking-tighter text-brand-primary">Helm</Link>
            <p className="mt-4 text-footer-text max-w-xs text-sm leading-relaxed">
              The company operating system for the AI generation.
            </p>
          </div>
          
          <div className="flex flex-wrap gap-x-16 gap-y-8">
            <div className="flex flex-col gap-4">
              <span className="text-xs font-bold uppercase tracking-widest text-brand-primary">Product</span>
              <Link href="/pricing" className="text-sm text-footer-link hover:text-brand-primary transition-colors">Pricing</Link>
              <Link href="/login" className="text-sm text-footer-link hover:text-brand-primary transition-colors">Login</Link>
              <Link href="/signup" className="text-sm text-footer-link hover:text-brand-primary transition-colors">Sign Up</Link>
            </div>
            
            <div className="flex flex-col gap-4">
              <span className="text-xs font-bold uppercase tracking-widest text-brand-primary">Company</span>
              <Link href="/about" className="text-sm text-footer-link hover:text-brand-primary transition-colors">About</Link>
              <Link href="/blog" className="text-sm text-footer-link hover:text-brand-primary transition-colors">Blog</Link>
              <Link href="/careers" className="text-sm text-footer-link hover:text-brand-primary transition-colors">Careers</Link>
            </div>
            
            <div className="flex flex-col gap-4">
              <span className="text-xs font-bold uppercase tracking-widest text-brand-primary">Legal</span>
              <Link href="/terms" className="text-sm text-footer-link hover:text-brand-primary transition-colors">Terms</Link>
              <Link href="/privacy" className="text-sm text-footer-link hover:text-brand-primary transition-colors">Privacy</Link>
              <Link href="/support" className="text-sm text-footer-link hover:text-brand-primary transition-colors">Support</Link>
            </div>
          </div>
        </div>
        
        <div className="flex flex-col md:flex-row justify-between items-center gap-6 pt-8 border-t border-brand-border text-footer-text text-sm">
          <div>© 2025 Helm. All rights reserved.</div>
          <div className="flex gap-8">
            <a href="#" className="hover:text-brand-primary transition-colors">Twitter</a>
            <a href="#" className="hover:text-brand-primary transition-colors">LinkedIn</a>
            <a href="#" className="hover:text-brand-primary transition-colors">GitHub</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
