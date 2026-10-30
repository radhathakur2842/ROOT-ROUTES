import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { 
  GraduationCap, 
  HeartPulse, 
  Baby, 
  ShieldAlert, 
  CheckCircle2, 
  Clock, 
  AlertCircle, 
  Lock, 
  Phone, 
  Plus, 
  X,
  FileText
} from 'lucide-react';

export const ChildServicesView: React.FC = () => {
  const { 
    educationRecords, 
    healthRecords, 
    childcareRecords, 
    protectionCases, 
    updateEducationRecord, 
    updateHealthRecord, 
    canAccessChildProtection, 
    canAccessChildMedical,
    currentRole,
    t 
  } = useApp();

  const [activeSubTab, setActiveSubTab] = useState<'EDUCATION' | 'HEALTH' | 'CHILDCARE' | 'PROTECTION'>('EDUCATION');
  const [selectedCaseModal, setSelectedCaseModal] = useState<any>(null);

  return (
    <div className="space-y-6">
      {/* Title */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold text-neutral-900 tracking-tight">
            Child Services &amp; Continuity Workflow
          </h2>
          <p className="text-xs text-neutral-500 mt-0.5">
            Four pillars: Education, Public Healthcare &amp; Immunization, Anganwadi Childcare, and Confidential Protection.
          </p>
        </div>

        {/* Sub-tabs with Logo Palette */}
        <div className="flex items-center gap-1 bg-neutral-100 p-1 rounded-lg border border-neutral-200 overflow-x-auto self-start sm:self-auto">
          <button
            onClick={() => setActiveSubTab('EDUCATION')}
            className={`px-3 py-1.5 text-xs font-semibold rounded-md transition-colors whitespace-nowrap cursor-pointer ${
              activeSubTab === 'EDUCATION' ? 'bg-[#1C5F3B] text-white shadow-xs' : 'text-neutral-600 hover:text-neutral-900'
            }`}
          >
            Education (RTE Sec 4)
          </button>
          <button
            onClick={() => setActiveSubTab('HEALTH')}
            className={`px-3 py-1.5 text-xs font-semibold rounded-md transition-colors whitespace-nowrap cursor-pointer ${
              activeSubTab === 'HEALTH' ? 'bg-[#1D649A] text-white shadow-xs' : 'text-neutral-600 hover:text-neutral-900'
            }`}
          >
            Health &amp; Vaccination
          </button>
          <button
            onClick={() => setActiveSubTab('CHILDCARE')}
            className={`px-3 py-1.5 text-xs font-bold rounded-md transition-colors whitespace-nowrap cursor-pointer ${
              activeSubTab === 'CHILDCARE' ? 'bg-[#E59E1B] text-neutral-950 shadow-xs' : 'text-neutral-600 hover:text-neutral-900'
            }`}
          >
            Anganwadi Childcare
          </button>
          <button
            onClick={() => setActiveSubTab('PROTECTION')}
            className={`px-3 py-1.5 text-xs font-semibold rounded-md transition-colors whitespace-nowrap flex items-center gap-1 cursor-pointer ${
              activeSubTab === 'PROTECTION' 
                ? 'bg-red-800 text-white shadow-xs' 
                : 'text-neutral-600 hover:text-neutral-900'
            }`}
          >
            {!canAccessChildProtection && <Lock className="w-3 h-3 text-neutral-400" />}
            <span>Safeguarding &amp; Protection</span>
          </button>
        </div>
      </div>

      {/* Contractor Guard Banner if contractor tries to access protection or medical */}
      {currentRole === 'CONTRACTOR' && (activeSubTab === 'PROTECTION' || activeSubTab === 'HEALTH') && (
        <div className="bg-neutral-900 text-white rounded-2xl p-8 text-center max-w-xl mx-auto space-y-4 my-8 shadow-xl">
          <div className="w-12 h-12 rounded-full bg-red-900/50 border border-red-500 text-red-300 flex items-center justify-center mx-auto">
            <Lock className="w-6 h-6" />
          </div>
          <div>
            <h3 className="text-lg font-bold">Access Restricted for Employer / Contractor Role</h3>
            <p className="text-xs text-neutral-300 mt-2 leading-relaxed">
              In strict accordance with Child Safeguarding mandates, the Juvenile Justice Act, and DPDP Act data minimisation principles, <strong>Labour Contractors and Employers are not granted access to children's medical histories, vaccination details, or confidential child-protection cases</strong>.
            </p>
          </div>
          <div className="pt-2">
            <button
              onClick={() => setActiveSubTab('EDUCATION')}
              className="px-4 py-2 bg-neutral-800 hover:bg-neutral-700 text-white text-xs font-semibold rounded-lg transition-colors cursor-pointer"
            >
              Return to Education Continuity
            </button>
          </div>
        </div>
      )}

      {/* 1. EDUCATION CONTINUITY TAB */}
      {activeSubTab === 'EDUCATION' && (
        <div className="space-y-4">
          <div className="bg-[#EAF5EE] border border-[#A4D7B7] rounded-xl p-4 flex items-start gap-3">
            <GraduationCap className="w-5 h-5 text-[#1C5F3B] shrink-0 mt-0.5" />
            <div className="text-xs text-[#14462B] leading-relaxed">
              <strong>Statutory Right to Education (RTE Act 2009 — Section 4):</strong> Every migrant child aged 6-14 has the fundamental right to immediate age-appropriate admission in government and local authority schools without being denied due to lack of a Transfer Certificate (TC) or birth certificate. Bridge courses and mid-day meals must be provided immediately upon enrollment.
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {educationRecords.map(rec => (
              <div key={rec.id} className="bg-white rounded-xl border border-neutral-200 p-5 shadow-xs space-y-3">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-base font-bold text-neutral-900">{rec.childName}</h3>
                    <p className="text-xs text-neutral-500">
                      Age {rec.currentAge} Years · Enrolling in {rec.targetStandard}
                    </p>
                  </div>
                  <span className={`px-2 py-0.5 rounded text-[11px] font-mono font-bold ${
                    rec.status === 'ENROLLED' ? 'bg-[#EAF5EE] text-[#1C5F3B] border border-[#A4D7B7]' :
                    rec.status === 'REFERRED' ? 'bg-[#EBF4FB] text-[#1D649A] border border-[#9EC9EB]' :
                    'bg-[#FEF7EA] text-[#B87B0E] border border-[#F8D793]'
                  }`}>
                    {rec.status}
                  </span>
                </div>

                <div className="p-3 bg-neutral-50 rounded-lg text-xs space-y-1.5 border border-neutral-200">
                  <div className="flex justify-between">
                    <span className="text-neutral-500">Parent / Guardian:</span>
                    <span className="font-semibold text-neutral-800">{rec.workerName}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-neutral-500">Origin School:</span>
                    <span className="text-neutral-700">{rec.originSchoolName || 'Direct / Bridge intake'}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-neutral-500">Target School:</span>
                    <span className="font-semibold text-neutral-900">{rec.assignedSchoolName || 'Referral pending'}</span>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-2 text-xs">
                  <div className="p-2 bg-neutral-50 rounded border border-neutral-200 flex items-center justify-between">
                    <span>Bridge Support:</span>
                    <span className="font-bold text-neutral-800">{rec.bridgeCourseProvided ? '✓ Provided' : 'Pending'}</span>
                  </div>
                  <div className="p-2 bg-neutral-50 rounded border border-neutral-200 flex items-center justify-between">
                    <span>Books/Uniform:</span>
                    <span className="font-bold text-neutral-800">{rec.freeUniformBooksProvided ? '✓ Provided' : 'Pending'}</span>
                  </div>
                </div>

                {rec.notes && (
                  <p className="text-xs text-neutral-600 italic">
                    &ldquo;{rec.notes}&rdquo;
                  </p>
                )}

                <div className="pt-2 border-t border-neutral-100 flex items-center justify-between">
                  <span className="text-[11px] text-neutral-400">
                    Follow-up: <strong className="font-mono text-neutral-700">{rec.nextFollowUpDate}</strong>
                  </span>
                  <button
                    onClick={() => updateEducationRecord(rec.id, { 
                      status: 'ENROLLED', 
                      freeUniformBooksProvided: true, 
                      bridgeCourseProvided: true 
                    })}
                    className="px-3 py-1.5 bg-[#1C5F3B] hover:bg-[#14462B] text-white rounded-lg text-xs font-semibold cursor-pointer shadow-xs"
                  >
                    Confirm Enrollment
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* 2. HEALTH & IMMUNIZATION TAB */}
      {activeSubTab === 'HEALTH' && canAccessChildMedical && (
        <div className="space-y-4">
          <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-4 flex items-start gap-3">
            <HeartPulse className="w-5 h-5 text-emerald-700 shrink-0 mt-0.5" />
            <div className="text-xs text-emerald-900 leading-relaxed">
              <strong>Universal Immunization Programme (UIP) &amp; U-WIN:</strong> Children are eligible for all routine vaccines free of cost at any Primary Health Centre in Maharashtra without domicile barriers. Presenting the Mother-Child Protection (MCP) card facilitates continuation, but lost cards are replaced immediately on spot.
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {healthRecords.map(rec => (
              <div key={rec.id} className="bg-white rounded-xl border border-neutral-200 p-5 shadow-xs space-y-3">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-base font-bold text-neutral-900">{rec.childName}</h3>
                    <p className="text-xs text-neutral-500">
                      Age {rec.currentAgeMonths} Months · Mother: Geeta Devi
                    </p>
                  </div>
                  <span className={`px-2 py-0.5 rounded text-[11px] font-mono font-bold ${
                    rec.status === 'UP_TO_DATE' ? 'bg-emerald-50 text-emerald-800 border border-emerald-300' :
                    rec.status === 'DUE' ? 'bg-amber-50 text-amber-800 border border-amber-300' :
                    'bg-red-50 text-red-800 border border-red-300'
                  }`}>
                    {rec.status}
                  </span>
                </div>

                <div className="p-3 bg-neutral-50 rounded-lg text-xs space-y-1.5 border border-neutral-200">
                  <div className="flex justify-between">
                    <span className="text-neutral-500">Next Vaccine Due:</span>
                    <span className="font-bold text-amber-900">{rec.nextVaccineDue}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-neutral-500">Target PHC Center:</span>
                    <span className="font-semibold text-neutral-900">{rec.targetPhcName}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-neutral-500">MCP Card In Possession:</span>
                    <span className="font-semibold text-emerald-800">{rec.mcpCardAvailable ? '✓ Yes (Verified)' : 'Needs New Green Card'}</span>
                  </div>
                </div>

                <div className="pt-2 border-t border-neutral-100 flex items-center justify-between">
                  <span className="text-[11px] text-neutral-400">
                    Due Date: <strong className="font-mono text-neutral-700">{rec.dueDate}</strong>
                  </span>
                  <button
                    onClick={() => updateHealthRecord(rec.id, { status: 'UP_TO_DATE', lastFollowUpDate: new Date().toISOString().split('T')[0] })}
                    className="px-3 py-1.5 bg-neutral-900 hover:bg-neutral-800 text-white rounded-lg text-xs font-semibold cursor-pointer"
                  >
                    Log Dose Administered
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* 3. ANGANWADI CHILDCARE TAB */}
      {activeSubTab === 'CHILDCARE' && (
        <div className="space-y-4">
          <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 flex items-start gap-3">
            <Baby className="w-5 h-5 text-amber-700 shrink-0 mt-0.5" />
            <div className="text-xs text-amber-900 leading-relaxed">
              <strong>Integrated Child Development Services (ICDS):</strong> Children 6mo-3yr receive Take Home Ration (THR) micro-nutrient packets; children 3-6yr receive hot cooked meals and non-formal preschool. Growth monitoring (weight/height) ensures early detection of acute malnutrition among mobile children.
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {childcareRecords.map(rec => (
              <div key={rec.id} className="bg-white rounded-xl border border-neutral-200 p-5 shadow-xs space-y-3">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-base font-bold text-neutral-900">{rec.childName}</h3>
                    <p className="text-xs text-neutral-500">
                      Age {rec.currentAgeMonths} Months · Worker: {rec.workerName}
                    </p>
                  </div>
                  <span className="px-2 py-0.5 rounded text-[11px] font-mono font-bold bg-emerald-50 text-emerald-800 border border-emerald-300">
                    {rec.status}
                  </span>
                </div>

                <div className="p-3 bg-neutral-50 rounded-lg text-xs space-y-1.5 border border-neutral-200">
                  <div className="flex justify-between">
                    <span className="text-neutral-500">Anganwadi Centre:</span>
                    <span className="font-semibold text-neutral-900">{rec.anganwadiCentreName}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-neutral-500">Take Home Ration (THR):</span>
                    <span className="font-bold text-emerald-800">{rec.takeHomeRationReceived ? '✓ Dispatched' : 'Pending'}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-neutral-500">Growth Monitored:</span>
                    <span className="font-bold text-neutral-800">{rec.growthMonitored ? '✓ Measured (Normal Curve)' : 'Pending'}</span>
                  </div>
                </div>

                <div className="pt-2 border-t border-neutral-100 flex items-center justify-between text-[11px] text-neutral-500">
                  <span>Last Visit: <strong className="font-mono">{rec.lastVisitDate || 'Recent'}</strong></span>
                  <span className="text-emerald-700 font-semibold">Active in Poshan Tracker</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* 4. SAFEGUARDING & CHILD PROTECTION TAB */}
      {activeSubTab === 'PROTECTION' && canAccessChildProtection && (
        <div className="space-y-4">
          <div className="bg-red-50 border border-red-200 rounded-xl p-4 flex items-start gap-3">
            <ShieldAlert className="w-5 h-5 text-red-700 shrink-0 mt-0.5" />
            <div className="text-xs text-red-900 leading-relaxed space-y-1">
              <p className="font-bold">Confidential Child Safeguarding &amp; Escalation Protocol:</p>
              <p>
                In case of imminent danger, severe neglect, or child labour exploitation, call <strong>Childline 1098</strong> immediately. Protection records are restricted exclusively to accredited case workers, DCPU officers, and system administrators.
              </p>
            </div>
          </div>

          <div className="space-y-3">
            {protectionCases.map(c => (
              <div key={c.id} className="bg-white rounded-xl border border-red-200 p-5 shadow-xs space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-red-100 text-red-800 border border-red-300">
                      {c.priority} PRIORITY
                    </span>
                    <h3 className="text-base font-bold text-neutral-900">
                      Case #{c.id} · {c.childName} (Worker: {c.workerName})
                    </h3>
                  </div>
                  <span className="text-xs font-mono font-bold text-neutral-700">
                    {c.status}
                  </span>
                </div>

                <p className="text-xs text-neutral-700 leading-relaxed font-medium">
                  {c.escalationNotice}
                </p>

                <div className="p-3 bg-neutral-900 text-neutral-200 rounded-lg text-xs space-y-1 font-mono">
                  <div className="text-[10px] uppercase text-amber-400 font-bold">
                    [RESTRICTED FIELD CASE NOTES · DCPU ACCESS ONLY]
                  </div>
                  <p className="text-neutral-300">
                    {c.notesRestricted}
                  </p>
                </div>

                <div className="pt-2 border-t border-neutral-100 flex items-center justify-between text-xs">
                  <span className="text-neutral-500">
                    Assigned: <strong>{c.caseWorkerAssigned}</strong> · Reported: <span className="font-mono">{c.reportedDate}</span>
                  </span>

                  <a
                    href="tel:1098"
                    className="px-3 py-1.5 bg-red-600 hover:bg-red-700 text-white rounded-lg text-xs font-semibold flex items-center gap-1.5 shadow-xs"
                  >
                    <Phone className="w-3.5 h-3.5" />
                    <span>Dial 1098 (Toll Free)</span>
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
