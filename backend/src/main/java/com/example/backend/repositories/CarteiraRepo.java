package com.example.backend.repositories;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.example.backend.models.Carteira;

@Repository
public interface CarteiraRepo extends JpaRepository<Carteira, Long> 
{
    Optional<List<Carteira>> findByUsuarioId(Long usuarioId);
}