import { useState } from "react";
import { FaBuilding, FaWallet } from "react-icons/fa";
import { MdOutlineShowChart } from "react-icons/md";
import { formatNumber } from "../utils/numberFormats";

export default function ContentFinancialStatement({ balanco, dre, fluxo }) {
  const [activeTab, setActiveTab] = useState("balanco");

  return (
    <section id="demonstracoes" className="mx-8 mt-16 mb-20">
      <h2 className="text-2xl font-bold flex items-center gap-2">
        <FaBuilding className="text-primary" />
        Demonstrações Financeiras
      </h2>

      <p className="text-text-muted text-sm mt-1">
        Balanço patrimonial, demonstrativo de resultados e fluxo de caixa da
        empresa
      </p>

      <div className="flex w-full mt-8 rounded-xl overflow-x-scroll max-w-screen border border-gray">
        <button
          onClick={() => setActiveTab("balanco")}
          className={`flex items-center justify-center gap-2 py-3 flex-1 transition ${
            activeTab === "balanco"
              ? "text-primary font-semibold"
              : "text-text-muted"
          }`}
        >
          <FaBuilding />
          Balanço Patrimonial
        </button>

        <button
          onClick={() => setActiveTab("dre")}
          className={`flex items-center justify-center gap-2 py-3 flex-1 transition ${
            activeTab === "dre"
              ? "text-primary font-semibold"
              : "text-text-muted"
          }`}
        >
          <MdOutlineShowChart />
          DRE
        </button>

        <button
          onClick={() => setActiveTab("fluxo")}
          className={`flex items-center justify-center gap-2 py-3 flex-1 transition ${
            activeTab === "fluxo"
              ? "text-primary font-semibold"
              : "text-text-muted"
          }`}
        >
          <FaWallet />
          Fluxo de Caixa
        </button>
      </div>

      <div className="mt-10 bg-card p-6 rounded-2xl border border-gray overflow-x-scroll max-w-screen">
        {activeTab === "balanco" && <BalancoTable data={balanco} />}
        {activeTab === "dre" && <DRETable data={dre} />}
        {activeTab === "fluxo" && <FluxoTable data={fluxo} />}
      </div>
    </section>
  );
}

/* ========================
        BALANÇO
======================== */

function BalancoTable({ data = [] }) {
  const anos = data.map((x) => x.data);

  const campos = [
    { label: "ATIVO TOTAL", key: "ativosTotais" },
    { label: "PASSIVO TOTAL", key: "passivosTotais" },
    { label: "ATIVO CIRCULANTE", key: "ativosCirculante" },
    { label: "PASSIVO CIRCULANTE", key: "passivosCirculante" },
    { label: "PATRIMÔNIO LÍQUIDO", key: "patrimonioLiquido" },
    { label: "DÍVIDA LONGO PRAZO", key: "dividaLongoPrazo" },
    { label: "ESTOQUES", key: "estoques" },
    { label: "CAIXA E EQUIVALENTES", key: "caixaEquivalentes" },
    { label: "LUCROS RETIDOS", key: "lucrosRetidos" },
  ];

  return (
    <div>
      <h3 className="text-xl font-semibold mb-6">Balanço Patrimonial</h3>

      <div className="overflow-x-auto custom-overflow">
        <table className="text-sm">
          <thead>
            <tr className="text-left text-text-muted border-b border-gray">
              <th className="py-3 px-4">Componente</th>
              {anos.map((a) => (
                <th key={a} className="px-4 whitespace-nowrap">
                  {a}
                </th>
              ))}
            </tr>
          </thead>

          <tbody>
            {campos.map((row, i) => (
              <tr key={i} className="border-b border-gray">
                <td className="py-3 px-4 font-semibold whitespace-nowrap">
                  {row.label}
                </td>

                {data.map((ano) => (
                  <td key={ano.data} className="px-4 whitespace-nowrap">
                    {ano[row.key] != null
                      ? "R$ " + formatNumber(ano[row.key])
                      : "N/A"}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

/* ========================
            DRE
======================== */

function DRETable({ data = [] }) {
  const anos = data.map((x) => x.data);

  const campos = [
    { label: "RECEITA LÍQUIDA", key: "receitaLiquida" },
    { label: "LUCRO BRUTO", key: "lucroBruto" },
    { label: "EBIT", key: "ebit" },
    { label: "LUCRO LÍQUIDO", key: "lucroLiquido" },
    { label: "IMPOSTO DE RENDA", key: "impostoDeRenda" },
    { label: "RESULTADO OPERACIONAL", key: "resultadoOperacional" },
    { label: "DESPESAS FINANCEIRAS", key: "despesasFinanceiras" },
    { label: "MARGEM BRUTA", key: "margemBruta", isPercent: true },
    { label: "MARGEM EBITDA", key: "margemEBIT", isPercent: true },
    { label: "MARGEM LÍQUIDA", key: "margemLíquida", isPercent: true },
  ];

  return (
    <div>
      <h3 className="text-xl font-semibold mb-6">Demonstração de Resultados</h3>

      <div className="overflow-x-auto custom-overflow">
        <table className="text-sm">
          <thead>
            <tr className="text-left text-text-muted border-b border-gray">
              <th className="py-3 px-4">Componente</th>
              {anos.map((a) => (
                <th key={a} className="px-4 whitespace-nowrap">
                  {a}
                </th>
              ))}
            </tr>
          </thead>

          <tbody>
            {campos.map((row, i) => (
              <tr key={i} className="border-b border-gray">
                <td className="py-3 px-4 font-semibold whitespace-nowrap">
                  {row.label}
                </td>

                {data.map((ano) => (
                  <td key={ano.data} className="px-4 whitespace-nowrap">
                    {ano[row.key] == null
                      ? "N/A"
                      : row.isPercent
                      ? formatNumber(ano[row.key] * 100) + "%"
                      : "R$ " + formatNumber(ano[row.key])}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

/* ========================
      FLUXO DE CAIXA
======================== */

function FluxoTable({ data = [] }) {
  const anos = data.map((x) => x.data);

  const campos = [
    { label: "FLUXO OPERACIONAL", key: "fluxoDeCaixaOperacional" },
    { label: "FLUXO DE INVESTIMENTO", key: "fluxoDeCaixaDeInvestimento" },
    { label: "FLUXO DE FINANCIAMENTO", key: "fluxoDeCaixaDeFinanciamento" },
    { label: "VARIAÇÃO DE CAIXA", key: "variacaoDeCaixa" },
    { label: "FLUXO DE CAIXA LIVRE", key: "fluxoDeCaixaLivre" },
    { label: "SALDO INICIAL", key: "saldoInicialDeCaixa" },
    { label: "SALDO FINAL", key: "saldoFinalDeCaixa" },
    { label: "VARIAÇÕES ATIVOS / PASSIVOS", key: "variacoesNosAtivosPassivos" },
    { label: "CAIXA GERADO NAS OPERAÇÕES", key: "caixaGeradoNasOperacoes" },
  ];

  return (
    <div>
      <h3 className="text-xl font-semibold mb-6">Fluxo de Caixa</h3>

      <div className="overflow-x-auto custom-overflow">
        <table className="text-sm">
          <thead>
            <tr className="text-left text-text-muted border-b border-gray">
              <th className="py-3 px-4">Componente</th>
              {anos.map((a) => (
                <th key={a} className="px-4 whitespace-nowrap">
                  {a}
                </th>
              ))}
            </tr>
          </thead>

          <tbody>
            {campos.map((row, i) => (
              <tr key={i} className="border-b border-gray">
                <td className="py-3 px-4 font-semibold whitespace-nowrap">
                  {row.label}
                </td>

                {data.map((ano) => (
                  <td key={ano.data} className="px-4 whitespace-nowrap">
                    {ano[row.key] != null
                      ? "R$ " + formatNumber(ano[row.key])
                      : "N/A"}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
