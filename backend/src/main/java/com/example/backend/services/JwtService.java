package com.example.backend.services;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jws;
import io.jsonwebtoken.JwtException;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.security.Keys;
import javax.crypto.SecretKey;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import java.nio.charset.StandardCharsets;
import java.util.Date;

import jakarta.annotation.PostConstruct;

@Service
public class JwtService 
{
    
    @Value("${jwt.access-secret-key}")
    private String jwtAccessSecretKey;

    @Value("${jwt.refresh-secret-key}")
    private String jwtRefreshSecretKey;

    @Value("${jwt.access-expiration-ms}")
    private long jwtAccessExpiration;

    @Value("${jwt.refresh-expiration-ms}")
    private long jwtRefreshExpiration;


    private SecretKey accessKey;
    private SecretKey refreshKey;

    @PostConstruct
    public void init()
    {
        this.accessKey = Keys.hmacShaKeyFor(jwtAccessSecretKey.getBytes(StandardCharsets.UTF_8));
        this.refreshKey = Keys.hmacShaKeyFor(jwtRefreshSecretKey.getBytes());
    }


    ///////////////////////////////////     Criação dos tokens
    public String criarTokenAcesso(String email)
    {
        return  Jwts.builder()
                    .setSubject(email)
                    .setIssuedAt(new Date())
                    .setExpiration(new Date((new Date()).getTime()+jwtAccessExpiration))
                    .signWith(accessKey, SignatureAlgorithm.HS256)
                    .compact();
    }
    public String criarTokenRefresh(String email)
    {
        return  Jwts.builder()
                    .setSubject(email)
                    .setIssuedAt(new Date())
                    .setExpiration(new Date((new Date()).getTime()+jwtRefreshExpiration))
                    .signWith(refreshKey, SignatureAlgorithm.HS256)
                    .compact();
    }




    ///////////////////////////////////     Validação dos tokens



    public String validarTokenAcesso(String token)
    {
        try
        {
            Jws<Claims> dados = Jwts.parserBuilder()
                                    .setSigningKey(accessKey)
                                    .build()
                                    .parseClaimsJws(token);

            return dados.getBody().getSubject();
        }
        catch(JwtException ex)
        {
            System.out.println("token invalido ou expirado");
            return null;
        }
    }





    public String validarTokenRefresh(String token)
    {
        try
        {
            Jws<Claims> dados = Jwts.parserBuilder()
                                    .setSigningKey(refreshKey)
                                    .build()
                                    .parseClaimsJws(token);

            return dados.getBody().getSubject();
        }
        catch(JwtException ex)
        {
            System.out.println("token invalido ou expirado");
            return null;
        }
    }
















}
