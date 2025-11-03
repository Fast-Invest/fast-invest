package com.example.backend.exceptions;

public class CarteiraNaoEncontrada extends RuntimeException
{

    public CarteiraNaoEncontrada(String message) 
    {
        super(message);
    }

    public CarteiraNaoEncontrada() 
    {
        super("Nenhuma carteira encontrada para o usuário");
    }
}
