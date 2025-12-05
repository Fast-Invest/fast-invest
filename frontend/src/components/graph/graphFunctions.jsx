import { FaSearchDollar } from "react-icons/fa";

export function TickerSearcher({
  setSearchInput1,
  setSearchInput2,
  searchInput1,
  searchInput2,
  cotacoes,
  setInputedSymbols2,
  setInputedSymbols1,
}) {
  return (
    <div className="flex justify-center flex-col">
      <h2 className="text-4xl font-bold text-text mb-8 text-center">
        Procure a <span className="text-primary">cotação</span> que deseja
        visualizar!
      </h2>

      <div className="grid grid-cols-2">
        <div className="flex flex-row items-center justify-center">
          <div className="relative flex  items-center max-w-max">
            <FaSearchDollar className="absolute left-4 text-text-muted" />
            <input
              list="cotacoes1"
              placeholder="Ex: PETR4"
              value={searchInput1}
              onChange={(e) => setSearchInput1(e.target.value)}
              className="w-full bg-bg p-4 pl-12 rounded-lg border-2 border-gray text-text focus:border-primary
                            focus:outline-none transition-colors duration-300"
            />
          </div>
          <datalist id="cotacoes1">
            {cotacoes
              .filter((cotacao) =>
                cotacao.ticker
                  .toLowerCase()
                  .startsWith(searchInput1.toLowerCase())
              )
              .slice(0, 10)
              .map((cotacao, index) => (
                <option value={cotacao.ticker} key={index}>
                  {cotacao.nome}
                </option>
              ))}
          </datalist>
          <button
            onClick={() => setInputedSymbols1(searchInput1)}
            className="cursor-pointer rounded-2xl px-8 py-2 bg-primary  text-black text-lg font-bold shadow-md shadow-primary-dark/50
                        hover:scale-105 active:scale-95 transition-all duration-300 ease-out ml-12"
          >
            Adicionar Cotação
          </button>
        </div>

        <div className="flex flex-row items-center justify-center">
          <div className="relative flex items-center max-w-max">
            <FaSearchDollar className="absolute left-4 text-text-muted" />
            <input
              list="cotacoes2"
              placeholder="Ex: ABEV3"
              value={searchInput2}
              onChange={(e) => setSearchInput2(e.target.value)}
              className="w-full bg-bg p-4 pl-12 rounded-lg border-2 border-gray text-text focus:border-primary
                            focus:outline-none transition-colors duration-300"
            />
          </div>
          <datalist id="cotacoes2">
            {cotacoes
              .filter((cotacao) =>
                cotacao.ticker
                  .toLowerCase()
                  .startsWith(searchInput2.toLowerCase())
              )
              .slice(0, 10)
              .map((cotacao, index) => (
                <option value={cotacao.ticker} key={index}>
                  {cotacao.nome}
                </option>
              ))}
          </datalist>
          <button
            onClick={() => setInputedSymbols2(searchInput2)}
            className="cursor-pointer rounded-2xl px-8 py-2 bg-primary  text-black text-lg font-bold shadow-md shadow-primary-dark/50
                        hover:scale-105 active:scale-95 transition-all duration-300 ease-out ml-12"
          >
            Adicionar Cotação
          </button>
        </div>
      </div>
    </div>
  );
}
