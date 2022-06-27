import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoaderComponent } from './components/loader/loader.component';
import { ModalComponent } from './components/modal/modal.component';
import { SentenceCasePipe } from './pipes/sentence-case.pipe';
import { PokemonModalComponent } from './components/pokemons/pokemon-modal/pokemon-modal.component';
import { PokemonCardComponent } from './components/pokemons/pokemon-card/pokemon-card.component';
import { PokemonSelectorSummaryComponent } from './components/pokemons/pokemon-selector-summary/pokemon-selector-summary.component';

@NgModule({
  declarations: [
    LoaderComponent,
    ModalComponent,
    SentenceCasePipe,
    PokemonModalComponent,
    PokemonCardComponent,
    PokemonSelectorSummaryComponent,
  ],
  exports: [
    LoaderComponent,
    ModalComponent,
    PokemonModalComponent,
    PokemonCardComponent,
    PokemonSelectorSummaryComponent,
  ],
  imports: [CommonModule],
})
export class SharedModule {}
