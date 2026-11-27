import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { HeroSection } from './components/HeroSection';
import { WorkflowSection } from './components/WorkflowSection';
import { DatasetSection } from './components/DatasetSection';
import { PreprocessingSection } from './components/PreprocessingSection';
import { CodeWorkspace } from './components/CodeWorkspace';
import { MissionParametersPanel } from './components/MissionParameters';
import { LiveRocketSimulation } from './components/LiveRocketSimulation';
import { ClassicalOptSection } from './components/ClassicalOptSection';
import { QuboSection } from './components/QuboSection';
import { QaoaSection } from './components/QaoaSection';
import { MeasurementSection } from './components/MeasurementSection';
import { ValidationSection } from './components/ValidationSection';
import { ComparisonSection } from './components/ComparisonSection';
import { FinalPlanSection } from './components/FinalPlanSection';
import { WeatherSection } from './components/WeatherSection';
import { RiskSection } from './components/RiskSection';
import { ScenarioSection } from './components/ScenarioSection';
import { SensitivitySection } from './components/SensitivitySection';
import { HistoryReportSection } from './components/HistoryReportSection';
import { AboutSection } from './components/AboutSection';
import { ScrollProgressBar } from './components/ScrollProgressBar';
import { OptimizationResult, MissionParameters } from './types';
import { Command, X } from 'lucide-react';

export default function App() {
  const [optimizationResult, setOptimizationResult] = useState<OptimizationResult | null>(null);
  const [missionParams, setMissionParams] = useState<MissionParameters | null>(null);
  const [showShortcutToast, setShowShortcutToast] = useState(true);
  const [lastActionToast, setLastActionToast] = useState<string | null>(null);

  const handleOptimize = (result: OptimizationResult, params: MissionParameters) => {
    setOptimizationResult(result);
    setMissionParams(params);
  };

  // Global Keyboard Shortcut Manager
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && !e.altKey && !e.shiftKey) {
        if (e.key.toLowerCase() === 'o') {
          e.preventDefault();
          const elem = document.getElementById('parameters');
          if (elem) elem.scrollIntoView({ behavior: 'smooth' });
          setLastActionToast('Keyboard Shortcut: Jumped to Parameters & Optimize (Ctrl+O)');
          setTimeout(() => setLastActionToast(null), 3500);
        } else if (e.key.toLowerCase() === 'p') {
          e.preventDefault();
          const elem = document.getElementById('trajectory');
          if (elem) elem.scrollIntoView({ behavior: 'smooth' });
          setLastActionToast('Keyboard Shortcut: Jumped to Live Simulation (Ctrl+P)');
          setTimeout(() => setLastActionToast(null), 3500);
        } else if (e.key.toLowerCase() === 'e') {
          e.preventDefault();
          const elem = document.getElementById('step-20-report');
          if (elem) elem.scrollIntoView({ behavior: 'smooth' });
          setLastActionToast('Keyboard Shortcut: Jumped to Export Report (Ctrl+E)');
          setTimeout(() => setLastActionToast(null), 3500);
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  return (
    <div className="min-h-screen bg-white text-slate-900 font-sans antialiased selection:bg-blue-900 selection:text-white relative">
      <ScrollProgressBar />
      <Navbar />

      {/* Keyboard Shortcut Toast Notification */}
      {lastActionToast && (
        <div className="fixed bottom-6 right-6 z-50 bg-slate-900 text-cyan-300 px-4 py-3 rounded-2xl border border-cyan-500/40 shadow-2xl flex items-center space-x-3 text-xs font-mono animate-bounce">
          <Command className="w-4 h-4 text-cyan-400 shrink-0" />
          <span>{lastActionToast}</span>
        </div>
      )}

      {/* Persistent Keyboard Shortcuts Hint Badge */}
      {showShortcutToast && (
        <div className="fixed bottom-6 left-6 z-40 bg-slate-900/90 backdrop-blur-md text-slate-300 px-4 py-2.5 rounded-2xl border border-slate-700 shadow-xl hidden md:flex items-center space-x-3 text-[11px] font-mono">
          <Command className="w-3.5 h-3.5 text-cyan-400" />
          <span>Shortcuts: <strong className="text-white">Ctrl+O</strong> (Optimize), <strong className="text-white">Ctrl+P</strong> (Simulation), <strong className="text-white">Ctrl+E</strong> (Report)</span>
          <button 
            onClick={() => setShowShortcutToast(false)}
            className="text-slate-400 hover:text-white ml-2 transition-colors"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      )}

      <HeroSection />
      <WorkflowSection />
      <DatasetSection />
      <PreprocessingSection />
      <CodeWorkspace />
      <MissionParametersPanel onOptimize={handleOptimize} optimizationResult={optimizationResult} />
      <ClassicalOptSection result={optimizationResult} />
      <QuboSection result={optimizationResult} />
      <QaoaSection result={optimizationResult} />
      <MeasurementSection result={optimizationResult} />
      <ValidationSection result={optimizationResult} />
      <ComparisonSection result={optimizationResult} />
      <FinalPlanSection result={optimizationResult} params={missionParams} />
      
      {/* Advanced Modules Steps 15 - 20 */}
      <WeatherSection />
      <RiskSection />
      <ScenarioSection />
      <LiveRocketSimulation />
      <SensitivitySection />
      <HistoryReportSection result={optimizationResult} params={missionParams} />

      <AboutSection />
    </div>
  );
}
