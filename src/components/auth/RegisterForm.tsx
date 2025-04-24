import React from "react";
import { RegisterVM } from "../../viewModels/RegisterVM";
import { useRegisterViewModel } from "../../hooks/RegisterHook";
import { useNavigate } from "react-router-dom";

const registerViewModel = new RegisterVM();

const RegisterForm: React.FC = () => {
  const navigate = useNavigate();

  const handleFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    console.log("handleFormSubmit", e);
    registerViewModel.handleSubmit(e, navigate);
  };

  const {
    setNombre,
    setEmail,
    setPassword,
    setPasswordRepeat
  } = useRegisterViewModel(registerViewModel);

  return (
    <div className="flex items-center justify-center min-h-screen bg-blue-200 rounded-xl">
      <form
        className="bg-white shadow-lg rounded-lg px-10 py-12 w-full max-w-md text-left"
        onSubmit={(e) => handleFormSubmit(e)}
      >
        {/* Nombre de usuario */}
        <div className="mb-6">
          <label
            className="block text-gray-700 text-sm font-bold mb-2 ml-4"
            htmlFor="username"
          >
            Nombre de usuario
          </label>
          <input
            className="shadow appearance-none border rounded-full w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500"
            id="username"
            type="text"
            onChange={(e) => setNombre(e.target.value)}
            placeholder="Ingresa tu usuario"
            required
          />
        </div>
        <div className="mb-6">
          <label
            className="block text-gray-700 text-sm font-bold mb-2 ml-4"
            htmlFor="email"
          >
            Email
          </label>
          <input
            className="shadow appearance-none border rounded-full w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500"
            id="email"
            type="email"
            placeholder="Ingresa tu usuario"
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        {/* Password */}
        <div className="mb-8">
          <label
            className="block text-gray-700 text-sm font-bold mb-2 ml-4"
            htmlFor="password"
          >
            Contraseña
          </label>
          <input
            className="shadow appearance-none border rounded-full w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500"
            id="password"
            type="password"
            placeholder="Ingresa tu contraseña"
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        {/* Repetir password */}
        <div className="mb-8">
          <label
            className="block text-gray-700 text-sm font-bold mb-2 ml-4"
            htmlFor="passwordRepeat"
          >
            Repetir contraseña
          </label>
          <input
            className="shadow appearance-none border rounded-full w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500"
            id="passwordRepeat"
            type="password"
            placeholder="Repetir contraseña"
            onChange={(e) => setPasswordRepeat(e.target.value)}
            required
          />

        </div>
        {/* Registrar */}
        <div className="flex items-center justify-center">
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

export default RegisterForm;
