import QuotationChart from "./QuotationChart";
import { X, TrendingUp } from "lucide-react";
import { FaWallet, FaArrowRight } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

export function WalletErrorDiv() {
  return (
    <div className="flex justify-center items-center p-10">
      <div className="flex justify-center flex-col items-center rounded-xl border-2 border-primary-dark p-12 shadow-lg shadow-primary/30 gap-4">
        <div className="w-full justify-center flex flex-row">
          <FaWallet size={50} className="text-red-500" />
          <span className="text-red-500 text-5xl font-extrabold ml-8">
            Erro ao carregar cotações
          </span>
        </div>

        <div>
          <p className=" text-primary-dark font-bold text-3xl"></p>
        </div>
        <div>
          <p className=" text-white font-bold text-3xl">
            Servidor fora do ar, nenhuma ação encontrada
          </p>
        </div>
      </div>
    </div>
  );
}

export function WalletLoadingDiv() {
  return (
    <div className="flex items-center justify-center h-96">
      <div className="text-center">
        <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-primary mb-4"></div>
        <p className="text-gray-300 text-lg">Carregando cotações...</p>
      </div>
    </div>
  );
}

export function WalletQuotations({
  allQuotations,
  handleOpenChart,
  getVariationColor,
  formatNumber,
}) {
  return (
    <div className="max-w-[1600px] mx-auto">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 auto-rows-max  pr-2">
        {allQuotations.map((quotation) => (
          <div
            key={quotation.id}
            className="bg-bg-card from-gray-900 to-black border border-primary/30 rounded-2xl shadow-lg shadow-primary/10 hover:shadow-primary/30 hover:border-primary/60 transition-all duration-300 p-6 group"
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
                <p className="text-sm text-gray-400">{quotation.setor}</p>
              </div>

              <button
                onClick={() => handleOpenChart(quotation)}
                className="p-2 hover:bg-primary/20 rounded-lg transition-all duration-200 flex-shrink-0 ml-2 group/btn"
                title="Ver gráfico"
              >
                <TrendingUp className="w-5 h-5 text-gray-400 group-hover/btn:text-primary transition-colors" />
              </button>
            </div>

            <div className="mb-6 pb-6 border-b border-primary/20">
              <div className="flex items-baseline gap-3 mb-2">
                <span className="text-3xl font-bold text-white">
                  R$ {formatNumber(quotation.precoAtual)}
                </span>
                <span
                  className={`text-sm font-semibold ${getVariationColor(
                    quotation.variacaoPercentualValor
                  )}`}
                >
                  {quotation.variacaoPercentualValor > 0 ? "↑" : "↓"}{" "}
                  {formatNumber(Math.abs(quotation.variacaoPercentualValor))}%
                </span>
              </div>
              <p className="text-xs text-gray-500">
                Variação: R$ {quotation.variacaoValor > 0 ? "+" : ""}
                {formatNumber(quotation.variacaoValor)}
              </p>
            </div>

            <div className="grid grid-cols-2 gap-3 mb-6">
              {/* P/L */}
              <div className="bg-black/40 border border-primary/20 p-3 rounded-lg hover:border-primary/40 transition-colors">
                <p className="text-xs text-gray-400 font-semibold mb-2">P/L</p>
                <p className="text-lg font-bold text-primary">
                  {formatNumber(quotation.pl)}
                </p>
              </div>

              {/* Dividend Yield */}
              <div className="bg-black/40 border border-primary/20 p-3 rounded-lg hover:border-primary/40 transition-colors">
                <p className="text-xs text-gray-400 font-semibold mb-2">DY</p>
                <p className="text-lg font-bold text-primary">
                  {formatNumber(quotation.dy * 100)}%
                </p>
              </div>

              {/* ROE */}
              <div className="bg-black/40 border border-primary/20 p-3 rounded-lg hover:border-primary/40 transition-colors">
                <p className="text-xs text-gray-400 font-semibold mb-2">ROE</p>
                <p className="text-lg font-bold text-primary">
                  {formatNumber(quotation.roe * 100)}%
                </p>
              </div>

              {/* ROA */}
              <div className="bg-black/40 border border-primary/20 p-3 rounded-lg hover:border-primary/40 transition-colors">
                <p className="text-xs text-gray-400 font-semibold mb-2">ROA</p>
                <p className="text-lg font-bold text-primary">
                  {formatNumber(quotation.roa * 100)}%
                </p>
              </div>

              {/* Liquidez Corrente */}
              <div className="bg-black/40 border border-primary/20 p-3 rounded-lg hover:border-primary/40 transition-colors">
                <p className="text-xs text-gray-400 font-semibold mb-2">
                  Liq. Corrente
                </p>
                <p className="text-lg font-bold text-primary">
                  {formatNumber(quotation.liquidezCorrente)}
                </p>
              </div>

              {/* Margem Líquida */}
              <div className="bg-black/40 border border-primary/20 p-3 rounded-lg hover:border-primary/40 transition-colors">
                <p className="text-xs text-gray-400 font-semibold mb-2">
                  Margem Líquida
                </p>
                <p className="text-lg font-bold text-primary">
                  {formatNumber(quotation.margemLiquida * 100)}%
                </p>
              </div>
            </div>

            {/* Additional Info */}
            <div className="bg-black/40 border border-primary/20 p-4 rounded-lg text-xs text-gray-400 space-y-2">
              <div className="flex justify-between">
                <span>Valor de Mercado:</span>
                <span className="font-semibold text-white">
                  R$ {formatNumber(quotation.valorDeMercado / 1000000)}M
                </span>
              </div>
              <div className="flex justify-between">
                <span>LPA:</span>
                <span className="font-semibold text-white">
                  {formatNumber(quotation.lpa)}
                </span>
              </div>
              <div className="flex justify-between">
                <span>VPA:</span>
                <span className="font-semibold text-white">
                  {formatNumber(quotation.vpa)}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export function WalletQuotationDetailModal({
  selectedQuotation,
  formatNumber,
  handleCloseModal,
}) {
  const navigate = useNavigate();
  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-gradient-to-br from-gray-900 to-black border border-primary/30 rounded-2xl shadow-2xl shadow-primary/20 max-w-2xl w-full max-h-[90vh] custom-overflow">
        {/* Modal Header */}
        <div className="sticky z-10 top-0 bg-gradient-to-r from-gray-900 to-black border-b border-primary/30 p-6 flex items-center justify-between backdrop-blur-sm">
          <div>
            <h2 className="text-2xl font-bold text-white">
              {selectedQuotation.symbol}
            </h2>
            <p className="text-sm text-gray-400">
              {selectedQuotation.setor} • {selectedQuotation.tipo}
            </p>
          </div>

          <div
            onClick={() => navigate(`/cotacoes/${selectedQuotation.symbol}`)}
            className="flex flex-row justify-center bg-primary hover:bg-primary-dark text-black p-2 rounded-2xl cursor-pointer transition-all duration-300 transform hover:scale-105 active:outline-none active:ring-4 active:ring-primary/50"
          >
            <FaArrowRight size={25} />
            <p className="font-extrabold">Página da cotação</p>
          </div>

          <button
            onClick={handleCloseModal}
            className="p-2 hover:bg-primary/20 rounded-lg transition-colors duration-200"
          >
            <X className="w-6 h-6 text-gray-400 hover:text-primary" />
          </button>
        </div>

        <div className="p-6">
          <QuotationChart quotation={selectedQuotation} />

          <div className="mt-8 grid grid-cols-2 md:grid-cols-3 gap-4">
            <div className="bg-black/40 border border-primary/20 p-4 rounded-lg hover:border-primary/40 transition-colors">
              <p className="text-xs text-gray-400 font-semibold mb-2">
                Preço Atual
              </p>
              <p className="text-xl font-bold text-primary">
                R$ {formatNumber(selectedQuotation.precoAtual)}
              </p>
            </div>

            <div className="bg-black/40 border border-primary/20 p-4 rounded-lg hover:border-primary/40 transition-colors">
              <p className="text-xs text-gray-400 font-semibold mb-2">P/L</p>
              <p className="text-xl font-bold text-primary">
                {formatNumber(selectedQuotation.pl)}
              </p>
            </div>

            <div className="bg-black/40 border border-primary/20 p-4 rounded-lg hover:border-primary/40 transition-colors">
              <p className="text-xs text-gray-400 font-semibold mb-2">
                Dividend Yield
              </p>
              <p className="text-xl font-bold text-primary">
                {formatNumber(selectedQuotation.dy * 100)}%
              </p>
            </div>

            <div className="bg-black/40 border border-primary/20 p-4 rounded-lg hover:border-primary/40 transition-colors">
              <p className="text-xs text-gray-400 font-semibold mb-2">ROE</p>
              <p className="text-xl font-bold text-primary">
                {formatNumber(selectedQuotation.roe * 100)}%
              </p>
            </div>

            <div className="bg-black/40 border border-primary/20 p-4 rounded-lg hover:border-primary/40 transition-colors">
              <p className="text-xs text-gray-400 font-semibold mb-2">ROA</p>
              <p className="text-xl font-bold text-primary">
                {formatNumber(selectedQuotation.roa * 100)}%
              </p>
            </div>

            <div className="bg-black/40 border border-primary/20 p-4 rounded-lg hover:border-primary/40 transition-colors">
              <p className="text-xs text-gray-400 font-semibold mb-2">
                Liquidez Corrente
              </p>
              <p className="text-xl font-bold text-primary">
                {formatNumber(selectedQuotation.liquidezCorrente)}
              </p>
            </div>

            <div className="bg-black/40 border border-primary/20 p-4 rounded-lg hover:border-primary/40 transition-colors">
              <p className="text-xs text-gray-400 font-semibold mb-2">
                Margem Líquida
              </p>
              <p className="text-xl font-bold text-primary">
                {formatNumber(selectedQuotation.margemLiquida * 100)}%
              </p>
            </div>

            <div className="bg-black/40 border border-primary/20 p-4 rounded-lg hover:border-primary/40 transition-colors">
              <p className="text-xs text-gray-400 font-semibold mb-2">
                Margem EBITDA
              </p>
              <p className="text-xl font-bold text-primary">
                {formatNumber(selectedQuotation.margemEbitda * 100)}%
              </p>
            </div>

            <div className="bg-black/40 border border-primary/20 p-4 rounded-lg hover:border-primary/40 transition-colors">
              <p className="text-xs text-gray-400 font-semibold mb-2">
                EV/EBIT
              </p>
              <p className="text-xl font-bold text-primary">
                {formatNumber(selectedQuotation.evEbit)}
              </p>
            </div>

            <div className="bg-black/40 border border-primary/20 p-4 rounded-lg hover:border-primary/40 transition-colors">
              <p className="text-xs text-gray-400 font-semibold mb-2">
                Dívida Líquida/EBIT
              </p>
              <p className="text-xl font-bold text-primary">
                {formatNumber(selectedQuotation.dividaLiqEbit)}
              </p>
            </div>

            <div className="bg-black/40 border border-primary/20 p-4 rounded-lg hover:border-primary/40 transition-colors">
              <p className="text-xs text-gray-400 font-semibold mb-2">VPA</p>
              <p className="text-xl font-bold text-primary">
                {formatNumber(selectedQuotation.vpa)}
              </p>
            </div>

            <div className="bg-black/40 border border-primary/20 p-4 rounded-lg hover:border-primary/40 transition-colors">
              <p className="text-xs text-gray-400 font-semibold mb-2">
                Valor de Mercado
              </p>
              <p className="text-xl font-bold text-primary">
                R$ {formatNumber(selectedQuotation.valorDeMercado / 1000000)}M
              </p>
            </div>

            <div className="bg-black/40 border border-primary/20 p-4 rounded-lg hover:border-primary/40 transition-colors">
              <p className="text-xs text-gray-400 font-semibold mb-2">ROIC</p>
              <p className="text-xl font-bold text-primary">
                {formatNumber(selectedQuotation.roic * 100)}%
              </p>
            </div>

            <div className="bg-black/40 border border-primary/20 p-4 rounded-lg hover:border-primary/40 transition-colors">
              <p className="text-xs text-gray-400 font-semibold mb-2">
                Giro de Ativos
              </p>
              <p className="text-xl font-bold text-primary">
                {formatNumber(selectedQuotation.giroAtivos)}
              </p>
            </div>

            <div className="bg-black/40 border border-primary/20 p-4 rounded-lg hover:border-primary/40 transition-colors">
              <p className="text-xs text-gray-400 font-semibold mb-2">
                Margem Bruta
              </p>
              <p className="text-xl font-bold text-primary">
                {formatNumber(selectedQuotation.margemBruta * 100)}%
              </p>
            </div>

            <div className="bg-black/40 border border-primary/20 p-4 rounded-lg hover:border-primary/40 transition-colors">
              <p className="text-xs text-gray-400 font-semibold mb-2">
                Dívida Líq / Patrimônio
              </p>
              <p className="text-xl font-bold text-primary">
                {formatNumber(selectedQuotation.dividaLiqPatrimonio)}
              </p>
            </div>

            <div className="bg-black/40 border border-primary/20 p-4 rounded-lg hover:border-primary/40 transition-colors">
              <p className="text-xs text-gray-400 font-semibold mb-2">
                Fluxo de Caixa Operacional
              </p>
              <p className="text-xl font-bold text-primary">
                R${" "}
                {formatNumber(
                  selectedQuotation.fluxoCaixaOperacional / 1_000_000
                )}
                M
              </p>
            </div>

            <div className="bg-black/40 border border-primary/20 p-4 rounded-lg hover:border-primary/40 transition-colors">
              <p className="text-xs text-gray-400 font-semibold mb-2">
                Fluxo de Caixa Livre
              </p>
              <p className="text-xl font-bold text-primary">
                R$ {formatNumber(selectedQuotation.fluxoCaixaLivre / 1_000_000)}
                M
              </p>
            </div>

            <div className="bg-black/40 border border-primary/20 p-4 rounded-lg hover:border-primary/40 transition-colors">
              <p className="text-xs text-gray-400 font-semibold mb-2">P/VP</p>
              <p className="text-xl font-bold text-primary">
                {formatNumber(selectedQuotation.pvp)}
              </p>
            </div>

            <div className="bg-black/40 border border-primary/20 p-4 rounded-lg hover:border-primary/40 transition-colors">
              <p className="text-xs text-gray-400 font-semibold mb-2">PSR</p>
              <p className="text-xl font-bold text-primary">
                {formatNumber(selectedQuotation.psr)}
              </p>
            </div>

            <div className="bg-black/40 border border-primary/20 p-4 rounded-lg hover:border-primary/40 transition-colors">
              <p className="text-xs text-gray-400 font-semibold mb-2">
                Enterprise Value
              </p>
              <p className="text-xl font-bold text-primary">
                R$ {formatNumber(selectedQuotation.enterpriseValue / 1_000_000)}
                M
              </p>
            </div>

            <div className="bg-black/40 border border-primary/20 p-4 rounded-lg hover:border-primary/40 transition-colors">
              <p className="text-xs text-gray-400 font-semibold mb-2">
                Liquidez Média Diária
              </p>
              <p className="text-xl font-bold text-primary">
                {formatNumber(selectedQuotation.liquidezMediaDiaria)}
              </p>
            </div>

            <div className="bg-black/40 border border-primary/20 p-4 rounded-lg hover:border-primary/40 transition-colors">
              <p className="text-xs text-gray-400 font-semibold mb-2">
                Receita
              </p>
              <p className="text-xl font-bold text-primary">
                R$ {formatNumber(selectedQuotation.receita / 1_000_000)}M
              </p>
            </div>

            <div className="bg-black/40 border border-primary/20 p-4 rounded-lg hover:border-primary/40 transition-colors">
              <p className="text-xs text-gray-400 font-semibold mb-2">EBITDA</p>
              <p className="text-xl font-bold text-primary">
                R$ {formatNumber(selectedQuotation.ebitda / 1_000_000)}M
              </p>
            </div>

            <div className="bg-black/40 border border-primary/20 p-4 rounded-lg hover:border-primary/40 transition-colors">
              <p className="text-xs text-gray-400 font-semibold mb-2">
                Lucro Líquido
              </p>
              <p className="text-xl font-bold text-primary">
                R$ {formatNumber(selectedQuotation.netIncome / 1_000_000)}M
              </p>
            </div>

            <div className="bg-black/40 border border-primary/20 p-4 rounded-lg hover:border-primary/40 transition-colors">
              <p className="text-xs text-gray-400 font-semibold mb-2">Caixa</p>
              <p className="text-xl font-bold text-primary">
                R$ {formatNumber(selectedQuotation.caixa / 1_000_000)}M
              </p>
            </div>

            <div className="bg-black/40 border border-primary/20 p-4 rounded-lg hover:border-primary/40 transition-colors">
              <p className="text-xs text-gray-400 font-semibold mb-2">
                Crescimento dos Lucros
              </p>
              <p className="text-xl font-bold text-primary">
                {formatNumber(selectedQuotation.crescimentoLucros * 100)}%
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
