package com.example.backend.repositories;

import com.example.backend.models.IncomeStatementTrimestral;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface IncomeStatementTrimestralRepo extends JpaRepository<IncomeStatementTrimestral, Long> {
}
