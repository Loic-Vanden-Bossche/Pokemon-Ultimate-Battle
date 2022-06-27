import {Component, Input, OnInit} from '@angular/core';
import {PokemonsService} from "../../../services/pokemons.service";
import {Pokemon} from "../../../interfaces/pokemon";

@Component({
  selector: 'app-pokemon-list',
  templateUrl: './pokemon-list.component.html',
})
export class PokemonListComponent implements OnInit {
  @Input() poke: Pokemon | null = null;
  @Input() backgroundImg = '';

  constructor() {}

  ngOnInit(): void {
    console.log(this.backgroundImg);
  }

}
