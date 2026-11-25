import React from 'react';
import { ShieldAlert, AlertTriangle, CheckCircle2, TrendingUp, Compass } from 'lucide-react';

export const RiskSection: React.FC = () => {
  const risks = [
    { id: 1, name: 'Fuel Shortage Risk', score: 14.2, category: 'Low', color: 'bg-emerald-100 text-emerald-800 border-emerald-300', desc: 'Propellant margin is 15.4% above minimum requirement.', action: 'Maintain current staging profile.' },
    { id: 2, name: 'Payload Overload Risk', score: 8.5, category: 'Low', color: 'bg-emerald-100 text-emerald-800 border-emerald-300', desc: 'Payload mass (7.8t) is well within LVM3 capacity (10.0t).', action: 'No action required.' },
    { id: 3, name: 'Trajectory Deviation Risk', score: 28.4, category: 'Moderate', color: 'bg-amber-100 text-amber-800 border-amber-300', desc: 'Atmospheric shear during max-Q requires precise guidance corrections.', action: 'Calibrate inertial navigation system prior to lift-off.' },
    { id: 4, name: 'Weather-Related Risk', score: 19.0, category: 'Low', color: 'bg-emerald-100 text-emerald-800 border-emerald-300', desc: 'Surface wind 4.2 m/s; weather constraints fully satisfied.', action: 'Monitor upper-level wind balloons.' },
    { id: 5, name: 'Launch-Window Conflict', score: 12.0, category: 'Low', color: 'bg-emerald-100 text-emerald-800 border-emerald-300', desc: 'No orbital debris conjunction or conflicting range operations.', action: 'Proceed with scheduled window.' },
    { id: 6, name: 'Excessive Acceleration Risk', score: 34.2, category: 'Moderate', color: 'bg-amber-100 text-amber-800 border-amber-300', desc: 'Max acceleration reaches 32.5 m/s² near second stage cutoff.', action: 'Verify structural load limits for satellite fairing.' },
    { id: 7, name: 'Mission Budget Risk', score: 45.0, category: 'Moderate', color: 'bg-amber-100 text-amber-800 border-amber-300', desc: 'Launch cost ($98.5M) approaches 65% of allocated budget.', action: 'Optimize booster reuse logistics.' },
    { id: 8, name: 'Data Uncertainty Risk', score: 11.4, category: 'Low', color: 'bg-emerald-100 text-emerald-800 border-emerald-300', desc: 'Sensor calibration verified across telemetry channels.', action: 'Continue standard telemetry checks.' }
  ];

  return (
    <section id="step-16-risk" className="py-20 bg-slate-50 border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-amber-50 border border-amber-200 text-amber-900 text-xs font-semibold mb-3">
            <ShieldAlert className="w-3.5 h-3.5 text-amber-700" />
            <span>Step 16: Intelligent Mission Risk Assessment</span>
          </div>
          <h2 className="text-3xl font-extrabold text-slate-900 tracking-tight">Comprehensive Risk Scoring & Mitigation</h2>
          <p className="text-slate-600 mt-2 text-sm">
            Evaluates 8 critical risk vectors spanning fuel reserves, trajectory divergence, structural acceleration, and budget constraints.
          </p>
        </div>

        {/* Overall Mission Risk Card */}
        <div className="max-w-4xl mx-auto mb-10 p-6 rounded-2xl bg-white border border-slate-200 shadow-sm flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center space-x-4">
            <div className="w-14 h-14 rounded-2xl bg-amber-100 text-amber-800 flex items-center justify-center font-bold text-xl">
              24.1
            </div>
            <div>
              <div className="text-xs font-bold text-slate-500 uppercase tracking-wider">Overall Mission Risk Score</div>
              <div className="text-xl font-extrabold text-slate-900">Moderate Risk (Level II)</div>
              <div className="text-xs text-slate-600 mt-0.5">All hard constraints satisfied. Recommended guidance adjustments noted below.</div>
            </div>
          </div>

          <span className="px-4 py-2 rounded-xl bg-amber-100 text-amber-900 font-bold text-xs">
            MODERATE RISK – YELLOW
          </span>
        </div>

        {/* Risk Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
          {risks.map((risk) => (
            <div key={risk.id} className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs space-y-3 flex flex-col justify-between">
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-slate-500">Risk #{risk.id}</span>
                  <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold border ${risk.color}`}>
                    {risk.category} ({risk.score}%)
                  </span>
                </div>
                <h3 className="text-base font-bold text-slate-900">{risk.name}</h3>
                <p className="text-xs text-slate-600 leading-relaxed">{risk.desc}</p>
              </div>

              <div className="pt-3 border-t border-slate-100 text-xs">
                <span className="font-semibold text-blue-900">Action: </span>
                <span className="text-slate-700">{risk.action}</span>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
