import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { Engine, EngineGeneration } from '../models/engine.model';

const MOCK_ENGINES: Engine[] = [
  {
    enginecode: 'M52B28', displayname: 'M52 2.8', generation: 'M',
    family: 'M52', variant: 'B28', firstbuildyear: 1995, lastbuildyear: 2000,
    applications: ['E36 328i', 'E39 528i', 'E46 328i', 'Z3 2.8'],
    specs: { displacement_ccm: 2793, cylinders: 6, valves: 24, bore_mm: 84, stroke_mm: 84, compression: 10.2, power_kw: 142, horsepower: 193, torque_nm: 280, revlimit_rpm: 6500, powerat_rpm: 5500, torqueat_rpm: 3950, fueltype: 'Benzin', injectionsystem: 'Saugrohreinspritzung', aspiration: 'Saugmotor', engineweight_kg: 140, oilcapacity_l: 6.5, emissionstandard: 'Euro 2/3' },
    description: 'Der M52B28 ist das Herzstück des E36/E39 in der Sechszylinder-Topversion. Mit Aluminium-Zylinderblock, Double-VANOS und 24 Ventilen bietet er ein ausgewogenes Leistungs- und Drehmomentband, das Sportlichkeit mit Alltagstauglichkeit vereint.',
    highlights: ['Aluminium-Zylinderblock (ab M52TU)', 'Double-VANOS Nockenwellenverstellung', 'Kettenantrieb der Nockenwellen', 'DMS-Diagnosemotorsteuerung'],
  },
  {
    enginecode: 'M54B30', displayname: 'M54 3.0', generation: 'M',
    family: 'M54', variant: 'B30', firstbuildyear: 2000, lastbuildyear: 2006,
    applications: ['E46 330i', 'E39 530i', 'E60 530i', 'Z4 3.0i', 'X5 3.0i'],
    specs: { displacement_ccm: 2979, cylinders: 6, valves: 24, bore_mm: 84, stroke_mm: 89.6, compression: 10.2, power_kw: 170, horsepower: 231, torque_nm: 300, revlimit_rpm: 6500, powerat_rpm: 5900, torqueat_rpm: 3500, fueltype: 'Benzin', injectionsystem: 'Saugrohreinspritzung', aspiration: 'Saugmotor', engineweight_kg: 152, oilcapacity_l: 6.5, emissionstandard: 'Euro 3/4' },
    description: 'Der M54B30 gilt als einer der zuverlässigsten BMW-Sechszylinder aller Zeiten. Mit 3,0 Litern Hubraum, Double-VANOS und einem breiten nutzbaren Drehzahlband ist er der ideale Allrounder.',
    highlights: ['Als besonders langlebig bekannt', 'Double-VANOS über gesamten Drehzahlbereich', 'SULEV-Variante für US-Markt verfügbar', 'Basis für diverse Motorsportderivate'],
  },
  {
    enginecode: 'M47D20', displayname: 'M47 2.0d', generation: 'M',
    family: 'M47', variant: 'D20', firstbuildyear: 1998, lastbuildyear: 2007,
    applications: ['E46 318d', 'E46 320d', 'E39 520d'],
    specs: { displacement_ccm: 1951, cylinders: 4, valves: 16, compression: 19.0, power_kw: 110, horsepower: 150, torque_nm: 330, revlimit_rpm: 4800, powerat_rpm: 4000, torqueat_rpm: 2000, fueltype: 'Diesel', injectionsystem: 'Common-Rail', aspiration: 'Einzellader', oilcapacity_l: 5.0, emissionstandard: 'Euro 3/4' },
    description: 'Der M47 war BMWs erster Common-Rail-Diesel und setzte neue Maßstäbe in Effizienz und Laufruhe. Mit elektronisch geregelter Einspritzung und Turbolader bietet er beeindruckendes Drehmoment aus niedrigen Drehzahlen.',
    highlights: ['Erster BMW-Diesel mit Common-Rail', 'Kettentrieb — wartungsarm', 'Basis für Bi-Turbo-Derivate'],
  },
  {
    enginecode: 'N54B30', displayname: 'N54 3.0T', generation: 'N',
    family: 'N54', variant: 'B30', firstbuildyear: 2006, lastbuildyear: 2016,
    applications: ['E90/E92 335i', 'E60 535i', 'Z4 35i', 'F10 535i'],
    specs: { displacement_ccm: 2979, cylinders: 6, valves: 24, bore_mm: 84, stroke_mm: 89.6, compression: 10.2, power_kw: 225, horsepower: 306, torque_nm: 400, revlimit_rpm: 7000, powerat_rpm: 5800, torqueat_rpm: 1400, fueltype: 'Benzin', injectionsystem: 'Direkteinspritzung (HPI)', aspiration: 'Twin-Turbo parallel', engineweight_kg: 175, oilcapacity_l: 6.5, emissionstandard: 'Euro 4/5' },
    description: "Der N54 war ein Paradigmenwechsel: BMWs erster Turbomotor der modernen Ära. Die Twin-Turbo-Konfiguration mit Direkteinspritzung lieferte Saugmotor-Charakter mit Turbo-Schub. Bis heute eine Plattform für extreme Tuningbauten.",
    highlights: ["Twin-Scroll Turbolader", "Direkteinspritzung (zweites Einspritzsystem)", "Bis 1000+ PS im Tuning nachgewiesen", "Ward's 10 Best Engines"],
  },
  {
    enginecode: 'N20B20', displayname: 'N20 2.0T', generation: 'N',
    family: 'N20', variant: 'B20', firstbuildyear: 2011, lastbuildyear: 2017,
    applications: ['F20 125i', 'F30 328i', 'F10 528i', 'X3 28i'],
    specs: { displacement_ccm: 1997, cylinders: 4, valves: 16, bore_mm: 84, stroke_mm: 90.1, compression: 10.0, power_kw: 135, horsepower: 184, torque_nm: 270, revlimit_rpm: 6500, powerat_rpm: 5000, torqueat_rpm: 1250, fueltype: 'Benzin', injectionsystem: 'Direkteinspritzung', aspiration: 'Einzellader Twinscroll', engineweight_kg: 140, oilcapacity_l: 5.0, emissionstandard: 'Euro 5/6' },
    description: 'Der N20 ist der kompakte Vierzylinder-Turbomotor, der die klassische Reihensechs in kleineren Modellen ablöste. Valvetronic und VANOS zusammen ermöglichen für einen Vierzylinder ungewöhnliche Laufkultur.',
    highlights: ['Valvetronic + Double-VANOS', 'Twinscroll-Turbo für minimales Turboloch', 'Riemengetriebene Nockenwellen (beachten)', 'Leichtbau-Aluminiumblock'],
  },
  {
    enginecode: 'N47D20', displayname: 'N47 2.0d', generation: 'N',
    family: 'N47', variant: 'D20', firstbuildyear: 2007, lastbuildyear: 2015,
    applications: ['E90 318d', 'E90 320d', 'F10 520d', 'X1 20d'],
    specs: { displacement_ccm: 1995, cylinders: 4, valves: 16, compression: 16.5, power_kw: 130, horsepower: 177, torque_nm: 350, revlimit_rpm: 4800, powerat_rpm: 4000, torqueat_rpm: 1750, fueltype: 'Diesel', injectionsystem: 'Piezo-Common-Rail', aspiration: 'Einzellader variabel', oilcapacity_l: 5.0, emissionstandard: 'Euro 5' },
    description: 'Der N47 ist BMWs kompakter Diesel-Vierzylinder mit Piezo-Einspritzdüsen und variabler Turbogeometrie. Bekannt für exzellente Effizienz, aber auch für die Steuerkettenproblematik bei frühen Baujahren.',
    highlights: ['Piezo-Injektoren für präziseste Einspritzung', 'Variable Turbinengeometrie (VTG)', 'Steuerkette hinten — Achtung Frühbaureihe', 'Euro 5 durch SCR/AGR'],
  },
  {
    enginecode: 'B48B20', displayname: 'B48 2.0T', generation: 'B',
    family: 'B48', variant: 'B20', firstbuildyear: 2014, lastbuildyear: new Date().getFullYear(),
    applications: ['G20 320i', 'G20 330i', 'G30 530i', 'F40 M135i', 'X3 30i'],
    specs: { displacement_ccm: 1998, cylinders: 4, valves: 16, bore_mm: 82, stroke_mm: 94.6, compression: 11.0, power_kw: 135, horsepower: 184, torque_nm: 290, revlimit_rpm: 6500, powerat_rpm: 5000, torqueat_rpm: 1350, fueltype: 'Benzin', injectionsystem: 'Dual-Einspritzung (Port+DI)', aspiration: 'Einzellader Twinscroll', engineweight_kg: 132, oilcapacity_l: 5.0, emissionstandard: 'Euro 6d' },
    description: 'Der B48 ist BMWs modularer Benzin-Vierzylinder der neuesten Generation. Mit dualem Einspritzsystem (Port + Direkt), 48V-Mild-Hybrid-Option und Wirkungsgrad-Fokus setzt er modernste Effizienz- und Emissionsstandards.',
    highlights: ['Doppeltes Einspritzsystem (Port + DI)', '48V-Mild-Hybrid-Kompatibilität', 'Modulare Plattform (auch B46/B44)', 'OBD-2 Full-Compliance'],
  },
  {
    enginecode: 'B57D30', displayname: 'B57 3.0d', generation: 'B',
    family: 'B57', variant: 'D30', firstbuildyear: 2016, lastbuildyear: new Date().getFullYear(),
    applications: ['G30 530d', 'G30 540d', 'G05 X5 30d', 'G12 730d'],
    specs: { displacement_ccm: 2993, cylinders: 6, valves: 24, compression: 16.5, power_kw: 195, horsepower: 265, torque_nm: 620, revlimit_rpm: 4400, powerat_rpm: 4000, torqueat_rpm: 2000, fueltype: 'Diesel', injectionsystem: 'Piezo-Common-Rail 2500 bar', aspiration: 'Triple-Turbo (S: 4-Turbo)', oilcapacity_l: 7.0, emissionstandard: 'Euro 6d' },
    description: 'Der B57 ist BMWs Flaggschiff-Diesel und gilt als technisches Meisterstück. In der S-Ausführung mit vier Turboladern bietet er die Kraft eines Sportwagens bei Diesel-Effizienz.',
    highlights: ['Triple-Turbo (B57S: Quad-Turbo)', '2500 bar Einspritzdruck', 'Elektrischer Ladedruckstabilisator (48V)', 'Niedrigste Reibungsverluste im Segment'],
  },
  {
    enginecode: 'S58B30', displayname: 'S58 3.0T', generation: 'S',
    family: 'S58', variant: 'B30A0', firstbuildyear: 2019, lastbuildyear: new Date().getFullYear(),
    applications: ['G80 M3', 'G82 M4', 'G87 M2', 'G21 M3 Touring', 'G06 X6 M'],
    specs: { displacement_ccm: 2993, cylinders: 6, valves: 24, bore_mm: 84, stroke_mm: 90, compression: 9.3, power_kw: 375, horsepower: 510, torque_nm: 650, revlimit_rpm: 7200, powerat_rpm: 6250, torqueat_rpm: 2600, fueltype: 'Benzin', injectionsystem: 'Direkteinspritzung', aspiration: 'Twin-Turbo (Competition: 530 PS)', engineweight_kg: 195, oilcapacity_l: 9.0, emissionstandard: 'Euro 6d' },
    description: "Der S58 ist das aktuelle Flaggschiff unter den BMW-M-Triebwerken. Jeder Motor wird von einem einzigen Ingenieur assembliert und trägt dessen Namensschild. Er gewann den Best Performance Engine Award mehrfach in Folge.",
    highlights: ["Handfertigung — ein Ingenieur, ein Motor", "510 PS / 530 PS (Competition)", "Closed-Deck-Aluminiumblock", "Ward's Best Performance Engine 2020–2023", "Motorsport-Steuerkette vorne"],
  },
  {
    enginecode: 'S55B30', displayname: 'S55 3.0T', generation: 'S',
    family: 'S55', variant: 'B30A0', firstbuildyear: 2014, lastbuildyear: 2020,
    applications: ['F80 M3', 'F82 M4', 'F83 M4 Cabrio', 'F87 M2 Competition'],
    specs: { displacement_ccm: 2979, cylinders: 6, valves: 24, bore_mm: 84, stroke_mm: 89.6, compression: 9.0, power_kw: 317, horsepower: 431, torque_nm: 550, revlimit_rpm: 7600, powerat_rpm: 5500, torqueat_rpm: 1850, fueltype: 'Benzin', injectionsystem: 'Direkteinspritzung', aspiration: 'Twin-Turbo Mono-Scroll', engineweight_kg: 188, oilcapacity_l: 8.5, emissionstandard: 'Euro 6' },
    description: 'Der S55 ist der direkte Vorgänger des S58 und gilt als erste konsequente Turbo-Generation der M GmbH. Mit 7600 U/min und breitem Drehmomentplateau kombiniert er Turbo-Effizienz mit hochdrehender Charakteristik.',
    highlights: ['Erste Turbo-Generation der M GmbH', 'Sintermetall-Kolben für Hochdrehzahl', 'Motorsport-Öldüsen für Kolbenkühlung', 'Basis für GT-Motorsportprogramme'],
  },
  {
    enginecode: 'S54B32', displayname: 'S54 3.2', generation: 'S',
    family: 'S54', variant: 'B32', firstbuildyear: 2000, lastbuildyear: 2008,
    applications: ['E46 M3', 'Z3 M Coupé', 'Z3 M Roadster', 'Z4 M'],
    specs: { displacement_ccm: 3246, cylinders: 6, valves: 24, bore_mm: 87, stroke_mm: 91, compression: 11.5, power_kw: 252, horsepower: 343, torque_nm: 365, revlimit_rpm: 8000, powerat_rpm: 7900, torqueat_rpm: 4900, fueltype: 'Benzin', injectionsystem: 'Saugrohreinspritzung', aspiration: 'Saugmotor', engineweight_kg: 165, oilcapacity_l: 6.0, emissionstandard: 'Euro 3/4' },
    description: 'Der S54 gilt als heiliger Gral unter BMW-Saugmotoren. Mit 343 PS aus 3,2 Litern, einem Drehzahlband bis 8000 U/min liefert er ein Klangerlebnis und eine Ansprechcharakteristik, die kein Turbomotor replizieren kann.',
    highlights: ['105 PS pro Liter — ohne Aufladung', 'Individuelle Einlassdrosseln pro Zylinder', 'Rennsportabstammung vom S50', 'Klingt bis 8000 U/min wie ein Formel-Motor', '0–100 in 4,9 s (E46 M3)'],
  },
];

@Injectable({ providedIn: 'root' })
export class EngineService {
  private readonly apiUrl = '/api/engines';
  private readonly baseUrl = 'http://localhost:8080';

  constructor(private http: HttpClient) { }

  // Transform flattened backend response into nested Engine structure
  private normalizeEngine(raw: any): Engine {
    const specFields = [
      'displacement_ccm', 'cylinders', 'valves', 'bore_mm', 'stroke_mm',
      'compression', 'power_kw', 'horsepower', 'torque_nm', 'revlimit_rpm',
      'powerat_rpm', 'torqueat_rpm', 'fueltype', 'injectionsystem', 'aspiration',
      'engineweight_kg', 'oilcapacity_l', 'emissionstandard'
    ];

    const specs: any = {};
    specFields.forEach(field => {
      if (raw[field] !== undefined) {
        specs[field] = raw[field];
        delete raw[field]; // Remove from root to avoid duplication
      }
    });

    return { ...raw, specs } as Engine;
  }

  // getEngines(): Observable<Engine[]> {
  //   // TODO: return this.http.get<Engine[]>(this.apiUrl);
  //   return of(MOCK_ENGINES);
  // }

  getEngines(): Observable<Engine[]> {
    return this.http.get<any[]>(`${this.baseUrl}${this.apiUrl}`).pipe(
      map(engines => engines.map(e => this.normalizeEngine(e)))
    );
  }

    getEngineById(enginecode: string): Observable<Engine | undefined> {
      // TODO: return this.http.get<Engine>(`${this.apiUrl}/${enginecode}`);
      return of(MOCK_ENGINES.find((e) => e.enginecode === enginecode));
  }

  getEnginesByGeneration(gen: EngineGeneration): Observable<Engine[]> {
    // TODO: return this.http.get<Engine[]>(\`\${this.apiUrl}?generation=\${gen}\`);
    return of(MOCK_ENGINES.filter((e) => e.generation === gen));
  }
}
