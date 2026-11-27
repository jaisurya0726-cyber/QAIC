import React, { useState } from 'react';
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

export default function App() {
  const [optimizationResult, setOptimizationResult] = useState<OptimizationResult | null>(null);
  const [missionParams, setMissionParams] = useState<MissionParameters | null>(null);

  const handleOptimize = (result: OptimizationResult, params: MissionParameters) => {
    setOptimizationResult(result);
    setMissionParams(params);
  };

  return (
    <div className="min-h-screen bg-white text-slate-900 font-sans antialiased selection:bg-blue-900 selection:text-white">
      <ScrollProgressBar />
      <Navbar />
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
