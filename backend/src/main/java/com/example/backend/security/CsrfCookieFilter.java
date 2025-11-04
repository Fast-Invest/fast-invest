package com.example.backend.security;

import java.io.IOException;

import org.springframework.security.web.csrf.CsrfToken;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

@Component
public class CsrfCookieFilter extends OncePerRequestFilter
{
    @Override
    protected void doFilterInternal(HttpServletRequest req, HttpServletResponse res, FilterChain chain)throws ServletException, IOException 
    {

        CsrfToken token = (CsrfToken) req.getAttribute(CsrfToken.class.getName());
        if (token != null) token.getToken(); // força o Spring a mandar o cookie só quando muda
        chain.doFilter(req, res);
    }
}