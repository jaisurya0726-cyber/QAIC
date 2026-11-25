import React, { useState } from 'react';
import { Sliders, Rocket, Shield, Play, RotateCcw, CheckCircle2, Cpu, BarChart3, Atom, FileText } from 'lucide-react';
import { mockRockets, mockPayloads, mockLaunchWindows } from '../data/mockData';
import { MissionParameters, OptimizationResult } from '../types';

interface MissionParametersProps {
  onOptimize: (results: OptimizationResult, params: MissionParameters) => void;
  optimizationResult?: OptimizationResult | null;
}

export const MissionParametersPanel: React.FC<MissionParametersProps> = ({ onOptimize, optimizationResult }) => {
  const [params, setParams] = useState<MissionParameters>({
    rocketId: mockRockets[0].id,
    payloadId: mockPayloads[0].id,
    launchSite: mockLaunchWindows[0].site,
    launchDate: mockLaunchWindows[0].date,
    targetOrbit: 'LEO',
    initialAltitude: 0,
    targetAltitude: 550,
    initialVelocity: 0.1,
    targetVelocity: 7.82,
    inclination: 28.5,
    fuelWeight: 0.4,
    costWeight: 0.3,
    riskWeight: 0.2,
    delayWeight: 0.1,
    maxBudget: 150.0,
    qaoaDepth: 2,
    qaoaIterations: 40
  });

  const [isOptimizing, setIsOptimizing] = useState(false);
  const [successMessage, setSuccessMessage] = useState(false);
  const [outputTab, setOutputTab] = useState<'summary' | 'classical' | 'qubo' | 'qaoa' | 'validation'>('summary');

  const handleChange = (field: keyof MissionParameters, value: any) => {
    setParams(prev => ({ ...prev, [field]: value }));
  };

  const handleReset = () => {
    setParams({
      rocketId: mockRockets[0].id,
      payloadId: mockPayloads[0].id,
      launchSite: mockLaunchWindows[0].site,
      launchDate: mockLaunchWindows[0].date,
      targetOrbit: 'LEO',
      initialAltitude: 0,
      targetAltitude: 550,
      initialVelocity: 0.1,
      targetVelocity: 7.82,
      inclination: 28.5,
      fuelWeight: 0.4,
      costWeight: 0.3,
      riskWeight: 0.2,
      delayWeight: 0.1,
      maxBudget: 150.0,
      qaoaDepth: 2,
      qaoaIterations: 40
    });
    setSuccessMessage(false);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsOptimizing(true);
    setSuccessMessage(false);

    try {
      const res = await fetch('/api/optimize', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ params })
      });
      const data = await res.json();
      if (data.success) {
        onOptimize(data.result, params);
        setSuccessMessage(true);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setIsOptimizing(false);
    }
  };

  const selectedRocket = mockRockets.find(r => r.id === params.rocketId) || mockRockets[0];
  const selectedPayload = mockPayloads.find(p => p.id === params.payloadId) || mockPayloads[0];

  return (
    <section id="parameters" className="py-20 bg-slate-50 border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-blue-50 border border-blue-200 text-blue-900 text-xs font-semibold mb-3">
            <Sliders className="w-3.5 h-3.5 text-blue-700" />
            <span>Step 5: Mission Parameter Configuration</span>
          </div>
          <h2 className="text-3xl font-extrabold text-slate-900 tracking-tight">Configure Mission Parameters</h2>
          <p className="text-slate-600 mt-2 text-sm">
            Select your aerospace vehicle, satellite payload, launch window, trajectory physics, and quantum optimization weights.
          </p>
        </div>

        {successMessage && (
          <div className="max-w-4xl mx-auto mb-8 p-4 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-900 flex items-center space-x-3 shadow-sm animate-fade-in">
            <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
            <span className="text-xs sm:text-sm font-semibold">Mission parameters validated and optimized successfully! Output window generated below.</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="max-w-4xl mx-auto bg-white rounded-2xl border border-slate-200 shadow-sm p-6 sm:p-8 space-y-8 mb-12">
          
          {/* Rocket & Payload Selection */}
          <div className="space-y-4">
            <h3 className="text-base font-bold text-slate-900 flex items-center space-x-2 border-b border-slate-100 pb-2">
              <Rocket className="w-4 h-4 text-blue-900" />
              <span>Vehicle & Payload Configuration</span>
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Select Launch Vehicle</label>
                <select
                  value={params.rocketId}
                  onChange={(e) => handleChange('rocketId', e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-xs text-slate-800 bg-white focus:outline-none focus:border-blue-900 font-medium"
                >
                  {mockRockets.map(r => (
                    <option key={r.id} value={r.id}>{r.name} ({r.agency} - Payload: {r.payloadCapacity}kg)</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Select Satellite Payload</label>
                <select
                  value={params.payloadId}
                  onChange={(e) => handleChange('payloadId', e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-xs text-slate-800 bg-white focus:outline-none focus:border-blue-900 font-medium"
                >
                  {mockPayloads.map(p => (
                    <option key={p.id} value={p.id}>{p.satelliteName} ({p.targetOrbit} - {p.mass}kg)</option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          {/* Launch & Trajectory Parameters */}
          <div className="space-y-4">
            <h3 className="text-base font-bold text-slate-900 flex items-center space-x-2 border-b border-slate-100 pb-2">
              <Shield className="w-4 h-4 text-indigo-700" />
              <span>Launch Site & Orbital Trajectory</span>
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Launch Site</label>
                <select
                  value={params.launchSite}
                  onChange={(e) => handleChange('launchSite', e.target.value)}
                  className="w-full px-3 py-2 rounded-xl border border-slate-300 text-xs text-slate-800 bg-white focus:outline-none focus:border-blue-900"
                >
                  {mockLaunchWindows.map(w => (
                    <option key={w.id} value={w.site}>{w.site}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Target Orbit</label>
                <select
                  value={params.targetOrbit}
                  onChange={(e) => handleChange('targetOrbit', e.target.value)}
                  className="w-full px-3 py-2 rounded-xl border border-slate-300 text-xs text-slate-800 bg-white focus:outline-none focus:border-blue-900"
                >
                  <option value="LEO">LEO (550 km SSO)</option>
                  <option value="MEO">MEO (20,200 km GPS)</option>
                  <option value="GTO">GTO / GEO (35,786 km)</option>
                  <option value="Lunar">Lunar NRHO</option>
                  <option value="Martian">Martian Transfer Orbit</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Target Altitude (km)</label>
                <input
                  type="number"
                  value={params.targetAltitude}
                  onChange={(e) => handleChange('targetAltitude', Number(e.target.value))}
                  className="w-full px-3 py-2 rounded-xl border border-slate-300 text-xs text-slate-800 bg-white focus:outline-none focus:border-blue-900 font-mono"
                />
              </div>
            </div>
          </div>

          {/* Optimization Weights & QAOA Parameters */}
          <div className="space-y-4">
            <h3 className="text-base font-bold text-slate-900 flex items-center space-x-2 border-b border-slate-100 pb-2">
              <Sliders className="w-4 h-4 text-cyan-700" />
              <span>Objective Weights & QAOA Configuration</span>
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Fuel Weight: {params.fuelWeight}</label>
                <input
                  type="range"
                  min="0.1"
                  max="1.0"
                  step="0.05"
                  value={params.fuelWeight}
                  onChange={(e) => handleChange('fuelWeight', Number(e.target.value))}
                  className="w-full accent-blue-900"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Cost Weight: {params.costWeight}</label>
                <input
                  type="range"
                  min="0.1"
                  max="1.0"
                  step="0.05"
                  value={params.costWeight}
                  onChange={(e) => handleChange('costWeight', Number(e.target.value))}
                  className="w-full accent-blue-900"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">QAOA Circuit Depth (p): {params.qaoaDepth}</label>
                <select
                  value={params.qaoaDepth}
                  onChange={(e) => handleChange('qaoaDepth', Number(e.target.value))}
                  className="w-full px-3 py-2 rounded-xl border border-slate-300 text-xs text-slate-800 bg-white focus:outline-none focus:border-blue-900 font-mono"
                >
                  <option value={1}>p = 1 (Low Depth)</option>
                  <option value={2}>p = 2 (Standard)</option>
                  <option value={3}>p = 3 (High Accuracy)</option>
                  <option value={4}>p = 4 (Maximum Precision)</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">QAOA Iterations: {params.qaoaIterations}</label>
                <input
                  type="number"
                  value={params.qaoaIterations}
                  onChange={(e) => handleChange('qaoaIterations', Number(e.target.value))}
                  className="w-full px-3 py-2 rounded-xl border border-slate-300 text-xs text-slate-800 bg-white focus:outline-none focus:border-blue-900 font-mono"
                />
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center justify-end space-x-4 pt-4 border-t border-slate-100">
            <button
              type="button"
              onClick={handleReset}
              className="px-5 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold flex items-center space-x-1.5 transition-colors"
            >
              <RotateCcw className="w-4 h-4" />
              <span>Reset Defaults</span>
            </button>

            <button
              type="submit"
              disabled={isOptimizing}
              className="px-8 py-3 rounded-xl bg-blue-900 hover:bg-blue-800 text-white text-xs font-bold uppercase tracking-wider flex items-center space-x-2 shadow-md transition-all disabled:opacity-50"
            >
              {isOptimizing ? (
                <>
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  <span>Running QAOA Optimization...</span>
                </>
              ) : (
                <>
                  <Play className="w-4 h-4 fill-white" />
                  <span>Generate Trajectory & Run QAOA</span>
                </>
              )}
            </button>
          </div>

        </form>

        {/* Dedicated Output Window (Appears after hitting Generate Trajectory & Run QAOA) */}
        {optimizationResult && (
          <div className="max-w-4xl mx-auto bg-slate-900 text-white rounded-2xl border border-slate-800 shadow-2xl p-6 sm:p-8 space-y-6 animate-fade-in">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between border-b border-slate-800 pb-4 gap-4">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 rounded-xl bg-cyan-600 flex items-center justify-center text-slate-950 font-bold">
                  <Cpu className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-white">Mission Optimization Output Window</h3>
                  <p className="text-xs text-slate-400">Results generated for {selectedRocket.name} + {selectedPayload.satelliteName}</p>
                </div>
              </div>

              <div className="flex flex-wrap gap-2">
                <button
                  onClick={() => setOutputTab('summary')}
                  className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${outputTab === 'summary' ? 'bg-cyan-500 text-slate-950' : 'bg-slate-800 text-slate-300 hover:bg-slate-700'}`}
                >
                  Summary
                </button>
                <button
                  onClick={() => setOutputTab('classical')}
                  className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${outputTab === 'classical' ? 'bg-cyan-500 text-slate-950' : 'bg-slate-800 text-slate-300 hover:bg-slate-700'}`}
                >
                  Classical
                </button>
                <button
                  onClick={() => setOutputTab('qubo')}
                  className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${outputTab === 'qubo' ? 'bg-cyan-500 text-slate-950' : 'bg-slate-800 text-slate-300 hover:bg-slate-700'}`}
                >
                  QUBO & Ising
                </button>
                <button
                  onClick={() => setOutputTab('qaoa')}
                  className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${outputTab === 'qaoa' ? 'bg-cyan-500 text-slate-950' : 'bg-slate-800 text-slate-300 hover:bg-slate-700'}`}
                >
                  QAOA Result
                </button>
                <button
                  onClick={() => setOutputTab('validation')}
                  className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${outputTab === 'validation' ? 'bg-cyan-500 text-slate-950' : 'bg-slate-800 text-slate-300 hover:bg-slate-700'}`}
                >
                  Validation
                </button>
              </div>
            </div>

            {outputTab === 'summary' && (
              <div className="space-y-4 text-xs sm:text-sm">
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                  <div className="bg-slate-950 p-4 rounded-xl border border-slate-800">
                    <div className="text-slate-400 text-xs">Optimized Fuel</div>
                    <div className="text-xl font-bold font-mono text-cyan-300 mt-1">{optimizationResult.qaoa.fuelUsed} tons</div>
                  </div>
                  <div className="bg-slate-950 p-4 rounded-xl border border-slate-800">
                    <div className="text-slate-400 text-xs">Launch Cost</div>
                    <div className="text-xl font-bold font-mono text-emerald-300 mt-1">${optimizationResult.qaoa.cost}M</div>
                  </div>
                  <div className="bg-slate-950 p-4 rounded-xl border border-slate-800">
                    <div className="text-slate-400 text-xs">Mission Risk</div>
                    <div className="text-xl font-bold font-mono text-amber-300 mt-1">{optimizationResult.qaoa.risk}%</div>
                  </div>
                  <div className="bg-slate-950 p-4 rounded-xl border border-slate-800">
                    <div className="text-slate-400 text-xs">Status</div>
                    <div className="text-lg font-bold text-emerald-400 mt-1">PASSED</div>
                  </div>
                </div>

                <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 space-y-2 font-mono text-xs">
                  <div className="text-cyan-400 font-bold">Selected Optimal Mission Plan:</div>
                  <div>Vehicle: {selectedRocket.name}</div>
                  <div>Payload: {selectedPayload.satelliteName} ({selectedPayload.mass} kg)</div>
                  <div>Launch Site: {params.launchSite}</div>
                  <div>Target Orbit: {params.targetOrbit} ({params.targetAltitude} km)</div>
                  <div>Best Solution State: {optimizationResult.qaoa.bestSolution}</div>
                </div>
              </div>
            )}

            {outputTab === 'classical' && (
              <div className="space-y-3 font-mono text-xs bg-slate-950 p-4 rounded-xl border border-slate-800">
                <div className="text-cyan-400 font-bold">Classical Optimization Baseline (SciPy SLSQP):</div>
                <div>Objective Value: {optimizationResult.classical.objectiveValue}</div>
                <div>Fuel Consumption: {optimizationResult.classical.fuelUsed} tons</div>
                <div>Estimated Cost: ${optimizationResult.classical.cost}M</div>
                <div>Execution Time: {optimizationResult.classical.executionTime} ms</div>
                <div>Iterations: {optimizationResult.classical.iterations}</div>
                <div>Status: {optimizationResult.classical.status}</div>
              </div>
            )}

            {outputTab === 'qubo' && (
              <div className="space-y-3 font-mono text-xs bg-slate-950 p-4 rounded-xl border border-slate-800">
                <div className="text-cyan-400 font-bold">QUBO Formulation & Ising Hamiltonian:</div>
                <div>Variables Count: {optimizationResult.qubo.variablesCount}</div>
                <div>Quadratic Terms: {optimizationResult.qubo.termsCount}</div>
                <div>Min Ground State Energy: {optimizationResult.qubo.minEnergy}</div>
                <div className="text-emerald-400 pt-2">Hamiltonian Expression:</div>
                <div>{optimizationResult.ising.hamiltonianExpression}</div>
              </div>
            )}

            {outputTab === 'qaoa' && (
              <div className="space-y-3 font-mono text-xs bg-slate-950 p-4 rounded-xl border border-slate-800">
                <div className="text-cyan-400 font-bold">QAOA Quantum Optimization (Qiskit Aer):</div>
                <div>Circuit Depth (p): {optimizationResult.qaoa.depth}</div>
                <div>Optimal Gamma: [{optimizationResult.qaoa.optimalGamma.join(', ')}]</div>
                <div>Optimal Beta: [{optimizationResult.qaoa.optimalBeta.join(', ')}]</div>
                <div>Quantum Speedup Factor: {optimizationResult.qaoa.quantumSpeedupFactor}x</div>
              </div>
            )}

            {outputTab === 'validation' && (
              <div className="space-y-3 font-mono text-xs bg-slate-950 p-4 rounded-xl border border-slate-800">
                <div className="text-cyan-400 font-bold">Trajectory & Safety Validation:</div>
                <div>Fuel Feasibility: {optimizationResult.validation.fuelFeasible ? 'PASSED' : 'FAILED'}</div>
                <div>Payload Capacity: {optimizationResult.validation.payloadFeasible ? 'PASSED' : 'FAILED'}</div>
                <div>Target Orbit Mechanics: {optimizationResult.validation.orbitFeasible ? 'PASSED' : 'FAILED'}</div>
                <div>Launch Window Safety: {optimizationResult.validation.launchWindowValid ? 'PASSED' : 'FAILED'}</div>
                <div>Overall Status: <span className="text-emerald-400 font-bold">{optimizationResult.validation.overallStatus}</span></div>
              </div>
            )}

          </div>
        )}

      </div>
    </section>
  );
};
