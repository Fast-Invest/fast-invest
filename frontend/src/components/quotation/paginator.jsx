import {FaAngleDoubleLeft, FaAngleLeft,FaAngleRight,FaAngleDoubleRight } from "react-icons/fa";
import { SelectPage } from './selectWithIcon'
import { useMemo,useEffect } from "react";
import PaginatorButton from "./paginatorButton";

export default function Paginator({ quotationsPerPage, setQuotationsPerPage, page, setPage, cotacoesFiltradas, setCotacoesVisiveis })
{

    const totalPages = useMemo(() => { return Math.ceil((cotacoesFiltradas?.length || 0) / (quotationsPerPage || 1)) ;},[cotacoesFiltradas,quotationsPerPage])

    useEffect(() => {
        if (!cotacoesFiltradas || cotacoesFiltradas.length === 0) { setCotacoesVisiveis([]);return;}


        const totalPagesCalc = Math.ceil(cotacoesFiltradas.length / quotationsPerPage);
        const currentPage = Math.min(Math.max(1, page), totalPagesCalc); // garante página válida


        const start = (currentPage - 1) * quotationsPerPage;
        const end = start + quotationsPerPage;
        setCotacoesVisiveis(cotacoesFiltradas.slice(start, end));


    }, [cotacoesFiltradas, page, quotationsPerPage]);

    const handleFirst = () => setPage(1);
    const handlePrev = () => setPage((prev) => Math.max(1, prev - 1));
    const handleNext = () => setPage((prev) => Math.min(totalPages, prev + 1));
    const handleLast = () => setPage(totalPages);

    const visiblePages = useMemo(() => {
        const range = 1; // quantas páginas antes/depois exibir
        const start = Math.max(1, page - range);
        const end = Math.min(totalPages, page + range);
        const pages = [];

        for (let i = start; i <= end; i++) pages.push(i);
        return pages;
    }, [page, totalPages]);

    return(    
    <div className="flex flex-col md:flex-row items-center justify-between gap-4 mt-6 text-sm text-white/70 w-full">


        {/* Seletor de quantidade por página */}
        <div className="flex items-center gap-2 w-full md:w-auto">
            <span>Mostrar:</span>
            <SelectPage setQuotationsPerPage={(value)=>{setQuotationsPerPage(value);setPage(1)}} className="flex-1 md:w-40">
                <option value={10}>10 por página</option>
                <option value={20}>20 por página</option>
                <option value={50}>50 por página</option>
                <option value={100}>100 por página</option>
            </SelectPage>
        </div>




        <div className="flex items-center gap-2 flex-wrap justify-center">

            {/* Botões de voltar */}

            <PaginatorButton handler={handleFirst} condition={page === 1}>
                <FaAngleDoubleLeft size={18} />
            </PaginatorButton>

            <PaginatorButton handler={handlePrev} condition={page === 1}>
                <FaAngleLeft size={18} /> 
                Anterior
            </PaginatorButton>


            {/* Números dinâmicos (mantive seu design de botão) */}

            {visiblePages.map((p) => (
                <button
                    key={p}
                    onClick={() => setPage(p)}
                    className={
                                `cursor-pointer min-h-[2.75rem] aspect-square hover:bg-primary-dark
                                font-bold flex items-center justify-center rounded-xl bg-primary
                                transition-all duration-300 transform hover:scale-105 active:outline-none active:ring-3 active:ring-primary/50
                                text-black shadow-[0_0_0_1.5px_#2b2c37,0_0_25px_-17px_#000] 
                                ${p === page ? "bg-primary-dark" : " hover:text-[#ffffff]"}`
                            }
                >
                    {p}
                </button>
            ))}


            {/* Botões de avançar */}


            <PaginatorButton handler={handleNext} condition={page===totalPages}>
                Próximo <FaAngleRight size={18} />
            </PaginatorButton>

            <PaginatorButton handler={handleLast} condition={page === totalPages}>
                <FaAngleDoubleRight size={18} />
            </PaginatorButton>

        </div>

        <div className="text-center md:text-right w-full md:w-auto">
            Página {page} de {totalPages}
        </div>

        </div>
        );
}