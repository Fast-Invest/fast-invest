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
@Table(name = "dados_principais_acoes")
public class DadosPrincipaisAcoes 
{

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long index;

    @Column(columnDefinition = "TEXT")
    private String currency;

    private Long marketCap;

    @Column(columnDefinition = "TEXT")
    private String shortName;

    @Column(columnDefinition = "TEXT")
    private String longName;

    private Double regularMarketChange;
    private Double regularMarketChangePercent;

    @Column(columnDefinition = "TEXT")
    private String regularMarketTime;

    private Double regularMarketPrice;
    private Double regularMarketDayHigh;

    @Column(columnDefinition = "TEXT")
    private String regularMarketDayRange;

    private Double regularMarketDayLow;
    private Long regularMarketVolume;
    private Double regularMarketPreviousClose;
    private Double regularMarketOpen;

    @Column(columnDefinition = "TEXT")
    private String fiftyTwoWeekRange;

    private Double fiftyTwoWeekLow;
    private Double fiftyTwoWeekHigh;

    @Column(columnDefinition = "TEXT")
    private String symbol;

    @Column(columnDefinition = "TEXT")
    private String logourl;

    private Double priceEarnings;
    private Double earningsPerShare;

    private String sector;
    private String type;
}
