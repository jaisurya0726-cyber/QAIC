import React, { useState } from 'react';
import { Sliders, CheckCircle2, AlertCircle, Play, ArrowRight } from 'lucide-react';

export const PreprocessingSection: React.FC = () => {
  const [preprocessingDone, setPreprocessingDone] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);

  const handleRunPreprocessing = () => {
    setIsProcessing(true);
    setTimeout(() => {
      setIsProcessing(false);
      setPreprocessingDone(true);
    }, 1200);
  };

  return (
    <section id="preprocessing" className="py-20 bg-white border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-indigo-50 border border-indigo-200 text-indigo-900 text-xs font-semibold mb-3">
            <Sliders className="w-3.5 h-3.5 text-indigo-700" />
            <span>Step 3: Data Preprocessing Pipeline</span>
          </div>
          <h2 className="text-3xl font-extrabold text-slate-900 tracking-tight">Data Cleansing & Normalisation</h2>
          <p className="text-slate-600 mt-2 text-sm">
            Prepare raw aerospace telemetry and payload datasets for quantum and classical optimization by handling missing values, scaling features, and filtering outliers.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
          
          <div className="bg-slate-50 p-6 rounded-2xl border border-slate-200 space-y-4">
            <h3 className="text-base font-bold text-slate-900 flex items-center space-x-2">
              <span className="w-6 h-6 rounded-lg bg-blue-900 text-white text-xs flex items-center justify-center">1</span>
              <span>Missing Value Handling</span>
            </h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Detects NaN or null entries in telemetry records. Imputes missing weather wind speeds using median launch site atmospheric logs.
            </p>
            <div className="p-3 bg-white rounded-xl border border-slate-200 text-xs font-mono text-slate-700">
              Strategy: Median Imputation & Drop NA (Threshold &gt; 5%)
            </div>
          </div>

          <div className="bg-slate-50 p-6 rounded-2xl border border-slate-200 space-y-4">
            <h3 className="text-base font-bold text-slate-900 flex items-center space-x-2">
              <span className="w-6 h-6 rounded-lg bg-blue-900 text-white text-xs flex items-center justify-center">2</span>
              <span>Feature Scaling & Outliers</span>
            </h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Applies scikit-learn StandardScaler normalization to rocket mass, specific impulse, and thrust vectors to ensure numerical stability.
            </p>
            <div className="p-3 bg-white rounded-xl border border-slate-200 text-xs font-mono text-slate-700">
              Formula: z = (x - mean) / std_dev
            </div>
          </div>

          <div className="bg-slate-50 p-6 rounded-2xl border border-slate-200 space-y-4">
            <h3 className="text-base font-bold text-slate-900 flex items-center space-x-2">
              <span className="w-6 h-6 rounded-lg bg-blue-900 text-white text-xs flex items-center justify-center">3</span>
              <span>Categorical Encoding</span>
            </h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Encodes target orbital regimes (LEO, MEO, GEO, SSO) and launch site identifiers into binary matrices suitable for QUBO mapping.
            </p>
            <div className="p-3 bg-white rounded-xl border border-slate-200 text-xs font-mono text-slate-700">
              Method: One-Hot Encoding & Binary Constraint Mapping
            </div>
          </div>

        </div>

        {/* Execution Card */}
        <div className="bg-gradient-to-r from-blue-900 to-indigo-900 rounded-2xl p-8 text-white shadow-lg">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="space-y-2 text-center md:text-left">
              <h3 className="text-xl font-bold">Execute Preprocessing Pipeline</h3>
              <p className="text-xs text-blue-200 max-w-xl">
                Run automated cleaning, scaling, and validation scripts on all 5 ingested datasets.
              </p>
            </div>

            <button
              onClick={handleRunPreprocessing}
              disabled={isProcessing}
              className="px-6 py-3.5 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-xs uppercase tracking-wider flex items-center space-x-2 shadow-md transition-all disabled:opacity-50"
            >
              {isProcessing ? (
                <>
                  <div className="w-4 h-4 border-2 border-slate-950 border-t-transparent rounded-full animate-spin"></div>
                  <span>Processing...</span>
                </>
              ) : (
                <>
                  <Play className="w-4 h-4 fill-slate-950" />
                  <span>Run Preprocessing</span>
                </>
              )}
            </button>
          </div>

          {preprocessingDone && (
            <div className="mt-6 pt-6 border-t border-blue-800/60 grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs animate-fade-in">
              <div className="bg-blue-950/50 p-4 rounded-xl border border-blue-800 flex items-center space-x-3">
                <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
                <div>
                  <div className="font-bold text-white">Records Processed</div>
                  <div className="text-blue-200 font-mono">142 total entries verified</div>
                </div>
              </div>

              <div className="bg-blue-950/50 p-4 rounded-xl border border-blue-800 flex items-center space-x-3">
                <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
                <div>
                  <div className="font-bold text-white">Outliers Removed</div>
                  <div className="text-blue-200 font-mono">3 anomalies clipped (2.1%)</div>
                </div>
              </div>

              <div className="bg-blue-950/50 p-4 rounded-xl border border-blue-800 flex items-center space-x-3">
                <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
                <div>
                  <div className="font-bold text-white">Dataset Status</div>
                  <div className="text-emerald-300 font-mono font-bold">READY FOR WORKSPACE</div>
                </div>
              </div>
            </div>
          )}
        </div>

        <div className="mt-8 flex justify-end">
          <a
            href="#workspace"
            className="inline-flex items-center space-x-2 text-xs font-bold text-blue-900 hover:text-blue-700"
          >
            <span>Proceed to Code Workspace (Step 4)</span>
            <ArrowRight className="w-4 h-4" />
          </a>
        </div>

      </div>
    </section>
  );
};
