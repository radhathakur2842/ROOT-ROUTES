import React, { useState } from 'react';
import { AppProvider, useApp } from './context/AppContext';
import { Header } from './components/layout/Header';
import { Sidebar } from './components/layout/Sidebar';
import { DashboardView } from './components/dashboard/DashboardView';
import { WorkersView } from './components/workers/WorkersView';
import { JourneysView } from './components/journeys/JourneysView';
import { SchemesView } from './components/schemes/SchemesView';
import { BenefitsView } from './components/benefits/BenefitsView';
import { ChildServicesView } from './components/children/ChildServicesView';
import { DirectoryView } from './components/directory/DirectoryView';
import { ContinuityGapsView } from './components/gaps/ContinuityGapsView';
import { MultilingualAssistantView } from './components/assistant/MultilingualAssistantView';
import { ReportsView } from './components/reports/ReportsView';
import { PrivacyView } from './components/privacy/PrivacyView';
import { Menu, ShieldCheck } from 'lucide-react';

const MainLayout: React.FC = () => {
  const { activeTab, setActiveTab, currentPersona, currentRole, t } = useApp();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const renderActiveView = () => {
    switch (activeTab) {
      case 'dashboard':
        return <DashboardView />;
      case 'workers':
        return <WorkersView />;
      case 'journeys':
        return <JourneysView />;
      case 'schemes':
        return <SchemesView />;
      case 'benefits':
        return <BenefitsView />;
      case 'childServices':
        return <ChildServicesView />;
      case 'directory':
        return <DirectoryView />;
      case 'followups':
        return <ContinuityGapsView />;
      case 'assistant':
        return <MultilingualAssistantView />;
      case 'reports':
        return <ReportsView />;
      case 'privacy':
        return <PrivacyView />;
      default:
        return <DashboardView />;
    }
  };

  return (
    <div className="min-h-screen bg-neutral-50 flex flex-col font-sans">
      {/* Top Header */}
      <Header />

      {/* Mobile Toolbar for quick navigation toggle */}
      <div className="lg:hidden bg-white border-b border-neutral-200 px-4 py-2 flex items-center justify-between">
        <button
          onClick={() => setMobileMenuOpen(true)}
          className="flex items-center gap-2 text-xs font-semibold text-neutral-800 p-1.5 rounded-lg border border-neutral-200 cursor-pointer"
        >
          <Menu className="w-4 h-4" />
          <img 
            src="/assets/aistudio/WhatsApp_Image_2026-10-30_at_4.32.46_PM_5d5f4c96.jpeg" 
            alt="Logo" 
            className="w-4 h-4 object-contain rounded-xs"
          />
          <span>Menu: {activeTab.toUpperCase()}</span>
        </button>

        <span className="text-xs text-neutral-500 font-mono">
          {currentPersona.name} ({currentRole})
        </span>
      </div>

      {/* Main Body with Sidebar + Content */}
      <div className="flex-1 flex max-w-7xl w-full mx-auto">
        <Sidebar
          isOpenMobile={mobileMenuOpen}
          onCloseMobile={() => setMobileMenuOpen(false)}
        />

        <main className="flex-1 p-4 sm:p-6 lg:p-8 overflow-y-auto">
          {renderActiveView()}
        </main>
      </div>

      {/* Footer */}
      <footer className="border-t border-neutral-200 bg-white py-4 px-6 text-center text-xs text-neutral-500">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="flex items-center gap-2.5">
            <img 
              src="/assets/aistudio/WhatsApp_Image_2026-10-30_at_4.32.46_PM_5d5f4c96.jpeg" 
              alt="Root & Routes" 
              className="h-7 w-7 object-contain rounded-xs" 
            />
            <div className="flex items-center gap-2 text-xs">
              <span className="font-black tracking-tight text-sm">
                <span className="text-[#1C5F3B]">Root</span>{' '}
                <span className="text-[#E59E1B]">&amp;</span>{' '}
                <span className="text-[#1D649A]">Routes</span>
              </span>
              <span className="text-neutral-300">|</span>
              <span className="font-bold tracking-wider text-[11px] uppercase text-[#1C5F3B]">
                Education <span className="text-[#E59E1B]">•</span> Safety <span className="text-[#E59E1B]">•</span> Continuity
              </span>
            </div>
          </div>
          <div className="text-[11px] text-neutral-400 font-mono">
            Compliant with DPDP Act 2023 · Interstate &amp; Intra-Maharashtra Migration Support
          </div>
        </div>
      </footer>
    </div>
  );
};

export default function App() {
  return (
    <AppProvider>
      <MainLayout />
    </AppProvider>
  );
}
