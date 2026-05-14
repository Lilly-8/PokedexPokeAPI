import { useEffect, useState } from 'react';
import { ObtenerListaPokemon, type PokemonBase } from '../services/pokemon.service';
import TarjetaPokemon from '../components/TarjetaPokemon';

export default function PokemonLista() {
  const [ListaPokemon, setListaPokemon] = useState<PokemonBase[]>([]);

  useEffect(() => {
    ObtenerListaPokemon().then(resultado => setListaPokemon(resultado));
  }, []);

  return (
    <main className="lista-pokemon">
      <h1>Mi Pokedex 🌸</h1>
      <section className="lista-pokemon__rejilla">
        {ListaPokemon.map((p) => (
          <TarjetaPokemon key={p.id} pokemon={p} />
        ))}
      </section>
    </main>
  );
}