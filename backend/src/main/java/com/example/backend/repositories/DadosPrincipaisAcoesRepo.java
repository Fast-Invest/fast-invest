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
                dp.longName as nome,
                dp.regularMarketChangePercent as variacao,
                dp.regularMarketPrice as preco,
                COALESCE(dp.sector,'Unknown') as setor,
                COALESCE(dp.type, "Unkown") as tipo,	
                dp.logourl as logo 
            from dados_principais_acoes as dp;
        """,nativeQuery=true)
    List<CotacaoProjection> buscarCotacoes();

}
