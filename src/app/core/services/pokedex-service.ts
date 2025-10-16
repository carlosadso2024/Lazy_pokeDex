import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Pokemon } from '../../features/home/components/pokemon-list/pokemon.interface';

@Injectable({
  providedIn: 'root'
})
export class PokedexService {
  private pokedexKey = 'my-pokedex'; // Clave para localStorage
  private myPokedexSubject = new BehaviorSubject<Pokemon[]>(this.loadPokedex());
  public myPokedex$: Observable<Pokemon[]> = this.myPokedexSubject.asObservable();

  constructor() {}

  // Cargar Pokédex desde localStorage
  private loadPokedex(): Pokemon[] {
    const saved = localStorage.getItem(this.pokedexKey);
    return saved ? JSON.parse(saved) : [];
  }

  // Guardar Pokédex en localStorage
  private savePokedex(pokedex: Pokemon[]): void {
    localStorage.setItem(this.pokedexKey, JSON.stringify(pokedex));
    this.myPokedexSubject.next(pokedex);
  }

  // Obtener todos los pokémon en la Pokédex personal
  getMyPokedex(): Pokemon[] {
    return this.myPokedexSubject.value;
  }

  // Verificar si un pokémon ya está en la Pokédex
  isPokemonInPokedex(pokemonId: number): boolean {
    return this.myPokedexSubject.value.some(p => p.id === pokemonId);
  }

  // Agregar un pokémon a la Pokédex
  addPokemon(pokemon: Pokemon): boolean {
    const currentPokedex = this.myPokedexSubject.value;
    
    // Verificar si ya existe
    if (this.isPokemonInPokedex(pokemon.id)) {
      return false; // Ya existe
    }

    const updatedPokedex = [...currentPokedex, pokemon];
    this.savePokedex(updatedPokedex);
    return true; // Agregado exitosamente
  }

  // Eliminar un pokémon de la Pokédex
  removePokemon(pokemonId: number): void {
    const currentPokedex = this.myPokedexSubject.value;
    const updatedPokedex = currentPokedex.filter(p => p.id !== pokemonId);
    this.savePokedex(updatedPokedex);
  }

  // Obtener cantidad de pokémon en la Pokédex
  getPokedexCount(): number {
    return this.myPokedexSubject.value.length;
  }

  // Limpiar toda la Pokédex
  clearPokedex(): void {
    this.savePokedex([]);
  }
}
