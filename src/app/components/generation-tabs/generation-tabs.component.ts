import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EngineGeneration, GENERATION_META, GenerationMeta } from '../../models/engine.model';

@Component({
  selector: 'app-generation-tabs',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './generation-tabs.component.html',
  styleUrl: './generation-tabs.component.scss'
})
export class GenerationTabsComponent {
  @Input() activeGeneration: EngineGeneration = 'M';
  @Output() generationChange = new EventEmitter<EngineGeneration>();

  generations: GenerationMeta[] = Object.values(GENERATION_META);

  select(gen: EngineGeneration) {
    this.generationChange.emit(gen);
  }
}
