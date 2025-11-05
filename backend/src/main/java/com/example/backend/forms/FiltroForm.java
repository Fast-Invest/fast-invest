package com.example.backend.forms;

import jakarta.validation.constraints.NotBlank;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class FiltroForm 
{
    @NotBlank(message= " o nome do campo é obrigatório")
    private String tipo;    

    private Double valorMin;

    private Double valorMax;

}
