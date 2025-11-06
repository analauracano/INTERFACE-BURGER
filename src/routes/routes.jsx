import { Routes, Route } from "react-router-dom";
import { Login } from "../containers/Login";

export function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
    </Routes>
  );
}