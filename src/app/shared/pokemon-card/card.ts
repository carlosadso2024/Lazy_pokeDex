import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Pokemon } from '../../features/home/components/pokemon-list/pokemon.interface';

@Component({
  selector: 'app-card',
  standalone: false,
  templateUrl: './card.html',
  styleUrl: './card.css'
})
export class Card {
  @Input() pokemon: Pokemon | null = null;
  @Input() isInPokedex: boolean = false;
  @Output() addToPokedex = new EventEmitter<Pokemon>();

  getHp(): number {
    return this.pokemon?.stats.find(s => s.stat.name === 'hp')?.base_stat || 0;
  }

  getAbilities(): string[] {
    return this.pokemon?.abilities.map(a => a.ability.name) || [];
  }

  getTypes(): string[] {
    return this.pokemon?.types.map(t => t.type.name) || [];
  }

  getImageUrl(): string {
    return this.pokemon?.sprites.other['official-artwork'].front_default || '';
  }

  getMoves(): string[] {
    return this.pokemon?.moves.slice(0, 4).map(m => m.move.name) || [];
  }

  getPokemonNumber(): string {
    return String(this.pokemon?.id || 0).padStart(3, '0')
  }

  onAddToPokedex(event: Event): void {
    event.stopPropagation();
    if(this.pokemon){
      this.addToPokedex.emit(this.pokemon)
    }
  }
}
