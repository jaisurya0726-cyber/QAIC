import React from 'react';
import { ShieldCheck, CheckCircle2, Award } from 'lucide-react';
import { OptimizationResult } from '../types';

interface MeasurementSectionProps {
  result: OptimizationResult | null;
}

export const MeasurementSection: React.FC<MeasurementSectionProps> = ({ result }) => {
  const qaoa = result?.qaoa || {
    bestSolution: '1011 (Optimal Launch Window & Rocket Pairing)'
  };

  const candidateSolutions = [
    { rank: 1, bitstring: '1011', description: 'Falcon 9 Block 5 + KSC LC-39A (Optimal Window 1)', energy: -51.2, status: 'SELECTED' },
    { rank: 2, bitstring: '1001', description: 'Falcon Heavy + Vandenberg SLC-4E (Secondary Window)', energy: -47.8, status: 'Feasible' },
    { rank: 3, bitstring: '1111', description: 'Ariane 6 + Guiana Space Centre (Alternate Orbit)', energy: -43.1, status: 'Feasible' },
    { rank: 4, bitstring: '0011', description: 'Soyuz-2.1b + Baikonur Cosmodrome (Sub-optimal window)', energy: -35.4, status: 'Rejected (Cost Penalty)' }
  ];

  return (
    <section id="measurement" className="py-20 bg-white border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-900 text-xs font-semibold mb-3">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-700" />
            <span>Step 11: Measurement & Solution Selection</span>
          </div>
          <h2 className="text-3xl font-extrabold text-slate-900 tracking-tight">Decoded Mission Candidate Solutions</h2>
          <p className="text-slate-600 mt-2 text-sm">
            Analyzes quantum measurement outcomes, evaluates solution energies, decodes binary variables, and selects the optimal feasible mission plan.
          </p>
        </div>

        <div className="max-w-4xl mx-auto bg-slate-50 rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
          <div className="p-4 bg-white border-b border-slate-200 flex items-center justify-between">
            <div className="flex items-center space-x-2 text-xs font-bold text-slate-800">
              <Award className="w-4 h-4 text-amber-600" />
              <span>Ranked Candidate Solutions (Filtered by Constraint Satisfaction)</span>
            </div>
            <span className="text-xs font-mono bg-blue-100 text-blue-900 px-2.5 py-1 rounded-full font-semibold">Top Pick: State 1011</span>
          </div>

          <div className="divide-y divide-slate-200">
            {candidateSolutions.map((sol) => (
              <div
                key={sol.rank}
                className={`p-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 transition-colors ${
                  sol.rank === 1 ? 'bg-blue-50/70 border-l-4 border-l-blue-900' : 'bg-white hover:bg-slate-50'
                }`}
              >
                <div className="flex items-center space-x-4">
                  <div className={`w-9 h-9 rounded-xl flex items-center justify-center font-bold text-xs ${
                    sol.rank === 1 ? 'bg-blue-900 text-white shadow-sm' : 'bg-slate-200 text-slate-700'
                  }`}>
                    #{sol.rank}
                  </div>
                  <div>
                    <div className="flex items-center space-x-2">
                      <span className="font-mono font-bold text-slate-900 text-sm">State |{sol.bitstring}&gt;</span>
                      <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                        sol.status === 'SELECTED' ? 'bg-emerald-600 text-white shadow-xs' : sol.status.includes('Rejected') ? 'bg-red-100 text-red-800' : 'bg-blue-100 text-blue-800'
                      }`}>{sol.status}</span>
                    </div>
                    <div className="text-xs text-slate-600 mt-0.5 font-medium">{sol.description}</div>
                  </div>
                </div>

                <div className="flex items-center space-x-4 self-end sm:self-auto font-mono text-xs">
                  <div>
                    <span className="text-slate-400 mr-1">Energy:</span>
                    <span className="font-bold text-slate-900">{sol.energy}</span>
                  </div>
                  {sol.rank === 1 && (
                    <div className="flex items-center space-x-1 text-emerald-700 font-semibold">
                      <CheckCircle2 className="w-4 h-4" />
                      <span>Optimal</span>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
};
