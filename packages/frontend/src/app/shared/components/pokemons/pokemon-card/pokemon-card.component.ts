import {
  Component,
  ElementRef,
  Input,
  OnChanges,
  OnDestroy,
  ViewChild,
} from '@angular/core';
import { PokemonsService } from '../../../services/pokemons.service';
import { Subject, takeUntil } from 'rxjs';
import { Pokemon } from '../../../interfaces/pokemon';
import {
  animate,
  state,
  style,
  transition,
  trigger,
} from '@angular/animations';

@Component({
  selector: 'app-pokemon-card',
  templateUrl: './pokemon-card.component.html',
  styleUrls: ['./pokemon-card.component.scss'],
  animations: [
    trigger('showHide', [
      state(
        'show',
        style({
          opacity: 1,
        }),
      ),
      state(
        'hide',
        style({
          opacity: 0,
        }),
      ),
      transition('show => hide', [animate('1s')]),
      transition('hide => show', [animate('0.5s')]),
    ]),
  ],
})
export class PokemonCardComponent implements OnChanges, OnDestroy {
  @Input() pokemonName: string | null = null;

  @ViewChild('cardContainer') container: ElementRef | undefined;

  pokemonDetails: Pokemon | null = null;
  rotateXValue = 0;
  rotateYValue = 0;

  translateXValue = 0;
  translateYValue = 0;

  isParallax = false;

  gifLoaded = false;
  backgroundLoaded = false;

  private _destroy = new Subject<void>();

  constructor(private readonly pokemonService: PokemonsService) {}

  ngOnChanges(): void {
    this.resetCard();
    this.pokemonService
      .getPokemonData(this.pokemonName || '')
      .pipe(takeUntil(this._destroy))
      .subscribe((data) => {
        this.pokemonDetails = data;
      });
  }

  resetCard(): void {
    this._destroy.next();
    this._destroy.complete();
    this.gifLoaded = false;
    this.backgroundLoaded = false;
    this.pokemonDetails = null;
  }

  getPokemonSpriteUrl(name: string): string {
    return this.pokemonService.getPokemonSpriteUrl(name);
  }

  ngOnDestroy(): void {
    this._destroy.next();
    this._destroy.complete();
  }

  getRotateValue($event: any): void {
    if (!this.isParallax || !this.container) return;

    const position = this.container.nativeElement.getBoundingClientRect(),
      mouseX =
        ($event.pageX - position.x - position.width / 2) / position.width,
      mouseY =
        ($event.pageY - (position.y + window.scrollY) - position.height / 2) /
        position.height;

    this.rotateXValue = mouseX * 15;

    this.rotateYValue = mouseY * -15;

    this.translateXValue = mouseX * -15;

    this.translateYValue = mouseY * -15;
  }

  getCardParallax($event: MouseEvent): void {
    if ($event.type !== 'mouseenter' || !this.container) {
      this.rotateXValue = 0;

      this.rotateYValue = 0;

      this.translateXValue = 0;

      this.translateYValue = 0;

      this.isParallax = false;

      return;
    }

    this.isParallax = true;
  }

  getBackgroundUrl(): string {
    return this.pokemonService.getBackgroundUrl(this.pokemonDetails) || '';
  }
}
