"use client";

/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { motion } from "motion/react";
import { UserPlus, Cpu, CheckCircle2, Package, BarChart3 } from "lucide-react";

const features = [
  {
    icon: <UserPlus className="w-8 h-8" />,
    title: "Create Workers",
    description: "Design custom AI agents tailored to your specific business workflows and company culture."
  },
  {
    icon: <Cpu className="w-8 h-8" />,
    title: "Run Work",
    description: "Deploy your workers to handle repetitive tasks, data analysis, and complex multi-step processes."
  },
  {
    icon: <CheckCircle2 className="w-8 h-8" />,
    title: "Approve Decisions",
    description: "Your workers propose solutions; you provide the final word. Human-in-the-loop by design."
  },
  {
    icon: <Package className="w-8 h-8" />,
    title: "Build Products",
    description: "Accelerate your development cycle with AI workers that help with research, code, and testing."
  },
  {
    icon: <BarChart3 className="w-8 h-8" />,
    title: "See Results",
    description: "Track performance across all departments with real-time dashboards and audit trails."
  }
];

export default function Features() {
  return (
    <section className="py-32 bg-brand-bg">
      <div className="max-w-7xl mx-auto px-6">
        <h2 className="text-4xl md:text-5xl font-bold text-center mb-20 tracking-tight text-brand-primary">
          Five things Helm handles for you
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-6 gap-6">
          {features.slice(0, 3).map((feature, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="md:col-span-2 p-8 bg-brand-card rounded-2xl border border-brand-border shadow-sm hover:border-brand-accent/20 transition-all"
            >
              <div className="text-brand-accent mb-6">
                {feature.icon}
              </div>
              <h3 className="text-xl font-bold mb-3 text-brand-primary">{feature.title}</h3>
              <p className="text-brand-secondary leading-relaxed">{feature.description}</p>
            </motion.div>
          ))}
          <div className="md:col-start-2 md:col-span-2">
             <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
              className="p-8 bg-brand-card rounded-2xl border border-brand-border shadow-sm hover:border-brand-accent/20 transition-all"
            >
              <div className="text-brand-accent mb-6">
                {features[3].icon}
              </div>
              <h3 className="text-xl font-bold mb-3 text-brand-primary">{features[3].title}</h3>
              <p className="text-brand-secondary leading-relaxed">{features[3].description}</p>
            </motion.div>
          </div>
          <div className="md:col-span-2">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4 }}
              className="p-8 bg-brand-card rounded-2xl border border-brand-border shadow-sm hover:border-brand-accent/20 transition-all"
            >
              <div className="text-brand-accent mb-6">
                {features[4].icon}
              </div>
              <h3 className="text-xl font-bold mb-3 text-brand-primary">{features[4].title}</h3>
              <p className="text-brand-secondary leading-relaxed">{features[4].description}</p>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
