import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PokedexComponent } from './pokedex/pokedex.component';
import { ArenaComponent } from './arena/arena.component';
import { PokemonDetailsComponent } from './pokemon-details/pokemon-details.component';
import { PokemonCardComponent } from './pokemon-card/pokemon-card.component';
import { HttpClientModule } from "@angular/common/http";
import { ScrollingModule } from '@angular/cdk/scrolling';


@NgModule({
  declarations: [
    AppComponent,
    PokedexComponent,
    ArenaComponent,
    PokemonDetailsComponent,
    PokemonCardComponent
  ],
  imports: [BrowserModule, AppRoutingModule, HttpClientModule, ScrollingModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
