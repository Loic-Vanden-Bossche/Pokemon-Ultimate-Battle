import { HttpException, HttpStatus, Injectable } from '@nestjs/common';

import { HttpService } from '@nestjs/axios';
import * as fsc from 'fs';
import * as fs from 'fs/promises';
import * as path from 'path';
import { Pokemon } from './pokemon';
import { map, Observable } from 'rxjs';

const fileExists = (p) =>
  fs
    .access(p, fsc.constants.F_OK)
    .then(() => true)
    .catch(() => false);

@Injectable()
export class PokemonsService {
  constructor(private readonly http: HttpService) {}

  pokemonsPath = path.join(process.cwd(), 'pokemons-data');

  findAll(): Promise<Pokemon[]> {
    if (!fileExists(this.pokemonsPath)) {
      throw new HttpException('Pokemons not retrieved.', HttpStatus.NOT_FOUND);
    }

    return this.list().then((files) =>
      Promise.all(files.map((file) => this.findOne(file))),
    );
  }

  list(): Promise<string[]> {
    if (!fileExists(this.pokemonsPath)) {
      throw new HttpException('Pokemons not retrieved.', HttpStatus.NOT_FOUND);
    }

    return fs
      .readdir(this.pokemonsPath)
      .then((files) => files.filter((file) => file.endsWith('.json')))
      .then((files) => files.map((file) => file.replace('.json', '')));
  }

  findOne(name: string): Promise<Pokemon> {
    const filePath = path.join(this.pokemonsPath, `${name}.json`);
    if (!fileExists(filePath)) {
      throw new HttpException(
        'This pokemon does not exist',
        HttpStatus.NOT_FOUND,
      );
    }

    return fs.readFile(filePath, 'utf8').then((c) => JSON.parse(c) as Pokemon);
  }

  frontSprite(name: string): Promise<Observable<Buffer>> {
    return this.findOne(name).then((pokemon) =>
      this.http
        .get(pokemon.frontSprite, { responseType: 'arraybuffer' })
        .pipe(map((res) => Buffer.from(res.data))),
    );
  }

  backSprite(name: string): Promise<Observable<Buffer>> {
    return this.findOne(name).then((pokemon) =>
      this.http
        .get(pokemon.backSprite, { responseType: 'arraybuffer' })
        .pipe(map((res) => Buffer.from(res.data))),
    );
  }
}
