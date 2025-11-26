package com.example.backend.repositories;

import com.example.backend.interfaces.BalanceSheet;
import com.example.backend.interfaces.BalanceTableProjection;
import com.example.backend.models.BalanceSheetTrimestral;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

@Repository
public interface BalanceSheetTrimestralRepo extends JpaRepository<BalanceSheetTrimestral, Integer> 
{

        
    Optional<List<BalanceSheet>> findBySymbol(String symbol);

    @Query(value="""
    SELECT
        COALESCE(b.endDate, i.data_balanco) AS data,
        b.symbol as ticker,
        COALESCE(b.totalAssets, i.ativos_totais) AS "ativosTotais",
        COALESCE(b.totalCurrentAssets, i.ativos_circulantes) AS "ativosCirculante",
        COALESCE(b.cash, 0) + COALESCE(b.shortTermInvestments, 0) AS "caixa&Equivalentes",
        b.inventory AS "Estoques",
        COALESCE(b.totalLiab, i.passivos_totais) AS "passivosTotais",
        COALESCE(b.totalCurrentLiabilities, i.passivos_circulantes) AS "PassivosCirculante",
        COALESCE(b.longTermDebt, i.Divida_longo_prazo) AS "DívidaLongoPrazo",
        COALESCE(b.totalStockholderEquity, i.patrimonio_liquido) AS "patrimonioLiquido",
        COALESCE(b.retainedEarnings) AS "lucrosRetidos"
    FROM balance_sheet_trimestral b
    LEFT JOIN indicadores_anual i
    ON b.symbol = i.symbol
    where b.symbol =:ticker
    AND EXTRACT(YEAR FROM b.endDate) = EXTRACT(YEAR FROM i.data_balanco)
    ORDER BY data DESC, b.symbol;""", nativeQuery=true)
    Optional<List<BalanceTableProjection>> getTrimestalBalanceTable(String ticker);
}
