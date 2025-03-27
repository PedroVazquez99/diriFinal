import React from "react";
import "../styles/login.css";
import MovieList from "../components/MovieList";

const Home: React.FC = () => {
  return (
    <>
      <p>Pagina Home</p>
      <MovieList />
    </>
  );
};

export default Home;
