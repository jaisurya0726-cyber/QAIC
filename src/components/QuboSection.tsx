import React from 'react';
import { Atom, Grid } from 'lucide-react';
import { OptimizationResult } from '../types';

interface QuboSectionProps {
  result: OptimizationResult | null;
}

export const QuboSection: React.FC<QuboSectionProps> = ({ result }) => {
  const qubo = result?.qubo || {
    variablesCount: 16,
    termsCount: 120,
    matrixPreview: [
      [4.2, -1.5, 0.8, 0.0],
      [-1.5, 5.1, -2.1, 0.5],
      [0.8, -2.1, 6.4, -1.2],
      [0.0, 0.5, -1.2, 3.8]
    ],
    minEnergy: -42.8
  };

  const ising = result?.ising || {
    hamiltonianExpression: "H_C = 4.2 Z_0 Z_1 - 1.5 Z_0 Z_2 + 5.1 Z_1 Z_2 - 2.1 Z_2 Z_3",
    spinVariables: 16,
    groundStateEnergy: -51.2
  };

  return (
    <section id="qubo" className="py-20 bg-white border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-indigo-50 border border-indigo-200 text-indigo-900 text-xs font-semibold mb-3">
            <Atom className="w-3.5 h-3.5 text-indigo-700" />
            <span>Steps 8 & 9: QUBO Formulation & Ising Hamiltonian</span>
          </div>
          <h2 className="text-3xl font-extrabold text-slate-900 tracking-tight">Quadratic Unconstrained Binary Optimisation (QUBO)</h2>
          <p className="text-slate-600 mt-2 text-sm">
            Converts launch window scheduling and rocket-payload pairing into binary decision variables and translates QUBO into an Ising Hamiltonian for quantum execution.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-5xl mx-auto">
          
          {/* QUBO Card */}
          <div className="bg-slate-50 p-6 rounded-2xl border border-slate-200 shadow-xs space-y-6">
            <div className="flex items-center justify-between border-b border-slate-200 pb-4">
              <div className="flex items-center space-x-2">
                <Grid className="w-5 h-5 text-blue-900" />
                <h3 className="text-base font-bold text-slate-900">QUBO Matrix Formulation</h3>
              </div>
              <span className="text-xs font-mono bg-blue-100 text-blue-900 px-2.5 py-1 rounded-full font-semibold">{qubo.variablesCount} Variables</span>
            </div>

            <p className="text-xs text-slate-600 leading-relaxed">
              QUBO converts the mission selection problem into binary variables x_i in {'{0, 1}'} and a quadratic objective function: <br />
              <code className="text-blue-900 font-bold">Min E(x) = x^T Q x</code>
            </p>

            <div>
              <div className="text-xs font-bold text-slate-700 mb-2">QUBO Q-Matrix Preview (4x4 submatrix):</div>
              <div className="bg-slate-950 text-cyan-400 p-4 rounded-xl font-mono text-xs overflow-x-auto">
                {qubo.matrixPreview.map((row, i) => (
                  <div key={i} className="flex space-x-4">
                    {row.map((val, j) => (
                      <span key={j} className="w-16 text-right">{val.toFixed(1)}</span>
                    ))}
                  </div>
                ))}
              </div>
            </div>

            <div className="text-xs text-slate-500 font-mono">
              Total Quadratic Terms: {qubo.termsCount} | Min Energy Ground State: {qubo.minEnergy}
            </div>
          </div>

          {/* Ising Hamiltonian Card */}
          <div className="bg-slate-50 p-6 rounded-2xl border border-slate-200 shadow-xs space-y-6">
            <div className="flex items-center justify-between border-b border-slate-200 pb-4">
              <div className="flex items-center space-x-2">
                <Atom className="w-5 h-5 text-indigo-800" />
                <h3 className="text-base font-bold text-slate-900">Ising Hamiltonian Conversion</h3>
              </div>
              <span className="text-xs font-mono bg-indigo-100 text-indigo-900 px-2.5 py-1 rounded-full font-semibold">Pauli-Z Mapping</span>
            </div>

            <p className="text-xs text-slate-600 leading-relaxed">
              Mapped via variable substitution x_i = (1 - z_i)/2 where z_i in {'{-1, +1}'} represent spin variables on quantum qubits.
            </p>

            <div>
              <div className="text-xs font-bold text-slate-700 mb-2">Cost Hamiltonian Expression:</div>
              <div className="bg-slate-950 text-emerald-400 p-4 rounded-xl font-mono text-xs overflow-x-auto">
                {ising.hamiltonianExpression}
              </div>
            </div>

            <div className="p-3 bg-white rounded-xl border border-slate-200 text-xs font-mono text-slate-700 space-y-1">
              <div>Spin Variables: {ising.spinVariables} qubits</div>
              <div>Ground State Energy: <span className="font-bold text-indigo-900">{ising.groundStateEnergy}</span></div>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
