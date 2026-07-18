"use client";

/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from "react";
import Sidebar from "../../components/dashboard/Sidebar";
import TopBar from "../../components/dashboard/TopBar";
import FilesTab from "../../components/knowledge/FilesTab";
import DatasetsTab from "../../components/knowledge/DatasetsTab";
import MemoryTab from "../../components/knowledge/MemoryTab";
import SkillsTab from "../../components/knowledge/SkillsTab";
import LearningTab from "../../components/knowledge/LearningTab";

export default function KnowledgePage() {
  const [activeTab, setActiveTab] = useState("Files");

  const tabs = ["Files", "Datasets", "Memory", "Skills", "Learning"];

  return (
    <div className="flex min-h-screen bg-brand-bg text-brand-primary">
      <Sidebar />
      
      <div className="flex-1 ml-[240px] flex flex-col min-h-screen relative">
        <TopBar />
        
        <main className="flex-1 p-8 pb-20">
          <div className="max-w-6xl mx-auto">
            <div className="mb-10">
              <h1 className="text-4xl font-bold tracking-tight mb-2">Company knowledge.</h1>
              <p className="text-brand-secondary text-lg">Everything your company knows, learns, and remembers.</p>
            </div>

            <div className="flex border-b border-brand-border mb-8 overflow-x-auto no-scrollbar">
              {tabs.map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`px-8 py-4 text-sm font-bold border-b-2 transition-all whitespace-nowrap ${
                    activeTab === tab 
                      ? 'border-brand-accent text-brand-accent' 
                      : 'border-transparent text-brand-secondary hover:text-brand-primary'
                  }`}
                >
                  {tab}
                </button>
              ))}
            </div>

            <div className="animate-in fade-in duration-500">
              {activeTab === "Files" && <FilesTab />}
              {activeTab === "Datasets" && <DatasetsTab />}
              {activeTab === "Memory" && <MemoryTab />}
              {activeTab === "Skills" && <SkillsTab />}
              {activeTab === "Learning" && <LearningTab />}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
