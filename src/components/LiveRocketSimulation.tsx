import React, { useState, useEffect, useRef } from 'react';
import { Rocket, Play, Pause, RotateCcw, Activity, ShieldCheck, Flame, Compass, Zap } from 'lucide-react';

export const LiveRocketSimulation: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [isRunning, setIsRunning] = useState(false);
  const [timeElapsed, setTimeElapsed] = useState(0); // seconds
  const [altitude, setAltitude] = useState(0); // km
  const [velocity, setVelocity] = useState(0.1); // km/s
  const [acceleration, setAcceleration] = useState(0); // m/s^2
  const [stage, setStage] = useState<'Pad' | 'Stage 1 Burn' | 'Booster Separation' | 'Fairing Jettison' | 'Stage 2 Burn' | 'Orbit Insertion'>('Pad');
  const [fuelPercentage, setFuelPercentage] = useState(100);

  // Simulation loop
  useEffect(() => {
    let animationFrameId: number;
    let lastTime = performance.now();

    const render = (now: number) => {
      const dt = (now - lastTime) / 1000;
      lastTime = now;

      if (isRunning) {
        setTimeElapsed(prev => {
          const next = prev + dt * 5; // accelerated simulation speed
          if (next >= 120) {
            setIsRunning(false);
            return 120;
          }
          return next;
        });

        // Update telemetry based on time
        const t = timeElapsed;
        if (t < 15) {
          setStage('Pad');
          setAltitude(0);
          setVelocity(0.1);
          setAcceleration(12.4);
          setFuelPercentage(100);
        } else if (t < 40) {
          setStage('Stage 1 Burn');
          const alt = Math.pow(t - 15, 1.8) * 0.8;
          setAltitude(Math.min(alt, 120));
          setVelocity(0.1 + (t - 15) * 0.15);
          setAcceleration(22.5);
          setFuelPercentage(Math.max(100 - (t - 15) * 1.5, 65));
        } else if (t < 50) {
          setStage('Booster Separation');
          const alt = 120 + (t - 40) * 8;
          setAltitude(alt);
          setVelocity(3.2 + (t - 40) * 0.08);
          setAcceleration(18.2);
          setFuelPercentage(Math.max(65 - (t - 40) * 0.8, 50));
        } else if (t < 65) {
          setStage('Fairing Jettison');
          const alt = 200 + (t - 50) * 14;
          setAltitude(alt);
          setVelocity(4.5 + (t - 50) * 0.1);
          setAcceleration(25.0);
          setFuelPercentage(Math.max(50 - (t - 50) * 1.2, 30));
        } else if (t < 100) {
          setStage('Stage 2 Burn');
          const alt = 410 + (t - 65) * 18;
          setAltitude(alt);
          setVelocity(6.2 + (t - 65) * 0.05);
          setAcceleration(14.0);
          setFuelPercentage(Math.max(30 - (t - 65) * 0.6, 5));
        } else {
          setStage('Orbit Insertion');
          setAltitude(550);
          setVelocity(7.82);
          setAcceleration(0);
          setFuelPercentage(2);
        }
      }

      // Draw canvas scene
      const canvas = canvasRef.current;
      if (canvas) {
        const ctx = canvas.getContext('2d');
        if (ctx) {
          ctx.clearRect(0, 0, canvas.width, canvas.height);

          // Sky gradient background (day to upper atmosphere dark blue)
          const skyGrad = ctx.createLinearGradient(0, 0, 0, canvas.height);
          const progress = Math.min(timeElapsed / 100, 1);
          skyGrad.addColorStop(0, `rgb(${Math.floor(10 + progress * 5)}, ${Math.floor(20 + progress * 20)}, ${Math.floor(50 + progress * 80)})`);
          skyGrad.addColorStop(1, `rgb(${Math.floor(135 - progress * 100)}, ${Math.floor(206 - progress * 150)}, ${Math.floor(235 - progress * 200)})`);
          ctx.fillStyle = skyGrad;
          ctx.fillRect(0, 0, canvas.width, canvas.height);

          // Draw Stars if high up
          if (progress > 0.4) {
            ctx.fillStyle = '#ffffff';
            for (let i = 0; i < 40; i++) {
              const sx = (i * 37) % canvas.width;
              const sy = (i * 23) % (canvas.height * 0.6);
              ctx.fillRect(sx, sy, 1.5, 1.5);
            }
          }

          // Draw Earth curvature at bottom if high up
          if (progress > 0.3) {
            ctx.fillStyle = '#1e3a8a';
            ctx.beginPath();
            ctx.arc(canvas.width / 2, canvas.height + 1800, 1900, 0, Math.PI * 2);
            ctx.fill();
          } else {
            // Ground
            ctx.fillStyle = '#15803d';
            ctx.fillRect(0, canvas.height - 40, canvas.width, 40);
            // Launch Pad Gantry
            ctx.fillStyle = '#475569';
            ctx.fillRect(canvas.width / 2 - 50, canvas.height - 180, 16, 140);
            ctx.fillRect(canvas.width / 2 + 34, canvas.height - 180, 16, 140);
            ctx.fillRect(canvas.width / 2 - 60, canvas.height - 120, 120, 12);
          }

          // Rocket Position
          const rocketX = canvas.width / 2;
          const rocketY = Math.max(80, canvas.height - 70 - (timeElapsed / 120) * (canvas.height - 150));

          // Draw Rocket Body (LVM3 style)
          ctx.fillStyle = '#f8fafc';
          ctx.fillRect(rocketX - 12, rocketY - 50, 24, 90);

          // Nosecone
          ctx.fillStyle = '#3b82f6';
          ctx.beginPath();
          ctx.moveTo(rocketX - 12, rocketY - 50);
          ctx.lineTo(rocketX, rocketY - 75);
          ctx.lineTo(rocketX + 12, rocketY - 50);
          ctx.closePath();
          ctx.fill();

          // Side boosters if stage 1
          if (timeElapsed < 45) {
            ctx.fillStyle = '#cbd5e1';
            ctx.fillRect(rocketX - 26, rocketY - 30, 10, 70);
            ctx.fillRect(rocketX + 16, rocketY - 30, 10, 70);
          }

          // Exhaust Flame Particles if running & lifting off
          if (isRunning && timeElapsed > 2 && stage !== 'Orbit Insertion') {
            ctx.fillStyle = '#f97316';
            ctx.beginPath();
            ctx.moveTo(rocketX - 10, rocketY + 40);
            ctx.lineTo(rocketX, rocketY + 90 + Math.random() * 30);
            ctx.lineTo(rocketX + 10, rocketY + 40);
            ctx.closePath();
            ctx.fill();

            ctx.fillStyle = '#facc15';
            ctx.beginPath();
            ctx.moveTo(rocketX - 6, rocketY + 40);
            ctx.lineTo(rocketX, rocketY + 65 + Math.random() * 20);
            ctx.lineTo(rocketX + 6, rocketY + 40);
            ctx.closePath();
            ctx.fill();
          }
        }
      }

      animationFrameId = requestAnimationFrame(render);
    };

    animationFrameId = requestAnimationFrame(render);
    return () => cancelAnimationFrame(animationFrameId);
  }, [isRunning, timeElapsed]);

  const handleStart = () => setIsRunning(true);
  const handlePause = () => setIsRunning(false);
  const handleReset = () => {
    setIsRunning(false);
    setTimeElapsed(0);
    setAltitude(0);
    setVelocity(0.1);
    setAcceleration(0);
    setStage('Pad');
    setFuelPercentage(100);
  };

  return (
    <section id="trajectory" className="py-20 bg-white border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
          <div>
            <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-blue-50 border border-blue-200 text-blue-900 text-xs font-semibold mb-3">
              <Rocket className="w-3.5 h-3.5 text-blue-700" />
              <span>Step 6: Live Rocket Launch Simulation & Visualisation</span>
            </div>
            <h2 className="text-3xl font-extrabold text-slate-900 tracking-tight">SDSC SHAR ISRO Live Launch Simulation</h2>
            <p className="text-slate-600 mt-2 text-sm max-w-2xl">
              Experience a real-time animated simulation of LVM3 lifting off from Sriharikota, complete with stage separation, atmospheric ascent, and orbital insertion telemetry.
            </p>
          </div>

          <div className="mt-4 md:mt-0 flex items-center space-x-3">
            <button
              onClick={isRunning ? handlePause : handleStart}
              className={`px-5 py-2.5 rounded-xl font-bold text-xs uppercase tracking-wider flex items-center space-x-2 shadow-md transition-all ${
                isRunning ? 'bg-amber-600 hover:bg-amber-500 text-white' : 'bg-blue-900 hover:bg-blue-800 text-white'
              }`}
            >
              {isRunning ? <Pause className="w-4 h-4 fill-white" /> : <Play className="w-4 h-4 fill-white" />}
              <span>{isRunning ? 'Pause Simulation' : 'Start Live Launch'}</span>
            </button>

            <button
              onClick={handleReset}
              className="p-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 transition-colors"
            >
              <RotateCcw className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Simulation Canvas & Gauges */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          
          <div className="lg:col-span-7 bg-slate-950 rounded-2xl border border-slate-800 p-4 shadow-xl relative overflow-hidden">
            <div className="absolute top-4 left-4 z-10 flex items-center space-x-2 bg-slate-900/80 backdrop-blur-md px-3 py-1.5 rounded-xl border border-slate-700">
              <div className={`w-3 h-3 rounded-full ${isRunning ? 'bg-emerald-500 animate-pulse' : 'bg-amber-500'}`}></div>
              <span className="text-xs font-mono font-bold text-white">MISSION TIME: T+ {timeElapsed.toFixed(1)}s</span>
            </div>

            <div className="absolute top-4 right-4 z-10 bg-blue-950/80 backdrop-blur-md px-3 py-1.5 rounded-xl border border-blue-800 text-cyan-300 text-xs font-mono font-bold">
              STAGE: {stage}
            </div>

            <canvas
              ref={canvasRef}
              width={650}
              height={440}
              className="w-full h-[440px] rounded-xl bg-slate-900 object-cover"
            />
          </div>

          {/* Telemetry Dashboard */}
          <div className="lg:col-span-5 space-y-4">
            <div className="bg-slate-50 p-6 rounded-2xl border border-slate-200 shadow-sm space-y-6">
              <div className="flex items-center justify-between border-b border-slate-200 pb-3">
                <h3 className="text-base font-bold text-slate-900 flex items-center space-x-2">
                  <Activity className="w-5 h-5 text-blue-900" />
                  <span>Real-Time Telemetry</span>
                </h3>
                <span className="text-xs font-mono bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded font-bold">LIVE TELEMETRY</span>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="p-4 bg-white rounded-xl border border-slate-200 shadow-xs">
                  <div className="text-xs text-slate-500 font-medium">Altitude</div>
                  <div className="text-2xl font-bold font-mono text-blue-900 mt-1">{altitude.toFixed(1)} km</div>
                  <div className="text-[10px] text-slate-400 mt-0.5">Target: 550 km SSO</div>
                </div>

                <div className="p-4 bg-white rounded-xl border border-slate-200 shadow-xs">
                  <div className="text-xs text-slate-500 font-medium">Velocity</div>
                  <div className="text-2xl font-bold font-mono text-cyan-700 mt-1">{velocity.toFixed(2)} km/s</div>
                  <div className="text-[10px] text-slate-400 mt-0.5">Orbital: 7.82 km/s</div>
                </div>

                <div className="p-4 bg-white rounded-xl border border-slate-200 shadow-xs">
                  <div className="text-xs text-slate-500 font-medium">Acceleration</div>
                  <div className="text-2xl font-bold font-mono text-indigo-900 mt-1">{acceleration.toFixed(1)} m/s²</div>
                  <div className="text-[10px] text-slate-400 mt-0.5">Max: 35 m/s²</div>
                </div>

                <div className="p-4 bg-white rounded-xl border border-slate-200 shadow-xs">
                  <div className="text-xs text-slate-500 font-medium">Fuel Remaining</div>
                  <div className="text-2xl font-bold font-mono text-emerald-700 mt-1">{fuelPercentage.toFixed(0)}%</div>
                  <div className="text-[10px] text-slate-400 mt-0.5">Propellant mass</div>
                </div>
              </div>

              <div className="space-y-2 pt-2">
                <div className="flex justify-between text-xs font-semibold text-slate-700">
                  <span>Mission Flight Progress</span>
                  <span>{Math.min(100, (timeElapsed / 120) * 100).toFixed(0)}%</span>
                </div>
                <div className="w-full bg-slate-200 h-2.5 rounded-full overflow-hidden">
                  <div
                    className="bg-blue-900 h-full transition-all duration-300"
                    style={{ width: `${Math.min(100, (timeElapsed / 120) * 100)}%` }}
                  ></div>
                </div>
              </div>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
