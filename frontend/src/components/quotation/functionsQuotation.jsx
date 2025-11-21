import { useNavigate } from "react-router-dom";
import { FaChevronDown } from "react-icons/fa";
import { useState, useCallback, useMemo } from "react";
import debounce from "lodash.debounce";

export function ViewButton({ children, mode, setViewMode, modoAtual }) {
  return (
    <button
      onClick={() => setViewMode(mode)}
      className={`min-h-[2.75rem] aspect-square cursor-pointer flex items-center border-2 justify-center rounded-xl ${
        modoAtual === mode
          ? "text-[#00ff9c]"
          : "text-white/20 hover:text-[#00ff9c]"
      }`}
    >
      {children}
    </button>
  );
}

export function SelectOptions({ field, allQuotations }) {
  const options = useMemo(() => {
    return [...new Set(allQuotations.map((cotacao) => cotacao[field]))]
      .filter(Boolean)
      .sort();
  }, [allQuotations, field]);

  return options.map((option, idx) => (
    <option key={idx} value={option}>
      {option}
    </option>
  ));
}

export function SelectWithIcon({
  children,
  field,
  setCotacoes,
  allQuotations,
  filterTipo,
  filterSetor,
  setFilter,
}) {
  const handleChange = useCallback(
    (valor) => {
      setFilter(valor);

      let filtradas = allQuotations;

      const tipoAtual = field === "tipo" ? valor : filterTipo;
      const setorAtual = field === "setor" ? valor : filterSetor;

      if (tipoAtual) {
        filtradas = filtradas.filter((cotacao) => cotacao.tipo === tipoAtual);
      }

      if (setorAtual) {
        filtradas = filtradas.filter((cotacao) => cotacao.setor === setorAtual);
      }

      setCotacoes(filtradas);
    },
    [allQuotations, field, filterTipo, filterSetor, setCotacoes, setFilter]
  );

  return (
    <div className="relative flex-1">
      <select
        className="select-scrollbar w-full min-h-[2.75rem] font-bold pl-4 pr-10 rounded-xl outline-none border-0 cursor-pointer
        shadow-[0_0_0_1.5px_#2b2c37,0_0_25px_-17px_#000] transition-all duration-200
        focus:shadow-[0_0_0_2.5px_#2f303d] appearance-none bg-bg text-white"
        onChange={(e) => {
          handleChange(e.target.value);
        }}
      >
        {children}
      </select>
      <FaChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 text-white/60 pointer-events-none" />
    </div>
  );
}

export function SelectPage({ children, onPageSizeChange, pageSize }) {
  return (
    <div className="relative flex-1">
      <select
        className="select-scrollbar w-full min-h-[2.75rem] font-bold pl-4 pr-10 rounded-xl outline-none border-0 cursor-pointer
                shadow-[0_0_0_1.5px_#2b2c37,0_0_25px_-17px_#000] transition-all duration-200
                focus:shadow-[0_0_0_2.5px_#2f303d] appearance-none bg-bg text-white"
        onChange={(e) => onPageSizeChange(Number(e.target.value))}
        value={pageSize}
      >
        {children}
      </select>
      <FaChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 text-white/60 pointer-events-none" />
    </div>
  );
}

export function QuotationViewer({ cotacoes, viewMode }) {
  const navigate = useNavigate();

  return (
    <div className="w-full overflow-x-auto pt-4">
      {viewMode === "list" ? (
        <table className="min-w-full text-sm text-left">
          <thead className="text-white/70 border-b border-white/10">
            <tr>
              <th className="px-4 py-3">Logo</th>
              <th className="px-4 py-3">Ticker</th>
              <th className="px-4 py-3">Nome</th>
              <th className="px-4 py-3">Último Preço</th>
              <th className="px-4 py-3">% Variação</th>
              <th className="px-4 py-3">Setor</th>
              <th className="px-4 py-3">Tipo</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/5">
            {cotacoes.map((cotacao, idx) => (
              <tr
                key={idx}
                className="hover:bg-white/5 transition-colors cursor-pointer"
                onClick={() => navigate(`/cotacoes/${cotacao.ticker}`)}
              >
                <td className="px-4 py-3">
                  <img
                    src={`${cotacao.logo}`}
                    alt={cotacao.ticker}
                    className="w-6 h-6 rounded-full"
                    loading="lazy"
                  />
                </td>
                <td className="px-4 py-3 font-semibold">{cotacao.ticker}</td>
                <td className="px-4 py-3">{cotacao.nome}</td>
                <td className="px-4 py-3">R${cotacao.preco}</td>
                <td
                  className={`px-4 py-3 font-medium ${
                    cotacao.variacao >= 0 ? "text-[#00ff9c]" : "text-red-500"
                  }`}
                >
                  {cotacao.variacao.toFixed(2)}%
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
          {cotacoes.map((cotacao, idx) => (
            <div
              key={idx}
              className="p-6 rounded-2xl border border-primary/50 shadow-lg shadow-primary/30 hover:shadow-primary/70 hover:-translate-y-2 transition-all duration-300 text-left cursor-pointer"
              onClick={() => navigate(`/cotacoes/${cotacao.ticker}`)}
            >
              <img
                src={`${cotacao.logo}`}
                alt={cotacao.ticker}
                className="w-12 h-12 rounded-full mb-3"
                loading="lazy"
              />
              <h3 className="text-white font-bold text-lg mb-1">
                {cotacao.ticker}
              </h3>
              <p className="text-gray-300 text-sm mb-1">{cotacao.nome}</p>
              <p className="text-white font-semibold mb-1">R${cotacao.preco}</p>
              <p
                className={`font-medium ${
                  cotacao.variacao > 0 ? "text-[#00ff9c]" : "text-red-500"
                }`}
              >
                {cotacao.variacao}%
              </p>
              <p className="text-gray-400 text-xs mt-1">{cotacao.setor}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export function SearchInput({
  allQuotations,
  setCotacoes,
  tipoAtual,
  setorAtual,
}) {
  const [ticker, setTicker] = useState("");

  const pesquisar_nome = useCallback(
    debounce((ticker) => {
      try {
        const ticker_pesquisado = ticker.trim().toUpperCase();
        let filtradas = allQuotations;
        if (tipoAtual) {
          filtradas = filtradas.filter((cotacao) => cotacao.tipo === tipoAtual);
        }

        if (setorAtual) {
          filtradas = filtradas.filter(
            (cotacao) => cotacao.setor === setorAtual
          );
        }

        if (ticker_pesquisado === "") {
          setCotacoes(filtradas);
          return;
        }
        const filtered_cotacoes = filtradas.filter((cotacao) =>
          cotacao.ticker.startsWith(ticker_pesquisado)
        );
        setCotacoes(filtered_cotacoes);
      } catch (error) {
        console.log("Erro ao pesquisar cotações:", error);
      }
    }, 300),
    [allQuotations, setCotacoes, tipoAtual, setorAtual]
  );

  return (
    <div className="relative flex-1">
      <svg
        viewBox="0 0 24 24"
        aria-hidden="true"
        className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 fill-[#bdbecb] pointer-events-none z-10"
      >
        <path d="M21.53 20.47l-3.66-3.66C19.195 15.24 20 13.214 20 11c0-4.97-4.03-9-9-9s-9 4.03-9 9 4.03 9 9 9c2.215 0 4.24-.804 5.808-2.13l3.66 3.66c.147.146.34.22.53.22s.385-.073.53-.22c.295-.293.295-.767.002-1.06zM3.5 11c0-4.135 3.365-7.5 7.5-7.5s7.5 3.365 7.5 7.5-3.365 7.5-7.5 7.5-7.5-3.365-7.5-7.5z" />
      </svg>

      <input
        type="search"
        placeholder="Buscar por ticker (ex: PETR4, ITU4)..."
        className="w-full min-h-[2.75rem] font-bold pl-10 rounded-xl outline-none border-0 cursor-text 
        shadow-[0_0_0_1.5px_#2b2c37,0_0_25px_-17px_#000] transition-all duration-200
        focus:shadow-[0_0_0_2.5px_#2f303d] placeholder:font-normal bg-transparent"
        value={ticker}
        onChange={(e) => {
          setTicker(e.target.value);
          pesquisar_nome(e.target.value);
        }}
      />
    </div>
  );
}
