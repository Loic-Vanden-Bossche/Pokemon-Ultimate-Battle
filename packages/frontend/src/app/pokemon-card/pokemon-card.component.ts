import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { PokemonsService } from '../services/pokemons.service';
import { Subject, takeUntil } from 'rxjs';
import { Pokemon } from '../shared/interfaces/pokemon';

@Component({
  selector: 'app-pokemon-card',
  templateUrl: './pokemon-card.component.html',
  styleUrls: ['./pokemon-card.component.scss'],
})
export class PokemonCardComponent implements OnInit, OnDestroy {
  @Input() pokemonName: string | null = null;

  pokemonDetails: Pokemon | null = null;

  private _destroy = new Subject<void>();

  constructor(private readonly pokemonService: PokemonsService) {}

  ngOnInit(): void {
    this.pokemonService
      .getPokemonData(this.pokemonName || '')
      .pipe(takeUntil(this._destroy))
      .subscribe((data) => {
        this.pokemonDetails = data;
      });
  }

  ngOnDestroy(): void {
    this._destroy.next();
    this._destroy.complete();
  }
}
