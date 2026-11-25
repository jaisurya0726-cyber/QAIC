export interface IsroMissionRecord {
  id: string;
  missionName: string;
  vehicle: string;
  launchDate: string;
  launchPad: string;
  payloadName: string;
  payloadMassKg: number;
  targetOrbit: string;
  status: 'SUCCESS' | 'PARTIAL SUCCESS' | 'PLANNED';
  significance: string;
}

export const isroHistoricalMissions: IsroMissionRecord[] = [
  {
    id: 'im-1',
    missionName: 'Chandrayaan-3',
    vehicle: 'LVM3-M4',
    launchDate: '2023-07-14',
    launchPad: 'SDSC SHAR - Second Launch Pad (SLP)',
    payloadName: 'Vikram Lander & Pragyan Rover',
    payloadMassKg: 3900,
    targetOrbit: 'Lunar South Pole Injection',
    status: 'SUCCESS',
    significance: 'First successful soft landing near the lunar south pole.'
  },
  {
    id: 'im-2',
    missionName: 'Aditya-L1',
    vehicle: 'PSLV-C57',
    launchDate: '2023-09-02',
    launchPad: 'SDSC SHAR - First Launch Pad (FLP)',
    payloadName: 'Solar Coronagraph & Payloads',
    payloadMassKg: 1475,
    targetOrbit: 'Sun-Earth Lagrange Point 1 (L1)',
    status: 'SUCCESS',
    significance: 'First Indian space-based solar observatory mission.'
  },
  {
    id: 'im-3',
    missionName: 'Mars Orbiter Mission (Mangalyaan)',
    vehicle: 'PSLV-C25',
    launchDate: '2013-11-05',
    launchPad: 'SDSC SHAR - First Launch Pad (FLP)',
    payloadName: 'Mars Orbiter Spacecraft',
    payloadMassKg: 1337,
    targetOrbit: 'Martian Elliptical Orbit',
    status: 'SUCCESS',
    significance: 'India’s first interplanetary mission; success on first attempt.'
  },
  {
    id: 'im-4',
    missionName: 'Chandrayaan-1',
    vehicle: 'PSLV-C11',
    launchDate: '2008-10-22',
    launchPad: 'SDSC SHAR - First Launch Pad (FLP)',
    payloadName: 'Lunar Orbiter & Moon Impact Probe',
    payloadMassKg: 1380,
    targetOrbit: 'Lunar Polar Orbit (100 km)',
    status: 'SUCCESS',
    significance: 'Confirmed discovery of water molecules on the lunar surface.'
  },
  {
    id: 'im-5',
    missionName: 'Gaganyaan TV-D1 (Test Vehicle)',
    vehicle: 'HLVM3 / Test Vehicle',
    launchDate: '2023-10-21',
    launchPad: 'SDSC SHAR - First Launch Pad (FLP)',
    payloadName: 'Crew Escape System & Module',
    payloadMassKg: 12000,
    targetOrbit: 'Sub-orbital Abort Trajectory',
    status: 'SUCCESS',
    significance: 'Validation of crew escape system for India’s human spaceflight.'
  },
  {
    id: 'im-6',
    missionName: 'EOS-06 (Oceansat-3)',
    vehicle: 'PSLV-C54',
    launchDate: '2022-11-26',
    launchPad: 'SDSC SHAR - First Launch Pad (FLP)',
    payloadName: 'Earth Observation & Scatterometer',
    payloadMassKg: 1117,
    targetOrbit: 'Sun-Synchronous Orbit (SSO)',
    status: 'SUCCESS',
    significance: 'Advanced ocean color and wind vector monitoring.'
  },
  {
    id: 'im-7',
    missionName: 'Gaganyaan Orbital Flight 1 (G1)',
    vehicle: 'LVM3-G1',
    launchDate: '2026-12-15 (Scheduled)',
    launchPad: 'SDSC SHAR - Second Launch Pad (SLP)',
    payloadName: 'Uncrewed Human-Rated Crew Module',
    payloadMassKg: 7800,
    targetOrbit: 'LEO (400 km Circular)',
    status: 'PLANNED',
    significance: 'First uncrewed flight test preceding Indian human spaceflight.'
  }
];
