package com.example.backend.security;

import java.io.IOException;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.lang.NonNull;
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
import com.example.backend.utils.CookieUtils;

import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

@Component
public class JwtFilter extends OncePerRequestFilter
{

    private final JwtService jwtService;

    @Autowired
    private UsuarioRepo usuarioRepo;

    @Autowired
    CookieUtils cookieUtils;

    public JwtFilter(JwtService jwtService)
    {
        this.jwtService=jwtService;
    }

    @Override      //DoFilterInternal é um metodo chamado a cada requisição e veridica se há um token valido nos cookies
    protected void doFilterInternal(@NonNull HttpServletRequest request,@NonNull HttpServletResponse response,@NonNull FilterChain filterChain) throws ServletException,IOException
    {

        String token = cookieUtils.ExtrairTokenDoCookie(request, "ACCESS-TOKEN");

        var authContext = SecurityContextHolder.getContext().getAuthentication(); 
        if (token != null && (authContext == null || authContext instanceof AnonymousAuthenticationToken))
        {
            String email = jwtService.validarTokenAcesso(token); //extrai o email do token

            if (email != null )
            {
                Optional<Usuario> usuario = usuarioRepo.findByEmail(email); //busca o usuario do banco

                if(usuario.isPresent())
                {
                    var auth = new UsernamePasswordAuthenticationToken(email,null,List.of(new SimpleGrantedAuthority("ROLE_USER"))); //cria um objecto de autenticação, com o email usado como username, senha nula pq ja estamos usando jwt e uma lista de permissões que so tem usuario  
                    auth.setDetails(new WebAuthenticationDetailsSource().buildDetails(request));//adiciona detalhes da requisição (IP, sessão, etc.).
                    SecurityContextHolder.getContext().setAuthentication(auth);    //registra a autenticação no contexto de segurança do Spring.             
                }
            }
        } 
        filterChain.doFilter(request, response);
    }



    // não aplicar o filtro nas rotas passadas aki, ou diretamente colocadas como liberadas no security
    @Override
    protected boolean shouldNotFilter(@NonNull HttpServletRequest request) 
    {
        String path = request.getRequestURI();

        return path.startsWith("/auth") 
               || path.startsWith("/cotacoes") 
               || (path.equals("/usuario") && request.getMethod().equals("POST"));
    }




}
