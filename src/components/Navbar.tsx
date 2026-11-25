import React, { useState } from 'react';
import { Rocket, Atom, Database, Cpu, BarChart3, Sliders, PlayCircle, ShieldCheck, FileText, Menu, X, Orbit } from 'lucide-react';

export const Navbar: React.FC = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems = [
    { label: 'Overview', href: '#intro', icon: Rocket },
    { label: 'Workflow', href: '#workflow', icon: Orbit },
    { label: 'Datasets', href: '#datasets', icon: Database },
    { label: 'Code Workspace', href: '#workspace', icon: Cpu },
    { label: 'Parameters', href: '#parameters', icon: Sliders },
    { label: 'Trajectory', href: '#trajectory', icon: PlayCircle },
    { label: 'Classical', href: '#classical', icon: BarChart3 },
    { label: 'QUBO & Ising', href: '#qubo', icon: Atom },
    { label: 'QAOA Quantum', href: '#qaoa', icon: Atom },
    { label: 'Validation', href: '#validation', icon: ShieldCheck },
    { label: 'Comparison', href: '#comparison', icon: BarChart3 },
    { label: 'Mission Plan', href: '#mission-plan', icon: FileText }
  ];

  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-slate-200 shadow-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-blue-900 via-indigo-800 to-cyan-600 flex items-center justify-center text-white shadow-md">
              <Atom className="w-6 h-6 animate-pulse" />
            </div>
            <div>
              <span className="font-bold text-slate-900 text-sm sm:text-base tracking-tight">Launch Trajectory & Mission Optimisation</span>
            </div>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-1 overflow-x-auto max-w-xl xl:max-w-3xl scrollbar-none shrink-0 py-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              return (
                <a
                  key={item.href}
                  href={item.href}
                  className="flex items-center space-x-1.5 px-3 py-2 rounded-lg text-xs font-medium text-slate-600 hover:text-blue-900 hover:bg-slate-50 transition-colors"
                >
                  <Icon className="w-3.5 h-3.5 text-slate-500" />
                  <span>{item.label}</span>
                </a>
              );
            })}
          </nav>

          {/* Mobile menu button */}
          <div className="xl:hidden flex items-center">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg text-slate-600 hover:text-slate-900 hover:bg-slate-100 focus:outline-none"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu dropdown */}
      {mobileMenuOpen && (
        <div className="xl:hidden bg-white border-b border-slate-200 px-4 pt-2 pb-4 space-y-1 shadow-lg max-h-[80vh] overflow-y-auto">
          {navItems.map((item) => {
            const Icon = item.icon;
            return (
              <a
                key={item.href}
                href={item.href}
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center space-x-2 px-3 py-2.5 rounded-lg text-sm font-medium text-slate-700 hover:text-blue-900 hover:bg-slate-50"
              >
                <Icon className="w-4 h-4 text-blue-800" />
                <span>{item.label}</span>
              </a>
            );
          })}
        </div>
      )}
    </header>
  );
};
