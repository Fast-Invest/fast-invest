package com.example.backend.forms;

import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.Size;



@Data//adiciona os metodos get,set,equals e hashcode
@NoArgsConstructor//construtor sem argumentos
@AllArgsConstructor//construtor levando todos argumentos
public class UsuarioForm 
{
    
    @NotBlank(message = "O nome é obrigatorio") @Size(min=2, message = "O nome deve ter ao menos 2 letras")//validação
    private String nome;

    @NotBlank(message = "O email é obrigatorio") @Email(message="Email deve ser valido") //validacao
    private String email;

    //regex da senha em teoria diz pelo menos 1 letra maiuscula, pelo menos 1 letra minuscula, pelo menos 1 numero e pelo menos 1 caracter especial
    @NotBlank(message = "A senha é obrigatoria") 
    @Size(min=8,message = "A senha deve ter ao menos 8 caracteres") 
    @Pattern.List({
        @Pattern(regexp=".*[0-9].*", message= "A senha deve conter pelo menos um dígito"),
        @Pattern(regexp=".*[a-z].*", message= "A senha deve conter pelo menos uma letra minúscula"),
        @Pattern(regexp=".*[A-Z].*", message="A senha deve conter pelo menos uma letra maiúscula"),
        @Pattern(regexp=".*[!@#$%^*.&+=].*", message="A senha deve conter pelo menos um caractere especial"),
        @Pattern(regexp=".*\\S.*", message="A senha não deve conter espaços"),
	})
    private String senha;

}