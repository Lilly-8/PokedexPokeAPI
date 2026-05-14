import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { obtenerDetalleCompleto } from '../services/pokemon.service';
import { type Pokemon } from '../types/pokemon';

export default function PokemonDetalle() {
  const { id } = useParams();
  const [pokemon, setPokemon] = useState<Pokemon | null>(null);

  useEffect(() => {
    if (id) {
      obtenerDetalleCompleto(id).then(res => setPokemon(res));
    }
  }, [id]);

//si no agrego esto no me jala el codigo 😰
  if (!pokemon) {
    return (
      <main className="detalle-pokemon">
        <p>Cargando...</p>
      </main>
    );
  }

  //Aqui es donde extraigo la imagen de la API
  const artwork =
    pokemon.sprites.other?.['official-artwork']?.front_default ?? pokemon.sprites.front_default;
  //Con esto la primera letra del nombre se vuelve mayuscula
  const displayName = pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1);

  return (
    <main className="detalle-pokemon">
      <div className="detalle-pokemon__tarjeta">
        <Link className="detalle-pokemon__volver" to="/">← Volver al listado</Link>

        <h1>{displayName}</h1>
        <img className="detalle-pokemon__imagen" src={artwork} alt={pokemon.name} />

        <p><strong>Tipos:</strong> {pokemon.types.map((t) => t.type.name).join(', ')}</p>
        <p><strong>Peso:</strong> {pokemon.weight / 10} kg</p>
        <p><strong>Altura:</strong> {pokemon.height / 10} m</p>

        <h3>Habilidades</h3>
        <ul>
          {pokemon.abilities.map((a) => (
            <li key={a.ability?.name}>{a.ability?.name}</li>
          ))}
        </ul>

        <h3>Estadísticas</h3>
        <ul>
          {pokemon.stats.map((s) => (
            <li key={s.stat.name}>
              {s.stat.name}: {s.base_stat}
            </li>
          ))}
        </ul>
      </div>
    </main>
  );
}