import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PokedexComponent } from './pages/pokedex/pokedex.component';
import { ArenaComponent } from './pages/arena/arena.component';
import { PokemonsSelectorComponent } from './pages/pokemons-selector/pokemons-selector.component';
import { MenuComponent } from './pages/menu/menu.component';

const routes: Routes = [
  {
    path: '',
    component: MenuComponent,
  },
  { path: 'arena', component: ArenaComponent },
  { path: 'selector', component: PokemonsSelectorComponent },
  { path: 'pokedex', component: PokedexComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
