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
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-pokemon-modal',
  templateUrl: './pokemon-modal.component.html',
})
export class PokemonModalComponent implements OnChanges, OnDestroy {
  @Input() pokemon: string | null = null;
  @Input() isSelectable = false;
  @Output() pokemonSelected: EventEmitter<{
    pokemon: Pokemon;
    isEnemy: boolean;
  }> = new EventEmitter<{ pokemon: Pokemon; isEnemy: boolean }>();

  @Input() controls = false;
  @Input() canControl: 'left' | 'right' | 'both' = 'right';
  @Output() controlsClicked: EventEmitter<'left' | 'right'> = new EventEmitter<
    'left' | 'right'
  >();

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

  selectPokemon(isEnemy = false): void {
    if (this.pokemonData) {
      this.pokemonSelected.emit({ pokemon: this.pokemonData, isEnemy });
      this.modalService.close('pokemonModal');
    }
  }

  get types() {
    return this.pokemonData?.types.map((type) => type.name).join(' / ') || [];
  }

  get abilities() {
    return (
      this.pokemonData?.abilities.map((ability) => ability.name).join(' / ') ||
      []
    );
  }

  getBackgroundUrl(): string {
    return this.pokemonService.getBackgroundUrl(this.pokemonData) || '';
  }
}
