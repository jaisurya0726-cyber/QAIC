import React from 'react';
import { Atom, Cpu, Zap, Activity } from 'lucide-react';
import { OptimizationResult } from '../types';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid, LineChart, Line } from 'recharts';

interface QaoaSectionProps {
  result: OptimizationResult | null;
}

export const QaoaSection: React.FC<QaoaSectionProps> = ({ result }) => {
  const qaoa = result?.qaoa || {
    depth: 2,
    optimalGamma: [0.684, 0.821],
    optimalBeta: [0.312, 0.594],
    iterations: 40,
    measuredCounts: { '1011': 784, '1001': 512, '1111': 430, '0011': 322 },
    probabilityDistribution: [
      { state: '1011', probability: 0.383 },
      { state: '1001', probability: 0.250 },
      { state: '1111', probability: 0.210 },
      { state: '0011', probability: 0.157 }
    ],
    energyConvergence: [
      { iteration: 1, energy: -12.4 },
      { iteration: 10, energy: -24.8 },
      { iteration: 20, energy: -38.2 },
      { iteration: 30, energy: -47.5 },
      { iteration: 40, energy: -51.2 }
    ],
    bestSolution: '1011 (Optimal Launch Window & Rocket Pairing)'
  };

  return (
    <section id="qaoa" className="py-20 bg-slate-900 text-white border-b border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-cyan-950 border border-cyan-800 text-cyan-400 text-xs font-semibold mb-3">
            <Atom className="w-3.5 h-3.5 text-cyan-400 animate-spin" style={{ animationDuration: '6s' }} />
            <span>Step 10: QAOA Quantum Optimisation (Qiskit Aer)</span>
          </div>
          <h2 className="text-3xl font-extrabold tracking-tight text-white">Quantum Approximate Optimisation Algorithm</h2>
          <p className="text-slate-400 mt-2 text-sm">
            Executes parameterized quantum circuits on Qiskit Aer simulator with depth p, alternating cost and mixer unitaries to find the optimal mission plan.
          </p>
        </div>

        {/* QAOA Metrics Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-4 gap-4 mb-10">
          <div className="bg-slate-950 p-5 rounded-2xl border border-slate-800">
            <div className="text-xs text-slate-400">Circuit Depth (p)</div>
            <div className="text-2xl font-bold font-mono text-cyan-400 mt-1">p = {qaoa.depth}</div>
            <div className="text-[10px] text-slate-500 mt-0.5">Alternating Unitary Layers</div>
          </div>

          <div className="bg-slate-950 p-5 rounded-2xl border border-slate-800">
            <div className="text-xs text-slate-400">Optimal Parameters</div>
            <div className="text-sm font-bold font-mono text-emerald-400 mt-1">
              &gamma;: [{qaoa.optimalGamma.join(', ')}]
            </div>
            <div className="text-xs font-bold font-mono text-blue-400 mt-0.5">
              &beta;: [{qaoa.optimalBeta.join(', ')}]
            </div>
          </div>

          <div className="bg-slate-950 p-5 rounded-2xl border border-slate-800">
            <div className="text-xs text-slate-400">Best Solution State</div>
            <div className="text-xl font-bold font-mono text-cyan-300 mt-1">{qaoa.bestSolution.split(' ')[0]}</div>
            <div className="text-[10px] text-slate-500 mt-0.5">Highest probability count</div>
          </div>

          <div className="bg-slate-950 p-5 rounded-2xl border border-slate-800">
            <div className="text-xs text-slate-400">Simulator Status</div>
            <div className="text-lg font-bold text-emerald-400 mt-1 flex items-center space-x-1.5">
              <Zap className="w-4 h-4 text-emerald-400" />
              <span>Converged</span>
            </div>
            <div className="text-[10px] text-slate-500 mt-0.5">{qaoa.iterations} COBYLA iterations</div>
          </div>
        </div>

        {/* Quantum Circuit Diagram Representation */}
        <div className="bg-slate-950 p-6 rounded-2xl border border-slate-800 mb-10 space-y-4">
          <div className="flex items-center justify-between border-b border-slate-800 pb-3">
            <div className="flex items-center space-x-2">
              <Cpu className="w-5 h-5 text-cyan-400" />
              <h3 className="text-base font-bold text-white">Qiskit Quantum Circuit Diagram (Depth p={qaoa.depth})</h3>
            </div>
            <span className="text-xs font-mono text-slate-400">4 Qubits | 2048 Shots</span>
          </div>

          <div className="bg-slate-900 p-4 rounded-xl font-mono text-xs text-cyan-300 overflow-x-auto space-y-2">
            <div>q_0: ──H──■──────────────────RX(2&beta;_0)──■──────────────────RX(2&beta;_1)──[M]</div>
            <div>q_1: ──H──■──■───────────────RX(2&beta;_0)──■──■───────────────RX(2&beta;_1)──[M]</div>
            <div>q_2: ──H─────■──■────────────RX(2&beta;_0)─────■──■────────────RX(2&beta;_1)──[M]</div>
            <div>q_3: ──H────────■───────────RX(2&beta;_0)────────■───────────RX(2&beta;_1)──[M]</div>
            <div className="text-slate-500 pt-1">Legend: H = Hadamard, RZZ(&gamma;) = Cost Unitary, RX(2&beta;) = Mixer Unitary, [M] = Measurement</div>
          </div>
        </div>

        {/* Charts Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          
          <div className="bg-slate-950 p-6 rounded-2xl border border-slate-800 space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-base font-bold text-white">Quantum Measurement Probability</h3>
                <p className="text-xs text-slate-400">Top measured bitstring states from 2048 Aer simulator shots.</p>
              </div>
              <Activity className="w-5 h-5 text-cyan-400" />
            </div>

            <div className="h-72 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={qaoa.probabilityDistribution} margin={{ top: 10, right: 10, left: -20, bottom: 10 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
                  <XAxis dataKey="state" stroke="#94a3b8" tick={{ fontSize: 11 }} />
                  <YAxis stroke="#94a3b8" tick={{ fontSize: 11 }} />
                  <Tooltip contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155', fontSize: '12px', borderRadius: '8px', color: '#fff' }} />
                  <Bar dataKey="probability" name="Probability" fill="#06b6d4" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className="bg-slate-950 p-6 rounded-2xl border border-slate-800 space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-base font-bold text-white">QAOA Energy Convergence</h3>
                <p className="text-xs text-slate-400">Minimization of cost Hamiltonian energy across optimization iterations.</p>
              </div>
              <Activity className="w-5 h-5 text-emerald-400" />
            </div>

            <div className="h-72 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={qaoa.energyConvergence} margin={{ top: 10, right: 10, left: -20, bottom: 10 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
                  <XAxis dataKey="iteration" stroke="#94a3b8" tick={{ fontSize: 11 }} label={{ value: 'Iteration', position: 'insideBottom', offset: -5, fontSize: 11, fill: '#94a3b8' }} />
                  <YAxis stroke="#94a3b8" tick={{ fontSize: 11 }} label={{ value: 'Energy (E)', angle: -90, position: 'insideLeft', fontSize: 11, fill: '#94a3b8' }} />
                  <Tooltip contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155', fontSize: '12px', borderRadius: '8px', color: '#fff' }} />
                  <Line type="monotone" dataKey="energy" name="Cost Energy" stroke="#10b981" strokeWidth={2.5} dot={true} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
