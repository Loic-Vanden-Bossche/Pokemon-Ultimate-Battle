import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { forkJoin, switchMap } from 'rxjs';
import { PokemonsService } from '../../shared/services/pokemons.service';
import { Pokemon } from '../../shared/interfaces/pokemon';
import { BattleService } from '../../shared/services/battle.service';

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
    private battleService: BattleService,
  ) {}

  get playing() {
    return this.battleService.playerTurn;
  }

  attack(): void {
    this.battleService.attackEnemy();
  }

  runAway(): void {
    this.battleService.run();
  }

  get player() {
    return this.battleService.current;
  }

  get opponent() {
    return this.battleService.enemy;
  }

  takeDamage(): void {
    this.takingDamages = true;
    setTimeout(() => {
      this.takingDamages = false;
    }, 1000);
  }

  ngOnInit(): void {
    this.battleService.reset();

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
          this.battleService.registerCurrent(this.current);
          this.battleService.registerEnemy(this.enemy);
        }
      });

    this.battleService.battleEnded.subscribe((winner) => {
      if (winner === 'enemy') {
        alert('You lost!');
      } else {
        alert('You won!');
      }
    });
  }
}
