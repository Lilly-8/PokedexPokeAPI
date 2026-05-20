import type { Pokemon } from '../types/pokemon';

export interface PokemonBase {
  name: string;
  url: string;
  image: string;
  id: number;
  types: string[];
}

const obtenerDetallePokemon = async (id: number): Promise<Pokemon> => {
  const respuesta = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);
  return (await respuesta.json()) as Pokemon;
};

export const ObtenerListaPokemon = async () => {
  //Mi lista de mis pokemones elegidos 
  const pokemonesPorId = [1, 4, 12, 25, 39, 148, 151, 182, 282, 303, 359, 415, 490, 531, 540, 574, 671, 700, 761, 764];

  const pokemonesConImagen = await Promise.all(
    pokemonesPorId.map(async (id) => {
      const detalle = await obtenerDetallePokemon(id);

      return {
        name: detalle.name,
        url: `https://pokeapi.co/api/v2/pokemon/${id}/`, 
        image: detalle.sprites.other?.['official-artwork']?.front_default ?? detalle.sprites.front_default,
        id: detalle.id,
        types: detalle.types.map((t) => t.type.name),
      } satisfies PokemonBase;
    }),
  );

  //Mi mero mole, esto es para ordenar a mis pokemones
  return pokemonesConImagen.sort((a, b) => a.id - b.id);
};

export const obtenerDetalleCompleto = async (id: string) => {
  const respuesta = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);
  return await respuesta.json();
};