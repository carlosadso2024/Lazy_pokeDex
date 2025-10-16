import { NgModule, provideBrowserGlobalErrorListeners } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { provideHttpClient } from '@angular/common/http';

import { AppRoutingModule } from './app-routing-module';
import { App } from './app';
import { PokemonList } from './pokemon-list/pokemon-list';
import { Card } from './pokemon-detail/card';
import { PokeDex } from './poke-dex/poke-dex';

@NgModule({
  declarations: [
    App,
    PokemonList,
    Card,
    PokeDex
  ],
  imports: [
    BrowserModule,
    CommonModule,
    AppRoutingModule
  ],
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideHttpClient()
  ],
  bootstrap: [App]
})
export class AppModule { }
