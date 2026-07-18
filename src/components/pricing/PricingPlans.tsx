"use client";

/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { motion } from "motion/react";
import Link from "next/link";
import { Check, Minus } from "lucide-react";

const plans = [
  {
    name: "Free",
    price: "$0",
    description: "For individuals exploring AI.",
    features: [
      { text: "1 company", included: true },
      { text: "1 agent", included: true },
      { text: "0 teams", included: false },
      { text: "1 workflow", included: true },
      { text: "25 monthly tasks", included: true },
      { text: "100 monthly credits", included: true },
      { text: "No BYOK", included: false },
      { text: "No marketplace selling", included: false },
      { text: "No autopilot", included: false },
    ],
    buttonText: "Start Free",
    href: "/signup",
    highlight: false
  },
  {
    name: "Pro",
    price: "$--",
    description: "For small teams and startups.",
    features: [
      { text: "5 companies", included: true },
      { text: "15 agents", included: true },
      { text: "5 teams", included: true },
      { text: "25 workflows", included: true },
      { text: "1,500 monthly tasks", included: true },
      { text: "2,500 monthly credits", included: true },
      { text: "BYOK allowed", included: true },
      { text: "No marketplace selling", included: false },
      { text: "No autopilot", included: false },
    ],
    buttonText: "Get Pro",
    href: "/signup",
    highlight: false
  },
  {
    name: "Max",
    price: "$--",
    description: "The complete OS for companies.",
    features: [
      { text: "15 companies", included: true },
      { text: "75 agents", included: true },
      { text: "20 teams", included: true },
      { text: "150 workflows", included: true },
      { text: "10,000 monthly tasks", included: true },
      { text: "15,000 monthly credits", included: true },
      { text: "BYOK", included: true },
      { text: "Marketplace selling", included: true },
      { text: "Autopilot enabled", included: true },
    ],
    buttonText: "Get Max",
    href: "/signup",
    highlight: true,
    badge: "Most Popular"
  },
  {
    name: "Enterprise",
    price: "Custom",
    description: "Custom scale and security.",
    features: [
      { text: "Unlimited everything", included: true },
      { text: "Private deployment", included: true },
      { text: "SSO", included: true },
      { text: "Dedicated support", included: true },
    ],
    buttonText: "Talk to us",
    href: "mailto:sales@helm.ai",
    highlight: false
  }
];

export default function PricingPlans() {
  return (
    <section className="py-20 bg-brand-bg">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {plans.map((plan, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className={`relative p-8 rounded-2xl bg-brand-card border flex flex-col shadow-sm ${
                plan.highlight 
                  ? 'border-brand-accent border-2 ring-4 ring-brand-accent/10' 
                  : 'border-brand-border'
              }`}
            >
              {plan.badge && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 px-4 py-1 bg-brand-accent text-brand-accent-text text-xs font-bold rounded-full uppercase tracking-wider">
                  {plan.badge}
                </div>
              )}
              
              <div className="mb-8">
                <h3 className="text-xl font-bold mb-1 text-brand-primary">{plan.name}</h3>
                <p className="text-sm text-brand-secondary h-10 mb-4">{plan.description}</p>
                <div className="text-3xl font-bold text-brand-primary">{plan.price}<span className="text-sm font-medium text-brand-secondary">/month</span></div>
              </div>
              
              <ul className="space-y-4 mb-10 flex-1">
                {plan.features.map((feature, idx) => (
                  <li key={idx} className="flex items-start gap-3 text-sm">
                    {feature.included ? (
                      <Check className="w-5 h-5 text-brand-accent shrink-0" />
                    ) : (
                      <Minus className="w-5 h-5 text-brand-placeholder shrink-0" />
                    )}
                    <span className={feature.included ? 'text-brand-primary' : 'text-brand-secondary'}>
                      {feature.text}
                    </span>
                  </li>
                ))}
              </ul>
              
              {plan.name === "Enterprise" ? (
                <a 
                  href={plan.href}
                  className="w-full py-4 bg-brand-card-hover text-brand-primary border border-brand-border font-bold rounded-xl text-center hover:bg-brand-nav-hover transition-all"
                >
                  {plan.buttonText}
                </a>
              ) : (
                <Link href={plan.href}
                  className={`w-full py-4 font-bold rounded-xl text-center transition-all ${
                    plan.highlight 
                      ? 'bg-brand-accent text-brand-accent-text hover:bg-brand-accent-hover shadow-lg shadow-brand-accent/20' 
                      : 'bg-brand-card-hover text-brand-primary border border-brand-border hover:bg-brand-nav-hover'
                  }`}
                >
                  {plan.buttonText}
                </Link>
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
