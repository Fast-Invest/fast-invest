use fastinvest;

select distinct
	dp.symbol as ticker,
	dp.marketCap as valor_de_mercado,
	dp.longName as nome,
	dp.regularMarketPrice as preco,
	dp.regularMarketChangePercent as variacao,
	dp.sector as setor,
	dp.type as tipo,
	ic.pl as pl,
	ic.lpa as lpa,
	ic.vpa as vpa,
    (ic.preco_atual/ic.vpa) as p_vp,
	ROUND(ic.quantidade_acoes) as quantidade_acoes,
    (1/ic.pl) as earningYield,
    ic.p_ebit as p_ebit,
    (df.currentPrice/df.operatingCashflow) as p_fco,
    (dp.marketCap/df.operatingCashflow) as p_fcl,
    ic.psr as p_receita,
    ic.dy as divdendsYield,
    (ic.marketCap + (df.totalDebt -df.totalCash) ) as enterpriseValue,
    ic.ev_ebit as ev_ebit,
    ((ic.marketCap + (df.totalDebt -df.totalCash) )/df.totalRevenue) as ev_receita,
	((ic.marketCap + (df.totalDebt -df.totalCash) )/df.operatingCashflow) as ev_fco,
    ((ic.marketCap + (df.totalDebt -df.totalCash) )/freeCashflow) as ev_fcl,
    df.currentRatio as liq_corrente,
    ic.margem_bruta,
	ic.margem_ebitda,
	ic.margem_liquida,
	ic.giro_ativos,
    ic.roe,
    ic.roa,
    (((df.ebitda*operatingMargins)*(1-0.34)) / (df.totalDebt + ic.vpa * ic.quantidade_acoes)) as roic
from dados_principais_acoes as dp 
join indicadores_completos as ic on dp.symbol=ic.symbol
join dados_financas as df on dp.symbol=df.symbol
where dp.symbol="PETR4"
order by ic.dy;


-- Query balance
SELECT
    EXTRACT(YEAR FROM COALESCE(b.endDate, i.data_balanco)) AS Ano,
	b.symbol as ticker,
    COALESCE(b.totalAssets, i.ativos_totais) AS "ativosTotais",
    COALESCE(b.totalCurrentAssets, i.ativos_circulantes) AS "ativosCirculante",
    COALESCE(b.cash, 0) + COALESCE(b.shortTermInvestments, 0) AS "caixa&Equivalentes",
    b.inventory AS "Estoques",
    COALESCE(b.totalLiab, i.passivos_totais) AS "passivosTotais",
    COALESCE(b.totalCurrentLiabilities, i.passivos_circulantes) AS "PassivosCirculante",
    COALESCE(b.longTermDebt, i.Divida_longo_prazo) AS "DívidaLongoPrazo",
    COALESCE(b.totalStockholderEquity, i.patrimonio_liquido) AS "patrimonioLiquido",
    COALESCE(b.retainedEarnings) AS "lucrosRetidos"
FROM balance_sheet_anual b
LEFT JOIN indicadores_anual i
  ON b.symbol = i.symbol
 AND EXTRACT(YEAR FROM b.endDate) = EXTRACT(YEAR FROM i.data_balanco)
ORDER BY Ano DESC, b.symbol;

-- Query DRE
SELECT
    YEAR(COALESCE(s.endDate, i.data_demonstrativo_resultados)) AS Ano,
    s.ticker as ticker,
    COALESCE(s.totalRevenue, i.receita) AS `receitaLiquida`,
    s.grossProfit AS `lucroBruto`,
    COALESCE(i.margem_bruta, CASE WHEN s.totalRevenue > 0 THEN s.grossProfit / s.totalRevenue END ) AS `margemBruta`,
    s.operatingIncome AS `resultadoOperacional`,
    COALESCE(s.ebit, i.ebit) AS `EBIT`,
    COALESCE(i.margem_ebit, CASE WHEN s.totalRevenue > 0 THEN COALESCE(s.ebit, i.ebit) / s.totalRevenue END) AS `margemEBIT`,
    s.interestExpense AS `despesasFinanceiras`,
    s.incomeTaxExpense AS `impostoDeRenda`,
    s.netIncome AS `lucroLiquido`,
    COALESCE(i.margem_liquida,CASE WHEN s.totalRevenue > 0 THEN s.netIncome / s.totalRevenue END) AS `margemLíquida`
FROM income_statement_anual s
LEFT JOIN indicadores_anual i
       ON s.ticker = i.symbol
      AND YEAR(s.endDate) = YEAR(i.data_demonstrativo_resultados)
ORDER BY Ano DESC, s.ticker;

-- Query fluxo de caixa
SELECT
    YEAR(COALESCE(c.endDate, i.data_demonstrativo_resultados)) AS ano,
    c.symbol as symbol,
    COALESCE(c.operatingCashFlow, i.fluxo_caixa_operacional) AS fluxoDeCaixaOperacional,
    c.cashGeneratedInOperations AS caixaGeradoNasOperacoes,
    c.changesInAssetsAndLiabilities AS variacoesNosAtivosPassivos,
    c.investmentCashFlow AS fluxoDeCaixaDeInvestimento,
    c.financingCashFlow AS fluxoDeCaixaDeFinanciamento,
    COALESCE(i.fluxo_caixa_livre, NULL) AS fluxoDeCaixaLivre,
    c.increaseOrDecreaseInCash AS variacaoDeCaixa,
    c.initialCashBalance AS saldoInicialDeCaixa,
    c.finalCashBalance AS saldoFinalDeCaixa
FROM cashflow_history_anual c
LEFT JOIN indicadores_anual i
       ON c.symbol = i.symbol
      AND YEAR(c.endDate) = YEAR(i.data_demonstrativo_resultados)

ORDER BY ano DESC, c.symbol;



