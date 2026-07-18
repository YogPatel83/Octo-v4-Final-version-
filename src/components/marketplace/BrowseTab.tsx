"use client";

/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from "react";
import { Search, Star, CheckCircle2, Brain, Database, Workflow, UserCheck } from "lucide-react";
import { motion } from "motion/react";

const filters = ["All", "Skills", "Datasets", "Workflows", "Agents"];

const listings = [
  {
    id: 1,
    name: "Enterprise Market Analyzer",
    type: "Agent",
    seller: "InsightCorp",
    verified: true,
    rating: 4.8,
    price: "$49/mo",
    icon: UserCheck,
    gradient: "from-indigo-500 to-purple-600"
  },
  {
    id: 2,
    name: "Global Logistics Dataset",
    type: "Dataset",
    seller: "DataStream",
    verified: true,
    rating: 4.9,
    price: "$299",
    icon: Database,
    gradient: "from-teal-400 to-blue-500"
  },
  {
    id: 3,
    name: "Legal Risk Assessment",
    type: "Skill",
    seller: "LexAI",
    verified: true,
    rating: 4.7,
    price: "$89/mo",
    icon: Brain,
    gradient: "from-purple-500 to-pink-500"
  },
  {
    id: 4,
    name: "HR Onboarding Flow",
    type: "Workflow",
    seller: "ProcessPro",
    verified: false,
    rating: 4.5,
    price: "$19",
    icon: Workflow,
    gradient: "from-orange-400 to-red-500"
  }
];

export default function BrowseTab() {
  const [activeFilter, setActiveFilter] = useState("All");

  return (
    <div className="space-y-8">
      <div className="relative">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-brand-secondary w-5 h-5" />
        <input 
          type="text" 
          placeholder="Search for skills, datasets, agents..." 
          className="w-full pl-12 pr-4 py-4 bg-brand-input-bg border border-brand-border rounded-2xl shadow-sm focus:ring-2 focus:ring-brand-accent/20 focus:border-brand-accent outline-none text-brand-input-text transition-all"
        />
      </div>

      <div className="flex gap-2 overflow-x-auto no-scrollbar pb-2">
        {filters.map(filter => (
          <button
            key={filter}
            onClick={() => setActiveFilter(filter)}
            className={`px-6 py-2 rounded-full text-sm font-bold border transition-all whitespace-nowrap ${
              activeFilter === filter 
                ? "bg-brand-accent text-brand-accent-text border-brand-accent shadow-md shadow-brand-accent/20" 
                : "bg-brand-card text-brand-secondary border-brand-border hover:bg-brand-card-hover"
            }`}
          >
            {filter}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {listings.map((item, i) => (
          <motion.div
            key={item.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.05 }}
            className="bg-brand-card border border-brand-border rounded-[32px] overflow-hidden shadow-sm hover:shadow-xl hover:border-brand-accent/30 transition-all group flex flex-col"
          >
            <div className={`h-40 bg-gradient-to-br ${item.gradient} flex items-center justify-center relative overflow-hidden`}>
              <div className="absolute inset-0 bg-black/5 opacity-0 group-hover:opacity-100 transition-opacity" />
              <item.icon className="w-16 h-16 text-brand-accent-text/90 drop-shadow-lg" />
            </div>
            
            <div className="p-6 flex-1 flex flex-col">
              <div className="flex items-center gap-2 mb-2">
                <span className="px-2 py-0.5 bg-brand-bg text-brand-secondary text-[10px] font-bold rounded uppercase tracking-widest border border-brand-border">
                  {item.type}
                </span>
                <div className="flex items-center gap-1 text-[10px] font-bold text-status-paused-text">
                  <Star className="w-3 h-3 fill-current" />
                  {item.rating}
                </div>
              </div>
              
              <h3 className="font-bold text-brand-primary mb-1 group-hover:text-brand-accent transition-colors">
                {item.name}
              </h3>
              
              <div className="flex items-center gap-1.5 text-xs text-brand-secondary mb-6">
                <span>by {item.seller}</span>
                {item.verified && <CheckCircle2 className="w-3.5 h-3.5 text-brand-accent" />}
              </div>
              
              <div className="mt-auto flex items-center justify-between">
                <span className="text-lg font-black text-brand-primary">{item.price}</span>
                <button className="px-5 py-2 bg-brand-accent text-brand-accent-text font-bold rounded-xl text-xs hover:bg-brand-accent-hover transition-all shadow-lg shadow-brand-accent/20">
                  {item.price.includes('/') ? 'Install' : 'Purchase'}
                </button>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
