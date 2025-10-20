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