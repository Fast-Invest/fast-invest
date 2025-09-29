package com.example.backend.repositories;

import com.example.backend.models.BalanceSheetTrimestral;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface BalanceSheetTrimestralRepository extends JpaRepository<BalanceSheetTrimestral, Integer> {
}
