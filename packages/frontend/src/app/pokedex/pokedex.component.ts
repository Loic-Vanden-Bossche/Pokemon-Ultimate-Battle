import { Component, OnInit } from '@angular/core';
import { PokedexService } from '../services/pokedex.service';

@Component({
  selector: 'app-pokedex',
  templateUrl: './pokedex.component.html',
  styleUrls: ['./pokedex.component.scss'],
})
export class PokedexComponent implements OnInit {
  pokemonNames: string[] = [];

  constructor(private readonly pokedexService: PokedexService) {}

  ngOnInit(): void {
    console.log('test');
    this.pokedexService.getPokemons().subscribe((pokemons) => {
      this.pokemonNames = pokemons;
    });
  }
}
