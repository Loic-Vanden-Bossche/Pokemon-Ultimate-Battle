import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PokedexComponent } from './pokedex/pokedex.component';
import { ArenaComponent } from './arena/arena.component';
import { PokemonDetailsComponent } from './pokemon-details/pokemon-details.component';
import { PokemonCardComponent } from './pokemon-card/pokemon-card.component';
import { HttpClientModule } from '@angular/common/http';
import { ScrollingModule } from '@angular/cdk/scrolling';
import { PokemonsSelectorComponent } from './pokemons-selector/pokemons-selector.component';
import { SelectorToolbarComponent } from './pokemons-selector/selector-toolbar/selector-toolbar.component';
import { PokemonListComponent } from './pokemons-selector/pokemon-list/pokemon-list.component';
import { SharedModule } from "./shared/shared.module";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";

@NgModule({
  declarations: [
    AppComponent,
    PokedexComponent,
    ArenaComponent,
    PokemonDetailsComponent,
    PokemonCardComponent,
    PokemonsSelectorComponent,
    SelectorToolbarComponent,
    PokemonListComponent
  ],
  imports: [BrowserModule, AppRoutingModule, BrowserAnimationsModule, HttpClientModule, ScrollingModule, SharedModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
