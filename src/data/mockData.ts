import { RocketRecord, PayloadRecord, LaunchWindowRecord, TrajectoryRecord, MissionConstraintRecord, CodeFile } from '../types';

export const mockRockets: RocketRecord[] = [
  { id: 'r1', name: 'LVM3 (GSLV Mk III)', agency: 'ISRO', mass: 640000, fuelMass: 555000, payloadCapacity: 10000, thrust: 19000, specificImpulse: 345, stages: 3, fairingCapacity: 140, reliability: 99.1 },
  { id: 'r2', name: 'PSLV-XL', agency: 'ISRO', mass: 320000, fuelMass: 282000, payloadCapacity: 1750, thrust: 4800, specificImpulse: 295, stages: 4, fairingCapacity: 30, reliability: 97.4 },
  { id: 'r3', name: 'SSLV (Small Satellite Launch)', agency: 'ISRO', mass: 120000, fuelMass: 105000, payloadCapacity: 500, thrust: 2400, specificImpulse: 305, stages: 3, fairingCapacity: 15, reliability: 98.0 },
  { id: 'r4', name: 'Falcon 9 Block 5', agency: 'SpaceX', mass: 549054, fuelMass: 505700, payloadCapacity: 22800, thrust: 7607, specificImpulse: 311, stages: 2, fairingCapacity: 115, reliability: 99.2 },
  { id: 'r5', name: 'Falcon Heavy', agency: 'SpaceX', mass: 1420788, fuelMass: 1323000, payloadCapacity: 63800, thrust: 22819, specificImpulse: 316, stages: 2, fairingCapacity: 135, reliability: 98.5 },
  { id: 'r6', name: 'Starship (Integrated)', agency: 'SpaceX', mass: 5000000, fuelMass: 4500000, payloadCapacity: 150000, thrust: 74300, specificImpulse: 380, stages: 2, fairingCapacity: 1000, reliability: 92.0 },
  { id: 'r7', name: 'Space Launch System (SLS Block 1)', agency: 'NASA', mass: 2612700, fuelMass: 2320000, payloadCapacity: 95000, thrust: 39144, specificImpulse: 366, stages: 2, fairingCapacity: 250, reliability: 100.0 },
  { id: 'r8', name: 'Ariane 6 (A64)', agency: 'ESA', mass: 860000, fuelMass: 750000, payloadCapacity: 21650, thrust: 10500, specificImpulse: 330, stages: 2, fairingCapacity: 210, reliability: 99.0 }
];

export const mockPayloads: PayloadRecord[] = [
  { id: 'p1', satelliteName: 'Gaganyaan Human Crew Orbital Module', mass: 7800, volume: 95, targetOrbit: 'LEO (400 km)', priority: 'Critical', readinessStatus: 'Review', value: 1200.0 },
  { id: 'p2', satelliteName: 'Chandrayaan-4 Lunar Sample Return Module', mass: 4200, volume: 65, targetOrbit: 'Lunar NRHO', priority: 'Critical', readinessStatus: 'Testing', value: 450.0 },
  { id: 'p3', satelliteName: 'Aditya-L1 Solar Observatory', mass: 1475, volume: 22, targetOrbit: 'Sun-Earth L1', priority: 'High', readinessStatus: 'Ready', value: 90.0 },
  { id: 'p4', satelliteName: 'RISAT-1B Radar Earth Observation', mass: 1850, volume: 28, targetOrbit: 'SSO (550 km)', priority: 'High', readinessStatus: 'Ready', value: 110.0 },
  { id: 'p5', satelliteName: 'Starlink Gen2 Batch (22 Sats)', mass: 17600, volume: 85, targetOrbit: 'LEO', priority: 'High', readinessStatus: 'Ready', value: 35.0 },
  { id: 'p6', satelliteName: 'James Webb Space Telescope M2', mass: 6500, volume: 120, targetOrbit: 'Sun-Earth L2', priority: 'Critical', readinessStatus: 'Ready', value: 10000.0 },
  { id: 'p7', satelliteName: 'GPS III Operational Satellite SV12', mass: 4335, volume: 32, targetOrbit: 'MEO', priority: 'Critical', readinessStatus: 'Testing', value: 550.0 }
];

export const mockLaunchWindows: LaunchWindowRecord[] = [
  { id: 'lw1', date: '2026-06-15', time: '11:15 IST', site: 'Satish Dhawan Space Centre (SDSC) SHAR - Second Launch Pad (SLP)', targetOrbit: 'LEO / Gaganyaan', inclination: 13.4, windowDuration: 2.0, weatherCondition: 'Optimal', windSpeed: 3.8 },
  { id: 'lw2', date: '2026-06-20', time: '05:42 IST', site: 'Satish Dhawan Space Centre (SDSC) SHAR - First Launch Pad (FLP)', targetOrbit: 'SSO (RISAT / Aditya)', inclination: 97.8, windowDuration: 1.5, weatherCondition: 'Optimal', windSpeed: 4.5 },
  { id: 'lw3', date: '2026-07-05', time: '14:20 IST', site: 'Satish Dhawan Space Centre (SDSC) SHAR - Small Satellite Launch Complex', targetOrbit: 'LEO (SSLV)', inclination: 22.0, windowDuration: 3.0, weatherCondition: 'Favorable', windSpeed: 5.2 },
  { id: 'lw4', date: '2026-07-12', time: '21:05 UTC', site: 'Kennedy Space Center LC-39A', targetOrbit: 'LEO', inclination: 28.5, windowDuration: 2.5, weatherCondition: 'Optimal', windSpeed: 4.2 },
  { id: 'lw5', date: '2026-07-18', time: '08:15 UTC', site: 'Vandenberg SFB SLC-4E', targetOrbit: 'SSO', inclination: 98.2, windowDuration: 1.0, weatherCondition: 'Favorable', windSpeed: 6.8 }
];

export const mockTrajectories: TrajectoryRecord[] = [
  { id: 't1', initialAltitude: 0, targetAltitude: 400, velocity: 7.80, acceleration: 22.5, deltaV: 9.2, fuelConsumption: 380.0, flightDuration: 8.8, riskFactor: 1.2 },
  { id: 't2', initialAltitude: 0, targetAltitude: 550, velocity: 7.82, acceleration: 24.5, deltaV: 9.4, fuelConsumption: 412.5, flightDuration: 9.2, riskFactor: 1.4 },
  { id: 't3', initialAltitude: 0, targetAltitude: 384400, velocity: 11.20, acceleration: 35.0, deltaV: 15.6, fuelConsumption: 2100.0, flightDuration: 72.5, riskFactor: 4.5 }
];

export const mockConstraints: MissionConstraintRecord[] = [
  { id: 'c1', maxPayload: 10000, fuelLimit: 550, siteRestriction: 'ISRO Range Safety & Equatorial Launch Clearance Required', weatherConstraint: 'Max surface wind < 12 m/s, No precipitation', safetyMargin: 15, budgetLimit: 150.0 }
];

export const sampleCodeFiles: CodeFile[] = [
  {
    name: 'isro_dataset_loader.py',
    language: 'python',
    category: 'Dataset',
    content: `\"\"\"
ISRO Launch Dataset Loading & Preprocessing Module
Loads LVM3, PSLV-XL, SSLV specs and Sriharikota launch windows for quantum optimization.
\"\"\"

import pandas as pd
import numpy as np

def load_isro_mission_datasets():
    print("Loading ISRO & Global aerospace datasets...")
    rockets = pd.read_csv('data/isro_rockets.csv')
    payloads = pd.read_csv('data/isro_payloads.csv')
    windows = pd.read_csv('data/shar_launch_windows.csv')
    
    print(f"Loaded {len(rockets)} launch vehicles (including LVM3 & PSLV).")
    print(f"Loaded {len(payloads)} satellite payloads (Gaganyaan, Chandrayaan).")
    print(f"Loaded {len(windows)} SDSC SHAR launch windows.")
    return rockets, payloads, windows

if __name__ == '__main__':
    load_isro_mission_datasets()
`
  },
  {
    name: 'data_preprocessing.py',
    language: 'python',
    category: 'Preprocessing',
    content: `\"\"\"
Data Preprocessing and Feature Scaling Module
Normalizes rocket thrust, fuel mass, payload ratios, and weather penalty factors.
\"\"\"

import numpy as np
import pandas as pd
from sklearn.preprocessing import StandardScaler

def preprocess_features(df, feature_cols):
    print("Executing feature scaling and outlier detection...")
    scaler = StandardScaler()
    scaled_data = scaler.fit_transform(df[feature_cols])
    
    df_clean = df.dropna()
    print(f"Processed records: {len(df_clean)} retained.")
    return df_clean, scaled_data
`
  },
  {
    name: 'classical_optimization.py',
    language: 'python',
    category: 'Classical',
    content: `\"\"\"
Classical Trajectory & Mission Cost Optimization Baseline
Uses SciPy SLSQP solver for ISRO launch window and fuel optimization.
\"\"\"

import numpy as np
from scipy.optimize import minimize

def objective_function(x, fuel_weight, cost_weight, risk_weight):
    fuel, angle, time_sep = x
    obj = fuel_weight * (fuel / 1000.0) + cost_weight * (np.sin(angle) * 0.1) + risk_weight * (time_sep * 0.05)
    return obj

def run_classical_optimization():
    print("Running classical SciPy optimization baseline for LVM3...")
    x0 = [450.0, 42.0, 140.0]
    bounds = [(100, 1000), (10, 85), (60, 300)]
    
    res = minimize(objective_function, x0, args=(0.4, 0.4, 0.2), bounds=bounds, method='SLSQP')
    print("Classical Optimization Complete. Objective Value:", res.fun)
    return res.x, res.fun
`
  },
  {
    name: 'qubo_formulation.py',
    language: 'python',
    category: 'QUBO',
    content: `\"\"\"
QUBO Formulation Module
Converts mission selection and launch window scheduling into a Quadratic Unconstrained Binary Optimization model.
\"\"\"

import numpy as np

def build_qubo_matrix(num_variables=8):
    print("Constructing QUBO matrix for ISRO launch window and vehicle allocation...")
    np.random.seed(42)
    A = np.random.randn(num_variables, num_variables)
    Q = np.dot(A.T, A) + np.diag(np.abs(np.random.randn(num_variables)) * 2)
    print("QUBO Matrix dimensions:", Q.shape)
    return Q
`
  },
  {
    name: 'qaoa_implementation.py',
    language: 'python',
    category: 'QAOA',
    content: `\"\"\"
Quantum Approximate Optimization Algorithm (QAOA) using Qiskit
Solves mission trajectory selection and constraint satisfaction on a quantum simulator.
\"\"\"

import numpy as np
from qiskit import QuantumCircuit
from qiskit_aer import AerSimulator

def create_qaoa_circuit(p_depth=2, gamma=[0.6, 0.8], beta=[0.3, 0.5]):
    print(f"Constructing QAOA Circuit with depth p = {p_depth}...")
    num_qubits = 4
    qc = QuantumCircuit(num_qubits, num_qubits)
    qc.h(range(num_qubits))
    
    for d in range(p_depth):
        for i in range(num_qubits - 1):
            qc.rzz(gamma[d], i, i+1)
        for i in range(num_qubits):
            qc.rx(2 * beta[d], i)
            
    qc.measure(range(num_qubits), range(num_qubits))
    return qc
`
  },
  {
    name: 'trajectory_simulation.py',
    language: 'python',
    category: 'Simulation',
    content: `\"\"\"
Rocket Trajectory Physics Simulation for LVM3 & PSLV
Calculates atmospheric drag, gravity turn, orbital insertion, and delta-v expenditure.
\"\"\"

import numpy as np

def simulate_trajectory(initial_mass, thrust, specific_impulse, target_altitude):
    print("Simulating rocket flight dynamics (LVM3 Ascent)...")
    time_steps = np.linspace(0, 600, 100)
    altitudes = target_altitude * (1 - np.exp(-time_steps / 150.0))
    velocities = 7.82 * (1 - np.exp(-time_steps / 200.0))
    fuel_burned = initial_mass * (1 - np.exp(-time_steps / 300.0))
    return time_steps, altitudes, velocities, fuel_burned
`
  },
  {
    name: 'visualization_module.py',
    language: 'python',
    category: 'Visualization',
    content: `\"\"\"
Mission Analytics and Trajectory Visualization Module
Generates Matplotlib and Plotly visual representations of orbital insertions.
\"\"\"

import matplotlib.pyplot as plt
import numpy as np

def plot_trajectory_comparison(classical_traj, quantum_traj):
    print("Generating trajectory comparison charts...")
    plt.figure(figsize=(10, 6))
    plt.plot(classical_traj['time'], classical_traj['alt'], label='Classical Optimization', color='blue')
    plt.plot(quantum_traj['time'], quantum_traj['alt'], label='QAOA Quantum Optimization', color='green', linestyle='--')
    plt.xlabel('Flight Time (s)')
    plt.ylabel('Altitude (km)')
    plt.title('ISRO Launch Vehicle Trajectory: Classical vs Quantum QAOA')
    plt.legend()
    plt.grid(True)
    plt.savefig('isro_trajectory_comparison.png')
    print("Plot saved successfully.")
`
  }
];
