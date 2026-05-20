import { Link } from 'react-router-dom';
import { type PokemonBase } from '../services/pokemon.service';

//mostrar una tarjeta con la info del pokemon
export default function TarjetaPokemon({ pokemon }: { pokemon: PokemonBase }) {
  return (
    <Link to={`/pokemon/${pokemon.id}`} className="tarjeta-pokemon" style={{ textDecoration: 'none' }}>
      <div className="tarjeta-pokemon__contenedor-imagen">
        <img src={pokemon.image} alt={pokemon.name} className="tarjeta-pokemon__imagen" />
      </div>
      <h2 className="tarjeta-pokemon__nombre">{pokemon.name}</h2>
      <p className="tarjeta-pokemon__numero">#{pokemon.id}</p>
    </Link>
  );
}