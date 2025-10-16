import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeRoutingModule } from './home-routing-module';
import { PokemonList } from './pokemon-list/pokemon-list';
import { SharedModule } from '../../../shared/shared-module';
import { Card } from '../../../shared/pokemon-card/card';

@NgModule({
  declarations: [
    PokemonList,
    Card
  ],
  imports: [
    SharedModule,
    CommonModule,
    HomeRoutingModule,
  ]
})
export class HomeModule { }