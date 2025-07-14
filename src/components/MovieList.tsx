import React, { Suspense, lazy } from 'react';
import { MovieVM } from '../viewModels/MovieVM';
import { useMovieViewModel } from '../hooks/MovieHooks';
import { IMovie } from '../models/IMovie';
import { useNavigate } from 'react-router-dom';
import MovieSearchBar from './movie/MovieSearchBar';
import { FormattedMessage } from 'react-intl';

// Lazy load del componente Movie
const LazyMovie = lazy(() => import('./Movie'));

// Instancia del ViewModel
const movieViewModel = new MovieVM();

const MovieList: React.FC = () => {
    const { items } = useMovieViewModel(movieViewModel);
    const navigate = useNavigate();

    const handleClick = (id: number) => {
        navigate(`/movie/${id}`);
    };

    return (
        <div className="movie-container min-h-screen bg-gradient-to-br from-gray-100 to-blue-200 flex items-center justify-center p-4">
            <div className="w-full max-w-6xl bg-white shadow-lg rounded-lg overflow-hidden">
                <div className="relative px-6 py-4 border-b border-gray-300 flex items-center">
                    <h1 className="title text-3xl font-bold text-gray-800 w-full text-center m-0">
                        <FormattedMessage id="app.film.releases" />
                    </h1>
                    <div className="absolute right-6">
                        <MovieSearchBar onSelect={handleClick} />
                    </div>
                </div>
                <div className="p-4 grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                    <Suspense fallback={<div>Cargando películas...</div>}>
                        {items.map((item: IMovie) => (
                            <LazyMovie key={item.id} {...item} onClick={() => handleClick(item.id)} />
                        ))}
                    </Suspense>
                </div>
            </div>
        </div>
    );
};

export default MovieList;
