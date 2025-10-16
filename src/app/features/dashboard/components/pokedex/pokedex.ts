import { Component, OnInit } from '@angular/core';
import { Pokemon } from '../../../home/components/pokemon-list/pokemon.interface';
import { PokedexService } from '../../../../core/services/pokedex-service';


@Component({
  selector: 'app-pokedex',
  standalone: false,
  templateUrl: './pokedex.html',
  styleUrl: './pokedex.css'
})
export class Pokedex implements OnInit {
  pokemonActual: Pokemon | null = null;
  
  listaPokemon: Pokemon[] = [];

  constructor(private pokedexService: PokedexService) {}

  ngOnInit(): void {
    this.loadMyPokedex();
  }

  loadMyPokedex(): void {
    //suscribirse a los cambios en la pokedex
    this.pokedexService.myPokedex$.subscribe(
      pokedex => {
        this.listaPokemon = pokedex;

        if (this.listaPokemon.length > 0 && !this.pokemonActual){
          this.pokemonActual = this.listaPokemon[0];
        }

        if (this.pokemonActual && !this.listaPokemon.find(p => p.id === this.pokemonActual?.id)){
          this.pokemonActual = this.listaPokemon.length > 0 ? this.listaPokemon[0] : null
        }
      }
    )
  }
  seleccionarPokemon(pokemon: Pokemon): void {
    this.pokemonActual = pokemon;
  }

  eliminarPokemonActual(): void{
    if (this.pokemonActual && confirm(`¿Estás seguro de eliminar a ${this.pokemonActual.name} de tu Pokédex?`)) {
      this.pokedexService.removePokemon(this.pokemonActual.id);
    }
  }
getPokemonNumber(pokemon: Pokemon): string {
  return String (pokemon.id).padStart(3, '0')

}

getPokemonSprite(pokemon: Pokemon): string{
return pokemon.sprites?.other?.['official-artwork']?.front_default || 
pokemon.sprites?.front_default || 'assets/placeholder.png';
}

get isPokedexEmpty(): boolean {
  return this.listaPokemon.length === 0;
}
}

