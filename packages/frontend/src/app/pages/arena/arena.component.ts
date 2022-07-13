import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { forkJoin, switchMap } from 'rxjs';
import { PokemonsService } from '../../shared/services/pokemons.service';
import { Pokemon } from "../../shared/interfaces/pokemon";

@Component({
  selector: 'app-arena',
  templateUrl: './arena.component.html',
  styleUrls: ['./arena.component.scss'],
})
export class ArenaComponent implements OnInit {

  enemy: Pokemon | null = null;
  current: Pokemon | null = null;

  takingDamages = false;

  constructor(
    private route: ActivatedRoute,
    private pokemonsService: PokemonsService,
  ) {}

  takeDamage(): void {
    this.takingDamages = true;
    setTimeout(() => {
      this.takingDamages = false;
    }, 1000);
  }

  ngOnInit(): void {
    this.route.queryParams
      .pipe(
        switchMap(({ enemy, current }) =>
          forkJoin([
            this.pokemonsService.getPokemonData(enemy),
            this.pokemonsService.getPokemonData(current),
          ]),
        ),
      )
      .subscribe(([enemy, current]) => {
        if (enemy && current) {
          this.enemy = enemy;
          this.current = current;
        }
      });
  }
}
