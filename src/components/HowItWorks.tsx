"use client";

/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { motion } from "motion/react";

const steps = [
  {
    number: "01",
    title: "Create your workers",
    description: "Define roles, access, and guidelines for your custom AI workforce."
  },
  {
    number: "02",
    title: "Give them work",
    description: "Assign projects or ongoing responsibilities across your organization."
  },
  {
    number: "03",
    title: "Approve what matters",
    description: "Review critical decisions and maintain oversight of all AI activity."
  },
  {
    number: "04",
    title: "Receive results",
    description: "Get completed work delivered straight to your dashboard or Slack."
  }
];

export default function HowItWorks() {
  return (
    <section className="py-32 bg-brand-bg">
      <div className="max-w-7xl mx-auto px-6">
        <h2 className="text-4xl md:text-5xl font-bold text-center mb-24 tracking-tight text-brand-primary">
          How it works
        </h2>
        
        <div className="relative">
          {/* Connection line on desktop */}
          <div className="hidden md:block absolute top-10 left-[10%] right-[10%] h-px bg-brand-border -z-0" />
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12 relative z-10">
            {steps.map((step, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="flex flex-col items-center md:items-start text-center md:text-left"
              >
                <div className="text-5xl font-black text-brand-accent/10 mb-6 font-mono">
                  {step.number}
                </div>
                <h3 className="text-xl font-bold mb-3 text-brand-primary">{step.title}</h3>
                <p className="text-brand-secondary leading-relaxed max-w-xs">{step.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
