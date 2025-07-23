package com.example.backend.config;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseCookie;
import org.springframework.http.ResponseEntity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;
import com.example.backend.services.LoginService;
import org.springframework.http.HttpHeaders;

import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.security.Keys;
import java.util.Date;

import com.example.backend.dto.UsuarioDTO;
import com.example.backend.forms.loginForm;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Configuration;

import jakarta.servlet.http.HttpServletResponse;
import jakarta.validation.Valid;

@Configuration
@EnableWebSecurity
public class JWT
{
    @Value("${app.jwt.secret}")
    private String jwtSecret;

    @Value("${app.jwt.expiration-ms}")
    private long jwtExpiration;
    
    public String buildjwt(String email)
    {
        return Jwts.builder().setSubject(email) //
                             .setIssuedAt(new Date())
                             .setExpiration(new Date(System.currentTimeMillis() + jwtExpiration))
                             .signWith(Keys.hmacShaKeyFor(jwtSecret.getBytes()))
                             .compact();
    }

    public ResponseCookie buildCookie(String token)
    {
        return ResponseCookie.from("JWT",token)
                             .httpOnly(true)
                             .secure(false)
                             .path("/")
                             .maxAge(jwtExpiration/1000)
                             .sameSite("Lax")//acho que aqui seria melhor lax ou none
                             .build();
    }
}