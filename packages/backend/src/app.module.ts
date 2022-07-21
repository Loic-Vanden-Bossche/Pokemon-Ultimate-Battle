import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { PokemonsModule } from './pokemons/pokemons.module';

@Module({
  imports: [PokemonsModule],
  controllers: [AppController],
  providers: [],
})
export class AppModule {}
