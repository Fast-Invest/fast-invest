package com.example.backend.repositories;

import com.example.backend.models.CashflowHistoryTrimestral;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface CashflowHistoryTrimestralRepo extends JpaRepository<CashflowHistoryTrimestral, Integer> {
}
