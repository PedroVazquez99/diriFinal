import React from "react";

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-800 text-white py-8">
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="text-sm font-medium tracking-wide">
            &copy; 2025 <span className="font-bold">FilmO</span>. Todos los derechos reservados.
          </div>
          <nav className="flex space-x-6 mt-4 md:mt-0">
            <a href="#" className="hover:text-gray-300 text-sm font-medium transition duration-300">
              Privacy Policy
            </a>
            <a href="#" className="hover:text-gray-300 text-sm font-medium transition duration-300">
              Terms of Service
            </a>
            <a href="#" className="hover:text-gray-300 text-sm font-medium transition duration-300">
              Contact Us
            </a>
          </nav>
        </div>
      </section>
    </footer>
  );
};

export default Footer;
