package com.example.backend.models;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import jakarta.persistence.GenerationType;
import jakarta.persistence.GeneratedValue;

import com.example.backend.interfaces.Cashflow;

import jakarta.persistence.Column;
import lombok.AllArgsConstructor;
import lombok.NoArgsConstructor;
import lombok.Data;

@Data
@Entity
@AllArgsConstructor
@NoArgsConstructor
@Table(name = "cashflow_history_anual")
public class CashflowHistoryAnual implements Cashflow
{

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
