import {
  FaAngleDoubleLeft,
  FaAngleDoubleRight,
  FaAngleRight,
  FaAngleLeft,
  FaThList,
  FaThLarge,
} from "react-icons/fa";
import { useState, useEffect, useCallback } from "react";
import quotationService from "../../services/quotationService.jsx";
import {
  ViewButton,
  SelectOptions,
  SelectWithIcon,
  SelectPage,
  QuotationViewer,
  SearchInput,
} from "./functionsQuotation.jsx";

export default function ContentQuotation() {
  const [viewMode, setViewMode] = useState("list");
  const [allQuotations, setAllQuotations] = useState([]);
  const [cotacoesFiltradas, setCotacoesFiltradas] = useState([]);
  const [filterTipo, setFilterTipo] = useState("");
  const [filterSetor, setFilterSetor] = useState("");

  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);

  const handleTipoChange = useCallback((novoTipo) => {
    setFilterTipo(novoTipo);
    setPage(1);
  }, []);

  const handleSetorChange = useCallback((novoSetor) => {
    setFilterSetor(novoSetor);
    setPage(1);
  }, []);

  const handlePageSizeChange = useCallback((newSize) => {
    setPageSize(newSize);
    setPage(1);
  }, []);

  useEffect(() => {
    if (allQuotations.length > 0) return;
    (async () => {
      const resposta = await quotationService.buscar_cotacoes();
      setCotacoesFiltradas(resposta.cotacoes);
      setAllQuotations(resposta.cotacoes);
    })();
  }, [allQuotations.length]);

  const totalItems = cotacoesFiltradas.length;
  const totalPages = Math.ceil(totalItems / pageSize);

  useEffect(() => {
    if (page > totalPages && totalPages > 0) {
      setPage(totalPages);
    } else if (page < 1 && totalPages > 0) {
      setPage(1);
    }
  }, [page, totalPages]);

  const startIndex = (page - 1) * pageSize;
  const endIndex = startIndex + pageSize;
  const currentQuotations = cotacoesFiltradas.slice(startIndex, endIndex);

  const getPageNumbers = () => {
    const maxPagesToShow = 5;
    const pages = [];

    let startPage = Math.max(1, page - Math.floor(maxPagesToShow / 2));
    let endPage = Math.min(totalPages, startPage + maxPagesToShow - 1);

    if (endPage - startPage + 1 < maxPagesToShow) {
      startPage = Math.max(1, endPage - maxPagesToShow + 1);
    }

    for (let i = startPage; i <= endPage; i++) {
      pages.push(i);
    }
    return pages;
  };

  const pageNumbers = getPageNumbers();

  const PaginationControls = () => (
    <div className="flex flex-col md:flex-row items-center justify-between gap-4 mt-6 text-sm text-white/70 w-full">
      <div className="flex items-center gap-2 w-full md:w-auto">
        <span>Mostrar:</span>
        <SelectPage
          onPageSizeChange={handlePageSizeChange}
          pageSize={pageSize}
          className="flex-1 md:w-40"
        >
          <option value={10}>10 por página</option>
          <option value={20}>20 por página</option>
          <option value={50}>50 por página</option>
          <option value={100}>100 por página</option>
        </SelectPage>
      </div>

      <div className="flex items-center gap-2 flex-wrap justify-center">
        <button
          onClick={() => setPage(1)}
          disabled={page === 1}
          className={`min-h-[2.75rem] px-4 font-bold border-2 flex items-center justify-center gap-2 rounded-xl transition-colors ${
            page === 1
              ? "text-white/30 cursor-not-allowed"
              : "hover:text-primary cursor-pointer"
          }`}
        >
          <FaAngleDoubleLeft size={18} />
        </button>

        <button
          onClick={() => setPage(page - 1)}
          disabled={page === 1}
          className={`min-h-[2.75rem] px-4 font-bold border-2 flex items-center justify-center gap-2 rounded-xl transition-colors ${
            page === 1
              ? "text-white/30 cursor-not-allowed"
              : "hover:text-primary cursor-pointer"
          }`}
        >
          <FaAngleLeft size={18} /> Anterior
        </button>

        {pageNumbers.map((p) => (
          <button
            key={p}
            onClick={() => setPage(p)}
            className={`cursor-pointer min-h-[2.75rem] aspect-square font-bold flex items-center justify-center rounded-xl transition-all duration-300 transform active:outline-none active:ring-3 active:ring-primary/50 border-2 ${
              p === page
                ? "bg-primary hover:bg-primary-dark scale-105 text-black border-primary"
                : "bg-transparent text-white/70 border-white/70 hover:bg-white/10"
            }`}
          >
            {p}
          </button>
        ))}

        <button
          onClick={() => setPage(page + 1)}
          disabled={page === totalPages || totalPages === 0}
          className={`min-h-[2.75rem] px-4 font-bold border-2 flex items-center justify-center gap-2 rounded-xl transition-colors ${
            page === totalPages || totalPages === 0
              ? "text-white/30 cursor-not-allowed"
              : "hover:text-primary cursor-pointer"
          }`}
        >
          Próximo <FaAngleRight size={18} />
        </button>

        <button
          onClick={() => setPage(totalPages)}
          disabled={page === totalPages || totalPages === 0}
          className={`min-h-[2.75rem] px-4 font-bold border-2 flex items-center justify-center gap-2 rounded-xl transition-colors ${
            page === totalPages || totalPages === 0
              ? "text-white/30 cursor-not-allowed"
              : "hover:text-primary cursor-pointer"
          }`}
        >
          <FaAngleDoubleRight size={18} />
        </button>
      </div>

      <div className="text-center md:text-right font-bold w-full md:w-auto">
        Página {page} de {totalPages}
      </div>
    </div>
  );

  return (
    <main className="p-6 text-white overflow-auto">
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

        <div className="flex items-center gap-2 shrink-0">
          <ViewButton
            mode="list"
            setViewMode={setViewMode}
            modoAtual={viewMode}
          >
            <FaThList size={18} />
          </ViewButton>

          <ViewButton
            mode="grid"
            setViewMode={setViewMode}
            modoAtual={viewMode}
          >
            <FaThLarge size={18} />
          </ViewButton>
        </div>
      </div>

      <QuotationViewer cotacoes={currentQuotations} viewMode={viewMode} />

      {totalPages > 1 && <PaginationControls />}

      {totalItems === 0 && (
        <div className="text-center text-2xl text-white/50 py-10">
          Nenhuma cotação encontrada.
        </div>
      )}
    </main>
  );
}
