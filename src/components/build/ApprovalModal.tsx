"use client";

/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { motion, AnimatePresence } from "motion/react";
import { ShieldCheck, X } from "lucide-react";

interface ApprovalModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function ApprovalModal({ isOpen, onClose }: ApprovalModalProps) {
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/60 backdrop-blur-md z-[100]"
          />
          <div className="fixed inset-0 flex items-center justify-center z-[101] p-6">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="bg-brand-modal rounded-[32px] p-10 max-w-[440px] w-full shadow-2xl relative overflow-hidden border border-brand-border"
            >
              {/* Abstract decoration */}
              <div className="absolute top-0 right-0 w-32 h-32 bg-brand-accent/5 rounded-full -translate-y-1/2 translate-x-1/2" />
              
              <div className="relative">
                <div className="w-16 h-16 rounded-2xl bg-brand-accent/10 flex items-center justify-center text-brand-accent mb-8">
                  <ShieldCheck className="w-8 h-8" />
                </div>
                
                <h2 className="text-2xl font-bold text-brand-primary mb-3">Approve Deployment</h2>
                <p className="text-brand-secondary leading-relaxed mb-10">
                  This will deploy your project to production. This action cannot be undone easily. Are you sure you want to proceed?
                </p>
                
                <div className="space-y-3">
                  <button 
                    onClick={onClose}
                    className="w-full py-4 bg-brand-accent text-brand-accent-text font-bold rounded-xl shadow-xl shadow-brand-accent/20 hover:bg-brand-accent-hover transition-all"
                  >
                    Approve and Deploy
                  </button>
                  <button 
                    onClick={onClose}
                    className="w-full py-4 bg-brand-modal text-brand-primary border border-brand-border font-bold rounded-xl hover:bg-brand-card-hover transition-all"
                  >
                    Cancel
                  </button>
                </div>
              </div>

              <button 
                onClick={onClose}
                className="absolute top-6 right-6 p-2 text-brand-secondary hover:text-brand-primary transition-all"
              >
                <X className="w-5 h-5" />
              </button>
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  );
}
