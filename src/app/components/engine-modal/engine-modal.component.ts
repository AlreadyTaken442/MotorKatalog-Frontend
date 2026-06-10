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
    if (specs.displacement) rows.push({ label: 'Hubraum', value: `${specs.displacement.toLocaleString('de-DE')} cm³` });
    if (specs.cylinders) rows.push({ label: 'Zylinder', value: `${specs.cylinders} (Reihe)` });
    if (specs.valves) rows.push({ label: 'Ventile', value: `${specs.valves} gesamt` });
    if (specs.bore && specs.stroke) rows.push({ label: 'Bohrung × Hub', value: `${specs.bore} × ${specs.stroke} mm` });
    if (specs.compression) rows.push({ label: 'Verdichtung', value: `${specs.compression} : 1` });
    if (specs.powerKw && specs.powerHp) rows.push({ label: 'Leistung', value: `${specs.powerKw} kW / ${specs.powerHp} PS` });
    if (specs.peakPowerRpm) rows.push({ label: 'Leistung bei', value: `${specs.peakPowerRpm} U/min` });
    if (specs.torqueNm) rows.push({ label: 'Drehmoment', value: `${specs.torqueNm} Nm` });
    if (specs.peakTorqueRpm) rows.push({ label: 'Max. Drehm. bei', value: `${specs.peakTorqueRpm} U/min` });
    if (specs.redlineRpm) rows.push({ label: 'Drehzahlgrenze', value: `${specs.redlineRpm.toLocaleString('de-DE')} U/min` });
    if (specs.fuelType) rows.push({ label: 'Kraftstoff', value: specs.fuelType });
    if (specs.injection) rows.push({ label: 'Einspritzung', value: specs.injection });
    if (specs.turbo) rows.push({ label: 'Aufladung', value: specs.turbo });
    if (specs.weight) rows.push({ label: 'Motorgewicht', value: `${specs.weight} kg` });
    if (specs.oilCapacity) rows.push({ label: 'Ölmenge', value: `${specs.oilCapacity} l` });
    if (specs.emissionStandard) rows.push({ label: 'Abgasnorm', value: specs.emissionStandard });
    return rows;
  }

  onBackdropClick(event: MouseEvent) {
    if ((event.target as HTMLElement).classList.contains('modal-backdrop')) {
      this.close.emit();
    }
  }
}
