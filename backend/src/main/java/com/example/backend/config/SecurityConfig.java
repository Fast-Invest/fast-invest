package com.example.backend.config;


import com.example.backend.security.JwtFilter;


import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.security.web.csrf.CookieCsrfTokenRepository;
import org.springframework.security.web.util.matcher.AntPathRequestMatcher;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

import java.util.List;


@Configuration
@EnableWebSecurity
public class SecurityConfig 
{


    private final JwtFilter jwtFilter;

    public SecurityConfig(JwtFilter jwtFilter)
    {
        this.jwtFilter=jwtFilter;
    }

    @Bean
    public PasswordEncoder passwordEncoder()
    { //isso daqui é usado para dar hash no password
        return new BCryptPasswordEncoder();
    }
    

    @Bean
    public UrlBasedCorsConfigurationSource corsConfigSource()
    {
        CorsConfiguration cors=new CorsConfiguration();
        cors.setAllowedOrigins(List.of("http://localhost:5173","http://localhost:80"));// so permite requisicoes do localhost do react e da porta 80 caso queiram servir o react em nginx
        cors.setAllowedMethods(List.of("GET","POST","PUT","DELETE","OPTIONS"));                     // metodos permitidos
        cors.setAllowCredentials(true);                                                           // permite o envio de credenciais no header da requisicao,necessario para cookies jwt se forem http only
        cors.setAllowedHeaders(List.of("*"));                                                                   // permite de tudo  no header

        //aplica essa logica para todas rotas
        UrlBasedCorsConfigurationSource  source = new UrlBasedCorsConfigurationSource();
        source.registerCorsConfiguration("/**", cors);
        return source;
    }




    //Configura uma cadeia de filtros para o csrf e pro jwt
    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception 
    {
        http
            .cors(cors -> cors.configurationSource(corsConfigSource()))
            .csrf(csrf -> csrf
                                .csrfTokenRepository(CookieCsrfTokenRepository.withHttpOnlyFalse())
                                .ignoringRequestMatchers(new AntPathRequestMatcher("/**", "OPTIONS"))
                                .ignoringRequestMatchers(new AntPathRequestMatcher("/usuario", "POST"))
                                .ignoringRequestMatchers(new AntPathRequestMatcher("/auth/**"))
                                .ignoringRequestMatchers(new AntPathRequestMatcher("/esquecisenha/**"))
                                .ignoringRequestMatchers(new AntPathRequestMatcher("/swagger-ui/**"))
                                .ignoringRequestMatchers(new AntPathRequestMatcher("/v3/api-docs/**")))
            .sessionManagement(sess -> sess.sessionCreationPolicy(SessionCreationPolicy.STATELESS))
            .authorizeHttpRequests(auth -> auth
                                               .requestMatchers(HttpMethod.OPTIONS, "/**").permitAll()
                                               .requestMatchers(HttpMethod.POST,"/usuario").permitAll()
                                               .requestMatchers( "/auth/**").permitAll()
                                               .requestMatchers("/esquecisenha/**").permitAll()
                                               .requestMatchers("/swagger-ui/**").permitAll()
                                               .requestMatchers("/v3/api-docs/**").permitAll()
                                               .anyRequest().authenticated())
            .addFilterBefore(jwtFilter, UsernamePasswordAuthenticationFilter.class);

        return http.build();
    }


}

