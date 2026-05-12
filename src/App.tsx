import { useEffect, useState } from 'react';
import { ObtenerListaPokemon, type PokemonBase } from './services/pokemon.service';

function App() {
  const [ListaPokemon, setListaPokemon] = useState<PokemonBase[]>([]);

  useEffect (() => {
    ObtenerListaPokemon().then(resultado => setListaPokemon(resultado));
  }, []);

  return (
    <div>
      <h1>Mi Pokedex 🥶</h1>
      <ul>
        {ListaPokemon.map((p) => (
          <li key={p.name}>{p.name}</li>
        ))}
      </ul>
    </div>
  );
}

export default App;