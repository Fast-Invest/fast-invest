package com.example.backend.forms;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data//adiciona os metodos get,set,equals e hashcode
@AllArgsConstructor//construtor levando todos argumentos
@NoArgsConstructor//construtor sem argumentos
public class ResetSenhaForm 
{
    @NotBlank(message = "O email é obrigatorio") @Email(message="Email deve ser valido") //validacao
    private String email;
    
    @NotBlank @Size(min=8,message = "A senha deve ter ao menos 8 caracteres") @Pattern(regexp = "^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[\\W_]).{8,}$",message = "Senha invalida")
    private String senha;
}
