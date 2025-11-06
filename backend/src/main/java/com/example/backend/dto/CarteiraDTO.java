package com.example.backend.dto;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;
import java.util.List;

import lombok.AllArgsConstructor;

@Data//adiciona os metodos get,set,equals e hashcode
@NoArgsConstructor//construtor sem argumentos
@AllArgsConstructor//construtor levando todos argumentos
public class CarteiraDTO 
{
    
    private Long id;

    private String nome;

    private LocalDate data;

   private List<FiltrosCarteiraDTO> filtros;
}