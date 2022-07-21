import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ArenaComponent } from './arena/arena.component';
import { MenuComponent } from './menu/menu.component';
import { PokedexComponent } from './pokedex/pokedex.component';
import { PokemonsSelectorComponent } from './pokemons-selector/pokemons-selector.component';
import { SharedModule } from '../shared/shared.module';
import { ScrollingModule } from '@angular/cdk/scrolling';
import { RouterModule } from '@angular/router';
import { PokemonComponent } from './arena/pokemon/pokemon.component';
import { LoggerComponent } from './arena/logger/logger.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TimerComponent } from './arena/timer/timer.component';

@NgModule({
  declarations: [
    ArenaComponent,
    MenuComponent,
    PokedexComponent,
    PokemonsSelectorComponent,
    PokemonComponent,
    LoggerComponent,
    TimerComponent,
  ],
  imports: [
    CommonModule,
    SharedModule,
    ScrollingModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
  ],
})
export class PagesModule {}
