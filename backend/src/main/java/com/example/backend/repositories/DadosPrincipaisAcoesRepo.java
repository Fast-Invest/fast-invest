package com.example.backend.repositories;

import com.example.backend.interfaces.CotacaoProjection;
import com.example.backend.interfaces.CotacaoPerfilProjection;

import com.example.backend.models.DadosPrincipaisAcoes;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

@Repository
public interface DadosPrincipaisAcoesRepo extends JpaRepository<DadosPrincipaisAcoes, Long> {

    @Query(value="""
            SELECT DISTINCT 
                dp.symbol as ticker,
                dp.longName as nome,
                dp.regularMarketChangePercent as variacao,
                dp.regularMarketPrice as preco,
                COALESCE(dp.sector,'Desconhecido') as setor,
                COALESCE(dp.type, "Desconhecido") as tipo,	
                dp.logourl as logo 
            from dados_principais_acoes as dp;
        """,nativeQuery=true)
    List<CotacaoProjection> buscarCotacoes();


    @Query(value="""
        SELECT DISTINCT
            dp.symbol as symbol,
            dp.longName AS nome,
            dpe.address1 AS endereco,
            dpe.city AS cidade,
            dpe.country AS pais,
            dp.currency AS moeda,
            dp.logourl AS logo
        FROM dados_principais_acoes AS dp
        LEFT JOIN dados_perfil_empresa AS dpe ON dp.symbol=dpe.symbol
        where dp.symbol=:symbol ;
        """,nativeQuery=true)
    Optional<CotacaoPerfilProjection> buscarDadosPerfilCotacao(String symbol);

}
