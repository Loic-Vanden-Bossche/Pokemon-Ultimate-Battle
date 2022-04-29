import { Ability, Pokemon, PokemonType } from '../src/pokemons/pokemon';
import * as fs from 'fs';
import * as path from 'path';
import { Bar } from 'cli-progress';
import * as colors from 'ansi-colors';
import axios from 'axios';

interface PokemonAPIResult {
  name: string;
  url: string;
}

interface PokemonAPIResponse {
  count: number;
  next: string;
  previous: string;
  results: PokemonAPIResult[];
}

const pokemonsPath = path.join(process.cwd(), 'pokemons');

const getAbilities = async (abilitiesUrls: string[]): Promise<Ability[]> => {
  const rawAbilities = await Promise.all(
    abilitiesUrls.map((url) => {
      return axios.get(url).then((res) => res.data);
    }),
  );

  return rawAbilities.map((ability: any) => {
    const name =
      ability?.names.filter((n) => n.language.name === 'fr')[0].name ||
      ability?.names.filter((n) => n.language.name === 'en')[0].name ||
      ability?.name ||
      '';

    return { name };
  });
};

const getTypes = (types: any[]): PokemonType[] => {
  return types.map((t) => ({
    id: parseInt(new RegExp(/\/[0-9]*\/$/).exec(t.url)[0].replace(/\//gm, '')),
    name: t.name,
  }));
};

const getStat = (stats: any[], statName: string): number => {
  return stats.find((stat) => stat.stat.name === statName).base_stat || 0;
};

const getPokemonSprite = async (
  pokemonName,
  folder = 'ani',
): Promise<string> => {
  const url = `http://play.pokemonshowdown.com/sprites/${folder}/${pokemonName}.gif`;
  return axios
    .get(url)
    .then(() => url)
    .catch((err) => {
      if (err.response.status === 404) {
        throw new Error(`Pokemon gif not found for pokemon ${pokemonName}`);
      }
      throw new Error(`Unknown error occurred for pokemon ${pokemonName}`);
    });
};

const formatOne = async (rawPokemon: any): Promise<Pokemon> => {
  return {
    id: rawPokemon.id,
    name: rawPokemon.name,
    height: rawPokemon.height,
    abilities: await getAbilities(
      rawPokemon.abilities.map((a) => a.ability.url),
    ),
    items: [],
    attack: getStat(rawPokemon.stats, 'attack'),
    defense: getStat(rawPokemon.stats, 'attack'),
    specialAttack: getStat(rawPokemon.stats, 'special-attack'),
    specialDefense: getStat(rawPokemon.stats, 'special-defense'),
    speed: rawPokemon.speed,
    types: getTypes(rawPokemon.types.map((type) => type.type)),
    frontSprite: await getPokemonSprite(rawPokemon.name).catch((err) => {
      throw new Error(err);
    }),
    backSprite: await getPokemonSprite(rawPokemon.name, 'ani-back').catch(
      (err) => {
        throw new Error(err);
      },
    ),
  };
};

const retrieveAll = async (): Promise<void> => {
  function* chunks(arr, n) {
    let chunk = 0;
    for (let i = 0; i < arr.length; i += n) {
      yield [chunk, arr.slice(i, i + n)];
      chunk++;
    }
  }

  const progress = new Bar({
    format: 'Pokemons retrieving |' + colors.yellow('{bar}') + '| {percentage}% || {value}/{total} Pokemons || {currentChunk}/{totalChunks} Chunks',
    barCompleteChar: '\u2588',
    barIncompleteChar: '\u2591',
    hideCursor: true
  });

  const chunkSize = 50;

  const pokemons = await axios
    .get<PokemonAPIResponse>('https://pokeapi.co/api/v2/pokemon/?limit=1126')
    .then((response) => response.data.results);

  progress.start(pokemons.length, 0, {
    currentChunk: 1,
    totalChunks: Math.ceil(pokemons.length / chunkSize),
  });

  fs.existsSync(pokemonsPath)
    ? fs.rmSync(path.join(pokemonsPath, '*'), { recursive: true, force: true })
    : fs.mkdirSync(pokemonsPath);

  let processedPokemons = 0;

  for (const [currentChunk, chunk] of chunks(pokemons, chunkSize)) {
    await Promise.all(
      chunk.map(async (pokemon) => {
        const filePath = path.join(pokemonsPath, `${pokemon.name}.json`);

        if (fs.existsSync(filePath) || fs.existsSync(filePath + '.error'))
          return;

        await axios.get<any>(pokemon.url).then((response) => {
          progress.update(++processedPokemons, {
            currentChunk
          });
          return formatOne(response.data)
            .then((pokemon) => {
              fs.writeFileSync(filePath, JSON.stringify(pokemon));
            })
            .catch((err) => {
              fs.writeFileSync(filePath + '.error', err.message);
            })
        });
      }),
    );
  }
  progress.stop();
};

retrieveAll()
  .then(() => console.log('Pokemons retrieved/updated from API'))
  .catch((err) => console.error(err));
