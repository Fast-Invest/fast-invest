import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";
import { FaWallet, FaPlusCircle, FaTrash, FaPencilAlt } from "react-icons/fa";
import { BsThreeDotsVertical } from "react-icons/bs";

import walletService from "../../services/walletService.jsx";

export default function ContentWallet({ userId }) {
  const navigate = useNavigate();
  const [menuAberto, setMenuAberto] = useState(false);
  const [carteiras, setCarteiras] = useState([
    {
      id: 1,
      nome: "Carteira Tutorial",
      data: "12/05/2024",
      filtros: [],
    },
  ]);

  useEffect(() => {
    (async () => {
      try {
        if (!userId) throw new Error("Nenhum usuario com id especificado");
        const resp = await walletService.buscarCarteiras(userId);
        if (resp.carteiras) setCarteiras(resp.carteiras);
      } catch (error) {
        console.log("erro: ", error);
      }
    })();
  }, [userId, setCarteiras]);

  return (
    <div className="flex flex-col bg-bg min-h-screen px-6 relative overflow-hidden">
      {/* Hero*/}
      <motion.div
        className="text-center m-10 relative z-10"
        initial={{ opacity: 0, y: -40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
      >
        <h1 className="text-2xl md:text-8xl font-bold">
          Suas{" "}
          <span className="bg-gradient-to-r from-primary via-green-500 to-blue-300 bg-clip-text text-transparent animate-gradient">
            carteiras
          </span>
        </h1>
        <p className="text-gray-300 mt-6 text-lg md:text-xl max-w-2xl mx-auto">
          Veja suas carteiras, acompanhe o desempenho e crie novas estratégias
          de investimento com visual moderno e prático.
        </p>
      </motion.div>

      {/* Cards de carteiras */}
      <section className="max-w-[1600px] mx-auto w-full flex flex-col gap-20 items-center relative z-10">
        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 w-full"
          initial={{ opacity: 0, y: 60 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          viewport={{ once: true }}
        >
          {carteiras.map((carteira) => (
            <motion.div
              key={carteira.id}
              className="group cursor-pointer p-6 rounded-2xl border border-primary/40 
                bg-gradient-to-br from-black/50 via-black/30 to-primary/10
                shadow-lg shadow-primary/20 hover:shadow-primary/60 hover:-translate-y-2 
                transition-all duration-300 backdrop-blur-md relative overflow-hidden"
              whileHover={{ scale: 1.02 }}
              onClick={() => navigate(`/carteira/${carteira.id}`)}
            >
              {/* Brilho animado */}
              <div
                className="absolute inset-0 opacity-0 group-hover:opacity-10 
                  bg-gradient-to-r from-primary via-green-400 to-blue-400 
                  animate-gradient transition-opacity duration-500"
              ></div>

              <div className="flex justify-between items-center mb-4 relative">
                <FaWallet className="text-primary text-3xl drop-shadow-lg" />

                {/* Botão de menu ⋮ */}
                <button
                  onClick={(e) => {
                    e.stopPropagation(); // evita navegação
                    setMenuAberto(!menuAberto);
                  }}
                  className="text-gray-500 hover:text-primary transition-colors duration-300"
                >
                  <BsThreeDotsVertical className="text-2xl" />
                </button>

                {/* Menu suspenso */}
                {menuAberto && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.2 }}
                    className="absolute right-6 bg-black/80 border border-gray-700 
                    rounded-xl shadow-lg backdrop-blur-md w-24 z-20 p-1 flex flex-col"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <button
                      className="flex items-center gap-2 text-gray-300 hover:text-primary 
                      px-2 py-1 rounded-lg transition-colors duration-200 text-sm"
                      onClick={() => navigate(`/carteira/${carteira.id}`)}
                    >
                      <FaPencilAlt className="text-xs" />
                      Editar
                    </button>

                    <button
                      className="flex items-center gap-2 text-gray-300 hover:text-primary 
                      px-2 py-1 rounded-lg transition-colors duration-200 text-sm"
                      onClick={() => navigate(`/carteira/${carteira.id}`)}
                    >
                      <FaTrash className="text-xs" />
                      Excluir
                    </button>
                  </motion.div>
                )}
              </div>

              <h2 className="text-2xl font-semibold text-white mb-2 whitespace-nowrap overflow-hidden text-ellipsis">
                {carteira.nome}
              </h2>

              <p className="text-gray-400 text-base">
                Criada em{" "}
                <span className="text-primary font-semibold">
                  {carteira.data}
                </span>
              </p>
            </motion.div>
          ))}

          {/* Card para criar nova carteira */}
          <motion.div
            className="cursor-pointer flex flex-col items-center justify-center border-2 border-dashed border-primary rounded-2xl p-8 text-center hover:bg-primary/10 hover:-translate-y-2 transition-all duration-300 backdrop-blur-md"
            onClick={() => navigate("/carteira/criarcarteira")}
            whileHover={{ scale: 1.05 }}
          >
            <FaPlusCircle className="text-primary text-6xl mb-4" />
            <h2 className="text-primary text-2xl font-bold">
              Criar nova carteira
            </h2>
          </motion.div>
        </motion.div>
      </section>
    </div>
  );
}
