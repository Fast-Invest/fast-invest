package com.example.backend.repositories;

import com.example.backend.interfaces.Cashflow;
import com.example.backend.models.CashflowHistoryAnual;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import org.springframework.stereotype.Repository;

import com.example.backend.interfaces.CashflowProjection;

@Repository
public interface CashflowHistoryAnualRepo extends JpaRepository<CashflowHistoryAnual, Integer> 
{
    Optional<List<Cashflow>> findBySymbol(String symbol);

    @Query(value="""
            SELECT
                YEAR(COALESCE(c.endDate, i.data_demonstrativo_resultados)) AS data,
                c.symbol as symbol,
                COALESCE(c.operatingCashFlow, i.fluxo_caixa_operacional) AS fluxoDeCaixaOperacional,
                c.cashGeneratedInOperations AS caixaGeradoNasOperacoes,
                c.changesInAssetsAndLiabilities AS variacoesNosAtivosPassivos,
                c.investmentCashFlow AS fluxoDeCaixaDeInvestimento,
                c.financingCashFlow AS fluxoDeCaixaDeFinanciamento,
                COALESCE(i.fluxo_caixa_livre, NULL) AS fluxoDeCaixaLivre,
                c.increaseOrDecreaseInCash AS variacaoDeCaixa,
                c.initialCashBalance AS saldoInicialDeCaixa,
                c.finalCashBalance AS saldoFinalDeCaixa
            FROM cashflow_history_anual c
            LEFT JOIN indicadores_anual i
                ON c.symbol = i.symbol
                AND YEAR(c.endDate) = YEAR(i.data_demonstrativo_resultados)
            where c.symbol=:ticker
            ORDER BY data DESC, c.symbol;
            """,nativeQuery=true)
    Optional<List<CashflowProjection>> getAnualCashflowTable(String ticker);
}