package com.example.backend.repositories;

import com.example.backend.models.CashflowHistoryAnual;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface CashflowHistoryAnualRepo extends JpaRepository<CashflowHistoryAnual, Integer> {
}