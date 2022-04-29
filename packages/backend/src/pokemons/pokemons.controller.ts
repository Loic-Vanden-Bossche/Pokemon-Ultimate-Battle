import { Controller, Get, Param, StreamableFile } from '@nestjs/common';
import { PokemonsService } from './pokemons.service';
import { ApiOperation } from '@nestjs/swagger';

@Controller('pokemons')
export class PokemonsController {
  constructor(private readonly pokemonsService: PokemonsService) {}

  @Get()
  @ApiOperation({ summary: 'Get all pokemons' })
  findAll(): any {
    return this.pokemonsService.findAll();
  }

  @Get('names')
  @ApiOperation({ summary: "Get an array of pokemon' names" })
  list(): any {
    return this.pokemonsService.list();
  }

  @Get('/:name')
  @ApiOperation({ summary: 'Get a specific pokemon by id' })
  findOne(@Param('name') name: string): any {
    return this.pokemonsService.findOne(name);
  }

  @Get('/:name/gif/front')
  @ApiOperation({ summary: 'Get front sprite for a specific pokemon' })
  async frontSprite(@Param('name') name: string) {
    return new StreamableFile(await this.pokemonsService.frontSprite(name));
  }

  @Get('/:name/gif/back')
  @ApiOperation({ summary: 'Get back sprite for a specific pokemon' })
  async backSprite(@Param('name') name: string) {
    return new StreamableFile(await this.pokemonsService.backSprite(name));
  }
}
