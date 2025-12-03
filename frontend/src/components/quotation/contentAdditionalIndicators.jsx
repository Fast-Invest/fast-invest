import {
  FaShieldAlt,
  FaBolt,
  FaChartPie,
  FaChartLine,
  FaInfoCircle,
} from "react-icons/fa";
import { MdOutlineShowChart } from "react-icons/md";
import { formatNumber } from "../utils/numberFormats";

export default function ContentAdditionalIndicators({ cotacao }) {
  return (
    <section id="adicionais" className="mx-8 mt-16 mb-20">
      <h2 className="text-2xl font-bold flex items-center gap-2">
        <FaChartPie className="text-primary" />
        Indicadores Adicionais
      </h2>

      <p className="text-text-muted text-sm mt-1">
        Análise de endividamento, eficiência, rentabilidade e crescimento
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-10">
        {/* ENDIVIDAMENTO */}
        <div className="bg-card p-6 rounded-2xl border border-gray">
          <h3 className="text-lg font-semibold flex items-center gap-2 mb-4">
            <FaShieldAlt className="text-primary" />
            Endividamento
          </h3>

          <div className="flex items-center justify-between py-3 border-b border-gray">
            <span className="text-sm text-text-muted">LIQ. CORRENTE</span>
            <span className="font-semibold text-text">
              {formatNumber(cotacao.liquidezCorrente)}
            </span>
          </div>

          <div className="flex items-center justify-between py-3">
            <span className="text-sm text-text-muted">DÍVIDA TOTAL</span>
            <span className="font-semibold text-text">
              R$ {formatNumber(cotacao.dividaTotal)}
            </span>
          </div>
        </div>

        {/* EFICIÊNCIA */}
        <div className="bg-card p-6 rounded-2xl border border-gray">
          <h3 className="text-lg font-semibold flex items-center gap-2 mb-4">
            <FaBolt className="text-primary" />
            Eficiência
          </h3>

          {[
            { label: "MARGEM BRUTA", value: cotacao.margemBruta },
            { label: "MARGEM EBIT", value: cotacao.margemEbit },
            { label: "MARGEM LÍQUIDA", value: cotacao.margemLiquida },
            { label: "GIRO DO ATIVO", value: cotacao.giroAtivos },
          ].map((item, i) => (
            <div
              key={i}
              className={`flex justify-between py-3 ${
                i < 3 ? "border-b border-gray" : ""
              }`}
            >
              <span className="text-sm text-text-muted">{item.label}</span>
              <span className="font-semibold text-text">
                {item.value != null ? formatNumber(item.value) + "%" : "N/A"}
              </span>
            </div>
          ))}
        </div>

        {/* RENTABILIDADE */}
        <div className="bg-card p-6 rounded-2xl border border-gray">
          <h3 className="text-lg font-semibold flex items-center gap-2 mb-4">
            <FaChartLine className="text-primary" />
            Rentabilidade
          </h3>

          {[
            { label: "ROE", value: cotacao.roe },
            { label: "ROIC", value: cotacao.roic },
            { label: "ROA", value: cotacao.roa },
          ].map((item, i) => (
            <div
              key={i}
              className={`flex justify-between py-3 ${
                i < 2 ? "border-b border-gray" : ""
              }`}
            >
              <span className="text-sm text-text-muted">{item.label}</span>
              <span className="font-semibold text-text">
                {item.value != null ? formatNumber(item.value) + "%" : "N/A"}
              </span>
            </div>
          ))}
        </div>

        {/* CRESCIMENTO */}
        <div className="p-6 rounded-2xl border border-gray">
          <h3 className="text-lg font-semibold flex items-center gap-2 mb-4">
            <MdOutlineShowChart className="text-primary" />
            Crescimento
          </h3>

          <div className="flex justify-between py-3">
            <span className="text-sm text-text-muted">CRESC. LUCROS</span>
            <span className="font-semibold text-text">
              {cotacao.crescimentoLucros
                ? formatNumber(cotacao.crescimentoLucros) + "%"
                : "N/A"}
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
