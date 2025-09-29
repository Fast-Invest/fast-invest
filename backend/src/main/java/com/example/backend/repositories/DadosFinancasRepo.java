package com.example.backend.repositories;

import com.example.backend.models.DadosFinancas;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface DadosFinancasRepo extends JpaRepository<DadosFinancas, Long> {
}
