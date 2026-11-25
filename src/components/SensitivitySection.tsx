import React, { useState } from 'react';
import { Sliders, Activity, TrendingUp, BarChart2 } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid, Legend } from 'recharts';

export const SensitivitySection: React.FC = () => {
  const [selectedParam, setSelectedParam] = useState<'payload' | 'fuel' | 'thrust' | 'altitude'>('payload');
  const [sensitivityRange, setSensitivityRange] = useState<number>(20);

  const sensitivityData = [
    { param: 'Payload Mass', impact: 42.5, direction: 'Positive' },
    { param: 'Specific Impulse (Isp)', impact: 38.1, direction: 'Negative' },
    { param: 'Target Altitude', impact: 29.4, direction: 'Positive' },
    { param: 'Rocket Thrust', impact: 18.2, direction: 'Negative' },
    { param: 'Weather Wind Speed', impact: 12.0, direction: 'Positive' },
  ];

  return (
    <section id="step-19-sensitivity" className="py-20 bg-slate-50 border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-indigo-50 border border-indigo-200 text-indigo-900 text-xs font-semibold mb-3">
            <Activity className="w-3.5 h-3.5 text-indigo-700" />
            <span>Step 19: Parameter Sensitivity Analysis</span>
          </div>
          <h2 className="text-3xl font-extrabold text-slate-900 tracking-tight">Model Sensitivity & Tornado Ranking</h2>
          <p className="text-slate-600 mt-2 text-sm">
            Quantify how perturbations in rocket mass, payload capacity, and specific impulse impact overall objective optimization.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start max-w-5xl mx-auto">
          
          <div className="lg:col-span-5 bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-6">
            <h3 className="text-base font-bold text-slate-900 border-b border-slate-100 pb-3">Sensitivity Controls</h3>

            <div className="space-y-4 text-xs">
              <div>
                <label className="block font-semibold text-slate-700 mb-1">Select Parameter to Perturb</label>
                <select
                  value={selectedParam}
                  onChange={(e) => setSelectedParam(e.target.value as any)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 bg-white font-medium focus:outline-none focus:border-blue-900"
                >
                  <option value="payload">Payload Mass (kg)</option>
                  <option value="fuel">Fuel Propellant Mass (tons)</option>
                  <option value="thrust">Engine Thrust (kN)</option>
                  <option value="altitude">Target Orbit Altitude (km)</option>
                </select>
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">Perturbation Range: ±{sensitivityRange}%</label>
                <input
                  type="range"
                  min="5"
                  max="50"
                  step="5"
                  value={sensitivityRange}
                  onChange={(e) => setSensitivityRange(Number(e.target.value))}
                  className="w-full accent-blue-900"
                />
              </div>

              <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 space-y-2">
                <div className="font-bold text-slate-900">Analysis Insight:</div>
                <div className="text-slate-600 leading-relaxed">
                  <span className="font-semibold text-blue-900 uppercase">{selectedParam}</span> exhibits high elasticity. A ±{sensitivityRange}% variation alters total fuel consumption by ~{(sensitivityRange * 1.4).toFixed(1)}%.
                </div>
              </div>
            </div>
          </div>

          <div className="lg:col-span-7 bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-base font-bold text-slate-900">Parameter Sensitivity Ranking (Tornado Impact %)</h3>
              <BarChart2 className="w-5 h-5 text-indigo-800" />
            </div>

            <div className="h-72 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={sensitivityData} layout="vertical" margin={{ top: 10, right: 20, left: 40, bottom: 10 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                  <XAxis type="number" tick={{ fontSize: 11 }} />
                  <YAxis dataKey="param" type="category" tick={{ fontSize: 11 }} width={110} />
                  <Tooltip contentStyle={{ fontSize: '12px', borderRadius: '8px' }} />
                  <Bar dataKey="impact" name="Impact Score (%)" fill="#6366f1" radius={[0, 4, 4, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
