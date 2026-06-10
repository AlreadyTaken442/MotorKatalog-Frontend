import { Component, EventEmitter, Input, Output, OnChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Engine, GENERATION_META } from '../../models/engine.model';

@Component({
  selector: 'app-engine-modal',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './engine-modal.component.html',
  styleUrl: './engine-modal.component.scss'
})
export class EngineModalComponent {
  @Input() engine: Engine | null = null;
  @Output() close = new EventEmitter<void>();

  get meta() { return this.engine ? GENERATION_META[this.engine.generation] : null; }
  get isSport() { return this.engine?.generation === 'S'; }

  specRows(specs: Engine['specs']): { label: string; value: string }[] {
    const rows: { label: string; value: string }[] = [];
    if (specs.displacement_ccm) rows.push({ label: 'Hubraum', value: `${specs.displacement_ccm.toLocaleString('de-DE')} cm³` });
    if (specs.cylinders) rows.push({ label: 'Zylinder', value: `${specs.cylinders} (Reihe)` });
    if (specs.valves) rows.push({ label: 'Ventile', value: `${specs.valves} gesamt` });
    if (specs.bore_mm && specs.stroke_mm) rows.push({ label: 'Bohrung × Hub', value: `${specs.bore_mm} × ${specs.stroke_mm} mm` });
    if (specs.compression) rows.push({ label: 'Verdichtung', value: `${specs.compression} : 1` });
    if (specs.power_kw && specs.horsepower) rows.push({ label: 'Leistung', value: `${specs.power_kw} kW / ${specs.horsepower} PS` });
    if (specs.powerat_rpm) rows.push({ label: 'Leistung bei', value: `${specs.powerat_rpm} U/min` });
    if (specs.torque_nm) rows.push({ label: 'Drehmoment', value: `${specs.torque_nm} Nm` });
    if (specs.torqueat_rpm) rows.push({ label: 'Max. Drehm. bei', value: `${specs.torqueat_rpm} U/min` });
    if (specs.revlimit_rpm) rows.push({ label: 'Drehzahlgrenze', value: `${specs.revlimit_rpm.toLocaleString('de-DE')} U/min` });
    if (specs.fueltype) rows.push({ label: 'Kraftstoff', value: specs.fueltype });
    if (specs.injectionsystem) rows.push({ label: 'Einspritzung', value: specs.injectionsystem });
    if (specs.aspiration) rows.push({ label: 'Aufladung', value: specs.aspiration });
    if (specs.engineweight_kg) rows.push({ label: 'Motorgewicht', value: `${specs.engineweight_kg} kg` });
    if (specs.oilcapacity_l) rows.push({ label: 'Ölmenge', value: `${specs.oilcapacity_l} l` });
    if (specs.emissionstandard) rows.push({ label: 'Abgasnorm', value: specs.emissionstandard });
    return rows;
  }

  onBackdropClick(event: MouseEvent) {
    if ((event.target as HTMLElement).classList.contains('modal-backdrop')) {
      this.close.emit();
    }
  }
}
