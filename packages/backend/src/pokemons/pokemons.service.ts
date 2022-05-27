import { HttpException, HttpStatus, Injectable } from '@nestjs/common';

import { HttpService } from '@nestjs/axios';
import * as fs from 'fs';
import * as path from 'path';
import { Pokemon } from './pokemon';
import { map, Observable } from "rxjs";

@Injectable()
export class PokemonsService {
  constructor(private readonly http: HttpService) {}

  pokemonsPath = path.join(process.cwd(), 'pokemons-data');

  findAll(): Pokemon[] {
    if (!fs.existsSync(this.pokemonsPath)) {
      throw new HttpException('Pokemons not retrieved.', HttpStatus.NOT_FOUND);
    }

    return this.list().map((file) =>
      JSON.parse(
        fs.readFileSync(path.join(this.pokemonsPath, file, '.json'), 'utf8'),
      ),
    );
  }

  list(): string[] {
    if (!fs.existsSync(this.pokemonsPath)) {
      throw new HttpException('Pokemons not retrieved.', HttpStatus.NOT_FOUND);
    }

    return fs
      .readdirSync(this.pokemonsPath)
      .filter((file) => file.endsWith('.json'))
      .map((file) => file.replace('.json', ''));
  }

  findOne(name: string): Pokemon {
    const filePath = path.join(this.pokemonsPath, `${name}.json`);
    if (!fs.existsSync(filePath)) {
      throw new HttpException(
        'This pokemon does not exist',
        HttpStatus.NOT_FOUND,
      );
    }

    return JSON.parse(fs.readFileSync(filePath, 'utf8'));
  }

  frontSprite(name: string): Observable<Buffer> {
    return this.http
      .get(this.findOne(name).frontSprite, { responseType: 'arraybuffer' })
      .pipe(map((res) => Buffer.from(res.data)));
  }

  backSprite(name: string): Observable<Buffer> {
    return this.http
      .get(this.findOne(name).backSprite, { responseType: 'arraybuffer' })
      .pipe(map((res) => Buffer.from(res.data)));
  }
}
