import React, { useState } from "react";


const RegisterForm: React.FC = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [passwordRepeat, setPasswordRepeat] = useState("");
  let isAllValid = false;

  const handleSubmit = async (event: React.FormEvent) => {
    if (username !== "" && password !== "" && password !== passwordRepeat) {
      isAllValid = false;
    }
    event.preventDefault();
    // Refistrar en la BBDD
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-blue-200 rounded-xl">
      <form
        className="bg-white shadow-lg rounded-lg px-10 py-12 w-full max-w-md"
        onSubmit={handleSubmit}
      >
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
        <div className="mb-8">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="passwordRepeat"
          >
            Repetir contraseña
          </label>
          <input
            className="shadow appearance-none border rounded-full w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500"
            id="passwordRepeat"
            type="password"
            value={passwordRepeat}
            onChange={(e) => setPasswordRepeat(e.target.value)}
            placeholder="Repetir contraseña"
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
        {!isAllValid && (
          <p className="text-red-500 mt-4">La contraseña debe coincidir</p>
        )}
      </form>
    </div>
  );
};

export default RegisterForm;
