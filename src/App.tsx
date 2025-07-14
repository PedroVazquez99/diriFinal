import "./App.css";
import { Route, Routes } from "react-router-dom";
import Login from "./pages/Login";
import Home from "./pages/Home";
import Register from "./pages/Register";
import NavBar from "./components/shared/NavBar";
import Footer from "./components/shared/Footer";
import { RegisterRoute } from "./routes/RegisterRoute";
import InfoMoviePage from "./pages/InfoMoviePage";
import UsersPage from "./pages/UsersPage";

function App() {
  return (
    <>
      <NavBar />

      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/home" element={<RegisterRoute><Home /></RegisterRoute>} />
        <Route path="/movie/:id" element={<RegisterRoute><InfoMoviePage /></RegisterRoute>} />
        <Route path="/admin" element={<RegisterRoute><UsersPage /></RegisterRoute>} />
        <Route path="*" element={<Login />} />
      </Routes>

      <Footer />
    </>
  );
}

export default App;
