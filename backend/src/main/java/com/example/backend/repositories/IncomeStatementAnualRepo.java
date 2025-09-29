package com.example.backend.repositories;

import com.example.backend.models.IncomeStatementAnual;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface IncomeStatementAnualRepo extends JpaRepository<IncomeStatementAnual, Integer> {
}
