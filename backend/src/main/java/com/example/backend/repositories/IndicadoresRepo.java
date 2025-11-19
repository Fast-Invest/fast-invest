package com.example.backend.repositories;


import com.example.backend.models.Indicadores;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface IndicadoresRepo extends JpaRepository<Indicadores, Long> {

    Optional<Indicadores> findBySymbol(String symbol);
}

