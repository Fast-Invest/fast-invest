import SearchInput from "./searchInput.jsx";
import SelectWithIcon from "./selectWithIcon.jsx";
import { SelectPage } from "./selectWithIcon.jsx";

import SelectOptions from "./selectOptions.jsx";
import QuotationViewer from "./quotationViewer.jsx";
import { FaThList, FaThLarge,FaAngleDoubleLeft,FaAngleDoubleRight,FaAngleRight,FaAngleLeft } from "react-icons/fa";
import { useState, useEffect, useCallback } from "react";
import quotationService from "../../services/quotationService.jsx"

export default function ContentQuotation() {
  const [viewMode, setViewMode] = useState("list"); // lista como padrão
  const [allQuotations, setAllQuotations] = useState([]);
  const [cotacoesFiltradas, setCotacoesFiltradas] = useState([]);
  const [filterTipo, setFilterTipo] = useState("");
  const [filterSetor, setFilterSetor] = useState("");
  const [page, setPage] = useState(1);

  const handleTipoChange = useCallback((novoTipo) => {
    setFilterTipo(novoTipo);
    setPage(1);
  }, []);
  const handleSetorChange = useCallback((novoSetor) => {
    setFilterSetor(novoSetor);
    setPage(1);
  }, []);

  useEffect(() => {
    if (cotacoesFiltradas.length > 0) return;
    (async () => {
      const resposta = await quotationService.buscar_cotacoes(); // const status=resposta.status
      setCotacoesFiltradas(resposta.cotacoes);
      setAllQuotations(resposta.cotacoes);
    })();
  }, []);

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
        <SearchInput
          setCotacoes={setCotacoesFiltradas}
          allQuotations={allQuotations}
          tipoAtual={filterTipo}
          setorAtual={filterSetor}
        />

        <SelectWithIcon
          field="tipo"
          setCotacoes={setCotacoesFiltradas}
          allQuotations={allQuotations}
          filterTipo={filterTipo}
          filterSetor={filterSetor}
          setFilter={handleTipoChange}
        >
          <option value="">Todos os tipos</option>
          <SelectOptions field="tipo" allQuotations={allQuotations} />
        </SelectWithIcon>

        <SelectWithIcon
          field="setor"
          setCotacoes={setCotacoesFiltradas}
          allQuotations={allQuotations}
          filterTipo={filterTipo}
          filterSetor={filterSetor}
          setFilter={handleSetorChange}
        >
          <option value="">Todos os setores</option>
          <SelectOptions field="setor" allQuotations={allQuotations} />
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
      <QuotationViewer cotacoes={cotacoesFiltradas} viewMode={viewMode} />





    {/* Paginação */}
    <div className="flex flex-col md:flex-row items-center justify-between gap-4 mt-6 text-sm text-white/70 w-full">
      {/* Seletor de quantidade por página */}
      <div className="flex items-center gap-2 w-full md:w-auto">
        <span>Mostrar:</span>
        <SelectPage className="flex-1 md:w-40">
          <option value={10}>10 por página</option>
          <option value={20}>20 por página</option>
          <option value={50}>50 por página</option>
        </SelectPage>
      </div>





      <div className="flex items-center gap-2 flex-wrap justify-center">
        {/* Botões de voltar */}

        <button
          className={`min-h-[2.75rem] px-4 font-bold flex items-center justify-center gap-2 rounded-xl`} 
        >
          <FaAngleDoubleLeft size={18}/>
          
        </button>

        <button

          className={`min-h-[2.75rem] px-4 font-bold flex items-center justify-center gap-2 rounded-xl`} 
        >
          Anterior <FaAngleLeft size={18} />
        </button>


        {/* Números dinâmicos (mantive seu design de botão) */}

          <button
            onClick={() => setPage(p)}
            className='cursor-pointer min-h-[2.75rem] aspect-square hover:bg-primary-dark
                                font-bold flex items-center justify-center rounded-xl bg-primary
                                transition-all duration-300 transform hover:scale-105 active:outline-none active:ring-3 active:ring-primary/50
                                text-black shadow-[0_0_0_1.5px_#2b2c37,0_0_25px_-17px_#000] '
          >
                  1              
          </button>
          <button
            onClick={() => setPage(p)}
            className='cursor-pointer min-h-[2.75rem] aspect-square hover:bg-primary-dark
                                font-bold flex items-center justify-center rounded-xl bg-primary
                                transition-all duration-300 transform hover:scale-105 active:outline-none active:ring-3 active:ring-primary/50
                                text-black shadow-[0_0_0_1.5px_#2b2c37,0_0_25px_-17px_#000] '
          >
                  2              
          </button>
        {/* Botões de avançar */}
        <button
          className='min-h-[2.75rem] px-4 font-bold flex items-center justify-center gap-2 rounded-xl'
        >
          Próximo <FaAngleRight size={18} />
        </button>


        <button

          className='min-h-[2.75rem] px-4 font-bold flex items-center justify-center gap-2 rounded-xl'

        >
          <FaAngleDoubleRight size={18} />
        </button>

      </div>

      <div className="text-center md:text-right w-full md:w-auto">
        Página {page} de ""10""
      </div>
    </div>

    </main>
  );

}
