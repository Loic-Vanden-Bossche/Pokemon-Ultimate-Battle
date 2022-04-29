import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class PokedexService {
  constructor(private readonly http: HttpClient) {}

  getPokemons(): Observable<string[]> {
    return this.http.get<string[]>(`${environment.apiUrl}/pokemons/names`);
  }
}
