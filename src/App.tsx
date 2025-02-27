import "./App.css";
import { Route, Routes } from "react-router-dom";
import Iniciar from "./pages/Iniciar";
import Home from "./pages/Home";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Iniciar />} />
        <Route path="/login" element={<Home />} />
      </Routes>
    </>
  );
}

export default App;
