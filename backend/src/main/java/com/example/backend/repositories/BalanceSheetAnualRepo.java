package com.example.backend.repositories;


import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.example.backend.interfaces.BalanceSheet;
import com.example.backend.models.BalanceSheetAnual;

@Repository
public interface BalanceSheetAnualRepo extends JpaRepository<BalanceSheetAnual, Integer> 
{
    Optional<List<BalanceSheet>> findBySymbol(String symbol);
}