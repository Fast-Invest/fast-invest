package com.example.backend.repositories;

import com.example.backend.models.IndicadoresCompletos;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface IndicadoresCompletosRepo extends JpaRepository<IndicadoresCompletos, Long> {
}
