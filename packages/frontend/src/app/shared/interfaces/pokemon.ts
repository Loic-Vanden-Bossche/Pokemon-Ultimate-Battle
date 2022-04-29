export interface Ability {
  name: string;
}

export interface Item {
  name: string;
}

export interface PokemonType {
  id: number;
  name: string;
}

export interface Pokemon {
  id: number;
  name: string;
  height: number;
  abilities: Ability[];
  items: Item[];
  attack: number;
  defense: number;
  specialAttack: number;
  specialDefense: number;
  speed: number;
  types: PokemonType[];
  frontSprite: string;
  backSprite: string;
}
