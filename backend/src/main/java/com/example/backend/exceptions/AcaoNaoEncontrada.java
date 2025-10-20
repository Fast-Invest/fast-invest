package com.example.backend.exceptions;

public class AcaoNaoEncontrada extends RuntimeException
{

    public AcaoNaoEncontrada(String message) 
    {
        super(message);
    }

    public AcaoNaoEncontrada() 
    {
        super("Nenhuma ação encontrado com o ticker especificado");
    }
}
