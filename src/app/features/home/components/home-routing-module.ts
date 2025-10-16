import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PokemonList } from './pokemon-list/pokemon-list';

const routes: Routes = [
  { path: "", component: PokemonList }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomeRoutingModule { }