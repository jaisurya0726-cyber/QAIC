export interface RocketRecord {
  id: string;
  name: string;
  agency: string;
  mass: number; // kg
  fuelMass: number; // kg
  payloadCapacity: number; // kg
  thrust: number; // kN
  specificImpulse: number; // s
  stages: number;
  fairingCapacity: number; // m^3
  reliability: number; // %
}

export interface PayloadRecord {
  id: string;
  satelliteName: string;
  mass: number; // kg
  volume: number; // m^3
  targetOrbit: string; // LEO, MEO, GEO, SSO, Lunar, Martian
  priority: 'Critical' | 'High' | 'Medium' | 'Low';
  readinessStatus: 'Ready' | 'Testing' | 'Review';
  value: number; // Million USD
}

export interface LaunchWindowRecord {
  id: string;
  date: string;
  time: string;
  site: string;
  targetOrbit: string;
  inclination: number; // deg
  windowDuration: number; // hours
  weatherCondition: 'Optimal' | 'Favorable' | 'Marginal' | 'Restricted';
  windSpeed: number; // m/s
}

export interface TrajectoryRecord {
  id: string;
  initialAltitude: number; // km
  targetAltitude: number; // km
  velocity: number; // km/s
  acceleration: number; // m/s^2
  deltaV: number; // km/s
  fuelConsumption: number; // tons
  flightDuration: number; // minutes
  riskFactor: number; // %
}

export interface MissionConstraintRecord {
  id: string;
  maxPayload: number; // kg
  fuelLimit: number; // tons
  siteRestriction: string;
  weatherConstraint: string;
  safetyMargin: number; // %
  budgetLimit: number; // Million USD
}

export interface MissionParameters {
  rocketId: string;
  payloadId: string;
  launchSite: string;
  launchDate: string;
  targetOrbit: string;
  initialAltitude: number;
  targetAltitude: number;
  initialVelocity: number;
  targetVelocity: number;
  inclination: number;
  fuelWeight: number;
  costWeight: number;
  riskWeight: number;
  delayWeight: number;
  maxBudget: number;
  qaoaDepth: number;
  qaoaIterations: number;
}

export interface CodeFile {
  name: string;
  language: string;
  category: 'Dataset' | 'Preprocessing' | 'Classical' | 'QUBO' | 'QAOA' | 'Simulation' | 'Visualization';
  content: string;
}

export interface OptimizationResult {
  classical: {
    objectiveValue: number;
    fuelUsed: number; // tons
    cost: number; // $M
    risk: number; // %
    executionTime: number; // ms
    iterations: number;
    status: string;
  };
  qubo: {
    variablesCount: number;
    termsCount: number;
    matrixPreview: number[][];
    minEnergy: number;
  };
  ising: {
    hamiltonianExpression: string;
    spinVariables: number;
    groundStateEnergy: number;
  };
  qaoa: {
    depth: number;
    optimalGamma: number[];
    optimalBeta: number[];
    iterations: number;
    measuredCounts: Record<string, number>;
    probabilityDistribution: { state: string; probability: number }[];
    energyConvergence: { iteration: number; energy: number }[];
    bestSolution: string;
    objectiveValue: number;
    fuelUsed: number;
    cost: number;
    risk: number;
    executionTime: number;
    quantumSpeedupFactor: number;
  };
  validation: {
    fuelFeasible: boolean;
    payloadFeasible: boolean;
    orbitFeasible: boolean;
    launchWindowValid: boolean;
    velocityValid: boolean;
    accelerationValid: boolean;
    safetyValid: boolean;
    budgetValid: boolean;
    overallStatus: 'PASSED' | 'WARNING' | 'FAILED';
  };
}
