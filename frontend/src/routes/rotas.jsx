import { Routes, Route } from "react-router-dom";
import Login from "../pages/Login.jsx";
import Home from "../pages/Home.jsx";
import ForgotPassword from "../pages/ForgotPassword.jsx";
import Quotation from "../pages/Quotation.jsx";

export default function Rotas() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/esqueceusenha" element={<ForgotPassword />} />
      <Route path="/cotações" element={<Quotation />} />
    </Routes>
  );
}
