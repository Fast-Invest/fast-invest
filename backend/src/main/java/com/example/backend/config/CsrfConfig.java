package com.example.backend.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.web.csrf.CookieCsrfTokenRepository;

@Configuration
public class CsrfConfig 
{
    @Bean
    public CookieCsrfTokenRepository cookieCsrfTokenRepository() 
    {
        CookieCsrfTokenRepository cookieRepo = CookieCsrfTokenRepository.withHttpOnlyFalse();
        cookieRepo.setCookiePath("/");
        return cookieRepo;
    }
}
