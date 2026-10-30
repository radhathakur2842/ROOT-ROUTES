import React from 'react';
import { useApp } from '../../context/AppContext';
import { 
  Compass, 
  BookOpen, 
  CheckSquare, 
  GraduationCap, 
  MapPin, 
  AlertCircle, 
  ArrowRight, 
  FileText, 
  CheckCircle2, 
  Clock, 
  ShieldAlert,
  Building2,
  HeartPulse,
  Info
} from 'lucide-react';

export const DashboardView: React.FC = () => {
  const { 
    currentPersona, 
    currentRole, 
    workers, 
    journeys, 
    schemes, 
    applications, 
    continuityGaps, 
    educationRecords, 
    healthRecords, 
    setActiveTab, 
    resolveGap,
    t 
  } = useApp();

  const unresolvedGaps = continuityGaps.filter(g => !g.resolved);
  const activeJourneys = journeys.filter(j => j.status !== 'CASE_CLOSED');

  return (
    <div className="space-y-6">
      {/* Welcome Banner */}
      <div className="bg-white border border-neutral-200 rounded-xl p-5 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs text-neutral-500 mb-1">
            <span>{t.common.activeRole}:</span>
            <span className="font-semibold text-neutral-800">{t.roles[currentRole]}</span>
            <span>·</span>
            <span>{currentPersona.location}</span>
          </div>
          <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-neutral-900">
            Welcome back, {currentPersona.name}
          </h1>
          <p className="text-sm text-neutral-600 mt-1 max-w-2xl">
            {t.roleDescriptions[currentRole]}
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setActiveTab('assistant')}
            className="px-3.5 py-2 text-xs font-semibold bg-[#1C5F3B] text-white rounded-lg hover:bg-[#14462B] transition-colors shadow-xs flex items-center gap-1.5 cursor-pointer whitespace-nowrap"
          >
            <span>Ask Multilingual Guide</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Role-Specific Content */}
      {currentRole === 'WORKER' && (
        <div className="space-y-6">
          {/* Worker Hero Story Banner */}
          <div className="relative rounded-2xl overflow-hidden border border-neutral-200 bg-neutral-900 text-white min-h-[220px] flex flex-col justify-end p-6">
            <img 
              src="/src/assets/images/hero_migrant_family_1793356921145.jpg"
              alt="Migrant Family Journey" 
              className="absolute inset-0 w-full h-full object-cover opacity-35"
              referrerPolicy="no-referrer"
            />
            <div className="relative z-10 max-w-2xl">
              <span className="text-xs font-mono tracking-wider text-[#E59E1B] uppercase font-bold flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-[#E59E1B]" />
                <span>Active Migration Journey · Gaya to Pune</span>
              </span>
              <h2 className="text-2xl font-bold text-white mt-1">
                Your Family Rights &amp; Service Continuity
              </h2>
              <p className="text-sm text-neutral-200 mt-1.5">
                Ramesh Kumar, your family's relocation from Gaya, Bihar to Pune (Wagholi) is currently active. Your daughter Radha is eligible for direct school admission under RTE, and son Sonu's vaccination record is protected.
              </p>
              <div className="flex flex-wrap items-center gap-3 mt-4">
                <button
                  onClick={() => setActiveTab('journeys')}
                  className="px-4 py-2 bg-[#E59E1B] hover:bg-[#D48F12] text-neutral-950 font-bold text-xs rounded-lg transition-colors cursor-pointer shadow-xs"
                >
                  View Journey Timeline
                </button>
                <button
                  onClick={() => setActiveTab('childServices')}
                  className="px-4 py-2 bg-white/20 hover:bg-white/30 text-white font-medium text-xs rounded-lg backdrop-blur-xs transition-colors cursor-pointer border border-white/30"
                >
                  Child School &amp; Health Cards
                </button>
              </div>
            </div>
          </div>

          {/* Key Metrics / Snapshot */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="bg-white p-4 rounded-xl border border-neutral-200 shadow-xs">
              <div className="text-xs text-neutral-500">Destination Worksite</div>
              <div className="text-sm font-bold text-neutral-900 mt-1 truncate">
                Wagholi Flyover / Metro 3
              </div>
              <div className="text-xs text-neutral-500 mt-1">Pune Haveli, Maharashtra</div>
            </div>

            <div className="bg-white p-4 rounded-xl border border-neutral-200 shadow-xs">
              <div className="text-xs text-neutral-500">Traveling Dependents</div>
              <div className="text-lg font-bold font-mono text-neutral-900 mt-1">
                3 Members
              </div>
              <div className="text-xs text-emerald-600 mt-1">Geeta (Wife), Radha (7), Sonu (1)</div>
            </div>

            <div className="bg-white p-4 rounded-xl border border-neutral-200 shadow-xs">
              <div className="text-xs text-neutral-500">Assigned Field Worker</div>
              <div className="text-sm font-bold text-neutral-900 mt-1 truncate">
                Sunita Devi
              </div>
              <div className="text-xs text-neutral-500 mt-1">Jan Vikas Sanstha (Empanelled)</div>
            </div>

            <div className="bg-white p-4 rounded-xl border border-neutral-200 shadow-xs">
              <div className="text-xs text-neutral-500">Action Required</div>
              <div className="text-lg font-bold font-mono text-amber-700 mt-1">
                2 Next Steps
              </div>
              <div className="text-xs text-neutral-500 mt-1">School visit &amp; PHC vaccination</div>
            </div>
          </div>

          {/* Immediate Action Cards for Worker Family */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="bg-white rounded-xl border border-neutral-200 p-5 shadow-xs">
              <div className="flex items-center justify-between pb-3 border-b border-neutral-100">
                <div className="flex items-center gap-2">
                  <GraduationCap className="w-5 h-5 text-[#1C5F3B]" />
                  <h3 className="text-sm font-bold text-neutral-900">
                    Children's Continuity Status
                  </h3>
                </div>
                <button
                  onClick={() => setActiveTab('childServices')}
                  className="text-xs font-semibold text-[#1C5F3B] hover:underline cursor-pointer"
                >
                  Manage All
                </button>
              </div>

              <div className="divide-y divide-neutral-100 mt-2">
                <div className="py-3 flex items-start justify-between gap-3">
                  <div>
                    <div className="text-xs font-bold text-neutral-900">Radha Kumar (7 yrs)</div>
                    <p className="text-xs text-neutral-600 mt-0.5">
                      Class 2 Admission at ZP Primary School Wagholi. Transfer Certificate exempt under RTE Section 4.
                    </p>
                    <span className="inline-block mt-1.5 text-[11px] font-medium text-[#1C5F3B] bg-[#EAF5EE] px-2 py-0.5 rounded border border-[#A4D7B7]">
                      Admission Referral Created · Needs School Visit
                    </span>
                  </div>
                  <button 
                    onClick={() => setActiveTab('childServices')}
                    className="text-xs text-neutral-600 hover:text-neutral-900 border border-neutral-200 px-2.5 py-1 rounded-md shrink-0 cursor-pointer"
                  >
                    Details
                  </button>
                </div>

                <div className="py-3 flex items-start justify-between gap-3">
                  <div>
                    <div className="text-xs font-bold text-neutral-900">Sonu Kumar (1 yr)</div>
                    <p className="text-xs text-neutral-600 mt-0.5">
                      Pentavalent-3 and MR-1 due. Mother-Child Protection (MCP) card carried from Bihar.
                    </p>
                    <span className="inline-block mt-1.5 text-[11px] font-medium text-[#1D649A] bg-[#EBF4FB] px-2 py-0.5 rounded border border-[#9EC9EB]">
                      PHC Wagholi Session on Wednesday
                    </span>
                  </div>
                  <button 
                    onClick={() => setActiveTab('childServices')}
                    className="text-xs text-neutral-600 hover:text-neutral-900 border border-neutral-200 px-2.5 py-1 rounded-md shrink-0 cursor-pointer"
                  >
                    Details
                  </button>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl border border-neutral-200 p-5 shadow-xs">
              <div className="flex items-center justify-between pb-3 border-b border-neutral-100">
                <div className="flex items-center gap-2">
                  <BookOpen className="w-5 h-5 text-[#1C5F3B]" />
                  <h3 className="text-sm font-bold text-neutral-900">
                    Your Government Welfare Benefits
                  </h3>
                </div>
                <button
                  onClick={() => setActiveTab('benefits')}
                  className="text-xs font-semibold text-[#1C5F3B] hover:underline cursor-pointer"
                >
                  Track Applications
                </button>
              </div>

              <div className="divide-y divide-neutral-100 mt-2">
                <div className="py-3">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-neutral-900">One Nation One Ration Card (ONORC)</span>
                    <span className="text-[11px] font-mono text-[#1C5F3B] bg-[#EAF5EE] px-2 py-0.5 rounded border border-[#A4D7B7]">
                      Application Started
                    </span>
                  </div>
                  <p className="text-xs text-neutral-600 mt-1">
                    First biometric test verified at Wagholi FPS #42. Monthly ration pickup available with thumbprint.
                  </p>
                </div>

                <div className="py-3">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-neutral-900">MahaBOCW Construction Worker Board</span>
                    <span className="text-[11px] font-mono text-[#B87B0E] bg-[#FEF7EA] px-2 py-0.5 rounded border border-[#F8D793]">
                      Checklist Ready
                    </span>
                  </div>
                  <p className="text-xs text-neutral-600 mt-1">
                    Contractor Rajesh Shinde has issued your 90-day engagement certificate. Online registration pending.
                  </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      )}

      {/* CONTRACTOR DASHBOARD */}
      {currentRole === 'CONTRACTOR' && (
        <div className="space-y-6">
          {/* Privacy & Scope Disclaimer for Contractors */}
          <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 flex items-start gap-3">
            <Info className="w-5 h-5 text-blue-700 shrink-0 mt-0.5" />
            <div className="text-xs text-blue-900 space-y-1">
              <p className="font-bold">Authorised Contractor Privacy Guard (DPDP Act Compliance):</p>
              <p>
                You are legally authorised to manage your 10 registered site workers, verify 90-day engagement certificates for BOCW, and provide worksite amenities. In compliance with child safeguarding and privacy guidelines, child protection files, confidential medical records, and private family complaints are restricted from contractor accounts.
              </p>
            </div>
          </div>

          {/* Contractor Metrics */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="bg-white p-4 rounded-xl border border-neutral-200 shadow-xs">
              <div className="text-xs text-neutral-500">Active Workers Managed</div>
              <div className="text-2xl font-bold font-mono text-neutral-900 mt-1">
                10 Workers
              </div>
              <div className="text-xs text-neutral-500 mt-1">Pune Metro &amp; Wagholi Flyover</div>
            </div>

            <div className="bg-white p-4 rounded-xl border border-neutral-200 shadow-xs">
              <div className="text-xs text-neutral-500">e-Shram Coverage</div>
              <div className="text-2xl font-bold font-mono text-emerald-700 mt-1">
                8 / 10
              </div>
              <div className="text-xs text-emerald-600 mt-1">80% enrolled with UAN</div>
            </div>

            <div className="bg-white p-4 rounded-xl border border-neutral-200 shadow-xs">
              <div className="text-xs text-neutral-500">BOCW Certificates Issued</div>
              <div className="text-2xl font-bold font-mono text-blue-700 mt-1">
                1 Active
              </div>
              <div className="text-xs text-neutral-500 mt-1">9 eligible for 90-day certification</div>
            </div>

            <div className="bg-white p-4 rounded-xl border border-neutral-200 shadow-xs">
              <div className="text-xs text-neutral-500">Pending Site Actions</div>
              <div className="text-2xl font-bold font-mono text-amber-700 mt-1">
                1 Task
              </div>
              <div className="text-xs text-amber-700 mt-1">BOCW portal upload for Ramesh</div>
            </div>
          </div>

          {/* Managed Workers List Preview */}
          <div className="bg-white rounded-xl border border-neutral-200 p-5 shadow-xs">
            <div className="flex items-center justify-between pb-3 border-b border-neutral-100">
              <div>
                <h3 className="text-sm font-bold text-neutral-900">
                  Registered Workers in Your Deployment
                </h3>
                <p className="text-xs text-neutral-500">
                  Workers associated with Shinde Infrastructure &amp; Labour Services
                </p>
              </div>
              <button
                onClick={() => setActiveTab('workers')}
                className="text-xs font-semibold text-amber-700 hover:underline cursor-pointer"
              >
                View Full Roster ({workers.length})
              </button>
            </div>

            <div className="overflow-x-auto mt-3">
              <table className="w-full text-xs text-left">
                <thead className="bg-neutral-50 text-neutral-500 uppercase font-mono text-[10px]">
                  <tr>
                    <th className="py-2.5 px-3">Worker Name</th>
                    <th className="py-2.5 px-3">Origin State &amp; District</th>
                    <th className="py-2.5 px-3">Trade / Occupation</th>
                    <th className="py-2.5 px-3">e-Shram Status</th>
                    <th className="py-2.5 px-3">BOCW Cert</th>
                    <th className="py-2.5 px-3 text-right">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-neutral-100">
                  {workers.slice(0, 5).map(w => (
                    <tr key={w.id} className="hover:bg-neutral-50/70">
                      <td className="py-2.5 px-3 font-semibold text-neutral-900">{w.name}</td>
                      <td className="py-2.5 px-3 text-neutral-600">{w.originState} ({w.originDistrict})</td>
                      <td className="py-2.5 px-3 text-neutral-600">{w.occupation}</td>
                      <td className="py-2.5 px-3">
                        <span className={`px-2 py-0.5 rounded text-[10px] font-mono font-medium ${
                          w.eShramStatus === 'REGISTERED' 
                            ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                            : 'bg-amber-50 text-amber-700 border border-amber-200'
                        }`}>
                          {w.eShramStatus}
                        </span>
                      </td>
                      <td className="py-2.5 px-3 text-neutral-600">
                        {w.id === 'w_001' ? 'Issued (90 Days)' : 'Pending verification'}
                      </td>
                      <td className="py-2.5 px-3 text-right">
                        <button
                          onClick={() => setActiveTab('workers')}
                          className="text-amber-700 hover:text-amber-800 font-medium cursor-pointer"
                        >
                          View Card
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* FIELD WORKER / CASE WORKER DASHBOARD */}
      {currentRole === 'FIELD_WORKER' && (
        <div className="space-y-6">
          {/* Field Worker Visual Banner */}
          <div className="relative rounded-2xl overflow-hidden border border-neutral-200 bg-neutral-900 text-white min-h-[190px] flex flex-col justify-end p-5">
            <img 
              src="/src/assets/images/field_worker_support_1793356921752.jpg"
              alt="Field Worker Support" 
              className="absolute inset-0 w-full h-full object-cover opacity-35"
              referrerPolicy="no-referrer"
            />
            <div className="relative z-10 max-w-2xl">
              <span className="text-xs font-mono tracking-wider text-emerald-300 uppercase font-semibold">
                Caseload Management · Haveli &amp; Pune Cluster
              </span>
              <h2 className="text-xl font-bold text-white mt-1">
                Field Intake, Service Referrals &amp; Gap Resolution
              </h2>
              <p className="text-xs text-neutral-200 mt-1">
                You have {unresolvedGaps.length} pending service gaps requiring field verification across schools, PHCs, and Anganwadis in Pune district.
              </p>
            </div>
          </div>

          {/* Quick Gaps Overview */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="bg-red-50 border border-red-200 p-4 rounded-xl">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-red-900">Critical Gaps</span>
                <span className="text-xs px-2 py-0.5 rounded-full font-mono font-bold bg-red-200 text-red-800">
                  {unresolvedGaps.filter(g => g.priority === 'CRITICAL').length}
                </span>
              </div>
              <p className="text-xs text-red-700 mt-1">
                Out-of-school children requiring immediate RTE Section 4 enrollment.
              </p>
            </div>

            <div className="bg-amber-50 border border-amber-200 p-4 rounded-xl">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-amber-900">Health / Vaccination</span>
                <span className="text-xs px-2 py-0.5 rounded-full font-mono font-bold bg-amber-200 text-amber-800">
                  {unresolvedGaps.filter(g => g.ruleType === 'MISSED_IMMUNIZATION').length}
                </span>
              </div>
              <p className="text-xs text-amber-700 mt-1">
                Infants approaching or past due vaccination window.
              </p>
            </div>

            <div className="bg-emerald-50 border border-emerald-200 p-4 rounded-xl">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-emerald-900">Service Directory</span>
                <span className="text-xs px-2 py-0.5 rounded-full font-mono font-bold bg-emerald-200 text-emerald-800">
                  6 Verified
                </span>
              </div>
              <p className="text-xs text-emerald-700 mt-1">
                ZP schools, PHCs, and Anganwadis verified for Haveli cluster.
              </p>
            </div>
          </div>

          {/* Active Gaps Requiring Field Action */}
          <div className="bg-white rounded-xl border border-neutral-200 p-5 shadow-xs">
            <div className="flex items-center justify-between pb-3 border-b border-neutral-100">
              <div className="flex items-center gap-2">
                <AlertCircle className="w-5 h-5 text-red-600" />
                <h3 className="text-sm font-bold text-neutral-900">
                  Urgent Field Actions ({unresolvedGaps.length})
                </h3>
              </div>
              <button
                onClick={() => setActiveTab('followups')}
                className="text-xs font-semibold text-amber-700 hover:underline cursor-pointer"
              >
                Open Gap Engine
              </button>
            </div>

            <div className="divide-y divide-neutral-100 mt-2">
              {unresolvedGaps.map(gap => (
                <div key={gap.id} className="py-3.5 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <div>
                    <div className="flex items-center gap-2">
                      <span className={`text-[10px] font-mono font-bold px-1.5 py-0.2 rounded border ${
                        gap.priority === 'CRITICAL' ? 'bg-red-50 text-red-800 border-red-300' :
                        gap.priority === 'HIGH' ? 'bg-amber-50 text-amber-800 border-amber-300' :
                        'bg-blue-50 text-blue-800 border-blue-300'
                      }`}>
                        {gap.priority}
                      </span>
                      <h4 className="text-xs font-bold text-neutral-900">{gap.title}</h4>
                    </div>
                    <p className="text-xs text-neutral-600 mt-1">
                      {gap.description}
                    </p>
                    <div className="flex items-center gap-3 text-[11px] text-neutral-500 mt-1.5">
                      <span>Worker: <strong>{gap.workerName}</strong></span>
                      <span>·</span>
                      <span>Due: <span className="font-mono">{gap.dueDate}</span></span>
                    </div>
                  </div>

                  <button
                    onClick={() => resolveGap(gap.id)}
                    className="px-3 py-1.5 bg-neutral-900 hover:bg-neutral-800 text-white text-xs font-medium rounded-lg shrink-0 transition-colors cursor-pointer"
                  >
                    Mark Resolved
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* ADMIN DASHBOARD */}
      {currentRole === 'ADMIN' && (
        <div className="space-y-6">
          {/* Admin Metric Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="bg-white p-4 rounded-xl border border-neutral-200 shadow-xs">
              <div className="text-xs text-neutral-500">Registered Families</div>
              <div className="text-2xl font-bold font-mono text-neutral-900 mt-1">
                {workers.length}
              </div>
              <div className="text-xs text-neutral-500 mt-1">10 Associated with Contractors</div>
            </div>

            <div className="bg-white p-4 rounded-xl border border-neutral-200 shadow-xs">
              <div className="text-xs text-neutral-500">Active Migration Journeys</div>
              <div className="text-2xl font-bold font-mono text-neutral-900 mt-1">
                {activeJourneys.length}
              </div>
              <div className="text-xs text-emerald-600 mt-1">Gaya, Nawada, Beed corridors</div>
            </div>

            <div className="bg-white p-4 rounded-xl border border-neutral-200 shadow-xs">
              <div className="text-xs text-neutral-500">Curated Welfare Schemes</div>
              <div className="text-2xl font-bold font-mono text-neutral-900 mt-1">
                {schemes.length} Verified
              </div>
              <div className="text-xs text-neutral-500 mt-1">Central &amp; Maharashtra State</div>
            </div>

            <div className="bg-white p-4 rounded-xl border border-neutral-200 shadow-xs">
              <div className="text-xs text-neutral-500">Unresolved Continuity Gaps</div>
              <div className="text-2xl font-bold font-mono text-red-600 mt-1">
                {unresolvedGaps.length}
              </div>
              <div className="text-xs text-neutral-500 mt-1">Requires Field Team Follow-up</div>
            </div>
          </div>

          {/* Migration Corridor Analytics Preview */}
          <div className="bg-white rounded-xl border border-neutral-200 p-5 shadow-xs">
            <div className="flex items-center justify-between pb-3 border-b border-neutral-100">
              <div>
                <h3 className="text-sm font-bold text-neutral-900">
                  Primary Migration Corridors Entering Maharashtra
                </h3>
                <p className="text-xs text-neutral-500">
                  Aggregated, privacy-preserving origin-to-destination volume
                </p>
              </div>
              <button
                onClick={() => setActiveTab('reports')}
                className="text-xs font-semibold text-amber-700 hover:underline cursor-pointer"
              >
                Full Planning Report
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
              <div className="p-3.5 rounded-lg border border-neutral-200 bg-neutral-50">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-bold text-neutral-800">Bihar &rarr; Pune</span>
                  <span className="font-mono font-bold text-neutral-900">40%</span>
                </div>
                <div className="w-full bg-neutral-200 h-2 rounded-full mt-2 overflow-hidden">
                  <div className="bg-amber-600 h-full rounded-full" style={{ width: '40%' }}></div>
                </div>
                <p className="text-[11px] text-neutral-500 mt-2">Districts: Gaya, Nawada, Darbhanga</p>
              </div>

              <div className="p-3.5 rounded-lg border border-neutral-200 bg-neutral-50">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-bold text-neutral-800">Intrastate MH (Beed/Nanded)</span>
                  <span className="font-mono font-bold text-neutral-900">20%</span>
                </div>
                <div className="w-full bg-neutral-200 h-2 rounded-full mt-2 overflow-hidden">
                  <div className="bg-blue-600 h-full rounded-full" style={{ width: '20%' }}></div>
                </div>
                <p className="text-[11px] text-neutral-500 mt-2">Seasonal Sugarcane &amp; Brick Kilns</p>
              </div>

              <div className="p-3.5 rounded-lg border border-neutral-200 bg-neutral-50">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-bold text-neutral-800">Odisha &amp; Jharkhand &rarr; Pune</span>
                  <span className="font-mono font-bold text-neutral-900">30%</span>
                </div>
                <div className="w-full bg-neutral-200 h-2 rounded-full mt-2 overflow-hidden">
                  <div className="bg-emerald-600 h-full rounded-full" style={{ width: '30%' }}></div>
                </div>
                <p className="text-[11px] text-neutral-500 mt-2">Districts: Ganjam, Dumka, Mayurbhanj</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
