// src/components/MovieInfo.tsx
import React from "react";
import { Card, Typography, Tag, Rate, Space, Divider } from "antd";
import { CalendarOutlined, StarFilled, TagsOutlined, FileTextOutlined } from "@ant-design/icons";

const { Title, Paragraph, Text } = Typography;

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
                        <Divider />
                        <Paragraph>
                            {movie.overview}
                        </Paragraph>
                    </Space>
                </div>
            </Card>
        </div>
    );
};

export default MovieInfo;
