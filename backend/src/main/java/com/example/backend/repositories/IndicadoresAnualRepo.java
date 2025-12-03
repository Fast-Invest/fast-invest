package com.example.backend.repositories;


import com.example.backend.models.IndicadoresAnual;


import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import java.util.List;


@Repository
public interface IndicadoresAnualRepo extends JpaRepository<IndicadoresAnual, Long> {

    List<IndicadoresAnual> findBySymbol(String symbol);

    @Query(value="""
            SELECT * FROM indicadores_anual where symbol =:symbol order by data_demonstrativo_resultados, data_balanco, pagamento_dividendo;
            """,nativeQuery =true )
    List<IndicadoresAnual> findBySymbolOrdered(String symbol);

}