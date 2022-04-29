import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class PokedexService {
  constructor(private readonly http: HttpClient) {}

  getPokemons(): Observable<string[]> {
    return this.http.get<string[]>('http://localhost:3000/pokemons/names');
  }
}
