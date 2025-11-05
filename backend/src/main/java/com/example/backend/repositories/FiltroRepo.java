package com.example.backend.repositories;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.backend.models.Filtro;

public interface FiltroRepo extends JpaRepository<Filtro, Long> {
    Optional<List<Filtro>> findByCarteiraId(Long carteiraId);
}
