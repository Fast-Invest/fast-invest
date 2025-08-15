package com.example.backend.services;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.core.token.KeyBasedPersistenceTokenService;
import org.springframework.security.core.token.Token;
import org.springframework.stereotype.Component;
import java.security.SecureRandom;






@Component
public class TokenService {

    private static final SecureRandom random = new SecureRandom();

    @Value("${app.password-reset-security-token}")
    private String secretKey;



    private final KeyBasedPersistenceTokenService keybased_tokenService;

    public TokenService()
    {
        KeyBasedPersistenceTokenService keyBasedPersistenceTokenService=new KeyBasedPersistenceTokenService();
        keyBasedPersistenceTokenService.setServerSecret(secretKey);
        keyBasedPersistenceTokenService.setServerInteger(16);
        keyBasedPersistenceTokenService.setSecureRandom(random);

        this.keybased_tokenService=keyBasedPersistenceTokenService;
    }

    public static String gerarTokenEmail(int tamanho)// gera um token de tamanho especificado
    {
        StringBuilder token = new StringBuilder(tamanho);// constroi uma string sem caracteres de tamanho maximo
                                                         // especificado

        for (int i = 0; i < tamanho; i++) 
        {
            int digito = random.nextInt(10); // gera numeros aleatorios e bota no token
            token.append(digito);
        }
        return token.toString(); // retorna o token
    }






    public record TokenPair(String tokenSeguranca, String tokenUsuario) {}


    public TokenPair gerarToken(String email) 
    {
        String tokenUsuario = gerarTokenEmail(4);
        String tokenSeguranca = keybased_tokenService.allocateToken(email +":"+tokenUsuario).getKey();
        return new TokenPair(tokenSeguranca, tokenUsuario);
    }


    public String verificarToken(String tokenSeguranca, String tokenUsuario) 
    {
        try 
        {
            Token tokenObj = keybased_tokenService.verifyToken(tokenSeguranca);
            if (tokenObj == null)
            {
                return null;
            }

            String[] partes = tokenObj.getExtendedInformation().split(":");
            if (partes.length != 2)
            {
                return null;
            }


            String email = partes[0];
            String codigo = partes[1];

            if (!codigo.equals(tokenUsuario)) 
            {
                return null; // código incorreto
            }
            return email;

        } 
        catch (Exception e) 
        {
            return null; // token inválido ou expirado
        }
    }


}

