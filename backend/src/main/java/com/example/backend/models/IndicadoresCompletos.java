package com.example.backend.models;

import jakarta.persistence.*;
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

    private Double vpa;
}
