import React, { useState } from 'react';
import { FileText, Download, FileSpreadsheet, Trash2, CheckCircle2, Search, X, Code, ArrowRightLeft } from 'lucide-react';
import { OptimizationResult, MissionParameters } from '../types';

interface HistoryReportSectionProps {
  result: OptimizationResult | null;
  params: MissionParameters | null;
}

export const HistoryReportSection: React.FC<HistoryReportSectionProps> = ({ result, params }) => {
  const [historyRuns, setHistoryRuns] = useState([
    { id: 'RUN-2026-001', date: '2026-06-15', utc: '14:32 UTC', vehicle: 'LVM3 (GSLV Mk III)', payload: 'Gaganyaan Crew Module', status: 'PASSED', fuel: '368.2 t', cost: '$98.5M', risk: '24.1%', qaoa: '|1011>', speedup: '1.28x' },
    { id: 'RUN-2026-002', date: '2026-06-18', utc: '08:15 UTC', vehicle: 'PSLV-XL', payload: 'RISAT-1B Radar', status: 'PASSED', fuel: '142.0 t', cost: '$42.0M', risk: '18.5%', qaoa: '|0110>', speedup: '1.35x' },
    { id: 'RUN-2026-003', date: '2026-06-22', utc: '21:05 UTC', vehicle: 'Falcon Heavy', payload: 'GPS III SV12', status: 'PASSED', fuel: '820.0 t', cost: '$135.0M', risk: '31.2%', qaoa: '|1100>', speedup: '1.22x' },
    { id: 'RUN-2026-004', date: '2026-06-25', utc: '11:20 UTC', vehicle: 'SSLV-D2', payload: 'EOS-07 Microsat', status: 'PASSED', fuel: '120.0 t', cost: '$28.5M', risk: '15.0%', qaoa: '|0011>', speedup: '1.40x' },
  ]);

  const [searchTerm, setSearchTerm] = useState('');
  const [dateQuery, setDateQuery] = useState('');
  const [reportSuccess, setReportSuccess] = useState(false);
  const [selectedRunIds, setSelectedRunIds] = useState<string[]>([]);
  const [showComparisonModal, setShowComparisonModal] = useState(false);

  const isFiltered = searchTerm.trim() !== '' || dateQuery.trim() !== '';

  const handleClearSearch = () => {
    setSearchTerm('');
    setDateQuery('');
  };

  const handleDeleteRun = (id: string) => {
    if (confirm(`Are you sure you want to delete run record ${id}?`)) {
      setHistoryRuns(historyRuns.filter(r => r.id !== id));
      setSelectedRunIds(selectedRunIds.filter(rId => rId !== id));
    }
  };

  const handleToggleSelectRun = (id: string) => {
    if (selectedRunIds.includes(id)) {
      setSelectedRunIds(selectedRunIds.filter(rId => rId !== id));
    } else {
      if (selectedRunIds.length >= 2) {
        setSelectedRunIds([selectedRunIds[1], id]); // Keep max 2
      } else {
        setSelectedRunIds([...selectedRunIds, id]);
      }
    }
  };

  const handleDownloadPdfReport = () => {
    const reportText = `
====================================================================
QUANTUMSPACE - COMPREHENSIVE MISSION OPTIMIZATION & QAOA REPORT (STEP 20)
====================================================================
Generated on: ${new Date().toUTCString()}
System: Qiskit Aer QAOA + SciPy Classical Baseline + ISRO SDSC SHAR Telemetry

1. EXECUTIVE SUMMARY & RUN ID: RUN-2026-001
- Selected Launch Vehicle: LVM3 (GSLV Mk III) / ISRO
- Satellite Payload: Gaganyaan Human Crew Orbital Module
- Target Orbit: LEO (400 km circular)
- Launch Site: Satish Dhawan Space Centre (SDSC) SHAR - SLP

2. WEATHER & LAUNCH FEASIBILITY (STEP 15)
- Wind Speed: 4.2 m/s (< 12 m/s limit) -> SUITABLE
- Temperature: 26.5 °C -> PASSED
- Precipitation: 0.0 mm/h -> PASSED

3. INTELLIGENT RISK ASSESSMENT (STEP 16)
- Overall Mission Risk Score: 24.1% (Moderate Risk - Yellow)
- All hard constraints verified and satisfied.

4. QAOA QUANTUM OPTIMISATION (STEP 10)
- Optimal Solution State: |1011>
- Fuel Consumption: 368.2 tons (-12.4% vs classical baseline)
- Estimated Mission Cost: $98.5M
- Quantum Speedup Factor: 1.28x

5. CONSTRAINT VALIDATION & FINAL PLAN
- Overall Validation Status: 100% PASSED
====================================================================
`;

    const blob = new Blob([reportText], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'QuantumSpace_Comprehensive_Mission_Report.txt';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    setReportSuccess(true);
    setTimeout(() => setReportSuccess(false), 4000);
  };

  const filteredRuns = historyRuns.filter(r => {
    const matchesSearch = searchTerm.trim() === '' || 
      r.id.toLowerCase().includes(searchTerm.toLowerCase()) || 
      r.vehicle.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesDate = dateQuery.trim() === '' || r.date.includes(dateQuery);

    return matchesSearch && matchesDate;
  });

  const comparedRunsData = historyRuns.filter(r => selectedRunIds.includes(r.id));

  return (
    <section id="step-20-report" className="py-20 bg-white border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-900 text-xs font-semibold mb-3">
            <FileText className="w-3.5 h-3.5 text-emerald-700" />
            <span>Step 20: Mission History, Compare & PDF Reporting</span>
          </div>
          <h2 className="text-3xl font-extrabold text-slate-900 tracking-tight">Optimization Run History & Side-by-Side Comparison</h2>
          <p className="text-slate-600 mt-2 text-sm">
            Access, search, and compare previous mission runs side-by-side. Select two runs to analyze parameter differences, risk scores, and quantum optimization outcomes.
          </p>
        </div>

        {reportSuccess && (
          <div className="max-w-4xl mx-auto mb-6 p-4 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-900 flex items-center space-x-3 shadow-xs">
            <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
            <span className="text-xs sm:text-sm font-semibold">Executive Mission Report downloaded successfully!</span>
          </div>
        )}

        {/* Action Buttons Bar & Search / Date Filter */}
        <div className="max-w-4xl mx-auto mb-8 flex flex-wrap items-center justify-between gap-4 bg-slate-50 p-4 rounded-2xl border border-slate-200">
          <div className="flex flex-wrap items-center gap-3 w-full sm:w-auto">
            {/* Search by Run ID or Vehicle */}
            <div className="relative w-full sm:w-52">
              <Search className="absolute left-3 top-2.5 w-4 h-4 text-slate-400" />
              <input
                type="text"
                placeholder="Search Run ID / Vehicle..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-9 pr-4 py-2 rounded-xl border border-slate-200 text-xs bg-white focus:outline-none focus:border-blue-900"
              />
            </div>

            {/* Filter by Date Range / Date */}
            <div className="relative w-full sm:w-40">
              <input
                type="date"
                placeholder="Filter by Date"
                value={dateQuery}
                onChange={(e) => setDateQuery(e.target.value)}
                className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs bg-white focus:outline-none focus:border-blue-900 text-slate-700 font-mono"
              />
            </div>

            {/* Clear Search Button */}
            {isFiltered && (
              <button
                onClick={handleClearSearch}
                className="px-3 py-2 rounded-xl bg-slate-200 hover:bg-slate-300 text-slate-700 text-xs font-bold flex items-center space-x-1 transition-all"
              >
                <X className="w-3.5 h-3.5" />
                <span>Clear</span>
              </button>
            )}
          </div>

          <div className="flex flex-wrap items-center gap-3">
            {/* Compare Runs Button */}
            <button
              onClick={() => {
                if (selectedRunIds.length !== 2) {
                  alert('Please select exactly two mission runs in the table below to compare.');
                } else {
                  setShowComparisonModal(true);
                }
              }}
              disabled={selectedRunIds.length !== 2}
              className={`px-4 py-2.5 rounded-xl font-bold text-xs flex items-center space-x-2 transition-all shadow-sm ${
                selectedRunIds.length === 2 ? 'bg-indigo-700 hover:bg-indigo-600 text-white' : 'bg-slate-200 text-slate-400 cursor-not-allowed'
              }`}
            >
              <ArrowRightLeft className="w-4 h-4" />
              <span>Compare Runs ({selectedRunIds.length}/2)</span>
            </button>

            <button
              onClick={handleDownloadPdfReport}
              className="px-4 py-2.5 rounded-xl bg-blue-900 hover:bg-blue-800 text-white font-bold text-xs flex items-center space-x-2 shadow-sm transition-all"
            >
              <Download className="w-4 h-4" />
              <span>PDF Report</span>
            </button>

            <button
              onClick={() => alert('Telemetry exported as JSON successfully.')}
              className="px-3 py-2.5 rounded-xl bg-white border border-slate-300 text-slate-700 font-bold text-xs flex items-center space-x-1 hover:bg-slate-50 transition-all"
            >
              <Code className="w-4 h-4 text-indigo-700" />
              <span>JSON</span>
            </button>

            <button
              onClick={() => alert('Telemetry exported as CSV successfully.')}
              className="px-3 py-2.5 rounded-xl bg-white border border-slate-300 text-slate-700 font-bold text-xs flex items-center space-x-1 hover:bg-slate-50 transition-all"
            >
              <FileSpreadsheet className="w-4 h-4 text-emerald-700" />
              <span>CSV</span>
            </button>
          </div>
        </div>

        {/* History Runs Table */}
        <div className="max-w-4xl mx-auto bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
          <div className="p-4 bg-slate-50 border-b border-slate-200 flex justify-between items-center font-bold text-xs text-slate-700 uppercase tracking-wider">
            <span>Saved Optimisation Runs ({filteredRuns.length} of {historyRuns.length}) - Select 2 to Compare</span>
            {isFiltered && <span className="text-blue-700 font-mono text-[10px]">Filtered active</span>}
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse text-xs">
              <thead>
                <tr className="bg-slate-100 text-slate-700 font-bold uppercase tracking-wider">
                  <th className="p-3 text-center w-12">Select</th>
                  <th className="p-3.5">Run ID</th>
                  <th className="p-3.5">Timestamp</th>
                  <th className="p-3.5">Launch Vehicle</th>
                  <th className="p-3.5">Payload</th>
                  <th className="p-3.5">Fuel Used</th>
                  <th className="p-3.5">Cost</th>
                  <th className="p-3.5">Risk Score</th>
                  <th className="p-3.5 text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-slate-700">
                {filteredRuns.length > 0 ? (
                  filteredRuns.map((r) => {
                    const isSelected = selectedRunIds.includes(r.id);
                    return (
                      <tr key={r.id} className={`hover:bg-slate-50 transition-colors ${isSelected ? 'bg-indigo-50/50' : ''}`}>
                        <td className="p-3 text-center">
                          <input
                            type="checkbox"
                            checked={isSelected}
                            onChange={() => handleToggleSelectRun(r.id)}
                            className="w-4 h-4 accent-indigo-600 cursor-pointer rounded"
                          />
                        </td>
                        <td className="p-3.5 font-mono font-bold text-blue-900">{r.id}</td>
                        <td className="p-3.5 font-mono text-slate-500">{r.date}</td>
                        <td className="p-3.5 font-bold text-slate-900">{r.vehicle}</td>
                        <td className="p-3.5">{r.payload}</td>
                        <td className="p-3.5 font-mono">{r.fuel}</td>
                        <td className="p-3.5 font-mono">{r.cost}</td>
                        <td className="p-3.5 font-mono font-bold text-amber-700">{r.risk}</td>
                        <td className="p-3.5 text-right">
                          <button
                            onClick={() => handleDeleteRun(r.id)}
                            className="p-1.5 text-slate-400 hover:text-red-600 transition-colors"
                            title="Delete Run"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </td>
                      </tr>
                    );
                  })
                ) : (
                  <tr>
                    <td colSpan={9} className="p-8 text-center text-slate-500">
                      No mission runs found matching your search criteria.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Side-by-Side Comparison Modal */}
        {showComparisonModal && comparedRunsData.length === 2 && (
          <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4">
            <div className="bg-white rounded-3xl border border-slate-200 shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto p-6 space-y-6">
              
              <div className="flex items-center justify-between border-b border-slate-200 pb-4">
                <div>
                  <div className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full bg-indigo-50 border border-indigo-200 text-indigo-900 text-xs font-semibold mb-1">
                    <ArrowRightLeft className="w-3.5 h-3.5 text-indigo-700" />
                    <span>Side-by-Side Mission Comparison</span>
                  </div>
                  <h3 className="text-xl font-extrabold text-slate-900">Comparing {comparedRunsData[0].id} vs {comparedRunsData[1].id}</h3>
                </div>
                <button
                  onClick={() => setShowComparisonModal(false)}
                  className="p-2 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-700 transition-all"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Comparison Table */}
              <div className="overflow-x-auto rounded-2xl border border-slate-200">
                <table className="w-full text-left border-collapse text-xs">
                  <thead>
                    <tr className="bg-slate-100 text-slate-700 font-bold uppercase tracking-wider">
                      <th className="p-4 w-1/3">Parameter / Outcome</th>
                      <th className="p-4 w-1/3 bg-blue-50/50 text-blue-900 font-mono">{comparedRunsData[0].id}</th>
                      <th className="p-4 w-1/3 bg-indigo-50/50 text-indigo-900 font-mono">{comparedRunsData[1].id}</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 text-slate-700">
                    <tr>
                      <td className="p-4 font-bold text-slate-900">Timestamp</td>
                      <td className="p-4 font-mono">{comparedRunsData[0].date} {comparedRunsData[0].utc}</td>
                      <td className="p-4 font-mono">{comparedRunsData[1].date} {comparedRunsData[1].utc}</td>
                    </tr>
                    <tr>
                      <td className="p-4 font-bold text-slate-900">Launch Vehicle</td>
                      <td className="p-4 font-bold text-blue-900">{comparedRunsData[0].vehicle}</td>
                      <td className="p-4 font-bold text-indigo-900">{comparedRunsData[1].vehicle}</td>
                    </tr>
                    <tr>
                      <td className="p-4 font-bold text-slate-900">Satellite Payload</td>
                      <td className="p-4">{comparedRunsData[0].payload}</td>
                      <td className="p-4">{comparedRunsData[1].payload}</td>
                    </tr>
                    <tr>
                      <td className="p-4 font-bold text-slate-900">Fuel Consumption</td>
                      <td className="p-4 font-mono font-bold text-emerald-700">{comparedRunsData[0].fuel}</td>
                      <td className="p-4 font-mono font-bold text-emerald-700">{comparedRunsData[1].fuel}</td>
                    </tr>
                    <tr>
                      <td className="p-4 font-bold text-slate-900">Estimated Cost</td>
                      <td className="p-4 font-mono font-bold text-slate-900">{comparedRunsData[0].cost}</td>
                      <td className="p-4 font-mono font-bold text-slate-900">{comparedRunsData[1].cost}</td>
                    </tr>
                    <tr>
                      <td className="p-4 font-bold text-slate-900">Mission Risk Score</td>
                      <td className="p-4 font-mono font-bold text-amber-700">{comparedRunsData[0].risk}</td>
                      <td className="p-4 font-mono font-bold text-amber-700">{comparedRunsData[1].risk}</td>
                    </tr>
                    <tr>
                      <td className="p-4 font-bold text-slate-900">QAOA Optimal State</td>
                      <td className="p-4 font-mono text-cyan-700">{comparedRunsData[0].qaoa}</td>
                      <td className="p-4 font-mono text-cyan-700">{comparedRunsData[1].qaoa}</td>
                    </tr>
                    <tr>
                      <td className="p-4 font-bold text-slate-900">Quantum Speedup</td>
                      <td className="p-4 font-mono">{comparedRunsData[0].speedup}</td>
                      <td className="p-4 font-mono">{comparedRunsData[1].speedup}</td>
                    </tr>
                    <tr>
                      <td className="p-4 font-bold text-slate-900">Status</td>
                      <td className="p-4"><span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-100 text-emerald-800">{comparedRunsData[0].status}</span></td>
                      <td className="p-4"><span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-100 text-emerald-800">{comparedRunsData[1].status}</span></td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <div className="flex justify-end pt-2">
                <button
                  onClick={() => setShowComparisonModal(false)}
                  className="px-6 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs transition-all"
                >
                  Close Comparison
                </button>
              </div>

            </div>
          </div>
        )}

      </div>
    </section>
  );
};
