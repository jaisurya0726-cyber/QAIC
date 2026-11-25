import React from 'react';
import { BarChart3, CheckCircle, Clock, Zap } from 'lucide-react';
import { OptimizationResult } from '../types';

interface ClassicalOptSectionProps {
  result: OptimizationResult | null;
}

export const ClassicalOptSection: React.FC<ClassicalOptSectionProps> = ({ result }) => {
  const classical = result?.classical || {
    objectiveValue: 124.5,
    fuelUsed: 420.5,
    cost: 110.0,
    risk: 2.4,
    executionTime: 342,
    iterations: 48,
    status: 'Converged'
  };

  return (
    <section id="classical" className="py-20 bg-slate-50 border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-blue-50 border border-blue-200 text-blue-900 text-xs font-semibold mb-3">
            <BarChart3 className="w-3.5 h-3.5 text-blue-700" />
            <span>Step 7: Classical Optimisation Baseline</span>
          </div>
          <h2 className="text-3xl font-extrabold text-slate-900 tracking-tight">SciPy SLSQP Classical Optimisation</h2>
          <p className="text-slate-600 mt-2 text-sm">
            Establishes the classical performance baseline using gradient-based sequential least squares programming to minimise fuel consumption and operational costs.
          </p>
        </div>

        <div className="max-w-4xl mx-auto bg-white rounded-2xl border border-slate-200 shadow-sm p-6 sm:p-8 space-y-8">
          
          <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
            <div className="p-4 bg-slate-50 rounded-xl border border-slate-200">
              <div className="text-xs text-slate-500 font-medium">Objective Value</div>
              <div className="text-2xl font-bold font-mono text-blue-900 mt-1">{classical.objectiveValue}</div>
              <div className="text-[10px] text-slate-500 mt-0.5">Weighted Cost Function</div>
            </div>

            <div className="p-4 bg-slate-50 rounded-xl border border-slate-200">
              <div className="text-xs text-slate-500 font-medium">Fuel Consumption</div>
              <div className="text-2xl font-bold font-mono text-slate-900 mt-1">{classical.fuelUsed} t</div>
              <div className="text-[10px] text-slate-500 mt-0.5">Tsiolkovsky integrated</div>
            </div>

            <div className="p-4 bg-slate-50 rounded-xl border border-slate-200">
              <div className="text-xs text-slate-500 font-medium">Execution Time</div>
              <div className="text-2xl font-bold font-mono text-indigo-800 mt-1">{classical.executionTime} ms</div>
              <div className="text-[10px] text-slate-500 mt-0.5">SciPy SLSQP solver</div>
            </div>

            <div className="p-4 bg-slate-50 rounded-xl border border-slate-200">
              <div className="text-xs text-slate-500 font-medium">Solver Status</div>
              <div className="text-lg font-bold text-emerald-700 mt-1 flex items-center space-x-1.5">
                <CheckCircle className="w-4 h-4 text-emerald-600" />
                <span>{classical.status}</span>
              </div>
              <div className="text-[10px] text-slate-500 mt-0.5">{classical.iterations} iterations completed</div>
            </div>
          </div>

          <div className="space-y-4 pt-4 border-t border-slate-100">
            <h3 className="text-base font-bold text-slate-900">Mathematical Formulation & Constraints</h3>
            <div className="bg-slate-900 text-white p-6 rounded-2xl font-mono text-xs space-y-2">
              <div className="text-cyan-400"># Objective Function: Minimize f(x) = w_f * Fuel(x) + w_c * Cost(x) + w_r * Risk(x)</div>
              <div>Min f(x) = 0.4 * (Fuel / 1000) + 0.4 * (Cost / 150) + 0.2 * (Risk / 5.0)</div>
              <div className="text-amber-300 pt-2"># Constraints:</div>
              <div>1. Payload Capacity &le; Vehicle Max Payload (65,000 kg)</div>
              <div>2. Total Fuel Consumption &le; Available Fuel Mass (505,700 kg)</div>
              <div>3. Orbital Inclination &isin; [0°, 98.2°]</div>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
