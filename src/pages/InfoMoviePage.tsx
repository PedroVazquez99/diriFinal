// src/pages/InfoMovie.tsx
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Spin } from "antd";
import MovieInfo from "../components/movie/MovieInfo";
import MovieComments from "../components/movie/MovieComments";

const API_KEY = import.meta.env.VITE_TMDB_API_KEY;

interface MovieDetails {
    title: string;
    overview: string;
    poster_path: string;
    release_date: string;
    vote_average: number;
    genres: { id: number; name: string }[];
}

const InfoMoviePage: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const [movie, setMovie] = useState<MovieDetails | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchMovie = async () => {
            setLoading(true);
            const res = await fetch(
                `https://api.themoviedb.org/3/movie/${id}?api_key=${API_KEY}&language=es-ES`
            );
            const data = await res.json();
            setMovie(data);
            setLoading(false);
        };

        fetchMovie();
    }, [id]);

    if (loading) {
        return (
            <div className="flex justify-center items-center min-h-screen">
                <Spin size="large" />
            </div>
        );
    }

    if (!movie) return <div>No se encontró la película.</div>;

    return (
        <>
            <MovieInfo movie={movie} />
            <MovieComments movieId={id!} />
        </>
    );
};

export default InfoMoviePage;
