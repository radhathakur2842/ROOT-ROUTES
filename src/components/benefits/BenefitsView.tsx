import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { BenefitApplication, ApplicationStage } from '../../types';
import { 
  CheckSquare, 
  Clock, 
  CheckCircle2, 
  AlertCircle, 
  Plus, 
  Calendar, 
  User, 
  FileCheck2, 
  ShieldCheck, 
  X,
  Filter
} from 'lucide-react';

export const BenefitsView: React.FC = () => {
  const { 
    applications, 
    updateApplicationStage, 
    workers, 
    schemes, 
    addBenefitApplication, 
    currentPersona, 
    currentRole, 
    canVerifyRecords,
    t 
  } = useApp();

  const [selectedApp, setSelectedApp] = useState<BenefitApplication | null>(null);
  const [stageFilter, setStageFilter] = useState<string>('ALL');
  const [updateNotes, setUpdateNotes] = useState('');
  const [refNumberInput, setRefNumberInput] = useState('');
  const [verificationSourceInput, setVerificationSourceInput] = useState('');

  const stageOptions: { key: ApplicationStage; label: string; badgeClass: string }[] = [
    { key: 'GUIDANCE_VIEWED', label: '1. Guidance Viewed', badgeClass: 'bg-neutral-100 text-neutral-700 border-neutral-300' },
    { key: 'CHECKLIST_COMPLETED', label: '2. Checklist Complete', badgeClass: 'bg-[#EBF4FB] text-[#154C76] border-[#9EC9EB]' },
    { key: 'APPLICATION_STARTED', label: '3. Application Started', badgeClass: 'bg-[#EBF4FB] text-[#1D649A] border-[#9EC9EB]' },
    { key: 'SUBMITTED', label: '4. Submitted to Portal', badgeClass: 'bg-[#FEF7EA] text-[#B87B0E] border-[#F8D793]' },
    { key: 'VERIFICATION_PENDING', label: '5. Official Verification Pending', badgeClass: 'bg-[#FEF7EA] text-[#B87B0E] border-[#F8D793]' },
    { key: 'BENEFIT_RECEIVED', label: '6. Benefit Received & Verified', badgeClass: 'bg-[#EAF5EE] text-[#1C5F3B] border-[#A4D7B7] font-bold' },
    { key: 'ACTION_REQUIRED', label: 'Action Required / Resubmit', badgeClass: 'bg-red-50 text-red-800 border-red-300 font-semibold' },
    { key: 'REJECTED', label: 'Rejected by Department', badgeClass: 'bg-neutral-200 text-neutral-800 border-neutral-400' },
  ];

  const getStageMeta = (stage: ApplicationStage) => {
    return stageOptions.find(s => s.key === stage) || stageOptions[0];
  };

  const filteredApps = applications.filter(a => {
    if (stageFilter === 'ALL') return true;
    return a.stage === stageFilter;
  });

  const handleStageUpdate = (targetStage: ApplicationStage) => {
    if (!selectedApp) return;

    updateApplicationStage(
      selectedApp.id, 
      targetStage, 
      verificationSourceInput || `Verified by ${currentPersona.name} (${currentPersona.role})`,
      updateNotes
    );

    setSelectedApp({
      ...selectedApp,
      stage: targetStage,
      lastUpdatedDate: new Date().toISOString().split('T')[0],
      verifiedBy: currentPersona.name,
      verificationSource: verificationSourceInput || `Verified by ${currentPersona.name}`,
    });

    setUpdateNotes('');
    setVerificationSourceInput('');
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold text-neutral-900 tracking-tight">
            Benefit Application &amp; Status Tracker
          </h2>
          <p className="text-xs text-neutral-500 mt-0.5">
            Step-by-step progress from guidance to authorized field verification of received benefits.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-xs text-neutral-500">Filter Stage:</span>
          <select
            value={stageFilter}
            onChange={(e) => setStageFilter(e.target.value)}
            className="text-xs border border-neutral-200 rounded-lg px-2.5 py-1.5 bg-white text-neutral-800 font-medium"
          >
            <option value="ALL">All Application Stages</option>
            {stageOptions.map(s => (
              <option key={s.key} value={s.key}>{s.label}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Manual Verification vs Fake API Disclaimer */}
      <div className="bg-amber-50 border border-amber-200 rounded-xl p-3.5 flex items-start gap-3">
        <ShieldCheck className="w-4 h-4 text-amber-800 shrink-0 mt-0.5" />
        <div className="text-xs text-amber-900 leading-relaxed">
          <strong>Authorized Verification Protocol:</strong> In compliance with security and audit guidelines, this system distinguishes between an application being <em>submitted</em> and the benefit actually being <em>received</em>. Until official government read-APIs are contracted, statuses represent user-entered tracking accompanied by authorized case worker verification.
        </div>
      </div>

      {/* Applications Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filteredApps.map(app => {
          const meta = getStageMeta(app.stage);

          return (
            <div
              key={app.id}
              className="bg-white rounded-xl border border-neutral-200 p-5 shadow-xs flex flex-col justify-between hover:border-neutral-300 transition-colors"
            >
              <div>
                <div className="flex items-center justify-between gap-2 mb-2">
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-neutral-100 text-neutral-700 font-semibold border border-neutral-200">
                    {app.schemeCode}
                  </span>
                  <span className={`text-[11px] font-mono px-2 py-0.5 rounded border ${meta.badgeClass}`}>
                    {meta.label}
                  </span>
                </div>

                <h3 className="text-base font-bold text-neutral-900 leading-snug">
                  {app.schemeName}
                </h3>

                <div className="flex items-center gap-2 text-xs text-neutral-600 mt-1">
                  <User className="w-3.5 h-3.5 text-neutral-400" />
                  <span className="font-semibold text-neutral-900">{app.workerName}</span>
                </div>

                <div className="mt-3 p-2.5 rounded-lg bg-neutral-50 border border-neutral-200 text-xs space-y-1">
                  {app.officialReferenceNumber && (
                    <div className="flex justify-between">
                      <span className="text-neutral-500">Ref / Ack Number:</span>
                      <span className="font-mono font-bold text-neutral-800">{app.officialReferenceNumber}</span>
                    </div>
                  )}
                  <div className="flex justify-between">
                    <span className="text-neutral-500">Last Updated:</span>
                    <span className="font-mono text-neutral-700">{app.lastUpdatedDate}</span>
                  </div>
                  {app.verifiedBy && (
                    <div className="flex justify-between">
                      <span className="text-neutral-500">Verified By:</span>
                      <span className="text-emerald-800 font-medium">{app.verifiedBy}</span>
                    </div>
                  )}
                  {app.verificationSource && (
                    <div className="text-[11px] text-neutral-500 pt-1 border-t border-neutral-200">
                      <strong>Source:</strong> {app.verificationSource}
                    </div>
                  )}
                </div>

                {app.notes && (
                  <p className="text-xs text-neutral-600 mt-3 italic line-clamp-2">
                    &ldquo;{app.notes}&rdquo;
                  </p>
                )}
              </div>

              <div className="pt-4 mt-4 border-t border-neutral-100 flex items-center justify-between gap-2">
                <span className="text-[11px] text-neutral-400">
                  {app.stage === 'BENEFIT_RECEIVED' ? '✓ Benefit Verified' : 'Action in progress'}
                </span>

                <button
                  onClick={() => setSelectedApp(app)}
                  className="px-3.5 py-1.5 bg-neutral-900 hover:bg-neutral-800 text-white text-xs font-semibold rounded-lg transition-colors cursor-pointer"
                >
                  Update Stage &amp; Verify
                </button>
              </div>
            </div>
          );
        })}

        {filteredApps.length === 0 && (
          <div className="col-span-2 py-12 text-center text-neutral-500 bg-white rounded-xl border border-neutral-200">
            No applications found matching the selected stage filter.
          </div>
        )}
      </div>

      {/* Stage Transition & Verification Modal */}
      {selectedApp && (
        <div className="fixed inset-0 bg-neutral-900/50 backdrop-blur-xs flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl max-w-xl w-full p-6 shadow-2xl border border-neutral-200 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between pb-3 border-b border-neutral-100">
              <div>
                <span className="text-[11px] font-mono text-neutral-400 uppercase">
                  Application Tracker ID #{selectedApp.id}
                </span>
                <h3 className="text-base font-bold text-neutral-900 mt-0.5">
                  {selectedApp.schemeName}
                </h3>
                <p className="text-xs text-neutral-500">
                  Beneficiary: <strong>{selectedApp.workerName}</strong>
                </p>
              </div>
              <button 
                onClick={() => setSelectedApp(null)}
                className="p-1 text-neutral-400 hover:text-neutral-700 rounded-lg cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-4 py-4 text-xs">
              <div>
                <label className="block font-bold text-neutral-900 mb-1.5">
                  Select New Application Status:
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {stageOptions.map(opt => (
                    <button
                      key={opt.key}
                      onClick={() => handleStageUpdate(opt.key)}
                      className={`p-2.5 rounded-lg border text-left font-medium transition-colors cursor-pointer ${
                        selectedApp.stage === opt.key
                          ? 'bg-neutral-900 text-white border-neutral-900 shadow-xs'
                          : 'bg-white border-neutral-200 hover:bg-neutral-50 text-neutral-800'
                      }`}
                    >
                      {opt.label}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block font-medium text-neutral-700 mb-1">
                  Verification Source / Proof Description:
                </label>
                <input
                  type="text"
                  value={verificationSourceInput}
                  onChange={(e) => setVerificationSourceInput(e.target.value)}
                  placeholder="e.g. Fair Price Shop physical verification receipt, MahaBOCW portal acknowledgement slip"
                  className="w-full p-2 border border-neutral-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-amber-500"
                />
              </div>

              <div>
                <label className="block font-medium text-neutral-700 mb-1">
                  Field Case Notes / Next Follow-up:
                </label>
                <textarea
                  rows={2}
                  value={updateNotes}
                  onChange={(e) => setUpdateNotes(e.target.value)}
                  placeholder="Add notes on next steps or documents required..."
                  className="w-full p-2 border border-neutral-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-amber-500"
                />
              </div>
            </div>

            <div className="flex justify-end pt-3 border-t border-neutral-100">
              <button
                onClick={() => setSelectedApp(null)}
                className="px-4 py-2 bg-neutral-900 text-white rounded-lg text-xs font-semibold cursor-pointer"
              >
                Close Tracker
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
