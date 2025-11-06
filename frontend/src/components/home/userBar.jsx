import { FaUserCircle } from "react-icons/fa";
import { FaBell } from "react-icons/fa";
import { useState } from "react";
import ModalUser from "./modalUser.jsx";
import { Link } from "react-router-dom";
export default function UserBar({
  nome,
  email,
  numCarteiras,
  isLogged,
  setIsLogged,
  setNome,
}) {
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
        {isLogged ? (
          <>
            <span className="text-white text-2xl font-black">
              {nome || update}
            </span>
            <div className="relative cursor-pointer bell-hover">
              <FaBell className="text-2xl text-white" />
            </div>
            <FaUserCircle
              className="text-4xl text-white cursor-pointer hover:text-primary transition-colors duration-200"
              onClick={openModal}
            />
          </>
        ) : (
          <Link
            to="/login"
            className="cursor-pointer rounded-2xl px-8 py-2 bg-primary
             text-black text-lg font-bold shadow-md shadow-primary-dark/50 hover:scale-105 active:scale-95 
             transition-all duration-300 ease-out"
          >
            Login
          </Link>
        )}
      </div>

      {isModalOpen && (
        <ModalUser
          nome={nome}
          email={email}
          numCarteiras={numCarteiras}
          onClose={closeModal}
          isLogged={isLogged}
          setIsLogged={setIsLogged}
          setNome={setNome}
        />
      )}
    </>
  );
}
