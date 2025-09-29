package com.example.backend.models;

import jakarta.persistence.*;
import lombok.*;

@Data
@Entity
@AllArgsConstructor
@NoArgsConstructor
@Table(name = "cashflow_history_anual")
public class CashflowHistoryAnual {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    private Long index;

    @Column(columnDefinition = "TEXT")
    private String symbol;

    @Column(columnDefinition = "TEXT")
    private String type;

    @Column(columnDefinition = "TEXT")
    private String endDate;

    private Long operatingCashFlow;
    private Long incomeFromOperations;
    private Long changesInAssetsAndLiabilities;
    private Long investmentCashFlow;
    private Long financingCashFlow;
    private Double foreignExchangeRateWithoutCash;
    private Long increaseOrDecreaseInCash;
    private Long initialCashBalance;
    private Long finalCashBalance;

    @Column(columnDefinition = "TEXT")
    private String updatedAt;

    private Long netIncomeBeforeTaxes;
    private Long otherOperatingActivities;
    private Long adjustmentsToProfitOrLoss;
    private Long exchangeVariationWithoutCash;
    private Long cashGeneratedInOperations;
}
