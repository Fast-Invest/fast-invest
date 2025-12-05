import { AiOutlinePercentage } from "react-icons/ai";
import { FaCalculator, FaBuilding } from "react-icons/fa";
import { BsCurrencyDollar } from "react-icons/bs";
import { MdOutlineShowChart } from "react-icons/md";
import { LuCoins } from "react-icons/lu";

import { formatNumber, formatLargeNumber } from "../utils/numberFormats";

export default function ContentValuation({ cotacao }) {
  return (
    <section id="valuation" className="mx-8 mt-10 mb-20">
      <h2 className="text-2xl font-bold flex items-center gap-2">
        <FaCalculator className="text-primary" />
        Indicadores de Valuation
      </h2>

      <p className="text-text-muted text-sm mt-1">
        Análise abrangente dos múltiplos e indicadores de valuation da empresa
      </p>

      {/* RENDIMENTO */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-8">
        <div className="bg-card p-6 rounded-2xl border border-gray">
          <h3 className="text-lg font-semibold flex items-center gap-2 mb-4">
            <AiOutlinePercentage className="text-primary" />
            Rendimento
          </h3>

          <div className="flex items-center justify-between py-2 border-b border-gray">
            <span className="text-sm text-text-muted">DIVIDEND YIELD</span>
            <span className="font-semibold">
              {formatNumber(cotacao.dy)}%
              <span className="text-xs text-primary border border-gray px-2 py-1 rounded ml-1">
                TTM
              </span>
            </span>
          </div>

          <div className="flex items-center justify-between py-2">
            <span className="text-sm text-text-muted">EARNING YIELD</span>
            <span className="font-semibold">
              {formatNumber(cotacao.earningYield)}%
              <span className="text-xs text-primary border border-gray px-2 py-1 rounded ml-1">
                TTM
              </span>
            </span>
          </div>
        </div>

        <div className="bg-card p-6 rounded-2xl border border-gray">
          <h3 className="text-lg font-semibold flex items-center gap-2 mb-4">
            <FaCalculator className="text-primary" />
            Múltiplos de Preço
          </h3>

          {[
            { label: "P/L", value: cotacao.pl },
            { label: "P/VP", value: cotacao.pvp },
            { label: "P/EBIT", value: cotacao.pebit },
            { label: "P/RECEITA", value: cotacao.psr },
          ].map((item) => (
            <div
              key={item.label}
              className="flex items-center justify-between py-2 border-b last:border-b-0 border-gray"
            >
              <span className="text-sm text-text-muted">{item.label}</span>

              <span className="font-semibold">
                {formatNumber(item.value)}
                <span className="text-xs text-primary border border-gray px-2 py-1 rounded ml-1">
                  TTM
                </span>
              </span>
            </div>
          ))}
        </div>

        <div className="bg-card p-6 rounded-2xl border border-gray">
          <h3 className="text-lg font-semibold flex items-center gap-2 mb-4">
            <BsCurrencyDollar className="text-primary" />
            Indicadores por Ação
          </h3>

          <div className="flex items-center justify-between py-2 border-b border-gray">
            <span className="text-sm text-text-muted">LPA</span>
            <span className="font-semibold">
              R$ {formatNumber(cotacao.lpa)}
              <span className="text-xs text-primary border border-gray px-2 py-1 rounded ml-1">
                TTM
              </span>
            </span>
          </div>

          <div className="flex items-center justify-between py-2">
            <span className="text-sm text-text-muted">VPA</span>
            <span className="font-semibold">
              R$ {formatNumber(cotacao.vpa)}
              <span className="text-xs text-primary border border-gray px-2 py-1 rounded ml-1">
                Atual
              </span>
            </span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-6">
        <div className="bg-card p-6 rounded-2xl border border-gray">
          <h3 className="text-lg font-semibold flex items-center gap-2 mb-4">
            <FaBuilding className="text-primary" />
            Enterprise Value
          </h3>

          {[
            { label: "EV/EBIT", value: cotacao.evEbit },
            { label: "EV/RECEITA LÍQUIDA", value: cotacao.evReceita },
            { label: "EV/FCO", value: cotacao.evFco },
            { label: "EV/FCL", value: cotacao.evFcl },
          ].map((item) => (
            <div
              key={item.label}
              className="flex items-center justify-between py-2 border-b last:border-b-0 border-gray"
            >
              <span className="text-sm text-text-muted">{item.label}</span>
              <span className="font-semibold">
                {formatNumber(item.value)}
                <span className="text-xs text-primary border border-gray px-2 py-1 rounded ml-1">
                  TTM
                </span>
              </span>
            </div>
          ))}
        </div>

        <div className="bg-card p-6 rounded-2xl border border-gray">
          <h3 className="text-lg font-semibold flex items-center gap-2 mb-4">
            <MdOutlineShowChart className="text-primary" />
            Fluxo de Caixa
          </h3>

          <div className="flex items-center justify-between py-2 border-b border-gray">
            <span className="text-sm text-text-muted">P/FCO</span>
            <span className="font-semibold">
              {formatNumber(cotacao.pfco)}
              <span className="text-xs text-primary border border-gray px-2 py-1 rounded ml-1">
                TTM
              </span>
            </span>
          </div>

          <div className="flex items-center justify-between py-2">
            <span className="text-sm text-text-muted">P/FCL</span>
            <span className="font-semibold">
              {formatNumber(cotacao.pfcl)}
              <span className="text-xs text-primary border border-gray px-2 py-1 rounded ml-1">
                TTM
              </span>
            </span>
          </div>
        </div>

        <div className="bg-card p-6 rounded-2xl border border-gray">
          <h3 className="text-lg font-semibold flex items-center gap-2 mb-4">
            <LuCoins className="text-primary" />
            Valor de Mercado
          </h3>

          <div className="flex items-center justify-between py-2 border-b border-gray">
            <span className="text-sm text-text-muted">ENTERPRISE VALUE</span>
            <span className="font-semibold">
              {formatLargeNumber(cotacao.enterpriseValue)}
              <span className="text-xs text-primary border border-gray px-2 py-1 rounded ml-1">
                Atual
              </span>
            </span>
          </div>

          <div className="flex items-center justify-between py-2">
            <span className="text-sm text-text-muted">VALOR DE MERCADO</span>
            <span className="font-semibold">
              {formatLargeNumber(cotacao.valorDeMercado)}
              <span className="text-xs text-primary border border-gray px-2 py-1 rounded ml-1">
                Atual
              </span>
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
