package com.example.backend.exceptions;

public class TokenExpirado extends RuntimeException 
{ //Exceção personalizada
    public TokenExpirado(String message) {
        super(message);
    }
}