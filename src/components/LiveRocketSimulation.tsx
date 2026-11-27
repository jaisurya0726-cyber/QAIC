import React, { useState, useEffect, useRef } from 'react';
import { Rocket, Play, Pause, RotateCcw, Activity, Globe, SkipBack, SkipForward, Gauge } from 'lucide-react';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { RoomEnvironment } from 'three/examples/jsm/environments/RoomEnvironment.js';
import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer.js';
import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass.js';
import { UnrealBloomPass } from 'three/examples/jsm/postprocessing/UnrealBloomPass.js';

export const LiveRocketSimulation: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const container3DRef = useRef<HTMLDivElement | null>(null);
  
  const [viewMode, setViewMode] = useState<'2d' | '3d'>('2d');
  const [isRunning, setIsRunning] = useState(false);
  const [speedMultiplier, setSpeedMultiplier] = useState<number>(1);
  const [timeElapsed, setTimeElapsed] = useState(0); // 0 to 120s
  const [altitude, setAltitude] = useState(0);
  const [velocity, setVelocity] = useState(0.1);
  const [acceleration, setAcceleration] = useState(0);
  const [stage, setStage] = useState<'Pad' | 'Stage 1 Burn' | 'Booster Separation' | 'Fairing Jettison' | 'Stage 2 Burn' | 'Orbit Insertion'>('Pad');
  const [fuelPercentage, setFuelPercentage] = useState(100);

  // Three.js refs for animation updates
  const rocketGroupRef = useRef<THREE.Group | null>(null);
  const earthMeshRef = useRef<THREE.Mesh | null>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const galaxyGroupRef = useRef<THREE.Group | null>(null);

  const updateTelemetryForTime = (t: number) => {
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
  };

  // 2D Canvas Simulation Loop
  useEffect(() => {
    if (viewMode !== '2d') return;
    let animationFrameId: number;
    let lastTime = performance.now();

    const render2D = (now: number) => {
      const dt = (now - lastTime) / 1000;
      lastTime = now;

      if (isRunning) {
        setTimeElapsed(prev => {
          const next = prev + dt * 5 * speedMultiplier;
          if (next >= 120) {
            setIsRunning(false);
            return 120;
          }
          updateTelemetryForTime(next);
          return next;
        });
      }

      const canvas = canvasRef.current;
      if (canvas) {
        const ctx = canvas.getContext('2d');
        if (ctx) {
          ctx.clearRect(0, 0, canvas.width, canvas.height);

          const skyGrad = ctx.createLinearGradient(0, 0, 0, canvas.height);
          const progress = Math.min(timeElapsed / 100, 1);
          skyGrad.addColorStop(0, `rgb(${Math.floor(10 + progress * 5)}, ${Math.floor(20 + progress * 20)}, ${Math.floor(50 + progress * 80)})`);
          skyGrad.addColorStop(1, `rgb(${Math.floor(135 - progress * 100)}, ${Math.floor(206 - progress * 150)}, ${Math.floor(235 - progress * 200)})`);
          ctx.fillStyle = skyGrad;
          ctx.fillRect(0, 0, canvas.width, canvas.height);

          if (progress > 0.4) {
            ctx.fillStyle = '#ffffff';
            for (let i = 0; i < 40; i++) {
              const sx = (i * 37) % canvas.width;
              const sy = (i * 23) % (canvas.height * 0.6);
              ctx.fillRect(sx, sy, 1.5, 1.5);
            }
          }

          if (progress > 0.3) {
            ctx.fillStyle = '#1e3a8a';
            ctx.beginPath();
            ctx.arc(canvas.width / 2, canvas.height + 1800, 1900, 0, Math.PI * 2);
            ctx.fill();
          } else {
            ctx.fillStyle = '#15803d';
            ctx.fillRect(0, canvas.height - 40, canvas.width, 40);
            ctx.fillStyle = '#475569';
            ctx.fillRect(canvas.width / 2 - 50, canvas.height - 180, 16, 140);
            ctx.fillRect(canvas.width / 2 + 34, canvas.height - 180, 16, 140);
            ctx.fillRect(canvas.width / 2 - 60, canvas.height - 120, 120, 12);
          }

          const rocketX = canvas.width / 2;
          const rocketY = Math.max(80, canvas.height - 70 - (timeElapsed / 120) * (canvas.height - 150));

          ctx.fillStyle = '#f8fafc';
          ctx.fillRect(rocketX - 12, rocketY - 50, 24, 90);

          ctx.fillStyle = '#3b82f6';
          ctx.beginPath();
          ctx.moveTo(rocketX - 12, rocketY - 50);
          ctx.lineTo(rocketX, rocketY - 75);
          ctx.lineTo(rocketX + 12, rocketY - 50);
          ctx.closePath();
          ctx.fill();

          if (timeElapsed < 45) {
            ctx.fillStyle = '#cbd5e1';
            ctx.fillRect(rocketX - 26, rocketY - 30, 10, 70);
            ctx.fillRect(rocketX + 16, rocketY - 30, 10, 70);
          }

          if ((isRunning || timeElapsed > 0) && timeElapsed < 115 && stage !== 'Orbit Insertion') {
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

      animationFrameId = requestAnimationFrame(render2D);
    };

    animationFrameId = requestAnimationFrame(render2D);
    return () => cancelAnimationFrame(animationFrameId);
  }, [viewMode, isRunning, timeElapsed, stage, speedMultiplier]);

  // 3D Earth Orbit Three.js Initialization & Loop (with Milky Way Galaxy Background)
  useEffect(() => {
    if (viewMode !== '3d' || !container3DRef.current) return;

    const container = container3DRef.current;
    container.innerHTML = '';

    const width = container.clientWidth || 650;
    const height = container.clientHeight || 400;

    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0x020617);
    scene.fog = new THREE.FogExp2(0x020617, 0.002);

    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 2000);
    camera.position.set(0, 15, 32);

    const renderer = new THREE.WebGLRenderer({ antialias: true, powerPreference: 'high-performance' });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.shadowMap.enabled = true;
    container.appendChild(renderer.domElement);
    rendererRef.current = renderer;

    const pmremGenerator = new THREE.PMREMGenerator(renderer);
    scene.environment = pmremGenerator.fromScene(new RoomEnvironment(), 0.04).texture;
    pmremGenerator.dispose();

    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.05;
    controls.minDistance = 8;
    controls.maxDistance = 600;

    // Post-processing EffectComposer & UnrealBloomPass
    const renderScene = new RenderPass(scene, camera);
    const bloomPass = new UnrealBloomPass(
      new THREE.Vector2(width, height),
      1.4,
      0.4,
      0.7
    );
    const composer = new EffectComposer(renderer);
    composer.addPass(renderScene);
    composer.addPass(bloomPass);

    // Lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.4);
    scene.add(ambientLight);

    const sunLight = new THREE.DirectionalLight(0xffffff, 1.8);
    sunLight.position.set(40, 30, 30);
    sunLight.castShadow = true;
    scene.add(sunLight);

    // Starfield Background
    const starsCount = 1500;
    const starGeometry = new THREE.BufferGeometry();
    const starPositions = new Float32Array(starsCount * 3);
    const starColors = new Float32Array(starsCount * 3);

    for (let i = 0; i < starsCount * 3; i += 3) {
      starPositions[i] = (Math.random() - 0.5) * 800;
      starPositions[i + 1] = (Math.random() - 0.5) * 800;
      starPositions[i + 2] = (Math.random() - 0.5) * 800;

      const shade = 0.7 + Math.random() * 0.3;
      starColors[i] = shade;
      starColors[i + 1] = shade;
      starColors[i + 2] = 1.0;
    }

    starGeometry.setAttribute('position', new THREE.BufferAttribute(starPositions, 3));
    starGeometry.setAttribute('color', new THREE.BufferAttribute(starColors, 3));

    const starMaterial = new THREE.PointsMaterial({
      size: 1.5,
      vertexColors: true,
      transparent: true,
      opacity: 0.9,
    });
    const starField = new THREE.Points(starGeometry, starMaterial);
    scene.add(starField);

    // Milky Way Galaxy Background
    const galaxyGroup = new THREE.Group();
    const galaxyParticleCount = 8000;
    const galaxyGeo = new THREE.BufferGeometry();
    const galaxyPositions = new Float32Array(galaxyParticleCount * 3);
    const galaxyColors = new Float32Array(galaxyParticleCount * 3);

    const colorInside = new THREE.Color(0xffedd5);
    const colorOutside = new THREE.Color(0x38bdf8);

    for (let i = 0; i < galaxyParticleCount; i++) {
      const radius = Math.random() * 250;
      const spinAngle = radius * 0.04;
      const branchAngle = ((i % 4) / 4) * Math.PI * 2;

      const randomX = Math.pow(Math.random(), 3) * (Math.random() < 0.5 ? 1 : -1) * 25;
      const randomY = Math.pow(Math.random(), 3) * (Math.random() < 0.5 ? 1 : -1) * 15;
      const randomZ = Math.pow(Math.random(), 3) * (Math.random() < 0.5 ? 1 : -1) * 25;

      const x = Math.cos(branchAngle + spinAngle) * radius + randomX;
      const y = randomY;
      const z = Math.sin(branchAngle + spinAngle) * radius + randomZ;

      galaxyPositions[i * 3] = x;
      galaxyPositions[i * 3 + 1] = y;
      galaxyPositions[i * 3 + 2] = z;

      const mixedColor = colorInside.clone().lerp(colorOutside, radius / 250);
      galaxyColors[i * 3] = mixedColor.r;
      galaxyColors[i * 3 + 1] = mixedColor.g;
      galaxyColors[i * 3 + 2] = mixedColor.b;
    }

    galaxyGeo.setAttribute('position', new THREE.BufferAttribute(galaxyPositions, 3));
    galaxyGeo.setAttribute('color', new THREE.BufferAttribute(galaxyColors, 3));

    const galaxyMaterial = new THREE.PointsMaterial({
      size: 2.0,
      vertexColors: true,
      transparent: true,
      opacity: 0.9,
      blending: THREE.AdditiveBlending,
    });
    const galaxyPoints = new THREE.Points(galaxyGeo, galaxyMaterial);
    galaxyGroup.add(galaxyPoints);
    galaxyGroup.position.set(0, 250, -450);
    galaxyGroup.rotation.x = Math.PI / 5;
    galaxyGroup.rotation.z = Math.PI / 8;
    scene.add(galaxyGroup);
    galaxyGroupRef.current = galaxyGroup;

    // Solar System Elements
    const sunGeo = new THREE.SphereGeometry(15, 64, 64);
    const sunMat = new THREE.MeshBasicMaterial({ color: 0xffedd5 });
    const distantSun = new THREE.Mesh(sunGeo, sunMat);
    distantSun.position.set(160, 80, -220);
    scene.add(distantSun);

    const marsGeo = new THREE.SphereGeometry(3.5, 32, 32);
    const marsMat = new THREE.MeshStandardMaterial({ color: 0xef4444, roughness: 0.8 });
    const distantMars = new THREE.Mesh(marsGeo, marsMat);
    distantMars.position.set(-110, 50, -140);
    scene.add(distantMars);

    const jupGeo = new THREE.SphereGeometry(6.5, 32, 32);
    const jupMat = new THREE.MeshStandardMaterial({ color: 0xd97706, roughness: 0.7 });
    const distantJupiter = new THREE.Mesh(jupGeo, jupMat);
    distantJupiter.position.set(120, -60, -160);
    scene.add(distantJupiter);

    const saturnGroup = new THREE.Group();
    const saturnGeo = new THREE.SphereGeometry(5.0, 32, 32);
    const saturnMat = new THREE.MeshStandardMaterial({ color: 0xfde047, roughness: 0.6 });
    const saturnMesh = new THREE.Mesh(saturnGeo, saturnMat);
    saturnGroup.add(saturnMesh);

    const ringGeo = new THREE.RingGeometry(6.5, 10.5, 32);
    const ringMat = new THREE.MeshBasicMaterial({ color: 0xca8a04, side: THREE.DoubleSide, transparent: true, opacity: 0.8 });
    const ringMesh = new THREE.Mesh(ringGeo, ringMat);
    ringMesh.rotation.x = Math.PI / 2.3;
    saturnGroup.add(ringMesh);
    saturnGroup.position.set(-130, -50, -180);
    scene.add(saturnGroup);

    // Create Earth (Sphere)
    const earthGeometry = new THREE.SphereGeometry(6, 64, 64);
    const earthCanvas = document.createElement('canvas');
    earthCanvas.width = 1024;
    earthCanvas.height = 512;
    const eCtx = earthCanvas.getContext('2d');
    if (eCtx) {
      eCtx.fillStyle = '#1e3a8a';
      eCtx.fillRect(0, 0, 1024, 512);
      eCtx.fillStyle = '#15803d';
      eCtx.beginPath();
      eCtx.arc(300, 200, 120, 0, Math.PI * 2);
      eCtx.arc(700, 300, 150, 0, Math.PI * 2);
      eCtx.arc(500, 120, 90, 0, Math.PI * 2);
      eCtx.fill();
    }
    const earthTexture = new THREE.CanvasTexture(earthCanvas);
    earthTexture.colorSpace = THREE.SRGBColorSpace;

    const earthMaterial = new THREE.MeshStandardMaterial({
      map: earthTexture,
      roughness: 0.8,
      metalness: 0.1,
    });
    const earthMesh = new THREE.Mesh(earthGeometry, earthMaterial);
    earthMesh.receiveShadow = true;
    scene.add(earthMesh);
    earthMeshRef.current = earthMesh;

    const atmosGeo = new THREE.SphereGeometry(6.3, 64, 64);
    const atmosMat = new THREE.MeshBasicMaterial({
      color: 0x38bdf8,
      transparent: true,
      opacity: 0.15,
      side: THREE.BackSide,
    });
    scene.add(new THREE.Mesh(atmosGeo, atmosMat));

    // Multiple Revolving Satellites Setup
    const satellitesData = [
      { radius: 8.2, speed: 0.7, color: 0x38bdf8, inclination: 0.2 },
      { radius: 9.8, speed: 0.5, color: 0xfacc15, inclination: -0.4 },
      { radius: 11.5, speed: 0.35, color: 0xf43f5e, inclination: 0.7 },
      { radius: 9.0, speed: 0.6, color: 0x10b981, inclination: -0.3 },
      { radius: 10.8, speed: 0.45, color: 0xa855f7, inclination: 0.1 }
    ];

    const satelliteMeshes: { group: THREE.Group; radius: number; speed: number; inclination: number }[] = [];

    satellitesData.forEach((sat) => {
      const satGroup = new THREE.Group();
      
      const bodyGeo = new THREE.BoxGeometry(0.25, 0.25, 0.4);
      const bodyMat = new THREE.MeshStandardMaterial({ color: sat.color, metalness: 0.9, roughness: 0.1 });
      const body = new THREE.Mesh(bodyGeo, bodyMat);
      satGroup.add(body);

      const panelGeo = new THREE.BoxGeometry(1.0, 0.03, 0.35);
      const panelMat = new THREE.MeshStandardMaterial({ color: 0x1e293b, metalness: 0.8, roughness: 0.2 });
      const panel = new THREE.Mesh(panelGeo, panelMat);
      satGroup.add(panel);

      scene.add(satGroup);
      satelliteMeshes.push({ group: satGroup, radius: sat.radius, speed: sat.speed, inclination: sat.inclination });

      const sPoints = [];
      for (let i = 0; i <= 60; i++) {
        const theta = (i / 60) * Math.PI * 2;
        const sx = Math.cos(theta) * sat.radius;
        const sz = Math.sin(theta) * sat.radius;
        const sy = Math.sin(theta) * sat.radius * Math.sin(sat.inclination);
        sPoints.push(new THREE.Vector3(sx, sy, sz));
      }
      const sGeo = new THREE.BufferGeometry().setFromPoints(sPoints);
      const sMat = new THREE.LineBasicMaterial({ color: sat.color, transparent: true, opacity: 0.25 });
      scene.add(new THREE.Line(sGeo, sMat));
    });

    const orbitRadius = 11;
    const points = [];
    for (let i = 0; i <= 100; i++) {
      const theta = (i / 100) * Math.PI * 2;
      points.push(new THREE.Vector3(Math.cos(theta) * orbitRadius, 0, Math.sin(theta) * orbitRadius));
    }
    const orbitGeo = new THREE.BufferGeometry().setFromPoints(points);
    const orbitMat = new THREE.LineBasicMaterial({ color: 0x38bdf8, transparent: true, opacity: 0.4 });
    const orbitLine = new THREE.Line(orbitGeo, orbitMat);
    scene.add(orbitLine);

    // Create Composite 3D Rocket Group
    const rocketGroup = new THREE.Group();
    
    const hullGeo = new THREE.CylinderGeometry(0.4, 0.4, 2.2, 16);
    const hullMat = new THREE.MeshStandardMaterial({ color: 0xf8fafc, metalness: 0.3, roughness: 0.2 });
    const hull = new THREE.Mesh(hullGeo, hullMat);
    hull.castShadow = true;
    rocketGroup.add(hull);

    const noseGeo = new THREE.ConeGeometry(0.4, 1.0, 16);
    const noseMat = new THREE.MeshStandardMaterial({ color: 0x2563eb, metalness: 0.5, roughness: 0.1 });
    const nose = new THREE.Mesh(noseGeo, noseMat);
    nose.position.y = 1.6;
    rocketGroup.add(nose);

    const flameGeo = new THREE.ConeGeometry(0.35, 1.2, 16);
    const flameMat = new THREE.MeshBasicMaterial({ color: 0xff7300 });
    const flame = new THREE.Mesh(flameGeo, flameMat);
    flame.position.y = -1.7;
    flame.rotation.x = Math.PI;
    rocketGroup.add(flame);

    scene.add(rocketGroup);
    rocketGroupRef.current = rocketGroup;

    let animId: number;
    const clock = new THREE.Clock();

    const animate3D = () => {
      animId = requestAnimationFrame(animate3D);
      const delta = clock.getDelta();
      const elapsedTimeTotal = clock.getElapsedTime();

      if (earthMeshRef.current) {
        earthMeshRef.current.rotation.y += delta * 0.05 * speedMultiplier;
      }

      if (galaxyGroupRef.current) {
        galaxyGroupRef.current.rotation.y += delta * 0.01 * speedMultiplier;
      }

      satelliteMeshes.forEach((sat) => {
        const angle = elapsedTimeTotal * sat.speed * 0.4 * speedMultiplier;
        const x = Math.cos(angle) * sat.radius;
        const z = Math.sin(angle) * sat.radius;
        const y = Math.sin(angle) * sat.radius * Math.sin(sat.inclination);
        sat.group.position.set(x, y, z);
        sat.group.rotation.y = -angle;
      });

      if (rocketGroupRef.current) {
        const progressFraction = timeElapsed / 120;
        const angle = progressFraction * Math.PI * 2;
        const currentRadius = 6.5 + (orbitRadius - 6.5) * Math.min(progressFraction * 2, 1);
        const rx = Math.cos(angle) * currentRadius;
        const rz = Math.sin(angle) * currentRadius;
        const ry = Math.sin(progressFraction * Math.PI) * 4;

        rocketGroupRef.current.position.set(rx, ry, rz);
        rocketGroupRef.current.rotation.y = -angle;
        rocketGroupRef.current.rotation.z = Math.cos(angle) * 0.5;
      }

      controls.update();
      composer.render();
    };

    animate3D();

    const handleResize = () => {
      if (!container) return;
      const w = container.clientWidth;
      const h = container.clientHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
      composer.setSize(w, h);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animId);
      renderer.dispose();
      container.innerHTML = '';
    };
  }, [viewMode, timeElapsed, speedMultiplier]);

  const handleStart = () => setIsRunning(true);
  const handlePause = () => setIsRunning(false);
  const handleReset = () => {
    setIsRunning(false);
    setTimeElapsed(0);
    updateTelemetryForTime(0);
  };

  const handleStepBackward = () => {
    setIsRunning(false);
    setTimeElapsed(prev => {
      const next = Math.max(0, prev - 1);
      updateTelemetryForTime(next);
      return next;
    });
  };

  const handleStepForward = () => {
    setIsRunning(false);
    setTimeElapsed(prev => {
      const next = Math.min(120, prev + 1);
      updateTelemetryForTime(next);
      return next;
    });
  };

  const handleTimelineChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = Number(e.target.value);
    setTimeElapsed(val);
    setIsRunning(false);
    updateTelemetryForTime(val);
  };

  return (
    <section id="trajectory" className="py-20 bg-white border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
          <div>
            <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-blue-50 border border-blue-200 text-blue-900 text-xs font-semibold mb-3">
              <Rocket className="w-3.5 h-3.5 text-blue-700" />
              <span>Step 6 & 18: Advanced Simulation Control Toolbar</span>
            </div>
            <h2 className="text-3xl font-extrabold text-slate-900 tracking-tight">SDSC SHAR ISRO Advanced Simulation & Control Toolbar</h2>
            <p className="text-slate-600 mt-2 text-sm max-w-2xl">
              Control playback with variable speed multipliers (0.5x, 1x, 2x), frame-by-frame scrubbing (-1s / +1s), and interactive timeline navigation.
            </p>
          </div>

          <div className="mt-4 md:mt-0 flex items-center space-x-3">
            <div className="bg-slate-100 p-1 rounded-xl border border-slate-200 flex items-center space-x-1">
              <button
                onClick={() => setViewMode('2d')}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center space-x-1.5 ${
                  viewMode === '2d' ? 'bg-blue-900 text-white shadow-sm' : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                <Activity className="w-3.5 h-3.5" />
                <span>2D Trajectory</span>
              </button>
              <button
                onClick={() => setViewMode('3d')}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center space-x-1.5 ${
                  viewMode === '3d' ? 'bg-blue-900 text-white shadow-sm' : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                <Globe className="w-3.5 h-3.5" />
                <span>3D Earth Orbit</span>
              </button>
            </div>
          </div>
        </div>

        {/* Dedicated Control Toolbar */}
        <div className="bg-slate-900 text-white p-4 rounded-2xl border border-slate-800 shadow-xl mb-8 flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center space-x-2">
            <button
              onClick={handleStart}
              className="px-4 py-2 rounded-xl bg-blue-700 hover:bg-blue-600 text-white font-bold text-xs uppercase tracking-wider flex items-center space-x-1.5 transition-all shadow-sm"
            >
              <Play className="w-4 h-4 fill-white" />
              <span>Play</span>
            </button>

            <button
              onClick={handlePause}
              className="px-4 py-2 rounded-xl bg-amber-600 hover:bg-amber-500 text-white font-bold text-xs uppercase tracking-wider flex items-center space-x-1.5 transition-all shadow-sm"
            >
              <Pause className="w-4 h-4 fill-white" />
              <span>Pause</span>
            </button>

            <button
              onClick={handleReset}
              className="px-4 py-2 rounded-xl bg-slate-700 hover:bg-slate-600 text-slate-200 font-bold text-xs uppercase tracking-wider flex items-center space-x-1.5 transition-all"
            >
              <RotateCcw className="w-4 h-4" />
              <span>Reset</span>
            </button>
          </div>

          {/* Step-by-Step Frame Scrubbing */}
          <div className="flex items-center space-x-2 border-x border-slate-700 px-4">
            <span className="text-xs text-slate-400 font-mono">Step:</span>
            <button
              onClick={handleStepBackward}
              className="p-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-cyan-400 font-bold text-xs flex items-center space-x-1 transition-all"
              title="Step -1s"
            >
              <SkipBack className="w-4 h-4" />
              <span className="font-mono">-1s</span>
            </button>
            <button
              onClick={handleStepForward}
              className="p-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-cyan-400 font-bold text-xs flex items-center space-x-1 transition-all"
              title="Step +1s"
            >
              <span className="font-mono">+1s</span>
              <SkipForward className="w-4 h-4" />
            </button>
          </div>

          {/* Speed Multiplier Selector */}
          <div className="flex items-center space-x-2">
            <Gauge className="w-4 h-4 text-cyan-400" />
            <span className="text-xs text-slate-400 font-mono">Speed:</span>
            <div className="bg-slate-800 p-1 rounded-xl border border-slate-700 flex items-center space-x-1">
              {[0.5, 1, 2].map((spd) => (
                <button
                  key={spd}
                  onClick={() => setSpeedMultiplier(spd)}
                  className={`px-3 py-1 rounded-lg text-xs font-mono font-bold transition-all ${
                    speedMultiplier === spd ? 'bg-cyan-500 text-slate-950 shadow-sm' : 'text-slate-300 hover:text-white'
                  }`}
                >
                  {spd}x
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Simulation Canvas / 3D Viewport & HUD Overlay */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center mb-8">
          
          <div className="lg:col-span-7 bg-slate-950 rounded-2xl border border-slate-800 p-4 shadow-xl relative overflow-hidden">
            
            {/* Aerospace HUD Overlay */}
            <div className="absolute inset-0 pointer-events-none p-6 flex flex-col justify-between z-10">
              <div className="flex justify-between items-start">
                <div className="bg-slate-900/80 backdrop-blur-md px-4 py-2 rounded-xl border border-cyan-500/30 text-cyan-400 font-mono text-xs space-y-1 shadow-lg">
                  <div className="flex items-center space-x-2">
                    <div className={`w-2.5 h-2.5 rounded-full ${isRunning ? 'bg-emerald-400 animate-pulse' : 'bg-amber-400'}`}></div>
                    <span className="font-bold tracking-wider">TELEMETRY LOCK: ACTIVE ({speedMultiplier}x)</span>
                  </div>
                  <div>ALT: <span className="text-white font-bold">{altitude.toFixed(1)} km</span></div>
                  <div>VEL: <span className="text-white font-bold">{velocity.toFixed(2)} km/s</span></div>
                </div>

                <div className="bg-slate-900/80 backdrop-blur-md px-4 py-2 rounded-xl border border-blue-500/30 text-blue-300 font-mono text-xs text-right space-y-1 shadow-lg">
                  <div className="font-bold text-cyan-300">STAGE: {stage}</div>
                  <div>ACC: <span className="text-white font-bold">{acceleration.toFixed(1)} m/s²</span></div>
                  <div>FUEL: <span className="text-emerald-400 font-bold">{fuelPercentage.toFixed(0)}%</span></div>
                </div>
              </div>

              {/* Center Crosshair Reticle */}
              <div className="absolute inset-0 flex items-center justify-center opacity-30 pointer-events-none">
                <div className="w-16 h-16 border border-cyan-400 rounded-full flex items-center justify-center">
                  <div className="w-2 h-2 bg-cyan-400 rounded-full"></div>
                </div>
              </div>

              {/* Bottom HUD Bar / Fuel Gauge */}
              <div className="bg-slate-900/80 backdrop-blur-md p-3 rounded-xl border border-slate-700/50 flex items-center justify-between font-mono text-xs text-slate-300 pointer-events-auto">
                <div className="flex items-center space-x-3">
                  <span className="text-cyan-400 font-bold">PROPULSOR TANK</span>
                  <div className="w-32 bg-slate-800 h-2 rounded-full overflow-hidden border border-slate-700">
                    <div 
                      className={`h-full transition-all duration-300 ${fuelPercentage > 30 ? 'bg-emerald-500' : 'bg-amber-500'}`} 
                      style={{ width: `${fuelPercentage}%` }}
                    ></div>
                  </div>
                </div>
                <div className="text-cyan-300 font-bold">T+ {timeElapsed.toFixed(1)}s</div>
              </div>
            </div>

            {viewMode === '2d' ? (
              <canvas
                ref={canvasRef}
                width={650}
                height={400}
                className="w-full h-[400px] rounded-xl bg-slate-900 object-cover"
              />
            ) : (
              <div
                ref={container3DRef}
                className="w-full h-[400px] rounded-xl bg-slate-950 overflow-hidden relative"
              />
            )}
          </div>

          {/* Telemetry Dashboard */}
          <div className="lg:col-span-5 space-y-4">
            <div className="bg-slate-50 p-6 rounded-2xl border border-slate-200 shadow-sm space-y-6">
              <div className="flex items-center justify-between border-b border-slate-200 pb-3">
                <h3 className="text-base font-bold text-slate-900 flex items-center space-x-2">
                  <Activity className="w-5 h-5 text-blue-900" />
                  <span>Real-Time Telemetry</span>
                </h3>
                <span className="text-xs font-mono bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded font-bold">
                  {viewMode === '3d' ? '3D MILKY WAY' : '2D FLIGHT MODE'}
                </span>
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
            </div>
          </div>

        </div>

        {/* Timeline Scrubber Bar */}
        <div className="max-w-5xl mx-auto bg-slate-900 text-white p-6 rounded-2xl border border-slate-800 shadow-lg space-y-3">
          <div className="flex justify-between items-center text-xs font-mono">
            <span className="text-cyan-400 font-bold">Timeline Scrubber (T+ 0s to T+ 120s)</span>
            <span className="text-slate-300">Current: T+ {timeElapsed.toFixed(1)}s ({((timeElapsed / 120) * 100).toFixed(0)}%)</span>
          </div>
          <input
            type="range"
            min="0"
            max="120"
            step="0.5"
            value={timeElapsed}
            onChange={handleTimelineChange}
            className="w-full accent-cyan-400 cursor-pointer h-2 bg-slate-800 rounded-lg"
          />
          <div className="flex justify-between text-[10px] text-slate-400 font-mono">
            <span>T+ 0s (Pad)</span>
            <span>T+ 40s (Booster Sep)</span>
            <span>T+ 80s (Stage 2)</span>
            <span>T+ 120s (Insertion)</span>
          </div>
        </div>

      </div>
    </section>
  );
};
