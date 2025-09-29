package com.example.backend.models;

import jakarta.persistence.*;
import lombok.*;

@Data
@Entity
@AllArgsConstructor
@NoArgsConstructor
@Table(name = "cashflow_history_trimestral")
public class CashflowHistoryTrimestral {

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
    private Double investmentCashFlow;
    private Double financingCashFlow;
    private Double foreignExchangeRateWithoutCash;
    private Long increaseOrDecreaseInCash;
    private Double initialCashBalance;
    private Long finalCashBalance;

    @Column(columnDefinition = "TEXT")
    private String updatedAt;

    private Long netIncomeBeforeTaxes;
    private Long otherOperatingActivities;
    private Long adjustmentsToProfitOrLoss;
    private Long exchangeVariationWithoutCash;
    private Long cashGeneratedInOperations;
}
