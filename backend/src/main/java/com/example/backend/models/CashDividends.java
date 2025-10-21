package com.example.backend.models;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import jakarta.persistence.GenerationType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Column;
import lombok.AllArgsConstructor;
import lombok.NoArgsConstructor;
import lombok.Data;

@Data
@Entity
@AllArgsConstructor
@NoArgsConstructor
@Table(name = "cash_dividends")
public class CashDividends 
{

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    private Long index;

    @Column(columnDefinition = "TEXT")
    private String assetIssued;

    @Column(columnDefinition = "TEXT")
    private String paymentDate;

    private Double rate;

    @Column(columnDefinition = "TEXT")
    private String relatedTo;

    @Column(columnDefinition = "TEXT")
    private String approvedOn;

    @Column(columnDefinition = "TEXT")
    private String isinCode;

    @Column(columnDefinition = "TEXT")
    private String label;

    @Column(columnDefinition = "TEXT")
    private String lastDatePrior;

    @Column(columnDefinition = "TEXT")
    private String remarks;

    @Column(columnDefinition = "TEXT")
    private String ticker;
}
