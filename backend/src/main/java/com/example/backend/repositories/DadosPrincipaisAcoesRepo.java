package com.example.backend.repositories;

import com.example.backend.interfaces.CotacaoProjection;
import com.example.backend.interfaces.AcaoProjection;

import com.example.backend.models.DadosPrincipaisAcoes;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

@Repository
public interface DadosPrincipaisAcoesRepo extends JpaRepository<DadosPrincipaisAcoes, Integer> {

    @Query(value="""
            SELECT DISTINCT 
                dp.symbol as ticker,
                dp.longName as nome,
                dp.regularMarketChangePercent as variacao,
                dp.regularMarketPrice as preco,
                COALESCE(dp.sector,'Unknown') as setor,
                COALESCE(dp.type, "Unkown") as tipo,	
                dp.logourl as logo 
            from dados_principais_acoes as dp;
        """,nativeQuery=true)
    List<CotacaoProjection> buscarCotacoes();


    //TODO: (df.currentPrice/df.operatingCashflow) as p_fco, CONSERTAR ISSO
    @Query(value="""
        SELECT DISTINCT
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
            COALESCE(ic.dy,0) as dividendsYield,
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
        where dp.symbol= :ticker
        order by dividendsYield;
        """,nativeQuery=true)
    List<AcaoProjection> buscarInfoCompletaAcao(String ticker);


}
