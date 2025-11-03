import SearchInput from "./searchInput.jsx";
import Paginator from "./paginator.jsx";
import SelectWithIcon from "./selectWithIcon.jsx";
import SelectOptions from "./selectOptions.jsx";
import QuotationViewer from "./quotationViewer.jsx";
import ViewButton from "./viewButton.jsx";
import { FaThList, FaThLarge } from "react-icons/fa";
import { useState, useEffect, useCallback } from "react";
import quotationService from "../../services/quotationService.jsx"

export default function ContentQuotation() {
  const [viewMode, setViewMode] = useState("list"); // lista como padrão
  const [allQuotations, setAllQuotations] = useState([]);
  const [cotacoesFiltradas, setCotacoesFiltradas] = useState([]);
  const [cotacoesVisiveis, setCotacoesVisiveis] = useState([]);
  const [filterTipo, setFilterTipo] = useState("");
  const [filterSetor, setFilterSetor] = useState("");
  const [quotationsPerPage, setQuotationsPerPage] = useState(10);
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
          <ViewButton mode="list" setViewMode={setViewMode} viewMode={viewMode}>
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

      {/* Conteúdo das ações */}
      <QuotationViewer cotacoes={cotacoesVisiveis} viewMode={viewMode} />

      {/* Paginação */}
      <Paginator
        quotationsPerPage={quotationsPerPage}
        setQuotationsPerPage={setQuotationsPerPage}
        page={page}
        setPage={setPage}
        cotacoesFiltradas={cotacoesFiltradas}
        setCotacoesVisiveis={setCotacoesVisiveis}
      />
    </main>
  );
}
