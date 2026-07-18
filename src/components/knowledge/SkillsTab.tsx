"use client";

/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Brain, Check, X, ShieldCheck } from "lucide-react";

const initialSkills = [
  { id: 1, name: "Market Trend Analysis", status: "Active", confidence: 92 },
  { id: 2, name: "Contract Risk Scoring", status: "Pending Review", confidence: 78 }
];

export default function SkillsTab() {
  const [skills, setSkills] = useState(initialSkills);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedSkill, setSelectedSkill] = useState<any>(null);

  const openPublishModal = (skill: any) => {
    setSelectedSkill(skill);
    setIsModalOpen(true);
  };

  return (
    <div className="space-y-8">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {skills.map((skill) => (
          <motion.div 
            key={skill.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="p-8 bg-brand-card border border-brand-border rounded-[32px] shadow-sm flex flex-col"
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-xl bg-brand-accent/10 flex items-center justify-center text-brand-accent">
                <Brain className="w-5 h-5" />
              </div>
              <h3 className="font-bold text-brand-primary">{skill.name}</h3>
            </div>

            <div className="flex-1 space-y-6">
              <div className="flex items-center justify-between">
                <span className={`text-[10px] font-bold uppercase tracking-widest ${
                  skill.status === 'Active' ? 'text-status-active-text' : 'text-status-paused-text'
                }`}>
                  {skill.status}
                </span>
                <span className="text-xs font-bold text-brand-primary">{skill.confidence}% Confidence</span>
              </div>

              <div className="w-full h-2 bg-brand-card-hover rounded-full overflow-hidden">
                <motion.div 
                  initial={{ width: 0 }}
                  animate={{ width: `${skill.confidence}%` }}
                  transition={{ duration: 1, delay: 0.2 }}
                  className="h-full bg-brand-accent"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-2 mt-10">
              <button className="py-2.5 text-[10px] font-bold text-brand-secondary border border-brand-border rounded-xl hover:bg-brand-card-hover transition-all uppercase tracking-widest">
                Review
              </button>
              <button className="py-2.5 text-[10px] font-bold text-brand-secondary border border-brand-border rounded-xl hover:bg-brand-card-hover transition-all uppercase tracking-widest">
                Keep Private
              </button>
              <button 
                onClick={() => openPublishModal(skill)}
                className="col-span-2 py-3 bg-brand-accent/10 text-brand-accent font-bold rounded-xl text-xs hover:bg-brand-accent/20 transition-all"
              >
                Publish to Marketplace
              </button>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Publish Confirmation Modal */}
      <AnimatePresence>
        {isModalOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsModalOpen(false)}
              className="fixed inset-0 bg-black/60 backdrop-blur-md z-[100]"
            />
            <div className="fixed inset-0 flex items-center justify-center z-[101] p-6">
              <motion.div
                initial={{ opacity: 0, scale: 0.95, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: 20 }}
                className="bg-brand-modal rounded-[32px] p-10 max-w-[440px] w-full shadow-2xl relative border border-brand-border"
              >
                <div className="w-16 h-16 rounded-2xl bg-brand-accent/10 flex items-center justify-center text-brand-accent mb-8">
                  <ShieldCheck className="w-8 h-8" />
                </div>
                
                <h2 className="text-2xl font-bold text-brand-primary mb-3">Publish Skill</h2>
                <p className="text-brand-secondary leading-relaxed mb-10 text-sm">
                  Are you sure you want to publish <span className="font-bold text-brand-primary">"{selectedSkill?.name}"</span> to the marketplace? Other organizations will be able to license this skill.
                </p>
                
                <div className="space-y-3">
                  <button 
                    onClick={() => setIsModalOpen(false)}
                    className="w-full py-4 bg-brand-accent text-brand-accent-text font-bold rounded-xl shadow-xl shadow-brand-accent/20 hover:bg-brand-accent-hover transition-all"
                  >
                    Confirm & Publish
                  </button>
                  <button 
                    onClick={() => setIsModalOpen(false)}
                    className="w-full py-4 bg-brand-modal text-brand-primary border border-brand-border font-bold rounded-xl hover:bg-brand-card-hover transition-all"
                  >
                    Cancel
                  </button>
                </div>

                <button 
                  onClick={() => setIsModalOpen(false)}
                  className="absolute top-6 right-6 p-2 text-brand-secondary hover:text-brand-primary transition-all"
                >
                  <X className="w-5 h-5" />
                </button>
              </motion.div>
            </div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
