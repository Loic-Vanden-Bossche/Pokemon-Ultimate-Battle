import {
  Component,
  Input,
  OnChanges,
  OnDestroy,
  SimpleChanges,
} from '@angular/core';
import { Pokemon } from '../../../shared/interfaces/pokemon';
import { Fighter } from '../../../shared/services/battle.service';
import { ReplaySubject, takeUntil, tap } from 'rxjs';
import { animate, style, transition, trigger } from '@angular/animations';

@Component({
  selector: 'app-pokemon',
  templateUrl: './pokemon.component.html',
  styleUrls: ['./pokemon.component.scss'],
  animations: [
    trigger('onDamages', [
      transition(':enter', [
        style({ opacity: 0, transform: 'translateY(-20px)' }),
        animate('0.5s ease', style({ opacity: 1, transform: 'translateY(0)' })),
      ]),
    ]),
  ],
})
export class PokemonComponent implements OnChanges, OnDestroy {
  @Input() pokemon: Pokemon | null = null;
  @Input() fighter: Fighter | null = null;

  @Input() isEnemy = false;
  private _destroy$ = new ReplaySubject<void>(1);

  displayDamages: number | null = null;
  displayAttack: 'left' | 'right' | null = null;

  get lifePercentage(): string {
    if (this.fighter) {
      return `${(this.fighter.currentHP / this.fighter.totalHP) * 100}%`;
    }
    return '0%';
  }

  getAttackAnimationClasses(direction: 'left' | 'right') {
    return direction === 'left'
      ? ['translate-y-full', '-translate-x-full']
      : ['-translate-y-full', 'translate-x-full'];
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['fighter']) {
      this.fighter?.defending
        .pipe(
          takeUntil(this._destroy$),
          tap((damages) => (this.displayDamages = damages)),
        )
        .subscribe(() => {
          setTimeout(() => {
            this.displayDamages = null;
          }, 1000);
        });

      this.fighter?.attacking
        .pipe(
          takeUntil(this._destroy$),
          tap((direction) => (this.displayAttack = direction)),
        )
        .subscribe(() => {
          setTimeout(() => {
            this.displayAttack = null;
          }, 1000);
        });
    }
  }

  ngOnDestroy() {
    this._destroy$.next();
    this._destroy$.complete();
  }
}
