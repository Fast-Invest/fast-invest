package com.example.backend.repositories;

import com.example.backend.models.StockDividends;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface StockDividendsRepo extends JpaRepository<StockDividends, Long> {
}
