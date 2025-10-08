package com.example.backend.repositories;

import com.example.backend.interfaces.CotacaoProjection;
import com.example.backend.models.DadosPrincipaisAcoes;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

@Repository
public interface DadosPrincipaisAcoesRepo extends JpaRepository<DadosPrincipaisAcoes, Integer> {

    @Query(value="""
            SELECT DISTINCT 
                dp.symbol as ticker,
                dp.regularMarketChangePercent as variacao,
                dp.regularMarketPrice as preco,
                COALESCE(ic.sector,'unknown') as setor,
                dp.logourl as logo 
            from dados_principais_acoes as dp 
            left join indicadores_completos as ic 
                on ic.symbol=dp.symbol;
        """,nativeQuery=true)
    List<CotacaoProjection> buscarCotacoes();

}
