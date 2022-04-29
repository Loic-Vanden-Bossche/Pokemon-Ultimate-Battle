import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Pokemon } from '../shared/interfaces/pokemon';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class PokemonsService {
  constructor(private readonly http: HttpClient) {}

  getPokemonData(name: string): Observable<Pokemon> {
    return this.http.get<Pokemon>(`${environment.apiUrl}/pokemons/${name}`);
  }
}
