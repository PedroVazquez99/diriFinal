import React from "react";

import NavBar from "../components/shared/NavBar";
import Footer from "../components/shared/Footer";
import LoginForm from "../components/auth/LoginFormm";

const Login: React.FC = () => {
  return (
    <>
    <NavBar/>
      <LoginForm />
    <Footer/>
    </>
  );
};

export default Login;
