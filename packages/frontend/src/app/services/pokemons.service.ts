import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Pokemon} from "../shared/interfaces/pokemon";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class PokemonsService {

  constructor(private readonly http: HttpClient) { }

  getPokemonData(name: string): Observable<Pokemon> {
    return this.http.get<Pokemon>(`http://localhost:3000/pokemons/${name}`);
  }
}
