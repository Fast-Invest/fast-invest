import { Routes, Route } from "react-router-dom";
import Login from "../pages/Login.jsx";
import Home from "../pages/Home.jsx";
import ForgotPassword from "../pages/ForgotPassword.jsx";
import Quotation from "../pages/Quotation.jsx";
import Wallet from "../pages/Wallet.jsx";
import Graph from "../pages/Graph.jsx";
import CreateWallet from "../pages/CreateWallet.jsx";
import UpdateWallet from "../pages/UpdateWallet.jsx";
import QuotationDetails from "../pages/QuotationDetails.jsx";
import WalletDetails from "../pages/WalletDetails.jsx";
import About from "../pages/About.jsx";
export default function Rotas() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />

      <Route path="/login" element={<Login />} />
      <Route path="/esqueceusenha" element={<ForgotPassword />} />
      <Route path="/cotacoes" element={<Quotation />} />
      <Route path="/cotacoes/:ticker" element={<QuotationDetails />} />

      <Route path="/carteira" element={<Wallet />} />
      <Route path="/carteira/criarcarteira" element={<CreateWallet />} />
      <Route path="/carteira/editarcarteira" element={<UpdateWallet />} />
      <Route path="/carteira/detalhes" element={<WalletDetails />} />

      <Route path="/graficos" element={<Graph />} />
      <Route path="/sobre" element={<About />} />
    </Routes>
  );
}
