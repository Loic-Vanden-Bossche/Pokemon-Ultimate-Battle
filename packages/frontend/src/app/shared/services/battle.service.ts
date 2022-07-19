import { Injectable } from '@angular/core';
import { Pokemon } from '../interfaces/pokemon';
import { Subject } from 'rxjs';

export interface Fighter {
  totalHP: number;
  currentHP: number;
  attack: number;
  defense: number;
  attacking: Subject<void>;
  defending: Subject<void>;
}

@Injectable({
  providedIn: 'root',
})
export class BattleService {
  private _enemy: Fighter | null = null;
  private _current: Fighter | null = null;

  private _battleEnded = new Subject<string>();
  private _playerTurn = false;

  get enemy(): Fighter | null {
    return this._enemy;
  }

  get current(): Fighter | null {
    return this._current;
  }

  get playerTurn() {
    return this._playerTurn;
  }

  get battleEnded(): Subject<string> {
    return this._battleEnded;
  }

  private static _pokemonToFighter(pokemon: Pokemon): Fighter {
    return {
      totalHP: 100,
      currentHP: 100,
      attack: pokemon.attack,
      defense: pokemon.defense,
      attacking: new Subject(),
      defending: new Subject(),
    };
  }

  private _enemyAttack() {
    if (this._enemy && this._current && !this._playerTurn) {
      this._enemy.attacking.next();
      this._current.defending.next();
      this._current.currentHP -= this._enemy.attack;

      if (this._current.currentHP <= 0) {
        this._current.currentHP = 0;
        this._battleEnded.next('enemy');
      }

      this._playerTurn = true;
    }
  }

  reset() {
    this._enemy = null;
    this._current = null;
    this._playerTurn = false;
  }

  run() {
    if (this._playerTurn) {
      const success = Math.random() > 0.5;
      if (success) {
        this._battleEnded.next('ran');
      } else {
        this._enemyAttack();
      }
    }
  }

  private _randomizeStart() {
    this._playerTurn = Math.random() > 0.5;
  }

  private _checkStart() {
    if (this._enemy && this._current) {
      this._randomizeStart();
      if (!this._playerTurn) {
        this._enemyAttack();
      }
    }
  }

  attackEnemy() {
    if (this._enemy && this._current && this._playerTurn) {
      this._playerTurn = false;
      this._current.attacking.next();
      this._enemy.defending.next();

      this._enemy.currentHP -= this._current.attack;

      if (this._enemy.currentHP <= 0) {
        this._enemy.currentHP = 0;
        this._battleEnded.next('current');
      } else {
        setTimeout(() => {
          this._enemyAttack();
        }, 500);
      }
    }
  }

  registerEnemy(pokemon: Pokemon) {
    this._enemy = BattleService._pokemonToFighter(pokemon);
    this._checkStart();
  }

  registerCurrent(pokemon: Pokemon) {
    this._current = BattleService._pokemonToFighter(pokemon);
    this._checkStart();
  }
}
