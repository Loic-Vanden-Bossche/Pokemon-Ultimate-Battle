import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PokedexComponent } from './pokedex/pokedex.component';
import { ArenaComponent } from './arena/arena.component';
import { PokemonsSelectorComponent } from './pokemons-selector/pokemons-selector.component';

const routes: Routes = [
  {
    path: '',
    component: PokedexComponent,
  },
  { path: 'arena', component: ArenaComponent },
  { path: 'selector', component: PokemonsSelectorComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
