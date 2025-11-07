package com.example.backend.forms;

import jakarta.validation.constraints.NotNull;

public class FiltroUpdateForm 
{
    @NotNull
    private Long carteira_id;
    
    @NotNull(message = "O tipo não pode ser nulo")
    private String tipo;    

    @NotNull(message = "Valor Minimo não pode ser nulo")
    private Double valorMin;

    @NotNull(message = "Valor máximo não pode ser nulo")
    private Double valorMax;
}
