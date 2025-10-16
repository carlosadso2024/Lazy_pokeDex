import { Component, OnInit } from '@angular/core';
import { PokeService } from '../../../../core/services/pokeList-service';
import { Pokemon } from './pokemon.interface';
import { PokedexService } from '../../../../core/services/pokedex-service';

@Component({
  selector: 'app-pokemon-list',
  standalone: false,
  templateUrl: './pokemon-list.html',
  styleUrl: './pokemon-list.css'
})
export class PokemonList implements OnInit {
  pokemons: Pokemon[] = [];
  currentPage: number = 1;
  pageSize: number = 12;
  totalPages: number = 13; // 151 / 12 ≈ 13 páginas
  isLoading: boolean = false;
  pokedexCount: number = 0;

  constructor(private pokeService: PokeService, private pokedexService: PokedexService) {}

  ngOnInit(): void {
    this.loadPokemons();
    this.updatePokedexCount();

    this.pokedexService.myPokedex$.subscribe(pokedex => {
      this.updatePokedexCount();
    });
  }

  loadPokemons(): void {
    this.isLoading = true;
    this.pokeService.getPokemons(this.currentPage, this.pageSize).subscribe({
      next: (pokemons) => {
        this.pokemons = pokemons;
        this.isLoading = false;
      },
      error: (error) => {
        console.error('Error loading pokemons:', error);
        this.isLoading = false;
      }
    });
  }

  //Agregar pokemon a la Pokédex
  addToPokedex(pokemon: Pokemon): void {
  
    const added = this.pokedexService.addPokemon(pokemon);

    if (added) {
      alert('Pokemon agregado a la Pokédex');
  }
}

//verificar si el pokemon ya esta en la Pokédex
isPokemonInPokedex(pokemonId: number): boolean {
  return this.pokedexService.isPokemonInPokedex(pokemonId);
}

//actualizar el contador de la Pokédex
updatePokedexCount(): void {
  this.pokedexCount = this.pokedexService.getPokedexCount();
}

//cambiar de pagina
  onPageChange(page: number): void {
    this.currentPage = page;
    this.loadPokemons();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  nextPage(): void {
    if (this.currentPage < this.totalPages) {
      this.onPageChange(this.currentPage + 1);
    }
  }

  previousPage(): void {
    if (this.currentPage > 1) {
      this.onPageChange(this.currentPage - 1);
    }
  }

  get pages(): number[] {
    const pages = [];
    const maxPagesToShow = 5;
    let startPage = Math.max(1, this.currentPage - 2);
    let endPage = Math.min(this.totalPages, startPage + maxPagesToShow - 1);

    for (let i = startPage; i <= endPage; i++) {
      pages.push(i);
    }
    return pages;
  }
}
