package com.example.backend.repositories;

import com.example.backend.interfaces.Cashflow;
import com.example.backend.models.CashflowHistoryAnual;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface CashflowHistoryAnualRepo extends JpaRepository<CashflowHistoryAnual, Integer> 
{
    Optional<List<Cashflow>> findBySymbol(String symbol);
}