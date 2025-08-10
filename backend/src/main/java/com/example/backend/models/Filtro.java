package com.example.backend.models;

import jakarta.persistence.*;
import lombok.Data;
import lombok.AllArgsConstructor;
import lombok.NoArgsConstructor;

@Data
@Entity
@AllArgsConstructor
@NoArgsConstructor
@Table(name = "filtros")
public class Filtro 
{
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String tipo;

    @Column(name = "valorMin", columnDefinition = "DOUBLE")
    private Double valorMin;

    @Column(name = "valorMax", columnDefinition = "DOUBLE")
    private Double valorMax;

    @ManyToOne
    @JoinColumn(name = "carteira_id", nullable = false)
    private Carteira carteira;
}