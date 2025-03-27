import React from 'react';
import { IMovie } from '../models/IMovie';

const Movie: React.FC<IMovie> = (item) => {

    return (
        <div
        key={item.id}
        className="movie-card bg-white p-4 rounded-lg shadow-md flex flex-col justify-between border-4 border-blue-300"
    >
        <img
            src={item.img}
            alt={item.title}
            className="w-full h-72 object-cover rounded-md mb-2 border-2 border-gray-200"
        />
        <h2 className="text-lg font-semibold text-gray-800 mb-2">
            {item.title}
        </h2>
        <button
            className="bg-red-500 text-white py-1 px-4 rounded-md shadow hover:bg-red-600 transition-all self-center cursor-pointer"
        >
            Añadir
        </button>
    </div>
    );
};

export default Movie;
