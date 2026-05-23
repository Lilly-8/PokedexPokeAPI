// aqui es donde guardo los favoritos en el local
export const guardarFavoritos = (ids: number[]) => {
    localStorage.setItem('favoritos', JSON.stringify(ids));
};

//para leer los favoritos
export const leerFavoritos = (): number[] => {
    const datos = localStorage.getItem('favoritos');
    return datos ? JSON.parse(datos) : [];
}

// para guardar el tema oscuro o claro
export const guardarTema = (esOscuro: boolean) => {
  localStorage.setItem('pokedex_tema', JSON.stringify(esOscuro));
};

export const leerTema = (): boolean => {
  const tema = localStorage.getItem('pokedex_tema');
  return tema ? JSON.parse(tema) : false;
};