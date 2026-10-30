import React from 'react';
import { useApp } from '../../context/AppContext';
import { 
  LayoutDashboard, 
  Users, 
  Compass, 
  BookOpen, 
  CheckSquare, 
  GraduationCap, 
  MapPin, 
  AlertCircle, 
  BarChart3, 
  ShieldCheck, 
  Sparkles,
  Lock
} from 'lucide-react';

interface SidebarProps {
  isOpenMobile: boolean;
  onCloseMobile: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ isOpenMobile, onCloseMobile }) => {
  const { activeTab, setActiveTab, currentPersona, currentRole, continuityGaps, t } = useApp();

  const unresolvedGapsCount = continuityGaps.filter(g => !g.resolved).length;

  const navItems = [
    { id: 'dashboard', label: t.nav.dashboard, icon: LayoutDashboard },
    { id: 'workers', label: t.nav.workers, icon: Users },
    { id: 'journeys', label: t.nav.journeys, icon: Compass },
    { id: 'schemes', label: t.nav.schemes, icon: BookOpen },
    { id: 'benefits', label: t.nav.benefits, icon: CheckSquare },
    { 
      id: 'childServices', 
      label: t.nav.childServices, 
      icon: GraduationCap, 
      restrictedBadge: currentRole === 'CONTRACTOR' ? 'Safeguarded' : undefined 
    },
    { id: 'directory', label: t.nav.directory, icon: MapPin },
    { 
      id: 'followups', 
      label: t.nav.followups, 
      icon: AlertCircle, 
      badge: unresolvedGapsCount > 0 ? unresolvedGapsCount : undefined 
    },
    { id: 'assistant', label: 'Multilingual Guide', icon: Sparkles, highlight: true },
    { id: 'reports', label: t.nav.reports, icon: BarChart3 },
    { id: 'privacy', label: t.nav.privacy, icon: ShieldCheck },
  ];

  const handleNavClick = (id: string) => {
    setActiveTab(id);
    onCloseMobile();
  };

  return (
    <>
      {/* Mobile Backdrop */}
      {isOpenMobile && (
        <div 
          onClick={onCloseMobile}
          className="fixed inset-0 bg-neutral-900/40 backdrop-blur-xs z-30 lg:hidden"
        />
      )}

      {/* Sidebar Container */}
      <aside
        className={`fixed lg:sticky top-16 z-30 h-[calc(100vh-4rem)] w-64 bg-white border-r border-neutral-200 flex flex-col justify-between transition-transform duration-200 ease-in-out shrink-0 ${
          isOpenMobile ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
        }`}
      >
        {/* Navigation list */}
        <div className="p-3 space-y-1 overflow-y-auto flex-1">
          <div className="px-3 py-2 text-[11px] font-bold text-neutral-400 uppercase tracking-wider flex items-center justify-between">
            <span>Platform Modules</span>
            <span className="w-1.5 h-1.5 rounded-full bg-[#1C5F3B]" />
          </div>

          {navItems.map(item => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;

            return (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                className={`w-full flex items-center justify-between px-3 py-2 text-sm font-medium rounded-lg transition-colors cursor-pointer text-left ${
                  isActive
                    ? 'bg-[#1C5F3B] text-white shadow-xs font-semibold'
                    : 'text-neutral-600 hover:text-neutral-900 hover:bg-[#EAF5EE]/40'
                } ${item.highlight && !isActive ? 'text-[#1C5F3B] bg-[#EAF5EE] border border-[#A4D7B7] font-semibold' : ''}`}
              >
                <div className="flex items-center gap-2.5 truncate">
                  <Icon className={`w-4 h-4 shrink-0 ${
                    isActive ? 'text-white' : item.highlight ? 'text-[#E59E1B]' : 'text-neutral-500'
                  }`} />
                  <span className="truncate">{item.label}</span>
                </div>

                {item.badge !== undefined && (
                  <span className={`text-[10px] font-mono font-bold px-1.5 py-0.5 rounded-full ${
                    isActive ? 'bg-[#E59E1B] text-neutral-900' : 'bg-[#FEF7EA] text-[#B87B0E] border border-[#F8D793]'
                  }`}>
                    {item.badge}
                  </span>
                )}

                {item.restrictedBadge && (
                  <span className="flex items-center gap-1 text-[10px] px-1.5 py-0.5 rounded bg-neutral-100 text-neutral-500 border border-neutral-200" title="Sensitive child medical/protection records restricted for contractors">
                    <Lock className="w-2.5 h-2.5" />
                    <span>{item.restrictedBadge}</span>
                  </span>
                )}
              </button>
            );
          })}
        </div>

        {/* Current Active Persona Card at bottom */}
        <div className="p-3 border-t border-neutral-200 bg-[#FAFBF9]">
          <div className="p-2.5 rounded-lg border border-[#E3EBE6] bg-white shadow-xs">
            <div className="flex items-center justify-between text-[11px] text-neutral-500 mb-1">
              <span>Active Perspective</span>
              <span className="font-mono font-semibold text-[10px] px-1.5 py-0.2 bg-[#EAF5EE] rounded text-[#1C5F3B]">
                {currentPersona.role}
              </span>
            </div>
            <div className="text-xs font-bold text-neutral-900 truncate flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-[#1C5F3B] shrink-0" />
              <span className="truncate">{currentPersona.name}</span>
            </div>
            <p className="text-[11px] text-neutral-500 truncate mt-0.5">
              {currentPersona.organization || currentPersona.location}
            </p>
          </div>
        </div>
      </aside>
    </>
  );
};
