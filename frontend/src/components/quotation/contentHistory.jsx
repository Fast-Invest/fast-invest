export default function ContentHistory({ cotacao }) {
  return (
    <div id="historico" className="w-full text-white p-8 rounded-2xl">
      <h2 className="text-2xl font-semibold mb-2">
        Histórico de Lucro e Receita
      </h2>
      <p className="text-sm text-gray-300 mb-6">
        Evolução anual da receita líquida e lucro líquido de {cotacao.symbol} -
        últimos 15 anos
      </p>

      {/* Placeholder do gráfico */}
      <div className="w-full h-72 border border-gray-700 rounded-xl flex items-center justify-center">
        <span className="text-gray-500 text-sm">
          Gráfico será renderizado aqui
        </span>
      </div>

      <div className="mt-6 flex flex-col gap-1 text-sm text-gray-300">
        <p>Receita: -4.1% vs ano anterior</p>
        <p>Lucro: -70.4% vs ano anterior</p>
      </div>

      <p className="text-xs text-gray-500 mt-4">
        Mostrando dados anuais baseados nos demonstrativos de resultados
      </p>
    </div>
  );
}
