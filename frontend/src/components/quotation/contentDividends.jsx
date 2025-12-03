export default function ContentDividends({ dividends }) {
  return (
    <div id="dividendos" className="w-full text-white mt-16 p-8">
      {/* Título */}
      <h2 className="text-2xl font-semibold mb-1 flex items-center gap-2">
        <span className="text-primary text-3xl">$</span> Histórico de Dividendos
      </h2>
      <p className="text-sm text-gray-400 mb-8">
        Análise dos dividendos pagos ao longo dos anos
      </p>

      {/* Cards superiores */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-10">
        <div className="p-5 border border-gray-700 rounded-xl">
          <p className="text-gray-400 text-sm">Último Dividendo</p>
          <h3 className="text-2xl font-bold mt-1">
            R$ {dividends.ultimoDividendo || "0,00"}
          </h3>
          <p className="text-gray-500 text-xs mt-2">
            Pago em {dividends.dataUltimo || "--/--/----"}
          </p>
        </div>

        <div className="p-5 border border-gray-700 rounded-xl">
          <p className="text-gray-400 text-sm">DY Últ. Dividendo</p>
          <h3 className="text-2xl font-bold mt-1">
            {dividends.dyUlt || "0.00"}%
          </h3>
          <p className="text-gray-500 text-xs mt-2">Baseado no preço atual</p>
        </div>

        <div className="p-5 border border-gray-700 rounded-xl">
          <p className="text-gray-400 text-sm">Dividend Yield TTM</p>
          <h3 className="text-2xl font-bold mt-1">
            {dividends.dyTTM || "0.00"}%
          </h3>
          <p className="text-gray-500 text-xs mt-2">Últimos 12 meses</p>
        </div>

        <div className="p-5 border border-gray-700 rounded-xl">
          <p className="text-gray-400 text-sm">
            Dividendos {new Date().getFullYear()}
          </p>
          <h3 className="text-2xl font-bold mt-1">
            R$ {dividends.totalAno || "0,00"}
          </h3>
          <p className="text-gray-500 text-xs mt-2">Total do ano</p>
        </div>
      </div>

      {/* Placeholder para o gráfico */}
      <div className="w-full h-80 border border-gray-700 rounded-xl flex items-center justify-center">
        <span className="text-gray-500 text-sm">
          Gráfico será renderizado aqui
        </span>
      </div>

      {/* Tabela histórica */}
      <div className="mt-10  border border-gray-700 rounded-xl p-6">
        <h3 className="text-lg font-semibold mb-4">Histórico de Pagamentos</h3>
        <p className="text-gray-400 text-sm mb-6">
          Últimos dividendos e JCP pagos
        </p>

        <div className="overflow-auto">
          <table className="w-full text-left text-sm">
            <thead className="border-b border-gray-700 text-gray-400">
              <tr>
                <th className="py-3">Tipo</th>
                <th className="py-3">Data Com</th>
                <th className="py-3">Pagamento</th>
                <th className="py-3">Valor</th>
              </tr>
            </thead>
            <tbody>
              {dividends.lista?.map((item) => (
                <tr key={item.id} className="border-b border-gray-800">
                  <td className="py-3">{item.label}</td>
                  <td>{new Date(item.lastDatePrior).toLocaleDateString()}</td>
                  <td>{new Date(item.paymentDate).toLocaleDateString()}</td>
                  <td>R$ {item.rate.toFixed(2)}</td>
                </tr>
              )) || (
                <tr>
                  <td colSpan={4} className="py-4 text-center text-gray-500">
                    Nenhum registro encontrado
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
