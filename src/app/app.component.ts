import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterOutlet } from '@angular/router';
import { Engine, EngineGeneration, GENERATION_META } from './models/engine.model';
import { EngineService } from './services/engine.service';
import { GenerationTabsComponent } from './components/generation-tabs/generation-tabs.component';
import { EngineCardComponent } from './components/engine-card/engine-card.component';
import { EngineModalComponent } from './components/engine-modal/engine-modal.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterOutlet, GenerationTabsComponent, EngineCardComponent, EngineModalComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit {
  allEngines: Engine[] = [];
  filteredEngines: Engine[] = [];
  activeGeneration: EngineGeneration = 'M';
  selectedEngine: Engine | null = null;
  searchQuery = '';

  readonly genMeta = GENERATION_META;

  get currentMeta() { return this.genMeta[this.activeGeneration]; }

  constructor(private engineService: EngineService) {}

  ngOnInit() {
    this.engineService.getEngines().subscribe(engines => {
      this.allEngines = engines;
      this.applyFilter();
    });
  }

  onGenerationChange(gen: EngineGeneration) {
    this.activeGeneration = gen;
    this.searchQuery = '';
    this.applyFilter();
  }

  onSearch(query: string) {
    this.searchQuery = query;
    this.applyFilter();
  }

  applyFilter() {
    const q = this.searchQuery.toLowerCase().trim();
    this.filteredEngines = this.allEngines
      .filter(e => e.generation === this.activeGeneration)
      .filter(e => !q ||
        e.code.toLowerCase().includes(q) ||
        e.name.toLowerCase().includes(q) ||
        e.applications.some(a => a.toLowerCase().includes(q)));
  }

  openEngine(engine: Engine) { this.selectedEngine = engine; }
  closeModal() { this.selectedEngine = null; }

  countByGeneration(gen: EngineGeneration): number {
    return this.allEngines.filter(e => e.generation === gen).length;
  }

  trackById(_: number, engine: Engine): string { return engine.id; }
}
