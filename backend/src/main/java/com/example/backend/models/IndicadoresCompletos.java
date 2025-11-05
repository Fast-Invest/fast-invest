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
    @Column(name="index")
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

    @Column(name = "pl")
    private Double pl;

    @Column(name = "lpa")
    private Double lpa;

    @Column(name = "roa")
    private Double roa;

    @Column(name = "roe")
    private Double roe;

    @Column(name = "margem_bruta")
    private Double margemBruta;

    @Column(name = "margem_ebitda")
    private Double margemEbitda;

    @Column(name = "margem_liquida")
    private Double margemLiquida;

    @Column(name = "p_ebit")
    private Double pEbit;

    @Column(name = "ev_ebit")
    private Double evEbit;

    @Column(name = "divida_liq_ebit")
    private Double dividaLiqEbit;

    @Column(name = "divida_liq_patrimonio")
    private Double dividaLiqPatrimonio;

    @Column(name = "psr")
    private Double psr;

    @Column(name = "p_capital_giro")
    private Double pCapitalGiro;

    @Column(name = "p_ativos")
    private Double pAtivos;

    @Column(name = "passivos_ativos")
    private Double passivosAtivos;

    @Column(name = "giro_ativos")
    private Double giroAtivos;

    @Column(name = "quantidade_acoes")
    private Double quantidadeAcoes;

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

    @Column(name = "enterprise_value")
    private Long enterpriseValue;

    @Column(name = "ev_receita")
    private Double evReceita;

    @Column(name = "ev_fco")
    private Double evFco;

    @Column(name = "ev_fcl")
    private Double evFcl;

    @Column(name = "roic")
    private Double roic;

    @Column(name = "peg_ratio")
    private BigDecimal pegRatio;

    @Column(name = "margem_ebit")
    private Double margemEbit;

    @Column(name = "p_ativo_circ_liq")
    private Double pAtivoCircLiq;

    @Column(name = "patrimonio_ativos")
    private Double patrimonioAtivos;

    @Column(name = "liquidez_media_diaria")
    private Double liquidezMediaDiaria;

    @Column(name = "total_debt")
    private Double totalDebt;

    @Column(name = "total_revenue")
    private Double totalRevenue;

    @Column(name = "ebitda")
    private Double ebitda;

    @Column(name = "total_assets")
    private Double totalAssets;
}
