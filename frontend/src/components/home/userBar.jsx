import { FaUserCircle } from "react-icons/fa";
import { FaBell } from "react-icons/fa";
import { useState } from "react";
import ModalUser from "./modalUser.jsx";

export default function UserBar({ nome, email }) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      <div className="flex items-center gap-4 shrink-0 pl-6 border-l border-white/10">
        <div className="relative cursor-pointer bell-hover">
          <FaBell className="text-2xl text-white" />
        </div>
        <span className="text-white text-2xl font-black">
          {nome || "Usuário"}
        </span>
        <FaUserCircle
          className="text-4xl text-white cursor-pointer hover:text-primary transition-colors duration-200"
          onClick={openModal}
        />
      </div>

      {isModalOpen && (
        <ModalUser nome={nome} email={email} onClose={closeModal} />
      )}
    </>
  );
}
