import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { GovernmentScheme, SchemeCategory } from '../../types';
import { 
  BookOpen, 
  Search, 
  ExternalLink, 
  CheckSquare, 
  ShieldCheck, 
  Clock, 
  Building, 
  FileCheck, 
  HelpCircle,
  X,
  Sparkles,
  ArrowRight
} from 'lucide-react';

export const SchemesView: React.FC = () => {
  const { schemes, addBenefitApplication, workers, currentPersona, currentRole, setActiveTab, t } = useApp();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('ALL');
  const [selectedLevel, setSelectedLevel] = useState<string>('ALL');
  const [activeSchemeModal, setActiveSchemeModal] = useState<GovernmentScheme | null>(null);
  const [showApplyModal, setShowApplyModal] = useState(false);
  const [selectedWorkerForApply, setSelectedWorkerForApply] = useState(workers[0]?.id || '');
  const [applySuccessMsg, setApplySuccessMsg] = useState('');

  const categories: { key: string; label: string }[] = [
    { key: 'ALL', label: 'All Categories' },
    { key: 'FOOD_SECURITY', label: 'Food & Ration' },
    { key: 'SOCIAL_SECURITY', label: 'Worker Welfare / BOCW' },
    { key: 'HEALTH_INSURANCE', label: 'Health Insurance' },
    { key: 'EDUCATION', label: 'Education & Schools' },
    { key: 'IMMUNIZATION', label: 'Child Vaccination' },
    { key: 'CHILDCARE_NUTRITION', label: 'Anganwadi Nutrition' },
    { key: 'MATERNITY', label: 'Maternity Support' },
  ];

  const filteredSchemes = schemes.filter(s => {
    const matchesSearch = 
      s.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      s.hindiName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      s.marathiName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      s.code.toLowerCase().includes(searchTerm.toLowerCase()) ||
      s.description.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesCategory = selectedCategory === 'ALL' || s.category === selectedCategory;
    const matchesLevel = selectedLevel === 'ALL' || s.level === selectedLevel;

    return matchesSearch && matchesCategory && matchesLevel;
  });

  const handleStartApplication = (scheme: GovernmentScheme) => {
    setActiveSchemeModal(scheme);
    setShowApplyModal(true);
  };

  const handleConfirmApplication = (e: React.FormEvent) => {
    e.preventDefault();
    if (!activeSchemeModal || !selectedWorkerForApply) return;

    addBenefitApplication(selectedWorkerForApply, activeSchemeModal.id);
    setApplySuccessMsg(`Application guidance initiated for ${activeSchemeModal.name}. Switched to Benefit Tracker.`);
    setTimeout(() => {
      setShowApplyModal(false);
      setApplySuccessMsg('');
      setActiveTab('benefits');
    }, 1200);
  };

  return (
    <div className="space-y-6">
      {/* Title & Guidance Notice */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold text-neutral-900 tracking-tight">
            Government Welfare Scheme Directory
          </h2>
          <p className="text-xs text-neutral-500 mt-0.5">
            Verified central and Maharashtra state welfare programs with interstate portability conditions.
          </p>
        </div>

        <button
          onClick={() => setActiveTab('assistant')}
          className="px-3.5 py-2 bg-[#EAF5EE] border border-[#A4D7B7] text-[#1C5F3B] text-xs font-semibold rounded-lg hover:bg-[#EAF5EE]/80 transition-colors flex items-center gap-1.5 self-start sm:self-auto cursor-pointer"
        >
          <Sparkles className="w-3.5 h-3.5 text-[#E59E1B]" />
          <span>Explain Schemes in Simple Words</span>
        </button>
      </div>

      {/* Verified Data Integrity Banner */}
      <div className="bg-neutral-50 border border-neutral-200 rounded-xl p-3.5 flex items-start gap-3">
        <ShieldCheck className="w-4 h-4 text-[#1C5F3B] shrink-0 mt-0.5" />
        <div className="text-xs text-neutral-700 leading-relaxed">
          <strong>Official Portal Grounding:</strong> All schemes listed are grounded in official government gazettes, department portals (e.g. <code>nfsa.gov.in</code>, <code>eshram.gov.in</code>, <code>mahabocw.in</code>), and statutory mandates (RTE 2009). The platform indicates <em>"Potentially Relevant"</em> guidance; official approval is determined solely by the competent government authority.
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-white p-4 rounded-xl border border-neutral-200 shadow-xs space-y-3">
        <div className="relative">
          <Search className="w-4 h-4 text-neutral-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search by scheme name, Hindi/Marathi title, code, or keyword..."
            className="w-full pl-9 pr-4 py-2 text-xs border border-neutral-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-[#1C5F3B]"
          />
        </div>

        <div className="flex flex-wrap items-center justify-between gap-2 pt-2 border-t border-neutral-100">
          {/* Category Tabs with Logo Color Accent */}
          <div className="flex flex-wrap items-center gap-1.5">
            {categories.map(c => (
              <button
                key={c.key}
                onClick={() => setSelectedCategory(c.key)}
                className={`px-2.5 py-1 text-xs rounded-md font-semibold transition-colors cursor-pointer ${
                  selectedCategory === c.key
                    ? 'bg-[#1C5F3B] text-white shadow-xs'
                    : 'bg-neutral-100 text-neutral-600 hover:bg-[#EAF5EE]/60 hover:text-[#1C5F3B]'
                }`}
              >
                {c.label}
              </button>
            ))}
          </div>

          {/* Level Filter */}
          <div className="flex items-center gap-1 text-xs text-neutral-500">
            <span>Jurisdiction:</span>
            <select
              value={selectedLevel}
              onChange={(e) => setSelectedLevel(e.target.value)}
              className="text-xs border border-neutral-200 rounded-md px-2 py-1 bg-white font-medium text-neutral-800"
            >
              <option value="ALL">All Levels</option>
              <option value="CENTRAL">Central / National</option>
              <option value="STATE">Maharashtra State</option>
            </select>
          </div>
        </div>
      </div>

      {/* Schemes Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filteredSchemes.map(scheme => (
          <div
            key={scheme.id}
            className="bg-white rounded-xl border border-neutral-200 p-5 shadow-xs flex flex-col justify-between hover:border-neutral-300 transition-colors"
          >
            <div>
              {/* Header Badges */}
              <div className="flex items-center justify-between gap-2 mb-2">
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-neutral-100 text-neutral-700 font-semibold border border-neutral-200">
                  {scheme.code}
                </span>
                <span className={`text-[10px] font-mono font-bold px-2 py-0.5 rounded ${
                  scheme.level === 'CENTRAL' 
                    ? 'bg-[#EBF4FB] text-[#154C76] border border-[#9EC9EB]' 
                    : 'bg-[#EAF5EE] text-[#14462B] border border-[#A4D7B7]'
                }`}>
                  {scheme.level === 'CENTRAL' ? 'National / Central' : 'Maharashtra State'}
                </span>
              </div>

              {/* Title & Regional Names */}
              <h3 className="text-base font-bold text-neutral-900 leading-snug">
                {scheme.name}
              </h3>
              <p className="text-xs text-neutral-500 mt-0.5 font-medium">
                {scheme.hindiName} · {scheme.marathiName}
              </p>

              <div className="text-[11px] text-neutral-400 mt-1 flex items-center gap-1">
                <Building className="w-3.5 h-3.5 shrink-0" />
                <span className="truncate">{scheme.department}</span>
              </div>

              {/* Description */}
              <p className="text-xs text-neutral-600 mt-3 line-clamp-3 leading-relaxed">
                {scheme.description}
              </p>

              {/* Portability Highlight in Warm Gold */}
              <div className="mt-3 p-2.5 rounded-lg bg-[#FEF7EA] border border-[#F8D793] text-[11px] text-[#B87B0E]">
                <strong>Interstate Portability:</strong> {scheme.portabilityConditions}
              </div>
            </div>

            {/* Actions & Official Link */}
            <div className="pt-4 mt-4 border-t border-neutral-100 flex items-center justify-between gap-2">
              <a
                href={scheme.officialPortalUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs text-[#1D649A] hover:text-[#154C76] flex items-center gap-1 font-semibold hover:underline"
                title="Open official government website"
              >
                <span>{t.common.officialPortal}</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => setActiveSchemeModal(scheme)}
                  className="px-3 py-1.5 text-xs text-neutral-700 hover:bg-neutral-100 rounded-lg border border-neutral-200 font-semibold cursor-pointer"
                >
                  Full Checklist
                </button>
                <button
                  onClick={() => handleStartApplication(scheme)}
                  className="px-3 py-1.5 text-xs bg-[#1C5F3B] hover:bg-[#14462B] text-white rounded-lg font-semibold cursor-pointer shadow-xs"
                >
                  Track Guidance
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Scheme Detail & Checklist Modal */}
      {activeSchemeModal && !showApplyModal && (
        <div className="fixed inset-0 bg-neutral-900/50 backdrop-blur-xs flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl max-w-2xl w-full p-6 shadow-2xl border border-neutral-200 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between pb-3 border-b border-neutral-100">
              <div>
                <span className="text-[11px] font-mono text-neutral-400 uppercase">
                  Scheme Specification · {activeSchemeModal.code}
                </span>
                <h3 className="text-base font-bold text-neutral-900 mt-0.5">
                  {activeSchemeModal.name}
                </h3>
              </div>
              <button 
                onClick={() => setActiveSchemeModal(null)}
                className="p-1 text-neutral-400 hover:text-neutral-700 rounded-lg cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-4 py-4 text-xs">
              <div className="bg-neutral-50 p-3.5 rounded-xl border border-neutral-200 space-y-1.5">
                <p><strong>Department:</strong> {activeSchemeModal.department}</p>
                <p><strong>Target Group:</strong> {activeSchemeModal.targetBeneficiaries}</p>
                <p><strong>Last Verified:</strong> <span className="font-mono">{activeSchemeModal.lastVerifiedDate}</span> ({activeSchemeModal.officialSource})</p>
              </div>

              {/* Eligibility */}
              <div>
                <h4 className="font-bold text-neutral-900 mb-2">Eligibility Criteria</h4>
                <ul className="list-disc pl-4 space-y-1 text-neutral-700">
                  {activeSchemeModal.eligibilityCriteria.map((c, i) => (
                    <li key={i}>{c}</li>
                  ))}
                </ul>
              </div>

              {/* Documents */}
              <div>
                <h4 className="font-bold text-neutral-900 mb-2">Required Document Checklist</h4>
                <div className="space-y-1.5">
                  {activeSchemeModal.requiredDocuments.map((doc, i) => (
                    <div key={i} className="flex items-center gap-2 p-2 rounded bg-neutral-50 border border-neutral-200">
                      <FileCheck className="w-4 h-4 text-emerald-600 shrink-0" />
                      <span className="text-neutral-800">{doc}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Application Procedure */}
              <div>
                <h4 className="font-bold text-neutral-900 mb-1">Official Application Procedure</h4>
                <p className="text-neutral-700 leading-relaxed bg-amber-50/50 p-3 rounded-lg border border-amber-200">
                  {activeSchemeModal.applicationProcess}
                </p>
              </div>

              {/* Portability */}
              <div>
                <h4 className="font-bold text-neutral-900 mb-1">Interstate Portability Rules</h4>
                <p className="text-neutral-700 leading-relaxed bg-blue-50/50 p-3 rounded-lg border border-blue-200">
                  {activeSchemeModal.portabilityConditions}
                </p>
              </div>
            </div>

            <div className="flex items-center justify-between pt-3 border-t border-neutral-100">
              <a
                href={activeSchemeModal.officialPortalUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs text-amber-800 hover:underline flex items-center gap-1 font-semibold"
              >
                <span>Visit {activeSchemeModal.officialPortalUrl.replace('https://', '')}</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => setActiveSchemeModal(null)}
                  className="px-4 py-2 border border-neutral-300 rounded-lg text-neutral-700 hover:bg-neutral-50 text-xs font-medium cursor-pointer"
                >
                  Close
                </button>
                <button
                  onClick={() => setShowApplyModal(true)}
                  className="px-4 py-2 bg-neutral-900 hover:bg-neutral-800 text-white rounded-lg text-xs font-semibold cursor-pointer"
                >
                  Track Application For Worker
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Start Application Modal */}
      {showApplyModal && activeSchemeModal && (
        <div className="fixed inset-0 bg-neutral-900/50 backdrop-blur-xs flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl border border-neutral-200">
            <div className="flex items-center justify-between pb-3 border-b border-neutral-100">
              <h3 className="text-base font-bold text-neutral-900">
                Track Application Workflow
              </h3>
              <button 
                onClick={() => setShowApplyModal(false)}
                className="p-1 text-neutral-400 hover:text-neutral-700 rounded-lg cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {applySuccessMsg ? (
              <div className="py-8 text-center space-y-2">
                <div className="w-10 h-10 rounded-full bg-emerald-100 text-emerald-800 flex items-center justify-center mx-auto">
                  ✓
                </div>
                <p className="text-xs font-bold text-neutral-900">{applySuccessMsg}</p>
              </div>
            ) : (
              <form onSubmit={handleConfirmApplication} className="space-y-4 py-4 text-xs">
                <div>
                  <span className="text-neutral-500">Scheme Selected:</span>
                  <div className="font-bold text-neutral-900 text-sm mt-0.5">
                    {activeSchemeModal.name}
                  </div>
                </div>

                <div>
                  <label className="block font-medium text-neutral-700 mb-1">
                    Select Worker Profile to Track *
                  </label>
                  <select
                    value={selectedWorkerForApply}
                    onChange={(e) => setSelectedWorkerForApply(e.target.value)}
                    className="w-full p-2.5 border border-neutral-300 rounded-lg bg-white"
                  >
                    {workers.map(w => (
                      <option key={w.id} value={w.id}>
                        {w.name} ({w.originDistrict}, {w.originState})
                      </option>
                    ))}
                  </select>
                </div>

                <div className="p-3 bg-neutral-50 rounded-lg border border-neutral-200 text-neutral-600">
                  This will create an active tracking record in <strong>Benefit Tracker</strong>, allowing the worker, field officer, or contractor to log document checklist completion, application submission, and authorized manual benefit verification.
                </div>

                <div className="flex justify-end gap-2 pt-3 border-t border-neutral-100">
                  <button
                    type="button"
                    onClick={() => setShowApplyModal(false)}
                    className="px-4 py-2 border border-neutral-300 rounded-lg text-neutral-700 hover:bg-neutral-50 cursor-pointer"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 bg-neutral-900 text-white rounded-lg font-semibold hover:bg-neutral-800 cursor-pointer"
                  >
                    Confirm &amp; Open Tracker
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
