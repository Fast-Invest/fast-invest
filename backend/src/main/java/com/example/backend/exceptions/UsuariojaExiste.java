package com.example.backend.exceptions;

public class UsuariojaExiste extends RuntimeException { //Exceção personalizada
    public UsuariojaExiste(String message) {
        super(message);
    }
}
