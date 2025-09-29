package com.example.backend.models;

import jakarta.persistence.*;
import lombok.*;

@Data
@Entity
@AllArgsConstructor
@NoArgsConstructor
@Table(name = "income_statement_anual")
public class IncomeStatementAnual {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    private Long index;

    @Column(columnDefinition = "TEXT")
    private String type;

    @Column(columnDefinition = "TEXT")
    private String endDate;

    private Double totalRevenue;
    private Double costOfRevenue;
    private Double grossProfit;

    @Column(columnDefinition = "TEXT")
    private String researchDevelopment;

    private Long sellingGeneralAdministrative;

    @Column(columnDefinition = "TEXT")
    private String nonRecurring;

    private Long otherOperatingExpenses;

    @Column(columnDefinition = "TEXT")
    private String totalOperatingExpenses;

    private Long operatingIncome;
    private Long totalOtherIncomeExpenseNet;
    private Long ebit;
    private Long interestExpense;
    private Long incomeBeforeTax;
    private Long incomeTaxExpense;

    @Column(columnDefinition = "TEXT")
    private String minorityInterest;

    private Long netIncomeFromContinuingOps;

    @Column(columnDefinition = "TEXT")
    private String discontinuedOperations;

    @Column(columnDefinition = "TEXT")
    private String extraordinaryItems;

    @Column(columnDefinition = "TEXT")
    private String effectOfAccountingCharges;

    @Column(columnDefinition = "TEXT")
    private String otherItems;

    private Long netIncome;

    @Column(columnDefinition = "TEXT")
    private String netIncomeApplicableToCommonShares;

    private Double salesExpenses;

    @Column(columnDefinition = "TEXT")
    private String lossesDueToNonRecoverabilityOfAssets;

    private Long otherOperatingIncome;
    private Long equityIncomeResult;
    private Long financialResult;
    private Long financialIncome;
    private Long financialExpenses;
    private Long currentTaxes;
    private Long deferredTaxes;

    @Column(columnDefinition = "TEXT")
    private String incomeBeforeStatutoryParticipationsAndContributions;

    private Double basicEarningsPerCommonShare;
    private Double dilutedEarningsPerCommonShare;

    @Column(columnDefinition = "TEXT")
    private String basicEarningsPerPreferredShare;

    @Column(columnDefinition = "TEXT")
    private String profitSharingAndStatutoryContributions;

    @Column(columnDefinition = "TEXT")
    private String dilutedEarningsPerPreferredShare;

    @Column(columnDefinition = "TEXT")
    private String claimsAndOperationsCosts;

    @Column(columnDefinition = "TEXT")
    private String administrativeCosts;

    @Column(columnDefinition = "TEXT")
    private String otherOperatingIncomeAndExpenses;

    @Column(columnDefinition = "TEXT")
    private String earningsPerShare;

    @Column(columnDefinition = "TEXT")
    private String basicEarningsPerShare;

    @Column(columnDefinition = "TEXT")
    private String dilutedEarningsPerShare;

    @Column(columnDefinition = "TEXT")
    private String insuranceOperations;

    @Column(columnDefinition = "TEXT")
    private String reinsuranceOperations;

    @Column(columnDefinition = "TEXT")
    private String complementaryPensionOperations;

    @Column(columnDefinition = "TEXT")
    private String capitalizationOperations;

    @Column(columnDefinition = "TEXT")
    private String updatedAt;

    @Column(columnDefinition = "TEXT")
    private String ticker;
}
