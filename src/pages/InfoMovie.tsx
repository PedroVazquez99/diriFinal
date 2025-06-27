import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Spin } from "antd";
import { db } from "../../firebase/firebase";
import { ref, push } from "firebase/database";

const API_KEY = import.meta.env.VITE_TMDB_API_KEY; // Pon tu API key en .env como VITE_TMDB_API_KEY

interface MovieDetails {
    title: string;
    overview: string;
    poster_path: string;
    release_date: string;
    vote_average: number;
    genres: { id: number; name: string }[];
}

const InfoMovie: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const [movie, setMovie] = useState<MovieDetails | null>(null);
    const [loading, setLoading] = useState(true);
    const [comment, setComment] = useState("");
    const [user, setUser] = useState(""); // O usa el usuario autenticado si tienes auth

    const postComment = async (movieId: string, user: string, text: string) => {
        const commentsRef = ref(db, `comments/${movieId}`);
        await push(commentsRef, {
            user,
            text,
            timestamp: Date.now(),
        });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!comment.trim()) return;
        await postComment(id!, user || "Anónimo", comment);
        setComment("");
    }

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

            <form onSubmit={handleSubmit} className="mt-8 flex flex-col gap-2 max-w-md">
                <input
                    type="text"
                    placeholder="Tu nombre"
                    value={user}
                    onChange={e => setUser(e.target.value)}
                    className="border rounded px-2 py-1"
                    required
                />
                <textarea
                    placeholder="Escribe un comentario..."
                    value={comment}
                    onChange={e => setComment(e.target.value)}
                    className="border rounded px-2 py-1"
                    required
                />
                <button
                    type="submit"
                    className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
                >
                    Publicar comentario
                </button>
            </form>
        </>

    );
};

export default InfoMovie;