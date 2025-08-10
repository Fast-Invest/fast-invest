package com.example.backend.utils;

import java.security.SecureRandom;

public class EmailTokenUtil
{
    private static final SecureRandom random = new SecureRandom();

        public static String gerarToken(int tamanho)//gera um token de tamanho especificado
        {
            StringBuilder token = new StringBuilder(tamanho);//constroi uma string sem caracteres de tamanho maximo especificado

            for(int i =0;i<tamanho;i++)
            {
                int digito=random.nextInt(10); //gera numeros aleatorios e bota no token
                token.append(digito);
            }
            return token.toString(); //retorna o token
        }
}
