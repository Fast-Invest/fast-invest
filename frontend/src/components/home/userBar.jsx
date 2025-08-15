import { FaUserCircle } from "react-icons/fa";
import { FaBell } from "react-icons/fa";
import { useState } from "react";
import ModalUser from "./modalUser.jsx";
import { Link } from "react-router-dom"
export default function UserBar({ nome, email,isLogged,setIsLogged,setNome }) {
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


        {isLogged ?
        <>
          <span className="text-white text-2xl font-black">
              {nome || update}
          </span>

          <FaUserCircle
            className="text-4xl text-white cursor-pointer hover:text-primary transition-colors duration-200"
            onClick={openModal}
          />
        </>

        :
          <Link to="/login" className="cursor-pointer w-9/12 rounded-lg border-2 border-white flex p-1 text-white hover:text-primary items-center hover:border-primary-dark transform hover:scale-105 active:scale-95 transition-transform duration-400">
            
            <FaUserCircle className="text-4xl"/>
            
            <span className="text-sm font-black align-middle ml-1">
              Faça login
            </span>
          </Link>
        
        
        }


      </div>

      {isModalOpen && (
        <ModalUser nome={nome} email={email} onClose={closeModal} isLogged={isLogged} setIsLogged={setIsLogged} setNome={setNome}/>
      )}


    </>
  );
}
