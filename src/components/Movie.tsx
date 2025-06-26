import React from 'react';
import { IMovie } from '../models/IMovie';
import ButtonAdapter from '../antDesignAdapters/buttons/ButtonAdapter';

interface MovieProps extends IMovie {
    onClick?: () => void;
}

const Movie: React.FC<MovieProps> = ({ onClick, ...item }) => {

    return (
        <div
            key={item.id}
            className="movie-card bg-white p-1 rounded-lg shadow-md flex flex-col justify-between border-2 border-blue-300"
        >
            <img
                src={item.img}
                alt={item.title}
                className="w-full h-72 object-cover rounded-md mb-2 border-2 border-gray-200"
            />
            <h2 className="text-lg font-semibold text-gray-800 mb-2">
                {item.title}
            </h2>
            <ButtonAdapter
                className="bg-green-800 text-white py-1 px-4 rounded-md shadow hover:bg-green-600 transition-all self-center cursor-pointer"
                onClick={onClick}
            >
                Ver
            </ButtonAdapter>
        </div>
    );
};

export default Movie;
