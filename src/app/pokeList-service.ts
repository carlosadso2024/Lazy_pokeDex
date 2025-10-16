import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, forkJoin } from 'rxjs';
import { Pokemon } from './pokemon.interface';

@Injectable({
  providedIn: 'root'
})
export class PokeService {
  private apiUrl = 'https://pokeapi.co/api/v2/pokemon';

  constructor(private http: HttpClient) {}

  // Obtiene un rango de pokémon
  getPokemons(page: number = 1, pageSize: number = 12): Observable<Pokemon[]> {
    const start = (page - 1) * pageSize + 1;
    const end = start + pageSize - 1;
    const requests: Observable<Pokemon>[] = [];
    
    for (let i = start; i <= end && i <= 151; i++) {
      requests.push(this.getPokemon(i));
    }
    
    return forkJoin(requests);
  }

  // Obtiene un solo pokémon
  getPokemon(id: number | string): Observable<Pokemon> {
    return this.http.get<Pokemon>(`${this.apiUrl}/${id}`);
  }
}
