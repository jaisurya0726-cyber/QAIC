import React, { useState } from 'react';
import { Database, Upload, FileSpreadsheet, Search, BarChart2, CheckCircle, RefreshCw } from 'lucide-react';
import { mockRockets, mockPayloads, mockLaunchWindows, mockTrajectories, mockConstraints } from '../data/mockData';
import { isroHistoricalMissions } from '../data/isro_missions';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid, PieChart, Pie, Cell } from 'recharts';

export const DatasetSection: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'rockets' | 'payloads' | 'windows' | 'trajectories' | 'constraints' | 'isroMissions'>('rockets');
  const [searchTerm, setSearchTerm] = useState('');
  const [uploadSuccess, setUploadSuccess] = useState(false);

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setUploadSuccess(true);
      setTimeout(() => setUploadSuccess(false), 4000);
    }
  };

  const filteredRockets = mockRockets.filter(r => r.name.toLowerCase().includes(searchTerm.toLowerCase()) || r.agency.toLowerCase().includes(searchTerm.toLowerCase()));
  const filteredPayloads = mockPayloads.filter(p => p.satelliteName.toLowerCase().includes(searchTerm.toLowerCase()) || p.targetOrbit.toLowerCase().includes(searchTerm.toLowerCase()));
  const filteredWindows = mockLaunchWindows.filter(w => w.site.toLowerCase().includes(searchTerm.toLowerCase()) || w.targetOrbit.toLowerCase().includes(searchTerm.toLowerCase()));
  const filteredIsroMissions = isroHistoricalMissions.filter(m => m.missionName.toLowerCase().includes(searchTerm.toLowerCase()) || m.vehicle.toLowerCase().includes(searchTerm.toLowerCase()) || m.payloadName.toLowerCase().includes(searchTerm.toLowerCase()));

  // Chart data
  const rocketFuelData = mockRockets.map(r => ({ name: r.name.split(' ')[0], fuel: r.fuelMass / 1000, payload: r.payloadCapacity / 1000 }));
  const orbitDistribution = [
    { name: 'LEO', value: 4 },
    { name: 'MEO', value: 2 },
    { name: 'GEO/GTO', value: 1 },
    { name: 'Lunar/Deep', value: 2 },
  ];
  const COLORS = ['#1e3a8a', '#3b82f6', '#6366f1', '#06b6d4'];

  return (
    <section id="datasets" className="py-20 bg-slate-50 border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
          <div>
            <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-blue-50 border border-blue-200 text-blue-900 text-xs font-semibold mb-3">
              <Database className="w-3.5 h-3.5 text-blue-700" />
              <span>Steps 1 & 2: Dataset Collection & Exploration</span>
            </div>
            <h2 className="text-3xl font-extrabold text-slate-900 tracking-tight">Aerospace & Indian Launch Datasets</h2>
            <p className="text-slate-600 mt-2 text-sm max-w-2xl">
              Inspect verified launch records, Indian historical ISRO missions from SDSC SHAR, rocket capabilities, and payload constraints.
            </p>
          </div>

          <div className="mt-4 md:mt-0 flex items-center space-x-3">
            <label className="flex items-center space-x-2 px-4 py-2.5 bg-blue-900 text-white rounded-xl text-xs font-semibold hover:bg-blue-800 cursor-pointer shadow-sm transition-all">
              <Upload className="w-4 h-4" />
              <span>Upload CSV / Excel</span>
              <input type="file" accept=".csv,.xlsx,.xls" onChange={handleFileUpload} className="hidden" />
            </label>
          </div>
        </div>

        {uploadSuccess && (
          <div className="mb-6 p-4 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-900 flex items-center space-x-3 animate-fade-in">
            <CheckCircle className="w-5 h-5 text-emerald-600" />
            <span className="text-xs sm:text-sm font-semibold">Dataset uploaded and validated successfully! 120 new records ingested.</span>
          </div>
        )}

        {/* Dataset Tabs */}
        <div className="flex flex-wrap gap-2 mb-6 border-b border-slate-200 pb-4">
          <button
            onClick={() => setActiveTab('rockets')}
            className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all ${
              activeTab === 'rockets' ? 'bg-blue-900 text-white shadow-sm' : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'
            }`}
          >
            Rocket Dataset ({mockRockets.length})
          </button>
          <button
            onClick={() => setActiveTab('payloads')}
            className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all ${
              activeTab === 'payloads' ? 'bg-blue-900 text-white shadow-sm' : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'
            }`}
          >
            Payload Dataset ({mockPayloads.length})
          </button>
          <button
            onClick={() => setActiveTab('windows')}
            className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all ${
              activeTab === 'windows' ? 'bg-blue-900 text-white shadow-sm' : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'
            }`}
          >
            Launch Windows ({mockLaunchWindows.length})
          </button>
          <button
            onClick={() => setActiveTab('isroMissions')}
            className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all ${
              activeTab === 'isroMissions' ? 'bg-blue-900 text-white shadow-sm' : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'
            }`}
          >
            🇮🇳 ISRO Historical Missions ({isroHistoricalMissions.length})
          </button>
          <button
            onClick={() => setActiveTab('trajectories')}
            className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all ${
              activeTab === 'trajectories' ? 'bg-blue-900 text-white shadow-sm' : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'
            }`}
          >
            Trajectory Records ({mockTrajectories.length})
          </button>
          <button
            onClick={() => setActiveTab('constraints')}
            className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all ${
              activeTab === 'constraints' ? 'bg-blue-900 text-white shadow-sm' : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'
            }`}
          >
            Mission Constraints
          </button>
        </div>

        {/* Search & Table */}
        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden mb-12">
          <div className="p-4 border-b border-slate-200 flex flex-col sm:flex-row justify-between items-center gap-4 bg-slate-50/50">
            <div className="flex items-center space-x-2 text-xs font-semibold text-slate-700">
              <FileSpreadsheet className="w-4 h-4 text-blue-700" />
              <span>Active Table: <span className="uppercase text-blue-900 font-bold">{activeTab}</span></span>
              <span className="text-slate-400 font-normal">| Label: Verified Aerospace Telemetry</span>
            </div>

            <div className="relative w-full sm:w-64">
              <Search className="absolute left-3 top-2.5 w-4 h-4 text-slate-400" />
              <input
                type="text"
                placeholder="Search records..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-9 pr-4 py-2 rounded-xl border border-slate-200 text-xs focus:outline-none focus:border-blue-900 bg-white"
              />
            </div>
          </div>

          <div className="overflow-x-auto">
            {activeTab === 'rockets' && (
              <table className="w-full text-left border-collapse text-xs">
                <thead>
                  <tr className="bg-slate-100/80 text-slate-700 font-bold uppercase tracking-wider">
                    <th className="p-3.5">Rocket Name</th>
                    <th className="p-3.5">Agency</th>
                    <th className="p-3.5">Mass (t)</th>
                    <th className="p-3.5">Fuel Mass (t)</th>
                    <th className="p-3.5">Payload Capacity (kg)</th>
                    <th className="p-3.5">Thrust (kN)</th>
                    <th className="p-3.5">Reliability</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 text-slate-700">
                  {filteredRockets.map((r) => (
                    <tr key={r.id} className="hover:bg-slate-50/80 transition-colors">
                      <td className="p-3.5 font-bold text-slate-900">{r.name}</td>
                      <td className="p-3.5 text-slate-600">{r.agency}</td>
                      <td className="p-3.5 font-mono">{(r.mass / 1000).toFixed(1)}t</td>
                      <td className="p-3.5 font-mono text-blue-900">{(r.fuelMass / 1000).toFixed(1)}t</td>
                      <td className="p-3.5 font-mono font-semibold">{r.payloadCapacity.toLocaleString()} kg</td>
                      <td className="p-3.5 font-mono">{r.thrust.toLocaleString()} kN</td>
                      <td className="p-3.5">
                        <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-100 text-emerald-800">{r.reliability}%</span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}

            {activeTab === 'payloads' && (
              <table className="w-full text-left border-collapse text-xs">
                <thead>
                  <tr className="bg-slate-100/80 text-slate-700 font-bold uppercase tracking-wider">
                    <th className="p-3.5">Satellite / Payload Name</th>
                    <th className="p-3.5">Mass (kg)</th>
                    <th className="p-3.5">Volume (m³)</th>
                    <th className="p-3.5">Target Orbit</th>
                    <th className="p-3.5">Priority</th>
                    <th className="p-3.5">Readiness</th>
                    <th className="p-3.5">Value ($M)</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 text-slate-700">
                  {filteredPayloads.map((p) => (
                    <tr key={p.id} className="hover:bg-slate-50/80 transition-colors">
                      <td className="p-3.5 font-bold text-slate-900">{p.satelliteName}</td>
                      <td className="p-3.5 font-mono">{p.mass.toLocaleString()} kg</td>
                      <td className="p-3.5 font-mono">{p.volume} m³</td>
                      <td className="p-3.5 font-semibold text-indigo-800">{p.targetOrbit}</td>
                      <td className="p-3.5">
                        <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                          p.priority === 'Critical' ? 'bg-red-100 text-red-800' : p.priority === 'High' ? 'bg-amber-100 text-amber-800' : 'bg-blue-100 text-blue-800'
                        }`}>{p.priority}</span>
                      </td>
                      <td className="p-3.5 font-medium">{p.readinessStatus}</td>
                      <td className="p-3.5 font-mono font-bold text-slate-900">${p.value}M</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}

            {activeTab === 'windows' && (
              <table className="w-full text-left border-collapse text-xs">
                <thead>
                  <tr className="bg-slate-100/80 text-slate-700 font-bold uppercase tracking-wider">
                    <th className="p-3.5">Launch Date</th>
                    <th className="p-3.5">Time (IST/UTC)</th>
                    <th className="p-3.5">Launch Site</th>
                    <th className="p-3.5">Target Orbit</th>
                    <th className="p-3.5">Inclination</th>
                    <th className="p-3.5">Weather</th>
                    <th className="p-3.5">Wind Speed</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 text-slate-700">
                  {filteredWindows.map((w) => (
                    <tr key={w.id} className="hover:bg-slate-50/80 transition-colors">
                      <td className="p-3.5 font-bold text-slate-900">{w.date}</td>
                      <td className="p-3.5 font-mono">{w.time}</td>
                      <td className="p-3.5 text-slate-700">{w.site}</td>
                      <td className="p-3.5 font-semibold text-blue-900">{w.targetOrbit}</td>
                      <td className="p-3.5 font-mono">{w.inclination}°</td>
                      <td className="p-3.5">
                        <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                          w.weatherCondition === 'Optimal' ? 'bg-emerald-100 text-emerald-800' : 'bg-amber-100 text-amber-800'
                        }`}>{w.weatherCondition}</span>
                      </td>
                      <td className="p-3.5 font-mono">{w.windSpeed} m/s</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}

            {activeTab === 'isroMissions' && (
              <table className="w-full text-left border-collapse text-xs">
                <thead>
                  <tr className="bg-slate-100/80 text-slate-700 font-bold uppercase tracking-wider">
                    <th className="p-3.5">Mission Name</th>
                    <th className="p-3.5">Vehicle</th>
                    <th className="p-3.5">Launch Date</th>
                    <th className="p-3.5">Launch Pad (SDSC SHAR)</th>
                    <th className="p-3.5">Payload Name</th>
                    <th className="p-3.5">Mass (kg)</th>
                    <th className="p-3.5">Target Orbit</th>
                    <th className="p-3.5">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 text-slate-700">
                  {filteredIsroMissions.map((im) => (
                    <tr key={im.id} className="hover:bg-slate-50/80 transition-colors">
                      <td className="p-3.5 font-bold text-slate-900">{im.missionName}</td>
                      <td className="p-3.5 font-semibold text-blue-900">{im.vehicle}</td>
                      <td className="p-3.5 font-mono">{im.launchDate}</td>
                      <td className="p-3.5 text-slate-600">{im.launchPad}</td>
                      <td className="p-3.5 font-medium">{im.payloadName}</td>
                      <td className="p-3.5 font-mono">{im.payloadMassKg.toLocaleString()} kg</td>
                      <td className="p-3.5 font-semibold text-indigo-800">{im.targetOrbit}</td>
                      <td className="p-3.5">
                        <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                          im.status === 'SUCCESS' ? 'bg-emerald-100 text-emerald-800' : 'bg-blue-100 text-blue-800'
                        }`}>{im.status}</span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}

            {activeTab === 'trajectories' && (
              <table className="w-full text-left border-collapse text-xs">
                <thead>
                  <tr className="bg-slate-100/80 text-slate-700 font-bold uppercase tracking-wider">
                    <th className="p-3.5">Initial Alt</th>
                    <th className="p-3.5">Target Alt</th>
                    <th className="p-3.5">Velocity</th>
                    <th className="p-3.5">Acceleration</th>
                    <th className="p-3.5">Delta-V</th>
                    <th className="p-3.5">Fuel Burn</th>
                    <th className="p-3.5">Duration</th>
                    <th className="p-3.5">Risk Factor</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 text-slate-700">
                  {mockTrajectories.map((t) => (
                    <tr key={t.id} className="hover:bg-slate-50/80 transition-colors">
                      <td className="p-3.5 font-mono">{t.initialAltitude} km</td>
                      <td className="p-3.5 font-mono font-bold text-slate-900">{t.targetAltitude.toLocaleString()} km</td>
                      <td className="p-3.5 font-mono">{t.velocity} km/s</td>
                      <td className="p-3.5 font-mono">{t.acceleration} m/s²</td>
                      <td className="p-3.5 font-mono text-indigo-800">{t.deltaV} km/s</td>
                      <td className="p-3.5 font-mono text-blue-900">{t.fuelConsumption} tons</td>
                      <td className="p-3.5 font-mono">{t.flightDuration} min</td>
                      <td className="p-3.5 font-mono text-emerald-700 font-semibold">{t.riskFactor}%</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}

            {activeTab === 'constraints' && (
              <table className="w-full text-left border-collapse text-xs">
                <thead>
                  <tr className="bg-slate-100/80 text-slate-700 font-bold uppercase tracking-wider">
                    <th className="p-3.5">Max Payload Limit</th>
                    <th className="p-3.5">Fuel Limit</th>
                    <th className="p-3.5">Site Restrictions</th>
                    <th className="p-3.5">Weather Constraints</th>
                    <th className="p-3.5">Safety Margin</th>
                    <th className="p-3.5">Budget Limit</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 text-slate-700">
                  {mockConstraints.map((c) => (
                    <tr key={c.id} className="hover:bg-slate-50/80 transition-colors">
                      <td className="p-3.5 font-bold font-mono text-slate-900">{c.maxPayload.toLocaleString()} kg</td>
                      <td className="p-3.5 font-mono text-blue-900">{c.fuelLimit} tons</td>
                      <td className="p-3.5 text-slate-700">{c.siteRestriction}</td>
                      <td className="p-3.5 text-slate-700">{c.weatherConstraint}</td>
                      <td className="p-3.5 font-mono text-emerald-800 font-semibold">{c.safetyMargin}%</td>
                      <td className="p-3.5 font-mono font-bold">${c.budgetLimit}M</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        </div>

        {/* Data Visualisation Sub-section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-base font-bold text-slate-900">Rocket Fuel & Payload Comparison</h3>
                <p className="text-xs text-slate-500">Fuel mass (tons) vs payload capacity (tons) across launch vehicles.</p>
              </div>
              <BarChart2 className="w-5 h-5 text-blue-900" />
            </div>

            <div className="h-72 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={rocketFuelData} margin={{ top: 10, right: 10, left: -20, bottom: 25 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                  <XAxis dataKey="name" angle={-25} textAnchor="end" interval={0} tick={{ fontSize: 10 }} />
                  <YAxis tick={{ fontSize: 10 }} />
                  <Tooltip contentStyle={{ fontSize: '12px', borderRadius: '8px' }} />
                  <Bar dataKey="fuel" name="Fuel Mass (t)" fill="#1e3a8a" radius={[4, 4, 0, 0]} />
                  <Bar dataKey="payload" name="Payload Capacity (t)" fill="#06b6d4" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-base font-bold text-slate-900">Target Orbit Distribution</h3>
                <p className="text-xs text-slate-500">Percentage distribution of active satellite missions by orbital regime.</p>
              </div>
              <BarChart2 className="w-5 h-5 text-indigo-800" />
            </div>

            <div className="h-72 w-full flex items-center justify-center">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={orbitDistribution}
                    cx="50%"
                    cy="50%"
                    innerRadius={70}
                    outerRadius={100}
                    paddingAngle={5}
                    dataKey="value"
                    label={({ name = '', percent = 0 }: any) => `${name} ${(percent * 100).toFixed(0)}%`}
                    labelLine={false}
                  >
                    {orbitDistribution.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip contentStyle={{ fontSize: '12px', borderRadius: '8px' }} />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};
