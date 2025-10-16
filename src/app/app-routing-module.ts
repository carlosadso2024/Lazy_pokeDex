import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './core/guard/auth-guard';

const routes: Routes = [
  {path: '', loadChildren: () => import('./features/home/components/home-module').then(m => m.HomeModule)},
  {path: 'pokedex', loadChildren: () => import('./features/dashboard/components/pokedex-module').then(m => m.PokedexModule), canActivate: [AuthGuard]},
  {path: '**', redirectTo: ''},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
