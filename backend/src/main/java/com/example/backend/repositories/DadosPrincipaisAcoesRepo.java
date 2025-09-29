package com.example.backend.repositories;

import com.example.backend.models.DadosPrincipaisAcoes;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface DadosPrincipaisAcoesRepo extends JpaRepository<DadosPrincipaisAcoes, Integer> {
}
