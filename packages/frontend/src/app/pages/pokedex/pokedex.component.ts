import {
  AfterViewInit,
  Component,
  ElementRef, EventEmitter,
  HostListener,
  OnInit, Output,
  ViewChild
} from "@angular/core";
import { PokedexService } from '../../shared/services/pokedex.service';
import { tap } from 'rxjs';
import { Pokemon } from "../../shared/interfaces/pokemon";
import { ModalService } from "../../shared/services/modal.service";

@Component({
  selector: 'app-pokedex',
  templateUrl: './pokedex.component.html',
  styleUrls: ['./pokedex.component.scss'],
})
export class PokedexComponent implements OnInit, AfterViewInit {
  lines: string[][] = [];
  pokemons: string[] = [];

  @Output() pokemonSelected: EventEmitter<{ pokemon: Pokemon, isEnemy: boolean }> = new EventEmitter<{ pokemon: Pokemon, isEnemy: boolean }>();

  selectedPokemon: string | null = null;

  columns = 3;

  cardHeight = 200;
  cardWidth = 150;

  cardPadding = 20;

  constructor(private readonly pokedexService: PokedexService, private modalService: ModalService) {}

  @ViewChild('pokemonList') pokemonList: ElementRef | undefined;

  @HostListener('window:resize', ['$event'])
  onResize() {
    if (this.pokemonList) {
      const columns = Math.floor(
        this.pokemonList.nativeElement.offsetWidth /
          (this.cardWidth + this.cardPadding),
      );

      if (columns !== this.columns) {
        this.columns = Math.floor(
          this.pokemonList.nativeElement.offsetWidth /
            (this.cardWidth + this.cardPadding),
        );
        this.updateLines();
      }
    }
  }

  ngOnInit(): void {
    this.pokedexService
      .getPokemons()
      .pipe(tap((pokemons) => (this.pokemons = pokemons)))
      .subscribe(() => this.updateLines());
  }

  ngAfterViewInit() {
    this.onResize();
  }

  updateLines() {
    this.lines = this.pokemons.reduce((acc, pokemon, index) => {
      if (index % this.columns === 0) {
        acc.push([pokemon]);
      } else {
        acc[acc.length - 1].push(pokemon);
      }
      return acc;
    }, [] as string[][]);
  }

  onPokemonSelected(data: { pokemon: Pokemon, isEnemy: boolean }) {
    this.pokemonSelected.emit(data);
  }

  openModal(pokemonName: string) {
    this.selectedPokemon = pokemonName;
    this.modalService.open('pokemonModal');
  }
}
