package com.example.backend.dto;

import lombok.*;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;


import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class UsuarioDTO {
    
    private Long id;

    @NotBlank
    private String nome;

    @Email(message="Email deve ser valido")
    private String email;

    @NotBlank
    private String senha;

    private List<CarteiraDTO> carteiras;
}

