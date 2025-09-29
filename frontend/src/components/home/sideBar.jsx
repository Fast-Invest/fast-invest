import { useNavigate, useLocation } from "react-router-dom";

import { AiFillHome } from "react-icons/ai";
import { FaWallet, FaMoneyBillWave, FaInfoCircle } from "react-icons/fa";
import { GoGraph } from "react-icons/go";
import { RiSettings3Fill } from "react-icons/ri";

export default function Sidebar() {
  const navigate = useNavigate();
  const location = useLocation();

  // Função que retorna se o ícone está ativo baseado na URL
  const iconClass = (path) =>
    `cursor-pointer transition-transform hover:scale-110 duration-200 ${
      location.pathname === path ? "text-white" : "text-gray-400"
    }`;

  return (
    <aside className="h-screen w-18 bg-bg text-white flex flex-col items-center justify-between py-4">
      <div className="flex flex-col items-center gap-10">
        {/* Logo */}
        <div className="w-10 h-10 bg-gray-200 rounded-full m-6" />

        {/* Ícones */}
        <AiFillHome
          className={`w-7 h-7 ${iconClass("/")}`}
          onClick={() => navigate("/")}
        />
        <FaMoneyBillWave
          className={`w-7 h-7 ${iconClass("/cotacoes")}`}
          onClick={() => navigate("/cotacoes")}
        />
        <FaWallet
          className={`w-7 h-7 ${iconClass("/carteira")}`}
          onClick={() => navigate("/carteira")}
        />
        <GoGraph
          className={`w-7 h-7 ${iconClass("/graficos")}`}
          onClick={() => navigate("/graficos")}
        />
        <RiSettings3Fill
          className={`w-7 h-7 ${iconClass("/configuracoes")}`}
          onClick={() => navigate("/configuracoes")}
        />
      </div>

      <FaInfoCircle
        className={`w-7 h-7 m-5 ${iconClass("/sobre")}`}
        onClick={() => navigate("/sobre")}
      />
    </aside>
  );
}
