package com.example.backend.utils;


import org.springframework.http.ResponseCookie;
import org.springframework.stereotype.Component;

import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletRequest;

import jakarta.servlet.http.HttpServletResponse;

@Component
public class CookieUtils 
{
    
    // Função de criar cookie
    public void adicionarCookie(HttpServletResponse resp,boolean httpOnly, String nome, String valor, long tempoMax)
    {
        ResponseCookie cookie = ResponseCookie.from(nome, valor == null ? "" : valor)
                                              .httpOnly(httpOnly)       // httpOnly=True faz não ser acessivel por javascript
                                              .secure(false)     // so usa isso como true se for ter https 
                                              .path("/")           // dominio/caminho base
                                              .maxAge(tempoMax)         // tempo de expiracao
                                              .sameSite("Lax") //
                                              .build();
        resp.addHeader("Set-Cookie", cookie.toString());
    }



    public void deletarCookie(HttpServletResponse resp, String nome)
    {
        ResponseCookie cookie = ResponseCookie.from(nome,"")
                                              .httpOnly(true)
                                              .secure(false)
                                              .path("/")
                                              .maxAge(0)
                                              .sameSite("Lax")
                                              .build();
        resp.addHeader("Set-Cookie", cookie.toString());
    }

    public String ExtrairTokenDoCookie(HttpServletRequest request, String cookieName) 
    {
        if (request.getCookies() == null) return null;
        for (Cookie cookie : request.getCookies())  //percorre os cookies da requisicação até achar o token de acesso
        {
            if (cookieName.equals(cookie.getName())) 
            {

                return cookie.getValue();
            }
        }
        return null;
    }
}
