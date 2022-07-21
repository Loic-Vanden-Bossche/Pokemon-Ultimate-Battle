import { Component, OnInit } from '@angular/core';
import { Pokemon } from '../../shared/interfaces/pokemon';
import { ActivatedRoute, Router } from '@angular/router';
import { PokemonsService } from '../../shared/services/pokemons.service';
import { combineLatest, of } from 'rxjs';
import { FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-pokemons-selector',
  templateUrl: './pokemons-selector.component.html',
  styleUrls: ['./pokemons-selector.component.scss'],
})
export class PokemonsSelectorComponent implements OnInit {
  private _pokemonsForm = this.fb.group({
    current: [null, Validators.required],
    enemy: [null, Validators.required],
  });

  get f() {
    return this._pokemonsForm;
  }

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private pokemonsService: PokemonsService,
    private fb: FormBuilder,
  ) {}

  pokemon(formControlName: 'current' | 'enemy'): Pokemon | null {
    return this.f.get(formControlName)?.value;
  }

  ngOnInit() {
    this.route.queryParams.subscribe((params) => {
      combineLatest(
        [params['enemy'], params['current']].map((name) =>
          name ? this.pokemonsService.getPokemonData(name) : of(null),
        ),
      ).subscribe(([enemy, current]) => {
        this.f.patchValue({
          enemy,
          current,
        });
      });
    });
  }

  onPokemonSelected(data: { pokemon: Pokemon; isEnemy: boolean }) {
    if (data.isEnemy) {
      this.f.patchValue({
        enemy: data.pokemon,
      });
    } else {
      this.f.patchValue({
        current: data.pokemon,
      });
    }

    this.router.navigate([], {
      queryParams: {
        enemy: this.pokemon('enemy')?.name,
        current: this.pokemon('current')?.name,
      },
    });
  }

  startBattle() {
    this.router.navigate(['/arena'], {
      queryParams: {
        enemy: this.pokemon('enemy')?.name,
        current: this.pokemon('current')?.name,
      },
    });
  }
}
