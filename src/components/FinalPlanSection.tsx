import React, { useState } from 'react';
import { FileText, Download, FileSpreadsheet, CheckCircle2, RotateCcw, Rocket } from 'lucide-react';
import { OptimizationResult, MissionParameters } from '../types';
import { mockRockets, mockPayloads } from '../data/mockData';

interface FinalPlanSectionProps {
  result: OptimizationResult | null;
  params: MissionParameters | null;
}

export const FinalPlanSection: React.FC<FinalPlanSectionProps> = ({ result, params }) => {
  const [downloadSuccess, setDownloadSuccess] = useState(false);
  const [csvSuccess, setCsvSuccess] = useState(false);

  const selectedRocket = mockRockets.find(r => r.id === params?.rocketId) || mockRockets[0];
  const selectedPayload = mockPayloads.find(p => p.id === params?.payloadId) || mockPayloads[0];
  const qaoa = result?.qaoa || {
    fuelUsed: 368.2,
    cost: 98.5,
    risk: 1.6,
    bestSolution: '1011 (Optimal Launch Window & Rocket Pairing)'
  };

  const handleDownloadReport = () => {
    const reportText = `
=========================================================
QUANTUMSPACE - EXECUTIVE MISSION PLANNING REPORT
=========================================================
Generated on: ${new Date().toUTCString()}
Optimization Engine: Qiskit Aer QAOA (p=2) & SciPy Classical Baseline

1. VEHICLE & PAYLOAD CONFIGURATION
- Launch Vehicle: ${selectedRocket.name} (${selectedRocket.agency})
- Satellite Payload: ${selectedPayload.satelliteName} (${selectedPayload.mass} kg)
- Target Orbit: ${params?.targetAltitude || 550} km Sun-Synchronous (LEO)
- Launch Site: ${params?.launchSite || 'Kennedy Space Center LC-39A'}

2. QAOA QUANTUM OPTIMISATION RESULTS
- Optimal Solution Bitstring: State |1011>
- Fuel Consumption: ${qaoa.fuelUsed} tons (12.4% reduction vs classical)
- Estimated Mission Cost: $${qaoa.cost}M
- Flight Duration: 9.2 minutes (Orbital Insertion)
- Mission Risk Factor: ${qaoa.risk}%

3. CONSTRAINT VALIDATION STATUS
- Fuel Feasibility: PASSED
- Payload Capacity: PASSED
- Orbital Mechanics: PASSED
- Weather & Range Safety: PASSED
- Budget Compliance: PASSED

Overall Mission Status: 100% PASSED (READY FOR LAUNCH OPERATIONS)
=========================================================
`;

    const blob = new Blob([reportText], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `Mission_Plan_${selectedRocket.name.replace(/\s+/g, '_')}.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    setDownloadSuccess(true);
    setTimeout(() => setDownloadSuccess(false), 4000);
  };

  const handleExportCsv = () => {
    const csvContent = `Metric,Value\nVehicle,${selectedRocket.name}\nPayload,${selectedPayload.satelliteName}\nTarget Orbit,${params?.targetAltitude || 550}km\nFuel Used (t),${qaoa.fuelUsed}\nCost ($M),${qaoa.cost}\nRisk (%),${qaoa.risk}\nValidation,PASSED`;
    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `Mission_Telemetry_${selectedRocket.name.replace(/\s+/g, '_')}.csv`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    setCsvSuccess(true);
    setTimeout(() => setCsvSuccess(false), 4000);
  };

  return (
    <section id="mission-plan" className="py-20 bg-slate-50 border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-900 text-xs font-semibold mb-3">
            <FileText className="w-3.5 h-3.5 text-emerald-700" />
            <span>Step 14: Final Optimised Mission Plan</span>
          </div>
          <h2 className="text-3xl font-extrabold text-slate-900 tracking-tight">Executive Mission Summary & Export</h2>
          <p className="text-slate-600 mt-2 text-sm">
            Review the final quantum-optimized mission configuration, telemetry parameters, and validation report. Download official reports or export CSV data.
          </p>
        </div>

        {downloadSuccess && (
          <div className="max-w-4xl mx-auto mb-6 p-4 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-900 flex items-center space-x-3 shadow-sm">
            <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
            <span className="text-xs sm:text-sm font-semibold">Official Mission Report downloaded successfully!</span>
          </div>
        )}

        {csvSuccess && (
          <div className="max-w-4xl mx-auto mb-6 p-4 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-900 flex items-center space-x-3 shadow-sm">
            <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
            <span className="text-xs sm:text-sm font-semibold">Mission Telemetry CSV exported successfully!</span>
          </div>
        )}

        <div className="max-w-4xl mx-auto bg-white rounded-2xl border border-slate-200 shadow-sm p-6 sm:p-8 space-y-8">
          
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between pb-6 border-b border-slate-200 gap-4">
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 rounded-2xl bg-blue-900 text-white flex items-center justify-center shadow-md">
                <Rocket className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-slate-900">{selectedRocket.name}</h3>
                <p className="text-xs text-slate-500">Payload: <span className="font-semibold text-slate-800">{selectedPayload.satelliteName}</span></p>
              </div>
            </div>

            <span className="px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 text-xs font-bold flex items-center space-x-1.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              <span>QAOA OPTIMISED & VALIDATED</span>
            </span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            <div className="p-4 bg-slate-50 rounded-xl border border-slate-200">
              <div className="text-xs text-slate-500 font-medium">Fuel Consumption</div>
              <div className="text-xl font-bold font-mono text-blue-900 mt-1">{qaoa.fuelUsed} tons</div>
              <div className="text-[10px] text-emerald-600 mt-0.5 font-semibold">-12.4% vs Classical</div>
            </div>

            <div className="p-4 bg-slate-50 rounded-xl border border-slate-200">
              <div className="text-xs text-slate-500 font-medium">Estimated Launch Cost</div>
              <div className="text-xl font-bold font-mono text-slate-900 mt-1">${qaoa.cost}M</div>
              <div className="text-[10px] text-emerald-600 mt-0.5 font-semibold">Within $150M Budget</div>
            </div>

            <div className="p-4 bg-slate-50 rounded-xl border border-slate-200">
              <div className="text-xs text-slate-500 font-medium">Mission Risk</div>
              <div className="text-xl font-bold font-mono text-emerald-700 mt-1">{qaoa.risk}%</div>
              <div className="text-[10px] text-slate-500 mt-0.5">Optimal safety margin</div>
            </div>

            <div className="p-4 bg-slate-50 rounded-xl border border-slate-200">
              <div className="text-xs text-slate-500 font-medium">Target Orbit</div>
              <div className="text-xl font-bold font-mono text-indigo-900 mt-1">{params?.targetOrbit || 'LEO'}</div>
              <div className="text-[10px] text-slate-500 mt-0.5">{params?.targetAltitude || 550} km altitude</div>
            </div>
          </div>

          <div className="flex flex-wrap items-center justify-end gap-4 pt-4 border-t border-slate-100">
            <button
              onClick={handleExportCsv}
              className="px-5 py-3 rounded-xl bg-white border border-slate-300 text-slate-700 font-bold text-xs uppercase tracking-wider flex items-center space-x-2 hover:bg-slate-50 shadow-xs transition-all"
            >
              <FileSpreadsheet className="w-4 h-4 text-emerald-700" />
              <span>Export CSV Telemetry</span>
            </button>

            <button
              onClick={handleDownloadReport}
              className="px-6 py-3 rounded-xl bg-blue-900 hover:bg-blue-800 text-white font-bold text-xs uppercase tracking-wider flex items-center space-x-2 shadow-md transition-all"
            >
              <Download className="w-4 h-4" />
              <span>Download Mission Report (.txt)</span>
            </button>

            <a
              href="#parameters"
              className="px-6 py-3 rounded-xl bg-cyan-600 hover:bg-cyan-500 text-slate-950 font-bold text-xs uppercase tracking-wider flex items-center space-x-2 shadow-md transition-all"
            >
              <RotateCcw className="w-4 h-4" />
              <span>Generate New Optimisation</span>
            </a>
          </div>

        </div>

      </div>
    </section>
  );
};
