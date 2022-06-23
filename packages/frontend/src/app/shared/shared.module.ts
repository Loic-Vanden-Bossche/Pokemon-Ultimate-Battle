import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoaderComponent } from './components/loader/loader.component';
import { ModalComponent } from './components/modal/modal.component';
import { SentenceCasePipe } from './pipes/sentence-case.pipe';
import { PokemonModalComponent } from './components/pokemons/pokemon-modal/pokemon-modal.component';
import { PokemonCardComponent } from './components/pokemons/pokemon-card/pokemon-card.component';
import { SelectorToolbarComponent } from './components/selector-toolbar/selector-toolbar.component';
import { PokemonListComponent } from './components/pokemons/pokemon-list/pokemon-list.component';

@NgModule({
  declarations: [
    LoaderComponent,
    ModalComponent,
    SentenceCasePipe,
    PokemonModalComponent,
    PokemonCardComponent,
    SelectorToolbarComponent,
    PokemonListComponent,
  ],
  exports: [
    LoaderComponent,
    ModalComponent,
    PokemonModalComponent,
    PokemonCardComponent,
    SelectorToolbarComponent,
    PokemonListComponent,
  ],
  imports: [CommonModule],
})
export class SharedModule {}
