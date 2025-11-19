package com.example.backend.repositories;


import com.example.backend.models.IndicadoresAnual;


import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;


@Repository
public interface IndicadoresAnualRepo extends JpaRepository<IndicadoresAnual, Long> {

    List<IndicadoresAnual> findBySymbol(String symbol);
}