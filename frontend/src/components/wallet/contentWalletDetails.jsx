import { useEffect, useState } from "react";
import {
  FaAngleDoubleLeft,
  FaAngleDoubleRight,
  FaAngleRight,
  FaAngleLeft,
} from "react-icons/fa";
import {
  WalletErrorDiv,
  WalletLoadingDiv,
  WalletQuotationDetailModal,
  WalletQuotations,
} from "./functionsWallet";
import walletService from "../../services/walletService";

export default function ContentWalletDetails({ wallet }) {
  const walletId = wallet?.id;
  const [allQuotations, setAllQuotations] = useState([]);
  const [selectedQuotation, setSelectedQuotation] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1);

  const quotationsPerPage = 10;
  const totalPages = Math.ceil(allQuotations.length / quotationsPerPage);

  useEffect(() => {
    if (page > totalPages && totalPages > 0) {
      setPage(totalPages);
    } else if (page < 1 && totalPages > 0) {
      setPage(1);
    }
  }, [page, totalPages]);

  const startIndex = (page - 1) * quotationsPerPage;
  const endIndex = startIndex + quotationsPerPage;
  const currentQuotations = allQuotations.slice(startIndex, endIndex - 1);

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
      <div></div>
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

  const formatNumber = (value, decimals = 2, placeholder = "N/A") =>
    value === null || value === undefined || Number.isNaN(value)
      ? placeholder
      : Number(value).toFixed(decimals);
  useEffect(() => {
    const getFilteredQuotations = async (walletId) => {
      try {
        setLoading(true);
        setError(null);

        const resp = await walletService.aplicarFiltros(walletId);
        const quotations = Array.isArray(resp.filtros) ? resp.filtros : [];

        setAllQuotations(quotations);
      } catch (error) {
        console.error(`[ContentWalletDetails] Erro ao buscar filtros:`, error);
        setError(error.message || "Erro ao carregar cotações");
        setAllQuotations([]);
      } finally {
        setLoading(false);
      }
    };

    if (walletId) {
      getFilteredQuotations(walletId);
    } else {
      console.warn("[ContentWalletDetails] Wallet ID não fornecido");
    }
  }, [walletId]);

  const handleOpenChart = (quotation) => {
    setSelectedQuotation(quotation);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedQuotation(null);
  };

  const getVariationColor = (variation) => {
    if (variation > 0) return "text-green-400";
    if (variation < 0) return "text-red-400";
    return "text-gray-400";
  };

  return (
    <div className="min-h-screen bg-bg px-6 py-10">
      <div className="mb-12 max-w-[1600px] mx-auto">
        <h1 className="text-4xl md:text-5xl font-bold mb-3">
          Suas <span className="text-primary">cotações</span>
        </h1>
        <p className="text-gray-300 text-lg">
          {allQuotations.length} aç{allQuotations.length > 1 ? "ões " : "ão "}
          encontrada{allQuotations.length !== 1 ? "s" : ""} na sua carteira
        </p>
      </div>

      {loading && <WalletLoadingDiv />}
      {error && !loading && <WalletErrorDiv />}

      {!loading && !error && allQuotations.length > 0 ? (
        <WalletQuotations
          allQuotations={currentQuotations}
          handleOpenChart={handleOpenChart}
          getVariationColor={getVariationColor}
          formatNumber={formatNumber}
        />
      ) : !loading && !error && allQuotations.length === 0 ? (
        <div className="flex items-center justify-center h-96">
          <div className="text-center">
            <p className="text-gray-400 text-lg">
              ⚠️ Nenhuma cotação encontrada
            </p>
            <p className="text-gray-500 text-sm mt-2">
              Verifique se há filtros aplicados ou tente novamente
            </p>
          </div>
        </div>
      ) : null}

      {totalPages > 1 && <PaginationControls />}

      {isModalOpen && selectedQuotation && (
        <WalletQuotationDetailModal
          selectedQuotation={selectedQuotation}
          formatNumber={formatNumber}
          handleCloseModal={handleCloseModal}
        />
      )}
    </div>
  );
}
