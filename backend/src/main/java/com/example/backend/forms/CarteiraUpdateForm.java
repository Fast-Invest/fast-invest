package com.example.backend.forms;

import java.time.LocalDate;
import java.util.List;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.PastOrPresent;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class CarteiraUpdateForm 
{
    @NotBlank(message="O nome da carteira é obrigatório")
    String nome;

    @PastOrPresent(message="A carteira deve ser criada com uma data válida")
    LocalDate data;

    @NotEmpty
    List<FiltroUpdateForm> filtros;
}
