package com.example.backend.forms;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@AllArgsConstructor
@NoArgsConstructor
@Data
public class ResetTokenForm 
{
    
    @NotBlank @Size(min=4,max=4,message = "O token tem 4 digitos") 
    private String tokenUsuario;

    @NotBlank @Size(min = 4, message = "Meio pequeno neh")
    private String tokenSeguranca;
}
