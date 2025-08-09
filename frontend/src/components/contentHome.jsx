export default function contentHome() {
  return (
    <>
      <main className="p-6 text-white overflow-auto">
        <h1 className="text-2xl font-bold mb-6">Principais Cotações</h1>

        <div className="w-full overflow-x-auto">
          <table className="min-w-full text-sm text-left">
            <thead className="text-white/70">
              <tr>
                <th className="px-4 py-3">Logo</th>
                <th className="px-4 py-3">Ticker</th>
                <th className="px-4 py-3">Nome</th>
                <th className="px-4 py-3">Preço</th>
                <th className="px-4 py-3">% Variação</th>
                <th className="px-4 py-3">Volume</th>
                <th className="px-4 py-3">Setor</th>
                <th className="px-4 py-3">Tipo</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {[
                {
                  logo: "petrobras.com.br",
                  ticker: "PETR4",
                  nome: "Petrobras",
                  preco: "R$ 34,12",
                  variacao: "+1.45%",
                  volume: "2.3M",
                  setor: "Petróleo",
                  tipo: "Ação",
                  positivo: true,
                },
                {
                  logo: "vale.com",
                  ticker: "VALE3",
                  nome: "Vale",
                  preco: "R$ 67,80",
                  variacao: "-0.82%",
                  volume: "4.1M",
                  setor: "Mineração",
                  tipo: "Ação",
                  positivo: false,
                },
                {
                  logo: "itau.com.br",
                  ticker: "ITUB4",
                  nome: "Itaú Unibanco",
                  preco: "R$ 29,45",
                  variacao: "+0.66%",
                  volume: "3.7M",
                  setor: "Financeiro",
                  tipo: "Ação",
                  positivo: true,
                },
                {
                  logo: "ambev.com.br",
                  ticker: "ABEV3",
                  nome: "Ambev",
                  preco: "R$ 14,73",
                  variacao: "+0.23%",
                  volume: "5.2M",
                  setor: "Bebidas",
                  tipo: "Ação",
                  positivo: true,
                },
                {
                  logo: "bradesco.com.br",
                  ticker: "BBDC4",
                  nome: "Bradesco",
                  preco: "R$ 23,98",
                  variacao: "-1.09%",
                  volume: "2.1M",
                  setor: "Financeiro",
                  tipo: "Ação",
                  positivo: false,
                },
                {
                  logo: "magazineluiza.com.br",
                  ticker: "MGLU3",
                  nome: "Magazine Luiza",
                  preco: "R$ 3,45",
                  variacao: "+2.34%",
                  volume: "7.1M",
                  setor: "Varejo",
                  tipo: "Ação",
                  positivo: true,
                },
                {
                  logo: "weg.net",
                  ticker: "WEGE3",
                  nome: "WEG",
                  preco: "R$ 41,00",
                  variacao: "+0.90%",
                  volume: "1.5M",
                  setor: "Industrial",
                  tipo: "Ação",
                  positivo: true,
                },
                {
                  logo: "suzano.com.br",
                  ticker: "SUZB3",
                  nome: "Suzano",
                  preco: "R$ 52,35",
                  variacao: "-0.12%",
                  volume: "880k",
                  setor: "Celulose",
                  tipo: "Ação",
                  positivo: false,
                },
                {
                  logo: "b3.com.br",
                  ticker: "B3SA3",
                  nome: "B3",
                  preco: "R$ 12,87",
                  variacao: "+1.10%",
                  volume: "4.8M",
                  setor: "Financeiro",
                  tipo: "Ação",
                  positivo: true,
                },
                {
                  logo: "bb.com.br",
                  ticker: "BBAS3",
                  nome: "Banco do Brasil",
                  preco: "R$ 50,22",
                  variacao: "-0.34%",
                  volume: "3.2M",
                  setor: "Financeiro",
                  tipo: "Ação",
                  positivo: false,
                },
                {
                  logo: "renner.com.br",
                  ticker: "LREN3",
                  nome: "Lojas Renner",
                  preco: "R$ 16,77",
                  variacao: "+0.75%",
                  volume: "2.5M",
                  setor: "Varejo",
                  tipo: "Ação",
                  positivo: true,
                },
                {
                  logo: "localiza.com",
                  ticker: "RENT3",
                  nome: "Localiza",
                  preco: "R$ 58,12",
                  variacao: "-0.18%",
                  volume: "1.4M",
                  setor: "Transporte",
                  tipo: "Ação",
                  positivo: false,
                },
              ].map((acao, idx) => (
                <tr key={idx} className="hover:bg-white/5 transition-colors">
                  <td className="px-4 py-3">
                    <img
                      src={`https://logo.clearbit.com/${acao.logo}`}
                      alt={acao.ticker}
                      className="w-6 h-6 rounded-full"
                    />
                  </td>
                  <td className="px-4 py-3 font-semibold">{acao.ticker}</td>
                  <td className="px-4 py-3">{acao.nome}</td>
                  <td className="px-4 py-3">{acao.preco}</td>
                  <td
                    className={`px-4 py-3 font-medium ${
                      acao.positivo ? "text-[#00ff9c]" : "text-red-500"
                    }`}
                  >
                    {acao.variacao}
                  </td>
                  <td className="px-4 py-3">{acao.volume}</td>
                  <td className="px-4 py-3 text-white/70">{acao.setor}</td>
                  <td>
                    <span className="bg-[#00ff9c]/10 text-[#00ff9c] text-xs px-2 py-1 rounded-full font-semibold">
                      {acao.tipo}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </main>
    </>
  );
}
