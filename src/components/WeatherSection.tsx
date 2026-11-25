import React, { useState } from 'react';
import { CloudSun, Wind, Thermometer, Droplets, Gauge, AlertCircle, CheckCircle2, RefreshCw, Upload } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from 'recharts';

export const WeatherSection: React.FC = () => {
  const [windSpeed, setWindSpeed] = useState<number>(4.2);
  const [temperature, setTemperature] = useState<number>(26.5);
  const [pressure, setPressure] = useState<number>(1013.2);
  const [precipitation, setPrecipitation] = useState<number>(0.0);
  const [humidity, setHumidity] = useState<number>(62);
  const [cloudCondition, setCloudCondition] = useState<string>('Clear / Scattered');
  const [isLiveApi, setIsLiveApi] = useState<boolean>(false);

  // Feasibility evaluation
  const isWindOk = windSpeed < 12.0;
  const isTempOk = temperature >= 5 && temperature <= 38;
  const isPrecipOk = precipitation === 0.0;
  const isHumidityOk = humidity <= 85;

  const overallFeasible = isWindOk && isTempOk && isPrecipOk && isHumidityOk;

  const windData = [
    { time: '06:00 UTC', speed: 3.5 },
    { time: '09:00 UTC', speed: 4.2 },
    { time: '12:00 UTC', speed: 5.8 },
    { time: '15:00 UTC', speed: 4.0 },
    { time: '18:00 UTC', speed: 3.1 },
  ];

  return (
    <section id="step-15-weather" className="py-20 bg-white border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-blue-50 border border-blue-200 text-blue-900 text-xs font-semibold mb-3">
            <CloudSun className="w-3.5 h-3.5 text-blue-700" />
            <span>Step 15: Weather and Launch Feasibility Analysis</span>
          </div>
          <h2 className="text-3xl font-extrabold text-slate-900 tracking-tight">Atmospheric Conditions & Range Feasibility</h2>
          <p className="text-slate-600 mt-2 text-sm">
            Evaluate meteorological parameters (wind shear, temperature, precipitation, barometric pressure) against SDSC SHAR launch constraints.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start mb-12">
          
          {/* Weather Inputs */}
          <div className="lg:col-span-5 bg-slate-50 p-6 rounded-2xl border border-slate-200 space-y-6">
            <div className="flex items-center justify-between border-b border-slate-200 pb-3">
              <h3 className="text-base font-bold text-slate-900">Weather Parameter Inputs</h3>
              <span className={`text-[10px] font-mono px-2.5 py-1 rounded-full font-bold ${isLiveApi ? 'bg-cyan-100 text-cyan-800' : 'bg-amber-100 text-amber-800'}`}>
                {isLiveApi ? 'Live API Connected' : 'Simulated / Sample Data'}
              </span>
            </div>

            <div className="space-y-4 text-xs">
              <div>
                <label className="block font-semibold text-slate-700 mb-1">Wind Speed: {windSpeed} m/s (Limit &lt; 12 m/s)</label>
                <input
                  type="range"
                  min="0"
                  max="20"
                  step="0.5"
                  value={windSpeed}
                  onChange={(e) => setWindSpeed(Number(e.target.value))}
                  className="w-full accent-blue-900"
                />
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">Temperature: {temperature} °C</label>
                <input
                  type="range"
                  min="-10"
                  max="45"
                  step="0.5"
                  value={temperature}
                  onChange={(e) => setTemperature(Number(e.target.value))}
                  className="w-full accent-blue-900"
                />
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">Precipitation: {precipitation} mm/h</label>
                <input
                  type="range"
                  min="0"
                  max="10"
                  step="0.5"
                  value={precipitation}
                  onChange={(e) => setPrecipitation(Number(e.target.value))}
                  className="w-full accent-blue-900"
                />
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">Relative Humidity: {humidity}%</label>
                <input
                  type="range"
                  min="10"
                  max="100"
                  step="1"
                  value={humidity}
                  onChange={(e) => setHumidity(Number(e.target.value))}
                  className="w-full accent-blue-900"
                />
              </div>

              <div className="pt-2 flex space-x-3">
                <button
                  onClick={() => setIsLiveApi(!isLiveApi)}
                  className="flex-1 py-2 rounded-xl bg-blue-900 text-white font-semibold hover:bg-blue-800 transition-colors"
                >
                  {isLiveApi ? 'Switch to Sample Data' : 'Connect Weather API'}
                </button>
              </div>
            </div>
          </div>

          {/* Feasibility Indicator & Chart */}
          <div className="lg:col-span-7 space-y-6">
            <div className={`p-6 rounded-2xl border flex items-center justify-between ${
              overallFeasible ? 'bg-emerald-50 border-emerald-200 text-emerald-950' : 'bg-red-50 border-red-200 text-red-950'
            }`}>
              <div className="flex items-center space-x-4">
                {overallFeasible ? (
                  <CheckCircle2 className="w-8 h-8 text-emerald-600 shrink-0" />
                ) : (
                  <AlertCircle className="w-8 h-8 text-red-600 shrink-0" />
                )}
                <div>
                  <div className="text-sm font-bold">
                    {overallFeasible ? 'SUITABLE: All Launch Criteria Satisfied' : 'UNSUITABLE: Hard Constraint Violation'}
                  </div>
                  <div className="text-xs opacity-80 mt-0.5">
                    {overallFeasible ? 'Atmospheric wind shear, temperature, and precipitation within safe limits.' : 'One or more meteorological parameters exceed range safety thresholds.'}
                  </div>
                </div>
              </div>
              <span className={`px-3 py-1 rounded-full text-xs font-bold ${overallFeasible ? 'bg-emerald-600 text-white' : 'bg-red-600 text-white'}`}>
                {overallFeasible ? 'GO FOR LAUNCH' : 'HOLD / NO-GO'}
              </span>
            </div>

            <div className="bg-slate-50 p-6 rounded-2xl border border-slate-200 space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-base font-bold text-slate-900">Wind Speed Forecast (24h Window)</h3>
                <Wind className="w-5 h-5 text-blue-900" />
              </div>

              <div className="h-60 w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={windData} margin={{ top: 10, right: 10, left: -20, bottom: 10 }}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                    <XAxis dataKey="time" tick={{ fontSize: 11 }} />
                    <YAxis tick={{ fontSize: 11 }} />
                    <Tooltip contentStyle={{ fontSize: '12px', borderRadius: '8px' }} />
                    <Bar dataKey="speed" name="Wind Speed (m/s)" fill="#1e3a8a" radius={[4, 4, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
