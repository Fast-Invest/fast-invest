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
import { useState } from "react";

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
  const [viewMode, setViewMode] = useState("list");

  return (
    <main className="p-6 text-white overflow-auto">
      <div className="text-center m-10">
        <h1 className="text-3xl md:text-5xl font-bold">
          Todo o{" "}
          <span
            className="bg-gradient-to-r from-primary via-green-500 to-blue-300
            bg-clip-text text-transparent animate-gradient"
          >
            mercado brasileiro
          </span>{" "}
          <br className="hidden md:block" />
          na palma da sua mão
        </h1>
      </div>

      <br />

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
            className={`min-h-[2.75rem] aspect-square flex items-center justify-center rounded-xl 
            outline-none border-0 shadow-[0_0_0_1.5px_#2b2c37,0_0_25px_-17px_#000]
            transition-all duration-200 focus:shadow-[0_0_0_2.5px_#2f303d] ${
              viewMode === "list"
                ? "text-[#00ff9c]"
                : "text-white/70 hover:text-[#00ff9c]"
            }`}
          >
            <FaThList size={18} />
          </button>
          <button
            onClick={() => setViewMode("grid")}
            className={`min-h-[2.75rem] aspect-square flex items-center justify-center rounded-xl 
            outline-none border-0 shadow-[0_0_0_1.5px_#2b2c37,0_0_25px_-17px_#000]
            transition-all duration-200 focus:shadow-[0_0_0_2.5px_#2f303d] ${
              viewMode === "grid"
                ? "text-[#00ff9c]"
                : "text-white/70 hover:text-[#00ff9c]"
            }`}
          >
            <FaThLarge size={18} />
          </button>
        </div>
      </div>

      {/* Tabela */}
      <div className="w-full overflow-x-auto">
        <table className="min-w-full text-sm text-left">
          <thead className="text-white/70 border-b border-white/10">
            <tr>
              <th className="px-4 py-3">Logo</th>
              <th className="px-4 py-3">Ticker</th>
              <th className="px-4 py-3">Nome</th>
              <th className="px-4 py-3">Preço</th>
              <th className="px-4 py-3">% Variação</th>
              <th className="px-4 py-3">Volume</th>
              <th className="px-4 py-3">Setor</th>
              <th className="px-4 py-3">Tipo</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/5">
            {[
              {
                logo: "petrobras.com.br",
                ticker: "PETR4",
                nome: "Petrobras",
                preco: "R$ 34,12",
                variacao: "+1.45%",
                volume: "2.3M",
                setor: "Petróleo",
                tipo: "Ação",
                positivo: true,
              },
              {
                logo: "vale.com",
                ticker: "VALE3",
                nome: "Vale",
                preco: "R$ 67,80",
                variacao: "-0.82%",
                volume: "4.1M",
                setor: "Mineração",
                tipo: "Ação",
                positivo: false,
              },
              {
                logo: "itau.com.br",
                ticker: "ITUB4",
                nome: "Itaú Unibanco",
                preco: "R$ 29,45",
                variacao: "+0.66%",
                volume: "3.7M",
                setor: "Financeiro",
                tipo: "Ação",
                positivo: true,
              },
              {
                logo: "ambev.com.br",
                ticker: "ABEV3",
                nome: "Ambev",
                preco: "R$ 14,73",
                variacao: "+0.23%",
                volume: "5.2M",
                setor: "Bebidas",
                tipo: "Ação",
                positivo: true,
              },
              {
                logo: "bradesco.com.br",
                ticker: "BBDC4",
                nome: "Bradesco",
                preco: "R$ 23,98",
                variacao: "-1.09%",
                volume: "2.1M",
                setor: "Financeiro",
                tipo: "Ação",
                positivo: false,
              },
              {
                logo: "magazineluiza.com.br",
                ticker: "MGLU3",
                nome: "Magazine Luiza",
                preco: "R$ 3,45",
                variacao: "+2.34%",
                volume: "7.1M",
                setor: "Varejo",
                tipo: "Ação",
                positivo: true,
              },
              {
                logo: "weg.net",
                ticker: "WEGE3",
                nome: "WEG",
                preco: "R$ 41,00",
                variacao: "+0.90%",
                volume: "1.5M",
                setor: "Industrial",
                tipo: "Ação",
                positivo: true,
              },
              {
                logo: "suzano.com.br",
                ticker: "SUZB3",
                nome: "Suzano",
                preco: "R$ 52,35",
                variacao: "-0.12%",
                volume: "880k",
                setor: "Celulose",
                tipo: "Ação",
                positivo: false,
              },
              {
                logo: "b3.com.br",
                ticker: "B3SA3",
                nome: "B3",
                preco: "R$ 12,87",
                variacao: "+1.10%",
                volume: "4.8M",
                setor: "Financeiro",
                tipo: "Ação",
                positivo: true,
              },
              {
                logo: "bb.com.br",
                ticker: "BBAS3",
                nome: "Banco do Brasil",
                preco: "R$ 50,22",
                variacao: "-0.34%",
                volume: "3.2M",
                setor: "Financeiro",
                tipo: "Ação",
                positivo: false,
              },
              {
                logo: "renner.com.br",
                ticker: "LREN3",
                nome: "Lojas Renner",
                preco: "R$ 16,77",
                variacao: "+0.75%",
                volume: "2.5M",
                setor: "Varejo",
                tipo: "Ação",
                positivo: true,
              },
              {
                logo: "localiza.com",
                ticker: "RENT3",
                nome: "Localiza",
                preco: "R$ 58,12",
                variacao: "-0.18%",
                volume: "1.4M",
                setor: "Transporte",
                tipo: "Ação",
                positivo: false,
              },
            ].map((acao, idx) => (
              <tr key={idx} className="hover:bg-white/5 transition-colors">
                <td className="px-4 py-3">
                  <img
                    src={`https://logo.clearbit.com/${acao.logo}`}
                    alt={acao.ticker}
                    className="w-6 h-6 rounded-full"
                  />
                </td>
                <td className="px-4 py-3 font-semibold">{acao.ticker}</td>
                <td className="px-4 py-3">{acao.nome}</td>
                <td className="px-4 py-3">{acao.preco}</td>
                <td
                  className={`px-4 py-3 font-medium ${
                    acao.positivo ? "text-[#00ff9c]" : "text-red-500"
                  }`}
                >
                  {acao.variacao}
                </td>
                <td className="px-4 py-3">{acao.volume}</td>
                <td className="px-4 py-3 text-white/70">{acao.setor}</td>
                <td>
                  <span className="bg-[#00ff9c]/10 text-[#00ff9c] text-xs px-2 py-1 rounded-full font-semibold">
                    {acao.tipo}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="flex flex-col md:flex-row items-center justify-between gap-4 mt-6 text-sm text-white/70 w-full">
        {/* Select de itens por página */}
        <div className="flex items-center gap-2 w-full md:w-auto">
          <span>Mostrar:</span>
          <SelectWithIcon className="flex-1 md:w-40">
            <option>10 por página</option>
            <option>20 por página</option>
            <option>50 por página</option>
            <option>100 por página</option>
          </SelectWithIcon>
        </div>

        {/* Botões de paginação */}
        <div className="flex items-center gap-2 flex-wrap justify-center">
          <button
            className="min-h-[2.75rem] aspect-square font-bold flex items-center justify-center rounded-xl 
          outline-none border-0 cursor-pointer shadow-[0_0_0_1.5px_#2b2c37,0_0_25px_-17px_#000] 
          transition-all duration-200 focus:shadow-[0_0_0_2.5px_#2f303d]"
          >
            <FaAngleDoubleLeft size={18} />
          </button>

          <button
            className="min-h-[2.75rem] px-4 font-bold flex items-center justify-center gap-2 rounded-xl 
          outline-none border-0 cursor-pointer shadow-[0_0_0_1.5px_#2b2c37,0_0_25px_-17px_#000] 
          transition-all duration-200 focus:shadow-[0_0_0_2.5px_#2f303d]"
          >
            <FaAngleLeft size={18} /> Anterior
          </button>

          <button
            className="min-h-[2.75rem] aspect-square font-bold flex items-center justify-center rounded-xl 
          outline-none border-0 cursor-pointer shadow-[0_0_0_1.5px_#2b2c37,0_0_25px_-17px_#000] 
          transition-all duration-200 focus:shadow-[0_0_0_2.5px_#2f303d] bg-[#00ff9c] text-black"
          >
            1
          </button>

          <button
            className="min-h-[2.75rem] aspect-square font-bold flex items-center justify-center rounded-xl 
          outline-none border-0 cursor-pointer shadow-[0_0_0_1.5px_#2b2c37,0_0_25px_-17px_#000] 
          transition-all duration-200 focus:shadow-[0_0_0_2.5px_#2f303d]"
          >
            2
          </button>

          <button
            className="min-h-[2.75rem] aspect-square font-bold flex items-center justify-center rounded-xl 
          outline-none border-0 cursor-pointer shadow-[0_0_0_1.5px_#2b2c37,0_0_25px_-17px_#000] 
          transition-all duration-200 focus:shadow-[0_0_0_2.5px_#2f303d]"
          >
            3
          </button>

          <button
            className="min-h-[2.75rem] px-4 font-bold flex items-center justify-center gap-2 rounded-xl 
          outline-none border-0 cursor-pointer shadow-[0_0_0_1.5px_#2b2c37,0_0_25px_-17px_#000] 
          transition-all duration-200 focus:shadow-[0_0_0_2.5px_#2f303d]"
          >
            Próximo <FaAngleRight size={18} />
          </button>

          <button
            className="min-h-[2.75rem] aspect-square font-bold flex items-center justify-center rounded-xl 
          outline-none border-0 cursor-pointer shadow-[0_0_0_1.5px_#2b2c37,0_0_25px_-17px_#000] 
          transition-all duration-200 focus:shadow-[0_0_0_2.5px_#2f303d]"
          >
            <FaAngleDoubleRight size={18} />
          </button>
        </div>

        {/* Info de página */}
        <div className="text-center md:text-right w-full md:w-auto">
          Página 1 de 10
        </div>
      </div>
    </main>
  );
}
