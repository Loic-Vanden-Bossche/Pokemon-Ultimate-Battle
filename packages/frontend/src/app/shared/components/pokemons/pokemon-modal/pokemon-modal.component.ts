import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from "@angular/core";
import { ModalService } from "../../../services/modal.service";
import { PokemonsService } from "../../../services/pokemons.service";
import { Pokemon } from "../../../interfaces/pokemon";

@Component({
  selector: 'app-pokemon-modal',
  templateUrl: './pokemon-modal.component.html'
})
export class PokemonModal implements OnChanges{
  @Input() pokemon: string | null = null;
  @Output() pokemonSelected: EventEmitter<{ pokemon: Pokemon, isEnemy: boolean }> = new EventEmitter<{ pokemon: Pokemon, isEnemy: boolean }>();

  pokemonData: null | Pokemon = null;

  constructor(
    private modalService: ModalService,
    private pokemonService: PokemonsService
  ) {}

  ngOnChanges(changes: SimpleChanges) {
    if (changes['pokemon']) {
      if (this.pokemon) {
        this.pokemonService.getPokemonData(this.pokemon).subscribe(pokemon => {
          this.pokemonData = pokemon;
        });
      }
    }
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
