import { useState } from "react";
// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";
import { FaQuestionCircle, FaUndoAlt,FaWallet } from "react-icons/fa";
import { Range } from "react-range";
import { useNavigate } from "react-router-dom";
import walletService from "../../services/walletService";
import toast, { Toaster } from "react-hot-toast";
import indicadores  from "./indicadores";



export default function ContentCreateWallet({idUser}) 
{
  const initialState = Object.fromEntries(
    indicadores.map((i) => [i.nome, [i.min, i.max]])
  );
  const [valores, setValores] = useState(initialState);
  const navigate = useNavigate();
  const [nomeCarteira,setNomeCarteira]=useState('');
  const [idCarteira, setIdCarteira]=useState(null);
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
      novo[index] = Math.min(Math.max(num, min), max); // limita dentro do range
      if (novo[0] > novo[1]) novo[index === 0 ? 1 : 0] = novo[index]; // evita inversão
      return { ...prev, [nome]: novo };
    });
  };

  const handleCriarCarteira= async ()=>{
    try
    {
            console.log("teste")

      const date= new Date()

      const ano=date.getFullYear();
      const mes=String((date.getMonth()+1)).padStart(2,"0");
      const dia=String(date.getDate()).padStart(2, "0");

      const data_criacao=`${ano}-${mes}-${dia}`;

      const resp = await walletService.adicionarCarteira({nome:nomeCarteira,data:data_criacao},idUser);
      console.log(resp)

      if(resp) setIdCarteira(resp?.carteira?.id) 
      if(resp.status!==201) {throw new Error()}
      toast.success("Carteira cadastrada com sucesso")
    }  
    catch(error)
    {
      toast.error("Erro ao cadastrar carteira")
      console.log(error)
      return ;
    }

    const filtros = Object.entries(valores).map(([nome, [min, max]]) => ({
      tipo: nome.toLowerCase().replace("p/l","pl").replace("/","_").normalize('NFD').replace(/[\u0300-\u036f]/g, '').replace("valor de mercado","marketCap").replace(" ","_"),  
      valorMin: min,
      valorMax: max
    }));

    console.log(filtros) //Acho que vou ter que mapear o nome


  }




  return (
    <div className="flex flex-col bg-bg min-h-screen px-10 py-24 relative overflow-visible">
          <Toaster
        position="top-right"
        toastOptions={{
          // Estilos padrão para todos os toasts
          style: {
            background: "#15151a",
            color: "#fff",
            border: `1px solid #00ff9c`,
          },
          // Estilos específicos para cada tipo de toast
          success: {
            style: {
              border: `1px solid #00ff9c`,
            },
            iconTheme: {
              primary: "#00ff9c",
              secondary: "#fff",
            },
          },
          error: {
            style: {
              border: "1px solid #EF4444",
            },
            iconTheme: {
              primary: "#EF4444",
              secondary: "#fff",
            },
          },
        }}
      />
      {/* Hero */}
      <motion.div
        className="text-center mb-20"
        initial={{ opacity: 0, y: -40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
      >
        <h1 className="text-5xl md:text-6xl font-extrabold leading-tight">
          Crie sua{" "}
          <span className="bg-gradient-to-r from-primary via-green-500 to-blue-300 bg-clip-text text-transparent animate-gradient">
            carteira personalizada
          </span>
        </h1>
        <p className="text-gray-300 mt-6 text-xl max-w-4xl mx-auto">
          Ajuste os filtros financeiros de acordo com sua estratégia e monte sua
          carteira inteligente.
        </p>
      </motion.div>

        <div className="flex justify-center items-center mx-auto p-6">
          <div className="relative flex items-center">
            <FaWallet className="absolute left-4 text-text-muted" />
            <input
              type="text"
              placeholder="Nome da carteira"
              value={nomeCarteira}
              onChange={(e) => setNomeCarteira(e.target.value)}
              className="w-full bg-bg p-4 pl-12 rounded-lg border-2 border-gray text-text focus:border-primary focus:outline-none transition-colors duration-300"
            />
          </div>
        </div>

      <motion.div
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12 max-w-[1600px] mx-auto relative"
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
      >


        {indicadores.map(({ nome, min, max, explicacao }) => (
          <div
            key={nome}
            className="relative p-8 rounded-3xl bg-bg border border-primary backdrop-blur-md shadow-lg overflow-visible"
          >
            {/* Cabeçalho */}
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-white font-semibold text-2xl">{nome}</h2>

              <div className="flex items-center gap-3">
                {/* Tooltip */}
                <div className="group relative flex items-center">
                  <FaQuestionCircle className="text-primary/80 cursor-pointer" />
                  <div className="absolute bottom-full right-0 mb-3 hidden group-hover:flex bg-gray-900 text-gray-100 text-base rounded-xl px-4 py-3 shadow-2xl z-50 w-72 leading-relaxed border border-primary/30">
                    {explicacao}
                  </div>
                </div>

                <div>
                  
                </div>




                {/* Botão Reset */}
                <button
                  onClick={() => resetar(nome)}
                  className="text-gray-400 cursor-pointer hover:text-primary-dark transition-colors"
                  title="Redefinir valores"
                >
                  <FaUndoAlt />
                </button>
              </div>
            </div>

            {/* Slider duplo */}
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
                  className="h-3 rounded-full bg-gray-800 relative cursor-pointer"
                >
                  <div
                    className="absolute h-3 rounded-full bg-primary"
                    style={{
                      left: `${
                        ((valores[nome][0] - min) / (max - min)) * 100
                      }%`,
                      width: `${
                        ((valores[nome][1] - valores[nome][0]) / (max - min)) *
                        100
                      }%`,
                    }}
                  />
                  {children}
                </div>
              )}}
              renderThumb={({ props }) => {
              const { key,...rest } = props
              return(
                <div
                  key={key}
                  {...rest}
                  className="w-5 h-5 rounded-full bg-primary shadow-md"
                />
              )}}
            />

            {/* Inputs de valores */}
            <div className="flex justify-between mt-4 text-gray-400 text-base font-medium gap-3">
              <input
                value={valores[nome][0]}
                min={min}
                max={max}
                onChange={(e) =>
                  handleInputChange(nome, 0, e.target.value, min, max)
                }
                className="w-24 px-2 py-1 bg-gray-900 text-gray-200 rounded-md border border-gray-700 focus:border-primary focus:outline-none text-center"
              />
              <input
                value={valores[nome][1]}
                min={min}
                max={max}
                onChange={(e) =>
                  handleInputChange(nome, 1, e.target.value, min, max)
                }
                className="w-24 px-2 py-1 bg-gray-900 text-gray-200 rounded-md border border-gray-700 focus:border-primary focus:outline-none text-center"
              />
            </div>
          </div>
        ))}
      </motion.div>

      <div className="flex justify-center gap-8 mt-24">
        <motion.button
          onClick={() => navigate("/carteira")}
          className="w-48 py-4 text-lg cursor-pointer font-semibold text-gray-300 bg-gray-900 rounded-2xl shadow-md transition-all duration-300"
          whileHover={{ scale: 1.05 }}
        >
          Voltar
        </motion.button>

        <motion.button
          onClick={() => handleCriarCarteira(nomeCarteira,valores)}
          className="w-48 py-4 cursor-pointer text-lg font-semibold text-bg bg-primary rounded-2xl shadow-md transition-all duration-300"
          whileHover={{ scale: 1.05 }}
        >
          Criar
        </motion.button>
      </div>
    </div>
  );
}
