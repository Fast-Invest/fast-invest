package com.example.backend.repositories;

import com.example.backend.interfaces.IncomeStatement;
import com.example.backend.models.IncomeStatementTrimestral;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface IncomeStatementTrimestralRepo extends JpaRepository<IncomeStatementTrimestral, Long> 
{
    Optional<List<IncomeStatement>> findByTicker(String ticker);
}
