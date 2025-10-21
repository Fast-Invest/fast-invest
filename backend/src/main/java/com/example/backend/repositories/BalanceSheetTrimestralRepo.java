package com.example.backend.repositories;

import com.example.backend.interfaces.BalanceSheet;
import com.example.backend.models.BalanceSheetTrimestral;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface BalanceSheetTrimestralRepo extends JpaRepository<BalanceSheetTrimestral, Integer> 
{
        Optional<List<BalanceSheet>> findBySymbol(String symbol);
}
