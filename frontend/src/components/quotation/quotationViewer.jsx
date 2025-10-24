export default function QuotationViewer({cotacoes,viewMode})
{
return(
<div className="w-full overflow-x-auto">
    {viewMode === "list" ? (
        <table className="min-w-full text-sm text-left">
            <thead className="text-white/70 border-b border-white/10">
                <tr>
                    <th className="px-4 py-3">Logo</th>
                    <th className="px-4 py-3">Ticker</th>
                    <th className="px-4 py-3">Nome</th>
                    <th className="px-4 py-3">Preço</th>
                    <th className="px-4 py-3">% Variação</th>
                    <th className="px-4 py-3">Setor</th>
                    <th className="px-4 py-3">Tipo</th>
                </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
                {cotacoes.map((cotacao, idx) => (
                    <tr key={idx} className="hover:bg-white/5 transition-colors">
                        <td className="px-4 py-3">
                            <img
                                src={`${cotacao.logo}`}
                                alt={cotacao.ticker}
                                className="w-6 h-6 rounded-full"
                                loading="lazy"
                            />
                        </td>
                        <td className="px-4 py-3 font-semibold">{cotacao.ticker}</td>
                        <td className="px-4 py-3">{cotacao.nome}</td>
                        <td className="px-4 py-3">R${cotacao.preco}</td>
                        <td
                            className={`px-4 py-3 font-medium ${cotacao.variacao >= 0 ? "text-[#00ff9c]" : "text-red-500"
                                }`}
                        >
                            {cotacao.variacao}%
                        </td>
                        <td className="px-4 py-3 text-white/70">{cotacao.setor}</td>
                        <td>
                            <span className="bg-[#00ff9c]/10 text-[#00ff9c] text-xs px-2 py-1 rounded-full font-semibold">
                                {cotacao.tipo}
                            </span>
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
    ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
            {cotacoes.map((cotacao, idx) => (
                <div
                    key={idx}
                    className="p-6 rounded-2xl border border-primary/50 shadow-lg shadow-primary/30 hover:shadow-primary/70 hover:-translate-y-2 transition-all duration-300 text-left"
                >
                    <img
                        src={`https://logo.clearbit.com/${cotacao.logo}`}
                        alt={cotacao.ticker}
                        className="w-12 h-12 rounded-full mb-3"
                        loading="lazy"

                    />
                    <h3 className="text-white font-bold text-lg mb-1">
                        {cotacao.ticker}
                    </h3>
                    <p className="text-gray-300 text-sm mb-1">{cotacao.nome}</p>
                    <p className="text-white font-semibold mb-1">R${cotacao.preco}</p>
                    <p
                        className={`font-medium ${cotacao.variacao > 0 ? "text-[#00ff9c]" : "text-red-500"
                            }`}
                    >
                        {cotacao.variacao}%
                    </p>
                    <p className="text-gray-400 text-xs mt-1">{cotacao.setor}</p>
                </div>
            ))}
        </div>
    )}
</div>
);
}