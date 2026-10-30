import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { 
  ShieldCheck, 
  Lock, 
  FileCheck2, 
  Clock, 
  AlertCircle, 
  CheckCircle2, 
  UserCheck, 
  Send,
  X
} from 'lucide-react';

export const PrivacyView: React.FC = () => {
  const { 
    auditLogs, 
    corrections, 
    submitDataCorrection, 
    reviewDataCorrection, 
    workers, 
    currentPersona, 
    currentRole,
    canVerifyRecords,
    t 
  } = useApp();

  const [showCorrectionModal, setShowCorrectionModal] = useState(false);
  const [corrWorkerId, setCorrWorkerId] = useState(workers[0]?.id || '');
  const [fieldToCorrect, setFieldToCorrect] = useState('');
  const [currentVal, setCurrentVal] = useState('');
  const [suggestedVal, setSuggestedVal] = useState('');
  const [reason, setReason] = useState('');

  const handleCorrectionSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const worker = workers.find(w => w.id === corrWorkerId);
    if (!worker || !fieldToCorrect || !suggestedVal) return;

    submitDataCorrection({
      workerId: worker.id,
      workerName: worker.name,
      requestedByRole: currentRole,
      fieldToCorrect,
      currentValue: currentVal,
      suggestedValue: suggestedVal,
      reason,
    });

    setShowCorrectionModal(false);
    setFieldToCorrect('');
    setCurrentVal('');
    setSuggestedVal('');
    setReason('');
  };

  return (
    <div className="space-y-6">
      {/* Title */}
      <div>
        <h2 className="text-xl font-bold text-neutral-900 tracking-tight">
          Privacy, Data Protection (DPDP Act 2023) &amp; Audit Trail
        </h2>
        <p className="text-xs text-neutral-500 mt-0.5">
          Constitutional rights, purpose-specific consent, grievance correction, and immutable access logs.
        </p>
      </div>

      {/* DPDP Compliance Card */}
      <div className="bg-white rounded-xl border border-neutral-200 p-6 shadow-xs space-y-4">
        <div className="flex items-center gap-2 pb-3 border-b border-neutral-100">
          <ShieldCheck className="w-5 h-5 text-[#1C5F3B]" />
          <h3 className="text-base font-bold text-neutral-900">
            Digital Personal Data Protection (DPDP) Act Compliance Notice
          </h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
          <div className="p-3.5 bg-neutral-50 rounded-lg border border-neutral-200 space-y-1">
            <span className="font-bold text-neutral-900">1. Data Minimisation</span>
            <p className="text-neutral-600 leading-relaxed">
              No Aadhaar numbers, biometric scans, or bank passwords are saved. Only essential contact, migration corridor, and school/health linkage consent is processed.
            </p>
          </div>

          <div className="p-3.5 bg-neutral-50 rounded-lg border border-neutral-200 space-y-1">
            <span className="font-bold text-neutral-900">2. Role-Based Access Boundary</span>
            <p className="text-neutral-600 leading-relaxed">
              Contractors and employers cannot view child medical histories or child-protection reports. Only authorized case workers access safeguarding files.
            </p>
          </div>

          <div className="p-3.5 bg-neutral-50 rounded-lg border border-neutral-200 space-y-1">
            <span className="font-bold text-neutral-900">3. Right to Correction &amp; Withdrawal</span>
            <p className="text-neutral-600 leading-relaxed">
              Every migrant family holds the statutory right to request prompt correction of inaccurate records or withdraw consent without loss of basic service rights.
            </p>
          </div>
        </div>

        <div className="pt-2 flex justify-end">
          <button
            onClick={() => setShowCorrectionModal(true)}
            className="px-4 py-2 bg-[#1C5F3B] hover:bg-[#14462B] text-white rounded-lg text-xs font-semibold cursor-pointer shadow-xs transition-colors"
          >
            Submit Data Correction Request
          </button>
        </div>
      </div>

      {/* Data Correction Requests Section */}
      <div className="bg-white rounded-xl border border-neutral-200 p-5 shadow-xs">
        <h3 className="text-sm font-bold text-neutral-900 pb-3 border-b border-neutral-100">
          Pending &amp; Reviewed Correction Requests ({corrections.length})
        </h3>

        <div className="divide-y divide-neutral-100 mt-2 text-xs">
          {corrections.map(c => (
            <div key={c.id} className="py-3.5 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div>
                <div className="flex items-center gap-2">
                  <span className="font-bold text-neutral-900">{c.workerName}</span>
                  <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-neutral-100 text-neutral-600">
                    Field: {c.fieldToCorrect}
                  </span>
                  <span className={`text-[10px] font-mono font-bold px-1.5 py-0.5 rounded ${
                    c.status === 'APPROVED_APPLIED' ? 'bg-[#EAF5EE] text-[#1C5F3B] border border-[#A4D7B7]' :
                    c.status === 'REJECTED' ? 'bg-red-50 text-red-800 border border-red-300' :
                    'bg-[#FEF7EA] text-[#B87B0E] border border-[#F8D793]'
                  }`}>
                    {c.status}
                  </span>
                </div>

                <div className="text-neutral-600 mt-1">
                  Change: <del className="text-red-700">{c.currentValue}</del> &rarr; <strong className="text-[#1C5F3B]">{c.suggestedValue}</strong>
                </div>

                <p className="text-[11px] text-neutral-500 mt-0.5 italic">
                  Reason: &ldquo;{c.reason}&rdquo; · Submitted: <span className="font-mono">{c.submittedDate}</span> by {c.requestedByRole}
                </p>
              </div>

              {canVerifyRecords && c.status === 'PENDING_REVIEW' && (
                <div className="flex items-center gap-2 shrink-0">
                  <button
                    onClick={() => reviewDataCorrection(c.id, 'APPROVED_APPLIED')}
                    className="px-2.5 py-1 bg-[#1C5F3B] hover:bg-[#14462B] text-white rounded text-xs font-semibold cursor-pointer transition-colors"
                  >
                    Approve
                  </button>
                  <button
                    onClick={() => reviewDataCorrection(c.id, 'REJECTED')}
                    className="px-2.5 py-1 bg-neutral-200 hover:bg-neutral-300 text-neutral-800 rounded text-xs font-semibold cursor-pointer"
                  >
                    Reject
                  </button>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Immutable Audit Log Table */}
      <div className="bg-white rounded-xl border border-neutral-200 shadow-xs overflow-hidden">
        <div className="p-4 border-b border-neutral-100 flex items-center justify-between">
          <div>
            <h3 className="text-sm font-bold text-neutral-900">
              Immutable System Audit Log
            </h3>
            <p className="text-xs text-neutral-500">
              Every profile modification, referral verification, and status advancement is cryptographically logged.
            </p>
          </div>
          <span className="text-xs font-mono text-neutral-400">
            {auditLogs.length} Events Recorded
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-xs text-left">
            <thead className="bg-neutral-50 text-neutral-500 uppercase font-mono text-[10px] border-b border-neutral-200">
              <tr>
                <th className="py-2.5 px-4">Timestamp (IST)</th>
                <th className="py-2.5 px-4">Actor &amp; Role</th>
                <th className="py-2.5 px-4">Action</th>
                <th className="py-2.5 px-4">Target Entity</th>
                <th className="py-2.5 px-4">Audit Details</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-neutral-100 font-mono text-[11px]">
              {auditLogs.slice(0, 10).map(log => (
                <tr key={log.id} className="hover:bg-neutral-50/70">
                  <td className="py-2.5 px-4 text-neutral-500 whitespace-nowrap">{log.timestamp}</td>
                  <td className="py-2.5 px-4 text-neutral-900 font-semibold whitespace-nowrap">
                    {log.actorName} <span className="text-neutral-400 font-normal">({log.actorRole})</span>
                  </td>
                  <td className="py-2.5 px-4">
                    <span className="px-1.5 py-0.5 rounded bg-neutral-100 text-neutral-700 border border-neutral-200">
                      {log.action}
                    </span>
                  </td>
                  <td className="py-2.5 px-4 text-neutral-600 whitespace-nowrap">{log.targetEntityType}</td>
                  <td className="py-2.5 px-4 text-neutral-800 font-sans max-w-md truncate">{log.details}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Correction Request Modal */}
      {showCorrectionModal && (
        <div className="fixed inset-0 bg-neutral-900/50 backdrop-blur-xs flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl border border-neutral-200">
            <div className="flex items-center justify-between pb-3 border-b border-neutral-100">
              <h3 className="text-base font-bold text-neutral-900">
                Submit Record Correction Request
              </h3>
              <button 
                onClick={() => setShowCorrectionModal(false)}
                className="p-1 text-neutral-400 hover:text-neutral-700 rounded-lg cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleCorrectionSubmit} className="space-y-4 py-4 text-xs">
              <div>
                <label className="block font-medium text-neutral-700 mb-1">Target Worker Profile *</label>
                <select
                  value={corrWorkerId}
                  onChange={(e) => setCorrWorkerId(e.target.value)}
                  className="w-full p-2 border border-neutral-300 rounded-lg bg-white"
                >
                  {workers.map(w => (
                    <option key={w.id} value={w.id}>{w.name} ({w.originDistrict})</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block font-medium text-neutral-700 mb-1">Field to Correct *</label>
                <input
                  type="text"
                  required
                  value={fieldToCorrect}
                  onChange={(e) => setFieldToCorrect(e.target.value)}
                  placeholder="e.g. Child age, Destination worksite spelling, Phone number"
                  className="w-full p-2 border border-neutral-300 rounded-lg"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-medium text-neutral-700 mb-1">Current Recorded Value</label>
                  <input
                    type="text"
                    value={currentVal}
                    onChange={(e) => setCurrentVal(e.target.value)}
                    placeholder="e.g. 8 years"
                    className="w-full p-2 border border-neutral-300 rounded-lg"
                  />
                </div>
                <div>
                  <label className="block font-medium text-neutral-700 mb-1">Suggested Correct Value *</label>
                  <input
                    type="text"
                    required
                    value={suggestedVal}
                    onChange={(e) => setSuggestedVal(e.target.value)}
                    placeholder="e.g. 7 years"
                    className="w-full p-2 border border-neutral-300 rounded-lg"
                  />
                </div>
              </div>

              <div>
                <label className="block font-medium text-neutral-700 mb-1">Reason / Supporting Note</label>
                <textarea
                  rows={2}
                  value={reason}
                  onChange={(e) => setReason(e.target.value)}
                  placeholder="Explain why this correction is needed..."
                  className="w-full p-2 border border-neutral-300 rounded-lg"
                />
              </div>

              <div className="flex justify-end gap-2 pt-3 border-t border-neutral-100">
                <button
                  type="button"
                  onClick={() => setShowCorrectionModal(false)}
                  className="px-4 py-2 border border-neutral-300 rounded-lg text-neutral-700 hover:bg-neutral-50 cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-[#1C5F3B] text-white rounded-lg font-semibold hover:bg-[#14462B] transition-colors cursor-pointer"
                >
                  Submit Request
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
