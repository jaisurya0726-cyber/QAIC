import React from 'react';
import { Atom, Rocket, Cpu, ShieldCheck } from 'lucide-react';

export const AboutSection: React.FC = () => {
  return (
    <footer className="bg-slate-950 text-slate-400 py-16 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="space-y-4 md:col-span-2">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-blue-900 via-indigo-800 to-cyan-600 flex items-center justify-center text-white shadow-md">
                <Atom className="w-6 h-6 animate-pulse" />
              </div>
              <span className="font-bold text-white text-lg tracking-tight">QuantumSpace Launch Optimiser</span>
            </div>
            <p className="text-xs text-slate-400 leading-relaxed max-w-md">
              A professional aerospace mission-planning platform integrating classical optimization algorithms with Qiskit QAOA quantum computing for launch trajectory scheduling, fuel minimization, and orbital insertion.
            </p>
          </div>

          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-white">Quantum Stack</h4>
            <ul className="space-y-2 text-xs">
              <li>Qiskit Aer Simulator</li>
              <li>QAOA (Quantum Approximate Opt)</li>
              <li>QUBO & Ising Hamiltonian</li>
              <li>SciPy SLSQP Classical Solver</li>
            </ul>
          </div>

          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-white">Aerospace Technologies</h4>
            <ul className="space-y-2 text-xs">
              <li>Tsiolkovsky Rocket Physics</li>
              <li>Atmospheric Gravity Turn</li>
              <li>Orbital Mechanics & LEO/GTO</li>
              <li>FAA Range Safety Constraints</li>
            </ul>
          </div>
        </div>

        <div className="pt-8 border-t border-slate-900 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500">
          <div>&copy; {new Date().getFullYear()} QuantumSpace Mission Planning Systems. All rights reserved.</div>
          <div className="mt-4 sm:mt-0 flex space-x-6">
            <a href="#intro" className="hover:text-cyan-400 transition-colors">Back to Top</a>
            <a href="#workflow" className="hover:text-cyan-400 transition-colors">Workflow Pipeline</a>
            <a href="#workspace" className="hover:text-cyan-400 transition-colors">Code Workspace</a>
          </div>
        </div>

      </div>
    </footer>
  );
};
