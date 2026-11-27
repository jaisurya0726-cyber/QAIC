import React, { useState } from 'react';
import { Database, BarChart3, Sliders, Cpu, Rocket, Atom, ShieldCheck, FileText, ChevronDown, ChevronUp, ArrowRight, CheckCircle2, Orbit, Minimize2, Maximize2 } from 'lucide-react';


export const WorkflowSection: React.FC = () => {
  const [expandedStep, setExpandedStep] = useState<number | null>(1);
  const [allCollapsed, setAllCollapsed] = useState<boolean>(false);

  const steps = [
    {
      num: 1,
      title: 'Dataset Collection',
      icon: Database,
      targetId: 'datasets',
      explanation: 'Collect and ingest realistic rocket specifications, satellite payloads, launch windows, trajectory histories, and mission constraints.',
      input: 'CSV / Excel files or sample dataset records.',
      process: 'Parse raw records, validate data types, and load into memory structures.',
      output: 'Structured datasets containing 100-500 realistic launch records.'
    },
    {
      num: 2,
      title: 'Data Exploration & Visualisation',
      icon: BarChart3,
      targetId: 'datasets',
      explanation: 'Explore dataset distributions, statistical summaries, correlation matrices, and fuel consumption trends.',
      input: 'Cleaned datasets from Step 1.',
      process: 'Statistical analysis, missing value auditing, and Recharts visualization generation.',
      output: 'Interactive charts and summary tables for mission evaluation.'
    },
    {
      num: 3,
      title: 'Data Preprocessing',
      icon: Sliders,
      targetId: 'preprocessing',
      explanation: 'Handle missing values, scale numerical features, encode categorical variables, and remove outliers.',
      input: 'Raw uncleaned dataset records.',
      process: 'StandardScaler normalization, duplicate removal, and outlier clipping.',
      output: 'Preprocessed feature matrix ready for classical and quantum optimization.'
    },
    {
      num: 4,
      title: 'Code Workspace',
      icon: Cpu,
      targetId: 'workspace',
      explanation: 'Manage Python scripts, edit code files, and execute optimization algorithms in an interactive code workspace.',
      input: 'Python modules (dataset loader, QAOA circuit, classical solver).',
      process: 'Code execution and output log rendering.',
      output: 'Real-time execution logs and script verification.'
    },
    {
      num: 5,
      title: 'Mission Parameter Configuration',
      icon: Sliders,
      targetId: 'parameters',
      explanation: 'Configure mission specific variables including rocket selection, payload mass, launch windows, and optimization weights.',
      input: 'User input parameters and slider values.',
      process: 'Parameter validation and bounding checks.',
      output: 'Validated mission configuration dictionary.'
    },
    {
      num: 6,
      title: 'Trajectory Generation & Visualisation',
      icon: Rocket,
      targetId: 'trajectory',
      explanation: 'Simulate ascent physics, gravity turns, and orbital insertion using atmospheric drag and Tsiolkovsky equations.',
      input: 'Selected rocket specs and target orbit.',
      process: 'Numerical integration of rocket flight dynamics.',
      output: 'Interactive 2D trajectory animation and telemetry graphs.'
    },
    {
      num: 7,
      title: 'Classical Optimisation',
      icon: BarChart3,
      targetId: 'classical',
      explanation: 'Execute classical optimization (SciPy SLSQP) to establish performance baselines for fuel and cost.',
      input: 'Mission constraints and objective weights.',
      process: 'Gradient-based optimization iterations.',
      output: 'Classical optimal objective value, fuel expenditure, and execution time.'
    },
    {
      num: 8,
      title: 'QUBO Formulation',
      icon: Atom,
      targetId: 'qubo',
      explanation: 'Convert mission selection and window scheduling into Quadratic Unconstrained Binary Optimization (QUBO).',
      input: 'Discrete choice variables and constraint penalties.',
      process: 'Matrix construction and quadratic cost coefficient mapping.',
      output: 'QUBO Q-matrix and energy calculation.'
    },
    {
      num: 9,
      title: 'Ising Hamiltonian Conversion',
      icon: Atom,
      targetId: 'qubo',
      explanation: 'Translate binary QUBO variables into spin variables (Pauli-Z operators) for quantum hardware compatibility.',
      input: 'QUBO Q-matrix.',
      process: 'Variable substitution x_i = (1 - z_i)/2.',
      output: 'Cost Hamiltonian expression and spin coefficients.'
    },
    {
      num: 10,
      title: 'QAOA Quantum Optimisation',
      icon: Atom,
      targetId: 'qaoa',
      explanation: 'Execute the Quantum Approximate Optimisation Algorithm (QAOA) using Qiskit Aer simulator with depth p.',
      input: 'Cost Hamiltonian and mixer unitary parameters.',
      process: 'Parameter optimization across circuit layers and measurement shots.',
      output: 'Quantum circuit diagram, probability distribution, and energy convergence graph.'
    },
    {
      num: 11,
      title: 'Measurement & Solution Selection',
      icon: ShieldCheck,
      targetId: 'measurement',
      explanation: 'Collect measurement outcomes, calculate solution energies, decode binary strings, and reject infeasible states.',
      input: 'Quantum measurement counts.',
      process: 'Energy evaluation and constraint filtering.',
      output: 'Ranked candidate solutions and best feasible mission plan.'
    },
    {
      num: 12,
      title: 'Trajectory Validation',
      icon: ShieldCheck,
      targetId: 'validation',
      explanation: 'Validate the selected quantum solution against rigorous physical safety, fuel feasibility, and orbital constraints.',
      input: 'Optimized mission parameters.',
      process: 'Constraint verification checks.',
      output: 'Validation status with Passed, Warning, or Failed indicators.'
    },
    {
      num: 13,
      title: 'Classical vs Quantum Comparison',
      icon: BarChart3,
      targetId: 'comparison',
      explanation: 'Compare classical baseline results against QAOA quantum optimization across fuel, cost, risk, and execution speed.',
      input: 'Classical and QAOA optimization results.',
      process: 'Comparative metric calculations and percentage improvement.',
      output: 'Side-by-side comparison charts and performance tables.'
    },
    {
      num: 14,
      title: 'Final Optimised Mission Plan',
      icon: FileText,
      targetId: 'mission-plan',
      explanation: 'Generate the final executive mission report with download and export capabilities.',
      input: 'Validated optimal mission parameters.',
      process: 'Report compilation and CSV export generation.',
      output: 'Downloadable mission report and summary dashboard.'
    }
  ];

  const toggleStep = (num: number) => {
    if (allCollapsed) setAllCollapsed(false);
    setExpandedStep(expandedStep === num ? null : num);
  };

  const handleToggleShortenAll = () => {
    if (allCollapsed) {
      setAllCollapsed(false);
      setExpandedStep(1);
    } else {
      setAllCollapsed(true);
      setExpandedStep(null);
    }
  };

  return (
    <section id="workflow" className="py-20 bg-white border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
          <div className="text-center md:text-left">
            <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-indigo-50 border border-indigo-200 text-indigo-900 text-xs font-semibold mb-4">
              <Orbit className="w-3.5 h-3.5 text-indigo-600" />
              <span>Complete Architecture</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
              Complete Workflow – 14 Step Pipeline
            </h2>
            <p className="text-slate-600 mt-3 text-sm sm:text-base">
              Follow the sequential pipeline from raw dataset ingestion through quantum QUBO/QAOA optimization to validated flight plans.
            </p>
          </div>

          <div className="mt-4 md:mt-0 flex justify-center">
            <button
              onClick={handleToggleShortenAll}
              className="px-4 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold flex items-center space-x-2 transition-all shadow-xs"
            >
              {allCollapsed ? (
                <>
                  <Maximize2 className="w-4 h-4 text-blue-900" />
                  <span>Expand All Workflow Steps</span>
                </>
              ) : (
                <>
                  <Minimize2 className="w-4 h-4 text-blue-900" />
                  <span>Collapse All Workflow Steps</span>
                </>
              )}
            </button>
          </div>
        </div>

        <div className="space-y-4 max-w-4xl mx-auto">
          {steps.map((step) => {
            const Icon = step.icon;
            const isExpanded = !allCollapsed && expandedStep === step.num;
            return (
              <div
                key={step.num}
                className={`group relative rounded-2xl border transition-all ${
                  isExpanded ? 'border-blue-900 shadow-md bg-white' : 'border-slate-200 bg-slate-50/50 hover:bg-white'
                }`}
              >
                {/* Hover Tooltip */}
                <div className="absolute -top-11 left-1/2 -translate-x-1/2 z-20 px-3 py-1.5 bg-slate-900 text-white text-[11px] font-medium rounded-xl shadow-xl opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none hidden sm:block max-w-md text-center truncate">
                  <span className="text-cyan-400 font-bold mr-1">Module Function:</span> {step.explanation}
                </div>
                <div
                  onClick={() => toggleStep(step.num)}
                  className="flex items-center justify-between p-5 cursor-pointer select-none"
                >
                  <div className="flex items-center space-x-4">
                    <div className={`w-10 h-10 rounded-xl flex items-center justify-center font-bold text-sm ${
                      isExpanded ? 'bg-blue-900 text-white shadow-sm' : 'bg-slate-200 text-slate-700'
                    }`}>
                      {step.num}
                    </div>
                    <div>
                      <div className="flex items-center space-x-2">
                        <span className="text-xs font-semibold uppercase tracking-wider text-slate-500">Step {step.num}</span>
                        <span className="inline-flex items-center px-2 py-0.5 rounded text-[10px] font-medium bg-emerald-100 text-emerald-800">
                          <CheckCircle2 className="w-3 h-3 mr-1" /> Ready
                        </span>
                      </div>
                      <h3 className="text-base font-bold text-slate-900">{step.title}</h3>
                    </div>
                  </div>

                  <div className="flex items-center space-x-3">
                    <Icon className="w-5 h-5 text-slate-400 hidden sm:block" />
                    <button className="p-1 rounded-full text-slate-500 hover:bg-slate-100">
                      {isExpanded ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
                    </button>
                  </div>
                </div>

                {isExpanded && (
                  <div className="px-6 pb-6 pt-2 border-t border-slate-100 space-y-4 text-xs sm:text-sm">
                    <p className="text-slate-700 leading-relaxed font-medium">
                      {step.explanation}
                    </p>

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
                      <div className="bg-slate-50 p-3 rounded-xl border border-slate-200">
                        <div className="font-semibold text-slate-900 text-xs mb-1">Input Information</div>
                        <div className="text-slate-600 text-xs">{step.input}</div>
                      </div>

                      <div className="bg-blue-50/50 p-3 rounded-xl border border-blue-100">
                        <div className="font-semibold text-blue-900 text-xs mb-1">Process Performed</div>
                        <div className="text-blue-950 text-xs">{step.process}</div>
                      </div>

                      <div className="bg-emerald-50/50 p-3 rounded-xl border border-emerald-100">
                        <div className="font-semibold text-emerald-900 text-xs mb-1">Expected Output</div>
                        <div className="text-emerald-950 text-xs">{step.output}</div>
                      </div>
                    </div>

                    <div className="flex justify-end pt-2">
                      <a
                        href={`#${step.targetId}`}
                        className="inline-flex items-center space-x-1.5 px-4 py-2 rounded-lg bg-blue-900 text-white text-xs font-semibold hover:bg-blue-800 shadow-xs transition-colors"
                      >
                        <span>Go to Section</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </a>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
