import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnDestroy,
  Output,
  SimpleChanges,
} from '@angular/core';
import { ModalService } from '../../../services/modal.service';
import { PokemonsService } from '../../../services/pokemons.service';
import { Pokemon } from '../../../interfaces/pokemon';
import { map, Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-pokemon-modal',
  templateUrl: './pokemon-modal.component.html',
})
export class PokemonModalComponent implements OnChanges, OnDestroy {
  @Input() pokemon: string | null = null;
  @Output() pokemonSelected: EventEmitter<{
    pokemon: Pokemon;
    isEnemy: boolean;
  }> = new EventEmitter<{ pokemon: Pokemon; isEnemy: boolean }>();

  private $destroy: Subject<void> = new Subject<void>();

  pokemonData: null | Pokemon = null;

  constructor(
    private modalService: ModalService,
    private pokemonService: PokemonsService,
  ) {}

  ngOnChanges(changes: SimpleChanges) {
    if (changes['pokemon']) {
      if (this.pokemon) {
        this.pokemonService
          .getPokemonData(this.pokemon)
          .pipe(takeUntil(this.$destroy))
          .subscribe((pokemon) => {
            this.pokemonData = pokemon;
          });
      }
    }
  }

  ngOnDestroy() {
    this.$destroy.next();
    this.$destroy.complete();
  }

  selectPokemon(isEnemy: boolean): void {
    if (this.pokemonData) {
      this.pokemonSelected.emit({ pokemon: this.pokemonData, isEnemy });
      this.modalService.close('pokemonModal');
    }
  }

  getBackgroundUrl(): string {
    return this.pokemonService.getBackgroundUrl(this.pokemonData) || '';
  }
}
