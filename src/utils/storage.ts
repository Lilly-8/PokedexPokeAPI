// aqui es donde guardo los favoritos en el local
export const guardarFavoritos = (ids: number[]) => {
    localStorage.setItem('favoritos', JSON.stringify(ids));
};

//para leer los favoritos
export const leerFavoritos = (): number[] => {
    const datos = localStorage.getItem('favoritos');
    return datos ? JSON.parse(datos) : [];
}