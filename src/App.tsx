import "./App.css";
import { Route, Routes } from "react-router-dom";
import Login from "./pages/Login";
import Home from "./pages/Home";
import Register from "./pages/Register";
import NavBar from "./components/shared/NavBar";
import Footer from "./components/shared/Footer";

function App() {
  return (
    <>
      <NavBar />
        
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/register" element={<Register />} />
            <Route path="/login" element={<Login />} />
            <Route path="/home" element={<Home />} />
            <Route path="*" element={<Home />} />
          </Routes>
          
      <Footer />
    </>
  );
}

export default App;
