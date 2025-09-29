package com.example.backend.models;

import jakarta.persistence.*;
import lombok.*;

@Data
@Entity
@AllArgsConstructor
@NoArgsConstructor
@Table(name = "dados_financas")
public class DadosFinancas {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(columnDefinition = "TEXT")
    private String symbol;

    private Double currentPrice;
    private Long ebitda;
    private Double quickRatio;
    private Double currentRatio;
    private Double debtToEquity;
    private Double revenuePerShare;
    private Double returnOnAssets;
    private Double returnOnEquity;
    private Double earningsGrowth;
    private Double revenueGrowth;
    private Double grossMargins;
    private Double ebitdaMargins;
    private Double operatingMargins;
    private Double profitMargins;
    private Long totalCash;
    private Double totalCashPerShare;
    private Long totalDebt;
    private Long totalRevenue;
    private Long grossProfits;
    private Long operatingCashflow;
    private Long freeCashflow;

    @Column(columnDefinition = "TEXT")
    private String financialCurrency;

    @Column(columnDefinition = "TEXT")
    private String updatedAt;

    @Column(columnDefinition = "TEXT")
    private String type;
}
