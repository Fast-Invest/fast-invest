package com.example.backend.models;

import jakarta.persistence.Entity;
import jakarta.persistence.Table;
import jakarta.persistence.Column;
import jakarta.persistence.Id;
import lombok.Data;
import lombok.AllArgsConstructor;

@Data
@Entity
@AllArgsConstructor
@Table(name = "indicadores")
public class Indicadores 
{

    @Id
    @Column(name = "id")
    private Long id;

    @Column(name = "symbol", columnDefinition = "text")
    private String symbol;

    @Column(name = "preco_atual")
    private Double precoAtual;

    @Column(name = "valor_de_mercado")
    private Double valorDeMercado;

    @Column(name = "variacao_valor")
    private Double variacaoValor;

    @Column(name = "variacao_percentual_valor")
    private Double variacaoPercentualValor;

    @Column(name = "pl")
    private Double pl;

    @Column(name = "lpa")
    private Double lpa;

    @Column(name = "setor", columnDefinition = "text")
    private String setor;

    @Column(name = "tipo", columnDefinition = "text")
    private String tipo;

    @Column(name = "ebitda")
    private Double ebitda;

    @Column(name = "liquidez corrente")
    private Double liquidezCorrente;

    @Column(name = "divida_total")
    private Double dividaTotal;

    @Column(name = "roa")
    private Double roa;

    @Column(name = "roe")
    private Double roe;

    @Column(name = "margem_bruta")
    private Double margemBruta;

    @Column(name = "crescimento_lucros")
    private Double crescimentoLucros;

    @Column(name = "margem_ebitda")
    private Double margemEbitda;

    @Column(name = "margem_ebit")
    private Double margemEbit;

    @Column(name = "margem_liquida")
    private Double margemLiquida;

    @Column(name = "receita")
    private Double receita;

    @Column(name = "fluxo_caixa_operacional")
    private Double fluxoCaixaOperacional;

    @Column(name = "fluxo_caixa_livre")
    private Double fluxoCaixaLivre;

    @Column(name = "ativos_totais")
    private Double ativosTotais;

    @Column(name = "patrimonio_liquido")
    private Double patrimonioLiquido;

    @Column(name = "passivos_totais")
    private Double passivosTotais;

    @Column(name = "passivos_circulantes")
    private Double passivosCirculantes;

    @Column(name = "caixa")
    private Double caixa;

    @Column(name = "investimento_curto_prazo")
    private Double investimentoCurtoPrazo;

    @Column(name = "Divida_longo_prazo")
    private Double dividaLongoPrazo;

    @Column(name = "ativos_circulantes")
    private Double ativosCirculantes;

    @Column(name = "ebit")
    private Double ebit;

    @Column(name = "netIncome")
    private Double netIncome;

    @Column(name = "dividendo_anual")
    private Double dividendoAnual;

    @Column(name = "quantidade_acoes")
    private Double quantidadeAcoes;

    @Column(name = "ativos_circ_liq")
    private Double ativosCircLiq;

    @Column(name = "p_ativo_circ_liq")
    private Double pAtivoCircLiq;

    @Column(name = "p_capital_giro")
    private Double pCapitalGiro;

    @Column(name = "p_ebit")
    private Double pEbit;

    @Column(name = "enterprise_value")
    private Double enterpriseValue;

    @Column(name = "ev_ebit")
    private Double evEbit;

    @Column(name = "divida_liq_ebit")
    private Double dividaLiqEbit;

    @Column(name = "divida_liq_patrimonio")
    private Double dividaLiqPatrimonio;

    @Column(name = "psr")
    private Double psr;

    @Column(name = "p_ativos")
    private Double pAtivos;

    @Column(name = "passivos_ativos")
    private Double passivosAtivos;

    @Column(name = "patrimonio_ativos")
    private Double patrimonioAtivos;

    @Column(name = "giro_ativos")
    private Double giroAtivos;

    @Column(name = "peg_ratio")
    private Double pegRatio;

    @Column(name = "vpa")
    private Double vpa;

    @Column(name = "dy")
    private Double dy;

    @Column(name = "p_vp")
    private Double pVp;

    @Column(name = "earning_yield")
    private Double earningYield;

    @Column(name = "p_fco")
    private Double pFco;

    @Column(name = "p_fcl")
    private Double pFcl;

    @Column(name = "ev_receita")
    private Double evReceita;

    @Column(name = "ev_fco")
    private Double evFco;

    @Column(name = "ev_fcl")
    private Double evFcl;

    @Column(name = "roic", columnDefinition = "text")
    private String roic;

    @Column(name = "liquidez_media_diaria")
    private Double liquidezMediaDiaria;
}

