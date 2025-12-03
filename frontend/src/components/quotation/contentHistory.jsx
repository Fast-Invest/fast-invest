import {EvMultiplesChart} from "./QuotationCharts"
export default function ContentHistory({ historico_indicadores,cotacao }) {
  return (
    <div id="historico" className="w-full text-white p-8 rounded-2xl">
      <h2 className="text-2xl font-semibold mb-2">
        Histórico do Valor da Empresa
      </h2>
      <p className="text-sm text-gray-300 mb-6">
        Evolução anual do Valor da Empresa detentora de {cotacao.symbol} -
        últimos 10 anos
      </p>

      {/* Placeholder do gráfico */}
      <div className="w-full h-72 border border-gray-700 rounded-xl flex items-center justify-center">
        <div className="w-full h-72 border border-gray-700 rounded-xl p-4">
          <EvMultiplesChart historico_indicadores={historico_indicadores }/>
        </div>
      </div>


    </div>
  );
}
