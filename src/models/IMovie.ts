export interface IMovie {
    id: number,
    title: string,
    img: string,
    release_date?: string,
    poster_path?: string,
}

// Mapeamos la respuesta de la API a nuestro modelo
export const mapMovieFromApi = (apiMovie: any): IMovie => {
    return {
        id: apiMovie.id,
        title: apiMovie.title,
        img: `https://image.tmdb.org/t/p/w185/${apiMovie.poster_path}`, // Construimos la URL completa de la imagen
    };
};
