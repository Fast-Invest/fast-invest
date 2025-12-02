package com.example.backend.repositories;

import com.example.backend.interfaces.IncomeStatement;
import com.example.backend.interfaces.DRETableProjection;

import com.example.backend.models.IncomeStatementAnual;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

@Repository
public interface IncomeStatementAnualRepo extends JpaRepository<IncomeStatementAnual, Integer> 
{
    Optional<List<IncomeStatement>> findByTicker(String ticker);

    @Query(value="""
            SELECT DISTINCT
                YEAR(COALESCE(s.endDate, i.data_demonstrativo_resultados)) AS data,
                s.ticker as ticker,
                COALESCE(s.totalRevenue, i.receita) AS `receitaLiquida`,
                s.grossProfit AS `lucroBruto`,
                COALESCE(i.margem_bruta, CASE WHEN s.totalRevenue > 0 THEN s.grossProfit / s.totalRevenue END ) AS `margemBruta`,
                s.operatingIncome AS `resultadoOperacional`,
                COALESCE(s.ebit, i.ebit) AS `EBIT`,
                COALESCE(i.margem_ebit, CASE WHEN s.totalRevenue > 0 THEN COALESCE(s.ebit, i.ebit) / s.totalRevenue END) AS `margemEBIT`,
                s.interestExpense AS `despesasFinanceiras`,
                s.incomeTaxExpense AS `impostoDeRenda`,
                s.netIncome AS `lucroLiquido`,
                COALESCE(i.margem_liquida,CASE WHEN s.totalRevenue > 0 THEN s.netIncome / s.totalRevenue END) AS `margemLíquida`
            FROM income_statement_anual s
            LEFT JOIN indicadores_anual i
                ON s.ticker = i.symbol
                AND YEAR(s.endDate) = YEAR(i.data_demonstrativo_resultados)
            WHERE s.ticker=:ticker
            ORDER BY data DESC, s.ticker;
            """,nativeQuery=true)
    Optional<List<DRETableProjection>> getAnualIncomeTable(String ticker);


}
