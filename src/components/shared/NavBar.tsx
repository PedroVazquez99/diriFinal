import React, { useContext } from "react";
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from "../../contexts/AuthContext";
import { authService } from "../../services/AuthService";
import { Role } from "../../models/IRole";
const NavBar: React.FC = () => {
  const { user, roles } = useContext(AuthContext);
  const navigate = useNavigate();
  const handleLogOut = async () => {
    try {
      await authService.signOut();
      navigate("/login");
    } catch (error) {
      console.error("Error signing out:", error);
    }
  };

  return (
    <header className="bg-blue-200 text-gray-800 shadow-md rounded-b-lg">
      <nav className="bg-blue-200 text-gray-800 shadow-md rounded-b-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <section className="flex items-center justify-between h-16">
            <ul className="hidden md:flex space-x-8">
              {user &&
                <>
                  <li><Link to="/" className="hover:bg-blue-300 px-5 py-2 rounded-full text-sm font-medium transition duration-300">Home</Link></li>
                  <li><Link to="/dashboard" className="hover:bg-blue-300 px-5 py-2 rounded-full text-sm font-medium transition duration-300">Dashboard</Link></li>
                </>
              }
              {user && roles && roles.includes(Role.ADMIN) && <li><Link to="/admin" className="hover:bg-blue-300 px-5 py-2 rounded-full text-sm font-medium transition duration-300">Admin</Link></li>}
              {!user && (
                <>
                  <li><Link to="/login" className="hover:bg-blue-300 px-5 py-2 rounded-full text-sm font-medium transition duration-300">Login</Link></li>
                  <li><Link to="/register" className="hover:bg-blue-300 px-5 py-2 rounded-full text-sm font-medium transition duration-300">Registro</Link></li>
                </>
              )}
              {user && <li><button onClick={handleLogOut} className="hover:bg-blue-300 px-5 py-2 rounded-full text-sm font-medium transition duration-300">Logout</button></li>}
            </ul>
            <button type="button" className="md:hidden text-gray-800 hover:bg-blue-300 px-5 py-2 rounded-full text-sm font-medium transition duration-300">Menu</button>
          </section>
        </div>
      </nav>
    </header>
  );
};

export default NavBar;
