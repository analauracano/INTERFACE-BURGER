import { Routes, Route, Outlet } from "react-router-dom"; 
import { Header } from "../components/Header";
import { Footer } from "../components/Footer";
import { Cart, Checkout, CompletePayment, Home, Login, Menu, Register } from "../containers";

function LayoutBase() {
  return (
    <>
      <Outlet />
      <Footer />
    </>
  );
}

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
      <Route element={<LayoutBase />}>

        {/* Rotas sem header */}
        <Route path="/login" element={<Login />} />
        <Route path="/cadastro" element={<Register />} />
        <Route path="/carrinho" element={<Cart />} />
        <Route path="/complete" element={<CompletePayment />} />

        {/* Rotas que precisam header */}
        <Route element={<LayoutWithHeader />}>
          <Route path="/" element={<Home />} />
          <Route path="/cardapio" element={<Menu />} />

          {/* MOVER O CHECKOUT PARA ESTE BLOCO */}
          <Route path="/checkout" element={<Checkout />} />
        </Route>

      </Route>
    </Routes>
  );
}
