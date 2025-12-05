import { ContentDividendsChart } from "./QuotationCharts"; // IMPORTAÇÃO CORRIGIDA (default)

export default function ContentDividends({
  historico_indicadores = [],
  dividends = {},
}) {
  // Normaliza a lista: aceita tanto `dividends` ser array direto quanto objeto com .lista
  const list = Array.isArray(dividends)
    ? dividends
    : Array.isArray(dividends.lista)
    ? dividends.lista
    : [];

  // ordena por paymentDate (desc) para pegar o último pagamento
  const sortedByDateDesc = [...list].sort((a, b) => {
    const da = new Date(a.paymentDate ?? a.lastDatePrior ?? 0).getTime();
    const db = new Date(b.paymentDate ?? b.lastDatePrior ?? 0).getTime();
    return db - da;
  });

  const last = sortedByDateDesc[0] ?? null;

  // tenta extrair precoAtual (pode vir de dividends ou do historico_indicadores)
  const priceFromDividends =
    typeof dividends.precoAtual === "number" ? dividends.precoAtual : undefined;
  const priceFromHistorico =
    Array.isArray(historico_indicadores) &&
    historico_indicadores[0] &&
    typeof historico_indicadores[0].precoAtual === "number"
      ? historico_indicadores[0].precoAtual
      : undefined;
  const precoAtual = priceFromDividends ?? priceFromHistorico ?? null;

  // último dividendo (valor) e data
  const ultimoDiv = last
    ? Number(last.rate ?? 0).toLocaleString(undefined, {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      })
    : "0,00";
  const dataUlt = last
    ? new Date(last.paymentDate ?? last.lastDatePrior).toLocaleDateString()
    : "--/--/----";

  // DY do último dividendo: prioriza campo já calculado em `dividends.dyUlt`, senão tenta calcular (rate / precoAtual *100)
  const dyUlt =
    dividends?.dyUlt !== undefined && dividends?.dyUlt !== null
      ? Number(dividends.dyUlt).toFixed(2)
      : precoAtual && last
      ? ((Number(last.rate ?? 0) / precoAtual) * 100).toFixed(2)
      : "0.00";

  // DY TTM: prioriza dividends.dyTTM; senão soma rates dos últimos 12 meses e divide por precoAtual (se disponível)
  let dyTTM = "0.00";
  if (dividends?.dyTTM !== undefined && dividends?.dyTTM !== null) {
    dyTTM = Number(dividends.dyTTM).toFixed(2);
  } else if (precoAtual) {
    const now = Date.now();
    const ONE_YEAR_MS = 365 * 24 * 60 * 60 * 1000;
    const sumLast12 = list.reduce((acc, it) => {
      const pd = new Date(it.paymentDate ?? it.lastDatePrior ?? 0).getTime();
      if (!pd || isNaN(pd)) return acc;
      if (now - pd <= ONE_YEAR_MS) return acc + Number(it.rate ?? 0);
      return acc;
    }, 0);
    dyTTM = ((sumLast12 / precoAtual) * 100).toFixed(2);
  }

  const currentYear = new Date().getFullYear();
  const totalAno =
    dividends?.totalAno !== undefined && dividends?.totalAno !== null
      ? Number(dividends.totalAno).toLocaleString(undefined, {
          minimumFractionDigits: 2,
          maximumFractionDigits: 2,
        })
      : list
          .filter((it) => {
            const pd = it.paymentDate ?? it.lastDatePrior;
            if (!pd) return false;
            return new Date(pd).getFullYear() === currentYear;
          })
          .reduce((s, it) => s + Number(it.rate ?? 0), 0)
          .toLocaleString(undefined, {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
          });

  return (
    <div id="dividendos" className="w-full text-white mt-16 p-8">
      <h2 className="text-2xl font-semibold mb-1 flex items-center gap-2">
        <span className="text-primary text-3xl">$</span> Histórico de Dividendos
      </h2>
      <p className="text-sm text-gray-400 mb-8">
        Análise dos dividendos pagos ao longo dos anos
      </p>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-10">
        <div className="p-5 border border-gray-700 rounded-xl">
          <p className="text-gray-400 text-sm">Último Dividendo</p>
          <h3 className="text-2xl font-bold mt-1">R$ {ultimoDiv}</h3>
          <p className="text-gray-500 text-xs mt-2">Pago em {dataUlt}</p>
        </div>

        <div className="p-5 border border-gray-700 rounded-xl">
          <p className="text-gray-400 text-sm">DY Últ. Dividendo</p>
          <h3 className="text-2xl font-bold mt-1">{dyUlt}%</h3>
          <p className="text-gray-500 text-xs mt-2">Baseado no preço atual</p>
        </div>

        <div className="p-5 border border-gray-700 rounded-xl">
          <p className="text-gray-400 text-sm">Dividend Yield TTM</p>
          <h3 className="text-2xl font-bold mt-1">{dyTTM}%</h3>
          <p className="text-gray-500 text-xs mt-2">Últimos 12 meses</p>
        </div>

        <div className="p-5 border border-gray-700 rounded-xl">
          <p className="text-gray-400 text-sm">
            Dividendos {new Date().getFullYear()}
          </p>
          <h3 className="text-2xl font-bold mt-1">R$ {totalAno}</h3>
          <p className="text-gray-500 text-xs mt-2">Total do ano</p>
        </div>
      </div>

      <div className="w-full h-80 border border-gray-700 rounded-xl overflow-hidden">
        <ContentDividendsChart historico_indicadores={historico_indicadores} />
      </div>

      <div className="mt-10 border border-gray-700 rounded-xl p-6">
        <h3 className="text-lg font-semibold mb-4">Histórico de Pagamentos</h3>
        <p className="text-gray-400 text-sm mb-6">
          Últimos dividendos e JCP pagos
        </p>

        <div className="max-h-72 overflow-y-auto overflow-x-auto">
          <table className="w-full text-left text-sm min-w-[600px]">
            <thead className="border-b border-gray-700 text-gray-400">
              <tr>
                <th className="py-3">Tipo</th>
                <th className="py-3">Data Com</th>
                <th className="py-3">Pagamento</th>
                <th className="py-3">Valor</th>
              </tr>
            </thead>
            <tbody>
              {Array.isArray(dividends) && dividends.length > 0 ? (
                dividends.map((item) => (
                  <tr
                    key={item.id ?? `${item.index}-${item.paymentDate}`}
                    className="border-b border-gray-800"
                  >
                    <td className="py-3">
                      {item.label ?? item.relatedTo ?? "—"}
                    </td>
                    <td className="py-3">
                      {item.lastDatePrior
                        ? new Date(item.lastDatePrior).toLocaleDateString()
                        : "—"}
                    </td>
                    <td className="py-3">
                      {item.paymentDate
                        ? new Date(item.paymentDate).toLocaleDateString()
                        : "—"}
                    </td>
                    <td className="py-3">
                      R${" "}
                      {typeof item.rate === "number"
                        ? item.rate.toFixed(2)
                        : item.rate ?? "0.00"}
                    </td>
                  </tr>
                ))
              ) : (
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
