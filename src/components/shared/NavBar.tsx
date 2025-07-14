import React, { useContext } from "react";
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from "../../contexts/AuthContext";
import { authService } from "../../services/AuthService";
import { Role } from "../../models/IRole";
import { FormattedMessage } from "react-intl";
import { Switch } from "antd";
import { LanguageContext } from "../../providers/LanguageProvider"; // Asegúrate de importar tu contexto
import SwitchAdapter from "../../antDesignAdapters/buttons/SwitchAdapter";

const NavBar: React.FC = () => {
  const { user, roles } = useContext(AuthContext);
  const navigate = useNavigate();
  const { locale, changeLanguage } = useContext(LanguageContext);

  const handleLogOut = async () => {
    try {
      await authService.signOut();
      navigate("/login");
    } catch (error) {
      console.error("Error signing out:", error);
    }
  };

  const handleLanguageSwitch = (checked: boolean) => {
    changeLanguage(checked ? "es" : "en");
  };

  return (
    <header className="bg-blue-200 text-gray-800 shadow-md rounded-b-lg">
      <nav className="bg-blue-200 text-gray-800 shadow-md rounded-b-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <section className="flex items-center justify-between h-16">
            <ul className="hidden md:flex space-x-8">
              {user &&
                <>
                  <li><Link to="/home" className="hover:bg-blue-300 px-5 py-2 rounded-full text-sm font-medium transition duration-300">Home</Link></li>
                  <li><Link to="/dashboard" className="hover:bg-blue-300 px-5 py-2 rounded-full text-sm font-medium transition duration-300">Dashboard</Link></li>
                </>
              }
              {user && roles && <li><Link to="/admin" className="hover:bg-blue-300 px-5 py-2 rounded-full text-sm font-medium transition duration-300">Admin</Link></li>}
              {!user && (
                <>
                  <li><Link to="/login" className="hover:bg-blue-300 px-5 py-2 rounded-full text-sm font-medium transition duration-300">Login</Link></li>
                  <li><Link to="/register" className="hover:bg-blue-300 px-5 py-2 rounded-full text-sm font-medium transition duration-300">
                    <FormattedMessage
                      id="app.label.register"
                    />
                  </Link></li>
                </>
              )}
              {user &&
                <li>
                  <button onClick={handleLogOut} className="hover:bg-blue-300 px-5 py-2 rounded-full text-sm font-medium transition duration-300">
                    <FormattedMessage
                      id="menu.label.logout"
                    />
                  </button>
                </li>
              }
              <li>
                <SwitchAdapter
                  value={locale === "es"}
                  onChange={handleLanguageSwitch}
                  checkedChildren="EN"
                  unCheckedChildren="ES"
                  style={{ backgroundColor: "#1890ff" }}
                />
              </li>
            </ul>
          </section>
        </div>
      </nav>
    </header>
  );
};

export default NavBar;