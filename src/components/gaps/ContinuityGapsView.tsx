import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { ContinuityGap } from '../../types';
import { 
  AlertCircle, 
  CheckCircle2, 
  Clock, 
  ShieldCheck, 
  Filter, 
  User, 
  ArrowRight,
  Cpu
} from 'lucide-react';

export const ContinuityGapsView: React.FC = () => {
  const { continuityGaps, resolveGap, currentPersona, currentRole, t } = useApp();
  const [filterPriority, setFilterPriority] = useState<string>('ALL');
  const [showResolved, setShowResolved] = useState(false);

  const filteredGaps = continuityGaps.filter(g => {
    if (!showResolved && g.resolved) return false;
    if (filterPriority === 'ALL') return true;
    return g.priority === filterPriority;
  });

  const getPriorityBadge = (p: string) => {
    switch (p) {
      case 'CRITICAL': return 'bg-red-50 text-red-800 border-red-300';
      case 'HIGH': return 'bg-[#FEF7EA] text-[#B87B0E] border-[#F8D793] font-bold';
      default: return 'bg-[#EBF4FB] text-[#154C76] border-[#9EC9EB] font-bold';
    }
  };

  return (
    <div className="space-y-6">
      {/* Title */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold text-neutral-900 tracking-tight">
            Continuity Gap Engine &amp; Follow-up Tasks
          </h2>
          <p className="text-xs text-neutral-500 mt-0.5">
            Transparent, rules-based detection of unlinked education, pending immunizations, and overdue verifications.
          </p>
        </div>

        <div className="flex items-center gap-3 self-start sm:self-auto">
          <label className="flex items-center gap-1.5 text-xs text-neutral-700 cursor-pointer">
            <input
              type="checkbox"
              checked={showResolved}
              onChange={(e) => setShowResolved(e.target.checked)}
              className="rounded text-[#1C5F3B] focus:ring-[#1C5F3B]"
            />
            <span>Show Resolved ({continuityGaps.filter(g => g.resolved).length})</span>
          </label>

          <select
            value={filterPriority}
            onChange={(e) => setFilterPriority(e.target.value)}
            className="text-xs border border-neutral-200 rounded-lg px-2.5 py-1.5 bg-white text-neutral-800 font-medium"
          >
            <option value="ALL">All Priorities</option>
            <option value="CRITICAL">Critical Only</option>
            <option value="HIGH">High Priority</option>
            <option value="MEDIUM">Medium Priority</option>
          </select>
        </div>
      </div>

      {/* Rules Engine Transparency Banner in Brand Green & Gold */}
      <div className="bg-[#0E281C] text-neutral-100 rounded-xl p-4 flex items-start gap-3 shadow-xs border border-[#1C5F3B]/50">
        <Cpu className="w-5 h-5 text-[#E59E1B] shrink-0 mt-0.5" />
        <div className="text-xs space-y-1">
          <p className="font-bold text-white">Deterministic &amp; Auditable Rules Engine:</p>
          <p className="text-neutral-300 leading-relaxed">
            Continuity alerts are triggered exclusively by explicit statutory logic: (1) Migrating child aged 6-14 without active school enrollment, (2) Infant vaccine interval exceeding national UIP schedule, (3) Construction worker with 90+ days without BOCW coverage, and (4) Follow-up date elapsed. <strong>No predictive AI scoring or fraud inferences are made from personal data.</strong>
          </p>
        </div>
      </div>

      {/* Gaps List */}
      <div className="space-y-3">
        {filteredGaps.map(gap => (
          <div
            key={gap.id}
            className={`rounded-xl border p-5 shadow-xs transition-colors flex flex-col md:flex-row md:items-center justify-between gap-4 ${
              gap.resolved 
                ? 'bg-neutral-50/70 border-neutral-200 opacity-60' 
                : 'bg-white border-neutral-200 hover:border-neutral-300'
            }`}
          >
            <div className="space-y-1.5 flex-1">
              <div className="flex flex-wrap items-center gap-2">
                <span className={`text-[10px] font-mono font-bold px-2 py-0.5 rounded border ${getPriorityBadge(gap.priority)}`}>
                  {gap.priority}
                </span>
                <span className="text-[10px] font-mono text-neutral-400 uppercase">
                  Rule: {gap.ruleType.replace(/_/g, ' ')}
                </span>
                {gap.resolved && (
                  <span className="text-[10px] font-bold text-[#1C5F3B] bg-[#EAF5EE] px-2 py-0.5 rounded border border-[#A4D7B7]">
                    ✓ Resolved
                  </span>
                )}
              </div>

              <h3 className="text-sm font-bold text-neutral-900">
                {gap.title}
              </h3>

              <p className="text-xs text-neutral-600 leading-relaxed">
                {gap.description}
              </p>

              <div className="p-2.5 rounded-lg bg-[#FAFBF9] border border-[#E3EBE6] text-xs text-neutral-900 mt-2">
                <strong className="text-[#1C5F3B]">Recommended Next Action:</strong> {gap.recommendedAction}
              </div>

              <div className="flex flex-wrap items-center gap-4 text-[11px] text-neutral-500 pt-1">
                <span>Beneficiary: <strong>{gap.workerName}</strong></span>
                <span>·</span>
                <span>Responsible: <strong className="text-neutral-800">{gap.responsibleRole}</strong></span>
                <span>·</span>
                <span>Due Date: <strong className="font-mono text-neutral-800">{gap.dueDate}</strong></span>
                <span>·</span>
                <span>Last Updated: <span className="font-mono">{gap.lastUpdated}</span></span>
              </div>
            </div>

            <div className="shrink-0 flex items-center gap-2 self-end md:self-center">
              {!gap.resolved ? (
                <button
                  onClick={() => resolveGap(gap.id)}
                  className="px-4 py-2 bg-[#1C5F3B] hover:bg-[#14462B] text-white rounded-lg text-xs font-semibold transition-colors cursor-pointer shadow-xs whitespace-nowrap"
                >
                  Mark Resolved
                </button>
              ) : (
                <span className="text-xs text-[#1C5F3B] font-semibold flex items-center gap-1">
                  <CheckCircle2 className="w-4 h-4" />
                  <span>Action Completed</span>
                </span>
              )}
            </div>
          </div>
        ))}

        {filteredGaps.length === 0 && (
          <div className="py-12 text-center text-neutral-500 bg-white rounded-xl border border-neutral-200">
            No continuity gaps found in this view.
          </div>
        )}
      </div>
    </div>
  );
};
