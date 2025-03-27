import { IMovie, mapMovieFromApi } from "../models/IMovie";

// Este archivo simula ser un ViewModel que se encarga de manejar la lógica de la vista
export const fetchItemsFromAPI = async (): Promise<IMovie[]> => {
    try {
        const apiKey = "147cfb98f6b24e069ef83b302dd2924b"; // Replace with your TMDb API key
        const response = await fetch(
            `https://api.themoviedb.org/3/movie/now_playing?api_key=${apiKey}&language=es-ES&page=1`
        );
        if (!response.ok) {
            throw new Error("Error al obtener los datos de la API");
        }
        const data = await response.json();
        return data.results.map((movie: IMovie) => mapMovieFromApi(movie)); // Cogemos los titulos de las peliculas
    } catch (error) {
        console.error(error);
        return [];
    }
};

// Agregar peliculas
export const addItemToAPI = async (newItem: IMovie): Promise<IMovie[]> => {
    // Simulamos una llamada POST para agregar un nuevo elemento
    console.log(`Elemento agregado al servidor: ${newItem}`);
    return await fetchItemsFromAPI(); // Simula obtener los datos actualizados
};

// Eliminar peliculas
export const removeItemFromAPI = async (index: number): Promise<IMovie[]> => {
    // Simulamos una llamada DELETE para eliminar un elemento
    console.log(`Elemento eliminado en la posición: ${index}`);
    return await fetchItemsFromAPI(); // Simula obtener los datos actualizados
}