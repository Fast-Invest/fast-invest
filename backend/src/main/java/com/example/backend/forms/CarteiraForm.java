package com.example.backend.forms;

import java.time.LocalDate;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import jakarta.validation.constraints.PastOrPresent;
import jakarta.validation.constraints.NotBlank;


@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class CarteiraForm 
{
    @NotBlank(message="O nome da carteira é obrigatório")
    String nome;

    @PastOrPresent(message="A carteira deve ser criada com uma data válida")
    LocalDate data;
}
