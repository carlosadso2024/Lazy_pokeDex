import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PokedexRoutingModule } from './pokedex-routing-module';
import { SharedModule } from '../../../shared/shared-module';
import { Pokedex } from './pokedex/pokedex';




@NgModule({
  declarations: [
    Pokedex
  ],
  imports: [
    CommonModule,
    PokedexRoutingModule,
    SharedModule
  ]
})
export class PokedexModule { }