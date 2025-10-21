package com.example.backend.models;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import jakarta.persistence.GenerationType;
import jakarta.persistence.GeneratedValue;

import com.example.backend.interfaces.BalanceSheet;

import jakarta.persistence.Column;
import lombok.AllArgsConstructor;
import lombok.NoArgsConstructor;
import lombok.Data;

@Data
@Entity
@AllArgsConstructor
@NoArgsConstructor
@Table(name = "balance_sheet_anual")
public class BalanceSheetAnual implements BalanceSheet
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

    private Long cash;

    private Double shortTermInvestments;
    private Double netReceivables;
    private Double inventory;
    private Double otherCurrentAssets;
    private Long totalCurrentAssets;
    private Long longTermInvestments;
    private Double propertyPlantEquipment;
    private Double otherAssets;
    private Long totalAssets;
    private Double accountsPayable;
    private Double shortLongTermDebt;
    private Double longTermDebt;
    private Double otherLiab;
    private Long totalCurrentLiabilities;
    private Long totalLiab;
    private Long commonStock;
    private Double retainedEarnings;

    @Column(columnDefinition = "TEXT")
    private String treasuryStock;

    private Double otherStockholderEquity;
    private Long totalStockholderEquity;

    @Column(columnDefinition = "TEXT")
    private String netTangibleAssets;

    @Column(columnDefinition = "TEXT")
    private String goodWill;

    private Double intangibleAssets;

    @Column(columnDefinition = "TEXT")
    private String deferredLongTermAssetCharges;

    private Double deferredLongTermLiab;
    private Double minorityInterest;

    @Column(columnDefinition = "TEXT")
    private String capitalSurplus;

    private Double accountsReceivableFromClients;
    private Double otherAccountsReceivable;
    private Long taxesToRecover;
    private Double prepaidExpenses;
    private Double longTermAssets;
    private Double longTermRealizableAssets;
    private Double longTermDeferredTaxes;
    private Double longTermPrepaidExpenses;
    private Long shareholdings;
    private Double otherNonCurrentAssets;
    private Long nonCurrentAssets;
    private Double provisions;
    private Long shareholdersEquity;
    private Long realizedShareCapital;
    private Double capitalReserves;
    private Long profitReserves;
    private Double equityValuationAdjustments;
    private Long currentLiabilities;
    private Long socialAndLaborObligations;
    private Double providers;
    private Double nationalSuppliers;
    private Double foreignSuppliers;
    private Double taxObligations;
    private Double loansAndFinancing;
    private Double loansAndFinancingInForeignCurrency;
    private Double otherObligations;
    private Long nonCurrentLiabilities;
    private Double longTermLoansAndFinancing;
    private Double longTermLoansAndFinancingInForeignCurrency;
    private Double longTermDebentures;
    private Double otherLongTermObligations;
    private Double longTermProvisions;

    @Column(columnDefinition = "TEXT")
    private String updatedAt;

    private Double longTermBiologicalAssets;
    private Double creditsWithRelatedParties;
    private Double cumulativeConversionAdjustments;
    private Double otherComprehensiveResults;
    private Long financialAssets;
    private Long debentures;
    private Long biologicalAssets;
    private Long centralBankCompulsoryDeposit;
    private Long otherCurrentLiab;
    private Long longTermReceivables;
    private Long leaseFinancing;
    private Long currentAndDeferredTaxes;
    private Long longTermAccountsReceivableFromClients;
    private Long profitsAndRevenuesToBeAppropriated;
    private Long creditsFromOperations;
    private Long investmentProperties;
    private Long otherCurrentLiabilities;
    private Long investments;
    private Long longTermLeaseFinancing;
    private Long complementaryPension;
    private Long financialAssetsAtAmortizedCost;
    private Long longTermInventory;
    private Long revaluationReserves;
    private Long otherLongTermReceivables;
    private Long otherNonCurrentLiabilities;
    private Long insuranceAndReinsurance;
    private Long financialLiabilitiesAtAmortizedCost;
    private Long otherLiabilities;
    private Long taxLiabilities;
    private Long controllerShareholdersEquity;
    private Long nonControllingShareholdersEquity;
    private Long accumulatedProfitsOrLosses;
    private Long compulsoryLoansAndDeposits;
    private Long deferredSellingExpenses;
    private Long securitiesAndCreditsReceivable;
    private Long deferredTaxes;
    private Long intangibleAsset;
    private Long thirdPartyDeposits;
    private Long longTermLiabilities;
    private Long debitsFromOperations;
    private Long otherDebits;
    private Long capitalization;
    private Long otherValuesAndAssets;
    private Long longTermAccountsPayable;
    private Long debitsFromInsuranceAndReinsurance;
    private Long debitsFromComplementaryPension;
    private Long technicalProvisions;
    private Long longTermDebitsFromOperations;
    private Long longTermTechnicalProvisions;
    private Long debitsFromOtherOperations;
    private Long longTermInsuranceAndReinsurance;
}