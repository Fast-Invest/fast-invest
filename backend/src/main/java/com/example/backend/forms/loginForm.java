package com.example.backend.forms;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import java.util.List;

@Data//adiciona os metodos get,set,equals e hashcode
@AllArgsConstructor//construtor levando todos argumentos
@NoArgsConstructor//construtor sem argumentos
public class LoginForm 
{

    @NotBlank(message = "O email é obrigatorio") @Email(message="Email deve ser valido") //validacao
    private String email;

    //regex da senha em teoria diz pelo menos 1 letra maiuscula, pelo menos 1 letra minuscula, pelo menos 1 numero e pelo menos 1 caracter especial
    @NotBlank(message = "A senha é obrigatoria")
    private String senha;
 
}

