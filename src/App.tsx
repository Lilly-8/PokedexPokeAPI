import { BrowserRouter, Routes, Route } from 'react-router-dom';
import PokemonLista from './pages/PokemonLista';
import PokemonDetalle from './pages/PokemonDetalle';
import './App.css';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<PokemonLista />} />
        <Route path='/pokemon/:id' element={<PokemonDetalle />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;