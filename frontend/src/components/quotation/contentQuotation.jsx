import SearchInput from "./searchInput.jsx";
import Paginator from "./paginator.jsx";
import SelectWithIcon from "./selectWithIcon.jsx";
import SelectOptions from "./selectOptions.jsx";
import QuotationViewer from "./quotationViewer.jsx";
import {FaThList,FaThLarge} from "react-icons/fa";
import { useState,useEffect } from "react";
import { buscar_cotacoes } from "../../services/api.jsx";



export default function ContentQuotation() {
    const [viewMode, setViewMode] = useState("list"); // lista como padrão
    const [allQuotations,setAllQuotations]=useState([])
    const [cotacoes,setCotacoes] = useState([])
    const [filterTipo, setFilterTipo] = useState("");
    const [filterSetor, setFilterSetor] = useState("");



    useEffect( 
        () => {
        if (cotacoes.length > 0) return;
        (async()=>{

                    const resposta = await buscar_cotacoes()
                    // const status=resposta.status
                    setCotacoes(resposta.cotacoes) 
                    setAllQuotations(resposta.cotacoes)
                    })();}, 
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

            <SearchInput setCotacoes={setCotacoes} allQuotations={allQuotations} tipoAtual={filterTipo} setorAtual={filterSetor} />

            <SelectWithIcon field="tipo" setCotacoes={setCotacoes} allQuotations={allQuotations} filterTipo={filterTipo} filterSetor={filterSetor} setFilter={setFilterTipo}>

            <option value="" >Todos os tipos</option>
            <SelectOptions field="tipo" allQuotations={allQuotations} />

            </SelectWithIcon>


            <SelectWithIcon field="setor" setCotacoes={setCotacoes} allQuotations={allQuotations} filterTipo={filterTipo} filterSetor={filterSetor} setFilter={setFilterSetor}>
            <option value="" >Todos os setores</option>
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
        <QuotationViewer cotacoes={cotacoes} viewMode={viewMode}/>

        {/* Paginação */}
        <Paginator/>
        </main>
    );
}
