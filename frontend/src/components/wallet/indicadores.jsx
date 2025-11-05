const indicadores = [
  {
    nome: "DY",
    min: 0,
    max: 25,
    explicacao:
      "Indicador utilizado para relacionar os proventos pagos por uma companhia e o preço atual de suas ações.",
  },
  {
    nome: "P/L",
    min: 0,
    max: 100,
    explicacao:
      "Preço/Lucro: indica quantos anos o lucro paga o preço da ação.",
  },
  {
    nome: "PEG Ratio",
    min: -10,
    max: 10,
    explicacao: "Crescimento ajustado ao preço/lucro.",
  },
  {
    nome: "P/VP",
    min: 0,
    max: 20,
    explicacao: "Preço/Valor Patrimonial: compara preço com valor contábil.",
  },
  {
    nome: "P/Ativos",
    min: 0,
    max: 100,
    explicacao: "Lucro bruto sobre receita líquida.",
  },
  {
    nome: "Margem Bruta",
    min: 0,
    max: 100,
    explicacao: "Lucro bruto sobre receita líquida.",
  },
  {
    nome: "Margem Ebit",
    min: 0,
    max: 100,
    explicacao: "Lucro bruto sobre receita líquida.",
  },
  {
    nome: "Margem Líquida",
    min: 0,
    max: 100,
    explicacao: "Lucro líquido sobre receita líquida.",
  },
  {
    nome: "P/EBIT",
    min: 0,
    max: 100,
    explicacao: "Lucro bruto sobre receita líquida.",
  },
  {
    nome: "EV/EBIT",
    min: 0,
    max: 100,
    explicacao: "Lucro bruto sobre receita líquida.",
  },
  {
    nome: "Dívida Líquida / EBIT",
    min: 0,
    max: 20,
    explicacao: "Lucro bruto sobre receita líquida.",
  },
  {
    nome: "Dívida Líquida / Patrimônio",
    min: 0,
    max: 20,
    explicacao: "Lucro bruto sobre receita líquida.",
  },
  {
    nome: "P / Capital de Giro",
    min: 0,
    max: 100,
    explicacao: "Lucro bruto sobre receita líquida.",
  },
  {
    nome: "P / Ativo Circ. Líq.",
    min: 0,
    max: 100,
    explicacao: "Lucro bruto sobre receita líquida.",
  },
  {
    nome: "ROE",
    min: 0,
    max: 100,
    explicacao: "Retorno sobre o patrimônio líquido.",
  },
  {
    nome: "ROIC",
    min: 0,
    max: 100,
    explicacao: "Retorno sobre o capital investido.",
  },
  {
    nome: "ROA",
    min: 0,
    max: 100,
    explicacao: "Valor patrimonial por ação.",
  },
  {
    nome: "Liquidez Corrente",
    min: 0,
    max: 20,
    explicacao: "Valor patrimonial por ação.",
  },
  {
    nome: "Patrimônio / Ativos",
    min: 0,
    max: 1,
    explicacao: "Valor patrimonial por ação.",
  },
  {
    nome: "Passivos / Ativos",
    min: 0,
    max: 1,
    explicacao: "Valor patrimonial por ação.",
  },
  {
    nome: "Giros Ativos",
    min: 0,
    max: 100,
    explicacao: "Valor patrimonial por ação.",
  },
  {
    nome: "Liquidez média diária",
    min: 0,
    max: 10000000,
    explicacao: "Valor patrimonial por ação.",
  },
  {
    nome: "VPA",
    min: 0,
    max: 100,
    explicacao: "Valor patrimonial por ação.",
  },
  {
    nome: "LPA",
    min: 0,
    max: 100,
    explicacao: "Lucro por ação.",
  },
  {
    nome: "Valor de mercado",
    min: 0,
    max: 1000000000,
    explicacao: "Valor total de mercado da empresa.",
  },
];

export default indicadores;
