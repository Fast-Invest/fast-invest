package com.example.backend.forms;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data//adiciona os metodos get,set,equals e hashcode
@AllArgsConstructor//construtor levando todos argumentos
@NoArgsConstructor//construtor sem argumentos
public class LoginForm 
{

    @NotBlank(message = "O email é obrigatorio") @Email(message="Email deve ser valido") //validacao
    private String email;

    @NotBlank(message = "A senha é obrigatoria")
    private String senha;
 
}

