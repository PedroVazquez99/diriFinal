// src/components/MovieInfo.tsx
import React from "react";

interface Props {
    movie: {
        title: string;
        overview: string;
        poster_path: string;
        release_date: string;
        vote_average: number;
        genres: { id: number; name: string }[];
    };
}

const MovieInfo: React.FC<Props> = ({ movie }) => {
    return (
        <div className="flex flex-col md:flex-row items-center justify-center min-h-screen bg-gradient-to-br from-gray-100 to-blue-200 p-8">
            <img
                src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                alt={movie.title}
                className="w-72 rounded-lg shadow-lg mb-6 md:mb-0 md:mr-10"
            />
            <div className="max-w-xl">
                <h1 className="text-4xl font-bold mb-4">{movie.title}</h1>
                <p className="text-gray-600 mb-2">
                    <span className="font-semibold">Estreno:</span> {movie.release_date}
                </p>
                <p className="text-gray-600 mb-2">
                    <span className="font-semibold">Valoración:</span> {movie.vote_average}
                </p>
                <p className="text-gray-600 mb-2">
                    <span className="font-semibold">Géneros:</span>{" "}
                    {movie.genres.map((g) => g.name).join(", ")}
                </p>
                <p className="mt-4 text-gray-800">{movie.overview}</p>
            </div>
        </div>
    );
};

export default MovieInfo;
