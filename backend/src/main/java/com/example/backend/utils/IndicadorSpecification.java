package com.example.backend.utils;

import static java.util.Map.entry;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

import org.springframework.data.jpa.domain.Specification;

import com.example.backend.models.Filtro;
import com.example.backend.models.Indicadores;

import jakarta.persistence.criteria.Path;
import jakarta.persistence.criteria.Predicate;


public class IndicadorSpecification  
{
    private static final Map<String, String> TIPO_CAMPO_MAP = Map.ofEntries(
            entry("DY", "dy"),
            entry("P/L", "pl"),
            entry("PEG Ratio", "pegRatio"),
            entry("P/VP", "pVp"),
            entry("P/Ativos", "pAtivos"),
            entry("Margem Bruta", "margemBruta"),
            entry("Margem Ebit", "margemEbit"),
            entry("Margem Líquida", "margemLiquida"),
            entry("P/EBIT", "pEbit"),
            entry("EV/EBIT", "evEbit"),
            entry("Dívida Líquida / EBIT", "dividaLiqEbit"),
            entry("Dívida Líquida / Patrimônio", "dividaLiqPatrimonio"),
            entry("ROE", "roe"),
            entry("ROIC", "roic"),
            entry("ROA", "roa"),
            entry("Liquidez Corrente", "liquidezCorrente"),
            entry("Patrimônio / Ativos", "patrimonioAtivos"),
            entry("Passivos / Ativos", "passivosAtivos"),
            entry("Giros Ativos", "giroAtivos"),
            entry("Liquidez média diária", "liquidezMediaDiaria"),
            entry("VPA", "vpa"),
            entry("LPA", "lpa"),
            entry("Valor de mercado", "valorDeMercado"),
            entry("P/Capital de Giro", "pCapitalGiro"),
            entry("P/Ativo Circ. Líq.", "pAtivoCircLiq")
    );    


    //A classe Specification gera objetos que contem uma regra de consulta sql, no caso dessa classe
    // É montado uma regra baseada nos filtros com condicoes <= e >= c
    public static Specification<Indicadores> withFilters(List<Filtro> filtros)
    {
        return (tabelaIndicadores, query, criteriaBuilder) -> {

            // 1. Lista na qual serão guardados todos os predicados (as condições do WHERE)
            // Um Predicate é essencialmente uma condicao do where
            List<Predicate> condicoes = new ArrayList<>();

            for (Filtro filtro : filtros)
            {
                String campo = TIPO_CAMPO_MAP.get(filtro.getTipo());
                if(campo == null || campo.isBlank()) continue; 

                // 2. Acessa o atributo da entidade através do Criteria API
                // tabelaIndicadores = a tabela (Indicador)
                // tabelaIndicadores.get("pl") → indicador.pl
                //O Path é literalmente um ponteiro para uma coluna da tabela
                Path<Double> atribColuna = tabelaIndicadores.get(campo);

                if (filtro.getValorMin() != null) {
                    Predicate minPredicate = criteriaBuilder.or(
                                                                criteriaBuilder.isNull(atribColuna),
                                                                criteriaBuilder.greaterThanOrEqualTo(atribColuna, filtro.getValorMin())
                                                               );
                    condicoes.add(minPredicate);
                }

                if (filtro.getValorMax() != null) {
                    Predicate maxPredicate = criteriaBuilder.or(
                                                                criteriaBuilder.isNull(atribColuna),
                                                                criteriaBuilder.lessThanOrEqualTo(atribColuna, filtro.getValorMax())
                                                               );
                    condicoes.add(maxPredicate);
                }
            }
            // 3. Junta todos os predicados com AND
            // cb.and(pred1, pred2, pred3...)
            return criteriaBuilder.and(condicoes.toArray(new Predicate[0]));

        };   
    }





}
