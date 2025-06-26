import React from 'react';
import { MovieVM } from '../viewModels/MovieVM';
import { useMovieViewModel } from '../hooks/MovieHooks';
import { IMovie } from '../models/IMovie';
import Movie from './Movie';
import Search from 'antd/es/transfer/search';
import { useNavigate } from 'react-router-dom';

// Creamos una instancia del ViewModel fuera del componente. En un caso real, se podría inyectar desde un contexto, provider, etc.
const movieViewModel = new MovieVM(); // --> Instancia del ViewModel

const MovieList: React.FC = () => {
    const { items } = useMovieViewModel(movieViewModel); // Hook con instancia del ViewModel (MovieVM)
    const navigate = useNavigate();

    const handleClick = (id: number) => {
        navigate(`/movie/${id}`);
    };

    return (
        <div className="movie-container min-h-screen bg-gradient-to-br from-gray-100 to-blue-200 flex items-center justify-center p-4">
            <div className="w-full max-w-6xl bg-white shadow-lg rounded-lg overflow-hidden">
                <div className="relative px-6 py-4 border-b border-gray-300 flex items-center">
                    <h1 className="title text-3xl font-bold text-gray-800 w-full text-center m-0">
                        Últimos estrenos
                    </h1>
                    <div className="absolute right-6">
                        <Search
                            placeholder="Buscar películas..."
                        />
                    </div>
                </div>
                <div className="p-4 grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                    {items.map((item: IMovie) => (
                        <Movie key={item.id} {...item} onClick={() => handleClick(item.id)} />
                    ))}
                </div>
            </div>
        </div>
    );
};

export default MovieList;
