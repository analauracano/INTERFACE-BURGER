import { Routes, Route } from "react-router-dom";
import { Login } from "../containers/Login";
import { Register } from "../containers/Register";
import { Home } from "../containers/Home";
import { Menu } from "../containers/Menu";

export function AppRoutes() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />,
      <Route path="/cadastro" element={<Register />} />,
      <Route path="/" element={<Home />} />,
      <Route path="/cardapio" element={<Menu />} />,
    </Routes>
  );
}