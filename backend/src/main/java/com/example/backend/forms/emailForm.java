package com.example.backend.forms;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data//adiciona os metodos get,set,equals e hashcode
@AllArgsConstructor//construtor levando todos argumentos
@NoArgsConstructor//construtor sem argumentos
public class emailForm {
    
    @NotBlank(message = "email nao deve ser vazio") @Email(message = "Email deve ser valido")
    private String email;

}
