import { Controller, Get, Param, Res, StreamableFile } from "@nestjs/common";
import { PokemonsService } from './pokemons.service';
import { ApiOperation } from '@nestjs/swagger';
import { firstValueFrom, map } from 'rxjs';
import { Response } from 'express';

@Controller('pokemons')
export class PokemonsController {
  constructor(private readonly pokemonsService: PokemonsService) {}

  @Get()
  @ApiOperation({ summary: 'Get all pokemons-data' })
  findAll(): any {
    return this.pokemonsService.findAll();
  }

  @Get('names')
  @ApiOperation({ summary: "Get an array of pokemon' names" })
  list(): any {
    return this.pokemonsService.list();
  }

  @Get('/types')
  @ApiOperation({ summary: 'Get a specific pokemon by id' })
  findTypes(): any {
    return this.pokemonsService.findAll().then((pokemons) =>
      [...new Set(pokemons.flatMap((pokemon) => pokemon.types).map((type) => type.name))].sort());
  }

  @Get('/:name')
  @ApiOperation({ summary: 'Get a specific pokemon by id' })
  findOne(@Param('name') name: string): any {
    return this.pokemonsService.findOne(name);
  }

  @Get('/:name/gif/front')
  @ApiOperation({ summary: 'Get front sprite for a specific pokemon' })
  async frontSprite(@Param('name') name: string, @Res({ passthrough: true }) res: Response) {
    res.setHeader('Content-Type', 'image/gif');
    return this.pokemonsService
      .frontSprite(name)
      .then((o) =>
        firstValueFrom(o.pipe(map((buffer) => new StreamableFile(buffer)))),
      );
  }

  @Get('/:name/gif/back')
  @ApiOperation({ summary: 'Get back sprite for a specific pokemon' })
  async backSprite(@Param('name') name: string, @Res({ passthrough: true }) res: Response) {
    res.setHeader('Content-Type', 'image/gif');
    return this.pokemonsService
      .backSprite(name)
      .then((o) =>
        firstValueFrom(o.pipe(map((buffer) => new StreamableFile(buffer)))),
      );
  }
}
