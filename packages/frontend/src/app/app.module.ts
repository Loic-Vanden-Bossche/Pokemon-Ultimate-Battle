import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PokedexComponent } from './pages/pokedex/pokedex.component';
import { ArenaComponent } from './pages/arena/arena.component';
import { PokemonModal } from './shared/components/pokemons/pokemon-modal/pokemon-modal.component';
import { PokemonCardComponent } from './shared/components/pokemons/pokemon-card/pokemon-card.component';
import { HttpClientModule } from '@angular/common/http';
import { ScrollingModule } from '@angular/cdk/scrolling';
import { PokemonsSelectorComponent } from './pokemons-selector/pokemons-selector.component';
import { SelectorToolbarComponent } from './pokemons-selector/selector-toolbar/selector-toolbar.component';
import { SharedModule } from './shared/shared.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MenuComponent } from './pages/menu/menu.component';
import { PokemonListComponent } from "./pokemons-selector/pokemon-list/pokemon-list.component";

@NgModule({
  declarations: [
    AppComponent,
    PokedexComponent,
    ArenaComponent,
    PokemonModal,
    PokemonCardComponent,
    PokemonsSelectorComponent,
    SelectorToolbarComponent,
    MenuComponent,
    PokemonListComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    ScrollingModule,
    SharedModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
