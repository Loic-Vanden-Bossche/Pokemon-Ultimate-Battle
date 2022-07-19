import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
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

  endStatus: 'enemy' | 'player' | 'ran' | null = null;

  takingDamages = false;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
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

  restartFight(): void {
    this.battleService.reset();
    this.endStatus = null;

    if (this.enemy && this.current) {
      this.battleService.registerCurrent(this.current);
      this.battleService.registerEnemy(this.enemy);
    }
  }

  navigateToSelection(): void {
    this.router.navigate(['/selector'], {
      queryParams: { enemy: this.enemy?.name, current: this.current?.name },
    });
  }

  takeDamage(): void {
    this.takingDamages = true;
    setTimeout(() => {
      this.takingDamages = false;
    }, 1000);
  }

  get statusColor(): string {
    switch (this.endStatus) {
      case 'enemy':
        return 'red-500';
      case 'player':
        return 'green-500';
      case 'ran':
        return 'violet-500';
      default:
        return 'white';
    }
  }

  ngOnInit(): void {
    this.restartFight();

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

    this.battleService.battleEnded.subscribe((status) => {
      this.endStatus = status;
    });
  }
}
