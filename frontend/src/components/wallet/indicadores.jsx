const indicadores = [
  {
    nome: "DY",
    min: 0,
    max: 25,
    explicacao: "Dividend Yield: retorno em dividendos sobre o preço da ação.",
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
    nome: "Margem Bruta",
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
    nome: "EV/EBIT",
    min: 0,
    max: 100,
    explicacao: "Valor da empresa dividido pelo EBIT.",
  },
  { nome: "LPA", min: 0, max: 100, explicacao: "Lucro por ação." },
  { nome: "VPA", min: 0, max: 100, explicacao: "Valor patrimonial por ação." },
  {
    nome: "Valor de mercado",
    min: 0,
    max: 1000000000,
    explicacao: "Valor total de mercado da empresa.",
  },
];

export default indicadores;