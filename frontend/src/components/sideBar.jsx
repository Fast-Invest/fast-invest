import { useState } from "react";

import { AiFillHome } from "react-icons/ai";
import { FaWallet } from "react-icons/fa";
import { GoGraph } from "react-icons/go";
import { FaMoneyBillWave } from "react-icons/fa";
import { RiSettings3Fill } from "react-icons/ri";
import { FaInfoCircle } from "react-icons/fa";

export default function Sidebar() {
  // estado que guarda o nome do ícone ativo
  const [activeIcon, setActiveIcon] = useState("home"); // home inicia ativo

  const iconClass = (name) =>
    `cursor-pointer transition-transform hover:scale-120 duration-250 ${
      activeIcon === name ? "text-white" : "text-gray"
    }`;

  return (
    <aside
      className="h-screen w-18 bg-primary text-white flex flex-col items-center 4
      justify-between py-4 shadow-md shadow-white/10"
    >
      <div className="flex flex-col items-center gap-10">
        {/* Logo */}
        <div className="w-10 h-10 bg-gray-200 rounded-full m-6" />

        {/* Ícones */}
        <AiFillHome
          className={`w-7 h-7 ${iconClass("home")}`}
          onClick={() => setActiveIcon("home")}
        />
        <FaMoneyBillWave
          className={`w-7 h-7 ${iconClass("building")}`}
          onClick={() => setActiveIcon("building")}
        />
        <FaWallet
          className={`w-7 h-7 ${iconClass("wallet")}`}
          onClick={() => setActiveIcon("wallet")}
        />
        <GoGraph
          className={`w-7 h-7 ${iconClass("graph")}`}
          onClick={() => setActiveIcon("graph")}
        />
        <RiSettings3Fill
          className={`w-7 h-7 ${iconClass("settings")}`}
          onClick={() => setActiveIcon("settings")}
        />
      </div>

      <FaInfoCircle
        className={`w-7 h-7 m-5 ${iconClass("info")}`}
        onClick={() => setActiveIcon("info")}
      />
    </aside>
  );
}
