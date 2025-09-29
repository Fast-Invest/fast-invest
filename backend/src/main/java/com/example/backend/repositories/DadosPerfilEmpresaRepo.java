package com.example.backend.repositories;


import com.example.backend.models.DadosPerfilEmpresa;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface DadosPerfilEmpresaRepo extends JpaRepository<DadosPerfilEmpresa, Integer> {
}