"use client";

/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from "react";
import Sidebar from "../../components/dashboard/Sidebar";
import TopBar from "../../components/dashboard/TopBar";
import AgentsTab from "../../components/workforce/AgentsTab";
import TeamsTab from "../../components/workforce/TeamsTab";
import WorkflowsTab from "../../components/workforce/WorkflowsTab";

export default function WorkforcePage() {
  const [activeTab, setActiveTab] = useState("Agents");

  const tabs = ["Agents", "Teams", "Workflows"];

  return (
    <div className="flex min-h-screen bg-brand-bg text-brand-primary">
      <Sidebar />
      
      <div className="flex-1 ml-[240px] flex flex-col min-h-screen relative">
        <TopBar />
        
        <main className="flex-1 p-8 pb-20">
          <div className="max-w-6xl mx-auto">
            <div className="mb-10">
              <h1 className="text-4xl font-bold tracking-tight mb-2">Build your workforce.</h1>
              <p className="text-brand-secondary text-lg">Create workers, organize teams, and run repeatable work.</p>
            </div>

            <div className="flex border-b border-brand-border mb-8">
              {tabs.map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`px-8 py-4 text-sm font-bold border-b-2 transition-all ${
                    activeTab === tab 
                      ? 'border-brand-accent text-brand-accent' 
                      : 'border-transparent text-nav-default hover:text-brand-primary'
                  }`}
                >
                  {tab}
                </button>
              ))}
            </div>

            {activeTab === "Agents" && <AgentsTab />}
            {activeTab === "Teams" && <TeamsTab />}
            {activeTab === "Workflows" && <WorkflowsTab />}
          </div>
        </main>
      </div>
    </div>
  );
}
