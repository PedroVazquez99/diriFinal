import { useEffect, useState } from 'react';

const SimilarMovies = ({ movieId }) => {
    const [peliculas, setPeliculas] = useState([]);
    const API_KEY = import.meta.env.VITE_TMDB_API_KEY;

    useEffect(() => {
        const obtenerSimilares = async () => {
            try {
                const respuesta = await fetch(
                    `https://api.themoviedb.org/3/movie/${movieId}/similar?api_key=${API_KEY}&language=es-ES&page=1`
                );
                const datos = await respuesta.json();
                setPeliculas(datos.results.slice(0, 5));
            } catch (error) {
                console.error('Error al obtener películas similares:', error);
            }
        };

        if (movieId) {
            obtenerSimilares();
        }
    }, [movieId]);

    return (
        <div>
            <h2>Películas Similares</h2>
            <ul>
                {peliculas.map((pelicula) => (
                    <li key={pelicula.id}>
                        <strong>{pelicula.title}</strong> ({pelicula.release_date?.slice(0, 4)})
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default SimilarMovies;
