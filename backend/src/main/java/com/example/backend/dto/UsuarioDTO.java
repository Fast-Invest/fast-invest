package com.example.backend.dto;
import lombok.Data;
import lombok.NoArgsConstructor;



import lombok.AllArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class UsuarioDTO 
{
    
    private Long id;

    private String nome;

    private String email;

}