import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { DEMO_PERSONAS } from '../../data/mockData';
import { SupportedLanguage } from '../../types';
import { Globe, Users, ShieldAlert, Sparkles, RefreshCw } from 'lucide-react';

export const Header: React.FC = () => {
  const { currentPersona, currentRole, language, setLanguage, switchPersona, setActiveTab, resetDemoData, t } = useApp();
  const [showPersonaMenu, setShowPersonaMenu] = useState(false);

  const languages: { code: SupportedLanguage; label: string }[] = [
    { code: 'en', label: 'English' },
    { code: 'hi', label: 'हिन्दी' },
    { code: 'mr', label: 'मराठी' },
    { code: 'bho', label: 'भोजपुरी' },
  ];

  const getRoleBadgeColor = (role: string) => {
    switch (role) {
      case 'WORKER': return 'bg-[#FEF7EA] text-[#B87B0E] border-[#F8D793]';
      case 'CONTRACTOR': return 'bg-[#EBF4FB] text-[#154C76] border-[#9EC9EB]';
      case 'FIELD_WORKER': return 'bg-[#EAF5EE] text-[#14462B] border-[#A4D7B7]';
      case 'ADMIN': return 'bg-purple-50 text-purple-800 border-purple-200';
      default: return 'bg-neutral-100 text-neutral-800 border-neutral-300';
    }
  };

  return (
    <header className="sticky top-0 z-40 bg-white border-b border-neutral-200">
      {/* Top Banner: Verification & Disclaimer Notice in theme palette */}
      <div className="bg-[#FAFBF9] border-b border-[#E3EBE6] px-4 py-1.5 text-xs text-neutral-700 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-[#1C5F3B]" />
          <span>
            <strong className="text-[#1C5F3B]">Independent Service Platform:</strong> Fictional demonstration records for migration corridors (Bihar/UP/Odisha &rarr; Maharashtra). No Aadhaar storage.
          </span>
        </div>
        <button 
          onClick={resetDemoData}
          title="Reset to default demo scenario"
          className="hover:underline flex items-center gap-1 font-semibold text-[#1C5F3B] hover:text-[#14462B] shrink-0 ml-4 cursor-pointer"
        >
          <RefreshCw className="w-3 h-3" />
          <span>Reset Demo</span>
        </button>
      </div>

      {/* Strict 3-Zone Header Contract */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-8">
        {/* Zone 1: Brand Wordmark & Logo */}
        <div className="flex items-center gap-3 shrink-0">
          <img 
            src="/assets/aistudio/WhatsApp_Image_2026-10-30_at_4.32.46_PM_5d5f4c96.jpeg" 
            alt="Root & Routes Logo" 
            className="h-10 w-10 object-contain rounded-lg border border-neutral-200/80 bg-white p-0.5 shadow-2xs shrink-0" 
          />
          <div>
            <div className="flex items-center gap-2">
              <span className="text-base sm:text-lg font-bold tracking-tight whitespace-nowrap">
                <span className="text-[#1C5F3B]">Root</span>{' '}
                <span className="text-[#E59E1B]">&amp;</span>{' '}
                <span className="text-[#1D649A]">Routes</span>
              </span>
              <span className="text-[10px] px-2 py-0.5 rounded-full font-semibold border bg-[#EAF5EE] text-[#1C5F3B] border-[#A4D7B7]">
                Pilot
              </span>
            </div>
            <p className="text-[10px] text-[#1C5F3B] font-semibold tracking-wider uppercase hidden sm:block">
              Education · Safety · Continuity
            </p>
          </div>
        </div>

        {/* Zone 2: Navigation Links (Whitespace-nowrap, clean, responsive) */}
        <nav className="hidden md:flex items-center gap-6 text-sm font-medium text-neutral-600">
          <button 
            onClick={() => setActiveTab('schemes')}
            className="hover:text-[#1C5F3B] transition-colors whitespace-nowrap cursor-pointer"
          >
            {t.nav.schemes}
          </button>
          <button 
            onClick={() => setActiveTab('directory')}
            className="hover:text-[#1D649A] transition-colors whitespace-nowrap cursor-pointer"
          >
            {t.nav.directory}
          </button>
          <button 
            onClick={() => setActiveTab('childServices')}
            className="hover:text-[#1C5F3B] transition-colors whitespace-nowrap cursor-pointer"
          >
            {t.nav.childServices}
          </button>
          <button 
            onClick={() => setActiveTab('assistant')}
            className="hover:text-[#14462B] transition-colors whitespace-nowrap flex items-center gap-1.5 cursor-pointer text-[#1C5F3B] font-semibold bg-[#EAF5EE] px-2.5 py-1 rounded-md border border-[#A4D7B7]"
          >
            <Sparkles className="w-3.5 h-3.5 text-[#E59E1B]" />
            <span>Multilingual Guide</span>
          </button>
        </nav>

        {/* Zone 3: Actions (Language Selector + Role Switcher) */}
        <div className="flex items-center gap-3 shrink-0">
          {/* Language Selector */}
          <div className="flex items-center bg-neutral-100 rounded-lg p-0.5 border border-neutral-200">
            <div className="pl-2 pr-1 text-neutral-500">
              <Globe className="w-3.5 h-3.5" />
            </div>
            {languages.map(l => (
              <button
                key={l.code}
                onClick={() => setLanguage(l.code)}
                className={`px-2 py-1 text-xs font-semibold rounded-md transition-colors cursor-pointer whitespace-nowrap ${
                  language === l.code
                    ? 'bg-white text-[#1C5F3B] shadow-xs'
                    : 'text-neutral-600 hover:text-neutral-900'
                }`}
                title={l.label}
              >
                {l.code.toUpperCase()}
              </button>
            ))}
          </div>

          {/* Persona / Role Switcher */}
          <div className="relative">
            <button
              onClick={() => setShowPersonaMenu(!showPersonaMenu)}
              className="flex items-center gap-2 pl-3 pr-2.5 py-1.5 rounded-lg border border-neutral-300 hover:border-[#1C5F3B] bg-white shadow-xs transition-colors cursor-pointer"
            >
              <div className="w-6 h-6 rounded-full bg-[#1C5F3B] text-white text-[11px] font-bold flex items-center justify-center">
                {currentPersona.avatarPlaceholder}
              </div>
              <div className="text-left hidden sm:block">
                <div className="text-xs font-semibold text-neutral-900 leading-tight">
                  {currentPersona.name}
                </div>
                <div className="text-[10px] text-neutral-500 leading-tight">
                  {t.roles[currentRole]}
                </div>
              </div>
              <Users className="w-3.5 h-3.5 text-neutral-400 ml-1" />
            </button>

            {/* Persona Switcher Dropdown */}
            {showPersonaMenu && (
              <div className="absolute right-0 mt-2 w-80 bg-white rounded-xl shadow-xl border border-neutral-200 p-2 z-50">
                <div className="px-3 py-2 border-b border-neutral-100">
                  <p className="text-xs font-bold text-neutral-900 uppercase tracking-wider">
                    {t.common.switchRole}
                  </p>
                  <p className="text-[11px] text-neutral-500">
                    Switch perspectives to test role-based permissions and workflows.
                  </p>
                </div>
                <div className="py-1 space-y-1">
                  {DEMO_PERSONAS.map(p => (
                    <button
                      key={p.id}
                      onClick={() => {
                        switchPersona(p.id);
                        setShowPersonaMenu(false);
                      }}
                      className={`w-full text-left p-2.5 rounded-lg transition-colors flex items-start gap-3 cursor-pointer ${
                        currentPersona.id === p.id 
                          ? 'bg-[#EAF5EE] border border-[#A4D7B7]' 
                          : 'hover:bg-neutral-50'
                      }`}
                    >
                      <div className="w-8 h-8 rounded-full bg-[#1C5F3B] text-white text-xs font-bold flex items-center justify-center shrink-0 mt-0.5">
                        {p.avatarPlaceholder}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between gap-1">
                          <span className="text-xs font-bold text-neutral-900 truncate">
                            {p.name}
                          </span>
                          <span className={`text-[10px] px-1.5 py-0.2 rounded border font-medium ${getRoleBadgeColor(p.role)}`}>
                            {p.role}
                          </span>
                        </div>
                        <p className="text-[11px] text-neutral-600 truncate">
                          {p.designation}
                        </p>
                        <p className="text-[10px] text-neutral-400 mt-0.5 truncate">
                          {p.location}
                        </p>
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};
