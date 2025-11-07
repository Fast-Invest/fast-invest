import { useState } from "react";
// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";
import { FaQuestionCircle, FaUndoAlt, FaWallet } from "react-icons/fa";
import { Range } from "react-range";
import { useNavigate } from "react-router-dom";
import walletService from "../../services/walletService";
import toast, { Toaster } from "react-hot-toast";
import indicadores from "./indicadores";
import { useUser } from "../../contexts/userContext";
export default function ContentCreateWallet()
{

  //TODO: atualizar o estado das carteiras para o contentWallet
  const { user,setWallet } = useUser()

  const initialState = Object.fromEntries(
    indicadores.map((i) => [i.nome, [i.min, i.max]])
  );
  const [valores, setValores] = useState(initialState);
  const navigate = useNavigate();
  const [nomeCarteira, setNomeCarteira] = useState("");

  const resetar = (nome) => {
    setValores((prev) => ({
      ...prev,
      [nome]: [initialState[nome][0], initialState[nome][1]],
    }));
  };

  const handleInputChange = (nome, index, valor, min, max) => {
    const num = parseFloat(valor);
    if (isNaN(num)) return;
    setValores((prev) => {
      const novo = [...prev[nome]];
      novo[index] = Math.min(Math.max(num, min), max);
      if (novo[0] > novo[1]) novo[index === 0 ? 1 : 0] = novo[index];
      return { ...prev, [nome]: novo };
    });
  };

  const handleCriarCarteira = async () => {
    try 
    {
      const date = new Date();
      const ano=String(date.getFullYear())
      const mes=String((date.getMonth() + 1)).padStart(2,"0")
      const dia=String(date.getDate()).padStart(2,"0")

      const data_criacao = `${ano}-${mes}-${dia}`;

      const resp = await walletService.adicionarCarteira(
        { nome: nomeCarteira, data: data_criacao },
        user?.id
      );

      //if (resp) setIdCarteira(resp.carteira.id);
      if (resp.status !== 201) {
        toast.error("Erro ao cadastrar a carteira")
        return ;
      }
      toast.success("Carteira cadastrada com sucesso");
    

      const filtros = Object.entries(valores).map(([nome, [min, max]]) => ({
        tipo: String(nome),
        valorMin: parseFloat(min),
        valorMax: parseFloat(max),
      }));
      console.log('carteira adicionada: ',resp.carteira)
      const res = await walletService.adicionarFiltro(filtros,resp.carteira.id)
      if (res.status !== 201) {
        toast.error("Erro ao cadastrar a filtros")
        return ;
      }

      const response = await walletService.buscarCarteiras(user?.id)
      if (response.status===200) setWallet(response?.carteiras)
    }
    catch (error) 
    {
      toast.error("Erro ao cadastrar filtros na carteira");
      console.log(error);
      return;
    }
    }
  


  return (
    <div className="flex flex-col bg-bg min-h-screen px-8 py-12 relative overflow-visible">
      <Toaster
        position="top-right"
        toastOptions={{
          style: {
            background: "#15151a",
            color: "#fff",
            border: `1px solid #00ff9c`,
          },
          success: {
            style: { border: `1px solid #00ff9c` },
            iconTheme: { primary: "#00ff9c", secondary: "#fff" },
          },
          error: {
            style: { border: "1px solid #EF4444" },
            iconTheme: { primary: "#EF4444", secondary: "#fff" },
          },
        }}
      />

      {/* Hero */}
      <motion.div
        className="text-center mb-10"
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <h1 className="text-4xl md:text-5xl font-extrabold leading-tight">
          Crie sua{" "}
          <span className="bg-gradient-to-r from-primary via-green-500 to-blue-300 bg-clip-text text-transparent animate-gradient">
            carteira personalizada
          </span>
        </h1>
        <p className="text-gray-300 mt-4 text-lg max-w-3xl mx-auto">
          Ajuste os filtros financeiros de acordo com sua estratégia e monte sua
          carteira inteligente.
        </p>
      </motion.div>

      {/* Input Nome Carteira */}
      <div className="flex justify-center mt-6 mb-8">
        <div className="relative w-full max-w-md">
          <FaWallet className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 text-lg" />
          <input
            type="text"
            placeholder="Digite o nome da sua carteira..."
            value={nomeCarteira}
            onChange={(e) => setNomeCarteira(e.target.value)}
            className="w-full bg-gray-900/60 border border-gray-700 text-gray-200 placeholder-gray-500 
                 rounded-2xl py-3 pl-12 pr-4 text-base focus:border-primary focus:ring-2 focus:ring-primary/30 
                 outline-none transition-all duration-300 shadow-sm hover:border-gray-500"
          />
        </div>
      </div>

      {/* Indicadores */}
      <motion.div
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-8 max-w-[1500px] mx-auto relative"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        {indicadores.map(({ nome, min, max, explicacao }) => (
          <div
            key={nome}
            className="relative p-6 rounded-3xl bg-bg border border-primary backdrop-blur-md shadow-lg overflow-visible"
          >
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-white font-semibold text-xl whitespace-nowrap overflow-hidden text-ellipsis">
                {nome}
              </h2>

              <div className="flex items-center gap-2">
                <div className="group relative flex items-center">
                  <FaQuestionCircle className="text-primary/80 cursor-pointer" />
                  <div className="absolute bottom-full right-0 mb-2 hidden group-hover:flex bg-gray-900 text-gray-100 text-sm rounded-xl px-3 py-2 shadow-2xl z-50 w-64 leading-relaxed border border-primary/30">
                    {explicacao}
                  </div>
                </div>

                <button
                  onClick={() => resetar(nome)}
                  className="text-gray-400 cursor-pointer hover:text-primary-dark transition-colors"
                  title="Redefinir valores"
                >
                  <FaUndoAlt />
                </button>
              </div>
            </div>

            {/* Slider */}
            <Range
              step={0.5}
              min={min}
              max={max}
              values={valores[nome]}
              onChange={(values) => setValores({ ...valores, [nome]: values })}
              renderTrack={({ props, children }) => {
                const { key, ...rest } = props;
                return (
                  <div
                    key={key}
                    {...rest}
                    className="h-2 rounded-full bg-gray-800 relative cursor-pointer"
                  >
                    <div
                      className="absolute h-2 rounded-full bg-primary"
                      style={{
                        left: `${
                          ((valores[nome][0] - min) / (max - min)) * 100
                        }%`,
                        width: `${
                          ((valores[nome][1] - valores[nome][0]) /
                            (max - min)) *
                          100
                        }%`,
                      }}
                    />
                    {children}
                  </div>
                );
              }}
              renderThumb={({ props }) => {
                const { key, ...rest } = props;
                return (
                  <div
                    key={key}
                    {...rest}
                    className="w-4 h-4 rounded-full bg-primary shadow-md"
                  />
                );
              }}
            />

            {/* Inputs */}
            <div className="flex justify-between mt-3 text-gray-400 text-sm font-medium gap-2">
              <input
                value={valores[nome][0]}
                min={min}
                max={max}
                onChange={(e) =>
                  handleInputChange(nome, 0, e.target.value, min, max)
                }
                className="w-20 px-2 py-1 bg-gray-900 text-gray-200 rounded-md border border-gray-700 focus:border-primary focus:outline-none text-center"
              />
              <input
                value={valores[nome][1]}
                min={min}
                max={max}
                onChange={(e) =>
                  handleInputChange(nome, 1, e.target.value, min, max)
                }
                className="w-20 px-2 py-1 bg-gray-900 text-gray-200 rounded-md border border-gray-700 focus:border-primary focus:outline-none text-center"
              />
            </div>
          </div>
        ))}
      </motion.div>

      {/* Botões */}
      <div className="flex justify-center gap-6 mt-16">
        <motion.button
          onClick={() => navigate("/carteira")}
          className="w-40 py-3 text-base font-semibold text-gray-300 bg-gray-900 rounded-2xl shadow-md transition-all duration-300"
          whileHover={{ scale: 1.05 }}
        >
          Voltar
        </motion.button>

        <motion.button
          onClick={() => handleCriarCarteira(nomeCarteira, valores)}
          className="w-40 py-3 text-base font-semibold text-bg bg-primary rounded-2xl shadow-md transition-all duration-300"
          whileHover={{ scale: 1.05 }}
        >
          Criar
        </motion.button>
      </div>
    </div>
  );
}
