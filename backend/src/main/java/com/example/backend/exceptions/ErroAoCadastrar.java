package com.example.backend.exceptions;

public class ErroAoCadastrar  extends RuntimeException
{
    public ErroAoCadastrar(String message) 
    {
        super(message);
    }
    public ErroAoCadastrar() 
    {
        super();
    }
}
