package com.example.backend.exceptions;

public class ErroBuscaCotacoes extends RuntimeException
{
    public ErroBuscaCotacoes(String message) 
    {
        super(message);
    }

}
