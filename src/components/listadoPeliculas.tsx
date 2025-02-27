import React from "react";
import "../styles/login.css";

// Definimos una interfaz para los props
interface LoginFormProps {
  onLogin: (username: string, password: string) => void;
}

const ListadoPeliculas: React.FC<LoginFormProps> = () => {
  return (
    <>
      <p>Listado para las peliculas</p>
    </>
  );
};

export default ListadoPeliculas;
