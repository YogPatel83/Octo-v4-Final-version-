"use client";

/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from "react";
import Sidebar from "../../components/dashboard/Sidebar";
import TopBar from "../../components/dashboard/TopBar";
import ProfileSection from "../../components/settings/ProfileSection";
import CompanySection from "../../components/settings/CompanySection";
import BillingSection from "../../components/settings/BillingSection";
import ProvidersSection from "../../components/settings/ProvidersSection";
import ConnectionsSection from "../../components/settings/ConnectionsSection";
import ApprovalRulesSection from "../../components/settings/ApprovalRulesSection";
import SecuritySection from "../../components/settings/SecuritySection";
import PrivateDeploymentSection from "../../components/settings/PrivateDeploymentSection";
import LegalSection from "../../components/settings/LegalSection";

const navItems = [
  "Profile", 
  "Company", 
  "Billing", 
  "Providers", 
  "Connections", 
  "Approval Rules", 
  "Security", 
  "Private Deployment", 
  "Legal"
];

export default function SettingsPage() {
  const [activeSection, setActiveSection] = useState("Profile");

  const renderSection = () => {
    switch (activeSection) {
      case "Profile": return <ProfileSection />;
      case "Company": return <CompanySection />;
      case "Billing": return <BillingSection />;
      case "Providers": return <ProvidersSection />;
      case "Connections": return <ConnectionsSection />;
      case "Approval Rules": return <ApprovalRulesSection />;
      case "Security": return <SecuritySection />;
      case "Private Deployment": return <PrivateDeploymentSection />;
      case "Legal": return <LegalSection />;
      default: return <ProfileSection />;
    }
  };

  return (
    <div className="flex min-h-screen bg-brand-bg text-brand-primary">
      <Sidebar />
      
      <div className="flex-1 ml-[240px] flex flex-col min-h-screen relative">
        <TopBar />
        
        <div className="flex-1 flex overflow-hidden">
          {/* Secondary Nav */}
          <aside className="w-[220px] bg-brand-card border-r border-brand-border flex flex-col overflow-y-auto">
            <div className="p-6">
              <h2 className="text-xs font-bold text-brand-secondary uppercase tracking-widest mb-6">Settings</h2>
              <nav className="space-y-1">
                {navItems.map((item) => (
                  <button
                    key={item}
                    onClick={() => setActiveSection(item)}
                    className={`w-full text-left px-4 py-3 text-sm font-bold transition-all border-l-2 ${
                      activeSection === item 
                        ? 'border-brand-accent text-brand-accent bg-brand-accent/10' 
                        : 'border-transparent text-brand-secondary hover:text-brand-primary hover:bg-brand-card-hover'
                    }`}
                  >
                    {item}
                  </button>
                ))}
              </nav>
            </div>
          </aside>

          {/* Main Settings Content */}
          <main className="flex-1 overflow-y-auto p-12">
            <div className="max-w-4xl mx-auto">
              <h1 className="text-3xl font-bold tracking-tight mb-8">{activeSection}</h1>
              <div className="animate-in fade-in slide-in-from-bottom-2 duration-500">
                {renderSection()}
              </div>
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}
