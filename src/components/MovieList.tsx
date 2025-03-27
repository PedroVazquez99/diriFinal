import React from 'react';
import { MovieVM } from '../viewModels/MovieVM';
import { useMovieViewModel } from '../hooks/MovieHooks';
import { IMovie } from '../models/IMovie';
import Movie from './Movie';

// Creamos una instancia del ViewModel fuera del componente. En un caso real, se podría inyectar desde un contexto, provider, etc.
const movieViewModel = new MovieVM(); // --> Instancia del ViewModel

const MovieList: React.FC = () => {
    const { items } = useMovieViewModel(movieViewModel);

    return (
        <div className="movie-container min-h-screen bg-gradient-to-br from-gray-100 to-blue-200 flex items-center justify-center p-4">
            <div className="w-full max-w-6xl bg-white shadow-lg rounded-lg overflow-hidden">
                <h1 className="title text-3xl font-bold text-gray-800 text-center py-4 border-b border-gray-300">
                    Últimos estrenos
                </h1>
                <div className="p-4 grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                    {items.map((item: IMovie) => (
                        <Movie {...item} />
                    ))}
                </div>
            </div>
        </div>
    );
};

export default MovieList;
