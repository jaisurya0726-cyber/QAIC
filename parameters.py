"""
Launch Trajectory and Mission-Planning Optimization using Quantum Computing

Workflow:
User Input
    ↓
Data Processing
    ↓
QUBO Formulation
    ↓
QAOA Optimization
    ↓
Quantum Simulation
    ↓
Optimized Mission Solution
    ↓
Output

Prototype implementation using Qiskit.
"""

import numpy as np
from scipy.optimize import minimize

from qiskit import QuantumCircuit
from qiskit.circuit.library import qaoa_ansatz
from qiskit.quantum_info import SparsePauliOp, Statevector
from qiskit import qasm2


# ============================================================
# 1. USER INPUT
# ============================================================

print("=" * 70)
print("LAUNCH TRAJECTORY AND MISSION-PLANNING OPTIMIZATION")
print("Quantum Computing / QAOA Prototype")
print("=" * 70)

payload_mass = float(input("Enter payload mass (kg): "))
target_altitude = float(input("Enter target orbit altitude (km): "))
inclination = float(input("Enter target inclination (degrees): "))
weather_risk = float(input("Enter weather risk score (0-1): "))
mission_priority = int(input("Enter mission priority (1-10): "))

print("\nMission input received.")


# ============================================================
# 2. DATA PROCESSING
# ============================================================

# Normalize user parameters approximately to 0-1.

payload_norm = min(payload_mass / 10000.0, 1.0)
altitude_norm = min(target_altitude / 2000.0, 1.0)
inclination_norm = min(inclination / 180.0, 1.0)
risk_norm = min(max(weather_risk, 0.0), 1.0)
priority_norm = min(max(mission_priority / 10.0, 0.0), 1.0)

print("\nProcessed parameters:")
print(f"Payload normalized      : {payload_norm:.3f}")
print(f"Altitude normalized     : {altitude_norm:.3f}")
print(f"Inclination normalized  : {inclination_norm:.3f}")
print(f"Weather risk normalized : {risk_norm:.3f}")
print(f"Priority normalized     : {priority_norm:.3f}")


# ============================================================
# 3. DEFINE MISSION OPTIONS
# ============================================================

# Six binary variables:
#
# x0 = Launch Window A
# x1 = Launch Window B
#
# x2 = Trajectory A
# x3 = Trajectory B
#
# x4 = Payload Plan A
# x5 = Payload Plan B


variable_names = [
    "Launch Window A",
    "Launch Window B",
    "Trajectory A",
    "Trajectory B",
    "Payload Plan A",
    "Payload Plan B"
]


# ============================================================
# 4. CALCULATE OPTION COSTS
# ============================================================

# Lower value = better option.
#
# These are prototype objective values.
# Later, replace them with values calculated from your real
# launch dataset.

window_A_cost = (
    1.0
    + 0.5 * risk_norm
    + 0.2 * altitude_norm
)

window_B_cost = (
    1.3
    + 0.3 * risk_norm
    + 0.1 * inclination_norm
)

trajectory_A_cost = (
    2.0
    + 0.8 * payload_norm
    + 0.4 * altitude_norm
)

trajectory_B_cost = (
    1.5
    + 0.5 * payload_norm
    + 0.8 * inclination_norm
)

payload_A_cost = (
    1.2
    + 0.6 * payload_norm
    - 0.2 * priority_norm
)

payload_B_cost = (
    1.7
    + 0.4 * payload_norm
    - 0.1 * priority_norm
)


linear_costs = np.array([
    window_A_cost,
    window_B_cost,
    trajectory_A_cost,
    trajectory_B_cost,
    payload_A_cost,
    payload_B_cost
])


print("\nCalculated mission option costs:")

for name, cost in zip(variable_names, linear_costs):
    print(f"{name:25s}: {cost:.4f}")


# ============================================================
# 5. BUILD QUBO
# ============================================================

n = 6

# QUBO is represented as:
#
# C(x) = sum_i a_i*x_i + sum_{i<j} b_ij*x_i*x_j
#
# We store:
# linear[i] = a_i
# quadratic[(i,j)] = b_ij

linear = linear_costs.copy()

quadratic = {}


# ------------------------------------------------------------
# Constraint penalty
# ------------------------------------------------------------
#
# We want EXACTLY ONE option from each pair.
#
# Constraint:
#
# (x0 + x1 - 1)^2
#
# Since x^2 = x:
#
# x0 + x1 - 1 + 2*x0*x1
#
# Therefore:
#
# linear += penalty * (-1)
# quadratic += penalty * 2
#

PENALTY = 5.0


def add_exactly_one_constraint(i, j, penalty):
    """
    Adds:
        penalty * (xi + xj - 1)^2
    """
    linear[i] += -penalty
    linear[j] += -penalty

    key = tuple(sorted((i, j)))

    if key not in quadratic:
        quadratic[key] = 0.0

    quadratic[key] += 2.0 * penalty


# Exactly one launch window
add_exactly_one_constraint(0, 1, PENALTY)

# Exactly one trajectory
add_exactly_one_constraint(2, 3, PENALTY)

# Exactly one payload plan
add_exactly_one_constraint(4, 5, PENALTY)


print("\nQUBO linear coefficients:")
for i in range(n):
    print(f"x{i} = {linear[i]:.4f}")

print("\nQUBO quadratic coefficients:")
for pair, value in quadratic.items():
    print(f"x{pair[0]} x{pair[1]} = {value:.4f}")


# ============================================================
# 6. QUBO COST FUNCTION
# ============================================================

def qubo_energy(bitstring):
    """
    Calculate QUBO energy for a binary solution.
    """

    x = np.array([int(bit) for bit in bitstring])

    energy = np.dot(linear, x)

    for (i, j), coefficient in quadratic.items():
        energy += coefficient * x[i] * x[j]

    return float(energy)


# ============================================================
# 7. CONVERT QUBO TO ISING HAMILTONIAN
# ============================================================
#
# Binary variable:
#
# x = (1 - Z) / 2
#
# Therefore:
#
# a*x
# =
# a/2 - a/2 Z
#
# b*x_i*x_j
# =
# b/4 * (1 - Zi - Zj + ZiZj)
#
# We construct:
#
# H = constant + sum h_i Zi + sum J_ij ZiZj
#

constant = 0.0
z_coefficients = np.zeros(n)
zz_coefficients = {}


# Linear terms
for i in range(n):

    a = linear[i]

    constant += a / 2.0
    z_coefficients[i] += -a / 2.0


# Quadratic terms
for (i, j), b in quadratic.items():

    constant += b / 4.0

    z_coefficients[i] += -b / 4.0
    z_coefficients[j] += -b / 4.0

    zz_coefficients[(i, j)] = b / 4.0


# ============================================================
# 8. CREATE SPARSE PAULI COST HAMILTONIAN
# ============================================================

pauli_terms = []
pauli_coefficients = []


# Z terms
for i in range(n):

    if abs(z_coefficients[i]) > 1e-12:

        pauli = ["I"] * n
        pauli[n - 1 - i] = "Z"

        pauli_terms.append("".join(pauli))
        pauli_coefficients.append(z_coefficients[i])


# ZZ terms
for (i, j), coefficient in zz_coefficients.items():

    pauli = ["I"] * n

    pauli[n - 1 - i] = "Z"
    pauli[n - 1 - j] = "Z"

    pauli_terms.append("".join(pauli))
    pauli_coefficients.append(coefficient)


cost_operator = SparsePauliOp(
    pauli_terms,
    coeffs=pauli_coefficients
)


print("\nCost Hamiltonian:")
print(cost_operator)


# ============================================================
# 9. CREATE QAOA CIRCUIT
# ============================================================

P = 2

qaoa_circuit = qaoa_ansatz(
    cost_operator,
    reps=P,
    insert_barriers=True,
    name="Mission_QAOA",
    flatten=True
)


print("\nQAOA circuit:")
print(qaoa_circuit)

print("\nNumber of qubits:", qaoa_circuit.num_qubits)
print("QAOA depth:", qaoa_circuit.depth())


# ============================================================
# 10. EXPECTATION VALUE FUNCTION
# ============================================================

def expectation_value(parameters):

    bound_circuit = qaoa_circuit.assign_parameters(parameters)

    state = Statevector.from_instruction(bound_circuit)

    expectation = np.real(
        state.expectation_value(cost_operator)
    )

    return float(expectation)


# ============================================================
# 11. CLASSICAL OPTIMIZATION OF QAOA PARAMETERS
# ============================================================

num_parameters = len(qaoa_circuit.parameters)

print("\nNumber of QAOA parameters:", num_parameters)

initial_parameters = np.random.uniform(
    -np.pi,
    np.pi,
    num_parameters
)


print("\nStarting QAOA classical optimization...")

result = minimize(
    expectation_value,
    initial_parameters,
    method="COBYLA",
    options={
        "maxiter": 100,
        "disp": True
    }
)


optimal_parameters = result.x

print("\nQAOA optimization completed.")

print("Optimal parameters:")

for i, value in enumerate(optimal_parameters):
    print(f"theta_{i}: {value:.6f}")


print("\nFinal expectation value:")
print(result.fun)


# ============================================================
# 12. CREATE OPTIMIZED QAOA CIRCUIT
# ============================================================

optimized_circuit = qaoa_circuit.assign_parameters(
    optimal_parameters
)


# ============================================================
# 13. GET QUANTUM STATE
# ============================================================

optimized_state = Statevector.from_instruction(
    optimized_circuit
)

probabilities = optimized_state.probabilities()


# ============================================================
# 14. DISPLAY MOST PROBABLE SOLUTIONS
# ============================================================

solutions = []

for index, probability in enumerate(probabilities):

    bitstring = format(
        index,
        f"0{n}b"
    )

    energy = qubo_energy(bitstring)

    solutions.append(
        (
            bitstring,
            probability,
            energy
        )
    )


solutions.sort(
    key=lambda item: item[1],
    reverse=True
)


print("\n" + "=" * 70)
print("TOP QAOA SOLUTIONS")
print("=" * 70)

for bitstring, probability, energy in solutions[:10]:

    print(
        f"Solution: {bitstring} | "
        f"Probability: {probability:.4f} | "
        f"QUBO Energy: {energy:.4f}"
    )


# ============================================================
# 15. SELECT BEST FEASIBLE SOLUTION
# ============================================================

def is_feasible(bitstring):

    x = [int(bit) for bit in bitstring]

    launch_constraint = x[0] + x[1] == 1
    trajectory_constraint = x[2] + x[3] == 1
    payload_constraint = x[4] + x[5] == 1

    return (
        launch_constraint
        and trajectory_constraint
        and payload_constraint
    )


feasible_solutions = [
    solution
    for solution in solutions
    if is_feasible(solution[0])
]


if len(feasible_solutions) == 0:

    print("\nNo feasible solution found.")

    best_solution = min(
        solutions,
        key=lambda item: item[2]
    )

else:

    # Select the feasible state with minimum QUBO energy.
    best_solution = min(
        feasible_solutions,
        key=lambda item: item[2]
    )


best_bitstring = best_solution[0]
best_probability = best_solution[1]
best_energy = best_solution[2]


# ============================================================
# 16. DECODE THE QUANTUM SOLUTION
# ============================================================

x = [int(bit) for bit in best_bitstring]


selected_window = (
    "Launch Window A"
    if x[0] == 1
    else "Launch Window B"
)

selected_trajectory = (
    "Trajectory A"
    if x[2] == 1
    else "Trajectory B"
)

selected_payload = (
    "Payload Plan A"
    if x[4] == 1
    else "Payload Plan B"
)


# ============================================================
# 17. FINAL OPTIMIZATION RESULT
# ============================================================

print("\n" + "=" * 70)
print("OPTIMIZED MISSION SOLUTION")
print("=" * 70)

print(f"Input Payload Mass     : {payload_mass:.2f} kg")
print(f"Target Altitude        : {target_altitude:.2f} km")
print(f"Target Inclination     : {inclination:.2f} degrees")
print(f"Weather Risk           : {weather_risk:.2f}")
print(f"Mission Priority       : {mission_priority}")

print("\nQuantum Optimization Result")
print("-" * 40)

print(f"Best Binary Solution   : {best_bitstring}")
print(f"QUBO Energy            : {best_energy:.6f}")
print(f"Quantum Probability    : {best_probability:.6f}")

print("\nSelected Mission Plan")
print("-" * 40)

print(f"Launch Window          : {selected_window}")
print(f"Trajectory             : {selected_trajectory}")
print(f"Payload Plan           : {selected_payload}")


# ============================================================
# 18. CLASSICAL BASELINE
# ============================================================

print("\n" + "=" * 70)
print("CLASSICAL BASELINE")
print("=" * 70)


best_classical = None


for integer in range(2 ** n):

    bitstring = format(
        integer,
        f"0{n}b"
    )

    if is_feasible(bitstring):

        energy = qubo_energy(bitstring)

        if (
            best_classical is None
            or energy < best_classical[1]
        ):

            best_classical = (
                bitstring,
                energy
            )


print(
    "Best classical feasible solution:",
    best_classical[0]
)

print(
    "Classical QUBO energy:",
    best_classical[1]
)


# ============================================================
# 19. EXPORT QAOA CIRCUIT FOR IBM QUANTUM COMPOSER
# ============================================================

print("\nPreparing OpenQASM 2.0 circuit for IBM Quantum Composer...")

composer_circuit = optimized_circuit.copy()

composer_circuit.measure_all()

# Decompose high-level operations before export.
composer_circuit = composer_circuit.decompose(
    reps=10
)

# Export to OpenQASM 2.
qasm_code = qasm2.dumps(
    composer_circuit
)


with open(
    "mission_qaoa_composer.qasm",
    "w",
    encoding="utf-8"
) as file:

    file.write(qasm_code)


print(
    "\nOpenQASM circuit saved as:"
)

print(
    "mission_qaoa_composer.qasm"
)


# ============================================================
# 20. SAVE RESULT
# ============================================================

with open(
    "optimization_result.txt",
    "w",
    encoding="utf-8"
) as file:

    file.write(
        "LAUNCH TRAJECTORY AND MISSION-PLANNING "
        "OPTIMIZATION\n"
    )

    file.write(
        "Quantum Optimization using QAOA\n\n"
    )

    file.write(
        f"Payload Mass: {payload_mass} kg\n"
    )

    file.write(
        f"Target Altitude: {target_altitude} km\n"
    )

    file.write(
        f"Inclination: {inclination} degrees\n"
    )

    file.write(
        f"Weather Risk: {weather_risk}\n"
    )

    file.write(
        f"Mission Priority: {mission_priority}\n\n"
    )

    file.write(
        f"Best Solution: {best_bitstring}\n"
    )

    file.write(
        f"QUBO Energy: {best_energy}\n"
    )

    file.write(
        f"Probability: {best_probability}\n"
    )

    file.write(
        f"Launch Window: {selected_window}\n"
    )

    file.write(
        f"Trajectory: {selected_trajectory}\n"
    )

    file.write(
        f"Payload Plan: {selected_payload}\n"
    )


print("\nResult saved as:")
print("optimization_result.txt")

print("\nOptimization process completed.")
