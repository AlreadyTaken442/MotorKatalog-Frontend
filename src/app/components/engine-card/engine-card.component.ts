import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Engine, GENERATION_META } from '../../models/engine.model';

@Component({
  selector: 'app-engine-card',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './engine-card.component.html',
  styleUrl: './engine-card.component.scss'
})
export class EngineCardComponent {
  @Input() engine!: Engine;
  @Output() openDetail = new EventEmitter<Engine>();

  get meta() { return GENERATION_META[this.engine.generation]; }
  get isSport() { return this.engine.generation === 'S'; }
  get fuelIcon() { return this.engine.specs.fueltype === 'Diesel' ? '⛽' : '🔥'; }
}
