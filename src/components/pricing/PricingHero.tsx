"use client";

/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { motion } from "motion/react";

export default function PricingHero() {
  return (
    <section className="pt-24 pb-12 text-center bg-brand-bg">
      <div className="max-w-7xl mx-auto px-6">
        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-5xl md:text-6xl font-bold text-brand-primary mb-6 tracking-tight"
        >
          Pricing
        </motion.h1>
        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="text-xl text-brand-secondary"
        >
          Start free. Scale when you're ready.
        </motion.p>
      </div>
    </section>
  );
}
