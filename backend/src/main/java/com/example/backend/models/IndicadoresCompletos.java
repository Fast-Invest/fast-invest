package com.example.backend.models;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import jakarta.persistence.Column;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;

@Data
@Entity
@AllArgsConstructor
@NoArgsConstructor
@Table(name = "indicadores_completos")
public class IndicadoresCompletos {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(columnDefinition = "TEXT")
    private String symbol;

    private Long marketCap;

    @Column(name = "preco_atual")
    private Double precoAtual;

    @Column(columnDefinition = "TEXT")
    private String sector;

    @Column(columnDefinition = "TEXT")
    private String industry;

    private Double pl;
    private Double lpa;
    private Double roa;
    private Double roe;

    @Column(name = "margem_bruta")
    private Double margemBruta;

    @Column(name = "margem_ebitda")
    private Double margemEbitda;

    @Column(name = "margem_liquida")
    private Double margemLiquida;

    @Column(name = "p_ebit", precision = 23, scale = 4)
    private BigDecimal pEbit;

    @Column(name = "ev_ebit", precision = 25, scale = 4)
    private BigDecimal evEbit;

    @Column(name = "divida_liq_ebit", precision = 24, scale = 4)
    private BigDecimal dividaLiqEbit;

    @Column(name = "divida_liq_patrimonio", precision = 24, scale = 4)
    private BigDecimal dividaLiqPatrimonio;

    private Double psr;

    @Column(name = "p_capital_giro", precision = 23, scale = 4)
    private BigDecimal pCapitalGiro;

    @Column(name = "p_ativos", precision = 23, scale = 4)
    private BigDecimal pAtivos;

    @Column(name = "passivos_ativos", precision = 23, scale = 4)
    private BigDecimal passivosAtivos;

    @Column(name = "giro_ativos")
    private Double giroAtivos;

    @Column(name = "quantidade_acoes")
    private Double quantidadeAcoes;

    @Column(name = "vpa", precision = 23, scale = 4)
    private Double vpa;

    @Column(name = "dy", precision = 23, scale = 4)
    private Double dy;

    @Column(name = "p_vp", precision = 23, scale = 4)
    private Double pVp;

    @Column(name = "earning_yield", precision = 23, scale = 4)
    private Double earningYield;

    @Column(name = "p_fco", precision = 23, scale = 4)
    private Double pFco;

    @Column(name = "p_fcl", precision = 23, scale = 4)
    private Double pFcl;

    @Column(name = "enterprise_value")
    private Long enterpriseValue;

    @Column(name = "ev_receita", precision = 23, scale = 4)
    private Double evReceita;

    @Column(name = "ev_fco", precision = 23, scale = 4)
    private Double evFco;

    @Column(name = "ev_fcl", precision = 23, scale = 4)
    private Double evFcl;

    @Column(name = "roic", precision = 23, scale = 4)
    private Double roic;

    @Column(name = "peg_ratio", precision = 23, scale = 4)
    private BigDecimal pegRatio;

    @Column(name = "margem_ebit")
    private Double margemEbit;

    // P / Ativo Circulante Líquido (Preço dividido pelo Ativo Circulante Líquido por ação)
    @Column(name = "p_ativo_circ_liq", precision = 23, scale = 4)
    private Double pAtivoCircLiq;

    // Patrimônio / Ativos (1 - Passivos / Ativos)
    @Column(name = "patrimonio_ativos", precision = 23, scale = 4)
    private Double patrimonioAtivos;

    // Liquidez Média Diária (volume financeiro médio diário)
    @Column(name = "liquidez_media_diaria", precision = 23, scale = 4)
    private Double liquidezMediaDiaria;
}
