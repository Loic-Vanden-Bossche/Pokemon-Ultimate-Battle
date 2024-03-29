import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Pokemon } from '../interfaces/pokemon';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class PokemonsService {
  constructor(private readonly http: HttpClient) {}

  getPokemonData(name: string): Observable<Pokemon> {
    return this.http.get<Pokemon>(`${environment.apiUrl}/pokemons/${name}`);
  }

  getPokemonSpriteUrl(name: string, isBack = false): string {
    return `${environment.apiUrl}/pokemons/${name}/gif/${
      isBack ? 'back' : 'front'
    }`;
  }

  getBackgroundUrl(pokemon: Pokemon | null): string | null {
    return pokemon?.types[0].name.toLowerCase()
      ? `assets/card-backgrounds/${pokemon?.types[0].name.toLowerCase()}.jpg`
      : null;
  }
}
