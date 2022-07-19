import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Pokemon } from '../../../interfaces/pokemon';

@Component({
  selector: 'app-pokemon-selector-summary',
  templateUrl: './pokemon-selector-summary.component.html',
})
export class PokemonSelectorSummaryComponent {
  @Input() current: Pokemon | null = null;
  @Input() enemy: Pokemon | null = null;

  @Output() startBattle: EventEmitter<void> = new EventEmitter();

  get backgroundCurrent() {
    return this.current?.frontSprite || 'assets/silhouette.png';
  }

  get backgroundEnemy() {
    return this.enemy?.frontSprite || 'assets/silhouette.png';
  }
}
