const indicadores = [
  {
    nome: "DY",
    min: 0,
    max: 25,
    explicacao:
      "Dividend Yield: relaciona os proventos pagos por uma companhia com o preço atual de suas ações.",
  },
  {
    nome: "P/L",
    min: 0,
    max: 100,
    explicacao:
      "Preço/Lucro: indica quantos anos de lucro seriam necessários para pagar o preço da ação.",
  },
  {
    nome: "PEG Ratio",
    min: -10,
    max: 10,
    explicacao:
      "Indica a relação entre o P/L e o crescimento dos lucros — ajusta o P/L pelo crescimento esperado.",
  },
  {
    nome: "P/VP",
    min: 0,
    max: 20,
    explicacao:
      "Preço/Valor Patrimonial: compara o preço da ação com o valor contábil por ação.",
  },
  {
    nome: "P/Ativos",
    min: 0,
    max: 100,
    explicacao:
      "Preço dividido pelo total de ativos da empresa — mostra quanto o mercado paga pelos ativos.",
  },
  {
    nome: "Margem Bruta",
    min: 0,
    max: 100,
    explicacao:
      "Lucro bruto dividido pela receita líquida — mostra quanto sobra após custos diretos de produção.",
  },
  {
    nome: "Margem Ebit",
    min: 0,
    max: 100,
    explicacao:
      "EBIT dividido pela receita líquida — mede a eficiência operacional antes de juros e impostos.",
  },
  {
    nome: "Margem Líquida",
    min: 0,
    max: 100,
    explicacao:
      "Lucro líquido dividido pela receita líquida — mostra quanto da receita vira lucro final.",
  },
  {
    nome: "P/EBIT",
    min: 0,
    max: 100,
    explicacao:
      "Preço da ação dividido pelo EBIT por ação — mostra quanto o mercado paga pelo lucro operacional.",
  },
  {
    nome: "EV/EBIT",
    min: 0,
    max: 100,
    explicacao:
      "Enterprise Value dividido pelo EBIT — mede quanto o mercado paga pelo lucro operacional total.",
  },
  {
    nome: "Dívida Líquida / EBIT",
    min: 0,
    max: 20,
    explicacao:
      "Mostra quantos anos de EBIT seriam necessários para pagar a dívida líquida da empresa.",
  },
  {
    nome: "Dívida Líquida / Patrimônio",
    min: 0,
    max: 20,
    explicacao:
      "Indica o grau de alavancagem financeira — compara dívida líquida com o patrimônio líquido.",
  },
  {
    nome: "P / Capital de Giro",
    min: 0,
    max: 100,
    explicacao:
      "Preço dividido pelo capital de giro (ativo circulante - passivo circulante).",
  },
  {
    nome: "P / Ativo Circ. Líq.",
    min: 0,
    max: 100,
    explicacao:
      "Preço dividido pelos ativos circulantes líquidos — variação do múltiplo de capital de giro.",
  },
  {
    nome: "ROE",
    min: 0,
    max: 100,
    explicacao:
      "Retorno sobre o Patrimônio Líquido — mede a rentabilidade do capital próprio.",
  },
  {
    nome: "ROIC",
    min: 0,
    max: 100,
    explicacao:
      "Retorno sobre o Capital Investido — mede a eficiência do uso do capital total investido.",
  },
  {
    nome: "ROA",
    min: 0,
    max: 100,
    explicacao:
      "Retorno sobre os Ativos — mostra quanto a empresa lucra em relação ao total de ativos.",
  },
  {
    nome: "Liquidez Corrente",
    min: 0,
    max: 20,
    explicacao:
      "Ativo circulante dividido pelo passivo circulante — mede a capacidade de pagar dívidas de curto prazo.",
  },
  {
    nome: "Patrimônio / Ativos",
    min: 0,
    max: 1,
    explicacao:
      "Mostra a proporção dos ativos financiados por capital próprio.",
  },
  {
    nome: "Passivos / Ativos",
    min: 0,
    max: 1,
    explicacao:
      "Mostra a proporção dos ativos financiados por capital de terceiros (dívidas).",
  },
  {
    nome: "Giros Ativos",
    min: 0,
    max: 100,
    explicacao:
      "Receita líquida dividida pelo total de ativos — mede a eficiência no uso dos ativos para gerar receita.",
  },
  {
    nome: "Liquidez média diária",
    min: 0,
    max: 10000000,
    explicacao:
      "Volume médio financeiro diário negociado — indica a facilidade de comprar ou vender a ação.",
  },
  {
    nome: "VPA",
    min: 0,
    max: 100,
    explicacao:
      "Valor Patrimonial por Ação — representa o valor contábil de cada ação.",
  },
  {
    nome: "LPA",
    min: 0,
    max: 100,
    explicacao: "Lucro por Ação — lucro líquido dividido pelo número de ações.",
  },
  {
    nome: "Valor de mercado",
    min: 0,
    max: 1000000000,
    explicacao:
      "Valor total de mercado da empresa — preço da ação multiplicado pelo número de ações emitidas.",
  },
];

export default indicadores;
