import React, { useState } from "react";
import { Card, Typography, Tag, Rate, Space, Divider, Button, Modal } from "antd";
import { CalendarOutlined, TagsOutlined, PlayCircleOutlined } from "@ant-design/icons";

const { Title, Paragraph, Text } = Typography;

interface Props {
    movie: {
        id?: number;
        title: string;
        overview: string;
        poster_path: string;
        release_date: string;
        vote_average: number;
        genres: { id: number; name: string }[];
    };
}

const API_KEY = import.meta.env.VITE_TMDB_API_KEY;

const MovieInfo: React.FC<Props> = ({ movie }) => {
    const [trailerKey, setTrailerKey] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);
    const [modalOpen, setModalOpen] = useState(false);

    const fetchTrailer = async () => {
        setLoading(true);
        try {
            const res = await fetch(
                `https://api.themoviedb.org/3/movie/${movie.id}/videos?api_key=${API_KEY}&language=es-ES`
            );
            const data = await res.json();
            const trailer = data.results?.find(
                (v: any) =>
                    v.site === "YouTube" &&
                    (v.type === "Trailer" || v.type === "Teaser")
            );
            if (trailer) {
                setTrailerKey(trailer.key);
                setModalOpen(true);
            } else {
                setTrailerKey(null);
                alert("No se encontró tráiler para esta película.");
            }
        } catch {
            alert("Error al buscar el tráiler.");
        }
        setLoading(false);
    };

    return (
        <div
            style={{
                minHeight: "100vh",
                background: "linear-gradient(135deg, #f0f5ff 0%, #e6f7ff 100%)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                padding: 32,
            }}
        >
            <Card
                hoverable
                style={{ maxWidth: 900, width: "100%", display: "flex", boxShadow: "0 8px 40px #91d5ff55" }}
                bodyStyle={{ display: "flex", flexDirection: "row", padding: 0 }}
            >
                <img
                    src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                    alt={movie.title}
                    style={{
                        width: 300,
                        objectFit: "cover",
                        borderRadius: "8px 0 0 8px",
                        boxShadow: "0 4px 24px #1890ff22",
                    }}
                />
                <div style={{ padding: 32, flex: 1 }}>
                    <Title level={2} style={{ marginBottom: 16 }}>
                        {movie.title}
                    </Title>
                    <Space direction="vertical" size="middle" style={{ width: "100%" }}>
                        <Text type="secondary">
                            <CalendarOutlined /> <b>Estreno:</b> {movie.release_date}
                        </Text>
                        <Text type="secondary">
                            <TagsOutlined /> <b>Géneros:</b>{" "}
                            {movie.genres.map((g) => (
                                <Tag color="blue" key={g.id} style={{ marginRight: 4 }}>
                                    {g.name}
                                </Tag>
                            ))}
                        </Text>
                        <Text type="secondary">
                            <Rate allowHalf disabled value={movie.vote_average / 2} style={{ fontSize: 18 }} />{" "}
                        </Text>
                        <Button
                            type="primary"
                            icon={<PlayCircleOutlined />}
                            loading={loading}
                            onClick={fetchTrailer}
                        >
                            Ver tráiler
                        </Button>
                        <Divider />
                        <Paragraph>
                            {movie.overview}
                        </Paragraph>
                    </Space>
                </div>
            </Card>
            <Modal
                open={modalOpen}
                onCancel={() => setModalOpen(false)}
                footer={null}
                width={720}
                bodyStyle={{ padding: 18, display: "flex", justifyContent: "center" }}
                destroyOnClose
            >
                {trailerKey && (
                    <iframe
                        width="700"
                        height="400"
                        src={`https://www.youtube.com/embed/${trailerKey}`}
                        title="Tráiler"
                        frameBorder="0"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                        style={{ borderRadius: 8, margin: 0 }}
                    />
                )}
            </Modal>
        </div>
    );
};

export default MovieInfo;