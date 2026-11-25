import React, { useState } from 'react';
import { Sliders, Plus, Trash2, Copy, Play, CheckCircle2, BarChart2 } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid, Legend } from 'recharts';

export const ScenarioSection: React.FC = () => {
  const [scenarios, setScenarios] = useState([
    { id: 1, name: 'Baseline Mission', payload: '7,800 kg', fuel: '368.2 t', cost: '$98.5M', risk: '1.6%', status: 'Optimal', obj: '95.8' },
    { id: 2, name: 'Heavy Payload Variant', payload: '9,500 kg', fuel: '445.0 t', cost: '$118.0M', risk: '2.8%', status: 'Feasible', obj: '112.4' },
    { id: 3, name: 'High Wind Allowance', payload: '7,800 kg', fuel: '390.4 t', cost: '$102.1M', risk: '3.4%', status: 'Feasible', obj: '101.2' },
  ]);

  const [newScenarioName, setNewScenarioName] = useState('');

  const handleAddScenario = () => {
    if (!newScenarioName.trim()) return;
    setScenarios([
      ...scenarios,
      {
        id: Date.now(),
        name: newScenarioName,
        payload: '8,200 kg',
        fuel: '385.0 t',
        cost: '$104.0M',
        risk: '2.1%',
        status: 'Feasible',
        obj: '99.5'
      }
    ]);
    setNewScenarioName('');
  };

  const handleDelete = (id: number) => {
    if (scenarios.length <= 1) {
      alert('Cannot delete the last remaining scenario.');
      return;
    }
    setScenarios(scenarios.filter(s => s.id !== id));
  };

  const comparisonData = scenarios.map(s => ({
    name: s.name,
    fuel: parseFloat(s.fuel),
    cost: parseFloat(s.cost.replace('$', '').replace('M', '')),
    risk: parseFloat(s.risk.replace('%', '')) * 10
  }));

  return (
    <section id="step-17-scenario" className="py-20 bg-white border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-blue-50 border border-blue-200 text-blue-900 text-xs font-semibold mb-3">
            <Sliders className="w-3.5 h-3.5 text-blue-700" />
            <span>Step 17: What-If Scenario Analysis</span>
          </div>
          <h2 className="text-3xl font-extrabold text-slate-900 tracking-tight">Interactive Mission Scenario Comparison</h2>
          <p className="text-slate-600 mt-2 text-sm">
            Evaluate how varying payload mass, fuel capacity, and atmospheric constraints impacts optimization objectives.
          </p>
        </div>

        {/* Add Scenario Bar */}
        <div className="max-w-4xl mx-auto mb-8 bg-slate-50 p-4 rounded-2xl border border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-4">
          <input
            type="text"
            placeholder="Enter new scenario name (e.g., Lunar Transfer Variant)..."
            value={newScenarioName}
            onChange={(e) => setNewScenarioName(e.target.value)}
            className="w-full sm:w-80 px-4 py-2.5 rounded-xl border border-slate-300 text-xs bg-white focus:outline-none focus:border-blue-900"
          />

          <button
            onClick={handleAddScenario}
            className="w-full sm:w-auto px-6 py-2.5 rounded-xl bg-blue-900 hover:bg-blue-800 text-white font-bold text-xs flex items-center justify-center space-x-2 shadow-xs transition-all"
          >
            <Plus className="w-4 h-4" />
            <span>Create & Run Scenario</span>
          </button>
        </div>

        {/* Scenario Table */}
        <div className="max-w-5xl mx-auto bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden mb-12">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse text-xs">
              <thead>
                <tr className="bg-slate-100 text-slate-700 font-bold uppercase tracking-wider">
                  <th className="p-3.5">Scenario Name</th>
                  <th className="p-3.5">Payload Mass</th>
                  <th className="p-3.5">Fuel Consumption</th>
                  <th className="p-3.5">Mission Cost</th>
                  <th className="p-3.5">Mission Risk</th>
                  <th className="p-3.5">Status</th>
                  <th className="p-3.5">Objective Value</th>
                  <th className="p-3.5 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-slate-700 font-mono">
                {scenarios.map((s, idx) => (
                  <tr key={s.id} className={idx === 0 ? 'bg-blue-50/50 font-bold' : 'hover:bg-slate-50'}>
                    <td className="p-3.5 font-sans font-bold text-slate-900 flex items-center space-x-2">
                      <span>{s.name}</span>
                      {idx === 0 && <span className="px-2 py-0.5 rounded text-[10px] bg-blue-900 text-white">Preferred</span>}
                    </td>
                    <td className="p-3.5">{s.payload}</td>
                    <td className="p-3.5 text-blue-900">{s.fuel}</td>
                    <td className="p-3.5">{s.cost}</td>
                    <td className="p-3.5 text-emerald-700">{s.risk}</td>
                    <td className="p-3.5">
                      <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-100 text-emerald-800">{s.status}</span>
                    </td>
                    <td className="p-3.5">{s.obj}</td>
                    <td className="p-3.5 text-right">
                      <button
                        onClick={() => handleDelete(s.id)}
                        className="p-1.5 text-slate-400 hover:text-red-600 transition-colors"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Comparison Chart */}
        <div className="max-w-4xl mx-auto bg-slate-50 p-6 rounded-2xl border border-slate-200 shadow-sm space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-base font-bold text-slate-900">Scenario Fuel & Cost Comparison</h3>
            <BarChart2 className="w-5 h-5 text-blue-900" />
          </div>

          <div className="h-72 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={comparisonData} margin={{ top: 10, right: 10, left: -20, bottom: 10 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                <XAxis dataKey="name" tick={{ fontSize: 11 }} />
                <YAxis tick={{ fontSize: 11 }} />
                <Tooltip contentStyle={{ fontSize: '12px', borderRadius: '8px' }} />
                <Legend wrapperStyle={{ fontSize: '11px', paddingTop: '10px' }} />
                <Bar dataKey="fuel" name="Fuel Used (t)" fill="#1e3a8a" radius={[4, 4, 0, 0]} />
                <Bar dataKey="cost" name="Cost ($M)" fill="#06b6d4" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

      </div>
    </section>
  );
};
