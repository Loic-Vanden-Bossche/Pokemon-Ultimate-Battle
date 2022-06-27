import { Component, OnInit } from '@angular/core';
import { Pokemon } from '../../shared/interfaces/pokemon';
import { ActivatedRoute, Router } from '@angular/router';
import { PokemonsService } from '../../shared/services/pokemons.service';
import { combineLatest, of } from 'rxjs';

@Component({
  selector: 'app-pokemons-selector',
  templateUrl: './pokemons-selector.component.html',
  styleUrls: ['./pokemons-selector.component.scss'],
})
export class PokemonsSelectorComponent implements OnInit {
  current: Pokemon | null = null;
  enemy: Pokemon | null = null;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private pokemonsService: PokemonsService,
  ) {}

  ngOnInit() {
    this.route.queryParams.subscribe((params) => {
      combineLatest(
        [params['enemy'], params['current']].map((name) =>
          name ? this.pokemonsService.getPokemonData(name) : of(null),
        ),
      ).subscribe((data) => {
        this.enemy = data[0];
        this.current = data[1];
      });
    });
  }

  onPokemonSelected(data: { pokemon: Pokemon; isEnemy: boolean }) {
    if (data.isEnemy) {
      this.enemy = data.pokemon;
    } else {
      this.current = data.pokemon;
    }

    this.router.navigate([], {
      queryParams: { enemy: this.enemy?.name, current: this.current?.name },
    });
  }

  startBattle() {
    this.router.navigate(['/arena'], {
      queryParams: { enemy: this.enemy?.name, current: this.current?.name },
    });
  }
}
