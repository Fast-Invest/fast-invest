package com.example.backend.jwt;

import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.filter.OncePerRequestFilter;

import com.example.backend.repositories.UsuarioRepo;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.JwtException;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.security.Keys;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.AllArgsConstructor;
import jakarta.servlet.http.Cookie;
import com.example.backend.exceptions.TokenInvalido;
import java.io.IOException;
import java.util.List;

@AllArgsConstructor
public class JwtFilter extends OncePerRequestFilter {

    private final String secret;
    private final UsuarioRepo userRepo;

    @Override
    protected void doFilterInternal(HttpServletRequest req, HttpServletResponse res, FilterChain chain) throws ServletException, IOException{ 
        Cookie[] cookies = req.getCookies();
        if(cookies!=null){
            for (Cookie cookie : cookies){
                if("JWT".equals(cookie.getName())){
                    try{
                        Claims claims = Jwts.parserBuilder()//cria um parser(decodificar para o token jwt)
                                            .setSigningKey(Keys.hmacShaKeyFor(secret.getBytes()))//define a chava de assinatura 
                                            .build()
                                            .parseClaimsJws(cookie.getValue())//Realiza o parse (decodifica e valida) o JWT vindo do cookie
                                            .getBody();//Retorna o payload (claims)

                        String email = claims.getSubject();

                        if (userRepo.findByEmail(email).isPresent()) {
                            var auth = new UsernamePasswordAuthenticationToken( email, null, List.of(new SimpleGrantedAuthority("USER")));
                            SecurityContextHolder.getContext().setAuthentication(auth);
                        }
                    }   
                    catch(JwtException ex){
                        throw new TokenInvalido("Token invalido ou expirado");
                    }
        }}}
        chain.doFilter(req, res);
    }
}
