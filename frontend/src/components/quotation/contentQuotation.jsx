import SearchInput from "./searchInput.jsx";
import {
  FaThList,
  FaThLarge,
  FaAngleDoubleLeft,
  FaAngleLeft,
  FaAngleRight,
  FaAngleDoubleRight,
  FaChevronDown,
} from "react-icons/fa";
import { useState,useEffect } from "react";
import { buscar_cotacoes } from "../../services/api.jsx";

function SelectWithIcon({ children }) {
  return (
    <div className="relative flex-1">
      <select
        className="w-full min-h-[2.75rem] font-bold pl-4 pr-10 rounded-xl outline-none border-0 cursor-pointer
        shadow-[0_0_0_1.5px_#2b2c37,0_0_25px_-17px_#000] transition-all duration-200
        focus:shadow-[0_0_0_2.5px_#2f303d] appearance-none bg-transparent"
      >
        {children}
      </select>
      <FaChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 text-white/60 pointer-events-none" />
    </div>
  );
}

export default function ContentQuotation() {
  const [viewMode, setViewMode] = useState("list"); // lista como padrão
  const [cotacoes,setAcoes] = useState([])

  useEffect( 
    async () => {
                    const resposta = await buscar_cotacoes()
                    const status=resposta.status
                    /*TODO: Adicionar toast caso status===400*/
                    setAcoes(resposta.cotacoes) 

		        }, 
        []
	)


  return (
    <main className="p-6 text-white overflow-auto">
      {/* Título */}
      <div className="text-center m-10">
        <h1 className="text-3xl md:text-5xl font-bold">
          Todo o{" "}
          <span className="bg-gradient-to-r from-primary via-green-500 to-blue-300 bg-clip-text text-transparent animate-gradient">
            mercado brasileiro
          </span>{" "}
          <br className="hidden md:block" />
          na palma da sua mão
        </h1>
      </div>

      {/* Barra de filtros */}
      <div className="flex flex-col md:flex-row gap-4 w-full mb-6">
        <SearchInput />
        <SelectWithIcon>
          <option>Todos os tipos</option>
        </SelectWithIcon>
        <SelectWithIcon>
          <option>Todos os setores</option>
        </SelectWithIcon>

        {/* Botões de view */}
        <div className="flex items-center gap-2 shrink-0">
          <button
            onClick={() => setViewMode("list")}
            className={`min-h-[2.75rem] aspect-square flex items-center justify-center rounded-xl ${
              viewMode === "list"
                ? "text-[#00ff9c]"
                : "text-white/70 hover:text-[#00ff9c]"
            }`}
          >
            <FaThList size={18} />
          </button>
          <button
            onClick={() => setViewMode("grid")}
            className={`min-h-[2.75rem] aspect-square flex items-center justify-center rounded-xl ${
              viewMode === "grid"
                ? "text-[#00ff9c]"
                : "text-white/70 hover:text-[#00ff9c]"
            }`}
          >
            <FaThLarge size={18} />
          </button>
        </div>
      </div>

      {/* Conteúdo das ações */}
      <div className="w-full overflow-x-auto">
        {viewMode === "list" ? (
          <table className="min-w-full text-sm text-left">
            <thead className="text-white/70 border-b border-white/10">
              <tr>
                <th className="px-4 py-3">Logo</th>
                <th className="px-4 py-3">Ticker</th>
                <th className="px-4 py-3">Nome</th>
                <th className="px-4 py-3">Preço</th>
                <th className="px-4 py-3">% Variação</th>
                <th className="px-4 py-3">Setor</th>
                <th className="px-4 py-3">Tipo</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {cotacoes.map((cotacao, idx) => (
                <tr key={idx} className="hover:bg-white/5 transition-colors">
                  <td className="px-4 py-3">
                    <img
                      src={`${cotacao.logo}`}
                      alt={cotacao.ticker}
                      className="w-6 h-6 rounded-full"
                    />
                  </td>
                  <td className="px-4 py-3 font-semibold">{cotacao.ticker}</td>
                  <td className="px-4 py-3">{cotacao.nome}</td>
                  <td className="px-4 py-3">{cotacao.preco}</td>
                  <td
                    className={`px-4 py-3 font-medium ${
                      cotacao.variacao>=0 ? "text-[#00ff9c]" : "text-red-500"
                    }`}
                  >
                    {cotacao.variacao}
                  </td>
                  <td className="px-4 py-3 text-white/70">{cotacao.setor}</td>
                  <td>
                    <span className="bg-[#00ff9c]/10 text-[#00ff9c] text-xs px-2 py-1 rounded-full font-semibold">
                      {cotacao.tipo}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
            {acoes.map((acao, idx) => (
              <div
                key={idx}
                className="p-6 rounded-2xl border border-primary/50 shadow-lg shadow-primary/30 hover:shadow-primary/70 hover:-translate-y-2 transition-all duration-300 text-left"
              >
                <img
                  src={`https://logo.clearbit.com/${acao.logo}`}
                  alt={acao.ticker}
                  className="w-12 h-12 rounded-full mb-3"
                />
                <h3 className="text-white font-bold text-lg mb-1">
                  {acao.ticker}
                </h3>
                <p className="text-gray-300 text-sm mb-1">{acao.nome}</p>
                <p className="text-white font-semibold mb-1">{acao.preco}</p>
                <p
                  className={`font-medium ${
                    acao.positivo ? "text-[#00ff9c]" : "text-red-500"
                  }`}
                >
                  {acao.variacao}
                </p>
                <p className="text-gray-400 text-xs mt-1">{acao.setor}</p>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Paginação */}
      <div className="flex flex-col md:flex-row items-center justify-between gap-4 mt-6 text-sm text-white/70 w-full">
        <div className="flex items-center gap-2 w-full md:w-auto">
          <span>Mostrar:</span>
          <SelectWithIcon className="flex-1 md:w-40">
            <option>10 por página</option>
            <option>20 por página</option>
            <option>50 por página</option>
            <option>100 por página</option>
          </SelectWithIcon>
        </div>

        <div className="flex items-center gap-2 flex-wrap justify-center">
          <button className="min-h-[2.75rem] aspect-square font-bold flex items-center justify-center rounded-xl shadow-[0_0_0_1.5px_#2b2c37,0_0_25px_-17px_#000] focus:shadow-[0_0_0_2.5px_#2f303d]">
            <FaAngleDoubleLeft size={18} />
          </button>
          <button className="min-h-[2.75rem] px-4 font-bold flex items-center justify-center gap-2 rounded-xl shadow-[0_0_0_1.5px_#2b2c37,0_0_25px_-17px_#000] focus:shadow-[0_0_0_2.5px_#2f303d]">
            <FaAngleLeft size={18} /> Anterior
          </button>
          <button className="min-h-[2.75rem] aspect-square font-bold flex items-center justify-center rounded-xl bg-[#00ff9c] text-black shadow-[0_0_0_1.5px_#2b2c37,0_0_25px_-17px_#000]">
            1
          </button>
          <button className="min-h-[2.75rem] aspect-square font-bold flex items-center justify-center rounded-xl shadow-[0_0_0_1.5px_#2b2c37,0_0_25px_-17px_#000]">
            2
          </button>
          <button className="min-h-[2.75rem] aspect-square font-bold flex items-center justify-center rounded-xl shadow-[0_0_0_1.5px_#2b2c37,0_0_25px_-17px_#000]">
            3
          </button>
          <button className="min-h-[2.75rem] px-4 font-bold flex items-center justify-center gap-2 rounded-xl shadow-[0_0_0_1.5px_#2b2c37,0_0_25px_-17px_#000]">
            Próximo <FaAngleRight size={18} />
          </button>
          <button className="min-h-[2.75rem] aspect-square font-bold flex items-center justify-center rounded-xl shadow-[0_0_0_1.5px_#2b2c37,0_0_25px_-17px_#000]">
            <FaAngleDoubleRight size={18} />
          </button>
        </div>

        <div className="text-center md:text-right w-full md:w-auto">
          Página 1 de 10
        </div>
      </div>
    </main>
  );
}
