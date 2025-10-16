import { Component, OnInit } from '@angular/core';
import { PokeService } from '../pokeList-service';
import { Pokemon } from '../pokemon.interface';

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

  constructor(private pokeService: PokeService) {}

  ngOnInit(): void {
    this.loadPokemons();
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
