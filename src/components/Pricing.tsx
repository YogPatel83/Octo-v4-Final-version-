"use client";

/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { motion } from "motion/react";
import Link from "next/link";

const plans = [
  {
    name: "Free",
    description: "For individuals exploring AI.",
    credits: "1,000 credits/mo",
    buttonText: "Start Free",
    highlight: false
  },
  {
    name: "Pro",
    description: "For small teams and startups.",
    credits: "10,000 credits/mo",
    buttonText: "Get Started",
    highlight: false
  },
  {
    name: "Max",
    description: "The complete OS for companies.",
    credits: "50,000 credits/mo",
    buttonText: "Join Waitlist",
    highlight: true
  },
  {
    name: "Enterprise",
    description: "Custom scale and security.",
    credits: "Unlimited credits",
    buttonText: "Contact Sales",
    highlight: false
  }
];

export default function Pricing() {
  return (
    <section className="py-32 bg-brand-bg">
      <div className="max-w-7xl mx-auto px-6">
        <h2 className="text-4xl md:text-5xl font-bold text-center mb-20 tracking-tight">
          Simple pricing
        </h2>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {plans.map((plan, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className={`p-8 rounded-2xl bg-brand-card border shadow-sm flex flex-col ${
                plan.highlight ? 'border-brand-accent border-2 ring-4 ring-brand-accent/10' : 'border-brand-border'
              }`}
            >
              <h3 className="text-2xl font-bold mb-2 text-brand-primary">{plan.name}</h3>
              <p className="text-brand-secondary text-sm mb-6 min-h-[40px]">{plan.description}</p>
              <div className="text-lg font-bold mb-8 text-brand-primary">{plan.credits}</div>
              
              <Link href="/signup"
                className={`mt-auto w-full py-3 rounded-xl font-semibold text-center transition-all ${
                  plan.highlight 
                    ? 'bg-brand-accent text-brand-accent-text hover:bg-brand-accent-hover shadow-lg shadow-brand-accent/20' 
                    : 'bg-brand-card-hover text-brand-primary border border-brand-border hover:bg-brand-nav-hover'
                }`}
              >
                {plan.buttonText}
              </Link>
            </motion.div>
          ))}
        </div>
        
        <div className="mt-12 text-center">
          <Link href="/pricing" className="text-brand-accent font-semibold hover:underline">
            See full pricing →
          </Link>
        </div>
      </div>
    </section>
  );
}
