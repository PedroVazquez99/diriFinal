import React, { useEffect, useState } from 'react';
import { IMovie } from '../../models/IMovie';
import ImageAdapter from '../../antDesignAdapters/images/ImageAdapter';
import { Card } from 'antd';

interface SimilarMoviesProps {
    movieId: string;
}

const SimilarMovies: React.FC<SimilarMoviesProps> = ({ movieId }) => {
    const [peliculas, setPeliculas] = useState<IMovie[]>([]);
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
        <div className="w-full overflow-x-auto">
            <div className="flex gap-4 py-4 px-2">
                {peliculas.map((pelicula) => (
                    <Card
                        key={pelicula.id}
                        className="w-[160px] h-[260px] flex-shrink-0 shadow-md"
                        hoverable
                    >
                        <div className="h-full flex flex-col items-center justify-between text-center">
                            <ImageAdapter
                                width={100}
                                src={pelicula.poster_path}
                                txtPreview="Ver imagen"
                            />
                            <div className="mt-2 w-full">
                                <p className="font-semibold text-sm truncate" title={pelicula.title}>
                                    {pelicula.title}
                                </p>
                                <p className="text-xs text-gray-500">
                                    {pelicula.release_date?.slice(0, 4)}
                                </p>
                            </div>
                        </div>
                    </Card>
                ))}
            </div>
        </div>
    );
};

export default SimilarMovies;
