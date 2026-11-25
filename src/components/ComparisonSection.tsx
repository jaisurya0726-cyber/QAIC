import React from 'react';
import { BarChart3, TrendingDown, Zap, Award } from 'lucide-react';
import { OptimizationResult } from '../types';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid, Legend } from 'recharts';

interface ComparisonSectionProps {
  result: OptimizationResult | null;
}

export const ComparisonSection: React.FC<ComparisonSectionProps> = ({ result }) => {
  const classical = result?.classical || { fuelUsed: 420.5, cost: 110.0, risk: 2.4, executionTime: 342 };
  const qaoa = result?.qaoa || { fuelUsed: 368.2, cost: 98.5, risk: 1.6, executionTime: 890 };

  const comparisonChartData = [
    { metric: 'Fuel Used (tons)', Classical: classical.fuelUsed, QAOA: qaoa.fuelUsed },
    { metric: 'Cost ($M)', Classical: classical.cost, QAOA: qaoa.cost },
    { metric: 'Risk Factor (%)', Classical: classical.risk * 10, QAOA: qaoa.risk * 10 },
  ];

  const fuelImprovement = (((classical.fuelUsed - qaoa.fuelUsed) / classical.fuelUsed) * 100).toFixed(1);
  const costImprovement = (((classical.cost - qaoa.cost) / classical.cost) * 100).toFixed(1);

  return (
    <section id="comparison" className="py-20 bg-white border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-blue-50 border border-blue-200 text-blue-900 text-xs font-semibold mb-3">
            <BarChart3 className="w-3.5 h-3.5 text-blue-700" />
            <span>Step 13: Classical vs Quantum Comparison</span>
          </div>
          <h2 className="text-3xl font-extrabold text-slate-900 tracking-tight">Performance Benchmarking & Advantage Analysis</h2>
          <p className="text-slate-600 mt-2 text-sm">
            Compares classical SciPy optimization baseline against QAOA quantum optimization across fuel consumption, operational cost, and mission risk.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center mb-12">
          
          <div className="lg:col-span-5 space-y-6">
            <div className="bg-slate-50 p-6 rounded-2xl border border-slate-200 space-y-4">
              <h3 className="text-base font-bold text-slate-900 flex items-center space-x-2">
                <Award className="w-5 h-5 text-blue-900" />
                <span>Key Improvement Metrics</span>
              </h3>

              <div className="space-y-3">
                <div className="p-3 bg-white rounded-xl border border-slate-200 flex items-center justify-between">
                  <div>
                    <div className="text-xs text-slate-500 font-medium">Fuel Consumption Reduction</div>
                    <div className="text-lg font-bold text-blue-900">{fuelImprovement}% Saved</div>
                  </div>
                  <TrendingDown className="w-6 h-6 text-emerald-600" />
                </div>

                <div className="p-3 bg-white rounded-xl border border-slate-200 flex items-center justify-between">
                  <div>
                    <div className="text-xs text-slate-500 font-medium">Launch Cost Reduction</div>
                    <div className="text-lg font-bold text-indigo-900">{costImprovement}% Saved</div>
                  </div>
                  <TrendingDown className="w-6 h-6 text-emerald-600" />
                </div>

                <div className="p-3 bg-white rounded-xl border border-slate-200 flex items-center justify-between">
                  <div>
                    <div className="text-xs text-slate-500 font-medium">Mission Risk Margin</div>
                    <div className="text-lg font-bold text-emerald-700">1.6% (Optimized)</div>
                  </div>
                  <Zap className="w-5 h-5 text-amber-500" />
                </div>
              </div>

              <p className="text-xs text-slate-500 leading-relaxed italic">
                Note: QAOA results represent approximate quantum optimization on a simulator. Quantum advantage scales with combinatorial constraint complexity.
              </p>
            </div>
          </div>

          <div className="lg:col-span-7 bg-slate-50 p-6 rounded-2xl border border-slate-200 shadow-sm space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-base font-bold text-slate-900">Classical vs QAOA Performance Bar Chart</h3>
                <p className="text-xs text-slate-500">Lower values indicate superior efficiency.</p>
              </div>
              <BarChart3 className="w-5 h-5 text-blue-900" />
            </div>

            <div className="h-72 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={comparisonChartData} margin={{ top: 10, right: 10, left: -20, bottom: 10 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                  <XAxis dataKey="metric" tick={{ fontSize: 11 }} />
                  <YAxis tick={{ fontSize: 11 }} />
                  <Tooltip contentStyle={{ fontSize: '12px', borderRadius: '8px' }} />
                  <Legend wrapperStyle={{ fontSize: '11px', paddingTop: '10px' }} />
                  <Bar dataKey="Classical" fill="#1e3a8a" radius={[4, 4, 0, 0]} />
                  <Bar dataKey="QAOA" fill="#06b6d4" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
