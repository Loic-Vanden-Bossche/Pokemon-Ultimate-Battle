import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ArenaComponent } from './arena/arena.component';
import { MenuComponent } from './menu/menu.component';
import { PokedexComponent } from './pokedex/pokedex.component';
import { PokemonsSelectorComponent } from './pokemons-selector/pokemons-selector.component';
import { SharedModule } from '../shared/shared.module';
import { ScrollingModule } from '@angular/cdk/scrolling';

@NgModule({
  declarations: [
    ArenaComponent,
    MenuComponent,
    PokedexComponent,
    PokemonsSelectorComponent,
  ],
  imports: [CommonModule, SharedModule, ScrollingModule],
})
export class PagesModule {}
