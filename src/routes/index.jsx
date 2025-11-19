import { Routes, Route, Outlet } from "react-router-dom"; 
import { Header } from "../components/Header";
import { Footer } from "../components/Footer";
import { Cart, Home, Login, Menu, Register } from "../containers";

// Layout base com footer SEMPRE
function LayoutBase() {
  return (
    <>
      <Outlet /> {/* Conteúdo da página */}
      <Footer />
    </>
  );
}

// Layout com header (e footer vem do LayoutBase)
function LayoutWithHeader() {
  return (
    <>
      <Header />
      <Outlet />
    </>
  );
}

export function AppRoutes() {
  return (
    <Routes>

      {/* Todas as rotas terão footer */}
      <Route element={<LayoutBase />}>

        {/* Rotas sem header */}
        <Route path="/login" element={<Login />} />
        <Route path="/cadastro" element={<Register />} />
        <Route path="/carrinho" element={<Cart />} />

        {/* Rotas com header */}
        <Route element={<LayoutWithHeader />}>
          <Route path="/" element={<Home />} />
          <Route path="/cardapio" element={<Menu />} />
        </Route>

      </Route>
    </Routes>
  );
}
