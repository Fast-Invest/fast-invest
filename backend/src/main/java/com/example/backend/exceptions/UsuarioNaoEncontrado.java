package com.example.backend.exceptions;

public class UsuarioNaoEncontrado extends RuntimeException { //Exceçao personalizada
    public UsuarioNaoEncontrado(String message) {
        super(message);
    }
}
