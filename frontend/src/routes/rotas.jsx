import { Routes, Route } from "react-router-dom";
import Login from "../pages/Login.jsx";
import Home from "../pages/Home.jsx";
import ForgotPassword from "../pages/ForgotPassword.jsx";
import Quotation from "../pages/Quotation.jsx";
import Wallet from "../pages/Wallet.jsx";
import Graph from "../pages/Graph.jsx";
import Config from "../pages/Config.jsx";
import Info from "../pages/Info.jsx";
import CreateWallet from "../pages/createWallet.jsx";

export default function Rotas() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />

      <Route path="/login" element={<Login />} />
      <Route path="/esqueceusenha" element={<ForgotPassword />} />
      <Route path="/cotacoes" element={<Quotation />} />
      <Route path="/carteira" element={<Wallet />} />
      <Route path="/carteira/criarcarteira" element={<CreateWallet />} />
      <Route path="/grafico" element={<Graph />} />
      <Route path="/configuracoes" element={<Config />} />
      <Route path="/sobre" element={<Info />} />
    </Routes>
  );
}
