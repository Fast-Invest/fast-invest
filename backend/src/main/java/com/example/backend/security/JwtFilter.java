package com.example.backend.security;

import java.io.IOException;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AnonymousAuthenticationToken;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import com.example.backend.models.Usuario;
import com.example.backend.repositories.UsuarioRepo;
import com.example.backend.services.JwtService;

import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

@Component
public class JwtFilter extends OncePerRequestFilter
{

    private final JwtService jwtService;

    @Autowired
    private UsuarioRepo usuarioRepo;

    public JwtFilter(JwtService jwtService)
    {
        this.jwtService=jwtService;
    }

    @Override
    protected void doFilterInternal(HttpServletRequest request,HttpServletResponse response, FilterChain filterChain) throws ServletException,IOException
    {
        String token = ExtrairTokenDoCookie(request, "ACCESS-TOKEN");
        System.out.println("TOKEN NO FILTRO: " + token);

        var authContext = SecurityContextHolder.getContext().getAuthentication();
        if (token != null && (authContext == null || authContext instanceof AnonymousAuthenticationToken))
        {
            String email = jwtService.validarTokenAcesso(token);
            System.out.println("EMAIL NO FILTRO: " + email);

            if (email != null )
            {
                Optional<Usuario> usuario = usuarioRepo.findByEmail(email);

                if(usuario.isPresent())
                {
                    var auth = new UsernamePasswordAuthenticationToken(email,null,List.of(new SimpleGrantedAuthority("ROLE_USER")));   
                    auth.setDetails(new WebAuthenticationDetailsSource().buildDetails(request));
                    SecurityContextHolder.getContext().setAuthentication(auth);                 
                }
            }
        } 
        filterChain.doFilter(request, response);
    }

    private String ExtrairTokenDoCookie(HttpServletRequest request, String cookieName) 
    {
        if (request.getCookies() == null) return null;

        for (Cookie cookie : request.getCookies()) 
        {
            if (cookieName.equals(cookie.getName())) 
            {
                return cookie.getValue();
            }
        }
        return null;
    }

    // não aplicar o filtro nas rotas passadas ali
    @Override
    protected boolean shouldNotFilter(HttpServletRequest request) 
    {
        String path = request.getRequestURI();

        return path.startsWith("/auth") || (path.equals("/usuario") && request.getMethod().equals("POST"));
    }




}
