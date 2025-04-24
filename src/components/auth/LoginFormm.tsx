import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { authService } from "../../services/AuthService";


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
        onSubmit={(e) => handleLogin(e)}
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
          <input
            className="shadow appearance-none border rounded-full w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500"
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
          <input
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
          <button
            className="bg-blue-500 text-white font-bold py-3 px-6 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500 m-1 w-100"
            type="submit"
          >
            Iniciar
          </button>
          <button
            className="bg-blue-500 text-white font-bold py-3 px-6 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500 w-100"
            type="submit"
          >
            Registrar
          </button>
        </div>
      </form>
    </div>
  );

};

export default LoginForm;
