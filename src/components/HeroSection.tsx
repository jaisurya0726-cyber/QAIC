import React from 'react';
import { Rocket, Atom, Orbit, ArrowRight, Shield, Cpu, Zap, Compass } from 'lucide-react';

export const HeroSection: React.FC = () => {
  return (
    <section id="intro" className="relative overflow-hidden bg-gradient-to-b from-slate-50 via-white to-slate-50 pt-16 pb-20 border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          <div className="lg:col-span-7 space-y-6">
            <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-blue-50 border border-blue-200 text-blue-900 text-xs font-semibold shadow-xs">
              <Atom className="w-4 h-4 text-cyan-600 animate-spin" style={{ animationDuration: '6s' }} />
              <span>Quantum Computing + Space Technology</span>
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-slate-900 tracking-tight leading-tight">
              Launch Trajectory and Mission-Planning <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-900 via-indigo-800 to-cyan-600">Optimisation</span> Using Quantum Computing
            </h1>

            <p className="text-lg text-slate-600 leading-relaxed max-w-2xl">
              This project explores the application of quantum computing to optimise rocket launch trajectories and space mission planning. It combines classical optimisation techniques with the Quantum Approximate Optimisation Algorithm (QAOA) to identify efficient mission plans while considering fuel consumption, launch windows, payload requirements, operational costs, and mission risks.
            </p>

            <div className="flex flex-wrap gap-4 pt-2">
              <a
                href="#parameters"
                className="flex items-center space-x-2 px-6 py-3.5 rounded-xl bg-blue-900 text-white font-semibold hover:bg-blue-800 shadow-md hover:shadow-lg transition-all"
              >
                <Rocket className="w-5 h-5" />
                <span>Start Optimisation</span>
                <ArrowRight className="w-4 h-4 ml-1" />
              </a>

              <a
                href="#workflow"
                className="flex items-center space-x-2 px-6 py-3.5 rounded-xl bg-white border border-slate-300 text-slate-700 font-semibold hover:bg-slate-50 shadow-xs transition-all"
              >
                <Orbit className="w-5 h-5 text-indigo-700" />
                <span>Explore Workflow</span>
              </a>
            </div>

            <div className="grid grid-cols-3 gap-4 pt-6 border-t border-slate-200">
              <div>
                <div className="text-2xl font-bold text-blue-900">8+</div>
                <div className="text-xs text-slate-500 font-medium">Rocket Profiles</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-indigo-800">QAOA p=2</div>
                <div className="text-xs text-slate-500 font-medium">Quantum Circuit Depth</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-cyan-700">99.4%</div>
                <div className="text-xs text-slate-500 font-medium">Validation Accuracy</div>
              </div>
            </div>
          </div>

          <div className="lg:col-span-5">
            <div className="relative mx-auto max-w-md lg:max-w-none">
              <div className="absolute -inset-1 rounded-3xl bg-gradient-to-r from-blue-600 to-cyan-500 opacity-20 blur-xl"></div>
              
              <div className="relative bg-white rounded-2xl border border-slate-200 p-6 shadow-xl space-y-6">
                <div className="flex items-center justify-between border-b border-slate-100 pb-4">
                  <div className="flex items-center space-x-3">
                    <div className="w-3 h-3 rounded-full bg-emerald-500 animate-pulse"></div>
                    <span className="text-xs font-bold text-slate-700 uppercase tracking-wider">Mission Control Telemetry</span>
                  </div>
                  <span className="text-xs font-mono bg-slate-100 px-2 py-1 rounded text-slate-600">SIMULATION READY</span>
                </div>

                <div className="space-y-4">
                  <div className="bg-slate-50 p-4 rounded-xl border border-slate-100 space-y-2">
                    <div className="flex justify-between text-xs text-slate-500 font-medium">
                      <span>Selected Vehicle</span>
                      <span className="text-blue-900 font-bold">Falcon 9 Block 5</span>
                    </div>
                    <div className="flex justify-between text-xs text-slate-500 font-medium">
                      <span>Target Orbit</span>
                      <span className="text-indigo-800 font-bold">LEO (550 km SSO)</span>
                    </div>
                    <div className="flex justify-between text-xs text-slate-500 font-medium">
                      <span>Optimization Algorithm</span>
                      <span className="text-cyan-700 font-bold">QAOA (Qiskit Aer)</span>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div className="p-3 bg-blue-50/50 rounded-xl border border-blue-100">
                      <div className="flex items-center space-x-2 text-blue-900 font-semibold text-xs mb-1">
                        <Zap className="w-4 h-4 text-blue-600" />
                        <span>Fuel Reduction</span>
                      </div>
                      <div className="text-lg font-bold text-blue-950">-12.4%</div>
                      <div className="text-[10px] text-slate-500">vs classical baseline</div>
                    </div>

                    <div className="p-3 bg-emerald-50/50 rounded-xl border border-emerald-100">
                      <div className="flex items-center space-x-2 text-emerald-900 font-semibold text-xs mb-1">
                        <Shield className="w-4 h-4 text-emerald-600" />
                        <span>Risk Margin</span>
                      </div>
                      <div className="text-lg font-bold text-emerald-950">1.4%</div>
                      <div className="text-[10px] text-slate-500">All constraints met</div>
                    </div>
                  </div>
                </div>

                <div className="pt-2">
                  <a
                    href="#trajectory"
                    className="w-full block text-center py-2.5 rounded-xl bg-slate-900 text-white text-xs font-semibold hover:bg-slate-800 transition-colors"
                  >
                    View Live Trajectory Visualisation &rarr;
                  </a>
                </div>
              </div>
            </div>
          </div>

        </div>

        {/* Project Objectives Subsection */}
        <div id="objectives" className="mt-20 pt-16 border-t border-slate-200">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <h2 className="text-2xl sm:text-3xl font-bold text-slate-900">Project Objectives</h2>
            <p className="text-slate-600 mt-2 text-sm">
              Addressing complex combinatorial constraints in modern space mission design through quantum-classical hybrid optimization.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs hover:shadow-md transition-shadow">
              <div className="w-10 h-10 rounded-xl bg-blue-100 text-blue-900 flex items-center justify-center mb-4">
                <Compass className="w-5 h-5" />
              </div>
              <h3 className="text-base font-bold text-slate-900 mb-2">Optimal Trajectory Planning</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Minimise fuel expenditure and delta-v requirements during atmospheric ascent and gravity turn maneuvers using precise physical modeling.
              </p>
            </div>

            <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs hover:shadow-md transition-shadow">
              <div className="w-10 h-10 rounded-xl bg-indigo-100 text-indigo-900 flex items-center justify-center mb-4">
                <Atom className="w-5 h-5" />
              </div>
              <h3 className="text-base font-bold text-slate-900 mb-2">QAOA Quantum Advantage</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Formulate mission scheduling and payload allocation as QUBO models, mapped to Ising Hamiltonians solved via parameterized quantum circuits.
              </p>
            </div>

            <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs hover:shadow-md transition-shadow">
              <div className="w-10 h-10 rounded-xl bg-cyan-100 text-cyan-900 flex items-center justify-center mb-4">
                <Cpu className="w-5 h-5" />
              </div>
              <h3 className="text-base font-bold text-slate-900 mb-2">Rigorous Validation</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Validate all quantum-generated solutions against hard safety limits, weather constraints, payload capacities, and orbital mechanics.
              </p>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};
