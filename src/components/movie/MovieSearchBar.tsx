import React, { useState, useRef } from "react";
import { Input, List, Avatar, Spin } from "antd";

const API_KEY = import.meta.env.VITE_TMDB_API_KEY;

interface MovieSuggestion {
    id: number;
    title: string;
    poster_path: string | null;
    release_date?: string;
}

interface Props {
    onSelect: (id: number) => void;
}

const MovieSearchBar: React.FC<Props> = ({ onSelect }) => {
    const [query, setQuery] = useState("");
    const [suggestions, setSuggestions] = useState<MovieSuggestion[]>([]);
    const [loading, setLoading] = useState(false);
    const [showDropdown, setShowDropdown] = useState(false);
    const timeoutRef = useRef<number | null>(null);

    const handleSearch = (value: string) => {
        setQuery(value);
        if (timeoutRef.current) clearTimeout(timeoutRef.current);
        if (value.length < 3) {
            setSuggestions([]);
            setShowDropdown(false);
            return;
        }
        setLoading(true);
        timeoutRef.current = window.setTimeout(async () => {
            try {
                const res = await fetch(
                    `https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&query=${encodeURIComponent(
                        value
                    )}&language=es-ES`
                );
                const data = await res.json();
                setSuggestions(data.results.slice(0, 5));
                setShowDropdown(true);
            } catch {
                setSuggestions([]);
                setShowDropdown(false);
            }
            setLoading(false);
        }, 400); // debounce
    };

    const handleSelect = (id: number) => {
        setShowDropdown(false);
        setQuery("");
        setSuggestions([]);
        onSelect(id);
    };

    return (
        <div style={{ position: "relative", minWidth: 300 }}>
            <Input.Search
                placeholder="Buscar películas..."
                value={query}
                onChange={e => handleSearch(e.target.value)}
                loading={loading}
                onFocus={() => query.length >= 3 && setShowDropdown(true)}
                onBlur={() => setTimeout(() => setShowDropdown(false), 150)}
                allowClear
                style={{ width: 300 }}
            />
            {showDropdown && suggestions.length > 0 && (
                <div
                    style={{
                        position: "absolute",
                        top: 40,
                        right: 0,
                        left: 0,
                        zIndex: 10,
                        background: "#fff",
                        border: "1px solid #eee",
                        borderRadius: 8,
                        boxShadow: "0 2px 8px #0001",
                        maxHeight: 350,
                        overflowY: "auto",
                    }}
                >
                    <List
                        size="small"
                        dataSource={suggestions}
                        renderItem={item => (
                            <List.Item
                                key={item.id}
                                style={{ cursor: "pointer" }}
                                onMouseDown={() => handleSelect(item.id)}
                            >
                                <List.Item.Meta
                                    avatar={
                                        item.poster_path ? (
                                            <Avatar
                                                shape="square"
                                                size={48}
                                                src={`https://image.tmdb.org/t/p/w92${item.poster_path}`}
                                                alt={item.title}
                                            />
                                        ) : (
                                            <Avatar shape="square" size={48} style={{ background: "#eee" }}>
                                                ?
                                            </Avatar>
                                        )
                                    }
                                    title={item.title}
                                    description={item.release_date ? item.release_date.slice(0, 4) : ""}
                                />
                            </List.Item>
                        )}
                    />
                </div>
            )}
            {loading && <Spin style={{ position: "absolute", right: 10, top: 10 }} />}
        </div>
    );
};

export default MovieSearchBar;