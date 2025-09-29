package com.example.backend.repositories;


import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.example.backend.models.BalanceSheetAnual;

@Repository
public interface BalanceSheetAnualRepo extends JpaRepository<BalanceSheetAnual, Integer> {
}