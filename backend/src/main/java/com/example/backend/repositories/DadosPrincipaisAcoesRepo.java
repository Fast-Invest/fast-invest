package com.example.backend.repositories;

import com.example.backend.interfaces.CotacaoProjection;
import com.example.backend.interfaces.AcaoProjection;

import com.example.backend.models.DadosPrincipaisAcoes;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

@Repository
public interface DadosPrincipaisAcoesRepo extends JpaRepository<DadosPrincipaisAcoes, Long> {

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
            ic.p_vp as p_vp,
            ic.quantidade_acoes as quantidade_acoes,
            ic.p_ebit as p_ebit,
            ic.p_fco as p_fco,
            ic.p_fcl as p_fcl,
            ic.psr as p_receita,
            ic.earningYield as earning_yield,
            ic.dy as dividends_yield,
            ic.enterprise_Value as enterprise_value,
            ic.ev_ebit as ev_ebit,
            ic.ev_receita as ev_receita_liquida,
            ic.ev_fco as ev_fco,
            ic.ev_fcl as ev_fcl,
            df.currentRatio as liquidez_corrente,
            ic.margem_bruta,
            ic.margem_ebitda,
            ic.margem_liquida,
            ic.giro_ativos as giro_ativo,
            ic.roe,
            ic.roa,
            ic.roic as roic,
            ic.totalRevenue as receita_total,
            ic.totalAssets as recursos_totais,
            ic.totalDebt as debito_total,
            ic.p_capital_giro as p_capital_giro,
            ic.p_ativos as p_ativos,
            ic.p_ativo_circ_liq as p_ativo_circulante_liquido ,
            ic.passivos_ativos as passivos_ativos,
            ic.patrimonio_ativos as patrimonio_ativos,
            ic.liquidez_media_diaria as liquidez_media_diaria,
            ic.divida_liq_ebit as divida_liq_ebit,
            ic.divida_liq_patrimonio as divida_liq_patrimonio
        from dados_principais_acoes as dp 
        join indicadores_completos as ic on dp.symbol=ic.symbol
        join dados_financas as df on dp.symbol=df.symbol
        where dp.symbol= :ticker
        order by dividends_yield;
        """,nativeQuery=true)
    List<AcaoProjection> buscarInfoCompletaAcao(String ticker);


}
