package com.example.backend.dto;

import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.Size;




@Data
@NoArgsConstructor
@AllArgsConstructor
public class createUsuarioDTO {
    
    @NotBlank(message = "O nome é obrigatorio") @Size(min=2, message = "O nome deve ter ao menos 2 letras")
    private String nome;

    @Email(message="Email deve ser valido") @NotBlank(message = "O email é obrigatorio")
    private String email;

    @NotBlank(message = "A senha é obrigatoria") @Size(min=8,message = "A senha deve ter ao menos 8 caracteres") @Pattern(regexp = "^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[\\W_]).{8,}$",message = "Senha invalida")
    private String senha;
}