import { Component, OnInit, Input } from '@angular/core';
import {Pokemon} from "../../shared/interfaces/pokemon";

@Component({
  selector: 'app-pokemons-selector',
  templateUrl: './pokemons-selector.component.html',
  styleUrls: ['./pokemons-selector.component.scss'],
})
export class PokemonsSelectorComponent implements OnInit {

  myFighter: Pokemon | null = null;
  opponent: Pokemon | null = null;
  imgFighter = '../assets/sacha-pikachu-pokemon.jpg';
  imgOpponent = '../assets/regis.jpg';

  constructor() {}

  ngOnInit(): void {

  }
}
