"use client";

/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { motion } from "motion/react";

export default function Control() {
  const points = [
    "Every major action requires your approval",
    "Nothing runs without your say",
    "Full audit trail of every decision"
  ];
  
  return (
    <section className="py-32 bg-brand-bg text-brand-primary overflow-hidden border-y border-brand-border">
      <div className="max-w-7xl mx-auto px-6 text-center">
        <motion.h2 
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="text-4xl md:text-6xl font-bold mb-20 tracking-tight"
        >
          You stay in control. Always.
        </motion.h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {points.map((point, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="text-xl md:text-2xl font-medium text-brand-secondary"
            >
              {point}
            </motion.div>
          ))}
        </div>
        
        {/* Abstract design element */}
        <div className="mt-32 relative h-1 w-full bg-brand-border rounded-full overflow-hidden">
          <motion.div 
            initial={{ left: "-100%" }}
            whileInView={{ left: "100%" }}
            viewport={{ once: true }}
            transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
            className="absolute top-0 bottom-0 w-32 bg-brand-accent shadow-[0_0_20px_rgba(123,97,255,0.5)]"
          />
        </div>
      </div>
    </section>
  );
}
