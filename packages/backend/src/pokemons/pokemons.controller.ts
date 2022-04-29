import { Controller, Get, Param, StreamableFile } from '@nestjs/common';
import { PokemonsService } from './pokemons.service';

@Controller('pokemons')
export class PokemonsController {
  constructor(private readonly pokemonsService: PokemonsService) {}

  @Get()
  findAll(): any {
    return this.pokemonsService.findAll();
  }

  @Get('/:name')
  findOne(@Param('name') name: string): any {
    return this.pokemonsService.findOne(name);
  }

  @Get('/:name/gif/front')
  async frontSprite(@Param('name') name: string) {
    return new StreamableFile(await this.pokemonsService.frontSprite(name));
  }

  @Get('/:name/gif/back')
  async backSprite(@Param('name') name: string) {
    return new StreamableFile(await this.pokemonsService.backSprite(name));
  }
}
