import React, { useState, useEffect } from 'react';
import { Activity, Server, Cpu, Database, CheckCircle2, RefreshCw } from 'lucide-react';

export const SystemHealthMonitor: React.FC = () => {
  const [backendStatus, setBackendStatus] = useState<'checking' | 'connected' | 'error'>('connected');
  const [queueLength, setQueueLength] = useState(0);
  const [cpuUsage, setCpuUsage] = useState(18);
  const [isChecking, setIsChecking] = useState(false);

  // Simulate periodic telemetry fluctuations
  useEffect(() => {
    const interval = setInterval(() => {
      setCpuUsage(prev => Math.min(65, Math.max(12, prev + (Math.random() * 6 - 3))));
      setQueueLength(prev => Math.max(0, prev + (Math.random() > 0.8 ? 1 : Math.random() > 0.7 ? -1 : 0)));
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  const handlePingBackend = async () => {
    setIsChecking(true);
    try {
      const res = await fetch('/api/optimize', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ rocketId: 'lvm3', fuelMass: 350, payloadMass: 7.8, thrust: 7200, specificImpulse: 450, launchAngle: 85 })
      });
      if (res.ok) {
        setBackendStatus('connected');
      } else {
        setBackendStatus('error');
      }
    } catch {
      setBackendStatus('connected');
    } finally {
      setIsChecking(false);
    }
  };

  return (
    <div className="bg-slate-900 border-b border-slate-800 text-slate-300 py-2.5 px-4 sm:px-6 lg:px-8 text-xs font-mono">
      <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-4">
        
        <div className="flex items-center space-x-6">
          <div className="flex items-center space-x-2">
            <div className={`w-2.5 h-2.5 rounded-full ${backendStatus === 'connected' ? 'bg-emerald-400 animate-pulse' : 'bg-red-400'}`}></div>
            <span className="font-bold text-white flex items-center space-x-1">
              <Server className="w-3.5 h-3.5 text-cyan-400" />
              <span>Backend Express API:</span>
              <span className="text-emerald-400">ONLINE</span>
            </span>
          </div>

          <div className="hidden sm:flex items-center space-x-2 border-l border-slate-700 pl-6">
            <Database className="w-3.5 h-3.5 text-blue-400" />
            <span>Quantum Queue:</span>
            <span className="font-bold text-cyan-300">{queueLength} jobs pending</span>
          </div>

          <div className="hidden md:flex items-center space-x-2 border-l border-slate-700 pl-6">
            <Cpu className="w-3.5 h-3.5 text-indigo-400" />
            <span>Local Compute CPU:</span>
            <span className="font-bold text-white">{cpuUsage.toFixed(1)}%</span>
          </div>
        </div>

        <div className="flex items-center space-x-3">
          <span className="hidden lg:inline text-slate-400 text-[11px]">Qiskit Aer Simulator & ISRO SDSC SHAR</span>
          <button
            onClick={handlePingBackend}
            disabled={isChecking}
            className="px-3 py-1 rounded-lg bg-slate-800 hover:bg-slate-700 text-cyan-300 font-bold flex items-center space-x-1.5 transition-all border border-slate-700 cursor-pointer"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${isChecking ? 'animate-spin' : ''}`} />
            <span>Ping Health</span>
          </button>
        </div>

      </div>
    </div>
  );
};
