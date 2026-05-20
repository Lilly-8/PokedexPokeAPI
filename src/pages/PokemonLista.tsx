import { useEffect, useState } from 'react';
import { ObtenerListaPokemon, type PokemonBase } from '../services/pokemon.service';
import TarjetaPokemon from '../components/TarjetaPokemon';
import { guardarFavoritos, leerFavoritos } from '../utils/storage';

export default function PokemonLista() {
    //Mi lista de pokemones
  const [ListaPokemon, setListaPokemon] = useState<PokemonBase[]>([]);
  const [favoritos, setfavoritos] = useState<number[]>([]);
  const [busqueda, setbusqueda] = useState<string>('');
  const [tipoFiltro, setTipoFiltro] = useState<string>('');

  useEffect(() => {
    ObtenerListaPokemon().then(resultado => setListaPokemon(resultado));
    setfavoritos(leerFavoritos());
  }, []);

  //dar o quitar favorito a un pokemon 
  const darFavorito = (id: number) => {
    let nuevalista;
    if (favoritos.includes(id)) {
      nuevalista = favoritos.filter(favId => favId !== id);
    } else {
      nuevalista = [...favoritos, id];
    }
    setfavoritos(nuevalista);
    guardarFavoritos(nuevalista);
  }

  //filtro por nombre y el tipo
  const pokemonFiltro = ListaPokemon.filter(p => p.name.toLowerCase().includes(busqueda.toLowerCase()) && (tipoFiltro === '' || p.types.includes(tipoFiltro)));

  //defino los tipos disponibles
  const tiposDisponibles = ["grass", "fire", "water", "bug", "normal", "poison", "electric", "fairy", "psychic", "dragon", "steel"];

  return (
    <main className="lista-pokemon">
      <h1>Mi Pokedex 🌸</h1>
      <div className="lista-pokemon__filtros">
        <input type="text"
        placeholder='Buscar por nombre'
        value={busqueda}
        onChange={(e) => setbusqueda(e.target.value)}
        className='buscar_nombre'        
        />
        <select
        value={tipoFiltro}
        onChange={(e) => setTipoFiltro(e.target.value)}
        className='buscar_nombre'
        style={{width: 'auto', maxWidth: '180px'}}
        >
          <option value="">Filtro</option>
          {tiposDisponibles.map(tipo => (
            <option key ={tipo} value={tipo}>{tipo}</option>
          ))}
        </select>
      </div>
      
      <section className="lista-pokemon__rejilla">
        {pokemonFiltro.map((p) => (
          <div key={p.id} style={{position: 'relative'}}>
            <TarjetaPokemon pokemon={p} />

            <button onClick={() => darFavorito(p.id)}
            className='boton_favorito'
              >
              {favoritos.includes(p.id) ? '♥' : '♡'}
            </button>
          </div>
        ))}
      </section>
        {pokemonFiltro.length === 0 && (
          <p className='mensaje_error'>
             <h2> Pokémon no encontrado 🥀</h2>
          </p>
        )}
    </main>
  );
}