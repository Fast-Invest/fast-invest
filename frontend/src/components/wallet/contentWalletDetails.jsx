import { useEffect, useState } from "react";
import { TrendingUp, X } from "lucide-react";
import walletService from "../../services/walletService";
import QuotationChart from "./QuotationChart";

export default function ContentWalletDetails({ wallet }) {
  const walletId = wallet?.id;
  const [allQuotations, setAllQuotations] = useState([]);
  const [selectedQuotation, setSelectedQuotation] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getFilteredQuotations = async (walletId) => {
      try {
        setLoading(true);
        setError(null);

        console.log(`[ContentWalletDetails] Iniciando busca de filtros para wallet ID: ${walletId}`);

        const resp = await walletService.aplicarFiltros(walletId);

        console.log(`[ContentWalletDetails] Resposta do serviço:`, resp);
        console.log(`[ContentWalletDetails] resp.filtros:`, resp.filtros);
        console.log(`[ContentWalletDetails] Tipo de resp.filtros:`, typeof resp.filtros);
        console.log(`[ContentWalletDetails] É array?:`, Array.isArray(resp.filtros));
        console.log(`[ContentWalletDetails] Quantidade:`, Array.isArray(resp.filtros) ? resp.filtros.length : "N/A");

        // Garantir que sempre temos um array
        const quotations = Array.isArray(resp.filtros) ? resp.filtros : [];

        console.log(`[ContentWalletDetails] Cotações a serem exibidas:`, quotations);

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
      {/* Header */}
      <div className="mb-12 max-w-[1600px] mx-auto">
        <h1 className="text-4xl md:text-5xl font-bold mb-3">
          Suas <span className="text-primary">cotações</span>
        </h1>
        <p className="text-gray-300 text-lg">
          {allQuotations.length} ação (ões)
          encontrada{allQuotations.length !== 1 ? "s" : ""} na sua carteira
        </p>


      </div>


      {loading && (
        <div className="flex items-center justify-center h-96">
          <div className="text-center">
            <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-primary mb-4"></div>
            <p className="text-gray-300 text-lg">Carregando cotações...</p>
          </div>
        </div>
      )}


      {error && !loading && (
        <div className="flex items-center justify-center h-96">
          <div className="text-center">
            <p className="text-red-400 text-lg mb-4">❌ Erro ao carregar cotações</p>
            <p className="text-gray-400">{error}</p>
          </div>
        </div>
      )}

      {!loading && !error && allQuotations.length > 0 ? (
        <div className="max-w-[1600px] mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 auto-rows-max max-h-[calc(100vh-250px)] overflow-y-auto pr-2">
            {allQuotations.map((quotation) => (
              <div
                key={quotation.id}
                className="bg-gradient-to-br from-gray-900 to-black border border-primary/30 rounded-2xl shadow-lg shadow-primary/10 hover:shadow-primary/30 hover:border-primary/60 transition-all duration-300 p-6 group"
              >
                {/* Header Card */}
                <div className="flex items-start justify-between mb-6">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-3">
                      <h2 className="text-2xl font-bold text-white">
                        {quotation.symbol}
                      </h2>
                      <span className="text-xs font-semibold px-3 py-1 bg-primary/20 text-primary rounded-full border border-primary/40">
                        {quotation.tipo}
                      </span>
                    </div>
                    <p className="text-sm text-gray-400">
                      {quotation.setor}
                    </p>
                  </div>


            <button
                    onClick={() => handleOpenChart(quotation)}
                    className="p-2 hover:bg-primary/20 rounded-lg transition-all duration-200 flex-shrink-0 ml-2 group/btn"
                    title="Ver gráfico"
            >
                    <TrendingUp className="w-5 h-5 text-gray-400 group-hover/btn:text-primary transition-colors" />
            </button>
                </div>

                {/* Price Section */}
                <div className="mb-6 pb-6 border-b border-primary/20">
                  <div className="flex items-baseline gap-3 mb-2">
                    <span className="text-3xl font-bold text-white">
                      R$ {quotation.precoAtual.toFixed(2)}
                    </span>
                    <span
                      className={`text-sm font-semibold ${getVariationColor(
                        quotation.variacaoPercentualValor
                      )}`}
                    >
                      {quotation.variacaoPercentualValor > 0 ? "↑" : "↓"}{" "}
                      {Math.abs(quotation.variacaoPercentualValor).toFixed(2)}%
                    </span>
                  </div>
                  <p className="text-xs text-gray-500">
                    Variação: R${" "}
                    {quotation.variacaoValor > 0 ? "+" : ""}
                    {quotation.variacaoValor.toFixed(2)}
                  </p>
                </div>

                {/* Key Indicators Grid */}
                <div className="grid grid-cols-2 gap-3 mb-6">
                  {/* P/L */}
                  <div className="bg-black/40 border border-primary/20 p-3 rounded-lg hover:border-primary/40 transition-colors">
                    <p className="text-xs text-gray-400 font-semibold mb-2">
                      P/L
                    </p>
                    <p className="text-lg font-bold text-primary">
                      {quotation.pl.toFixed(2)}
                    </p>
                  </div>

                  {/* Dividend Yield */}
                  <div className="bg-black/40 border border-primary/20 p-3 rounded-lg hover:border-primary/40 transition-colors">
                    <p className="text-xs text-gray-400 font-semibold mb-2">
                      DY
                    </p>
                    <p className="text-lg font-bold text-primary">
                      {(quotation.dy * 100).toFixed(2)}%
                    </p>
                  </div>

                  {/* ROE */}
                  <div className="bg-black/40 border border-primary/20 p-3 rounded-lg hover:border-primary/40 transition-colors">
                    <p className="text-xs text-gray-400 font-semibold mb-2">
                      ROE
                    </p>
                    <p className="text-lg font-bold text-primary">
                      {(quotation.roe * 100).toFixed(2)}%
                    </p>
                  </div>

                  {/* ROA */}
                  <div className="bg-black/40 border border-primary/20 p-3 rounded-lg hover:border-primary/40 transition-colors">
                    <p className="text-xs text-gray-400 font-semibold mb-2">
                      ROA
                    </p>
                    <p className="text-lg font-bold text-primary">
                      {(quotation.roa * 100).toFixed(2)}%
                    </p>
                  </div>

                  {/* Liquidez Corrente */}
                  <div className="bg-black/40 border border-primary/20 p-3 rounded-lg hover:border-primary/40 transition-colors">
                    <p className="text-xs text-gray-400 font-semibold mb-2">
                      Liq. Corrente
                    </p>
                    <p className="text-lg font-bold text-primary">
                      {quotation.liquidezCorrente.toFixed(2)}
                    </p>
                  </div>

                  {/* Margem Líquida */}
                  <div className="bg-black/40 border border-primary/20 p-3 rounded-lg hover:border-primary/40 transition-colors">
                    <p className="text-xs text-gray-400 font-semibold mb-2">
                      Margem Líquida
                    </p>
                    <p className="text-lg font-bold text-primary">
                      {(quotation.margemLiquida * 100).toFixed(2)}%
                    </p>
                  </div>
                </div>

                {/* Additional Info */}
                <div className="bg-black/40 border border-primary/20 p-4 rounded-lg text-xs text-gray-400 space-y-2">
                  <div className="flex justify-between">
                    <span>Valor de Mercado:</span>
                    <span className="font-semibold text-white">
                      R$ {(quotation.valorDeMercado / 1000000).toFixed(2)}M
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span>LPA:</span>
                    <span className="font-semibold text-white">
                      {quotation.lpa.toFixed(2)}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span>VPA:</span>
                    <span className="font-semibold text-white">
                      {quotation.vpa.toFixed(2)}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
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

      {/* Modal */}
      {isModalOpen && selectedQuotation && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-gradient-to-br from-gray-900 to-black border border-primary/30 rounded-2xl shadow-2xl shadow-primary/20 max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            {/* Modal Header */}
            <div className="sticky top-0 bg-gradient-to-r from-gray-900 to-black border-b border-primary/30 p-6 flex items-center justify-between backdrop-blur-sm">
              <div>
                <h2 className="text-2xl font-bold text-white">
                  {selectedQuotation.symbol}
                </h2>
                <p className="text-sm text-gray-400">
                  {selectedQuotation.setor} • {selectedQuotation.tipo}
                </p>
              </div>
              <button
                onClick={handleCloseModal}
                className="p-2 hover:bg-primary/20 rounded-lg transition-colors duration-200"
              >
                <X className="w-6 h-6 text-gray-400 hover:text-primary" />
              </button>
            </div>

            {/* Modal Content */}
            <div className="p-6">
              {/* Chart Component */}
              <QuotationChart quotation={selectedQuotation} />

              {/* Detailed Indicators */}
              <div className="mt-8 grid grid-cols-2 md:grid-cols-3 gap-4">
                <div className="bg-black/40 border border-primary/20 p-4 rounded-lg hover:border-primary/40 transition-colors">
                  <p className="text-xs text-gray-400 font-semibold mb-2">
                    Preço Atual
                  </p>
                  <p className="text-xl font-bold text-primary">
                    R$ {selectedQuotation.precoAtual.toFixed(2)}
                  </p>
                </div>

                <div className="bg-black/40 border border-primary/20 p-4 rounded-lg hover:border-primary/40 transition-colors">
                  <p className="text-xs text-gray-400 font-semibold mb-2">
                    P/L
                  </p>
                  <p className="text-xl font-bold text-primary">
                    {selectedQuotation.pl.toFixed(2)}
                  </p>
                </div>

                <div className="bg-black/40 border border-primary/20 p-4 rounded-lg hover:border-primary/40 transition-colors">
                  <p className="text-xs text-gray-400 font-semibold mb-2">
                    Dividend Yield
                  </p>
                  <p className="text-xl font-bold text-primary">
                    {(selectedQuotation.dy * 100).toFixed(2)}%
                  </p>
                </div>

                <div className="bg-black/40 border border-primary/20 p-4 rounded-lg hover:border-primary/40 transition-colors">
                  <p className="text-xs text-gray-400 font-semibold mb-2">
                    ROE
                  </p>
                  <p className="text-xl font-bold text-primary">
                    {(selectedQuotation.roe * 100).toFixed(2)}%
                  </p>
                </div>

                <div className="bg-black/40 border border-primary/20 p-4 rounded-lg hover:border-primary/40 transition-colors">
                  <p className="text-xs text-gray-400 font-semibold mb-2">
                    ROA
                  </p>
                  <p className="text-xl font-bold text-primary">
                    {(selectedQuotation.roa * 100).toFixed(2)}%
                  </p>
                </div>

                <div className="bg-black/40 border border-primary/20 p-4 rounded-lg hover:border-primary/40 transition-colors">
                  <p className="text-xs text-gray-400 font-semibold mb-2">
                    Liquidez Corrente
                  </p>
                  <p className="text-xl font-bold text-primary">
                    {selectedQuotation.liquidezCorrente.toFixed(2)}
                  </p>
                </div>

                <div className="bg-black/40 border border-primary/20 p-4 rounded-lg hover:border-primary/40 transition-colors">
                  <p className="text-xs text-gray-400 font-semibold mb-2">
                    Margem Líquida
                  </p>
                  <p className="text-xl font-bold text-primary">
                    {(selectedQuotation.margemLiquida * 100).toFixed(2)}%
                  </p>
                </div>

                <div className="bg-black/40 border border-primary/20 p-4 rounded-lg hover:border-primary/40 transition-colors">
                  <p className="text-xs text-gray-400 font-semibold mb-2">
                    Margem EBITDA
                  </p>
                  <p className="text-xl font-bold text-primary">
                    {(selectedQuotation.margemEbitda * 100).toFixed(2)}%
                  </p>
                </div>

                <div className="bg-black/40 border border-primary/20 p-4 rounded-lg hover:border-primary/40 transition-colors">
                  <p className="text-xs text-gray-400 font-semibold mb-2">
                    EV/EBIT
                  </p>
                  <p className="text-xl font-bold text-primary">
                    {selectedQuotation.evEbit.toFixed(2)}
                  </p>
                </div>

                <div className="bg-black/40 border border-primary/20 p-4 rounded-lg hover:border-primary/40 transition-colors">
                  <p className="text-xs text-gray-400 font-semibold mb-2">
                    Dívida Líquida/EBIT
                  </p>
                  <p className="text-xl font-bold text-primary">
                    {selectedQuotation.dividaLiqEbit.toFixed(2)}
                  </p>
                </div>

                <div className="bg-black/40 border border-primary/20 p-4 rounded-lg hover:border-primary/40 transition-colors">
                  <p className="text-xs text-gray-400 font-semibold mb-2">
                    VPA
                  </p>
                  <p className="text-xl font-bold text-primary">
                    {selectedQuotation.vpa.toFixed(2)}
                  </p>
                </div>

                <div className="bg-black/40 border border-primary/20 p-4 rounded-lg hover:border-primary/40 transition-colors">
                  <p className="text-xs text-gray-400 font-semibold mb-2">
                    Valor de Mercado
                  </p>
                  <p className="text-xl font-bold text-primary">
                    R$ {(selectedQuotation.valorDeMercado / 1000000).toFixed(2)}M
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}