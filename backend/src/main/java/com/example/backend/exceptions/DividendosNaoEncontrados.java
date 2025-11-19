package com.example.backend.exceptions;

public class DividendosNaoEncontrados extends RuntimeException
{

    public DividendosNaoEncontrados(String message) 
    {
        super(message);
    }

    public DividendosNaoEncontrados() 
    {
        super("Nenhum dividendo pago encontrado para o ticker especificado");
    }

    
}
