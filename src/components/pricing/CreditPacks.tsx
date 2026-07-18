"use client";

/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { motion } from "motion/react";

const packs = [
  { amount: "1,000", price: "$--" },
  { amount: "5,000", price: "$--" },
  { amount: "25,000", price: "$--" },
  { amount: "100,000", price: "$--" }
];

export default function CreditPacks() {
  return (
    <section className="py-24 bg-brand-bg">
      <div className="max-w-7xl mx-auto px-6 text-center">
        <h2 className="text-3xl font-bold mb-16 tracking-tight text-brand-primary">Need more credits?</h2>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {packs.map((pack, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="p-10 bg-brand-card border border-brand-border rounded-2xl shadow-sm hover:shadow-md transition-shadow flex flex-col items-center"
            >
              <div className="text-sm font-bold text-brand-secondary uppercase tracking-widest mb-2">Credits</div>
              <div className="text-4xl font-black text-brand-primary mb-4">{pack.amount}</div>
              <div className="text-xl font-bold text-brand-secondary mb-8">{pack.price}</div>
              <button className="w-full py-3 bg-brand-card-hover text-brand-primary border border-brand-border font-bold rounded-xl hover:bg-brand-nav-hover transition-all">
                Buy Credits
              </button>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
