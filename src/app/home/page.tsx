"use client";

/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from "react";
import Sidebar from "../../components/dashboard/Sidebar";
import TopBar from "../../components/dashboard/TopBar";
import SidePanel from "../../components/dashboard/SidePanel";
import CompanyPanelContent from "../../components/dashboard/CompanyPanelContent";
import WorkPanelContent from "../../components/dashboard/WorkPanelContent";
import ApprovalsPanelContent from "../../components/dashboard/ApprovalsPanelContent";
import ResultsPanelContent from "../../components/dashboard/ResultsPanelContent";
import { 
  Plus, 
  Building2, 
  PlayCircle, 
  CheckCircle, 
  Sparkles,
  ArrowRight
} from "lucide-react";
import { motion } from "motion/react";

type PanelType = 'company' | 'work' | 'approvals' | 'results' | null;

export default function HomePage() {
  const [activePanel, setActivePanel] = useState<PanelType>(null);
  const [command, setCommand] = useState("");

  const closePanel = () => setActivePanel(null);

  const getPanelTitle = () => {
    switch (activePanel) {
      case 'company': return 'Acme Corp';
      case 'work': return 'Running Work';
      case 'approvals': return 'Pending Approvals';
      case 'results': return 'Recent Results';
      default: return '';
    }
  };

  const renderPanelContent = () => {
    switch (activePanel) {
      case 'company': return <CompanyPanelContent />;
      case 'work': return <WorkPanelContent />;
      case 'approvals': return <ApprovalsPanelContent />;
      case 'results': return <ResultsPanelContent />;
      default: return null;
    }
  };

  return (
    <div className="flex min-h-screen bg-brand-bg">
      <Sidebar />
      
      <div className="flex-1 ml-[240px] flex flex-col min-h-screen relative">
        <TopBar />
        
        <main className="flex-1 p-8 pb-20">
          <div className="max-w-5xl mx-auto space-y-12">
            
            {/* Command Input */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-brand-card rounded-[32px] p-2 shadow-xl shadow-black/5 border border-brand-border focus-within:ring-4 focus-within:ring-brand-accent/10 transition-all"
            >
              <div className="p-6">
                <input 
                  type="text"
                  value={command}
                  onChange={(e) => setCommand(e.target.value)}
                  placeholder="What should your company do next?"
                  className="w-full text-2xl font-medium placeholder:text-brand-placeholder focus:outline-none bg-transparent text-brand-primary"
                />
                <div className="mt-6 flex items-center justify-between">
                  <div className="flex items-center gap-4 text-xs font-bold text-brand-secondary uppercase tracking-widest">
                    <span>Try: Find suppliers</span>
                    <span className="w-1 h-1 rounded-full bg-brand-border" />
                    <span>Launch a product</span>
                    <span className="w-1 h-1 rounded-full bg-brand-border" />
                    <span>Build a website</span>
                  </div>
                  <button className="px-8 py-3 bg-brand-accent text-brand-accent-text font-bold rounded-2xl hover:bg-brand-accent-hover transition-all flex items-center gap-2 shadow-lg shadow-brand-accent/20">
                    Run
                    <ArrowRight className="w-5 h-5" />
                  </button>
                </div>
              </div>
            </motion.div>
            
            {/* Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-brand-primary">
              
              {/* Card 1 - Company */}
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="bg-brand-card rounded-[32px] p-8 border border-brand-border shadow-sm flex flex-col min-h-[360px]"
              >
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 rounded-xl bg-brand-accent/10 flex items-center justify-center text-brand-accent">
                    <Building2 className="w-6 h-6" />
                  </div>
                  <h3 className="text-xl font-bold">Company</h3>
                </div>
                
                <div className="flex-1 space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="text-2xl font-bold text-brand-primary">Acme Corp</div>
                      <div className="flex items-center gap-2 mt-1">
                        <span className="px-2 py-0.5 bg-brand-accent text-brand-accent-text text-[10px] font-bold rounded uppercase tracking-wider">Pro</span>
                        <span className="text-xs text-brand-secondary font-bold uppercase tracking-widest">847 Credits remaining</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="pt-4">
                    <div className="text-[10px] font-bold text-brand-secondary uppercase tracking-widest mb-1">Current Objective</div>
                    <p className="text-sm text-brand-primary font-medium">Launch new product website by Q4</p>
                  </div>
                </div>
                
                <div className="flex gap-4 pt-6 mt-auto">
                  <button 
                    onClick={() => setActivePanel('company')}
                    className="flex-1 py-3 text-brand-accent font-bold rounded-xl hover:bg-brand-accent/10 transition-all text-sm"
                  >
                    Open Details
                  </button>
                  <button className="flex-1 py-3 text-brand-secondary font-bold rounded-xl hover:bg-brand-card-hover transition-all text-sm">
                    Switch
                  </button>
                </div>
              </motion.div>
              
              {/* Card 2 - Running Work */}
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="bg-brand-card rounded-[32px] p-8 border border-brand-border shadow-sm flex flex-col min-h-[360px]"
              >
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 rounded-xl bg-brand-accent/10 flex items-center justify-center text-brand-accent">
                    <PlayCircle className="w-6 h-6" />
                  </div>
                  <h3 className="text-xl font-bold">Running Work</h3>
                </div>
                
                <div className="flex-1 space-y-2">
                  <div className="flex items-center justify-between p-2.5 rounded-xl bg-brand-bg border border-brand-border">
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 rounded-full bg-status-active-dot" />
                      <span className="text-sm font-bold text-brand-primary">Running</span>
                    </div>
                    <span className="font-bold text-sm">2</span>
                  </div>
                  <div className="flex items-center justify-between p-2.5 rounded-xl bg-brand-bg border border-brand-border">
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 rounded-full bg-status-paused-dot" />
                      <span className="text-sm font-bold text-brand-primary">Paused</span>
                    </div>
                    <span className="font-bold text-sm">1</span>
                  </div>
                  <div className="flex items-center justify-between p-2.5 rounded-xl bg-brand-bg border border-brand-border">
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 rounded-full bg-brand-accent" />
                      <span className="text-sm font-bold text-brand-primary">Completed</span>
                    </div>
                    <span className="font-bold text-sm">5</span>
                  </div>
                </div>
                
                <div className="flex gap-4 pt-6 mt-auto">
                  <button className="flex-1 py-3 bg-brand-accent text-brand-accent-text font-bold rounded-xl hover:bg-brand-accent-hover transition-all shadow-lg shadow-brand-accent/20 text-sm">
                    Start Work
                  </button>
                  <button 
                    onClick={() => setActivePanel('work')}
                    className="flex-1 py-3 text-brand-secondary font-bold rounded-xl hover:bg-brand-card-hover transition-all text-sm"
                  >
                    View Work
                  </button>
                </div>
              </motion.div>
              
              {/* Card 3 - Approvals */}
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="bg-brand-card rounded-[32px] p-8 border border-brand-border shadow-sm flex flex-col min-h-[360px]"
              >
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 rounded-xl bg-brand-accent/10 flex items-center justify-center text-brand-accent">
                    <CheckCircle className="w-6 h-6" />
                  </div>
                  <h3 className="text-xl font-bold">Approvals</h3>
                </div>
                
                <div className="flex-1 flex flex-col items-center justify-center">
                  <div className="text-6xl font-black text-brand-accent mb-4 tracking-tighter">3</div>
                  <div className="text-sm font-bold text-brand-secondary uppercase tracking-widest">Pending Decisions</div>
                  
                  <div className="mt-6 flex gap-4 text-[10px] font-bold text-brand-secondary uppercase tracking-wider">
                    <span>Money (1)</span>
                    <span>Deployment (1)</span>
                    <span>Messages (1)</span>
                  </div>
                </div>
                
                <div className="pt-6 mt-auto">
                  <button 
                    onClick={() => setActivePanel('approvals')}
                    className="w-full py-3 bg-brand-accent text-brand-accent-text font-bold rounded-xl hover:bg-brand-accent-hover transition-all shadow-lg shadow-brand-accent/20"
                  >
                    Review Approvals
                  </button>
                </div>
              </motion.div>
              
              {/* Card 4 - Results */}
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="bg-brand-card rounded-[32px] p-8 border border-brand-border shadow-sm flex flex-col min-h-[360px]"
              >
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 rounded-xl bg-brand-accent/10 flex items-center justify-center text-brand-accent">
                    <Sparkles className="w-6 h-6" />
                  </div>
                  <h3 className="text-xl font-bold">Results</h3>
                </div>
                
                <div className="flex-1 space-y-4">
                  <div className="text-sm text-brand-secondary font-medium leading-relaxed">
                    Your AI workers have generated several new outputs since your last visit.
                  </div>
                  <div className="grid grid-cols-3 gap-2">
                    <div className="p-3 rounded-xl bg-brand-bg border border-brand-border text-center">
                      <div className="text-lg font-bold">2</div>
                      <div className="text-[8px] font-bold uppercase tracking-tighter text-brand-secondary">Reports</div>
                    </div>
                    <div className="p-3 rounded-xl bg-brand-bg border border-brand-border text-center">
                      <div className="text-lg font-bold">1</div>
                      <div className="text-[8px] font-bold uppercase tracking-tighter text-brand-secondary">Ads</div>
                    </div>
                    <div className="p-3 rounded-xl bg-brand-bg border border-brand-border text-center">
                      <div className="text-lg font-bold">3</div>
                      <div className="text-[8px] font-bold uppercase tracking-tighter text-brand-secondary">Docs</div>
                    </div>
                  </div>
                </div>
                
                <div className="pt-6 mt-auto">
                  <button 
                    onClick={() => setActivePanel('results')}
                    className="w-full py-3 text-brand-secondary font-bold rounded-xl hover:bg-brand-card-hover transition-all text-sm"
                  >
                    View Results
                  </button>
                </div>
              </motion.div>
              
            </div>
          </div>
        </main>
      </div>
      
      {/* Side Panel Wrapper */}
      <SidePanel 
        isOpen={activePanel !== null} 
        onClose={closePanel} 
        title={getPanelTitle()}
      >
        {renderPanelContent()}
      </SidePanel>
    </div>
  );
}
