package com.example.backend.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class FiltrosCarteiraDTO
{
    private Long id;
    private String tipo;
    private Double valorMin;
    private Double valorMax;

}
