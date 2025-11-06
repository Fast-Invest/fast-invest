package com.example.backend.forms;

import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;



@Data
@AllArgsConstructor
@NoArgsConstructor
public class FiltroForm 
{
    @NotNull(message = "O tipo não pode ser nulo")
    private String tipo;    

    @NotNull(message = "Valor Minimo não pode ser nulo")
    private Double valorMin;

    @NotNull(message = "Valor máximo não pode ser nulo")
    private Double valorMax;

}
