import { AfterViewInit, Component, ElementRef, HostListener, OnInit, ViewChild } from "@angular/core";
import { PokedexService } from '../services/pokedex.service';
import { tap } from "rxjs";

@Component({
  selector: 'app-pokedex',
  templateUrl: './pokedex.component.html',
  styleUrls: ['./pokedex.component.scss'],
})
export class PokedexComponent implements OnInit, AfterViewInit {
  lines: string[][] = [];
  pokemons: string[] = [];

  columns = 3;

  cardHeight = 250;
  cardWidth = 200;

  cardPadding = 20;

  constructor(private readonly pokedexService: PokedexService) {}

  @ViewChild('pokemonList') pokemonList: ElementRef | undefined;

  @HostListener('window:resize', ['$event'])
  onResize() {
    if(this.pokemonList) {
      const columns = Math.floor(this.pokemonList.nativeElement.offsetWidth / (this.cardWidth + this.cardPadding));

      if (columns !== this.columns) {
        this.columns = Math.floor(this.pokemonList.nativeElement.offsetWidth / (this.cardWidth + this.cardPadding));
        this.updateLines();
      }
    }
  }

  ngOnInit(): void {
    this.pokedexService.getPokemons().pipe(tap((pokemons) => this.pokemons = pokemons)).subscribe(() => this.updateLines());
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
}
