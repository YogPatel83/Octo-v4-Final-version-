"use client";

/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { motion } from "motion/react";
import Link from "next/link";

export default function CTA() {
  return (
    <section className="py-32">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div 
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="bg-brand-accent rounded-[32px] p-12 md:p-24 text-center text-brand-accent-text shadow-2xl shadow-brand-accent/30 overflow-hidden relative"
        >
          {/* Subtle background circles */}
          <div className="absolute top-0 right-0 w-96 h-96 bg-brand-accent-hover/20 rounded-full -translate-y-1/2 translate-x-1/2" />
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-brand-accent-hover/20 rounded-full translate-y-1/2 -translate-x-1/2" />
          
          <div className="relative z-10">
            <h2 className="text-4xl md:text-6xl font-bold mb-6 tracking-tight">
              Your company, running on autopilot.
            </h2>
            <p className="text-xl md:text-2xl text-brand-accent-text max-w-2xl mx-auto mb-10 leading-relaxed">
              Focus on the big picture while your AI workforce handles the rest. Join thousands of founders today.
            </p>
              <Link href="/signup" 
                className="inline-block px-10 py-5 bg-brand-accent-text text-brand-accent font-bold rounded-2xl hover:opacity-90 transition-all text-xl shadow-xl"
              >
              Start Free
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
