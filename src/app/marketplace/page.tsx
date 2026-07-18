"use client";

/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from "react";
import Sidebar from "../../components/dashboard/Sidebar";
import TopBar from "../../components/dashboard/TopBar";
import BrowseTab from "../../components/marketplace/BrowseTab";
import PurchasesTab from "../../components/marketplace/PurchasesTab";
import SellingTab from "../../components/marketplace/SellingTab";
import PayoutsTab from "../../components/marketplace/PayoutsTab";
import TrustTab from "../../components/marketplace/TrustTab";

export default function MarketplacePage() {
  const [activeTab, setActiveTab] = useState("Browse");

  const tabs = ["Browse", "Purchases", "Selling", "Payouts", "Trust"];

  return (
    <div className="flex min-h-screen bg-brand-bg text-brand-primary">
      <Sidebar />
      
      <div className="flex-1 ml-[240px] flex flex-col min-h-screen relative">
        <TopBar />
        
        <main className="flex-1 p-8 pb-20">
          <div className="max-w-7xl mx-auto">
            <div className="mb-10">
              <h1 className="text-4xl font-bold tracking-tight mb-2">Marketplace.</h1>
              <p className="text-brand-secondary text-lg">Buy and sell skills, datasets, workflows, and agents.</p>
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
              {activeTab === "Browse" && <BrowseTab />}
              {activeTab === "Purchases" && <PurchasesTab onBrowse={() => setActiveTab("Browse")} />}
              {activeTab === "Selling" && <SellingTab />}
              {activeTab === "Payouts" && <PayoutsTab />}
              {activeTab === "Trust" && <TrustTab />}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
