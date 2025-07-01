// src/pages/InfoMovie.tsx
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Button, Spin } from "antd";
import MovieInfo from "../components/movie/MovieInfo";
import MovieComments from "../components/movie/MovieComments";
import MovieSimilar from "../components/movie/SimilarMovies";
import ModalAdapter from "../antDesignAdapters/modals/ModalAdapter";

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
    const [showSimilar, setShowSimilar] = useState(false); // Estado para mostrar similares

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
            <div className="flex justify-center my-4">
                <Button type="primary" onClick={() => setShowSimilar((v) => !v)}>
                    {showSimilar ? "Ocultar similares" : "Ver películas similares"}
                </Button>
            </div>
            {showSimilar && (
                <div className="flex justify-center">
                    <ModalAdapter title="Películas similares" open={showSimilar} onClose={() => setShowSimilar(false)}>
                        <MovieSimilar movieId={id!} />
                    </ModalAdapter>
                </div>
            )}
            <MovieComments movieId={id!} />
        </>
    );
};

export default InfoMoviePage;
