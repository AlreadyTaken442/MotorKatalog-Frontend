import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { Engine, EngineGeneration } from '../models/engine.model';

const MOCK_ENGINES: Engine[] = [
  {
    id: 'm52b28', code: 'M52B28', generation: 'M', name: 'M52 2.8',
    family: 'M52', variant: 'B28', years: '1995–2000',
    applications: ['E36 328i', 'E39 528i', 'E46 328i', 'Z3 2.8'],
    specs: { displacement: 2793, cylinders: 6, valves: 24, bore: 84, stroke: 84, compression: 10.2, powerKw: 142, powerHp: 193, torqueNm: 280, redlineRpm: 6500, peakPowerRpm: '5500', peakTorqueRpm: '3950', fuelType: 'Benzin', injection: 'Saugrohreinspritzung', turbo: 'Saugmotor', weight: 140, oilCapacity: 6.5, emissionStandard: 'Euro 2/3' },
    description: 'Der M52B28 ist das Herzstück des E36/E39 in der Sechszylinder-Topversion. Mit Aluminium-Zylinderblock, Double-VANOS und 24 Ventilen bietet er ein ausgewogenes Leistungs- und Drehmomentband, das Sportlichkeit mit Alltagstauglichkeit vereint.',
    highlights: ['Aluminium-Zylinderblock (ab M52TU)', 'Double-VANOS Nockenwellenverstellung', 'Kettenantrieb der Nockenwellen', 'DMS-Diagnosemotorsteuerung'],
  },
  {
    id: 'm54b30', code: 'M54B30', generation: 'M', name: 'M54 3.0',
    family: 'M54', variant: 'B30', years: '2000–2006',
    applications: ['E46 330i', 'E39 530i', 'E60 530i', 'Z4 3.0i', 'X5 3.0i'],
    specs: { displacement: 2979, cylinders: 6, valves: 24, bore: 84, stroke: 89.6, compression: 10.2, powerKw: 170, powerHp: 231, torqueNm: 300, redlineRpm: 6500, peakPowerRpm: '5900', peakTorqueRpm: '3500', fuelType: 'Benzin', injection: 'Saugrohreinspritzung', turbo: 'Saugmotor', weight: 152, oilCapacity: 6.5, emissionStandard: 'Euro 3/4' },
    description: 'Der M54B30 gilt als einer der zuverlässigsten BMW-Sechszylinder aller Zeiten. Mit 3,0 Litern Hubraum, Double-VANOS und einem breiten nutzbaren Drehzahlband ist er der ideale Allrounder.',
    highlights: ['Als besonders langlebig bekannt', 'Double-VANOS über gesamten Drehzahlbereich', 'SULEV-Variante für US-Markt verfügbar', 'Basis für diverse Motorsportderivate'],
  },
  {
    id: 'm47d20', code: 'M47D20', generation: 'M', name: 'M47 2.0d',
    family: 'M47', variant: 'D20', years: '1998–2007',
    applications: ['E46 318d', 'E46 320d', 'E39 520d'],
    specs: { displacement: 1951, cylinders: 4, valves: 16, compression: 19.0, powerKw: 110, powerHp: 150, torqueNm: 330, redlineRpm: 4800, peakPowerRpm: '4000', peakTorqueRpm: '2000', fuelType: 'Diesel', injection: 'Common-Rail', turbo: 'Einzellader', oilCapacity: 5.0, emissionStandard: 'Euro 3/4' },
    description: 'Der M47 war BMWs erster Common-Rail-Diesel und setzte neue Maßstäbe in Effizienz und Laufruhe. Mit elektronisch geregelter Einspritzung und Turbolader bietet er beeindruckendes Drehmoment aus niedrigen Drehzahlen.',
    highlights: ['Erster BMW-Diesel mit Common-Rail', 'Kettentrieb — wartungsarm', 'Basis für Bi-Turbo-Derivate'],
  },
  {
    id: 'n54b30', code: 'N54B30', generation: 'N', name: 'N54 3.0T',
    family: 'N54', variant: 'B30', years: '2006–2016',
    applications: ['E90/E92 335i', 'E60 535i', 'Z4 35i', 'F10 535i'],
    specs: { displacement: 2979, cylinders: 6, valves: 24, bore: 84, stroke: 89.6, compression: 10.2, powerKw: 225, powerHp: 306, torqueNm: 400, redlineRpm: 7000, peakPowerRpm: '5800', peakTorqueRpm: '1400–5000', fuelType: 'Benzin', injection: 'Direkteinspritzung (HPI)', turbo: 'Twin-Turbo parallel', weight: 175, oilCapacity: 6.5, emissionStandard: 'Euro 4/5' },
    description: "Der N54 war ein Paradigmenwechsel: BMWs erster Turbomotor der modernen Ära. Die Twin-Turbo-Konfiguration mit Direkteinspritzung lieferte Saugmotor-Charakter mit Turbo-Schub. Bis heute eine Plattform für extreme Tuningbauten.",
    highlights: ["Twin-Scroll Turbolader", "Direkteinspritzung (zweites Einspritzsystem)", "Bis 1000+ PS im Tuning nachgewiesen", "Ward's 10 Best Engines"],
  },
  {
    id: 'n20b20', code: 'N20B20', generation: 'N', name: 'N20 2.0T',
    family: 'N20', variant: 'B20', years: '2011–2017',
    applications: ['F20 125i', 'F30 328i', 'F10 528i', 'X3 28i'],
    specs: { displacement: 1997, cylinders: 4, valves: 16, bore: 84, stroke: 90.1, compression: 10.0, powerKw: 135, powerHp: 184, torqueNm: 270, redlineRpm: 6500, peakPowerRpm: '5000', peakTorqueRpm: '1250–4500', fuelType: 'Benzin', injection: 'Direkteinspritzung', turbo: 'Einzellader Twinscroll', weight: 140, oilCapacity: 5.0, emissionStandard: 'Euro 5/6' },
    description: 'Der N20 ist der kompakte Vierzylinder-Turbomotor, der die klassische Reihensechs in kleineren Modellen ablöste. Valvetronic und VANOS zusammen ermöglichen für einen Vierzylinder ungewöhnliche Laufkultur.',
    highlights: ['Valvetronic + Double-VANOS', 'Twinscroll-Turbo für minimales Turboloch', 'Riemengetriebene Nockenwellen (beachten)', 'Leichtbau-Aluminiumblock'],
  },
  {
    id: 'n47d20', code: 'N47D20', generation: 'N', name: 'N47 2.0d',
    family: 'N47', variant: 'D20', years: '2007–2015',
    applications: ['E90 318d', 'E90 320d', 'F10 520d', 'X1 20d'],
    specs: { displacement: 1995, cylinders: 4, valves: 16, compression: 16.5, powerKw: 130, powerHp: 177, torqueNm: 350, redlineRpm: 4800, peakPowerRpm: '4000', peakTorqueRpm: '1750–2750', fuelType: 'Diesel', injection: 'Piezo-Common-Rail', turbo: 'Einzellader variabel', oilCapacity: 5.0, emissionStandard: 'Euro 5' },
    description: 'Der N47 ist BMWs kompakter Diesel-Vierzylinder mit Piezo-Einspritzdüsen und variabler Turbogeometrie. Bekannt für exzellente Effizienz, aber auch für die Steuerkettenproblematik bei frühen Baujahren.',
    highlights: ['Piezo-Injektoren für präziseste Einspritzung', 'Variable Turbinengeometrie (VTG)', 'Steuerkette hinten — Achtung Frühbaureihe', 'Euro 5 durch SCR/AGR'],
  },
  {
    id: 'b48b20', code: 'B48B20', generation: 'B', name: 'B48 2.0T',
    family: 'B48', variant: 'B20', years: '2014–heute',
    applications: ['G20 320i', 'G20 330i', 'G30 530i', 'F40 M135i', 'X3 30i'],
    specs: { displacement: 1998, cylinders: 4, valves: 16, bore: 82, stroke: 94.6, compression: 11.0, powerKw: 135, powerHp: 184, torqueNm: 290, redlineRpm: 6500, peakPowerRpm: '5000–6500', peakTorqueRpm: '1350–4600', fuelType: 'Benzin', injection: 'Dual-Einspritzung (Port+DI)', turbo: 'Einzellader Twinscroll', weight: 132, oilCapacity: 5.0, emissionStandard: 'Euro 6d' },
    description: 'Der B48 ist BMWs modularer Benzin-Vierzylinder der neuesten Generation. Mit dualem Einspritzsystem (Port + Direkt), 48V-Mild-Hybrid-Option und Wirkungsgrad-Fokus setzt er modernste Effizienz- und Emissionsstandards.',
    highlights: ['Doppeltes Einspritzsystem (Port + DI)', '48V-Mild-Hybrid-Kompatibilität', 'Modulare Plattform (auch B46/B44)', 'OBD-2 Full-Compliance'],
  },
  {
    id: 'b57d30', code: 'B57D30', generation: 'B', name: 'B57 3.0d',
    family: 'B57', variant: 'D30', years: '2016–heute',
    applications: ['G30 530d', 'G30 540d', 'G05 X5 30d', 'G12 730d'],
    specs: { displacement: 2993, cylinders: 6, valves: 24, compression: 16.5, powerKw: 195, powerHp: 265, torqueNm: 620, redlineRpm: 4400, peakPowerRpm: '4000', peakTorqueRpm: '2000–2500', fuelType: 'Diesel', injection: 'Piezo-Common-Rail 2500 bar', turbo: 'Triple-Turbo (S: 4-Turbo)', oilCapacity: 7.0, emissionStandard: 'Euro 6d' },
    description: 'Der B57 ist BMWs Flaggschiff-Diesel und gilt als technisches Meisterstück. In der S-Ausführung mit vier Turboladern bietet er die Kraft eines Sportwagens bei Diesel-Effizienz.',
    highlights: ['Triple-Turbo (B57S: Quad-Turbo)', '2500 bar Einspritzdruck', 'Elektrischer Ladedruckstabilisator (48V)', 'Niedrigste Reibungsverluste im Segment'],
  },
  {
    id: 's58b30', code: 'S58B30', generation: 'S', name: 'S58 3.0T',
    family: 'S58', variant: 'B30A0', years: '2019–heute',
    applications: ['G80 M3', 'G82 M4', 'G87 M2', 'G21 M3 Touring', 'G06 X6 M'],
    specs: { displacement: 2993, cylinders: 6, valves: 24, bore: 84, stroke: 90, compression: 9.3, powerKw: 375, powerHp: 510, torqueNm: 650, redlineRpm: 7200, peakPowerRpm: '6250', peakTorqueRpm: '2600–5950', fuelType: 'Benzin', injection: 'Direkteinspritzung', turbo: 'Twin-Turbo (Competition: 530 PS)', weight: 195, oilCapacity: 9.0, emissionStandard: 'Euro 6d' },
    description: "Der S58 ist das aktuelle Flaggschiff unter den BMW-M-Triebwerken. Jeder Motor wird von einem einzigen Ingenieur assembliert und trägt dessen Namensschild. Er gewann den Best Performance Engine Award mehrfach in Folge.",
    highlights: ["Handfertigung — ein Ingenieur, ein Motor", "510 PS / 530 PS (Competition)", "Closed-Deck-Aluminiumblock", "Ward's Best Performance Engine 2020–2023", "Motorsport-Steuerkette vorne"],
  },
  {
    id: 's55b30', code: 'S55B30', generation: 'S', name: 'S55 3.0T',
    family: 'S55', variant: 'B30A0', years: '2014–2020',
    applications: ['F80 M3', 'F82 M4', 'F83 M4 Cabrio', 'F87 M2 Competition'],
    specs: { displacement: 2979, cylinders: 6, valves: 24, bore: 84, stroke: 89.6, compression: 9.0, powerKw: 317, powerHp: 431, torqueNm: 550, redlineRpm: 7600, peakPowerRpm: '5500–7300', peakTorqueRpm: '1850–5500', fuelType: 'Benzin', injection: 'Direkteinspritzung', turbo: 'Twin-Turbo Mono-Scroll', weight: 188, oilCapacity: 8.5, emissionStandard: 'Euro 6' },
    description: 'Der S55 ist der direkte Vorgänger des S58 und gilt als erste konsequente Turbo-Generation der M GmbH. Mit 7600 U/min und breitem Drehmomentplateau kombiniert er Turbo-Effizienz mit hochdrehender Charakteristik.',
    highlights: ['Erste Turbo-Generation der M GmbH', 'Sintermetall-Kolben für Hochdrehzahl', 'Motorsport-Öldüsen für Kolbenkühlung', 'Basis für GT-Motorsportprogramme'],
  },
  {
    id: 's54b32', code: 'S54B32', generation: 'S', name: 'S54 3.2',
    family: 'S54', variant: 'B32', years: '2000–2008',
    applications: ['E46 M3', 'Z3 M Coupé', 'Z3 M Roadster', 'Z4 M'],
    specs: { displacement: 3246, cylinders: 6, valves: 24, bore: 87, stroke: 91, compression: 11.5, powerKw: 252, powerHp: 343, torqueNm: 365, redlineRpm: 8000, peakPowerRpm: '7900', peakTorqueRpm: '4900', fuelType: 'Benzin', injection: 'Saugrohreinspritzung', turbo: 'Saugmotor', weight: 165, oilCapacity: 6.0, emissionStandard: 'Euro 3/4' },
    description: 'Der S54 gilt als heiliger Gral unter BMW-Saugmotoren. Mit 343 PS aus 3,2 Litern, einem Drehzahlband bis 8000 U/min liefert er ein Klangerlebnis und eine Ansprechcharakteristik, die kein Turbomotor replizieren kann.',
    highlights: ['105 PS pro Liter — ohne Aufladung', 'Individuelle Einlassdrosseln pro Zylinder', 'Rennsportabstammung vom S50', 'Klingt bis 8000 U/min wie ein Formel-Motor', '0–100 in 4,9 s (E46 M3)'],
  },
];

@Injectable({ providedIn: 'root' })
export class EngineService {
  private readonly apiUrl = '/api/engines';

  constructor(private http: HttpClient) { }

  // getEngines(): Observable<Engine[]> {
  //   // TODO: return this.http.get<Engine[]>(this.apiUrl);
  //   return of(MOCK_ENGINES);
  // }

  getEngines(): Observable<Engine[]> {
    return this.http.get<Engine[]>('/api/engines');
  }

  getEngineById(id: string): Observable<Engine | undefined> {
    // TODO: return this.http.get<Engine>(\`\${this.apiUrl}/\${id}\`);
    return of(MOCK_ENGINES.find((e) => e.id === id));
  }

  getEnginesByGeneration(gen: EngineGeneration): Observable<Engine[]> {
    // TODO: return this.http.get<Engine[]>(\`\${this.apiUrl}?generation=\${gen}\`);
    return of(MOCK_ENGINES.filter((e) => e.generation === gen));
  }
}
