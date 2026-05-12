export interface PokemonBase {
  name: string;
  url: string;
}

export const ObtenerListaPokemon = async () => {
  const respuesta = await fetch("https://pokeapi.co/api/v2/pokemon?limit=20");
  const datos = await respuesta.json();
  return datos.results as PokemonBase[];
}