package com.example.backend.repositories;


import com.example.backend.models.CashDividends;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface CashDividendsRepo extends JpaRepository<CashDividends, Integer> {
}
