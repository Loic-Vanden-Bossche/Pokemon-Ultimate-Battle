import { HttpException, HttpStatus, Injectable } from '@nestjs/common';

import { HttpService } from '@nestjs/axios';
import * as fs from 'fs';
import * as path from 'path';
import { Pokemon } from './pokemon';

@Injectable()
export class PokemonsService {
  constructor(private readonly http: HttpService) {}

  pokemonsPath = path.join(process.cwd(), 'pokemons');

  findAll(): Pokemon[] {
    if (!fs.existsSync(this.pokemonsPath)) {
      throw new HttpException('Pokemons not retrieved.', HttpStatus.NOT_FOUND);
    }

    const fileList = fs.readdirSync(this.pokemonsPath);
    return fileList
      .filter((file) => file.endsWith('.json'))
      .map((file) =>
        JSON.parse(fs.readFileSync(path.join(this.pokemonsPath, file), 'utf8')),
      );
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

  async frontSprite(name: string) {
    const pokemon = await this.findOne(name);
    return this.http
      .get(pokemon.frontSprite, { responseType: 'arraybuffer' })
      .toPromise()
      .then((res) => Buffer.from(res.data));
  }

  async backSprite(name: string): Promise<Buffer> {
    const pokemon = await this.findOne(name);
    return this.http
      .get(pokemon.backSprite, { responseType: 'arraybuffer' })
      .toPromise()
      .then((res) => Buffer.from(res.data));
  }
}
