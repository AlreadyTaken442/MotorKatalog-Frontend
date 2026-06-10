export type EngineGeneration = 'M' | 'N' | 'B' | 'S';

export interface EngineSpec {
  displacement_ccm?: number;    // cm³
  cylinders?: number;
  valves?: number;
  bore_mm?: number;             // mm
  stroke_mm?: number;           // mm
  compression?: number;         // :1
  power_kw?: number;           // kW
  horsepower?: number;         // PS
  torque_nm?: number;          // Nm
  revlimit_rpm?: number;
  powerat_rpm?: number;        // single rpm value
  torqueat_rpm?: number;       // single rpm value
  fueltype?: string;
  injectionsystem?: string;
  aspiration?: string;
  engineweight_kg?: number;    // kg (engine dry)
  oilcapacity_l?: number;      // litres
  emissionstandard?: string;
}

export interface Engine {
  enginecode: string;     // enginecode (primary key)
  displayname: string;    // human readable name
  generation: EngineGeneration;
  family: string;
  variant: string;
  firstbuildyear: number;
  lastbuildyear: number;
  applications: string[];
  specs: EngineSpec;
  description: string;
  highlights: string[]; // weitere Tabelle
  imageUrl?: string;
}

export interface GenerationMeta {
  id: EngineGeneration;
  label: string;
  description: string;
  era: string;
  isSport: boolean;
  color: string;
  accentColor: string;
}

export const GENERATION_META: Record<EngineGeneration, GenerationMeta> = {
  M: {
    id: 'M',
    label: 'M-Generation',
    description: 'Klassische Motorenreihe aus der 90er/2000er Ära — Sauger-Philosophie, robuste Eisenblöcke.',
    era: '1990–2005',
    isSport: false,
    color: '#1C6EC8',
    accentColor: '#5599E0',
  },
  N: {
    id: 'N',
    label: 'N-Generation',
    description: 'Modulare Motorenfamilie mit Valvetronic, Double-VANOS und Turbo-Integration.',
    era: '2004–2020',
    isSport: false,
    color: '#2E7D4F',
    accentColor: '#4CAF72',
  },
  B: {
    id: 'B',
    label: 'B-Generation',
    description: 'Modulare B-Baureihe — EURO 6, EfficientDynamics, Mild-Hybrid-Vorbereitung.',
    era: '2013–heute',
    isSport: false,
    color: '#5A5A7A',
    accentColor: '#8888AA',
  },
  S: {
    id: 'S',
    label: 'S-Generation',
    description: 'Hochdrehende M-Sporttriebwerke — handgefertigt, jeder Motor trägt die Signatur seines Ingenieurs.',
    era: '1992–heute',
    isSport: true,
    color: '#B8922A',
    accentColor: '#C8A84B',
  },
};
