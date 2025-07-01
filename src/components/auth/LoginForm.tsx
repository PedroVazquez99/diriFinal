import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { authService } from "../../services/AuthService";
import InputAdapter from "../../antDesignAdapters/buttons/InputAdapter";
import ButtonAdapter from "../../antDesignAdapters/buttons/ButtonAdapter";


const LoginForm: React.FC = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string>('');
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError('');
    try {
      const userCredential
        = await authService.signIn(username, password);
      console.log("Usuario autenticado:", userCredential.user);
      navigate('/home'); // Redirigir al Dashboard después de 2 segundos
    } catch (error: any) {
      console.error("Error al iniciar sesión:", error);
      setError(error.message);
    }
  }
  return (
    <div className="flex items-center justify-center min-h-screen bg-blue-200 rounded-xl">
      <form
        className="bg-white shadow-lg rounded-lg px-10 py-12 w-full max-w-md"
      >
        <h2 className="text-3xl font-extrabold mb-8 text-center text-gray-800">
          Login
        </h2>
        <div className="mb-6">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="username"
          >
            Nombre de usuario
          </label>
          <InputAdapter
            id="username"
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Ingresa tu usuario"
            required
          />
        </div>
        <div className="mb-8">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="password"
          >
            Contraseña
          </label>
          <InputAdapter
            className="shadow appearance-none border rounded-full w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500"
            id="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Ingresa tu contraseña"
            required
          />
        </div>
        <div className="flex items-center justify-center">
          <ButtonAdapter
            className="bg-blue-600 text-white px-1 py-2 rounded hover:bg-blue-700 transition"
            onClick={(e) => handleLogin(e)}
          >
            Iniciar
          </ButtonAdapter>

        </div>
      </form>
    </div>
  );

};

export default LoginForm;
