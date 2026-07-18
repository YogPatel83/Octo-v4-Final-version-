"use client";

/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from "react";
import Sidebar from "../../components/dashboard/Sidebar";
import TopBar from "../../components/dashboard/TopBar";
import SidePanel from "../../components/dashboard/SidePanel";
import ProjectsSection from "../../components/build/ProjectsSection";
import DeploymentsSection from "../../components/build/DeploymentsSection";
import NewBuildPanel from "../../components/build/NewBuildPanel";
import ApprovalModal from "../../components/build/ApprovalModal";
import { Laptop, ExternalLink, MessageSquare, CheckCircle2 } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

export default function BuildPage() {
  const [isNewBuildOpen, setIsNewBuildOpen] = useState(false);
  const [isApprovalOpen, setIsApprovalOpen] = useState(false);

  return (
    <div className="flex min-h-screen bg-brand-bg text-brand-primary">
      <Sidebar />
      
      <div className="flex-1 ml-[240px] flex flex-col min-h-screen relative">
        <TopBar />
        
        <main className="flex-1 flex flex-col h-[calc(100vh-64px)]">
          <div className="p-8 border-b border-brand-border bg-brand-topbar/50 backdrop-blur-sm">
            <h1 className="text-4xl font-bold tracking-tight mb-2">Build products and systems.</h1>
            <p className="text-brand-secondary text-lg">Websites, apps, tools, and internal systems.</p>
          </div>

          <div className="flex-1 flex overflow-hidden">
            {/* Left Column: Projects & Deployments */}
            <div className="w-[380px] border-r border-brand-border overflow-y-auto p-6 space-y-10 bg-brand-bg/30">
              <ProjectsSection onNewBuild={() => setIsNewBuildOpen(true)} />
              <DeploymentsSection />
            </div>

            {/* Right Column: Preview */}
            <div className="flex-1 flex flex-col p-6 bg-brand-bg/50">
              <div className="flex items-center justify-between mb-6">
                <div className="flex gap-2">
                  <button className="px-4 py-2 bg-brand-card border border-brand-border rounded-xl text-sm font-bold hover:bg-brand-card-hover transition-all flex items-center gap-2 text-brand-primary">
                    <ExternalLink className="w-4 h-4" />
                    Open Preview
                  </button>
                  <button className="px-4 py-2 bg-brand-card border border-brand-border rounded-xl text-sm font-bold hover:bg-brand-card-hover transition-all flex items-center gap-2 text-brand-primary">
                    <MessageSquare className="w-4 h-4" />
                    Request Changes
                  </button>
                </div>
                <button 
                  onClick={() => setIsApprovalOpen(true)}
                  className="px-6 py-2 bg-brand-accent text-brand-accent-text rounded-xl text-sm font-bold hover:bg-brand-accent-hover transition-all shadow-lg shadow-brand-accent/20 flex items-center gap-2"
                >
                  <CheckCircle2 className="w-4 h-4" />
                  Approve Deployment
                </button>
              </div>

              <div className="flex-1 border-2 border-dashed border-brand-border rounded-[32px] bg-brand-bg flex flex-col items-center justify-center text-center p-12">
                <div className="w-24 h-24 rounded-3xl bg-brand-card border border-brand-border flex items-center justify-center text-brand-secondary mb-6 shadow-sm">
                  <Laptop className="w-12 h-12" />
                </div>
                <h3 className="text-2xl font-bold text-brand-primary mb-2">Preview will appear here</h3>
                <p className="text-brand-secondary max-w-sm">
                  Generate a build plan or select an existing project to see a live preview.
                </p>
              </div>
            </div>
          </div>
        </main>
      </div>

      <SidePanel 
        isOpen={isNewBuildOpen} 
        onClose={() => setIsNewBuildOpen(false)} 
        title="New Build"
      >
        <NewBuildPanel onClose={() => setIsNewBuildOpen(false)} />
      </SidePanel>

      <ApprovalModal 
        isOpen={isApprovalOpen} 
        onClose={() => setIsApprovalOpen(false)} 
      />
    </div>
  );
}
