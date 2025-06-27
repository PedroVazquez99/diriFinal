// src/components/MovieComments.tsx
import React, { useEffect, useState } from "react";
import { db } from "../../../firebase/firebase"; // Adjust the import path as necessary
import { ref as dbRef, push, onValue, update } from "firebase/database";
import { getAuth } from "firebase/auth";

interface Props {
    movieId: string;
}

interface Comment {
    key: string;
    user: string;
    userId: string;
    text: string;
    timestamp: number;
}

const MovieComments: React.FC<Props> = ({ movieId }) => {
    const [comment, setComment] = useState("");
    const [userName, setUserName] = useState("");
    const [comments, setComments] = useState<Comment[]>([]);
    const [editing, setEditing] = useState<null | { key: string; text: string }>(null);

    const auth = getAuth();
    const currentUser = auth.currentUser;
    const currentUserId = currentUser?.uid || null;

    const postComment = async (
        movieId: string,
        user: string,
        text: string,
        userId: string | null
    ) => {
        const commentsRef = dbRef(db, `comments/${movieId}`);
        await push(commentsRef, {
            user,
            userId: userId ?? "anon",
            text,
            movieId,
            timestamp: Date.now(),
        });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!comment.trim()) return;
        await postComment(movieId, userName || "Anónimo", comment, currentUserId);
        setComment("");
    };

    useEffect(() => {
        const commentsRef = dbRef(db, `comments/${movieId}`);
        const unsubscribe = onValue(commentsRef, (snapshot) => {
            const data = snapshot.val();
            if (data) {
                const arr = Object.entries(data).map(([key, value]: any) => ({
                    ...value,
                    key,
                }));
                arr.sort((a, b) => b.timestamp - a.timestamp);
                setComments(arr);
            } else {
                setComments([]);
            }
        });

        return () => unsubscribe();
    }, [movieId]);

    return (
        <>
            <form
                onSubmit={handleSubmit}
                className="mt-8 flex flex-col gap-2 max-w-md mx-auto"
            >
                <input
                    type="text"
                    placeholder="Tu nombre"
                    value={userName}
                    onChange={(e) => setUserName(e.target.value)}
                    className="border rounded px-2 py-1"
                    required
                />
                <textarea
                    placeholder="Escribe un comentario..."
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
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

            <div className="mt-10 max-w-md mx-auto">
                <h2 className="text-xl font-semibold mb-4">Comentarios</h2>
                {comments.map((c) => (
                    <div key={c.key} className="mb-4 p-4 bg-white rounded shadow">
                        <p className="text-sm text-gray-600 mb-1">{c.user}</p>
                        <p className="text-gray-800">{c.text}</p>
                        {c.userId === currentUserId && (
                            <button
                                className="text-blue-500 text-sm mt-2"
                                onClick={() => setEditing({ key: c.key, text: c.text })}
                            >
                                Editar
                            </button>
                        )}
                    </div>
                ))}
            </div>

            {editing && (
                <form
                    onSubmit={async (e) => {
                        e.preventDefault();
                        const commentRef = dbRef(db, `comments/${movieId}/${editing.key}`);
                        await update(commentRef, { text: editing.text });
                        setEditing(null);
                    }}
                    className="mt-4 max-w-md mx-auto bg-white p-4 rounded shadow"
                >
                    <textarea
                        value={editing.text}
                        onChange={(e) =>
                            setEditing((prev) => prev && { ...prev, text: e.target.value })
                        }
                        className="border rounded w-full p-2"
                    />
                    <div className="flex gap-2 mt-2">
                        <button className="bg-green-500 text-white px-4 py-1 rounded">
                            Guardar
                        </button>
                        <button
                            type="button"
                            className="bg-gray-300 px-4 py-1 rounded"
                            onClick={() => setEditing(null)}
                        >
                            Cancelar
                        </button>
                    </div>
                </form>
            )}
        </>
    );
};

export default MovieComments;
