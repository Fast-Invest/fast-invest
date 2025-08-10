package com.example.backend.dto;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;

@Data//adiciona os metodos get,set,equals e hashcode
@NoArgsConstructor//construtor sem argumentos
@AllArgsConstructor//construtor levando todos argumentos
public class UsuarioDTO 
{
    
    private Long id;

    private String nome;

    private String email;

}