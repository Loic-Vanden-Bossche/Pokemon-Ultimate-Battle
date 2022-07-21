import { Pokemon } from '../src/app/shared/interfaces/pokemon';

export const pokemonsMocks: Pokemon[] = [
  {
    id: 143,
    name: 'snorlax',
    height: 21,
    abilities: [
      { name: 'Vaccin' },
      { name: 'Isograisse' },
      { name: 'Gloutonnerie' },
    ],
    items: [],
    attack: 110,
    defense: 110,
    specialAttack: 65,
    specialDefense: 110,
    types: [
      {
        id: 1,
        name: 'normal',
      },
    ],
    frontSprite: 'http://play.pokemonshowdown.com/sprites/ani/snorlax.gif',
    backSprite: 'http://play.pokemonshowdown.com/sprites/ani-back/snorlax.gif',
  },
  {
    id: 151,
    name: 'mew',
    height: 4,
    abilities: [{ name: 'Synchro' }],
    items: [],
    attack: 100,
    defense: 100,
    specialAttack: 100,
    specialDefense: 100,
    types: [{ id: 14, name: 'psychic' }],
    frontSprite: 'http://play.pokemonshowdown.com/sprites/ani/mew.gif',
    backSprite: 'http://play.pokemonshowdown.com/sprites/ani-back/mew.gif',
  },
];
