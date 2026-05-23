import { useEffect, useState } from 'react';
import { ObtenerListaPokemon, type PokemonBase } from '../services/pokemon.service';
import TarjetaPokemon from '../components/TarjetaPokemon';
import { guardarFavoritos, leerFavoritos } from '../storage/storage';
import { guardarTema, leerTema } from '../storage/storage';

export default function PokemonLista() {
    //Mi lista de pokemones
  const [ListaPokemon, setListaPokemon] = useState<PokemonBase[]>([]);
  const [favoritos, setfavoritos] = useState<number[]>([]);
  const [busqueda, setbusqueda] = useState<string>('');
  const [tipoFiltro, setTipoFiltro] = useState<string>('');

  const [soloFavoritos, setSoloFavoritos] = useState(false);
  const [seleccionados, setSeleccionados] = useState<PokemonBase[]>([]);

  const [modoOscuro, setModoOscuro] = useState(false);

  useEffect(() => {
    ObtenerListaPokemon().then(resultado => setListaPokemon(resultado));
    setfavoritos(leerFavoritos());
    setModoOscuro(leerTema());
  }, []);

  useEffect(() => {
  // Esto cambia el color de fondo de TODA la página
  document.body.style.backgroundColor = modoOscuro ? '#1a1a1a' : '#905288';
}, [modoOscuro]);

    const cambiarTema = () => {
    const nuevoValor = !modoOscuro;
    setModoOscuro(nuevoValor);
    guardarTema(nuevoValor); // Lo guardamos
  };

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

  // Elegir comparar pokemones
  const manejarComparar = (p : PokemonBase) => {
    if (seleccionados.find(s => s.id === p.id)){
      setSeleccionados(seleccionados.filter(s => s.id !== p.id));
    } else if(seleccionados.length < 2){
      setSeleccionados([...seleccionados, p]);
    }else {
      alert('Solo puedes comparar 2 pokemones a la vez 🥀');
    }
  }

  //filtro por nombre y el tipo
  const pokemonFiltro = ListaPokemon.filter(p => p.name.toLowerCase().includes(busqueda.toLowerCase()) && (tipoFiltro === '' || p.types.includes(tipoFiltro)) && (!soloFavoritos || favoritos.includes(p.id)));

  //defino los tipos disponibles
  const tiposDisponibles = ["normal", "fire", "water", "grass", "electric", "ice", "fighting", "poison", "ground", "flying", "psychic", "bug", "rock", "ghost", "dragon", "dark", "steel", "fairy"];
  return (
    <main className={`lista-pokemon ${modoOscuro ? 'modo-oscuro' : ''}`}>

      <button 
        onClick={cambiarTema}
        className="boton_tema">
        {modoOscuro ? '☀️ Modo Claro' : '🌙 Modo Oscuro'}
      </button>

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

        <button 
          onClick={() => setSoloFavoritos(!soloFavoritos)}
          className={`boton_ver_favs ${soloFavoritos ? 'activo' : ''}`}
        >
          {soloFavoritos ? 'Ver Todos' : 'Mis Favoritos ❤'}
        </button>
      </div>

      {seleccionados.length > 0 && (
        <div className="panel_comparador"> 
          <h3> Comparador ({seleccionados.length}/2)</h3>
          <div className="comparador_cabecera"> {seleccionados.map(p => (
            <div key={p.id} className="mini_card">
              <img src={p.image} width ="40"/>
              <span>{p.name}</span>
              <button onClick={() => manejarComparar(p)}>x</button>
            </div>
          ))} 
          </div>
          {seleccionados.length === 2 && (
            <div className="tabla_comparativa">
              <table>
                <tbody>
                  {seleccionados[0].stats.map((s, index) => (
                    <tr key={s.name}>
                      <td>{s.name}</td>
                      <td style={{fontWeight: s.value > seleccionados[1].stats[index].value ? 'bold' : 'normal'}}>
                        {s.value}
                      </td>
                      <td style={{fontWeight: seleccionados[1].stats[index].value > s.value ? 'bold' : 'normal'}}>
                        {seleccionados[1].stats[index].value}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      )}

      
      <section className="lista-pokemon__rejilla">
        {pokemonFiltro.map((p) => (
          <div key={p.id} style={{position: 'relative'}}>
            <TarjetaPokemon pokemon={p} />

            <button onClick={() => darFavorito(p.id)}
            className='boton_favorito'
              >
              {favoritos.includes(p.id) ? '❤' : '♡'} 
            </button>

            <button 
              onClick={() => manejarComparar(p)}
              className={`boton_comparar ${seleccionados.find(s => s.id === p.id) ? 'seleccionado' : ''}`}
            >
              {seleccionados.find(s => s.id === p.id) ? 'Quitar' : 'Comparar'}
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