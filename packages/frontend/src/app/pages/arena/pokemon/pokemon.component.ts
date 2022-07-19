import { Component, Input } from '@angular/core';
import { Pokemon } from '../../../shared/interfaces/pokemon';
import { Fighter } from '../../../shared/services/battle.service';

@Component({
  selector: 'app-pokemon',
  templateUrl: './pokemon.component.html',
})
export class PokemonComponent {
  @Input() pokemon: Pokemon | null = null;
  @Input() fighter: Fighter | null = null;

  @Input() isEnemy = false;

  get lifePercentage(): string {
    if (this.fighter) {
      return `${(this.fighter.currentHP / this.fighter.totalHP) * 100}%`;
    }
    return '0%';
  }
}
