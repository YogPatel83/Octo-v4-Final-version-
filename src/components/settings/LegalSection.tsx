/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { ArrowRight, ExternalLink } from "lucide-react";

const legalLinks = [
  "Terms of Service",
  "Privacy Policy",
  "Refund Policy",
  "AI Usage Policy",
  "Marketplace Seller Terms",
  "Support"
];

export default function LegalSection() {
  return (
    <div className="max-w-3xl mx-auto space-y-4">
      {legalLinks.map((link) => (
        <a
          key={link}
          href="#"
          target="_blank"
          rel="noopener noreferrer"
          className="group flex items-center justify-between p-8 bg-brand-card border border-brand-border rounded-[32px] shadow-sm hover:border-brand-accent/40 hover:shadow-xl transition-all"
        >
          <span className="text-xl font-bold text-brand-primary group-hover:text-brand-accent transition-colors">{link}</span>
          <div className="w-12 h-12 rounded-2xl bg-brand-bg flex items-center justify-center text-brand-secondary group-hover:bg-brand-accent group-hover:text-brand-accent-text transition-all">
            <ArrowRight className="w-6 h-6" />
          </div>
        </a>
      ))}

      <div className="pt-12 text-center">
        <p className="text-xs font-bold text-brand-secondary uppercase tracking-widest flex items-center justify-center gap-2">
          Helm Platform Version 1.2.4
          <span className="w-1 h-1 rounded-full bg-brand-border" />
          © 2023 Acme Corp
        </p>
      </div>
    </div>
  );
}
