import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { WorkerProfile, SupportedLanguage } from '../../types';
import { 
  Users, 
  Plus, 
  Search, 
  ShieldCheck, 
  CheckCircle, 
  AlertCircle, 
  Phone, 
  MapPin, 
  ChevronRight, 
  X,
  Lock
} from 'lucide-react';

export const WorkersView: React.FC = () => {
  const { workers, addWorker, currentRole, currentPersona, canManageSchemes, t } = useApp();
  const [searchTerm, setSearchTerm] = useState('');
  const [filterState, setFilterState] = useState<string>('ALL');
  const [showAddModal, setShowAddModal] = useState(false);
  const [selectedWorker, setSelectedWorker] = useState<WorkerProfile | null>(null);

  // Form State for new registration
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    age: 28,
    gender: 'MALE' as 'MALE' | 'FEMALE' | 'OTHER',
    occupation: 'Mason',
    eShramStatus: 'REGISTERED' as 'REGISTERED' | 'NOT_REGISTERED' | 'PENDING_ASSISTANCE',
    originState: 'Bihar',
    originDistrict: 'Gaya',
    originPincode: '824211',
    contractorName: currentRole === 'CONTRACTOR' ? currentPersona.name : 'Rajesh Shinde (Shinde Infra)',
    preferredLanguage: 'hi' as SupportedLanguage,
    consentGiven: true,
    consentScope: ['EDUCATION_REFERRAL', 'HEALTH_CARE', 'RATION_ONORC', 'SCHEME_APPLICATION'],
    hasChild: true,
    childName: '',
    childAge: 7,
    childEducationStatus: 'NEEDS_DESTINATION_SCHOOL' as const,
    notes: '',
  });

  // Filter workers based on role & search
  // If CONTRACTOR, only see workers associated with their company
  const visibleWorkers = workers.filter(w => {
    if (currentRole === 'CONTRACTOR') {
      // Show workers under this contractor
      return w.contractorName?.includes('Shinde') || w.contractorId === currentPersona.id;
    }
    return true;
  }).filter(w => {
    const matchesSearch = 
      w.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      w.originDistrict.toLowerCase().includes(searchTerm.toLowerCase()) ||
      w.originState.toLowerCase().includes(searchTerm.toLowerCase()) ||
      w.phone.includes(searchTerm);

    const matchesState = filterState === 'ALL' || w.originState === filterState;
    return matchesSearch && matchesState;
  });

  const handleRegisterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name.trim() || !formData.phone.trim()) {
      alert('Please provide worker name and contact number.');
      return;
    }

    const members = [];
    if (formData.hasChild && formData.childName.trim()) {
      members.push({
        id: `fm_${Date.now()}_child`,
        workerId: '',
        name: formData.childName,
        relationship: 'CHILD' as const,
        age: Number(formData.childAge),
        gender: 'FEMALE' as const,
        isTraveling: true,
        educationStatus: formData.childEducationStatus,
        immunizationStatus: 'DUE' as const,
      });
    }

    addWorker({
      name: formData.name,
      phone: formData.phone,
      age: Number(formData.age),
      gender: formData.gender,
      occupation: formData.occupation,
      eShramStatus: formData.eShramStatus,
      originState: formData.originState,
      originDistrict: formData.originDistrict,
      originPincode: formData.originPincode,
      contractorId: currentRole === 'CONTRACTOR' ? currentPersona.id : 'persona_contractor',
      contractorName: formData.contractorName,
      preferredLanguage: formData.preferredLanguage,
      consentGiven: formData.consentGiven,
      consentDate: new Date().toISOString().split('T')[0],
      consentScope: formData.consentScope,
      members,
      notes: formData.notes,
      isSampleData: true,
    });

    setShowAddModal(false);
    // Reset basic fields
    setFormData(prev => ({ ...prev, name: '', phone: '', childName: '' }));
  };

  return (
    <div className="space-y-6">
      {/* Header and Action Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold text-neutral-900 tracking-tight">
            Worker &amp; Family Registration
          </h2>
          <p className="text-xs text-neutral-500 mt-0.5">
            Privacy-preserving profile records and household dependants tracking.
          </p>
        </div>

        <button
          onClick={() => setShowAddModal(true)}
          className="px-4 py-2 bg-[#1C5F3B] hover:bg-[#14462B] text-white text-xs font-semibold rounded-lg shadow-xs flex items-center gap-1.5 cursor-pointer whitespace-nowrap self-start sm:self-auto"
        >
          <Plus className="w-3.5 h-3.5" />
          <span>Register Worker &amp; Family</span>
        </button>
      </div>

      {/* DPDP Data Minimization Banner in Brand Green & Gold */}
      <div className="bg-[#EAF5EE] border border-[#A4D7B7] rounded-xl p-3.5 flex items-start gap-3">
        <ShieldCheck className="w-4 h-4 text-[#1C5F3B] shrink-0 mt-0.5" />
        <div className="text-xs text-[#14462B] leading-relaxed">
          <strong>Data Minimisation &amp; Privacy Safeguards:</strong> In accordance with Digital Personal Data Protection (DPDP) standards, Aadhaar numbers, biometric templates, and sensitive identity scans are <em>not collected or stored</em>. Only necessary contact, migration origin/destination, and authorized service continuity consent are maintained.
        </div>
      </div>

      {/* Search & Filter Bar */}
      <div className="bg-white p-4 rounded-xl border border-neutral-200 shadow-xs flex flex-col md:flex-row gap-3 items-stretch md:items-center justify-between">
        <div className="relative flex-1">
          <Search className="w-4 h-4 text-neutral-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search by worker name, phone, district, or state..."
            className="w-full pl-9 pr-4 py-2 text-xs border border-neutral-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-[#1C5F3B]"
          />
        </div>

        <div className="flex items-center gap-2">
          <span className="text-xs text-neutral-500 whitespace-nowrap">Origin State:</span>
          <select
            value={filterState}
            onChange={(e) => setFilterState(e.target.value)}
            className="text-xs border border-neutral-200 rounded-lg px-2.5 py-2 bg-white text-neutral-800 focus:outline-none focus:ring-1 focus:ring-amber-500"
          >
            <option value="ALL">All States</option>
            <option value="Bihar">Bihar</option>
            <option value="Maharashtra">Maharashtra (Intrastate)</option>
            <option value="Jharkhand">Jharkhand</option>
            <option value="Odisha">Odisha</option>
            <option value="Uttar Pradesh">Uttar Pradesh</option>
          </select>
        </div>
      </div>

      {/* Workers Table Grid */}
      <div className="bg-white rounded-xl border border-neutral-200 shadow-xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-xs text-left">
            <thead className="bg-neutral-50 text-neutral-500 uppercase font-mono text-[10px] border-b border-neutral-200">
              <tr>
                <th className="py-3 px-4">Worker Profile</th>
                <th className="py-3 px-4">Origin &rarr; Destination</th>
                <th className="py-3 px-4">Family Dependents</th>
                <th className="py-3 px-4">e-Shram Status</th>
                <th className="py-3 px-4">Consent Scope</th>
                <th className="py-3 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-neutral-100">
              {visibleWorkers.map(w => (
                <tr key={w.id} className="hover:bg-neutral-50/70 transition-colors">
                  <td className="py-3 px-4">
                    <div className="font-bold text-neutral-900 text-sm">{w.name}</div>
                    <div className="flex items-center gap-2 text-neutral-500 text-[11px] mt-0.5">
                      <span>{w.occupation}</span>
                      <span>·</span>
                      <span className="font-mono">{w.phone}</span>
                    </div>
                  </td>

                  <td className="py-3 px-4">
                    <div className="text-neutral-900 font-medium">
                      {w.originDistrict}, {w.originState}
                    </div>
                    <div className="text-neutral-500 text-[11px] mt-0.5">
                      Target: Pune (Wagholi Cluster)
                    </div>
                  </td>

                  <td className="py-3 px-4">
                    {w.members.length > 0 ? (
                      <div>
                        <span className="font-semibold text-neutral-800">
                          {w.members.length} Traveling
                        </span>
                        <div className="text-[11px] text-neutral-500 mt-0.5 truncate max-w-xs">
                          {w.members.map(m => `${m.name} (${m.relationship.toLowerCase()})`).join(', ')}
                        </div>
                      </div>
                    ) : (
                      <span className="text-neutral-400 italic">Individual worker</span>
                    )}
                  </td>

                  <td className="py-3 px-4">
                    <span className={`px-2 py-0.5 rounded text-[10px] font-mono font-bold ${
                      w.eShramStatus === 'REGISTERED'
                        ? 'bg-emerald-50 text-emerald-800 border border-emerald-200'
                        : w.eShramStatus === 'PENDING_ASSISTANCE'
                        ? 'bg-amber-50 text-amber-800 border border-amber-200'
                        : 'bg-neutral-100 text-neutral-600 border border-neutral-200'
                    }`}>
                      {w.eShramStatus}
                    </span>
                  </td>

                  <td className="py-3 px-4">
                    {w.consentGiven ? (
                      <div className="flex items-center gap-1 text-emerald-700 text-[11px]">
                        <CheckCircle className="w-3.5 h-3.5" />
                        <span>Consented ({w.consentScope.length} areas)</span>
                      </div>
                    ) : (
                      <div className="flex items-center gap-1 text-neutral-400 text-[11px]">
                        <AlertCircle className="w-3.5 h-3.5" />
                        <span>Pending Consent</span>
                      </div>
                    )}
                  </td>

                  <td className="py-3 px-4 text-right">
                    <button
                      onClick={() => setSelectedWorker(w)}
                      className="px-2.5 py-1 text-xs font-semibold text-neutral-700 hover:text-neutral-900 hover:bg-neutral-100 rounded-md transition-colors cursor-pointer"
                    >
                      View Profile
                    </button>
                  </td>
                </tr>
              ))}

              {visibleWorkers.length === 0 && (
                <tr>
                  <td colSpan={6} className="py-8 text-center text-neutral-500">
                    No worker records match your search criteria.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Worker Detail Modal */}
      {selectedWorker && (
        <div className="fixed inset-0 bg-neutral-900/50 backdrop-blur-xs flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl max-w-2xl w-full p-6 shadow-2xl border border-neutral-200 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between pb-4 border-b border-neutral-100">
              <div>
                <span className="text-[11px] font-mono uppercase text-amber-800 tracking-wider">
                  Worker File · ID {selectedWorker.id}
                </span>
                <h3 className="text-lg font-bold text-neutral-900 mt-0.5">
                  {selectedWorker.name}
                </h3>
              </div>
              <button 
                onClick={() => setSelectedWorker(null)}
                className="p-1 text-neutral-400 hover:text-neutral-700 rounded-lg cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-4 py-4 text-xs">
              <div className="grid grid-cols-2 gap-4 bg-neutral-50 p-4 rounded-xl">
                <div>
                  <span className="text-neutral-500">Origin:</span>
                  <div className="font-semibold text-neutral-900 mt-0.5">
                    {selectedWorker.originDistrict}, {selectedWorker.originState} (PIN: {selectedWorker.originPincode || 'N/A'})
                  </div>
                </div>
                <div>
                  <span className="text-neutral-500">Contact:</span>
                  <div className="font-semibold text-neutral-900 mt-0.5 font-mono">
                    {selectedWorker.phone}
                  </div>
                </div>
                <div>
                  <span className="text-neutral-500">Occupation / Trade:</span>
                  <div className="font-semibold text-neutral-900 mt-0.5">
                    {selectedWorker.occupation}
                  </div>
                </div>
                <div>
                  <span className="text-neutral-500">Contractor Association:</span>
                  <div className="font-semibold text-neutral-900 mt-0.5">
                    {selectedWorker.contractorName || 'Unassociated / Self'}
                  </div>
                </div>
              </div>

              {/* Family Members Section */}
              <div>
                <h4 className="font-bold text-neutral-900 mb-2">
                  Household Dependents &amp; Children ({selectedWorker.members.length})
                </h4>
                {selectedWorker.members.length > 0 ? (
                  <div className="space-y-2">
                    {selectedWorker.members.map(m => (
                      <div key={m.id} className="p-3 bg-neutral-50 rounded-lg border border-neutral-200">
                        <div className="flex items-center justify-between">
                          <span className="font-bold text-neutral-900">{m.name}</span>
                          <span className="text-[10px] uppercase font-mono px-1.5 py-0.5 bg-white border rounded text-neutral-600">
                            {m.relationship} · {m.age} Years
                          </span>
                        </div>
                        {m.educationStatus && (
                          <p className="text-neutral-600 mt-1">
                            <strong>Education:</strong> {m.educationStatus} (Previous: {m.previousSchoolName || 'None'})
                          </p>
                        )}
                        {m.immunizationStatus && (
                          <p className="text-neutral-600 mt-0.5">
                            <strong>Immunization:</strong> {m.immunizationStatus} (Next due: {m.nextVaccineDue || 'Up to date'})
                          </p>
                        )}
                        {m.specialNeeds && (
                          <p className="text-amber-800 bg-amber-50 p-2 rounded mt-1 text-[11px]">
                            {m.specialNeeds}
                          </p>
                        )}
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-neutral-500 italic">No family members registered for this worker.</p>
                )}
              </div>

              {/* DPDP Consent Statement */}
              <div className="p-3.5 bg-emerald-50 border border-emerald-200 rounded-xl">
                <div className="flex items-center gap-1.5 font-bold text-emerald-900 mb-1">
                  <ShieldCheck className="w-4 h-4 text-emerald-700" />
                  <span>Purpose-Specific Data Consent Record</span>
                </div>
                <p className="text-emerald-800 text-[11px]">
                  Consent provided on {selectedWorker.consentDate} for: {selectedWorker.consentScope.join(', ')}. Worker retains right under DPDP Act to review, rectify, or withdraw service consent at any time without punitive action.
                </p>
              </div>
            </div>

            <div className="flex justify-end pt-3 border-t border-neutral-100">
              <button
                onClick={() => setSelectedWorker(null)}
                className="px-4 py-2 bg-neutral-900 text-white rounded-lg text-xs font-semibold cursor-pointer"
              >
                Close Profile
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Add Worker Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-neutral-900/50 backdrop-blur-xs flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl max-w-xl w-full p-6 shadow-2xl border border-neutral-200 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between pb-3 border-b border-neutral-100">
              <h3 className="text-base font-bold text-neutral-900">
                Register New Worker Profile
              </h3>
              <button 
                onClick={() => setShowAddModal(false)}
                className="p-1 text-neutral-400 hover:text-neutral-700 rounded-lg cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleRegisterSubmit} className="space-y-4 py-4 text-xs">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block font-medium text-neutral-700 mb-1">Worker Full Name *</label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="e.g. Ramprasad Yadav"
                    className="w-full px-3 py-2 border border-neutral-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-amber-500"
                  />
                </div>

                <div>
                  <label className="block font-medium text-neutral-700 mb-1">Phone Number *</label>
                  <input
                    type="tel"
                    required
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    placeholder="+91 98XXX XXXXX"
                    className="w-full px-3 py-2 border border-neutral-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-amber-500 font-mono"
                  />
                </div>

                <div>
                  <label className="block font-medium text-neutral-700 mb-1">Origin State *</label>
                  <select
                    value={formData.originState}
                    onChange={(e) => setFormData({ ...formData, originState: e.target.value })}
                    className="w-full px-3 py-2 border border-neutral-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-amber-500 bg-white"
                  >
                    <option value="Bihar">Bihar</option>
                    <option value="Maharashtra">Maharashtra (Intrastate)</option>
                    <option value="Jharkhand">Jharkhand</option>
                    <option value="Odisha">Odisha</option>
                    <option value="Uttar Pradesh">Uttar Pradesh</option>
                  </select>
                </div>

                <div>
                  <label className="block font-medium text-neutral-700 mb-1">Origin District *</label>
                  <input
                    type="text"
                    required
                    value={formData.originDistrict}
                    onChange={(e) => setFormData({ ...formData, originDistrict: e.target.value })}
                    placeholder="e.g. Gaya / Nawada / Beed"
                    className="w-full px-3 py-2 border border-neutral-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-amber-500"
                  />
                </div>

                <div>
                  <label className="block font-medium text-neutral-700 mb-1">Occupation / Trade</label>
                  <input
                    type="text"
                    value={formData.occupation}
                    onChange={(e) => setFormData({ ...formData, occupation: e.target.value })}
                    placeholder="e.g. Mason / Carpenter / Helper"
                    className="w-full px-3 py-2 border border-neutral-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-amber-500"
                  />
                </div>

                <div>
                  <label className="block font-medium text-neutral-700 mb-1">e-Shram Self-Declaration</label>
                  <select
                    value={formData.eShramStatus}
                    onChange={(e) => setFormData({ ...formData, eShramStatus: e.target.value as any })}
                    className="w-full px-3 py-2 border border-neutral-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-amber-500 bg-white"
                  >
                    <option value="REGISTERED">Registered (Holds UAN Card)</option>
                    <option value="NOT_REGISTERED">Not Registered</option>
                    <option value="PENDING_ASSISTANCE">Needs Registration Assistance</option>
                  </select>
                </div>
              </div>

              {/* Child Information Section */}
              <div className="p-3 bg-neutral-50 rounded-xl border border-neutral-200">
                <div className="flex items-center justify-between mb-2">
                  <span className="font-bold text-neutral-900">Traveling Child Dependent</span>
                  <label className="flex items-center gap-1.5 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={formData.hasChild}
                      onChange={(e) => setFormData({ ...formData, hasChild: e.target.checked })}
                      className="rounded text-amber-600 focus:ring-amber-500"
                    />
                    <span className="text-neutral-700">Include Child Profile</span>
                  </label>
                </div>

                {formData.hasChild && (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-2">
                    <div>
                      <label className="block font-medium text-neutral-700 mb-1">Child Name</label>
                      <input
                        type="text"
                        value={formData.childName}
                        onChange={(e) => setFormData({ ...formData, childName: e.target.value })}
                        placeholder="e.g. Pinky Kumari"
                        className="w-full px-3 py-2 border border-neutral-300 rounded-lg bg-white"
                      />
                    </div>
                    <div>
                      <label className="block font-medium text-neutral-700 mb-1">Child Age (Years)</label>
                      <input
                        type="number"
                        min={0}
                        max={17}
                        value={formData.childAge}
                        onChange={(e) => setFormData({ ...formData, childAge: Number(e.target.value) })}
                        className="w-full px-3 py-2 border border-neutral-300 rounded-lg bg-white"
                      />
                    </div>
                  </div>
                )}
              </div>

              {/* Consent Checkbox in Brand Green & Gold */}
              <div className="p-3 bg-[#EAF5EE] border border-[#A4D7B7] rounded-xl">
                <label className="flex items-start gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    required
                    checked={formData.consentGiven}
                    onChange={(e) => setFormData({ ...formData, consentGiven: e.target.checked })}
                    className="mt-0.5 rounded text-[#1C5F3B] focus:ring-[#1C5F3B]"
                  />
                  <span className="text-[#14462B] leading-tight">
                    Worker consents to maintaining service continuity records (Education referral, immunization checks, ration portability) across migration corridors in compliance with DPDP standards.
                  </span>
                </label>
              </div>

              <div className="flex items-center justify-end gap-3 pt-3 border-t border-neutral-100">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="px-4 py-2 border border-neutral-300 rounded-lg text-neutral-700 hover:bg-neutral-50 transition-colors cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-[#1C5F3B] hover:bg-[#14462B] text-white font-semibold rounded-lg transition-colors cursor-pointer shadow-xs"
                >
                  Save Registration
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
