import React, { useEffect, useState } from "react";
import { db } from "../../../firebase/firebase";
import { ref as dbRef, set, onValue, update } from "firebase/database";
import { getAuth } from "firebase/auth";
import {
    Card,
    Input,
    Button,
    Typography,
    List,
    Pagination,
    Form,
    Space,
    message,
} from "antd";

const { TextArea } = Input;
const { Title, Text } = Typography;

interface Props {
    movieId: string;
}

interface Comment {
    user: string;
    text: string;
    timestamp: number;
    email: string; // safeEmail
}

const MovieComments: React.FC<Props> = ({ movieId }) => {
    const [comment, setComment] = useState("");
    const [comments, setComments] = useState<Comment[]>([]);
    const [editing, setEditing] = useState<null | { email: string; text: string }>(null);
    const [currentPage, setCurrentPage] = useState(1);
    const pageSize = 5; // Número de comentarios por página

    const auth = getAuth();
    const currentUser = auth.currentUser;
    const userEmail = currentUser?.email || "anon@example.com";
    const safeEmail = userEmail.replace(/\./g, "_");

    const paginatedComments = comments.slice(
        (currentPage - 1) * pageSize,
        currentPage * pageSize
    );

    const postComment = async (movieId: string, user: string, text: string) => {
        const commentRef = dbRef(db, `comments/${movieId}/${safeEmail}`);
        await set(commentRef, {
            user,
            text,
            timestamp: Date.now(),
        });
        message.success("Comentario publicado");
    };

    const handleSubmit = async () => {
        if (!comment.trim()) return;
        await postComment(movieId, userEmail, comment);
        setComment("");
    };

    useEffect(() => {
        const commentsRef = dbRef(db, `comments/${movieId}`);
        const unsubscribe = onValue(commentsRef, (snapshot) => {
            const data = snapshot.val();
            if (data) {
                const arr = Object.entries(data).map(([email, value]: any) => ({
                    ...value,
                    email,
                }));
                arr.sort((a, b) => b.timestamp - a.timestamp);
                setComments(arr);
            } else {
                setComments([]);
            }
        });
        return () => unsubscribe();
    }, [movieId]);

    const handleEditSubmit = async () => {
        if (!editing) return;
        const commentRef = dbRef(db, `comments/${movieId}/${editing.email}`);
        await update(commentRef, { text: editing.text });
        setEditing(null);
        message.success("Comentario editado");
    };

    return (
        <div className="max-w-2xl mx-auto mt-10 p-4">
            <Title level={3}>Comentarios</Title>

            <Form layout="vertical" onFinish={handleSubmit}>
                <Form.Item label="Escribe un comentario">
                    <TextArea
                        rows={3}
                        value={comment}
                        onChange={(e) => setComment(e.target.value)}
                        placeholder="Tu comentario..."
                    />
                </Form.Item>
                <Form.Item>
                    <Button type="primary" htmlType="submit">
                        Publicar comentario
                    </Button>
                </Form.Item>
            </Form>

            <List
                itemLayout="vertical"
                dataSource={paginatedComments}
                locale={{ emptyText: "No hay comentarios aún." }}
                renderItem={(item) => (
                    <Card className="mb-4" size="small">
                        <Space direction="vertical" size={2}>
                            <Text type="secondary" style={{ fontSize: 12 }}>
                                {item.user}
                            </Text>
                            <Text>{item.text}</Text>
                            {item.email === safeEmail && (
                                <Button
                                    type="link"
                                    size="small"
                                    onClick={() => setEditing({ email: item.email, text: item.text })}
                                >
                                    Editar
                                </Button>
                            )}
                        </Space>
                    </Card>
                )}
            />

            <div className="flex justify-center mt-6">
                <Pagination
                    current={currentPage}
                    pageSize={pageSize}
                    total={comments.length}
                    onChange={setCurrentPage}
                    showSizeChanger={false}
                />
            </div>


            {editing && (
                <Card className="mt-8 bg-gray-50 border" title="Editar comentario">
                    <Form layout="vertical" onFinish={handleEditSubmit}>
                        <Form.Item>
                            <TextArea
                                rows={3}
                                value={editing.text}
                                onChange={(e) =>
                                    setEditing((prev) => prev && { ...prev, text: e.target.value })
                                }
                            />
                        </Form.Item>
                        <Form.Item>
                            <Space>
                                <Button type="primary" htmlType="submit">
                                    Guardar
                                </Button>
                                <Button onClick={() => setEditing(null)}>Cancelar</Button>
                            </Space>
                        </Form.Item>
                    </Form>
                </Card>
            )}
        </div>
    );
};

export default MovieComments;
