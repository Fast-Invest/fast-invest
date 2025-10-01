import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { FaCheckCircle } from "react-icons/fa";

export default function ContentHome() {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col">
      {/* === Seção 1: Banner (Imagem + Texto) === */}
      <section className="flex flex-1 items-center justify-center bg-bg px-6 py-10 min-h-screen">
        <div className="flex flex-col md:flex-row items-center justify-between gap-24 max-w-[1600px] w-full">
          
          {/* Imagem com glow */}
<div className="flex-1 flex justify-center relative">
  <div className="absolute w-[400px] h-[400px] bg-green-400/20 rounded-full blur-[120px]"></div>
  <motion.img 
    src="/png/grafico (2).png" 
    alt="Imagem Gráfico" 
    className="relative h-[60vh] w-auto max-w-none z-10"
    initial={{ opacity: 0, y: 50 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay: 0.3, duration: 1 }}
  />
</div>


          {/* Texto */}
          <motion.div 
            className="flex-1 text-center"   
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 1 }}
          >
            <h1 className="text-4xl md:text-7xl font-bold leading-tight">
              Investir é comum. <br />
              Investir do <span className="text-green-400">seu jeito</span> <br />
              é <span className="text-green-400">único</span>
            </h1>

            <div className="flex justify-center"> 
              <button 
                onClick={() => navigate("/carteira")} 
                className="mt-12 w-90 px-10 py-5 rounded-2xl bg-green-400 text-black text-xl font-semibold hover:bg-green-500 transition"
              >
                Criar Carteira
              </button>
            </div>
          </motion.div>
        </div>
      </section>


      {/* === Seção 2: Informações === */}
      <section className="bg-bg px-6 py-20 flex flex-col items-center gap-20 max-w-[1600px] mx-auto w-full">
        
        {/* Cards superiores */}
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full md:w-auto self-start"
          initial={{ opacity: 0, y: 60 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          viewport={{ once: true }}
        >
          <div className="p-6 rounded-2xl border border-green-400/50 bg-black/40 text-left">
            <h3 className="text-green-400 text-2xl font-bold mb-3">Personalização</h3>
            <p className="text-lg text-gray-300">Cada cliente cria e configura sua carteira única de forma única e sob medida.</p>
          </div>
          <div className="p-6 rounded-2xl border border-green-400/50 bg-black/40 text-left">
            <h3 className="text-green-400 text-2xl font-bold mb-3">Diversificação</h3>
            <p className="text-lg text-gray-300">Escolha diversas dentre as principais e mais populares ações da bolsa brasileira! </p>
          </div>
          <div className="p-6 rounded-2xl border border-green-400/50 bg-black/40 text-left">
            <h3 className="text-green-400 text-2xl font-bold mb-3">Filtragem</h3>
            <p className="text-lg text-gray-300">Crie carteiras ,que exibam dados de sua preferência, de acordo com os filtros aplicados por você nas ações de sua preferência!</p>
          </div>
        </motion.div>

        {/* Texto O que é o Fast Invest */}
        <motion.div 
          className="text-center max-w-4xl"
          initial={{ opacity: 0, y: 60 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          viewport={{ once: true }}
        >
          <h2 className="text-green-400 text-3xl md:text-4xl font-bold mb-6">
            O que é o Fast Invest?
          </h2>
          <p className="text-white text-lg md:text-xl leading-relaxed">
            O Fast Invest nasceu para transformar a forma como você investe. Nosso objetivo é
            simplificar o acesso ao mercado financeiro, oferecendo carteiras exclusivas,
            personalizadas e alinhadas ao seu perfil. Não somos apenas uma plataforma, somos
            o parceiro que vai ao seu lado na jornada rumo à liberdade financeira.
          </p>
        </motion.div>

        {/* Nossa Proposta */}
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 gap-12 items-start w-full"
          initial={{ opacity: 0, y: 60 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          viewport={{ once: true }}
        >
          <div>
            <h2 className="text-primary text-3xl md:text-4xl font-bold mb-6">
              Nossa Proposta
            </h2>
            <p className="text-white text-lg md:text-xl leading-relaxed">
              Acreditamos que cada investidor é único. Por isso, nossas soluções são moldadas de
              acordo com suas necessidades, seu perfil de risco e seus objetivos. Nosso propósito
              é garantir que você não apenas invista, mas invista do seu jeito.
            </p>
          </div>

        <div className="p-6 rounded-2xl border border-green-400/50 bg-black/40 space-y-6">
            <div className="flex items-start gap-3">
              <FaCheckCircle className="text-green-400 text-2xl mt-1" />
              <p className="text-lg md:text-xl">
                <span className="font-semibold text-white">Carteiras Exclusivas</span><br/>
                <span className="text-gray-300">Planos de investimento adaptados a você</span>
              </p>
            </div>
            <div className="flex items-start gap-3">
              <FaCheckCircle className="text-green-400 text-2xl mt-1" />
              <p className="text-lg md:text-xl">
                <span className="font-semibold text-white">Planejamento Simples</span><br/>
                <span className="text-gray-300">Organizar seus objetivos financeiros de forma prática.</span>
              </p>
            </div>
          </div>
        </motion.div>
      </section>
    </div>
  );
}
