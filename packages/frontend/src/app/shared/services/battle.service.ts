import { Injectable } from '@angular/core';
import { Pokemon } from '../interfaces/pokemon';
import { Subject } from 'rxjs';

export interface Fighter {
  name: string;
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

  private static _pokemonToFighter(pokemon: Pokemon): Fighter {
    return {
      name: pokemon.name,
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

      this.fightLogs.push(
        `${this._enemy.name} attacked you with ${this._enemy.attack} damage!`,
      );

      this._current.currentHP -= this._enemy.attack;

      if (this._current.currentHP <= 0) {
        this._current.currentHP = 0;
        this.fightLogs.push(
          `You lost the fight with ${this._enemy.currentHP}hp remaining!`,
        );
        this._battleEnded.next('enemy');
      }

      this._playerTurn = true;
    }
  }

  reset() {
    this._enemy = null;
    this._current = null;
    this._playerTurn = false;
    this.fightLogs = [];
  }

  run() {
    if (this._playerTurn) {
      this.fightLogs.push('You try to run away...');
      const success = Math.random() > 0.5;
      if (success) {
        this.fightLogs.push('You successfully ran away!');
        this._battleEnded.next('ran');
      } else {
        this.fightLogs.push('You failed to run away!');
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

      this.fightLogs.push(
        `You attacked ${this._enemy.name} with ${this._current.attack} damage!`,
      );

      this._enemy.currentHP -= this._current.attack;

      if (this._enemy.currentHP <= 0) {
        this._enemy.currentHP = 0;
        this.fightLogs.push(
          `You won the fight with ${this._current.currentHP}hp remaining!`,
        );
        this._battleEnded.next('player');
      } else {
        setTimeout(() => {
          this._enemyAttack();
        }, 500);
      }
    }
  }

  registerEnemy(pokemon: Pokemon) {
    this.fightLogs.push(`${pokemon.name} appeared!`);
    this._enemy = BattleService._pokemonToFighter(pokemon);
    this._checkStart();
  }

  registerCurrent(pokemon: Pokemon) {
    this.fightLogs.push(`You chose ${pokemon.name} to fight!`);
    this._current = BattleService._pokemonToFighter(pokemon);
    this._checkStart();
  }
}
