import { TestBed } from '@angular/core/testing';
import { BattleService } from './battle.service';
import { Pokemon } from '../interfaces/pokemon';
import { pokemonsMocks } from '../../../../mocks/pokemons';

describe('BattleService', () => {
  let service: BattleService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BattleService);
    spyOn(Math, 'random').and.returnValue(0.9);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('current should be null at start', () => {
    expect(service.current).toBeNull();
  });

  it('current pokemon should become a fighter', () => {
    const [snorlax]: Pokemon[] = pokemonsMocks;
    service.registerCurrent(snorlax);

    expect(service.current).toBeTruthy();
  });

  it('enemy should be null at start', () => {
    expect(service.enemy).toBeNull();
  });

  it('enemy pokemon should become a fighter', () => {
    const [snorlax]: Pokemon[] = pokemonsMocks;
    service.registerEnemy(snorlax);

    expect(service.enemy).toBeTruthy();
  });

  it('Not starts if only one pokemon is registered', () => {
    const [snorlax]: Pokemon[] = pokemonsMocks;
    service.registerCurrent(snorlax);

    expect(service.started).toBeFalse();
  });

  it('Battle starts if 2 pokemons registered', () => {
    const [snorlax, mew]: Pokemon[] = pokemonsMocks;
    service.registerCurrent(snorlax);
    service.registerEnemy(mew);

    expect(service.started).toBeTrue();
  });

  it('Attack should not have effects if 1 or no pokemon registered', () => {
    const [snorlax]: Pokemon[] = pokemonsMocks;
    service.registerCurrent(snorlax);

    service.attackEnemy();

    expect(service.enemy).toBeNull();
  });

  it('Attack should have effects if 2 pokemons registered', () => {
    const [snorlax, mew]: Pokemon[] = pokemonsMocks;
    service.registerCurrent(snorlax);
    service.registerEnemy(mew);

    service.attackEnemy();
    expect(service.enemy?.currentHP !== service.enemy?.totalHP).toBeTruthy();
  });

  it('Logs should not be empty', () => {
    const [snorlax]: Pokemon[] = pokemonsMocks;
    service.registerCurrent(snorlax);
    service.attackEnemy();

    expect(service.fightLogs.length).toBeGreaterThan(0);
  });

  it('Logs should be empty', () => {
    expect(service.fightLogs.length).toEqual(0);
  });

  it('Logs should be empty after reset', () => {
    const [snorlax]: Pokemon[] = pokemonsMocks;
    service.registerCurrent(snorlax);
    service.attackEnemy();
    service.reset();

    expect(service.fightLogs.length).toEqual(0);
  });

  it('Pokemon should be null after reset', () => {
    const [snorlax]: Pokemon[] = pokemonsMocks;
    service.registerCurrent(snorlax);
    service.attackEnemy();
    service.reset();

    expect(service.current).toBeNull();
  });

  it('Player should be able to run', () => {
    const [snorlax, mew]: Pokemon[] = pokemonsMocks;
    service.registerCurrent(snorlax);
    service.registerEnemy(mew);

    service.run();

    expect(service.current).toBeTruthy();
  });
});
