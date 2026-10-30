import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { MigrationJourney, JourneyStatus } from '../../types';
import { 
  Compass, 
  MapPin, 
  Calendar, 
  Users, 
  CheckCircle2, 
  Clock, 
  Plus, 
  ArrowRight, 
  ShieldCheck, 
  AlertCircle,
  FileCheck2,
  X
} from 'lucide-react';

export const JourneysView: React.FC = () => {
  const { journeys, workers, updateJourneyStatus, addJourney, currentPersona, currentRole, canVerifyRecords, t } = useApp();
  const [selectedJourney, setSelectedJourney] = useState<MigrationJourney | null>(null);
  const [showNewModal, setShowNewModal] = useState(false);
  const [statusUpdateNote, setStatusUpdateNote] = useState('');

  const statusSteps: { key: JourneyStatus; label: string }[] = [
    { key: 'ORIGIN', label: 'Origin Intake' },
    { key: 'JOURNEY_STARTED', label: 'Journey Started' },
    { key: 'DESTINATION_IDENTIFIED', label: 'Destination Reached' },
    { key: 'SERVICES_REFERRED', label: 'Services Referred' },
    { key: 'FOLLOWUP_PENDING', label: 'Follow-up Pending' },
    { key: 'CONFIRMED', label: 'Services Confirmed' },
  ];

  const getStepIndex = (status: JourneyStatus) => {
    switch (status) {
      case 'ORIGIN': return 0;
      case 'JOURNEY_STARTED': return 1;
      case 'DESTINATION_IDENTIFIED': return 2;
      case 'SERVICES_REFERRED': return 3;
      case 'FOLLOWUP_PENDING': return 4;
      case 'CONFIRMED':
      case 'CASE_CLOSED': return 5;
      default: return 0;
    }
  };

  const handleStatusTransition = (journeyId: string, targetStatus: JourneyStatus) => {
    updateJourneyStatus(journeyId, targetStatus, statusUpdateNote);
    setStatusUpdateNote('');
    if (selectedJourney && selectedJourney.id === journeyId) {
      setSelectedJourney({
        ...selectedJourney,
        status: targetStatus,
        verifiedSource: `${currentPersona.name} (${currentPersona.role})`,
        verifiedDate: new Date().toISOString().split('T')[0],
      });
    }
  };

  // New Journey Form State
  const [newJourneyForm, setNewJourneyForm] = useState({
    workerId: workers[0]?.id || '',
    originState: 'Bihar',
    originDistrict: 'Gaya',
    destinationState: 'Maharashtra',
    destinationDistrict: 'Pune',
    destinationWorksite: 'Metro Infrastructure Site Wagholi',
    destinationPincode: '412207',
    startDate: new Date().toISOString().split('T')[0],
    expectedEndDate: '2027-05-31',
    educationNeeds: 'RTE Section 4 Age-appropriate School Admission',
    healthNeeds: 'Universal Immunization and PHC Maternal Check',
    notes: 'Seasonal migration for construction project.',
  });

  const handleCreateJourney = (e: React.FormEvent) => {
    e.preventDefault();
    const worker = workers.find(w => w.id === newJourneyForm.workerId);
    if (!worker) return;

    addJourney({
      workerId: worker.id,
      workerName: worker.name,
      originState: newJourneyForm.originState,
      originDistrict: newJourneyForm.originDistrict,
      destinationState: newJourneyForm.destinationState,
      destinationDistrict: newJourneyForm.destinationDistrict,
      destinationWorksite: newJourneyForm.destinationWorksite,
      destinationPincode: newJourneyForm.destinationPincode,
      startDate: newJourneyForm.startDate,
      expectedEndDate: newJourneyForm.expectedEndDate,
      travelingMemberIds: worker.members.map(m => m.id),
      status: 'DESTINATION_IDENTIFIED',
      educationNeeds: newJourneyForm.educationNeeds ? [newJourneyForm.educationNeeds] : [],
      healthNeeds: newJourneyForm.healthNeeds ? [newJourneyForm.healthNeeds] : [],
      childcareNeeds: ['Anganwadi linkage'],
      rationNeeds: ['ONORC biometric ration verification'],
      nextFollowUpDate: new Date(Date.now() + 7 * 86400000).toISOString().split('T')[0],
      assignedFieldWorkerName: 'Sunita Devi (Jan Vikas Sanstha)',
      notes: newJourneyForm.notes,
      isSampleData: true,
    });

    setShowNewModal(false);
  };

  return (
    <div className="space-y-6">
      {/* Title & Actions */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold text-neutral-900 tracking-tight">
            Migration Journey Tracker
          </h2>
          <p className="text-xs text-neutral-500 mt-0.5">
            Corridor continuity: Origin &rarr; Journey &rarr; Destination Services &rarr; Follow-up &rarr; Confirmation.
          </p>
        </div>

        <button
          onClick={() => setShowNewModal(true)}
          className="px-4 py-2 bg-neutral-900 hover:bg-neutral-800 text-white text-xs font-semibold rounded-lg shadow-xs flex items-center gap-1.5 cursor-pointer whitespace-nowrap self-start sm:self-auto"
        >
          <Plus className="w-3.5 h-3.5" />
          <span>Record New Journey</span>
        </button>
      </div>

      {/* Privacy Notice Banner */}
      <div className="bg-neutral-100 border border-neutral-200 rounded-xl p-3.5 flex items-start gap-3">
        <ShieldCheck className="w-4 h-4 text-neutral-700 shrink-0 mt-0.5" />
        <div className="text-xs text-neutral-700 leading-relaxed">
          <strong>No Covert or Continuous Location Tracking:</strong> This platform strictly records voluntary, service-oriented milestones (Origin district, Destination cluster, and Worksite verification). GPS pinging or continuous background device telemetry is strictly prohibited.
        </div>
      </div>

      {/* Journeys List */}
      <div className="space-y-4">
        {journeys.map(journey => {
          const currentIndex = getStepIndex(journey.status);

          return (
            <div 
              key={journey.id}
              className="bg-white rounded-xl border border-neutral-200 p-5 shadow-xs transition-shadow hover:shadow-sm"
            >
              {/* Header row */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-neutral-100">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-lg bg-[#EAF5EE] border border-[#A4D7B7] flex items-center justify-center text-[#1C5F3B]">
                    <Compass className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <h3 className="text-base font-bold text-neutral-900">
                        {journey.workerName}
                      </h3>
                      <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-neutral-100 text-neutral-700 border border-neutral-200">
                        Journey #{journey.id}
                      </span>
                    </div>
                    <div className="flex items-center gap-2 text-xs text-neutral-500 mt-0.5">
                      <span className="font-semibold text-neutral-800">{journey.originDistrict}, {journey.originState}</span>
                      <ArrowRight className="w-3.5 h-3.5 text-[#E59E1B]" />
                      <span className="font-bold text-[#1D649A]">{journey.destinationDistrict}, {journey.destinationState}</span>
                      <span>({journey.destinationWorksite})</span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <span className="text-xs font-mono text-neutral-500">
                    {journey.startDate} to {journey.expectedEndDate}
                  </span>
                  <button
                    onClick={() => setSelectedJourney(journey)}
                    className="px-3 py-1.5 text-xs font-semibold text-[#1C5F3B] border border-[#A4D7B7] bg-[#EAF5EE]/50 hover:bg-[#EAF5EE] rounded-lg transition-colors cursor-pointer"
                  >
                    Manage Workflow
                  </button>
                </div>
              </div>

              {/* Visual Horizontal Timeline Bar with Logo Palette */}
              <div className="py-5">
                <div className="grid grid-cols-2 sm:grid-cols-6 gap-2">
                  {statusSteps.map((step, idx) => {
                    const isPassed = idx < currentIndex;
                    const isCurrent = idx === currentIndex;

                    return (
                      <div key={step.key} className="flex flex-col">
                        <div className="flex items-center">
                          <div 
                            className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-bold ${
                              isPassed 
                                ? 'bg-[#1C5F3B] text-white' 
                                : isCurrent 
                                ? 'bg-[#E59E1B] text-neutral-950 ring-4 ring-[#FEF7EA]' 
                                : 'bg-neutral-200 text-neutral-500'
                            }`}
                          >
                            {isPassed ? '✓' : idx + 1}
                          </div>
                          <div 
                            className={`flex-1 h-1 mx-1.5 rounded-full ${
                              idx < statusSteps.length - 1
                                ? isPassed ? 'bg-[#1C5F3B]' : 'bg-neutral-200'
                                : 'hidden'
                            }`}
                          />
                        </div>
                        <span className={`text-[11px] font-medium mt-1.5 leading-tight ${
                          isCurrent ? 'font-bold text-neutral-900' : 'text-neutral-500'
                        }`}>
                          {step.label}
                        </span>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Service Needs Summary Chips */}
              <div className="pt-3 border-t border-neutral-100 flex flex-wrap items-center justify-between gap-3 text-xs">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="text-neutral-500 text-[11px]">Continuity Needs:</span>
                  {journey.educationNeeds.map((e, i) => (
                    <span key={i} className="px-2 py-0.5 rounded bg-[#EAF5EE] text-[#1C5F3B] border border-[#A4D7B7] text-[11px] font-medium">
                      School: {e}
                    </span>
                  ))}
                  {journey.healthNeeds.map((h, i) => (
                    <span key={i} className="px-2 py-0.5 rounded bg-[#EBF4FB] text-[#1D649A] border border-[#9EC9EB] text-[11px] font-medium">
                      Health: {h}
                    </span>
                  ))}
                </div>

                <div className="text-[11px] text-neutral-500 flex items-center gap-2">
                  <span>Field Officer: <strong className="text-neutral-800">{journey.assignedFieldWorkerName || 'Sunita Devi'}</strong></span>
                  <span>·</span>
                  <span>Next Follow-up: <strong className="font-mono text-[#B87B0E]">{journey.nextFollowUpDate}</strong></span>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Journey Detail & Status Transition Modal */}
      {selectedJourney && (
        <div className="fixed inset-0 bg-neutral-900/50 backdrop-blur-xs flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl max-w-xl w-full p-6 shadow-2xl border border-neutral-200 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between pb-3 border-b border-neutral-100">
              <div>
                <span className="text-[11px] font-mono uppercase text-neutral-400">
                  Journey Workflow Management
                </span>
                <h3 className="text-base font-bold text-neutral-900 mt-0.5">
                  {selectedJourney.workerName} · {selectedJourney.originDistrict} &rarr; {selectedJourney.destinationDistrict}
                </h3>
              </div>
              <button 
                onClick={() => setSelectedJourney(null)}
                className="p-1 text-neutral-400 hover:text-neutral-700 rounded-lg cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-4 py-4 text-xs">
              <div className="bg-neutral-50 p-3.5 rounded-xl border border-neutral-200 space-y-2">
                <div className="flex justify-between">
                  <span className="text-neutral-500">Current Status:</span>
                  <span className="font-bold text-neutral-900 font-mono">{selectedJourney.status}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-neutral-500">Destination Worksite:</span>
                  <span className="font-medium text-neutral-900">{selectedJourney.destinationWorksite}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-neutral-500">Last Verified Source:</span>
                  <span className="font-medium text-emerald-800">{selectedJourney.verifiedSource || 'Not yet field verified'}</span>
                </div>
              </div>

              {/* Status Update Actions */}
              <div>
                <label className="block font-bold text-neutral-900 mb-1.5">
                  Advance Journey Stage:
                </label>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    onClick={() => handleStatusTransition(selectedJourney.id, 'DESTINATION_IDENTIFIED')}
                    className="p-2 border border-neutral-200 hover:bg-neutral-50 rounded-lg font-medium text-left cursor-pointer"
                  >
                    1. Destination Reached
                  </button>
                  <button
                    onClick={() => handleStatusTransition(selectedJourney.id, 'SERVICES_REFERRED')}
                    className="p-2 border border-neutral-200 hover:bg-neutral-50 rounded-lg font-medium text-left cursor-pointer"
                  >
                    2. Services Referred
                  </button>
                  <button
                    onClick={() => handleStatusTransition(selectedJourney.id, 'FOLLOWUP_PENDING')}
                    className="p-2 border border-neutral-200 hover:bg-neutral-50 rounded-lg font-medium text-left cursor-pointer"
                  >
                    3. Follow-up Pending
                  </button>
                  <button
                    onClick={() => handleStatusTransition(selectedJourney.id, 'CONFIRMED')}
                    className="p-2 border border-emerald-300 bg-emerald-50 text-emerald-900 hover:bg-emerald-100 rounded-lg font-bold text-left cursor-pointer"
                  >
                    4. Services Confirmed
                  </button>
                </div>
              </div>

              <div>
                <label className="block font-medium text-neutral-700 mb-1">
                  Field Verification Note / Progress Log:
                </label>
                <textarea
                  rows={2}
                  value={statusUpdateNote}
                  onChange={(e) => setStatusUpdateNote(e.target.value)}
                  placeholder="Record verification details (e.g. Visited Wagholi labour camp, confirmed school admission form submitted)..."
                  className="w-full p-2.5 border border-neutral-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-amber-500"
                />
              </div>
            </div>

            <div className="flex justify-end gap-2 pt-3 border-t border-neutral-100">
              <button
                onClick={() => setSelectedJourney(null)}
                className="px-4 py-2 bg-neutral-900 text-white rounded-lg text-xs font-semibold cursor-pointer"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* New Journey Modal */}
      {showNewModal && (
        <div className="fixed inset-0 bg-neutral-900/50 backdrop-blur-xs flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl max-w-lg w-full p-6 shadow-2xl border border-neutral-200 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between pb-3 border-b border-neutral-100">
              <h3 className="text-base font-bold text-neutral-900">
                Record New Migration Journey
              </h3>
              <button 
                onClick={() => setShowNewModal(false)}
                className="p-1 text-neutral-400 hover:text-neutral-700 rounded-lg cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleCreateJourney} className="space-y-4 py-4 text-xs">
              <div>
                <label className="block font-medium text-neutral-700 mb-1">Select Registered Worker *</label>
                <select
                  value={newJourneyForm.workerId}
                  onChange={(e) => setNewJourneyForm({ ...newJourneyForm, workerId: e.target.value })}
                  className="w-full p-2 border border-neutral-300 rounded-lg bg-white"
                >
                  {workers.map(w => (
                    <option key={w.id} value={w.id}>
                      {w.name} ({w.originDistrict}, {w.originState})
                    </option>
                  ))}
                </select>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-medium text-neutral-700 mb-1">Origin State</label>
                  <input
                    type="text"
                    value={newJourneyForm.originState}
                    onChange={(e) => setNewJourneyForm({ ...newJourneyForm, originState: e.target.value })}
                    className="w-full p-2 border border-neutral-300 rounded-lg"
                  />
                </div>
                <div>
                  <label className="block font-medium text-neutral-700 mb-1">Origin District</label>
                  <input
                    type="text"
                    value={newJourneyForm.originDistrict}
                    onChange={(e) => setNewJourneyForm({ ...newJourneyForm, originDistrict: e.target.value })}
                    className="w-full p-2 border border-neutral-300 rounded-lg"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-medium text-neutral-700 mb-1">Destination State</label>
                  <input
                    type="text"
                    value={newJourneyForm.destinationState}
                    onChange={(e) => setNewJourneyForm({ ...newJourneyForm, destinationState: e.target.value })}
                    className="w-full p-2 border border-neutral-300 rounded-lg"
                  />
                </div>
                <div>
                  <label className="block font-medium text-neutral-700 mb-1">Destination District</label>
                  <input
                    type="text"
                    value={newJourneyForm.destinationDistrict}
                    onChange={(e) => setNewJourneyForm({ ...newJourneyForm, destinationDistrict: e.target.value })}
                    className="w-full p-2 border border-neutral-300 rounded-lg"
                  />
                </div>
              </div>

              <div>
                <label className="block font-medium text-neutral-700 mb-1">Destination Worksite / Cluster</label>
                <input
                  type="text"
                  value={newJourneyForm.destinationWorksite}
                  onChange={(e) => setNewJourneyForm({ ...newJourneyForm, destinationWorksite: e.target.value })}
                  placeholder="e.g. Wagholi Flyover Site / Kharadi IT Park"
                  className="w-full p-2 border border-neutral-300 rounded-lg"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-medium text-neutral-700 mb-1">Start Date</label>
                  <input
                    type="date"
                    value={newJourneyForm.startDate}
                    onChange={(e) => setNewJourneyForm({ ...newJourneyForm, startDate: e.target.value })}
                    className="w-full p-2 border border-neutral-300 rounded-lg font-mono"
                  />
                </div>
                <div>
                  <label className="block font-medium text-neutral-700 mb-1">Expected End Date</label>
                  <input
                    type="date"
                    value={newJourneyForm.expectedEndDate}
                    onChange={(e) => setNewJourneyForm({ ...newJourneyForm, expectedEndDate: e.target.value })}
                    className="w-full p-2 border border-neutral-300 rounded-lg font-mono"
                  />
                </div>
              </div>

              <div className="flex justify-end gap-2 pt-3 border-t border-neutral-100">
                <button
                  type="button"
                  onClick={() => setShowNewModal(false)}
                  className="px-4 py-2 border border-neutral-300 rounded-lg text-neutral-700 hover:bg-neutral-50 cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-neutral-900 text-white rounded-lg font-semibold hover:bg-neutral-800 cursor-pointer"
                >
                  Create Journey
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
