import { Injectable } from '@angular/core';
import { Pokemon } from '../interfaces/pokemon';
import { Subject, tap } from "rxjs";

export interface Fighter {
  name: string;
  totalHP: number;
  currentHP: number;
  attack: number;
  defense: number;
  attacking: Subject<'left' | 'right'>;
  defending: Subject<number>;
}

@Injectable({
  providedIn: 'root',
})
export class BattleService {
  private _enemy: Fighter | null = null;
  private _current: Fighter | null = null;

  private _defaultMaxHP = 500;

  private _battleEnded = new Subject<'enemy' | 'player' | 'ran' | null>();
  private _playerTurn = false;

  fightLogs: string[] = [];

  get enemy(): Fighter | null {
    return this._enemy;
  }

  get current(): Fighter | null {
    return this._current;
  }

  get playerTurn() {
    return this._playerTurn;
  }

  get battleEnded() {
    return this._battleEnded;
  }

  private _pokemonToFighter(pokemon: Pokemon): Fighter {
    return {
      name: pokemon.name,
      totalHP: this._defaultMaxHP + pokemon.defense,
      currentHP: this._defaultMaxHP + pokemon.defense,
      attack: pokemon.attack,
      defense: pokemon.defense,
      attacking: new Subject(),
      defending: new Subject(),
    };
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

  private _enemyAttack() {
    setTimeout(() => {
      if (this._enemy && this._current && !this._playerTurn) {
        this._enemy.attacking.next('left');
        this._current.defending.next(this._enemy.attack);

        this._pushLog(
          `${this._enemy.name} attacked you with ${this._enemy.attack} damage!`,
        );

        this._current.currentHP -= this._enemy.attack;
        if (this._current.currentHP <= 0) {
          this._current.currentHP = 0;
          this._pushLog(
            `You lost the fight with ${this._enemy.currentHP}hp remaining!`,
          );
          this._battleEnded.next('enemy');
          return;
        }

        setTimeout(() => {
          this._playerTurn = true;
        }, 1000);
      }
    }, 2000);
  }

  reset() {
    this._enemy = null;
    this._current = null;
    this._playerTurn = false;
    this.fightLogs = [];
  }

  _pushLog(log: string) {
    this.fightLogs = [...this.fightLogs, log];
  }

  run() {
    if (this._playerTurn) {
      this._playerTurn = false;
      this._pushLog('You try to run away...');
      const success = Math.random() > 0.5;
      if (success) {
        this._pushLog('You successfully ran away!');
        this._battleEnded.next('ran');
      } else {
        this._pushLog('You failed to run away!');
        this._enemyAttack();
      }
    }
  }

  attackEnemy() {
    if (this._enemy && this._current && this._playerTurn) {
      this._playerTurn = false;
      this._current.attacking.next('right');
      this._enemy.defending.next(this._current.attack);

      this._pushLog(
        `You attacked ${this._enemy.name} with ${this._current.attack} damage!`,
      );

      this._enemy.currentHP -= this._current.attack;

      if (this._enemy.currentHP <= 0) {
        this._enemy.currentHP = 0;
        this._pushLog(
          `You won the fight with ${this._current.currentHP}hp remaining!`,
        );
        this._battleEnded.next('player');
      } else {
        this._enemyAttack();
      }
    }
  }

  registerEnemy(pokemon: Pokemon) {
    this._pushLog(`${pokemon.name} appeared!`);
    this._enemy = this._pokemonToFighter(pokemon);
    this._checkStart();
  }

  registerCurrent(pokemon: Pokemon) {
    this._pushLog(`You chose ${pokemon.name} to fight!`);
    this._current = this._pokemonToFighter(pokemon);
    this._checkStart();
  }
}
