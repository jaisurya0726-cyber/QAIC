import React, { useState } from 'react';
import { Rocket, Play, Pause, RotateCcw, Compass, Activity, Globe } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid, Legend } from 'recharts';

export const TrajectorySection: React.FC = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [playbackProgress, setPlaybackProgress] = useState(65);
  const [trajectoryMode, setTrajectoryMode] = useState<'comparison' | 'classical' | 'quantum'>('comparison');

  const trajectoryData = [
    { time: 0, classicalAlt: 0, quantumAlt: 0, classicalVel: 0.1, quantumVel: 0.1, fuel: 505 },
    { time: 30, classicalAlt: 24, quantumAlt: 28, classicalVel: 1.2, quantumVel: 1.3, fuel: 470 },
    { time: 60, classicalAlt: 95, quantumAlt: 105, classicalVel: 2.8, quantumVel: 3.1, fuel: 390 },
    { time: 90, classicalAlt: 210, quantumAlt: 225, classicalVel: 4.5, quantumVel: 4.8, fuel: 280 },
    { time: 120, classicalAlt: 380, quantumAlt: 395, classicalVel: 6.2, quantumVel: 6.5, fuel: 160 },
    { time: 150, classicalAlt: 550, quantumAlt: 550, classicalVel: 7.82, quantumVel: 7.82, fuel: 45 },
  ];

  return (
    <section id="trajectory" className="py-20 bg-white border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
          <div>
            <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-blue-50 border border-blue-200 text-blue-900 text-xs font-semibold mb-3">
              <Rocket className="w-3.5 h-3.5 text-blue-700" />
              <span>Step 6: Trajectory Generation & Visualisation</span>
            </div>
            <h2 className="text-3xl font-extrabold text-slate-900 tracking-tight">Ascent & Orbital Insertion Trajectory</h2>
            <p className="text-slate-600 mt-2 text-sm max-w-2xl">
              Visualise rocket flight mechanics, atmospheric gravity turn, altitude progression, and orbital insertion velocity across classical and quantum-optimized profiles.
            </p>
          </div>

          <div className="mt-4 md:mt-0 flex items-center space-x-2 bg-slate-100 p-1.5 rounded-xl border border-slate-200 text-xs">
            <button
              onClick={() => setTrajectoryMode('comparison')}
              className={`px-3 py-1.5 rounded-lg font-semibold transition-all ${trajectoryMode === 'comparison' ? 'bg-blue-900 text-white shadow-xs' : 'text-slate-600 hover:text-slate-900'}`}
            >
              Comparison Overlay
            </button>
            <button
              onClick={() => setTrajectoryMode('classical')}
              className={`px-3 py-1.5 rounded-lg font-semibold transition-all ${trajectoryMode === 'classical' ? 'bg-blue-900 text-white shadow-xs' : 'text-slate-600 hover:text-slate-900'}`}
            >
              Classical Only
            </button>
            <button
              onClick={() => setTrajectoryMode('quantum')}
              className={`px-3 py-1.5 rounded-lg font-semibold transition-all ${trajectoryMode === 'quantum' ? 'bg-blue-900 text-white shadow-xs' : 'text-slate-600 hover:text-slate-900'}`}
            >
              QAOA Quantum Only
            </button>
          </div>
        </div>

        {/* Interactive Visualisation Card */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center mb-12">
          
          <div className="lg:col-span-5 bg-slate-950 text-white p-6 rounded-2xl border border-slate-800 shadow-xl space-y-6">
            <div className="flex items-center justify-between border-b border-slate-800 pb-4">
              <div className="flex items-center space-x-2">
                <Globe className="w-5 h-5 text-cyan-400 animate-spin" style={{ animationDuration: '15s' }} />
                <span className="text-xs font-mono font-bold tracking-wider">Flight Telemetry Simulation</span>
              </div>
              <span className="text-xs font-mono text-emerald-400 bg-emerald-950 px-2.5 py-1 rounded border border-emerald-800">T+ 09:20.4s</span>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="p-4 bg-slate-900 rounded-xl border border-slate-800">
                <div className="text-xs text-slate-400">Current Altitude</div>
                <div className="text-2xl font-bold font-mono text-cyan-300 mt-1">550.0 km</div>
                <div className="text-[10px] text-slate-500 mt-0.5">Target Orbit: Sun-Synchronous</div>
              </div>

              <div className="p-4 bg-slate-900 rounded-xl border border-slate-800">
                <div className="text-xs text-slate-400">Velocity</div>
                <div className="text-2xl font-bold font-mono text-emerald-300 mt-1">7.82 km/s</div>
                <div className="text-[10px] text-slate-500 mt-0.5">Orbital Insertion Achieved</div>
              </div>

              <div className="p-4 bg-slate-900 rounded-xl border border-slate-800">
                <div className="text-xs text-slate-400">Remaining Fuel</div>
                <div className="text-2xl font-bold font-mono text-blue-300 mt-1">45.2 tons</div>
                <div className="text-[10px] text-slate-500 mt-0.5">Efficiency +12.4% vs baseline</div>
              </div>

              <div className="p-4 bg-slate-900 rounded-xl border border-slate-800">
                <div className="text-xs text-slate-400">Flight Risk</div>
                <div className="text-2xl font-bold font-mono text-amber-300 mt-1">1.4%</div>
                <div className="text-[10px] text-slate-500 mt-0.5">All safety bounds verified</div>
              </div>
            </div>

            <div className="space-y-2 pt-2">
              <div className="flex justify-between text-xs font-mono text-slate-400">
                <span>Playback Progress</span>
                <span>{playbackProgress}%</span>
              </div>
              <input
                type="range"
                min="0"
                max="100"
                value={playbackProgress}
                onChange={(e) => setPlaybackProgress(Number(e.target.value))}
                className="w-full accent-cyan-500"
              />
            </div>

            <div className="flex items-center justify-between pt-2">
              <button
                onClick={() => setIsPlaying(!isPlaying)}
                className="px-4 py-2 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 text-xs font-bold flex items-center space-x-2 transition-all shadow-md"
              >
                {isPlaying ? <Pause className="w-4 h-4 fill-slate-950" /> : <Play className="w-4 h-4 fill-slate-950" />}
                <span>{isPlaying ? 'Pause Simulation' : 'Play Trajectory Animation'}</span>
              </button>

              <button
                onClick={() => setPlaybackProgress(0)}
                className="p-2 rounded-xl bg-slate-900 text-slate-400 hover:text-white border border-slate-800 transition-colors"
              >
                <RotateCcw className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Trajectory Recharts Graph */}
          <div className="lg:col-span-7 bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-base font-bold text-slate-900">Altitude vs Flight Time Profile</h3>
                <p className="text-xs text-slate-500">Comparison of classical trajectory vs QAOA quantum-optimized ascent.</p>
              </div>
              <Activity className="w-5 h-5 text-blue-900" />
            </div>

            <div className="h-80 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={trajectoryData} margin={{ top: 10, right: 10, left: -20, bottom: 10 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                  <XAxis dataKey="time" tick={{ fontSize: 11 }} label={{ value: 'Flight Time (s)', position: 'insideBottom', offset: -5, fontSize: 11 }} />
                  <YAxis tick={{ fontSize: 11 }} label={{ value: 'Altitude (km)', angle: -90, position: 'insideLeft', fontSize: 11 }} />
                  <Tooltip contentStyle={{ fontSize: '12px', borderRadius: '8px' }} />
                  <Legend wrapperStyle={{ fontSize: '11px', paddingTop: '10px' }} />
                  {(trajectoryMode === 'comparison' || trajectoryMode === 'classical') && (
                    <Line type="monotone" dataKey="classicalAlt" name="Classical Trajectory" stroke="#1e3a8a" strokeWidth={2.5} dot={false} />
                  )}
                  {(trajectoryMode === 'comparison' || trajectoryMode === 'quantum') && (
                    <Line type="monotone" dataKey="quantumAlt" name="QAOA Quantum Trajectory" stroke="#06b6d4" strokeWidth={2.5} strokeDasharray="4 4" dot={false} />
                  )}
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
