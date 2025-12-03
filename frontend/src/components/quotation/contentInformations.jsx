import { Link } from "react-scroll";
import {
  FaHome,
  FaChevronRight,
  FaInfoCircle,
  FaBuilding,
  FaChartLine,
  FaUsers,
} from "react-icons/fa";
import { BsBuildingsFill } from "react-icons/bs";
import { AiOutlinePercentage } from "react-icons/ai";

import { useNavigate } from "react-router-dom";

import ContentValuation from "./contentValuation";
import ContentAdditionalIndicators from "./contentAdditionalIndicators";
import ContentFinancialStatement from "./contentFinancialStatement";

import { formatNumber, formatLargeNumber } from "../utils/numberFormats";
import ContentHistory from "./contentHistory";
import ContentDividends from "./contentDividends";

export default function ContentInformations({
  cotacao,
  historico_indicadores,
  perfil,
  balanco_anual,
  balanco_trimestral,
  dre_anual,
  dre_trimestral,
  cashflow_anual,
  cashflow_trimestral,
  dividendos,
}) {
  const navigate = useNavigate();
  const variacaoPositiva = cotacao.variacaoValor > 0;

  function exportarCSV() {
    const ticker = cotacao?.symbol || "dados";

    const dados = {
      cotacao,
      perfil,
      dividendos,
      historico_indicadores,
      balanco_anual,
      balanco_trimestral,
      dre_anual,
      dre_trimestral,
      cashflow_anual,
      cashflow_trimestral,
    };

    function toCSV(obj) {
      if (Array.isArray(obj)) {
        if (obj.length === 0) return "";
        const headers = Object.keys(obj[0]);
        const rows = obj.map((o) =>
          headers.map((h) => JSON.stringify(o[h] ?? "")).join(",")
        );
        return headers.join(",") + "\n" + rows.join("\n");
      } else {
        const headers = Object.keys(obj || {});
        const values = headers.map((h) => JSON.stringify(obj[h] ?? ""));
        return headers.join(",") + "\n" + values.join(",");
      }
    }

    let csv = "";

    csv += "=== COTACAO ===\n" + toCSV(cotacao) + "\n\n";
    csv += "=== PERFIL ===\n" + toCSV(perfil) + "\n\n";
    csv +=
      "=== HISTORICO INDICADORES ===\n" + toCSV(historico_indicadores) + "\n\n";
    csv +=
      "=== DIVIDENDOS ===\n" + toCSV(dividendos?.lista || dividendos) + "\n\n";
    csv += "=== BALANCO ANUAL ===\n" + toCSV(balanco_anual) + "\n\n";
    csv += "=== BALANCO TRIMESTRAL ===\n" + toCSV(balanco_trimestral) + "\n\n";
    csv += "=== DRE ANUAL ===\n" + toCSV(dre_anual) + "\n\n";
    csv += "=== DRE TRIMESTRAL ===\n" + toCSV(dre_trimestral) + "\n\n";
    csv += "=== CASHFLOW ANUAL ===\n" + toCSV(cashflow_anual) + "\n\n";
    csv +=
      "=== CASHFLOW TRIMESTRAL ===\n" + toCSV(cashflow_trimestral) + "\n\n";

    // UTF-8 COM BOM
    const BOM = "\uFEFF";

    const blob = new Blob([BOM + csv], {
      type: "text/csv;charset=utf-8;",
    });

    const url = URL.createObjectURL(blob);

    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", `dados_${ticker}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }

  return (
    <div id="info" className="text-text w-full min-h-screen max-w-7xl mx-auto">
      {/* Breadcrumb */}
      <div className="flex items-center gap-2 px-8 pt-6 text-text-muted">
        <button
          onClick={() => navigate("/")}
          className="text-lg hover:text-text cursor-pointer transition"
        >
          <FaHome />
        </button>
        <FaChevronRight size={12} />
        <button
          onClick={() => navigate("/cotacoes")}
          className="font-semibold hover:text-text cursor-pointer transition"
        >
          Cotações
        </button>
        <FaChevronRight size={12} />
        <strong className="text-text font-semibold">{cotacao.symbol}</strong>
      </div>

      {/* Card principal */}
      <div className="mx-8 mt-6 p-10 rounded-xl border border-gray flex justify-between items-center">
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 rounded-lg overflow-hidden">
            <img
              src={perfil?.logo}
              alt={perfil?.nome || "nao encontrado"}
              className="w-full h-full object-cover"
            />
          </div>

          <div>
            <h1 className="text-3xl font-semibold flex items-center gap-2">
              {cotacao.symbol}
              <span className="text-xs bg-gray px-2 py-1 rounded">
                {perfil?.moeda || "Não encontrado"}
              </span>
            </h1>
            <p className="text-text-muted mt-1">
              {perfil?.nome || "Não encontrado"}
            </p>
          </div>
        </div>

        <div className="text-center">
          <div className="flex justify-center items-center gap-4">
            <p className="text-4xl font-bold">
              R$ {formatNumber(cotacao.precoAtual)}
            </p>

            <span
              className={`px-2 py-1 rounded-2xl text-base font-semibold ${
                variacaoPositiva
                  ? "text-primary bg-primary/15"
                  : "text-red-400 bg-red-400/15"
              }`}
            >
              {variacaoPositiva ? "↑" : "↓"} R${" "}
              {formatNumber(Math.abs(cotacao.variacaoValor))}
            </span>

            <span
              className={`font-semibold text-base ${
                variacaoPositiva ? "text-primary" : "text-red-400"
              }`}
            >
              {cotacao.variacaoPercentualValor > 0 ? "+" : ""}
              {formatNumber(cotacao.variacaoPercentualValor)}%
            </span>
          </div>

          <p className="text-sm text-right text-text-muted mt-2">
            Atualizado automaticamente
          </p>
        </div>
      </div>

      <nav
        className="sticky top-0 z-50 flex justify-center gap-10 py-4 border-y border-gray 
        backdrop-blur-md bg-transparent/30 text-text-muted mt-8"
      >
        {[
          { label: "Informações", to: "info" },
          { label: "Indicadores de Valuation", to: "valuation" },
          { label: "Indicadores Adicionais", to: "adicionais" },
          { label: "Demonstrações", to: "demonstracoes" },
          { label: "Histórico de Lucro e Receita", to: "historico" },
          { label: "Histórico de Dividendos", to: "dividendos" },
        ].map((item) => (
          <Link
            key={item.to}
            to={item.to}
            smooth={true}
            duration={300}
            className="cursor-pointer hover:text-primary transition"
          >
            {item.label}
          </Link>
        ))}
      </nav>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 px-8 py-10">
        <div className="p-6 rounded-xl border border-gray">
          <h2 className="text-xl font-semibold mb-6 text-primary flex items-center gap-2">
            <FaBuilding /> Dados da Empresa
          </h2>

          <ul className="space-y-6 text-text-muted">
            <li className="flex justify-between border-b border-gray pb-3">
              <span className="flex items-center gap-2">
                <FaBuilding /> Nome
              </span>
              <span className="text-text">{perfil?.nome || "N/A"}</span>
            </li>

            <li className="flex justify-between border-b border-gray pb-3">
              <span className="flex items-center gap-2">
                <BsBuildingsFill /> Setor
              </span>
              <span className="text-text max-w-sm text-right">
                {cotacao.setor || "N/A"}
              </span>
            </li>

            <li className="flex justify-between border-b border-gray pb-3">
              <span className="flex items-center gap-2">
                <BsBuildingsFill /> Endereço
              </span>
              <span className="text-text max-w-sm text-right">
                {perfil?.endereco || "N/A"}
              </span>
            </li>

            <li className="flex justify-between border-b border-gray pb-3">
              <span className="flex items-center gap-2">
                <FaChartLine /> Valor de Mercado
              </span>
              <span className="text-text">
                {formatLargeNumber(cotacao.valorDeMercado)}
              </span>
            </li>

            <li className="flex justify-between">
              <span className="flex items-center gap-2">
                <FaUsers /> Quantidade de Ações
              </span>
              <span className="text-text">
                {formatNumber(cotacao.quantidadeAcoes / 1_000_000_000)}B
              </span>
            </li>
          </ul>
        </div>

        <div className="p-6 rounded-xl border border-gray">
          <h2 className="text-xl text-primary font-semibold mb-6 flex items-center gap-2">
            <AiOutlinePercentage /> Indicadores Chave
          </h2>

          <ul className="space-y-6 text-text-muted">
            {[
              { nome: "P/L", valor: formatNumber(cotacao.pl) },
              { nome: "P/VP", valor: formatNumber(cotacao.pvp) },
              { nome: "DY", valor: formatNumber(cotacao.dy) + "%" },
              { nome: "LPA", valor: "R$ " + formatNumber(cotacao.lpa) },
              { nome: "VPA", valor: "R$ " + formatNumber(cotacao.vpa) },
            ].map((item, i) => (
              <li
                key={i}
                className="flex justify-between border-b border-gray pb-3"
              >
                <span className="flex items-center gap-2">
                  {item.nome}
                  <FaInfoCircle className="cursor-pointer hover:text-primary transition" />
                </span>

                <span className="text-text">{item.valor}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <ContentValuation cotacao={cotacao} />
      <ContentAdditionalIndicators cotacao={cotacao} />
      <ContentFinancialStatement
        balanco={balanco_anual}
        dre={dre_anual}
        fluxo={cashflow_anual}
        balancoTrimestral={balanco_trimestral}
        dreTrimestral={dre_trimestral}
        fluxoTrimestral={cashflow_trimestral}
      />
      <ContentHistory
        cotacao={cotacao}
        historico_indicadores={historico_indicadores}
      />
      <ContentDividends
        historico_indicadores={historico_indicadores}
        dividends={dividendos}
      />
      <div className="w-full flex justify-center py-10">
        <button
          onClick={exportarCSV}
          className="px-6 py-3 rounded-lg bg-primary text-bg font-semibold hover:bg-primary/80 transition shadow-md"
        >
          Exportar CSV
        </button>
      </div>
    </div>
  );
}
