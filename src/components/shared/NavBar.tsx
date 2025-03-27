import React from "react";

const NavBar: React.FC = () => {
  return (
    <header className="bg-blue-200 text-gray-800 shadow-md rounded-b-lg">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <section className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <span className="text-3xl font-extrabold tracking-wide hover:scale-105 transition-transform duration-300">
              FilmO
            </span>
          </div>
          <ul className="hidden md:flex space-x-8">
            <li>
              <a href="#" className="hover:bg-blue-300 px-5 py-2 rounded-full text-sm font-medium transition duration-300">
                Inicio
              </a>
            </li>
            <li>
              <a href="#" className="hover:bg-blue-300 px-5 py-2 rounded-full text-sm font-medium transition duration-300">
                Peliculas
              </a>
            </li>
            <li>
              <a href="#" className="hover:bg-blue-300 px-5 py-2 rounded-full text-sm font-medium transition duration-300">
                Pag2
              </a>
            </li>
          </ul>
          <button
            type="button"
            className="md:hidden text-gray-800 hover:bg-blue-300 px-5 py-2 rounded-full text-sm font-medium transition duration-300"
          >
            Menu
          </button>
        </section>
      </nav>
    </header>
  );
};

export default NavBar;
