import { Component, OnInit } from '@angular/core';
import { PokedexService } from '../services/pokedex.service';

@Component({
  selector: 'app-pokedex',
  templateUrl: './pokedex.component.html',
  styleUrls: ['./pokedex.component.scss'],
})
export class PokedexComponent implements OnInit {
  lines: string[][] = [];

  constructor(private readonly pokedexService: PokedexService) {}

  ngOnInit(): void {
    this.pokedexService.getPokemons().subscribe((pokemons) => {
      this.lines = pokemons.reduce((acc, pokemon, index) => {
        if (index % 3 === 0) {
          acc.push([pokemon]);
        } else {
          acc[acc.length - 1].push(pokemon);
        }
        return acc;
      }, [] as string[][]);
    });
  }
}
