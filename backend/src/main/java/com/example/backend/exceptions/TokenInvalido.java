package com.example.backend.exceptions;

public class TokenInvalido extends RuntimeException 
{ //Exceção personalizada
    public TokenInvalido(String message) 
    {
        super(message);
    }
}