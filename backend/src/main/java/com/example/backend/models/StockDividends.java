package com.example.backend.models;


import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import jakarta.persistence.Column;import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Entity
@AllArgsConstructor
@NoArgsConstructor
@Table(name = "stock_dividends")
public class StockDividends {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "`index`")
    private Long index;

    @Column(columnDefinition = "TEXT")
    private String assetIssued;

    private Long factor;

    @Column(columnDefinition = "TEXT")
    private String completeFactor;

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
