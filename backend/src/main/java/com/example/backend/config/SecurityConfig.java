package com.example.backend.config;


import com.example.backend.jwt.JwtFilter;
import com.example.backend.repositories.UsuarioRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.Customizer;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.security.web.csrf.CookieCsrfTokenRepository;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;
import java.util.List;


@Configuration
@EnableWebSecurity
public class SecurityConfig {

    @Value("${app.jwt.secret}")
    private String jwtSecret;

    @Value("${app.jwt.expiration-ms}")
    private long jwtExpiration;

    @Autowired
    private UsuarioRepo usuarioRepo;

    @Bean
    public PasswordEncoder passwordEncoder(){ //isso daqui é usado para dar hash no password
        return new BCryptPasswordEncoder();
    }
    

    public CorsConfigurationSource corsConfigSource(){
        var cors=new CorsConfiguration();
        cors.setAllowedOrigins(List.of("http://localhost:3000")); //so permite requisicoes do localhost do react
        cors.setAllowedMethods(List.of("GET","POST","PUT","DELETE")); //metodos permitidos
        cors.setAllowCredentials(true); //permite o envio de credenciais no header da requisicao,necessario para cookies jwt se forem http only
        cors.setAllowedHeaders(List.of("*")); //permite outras coisas no header
        cors.setExposedHeaders(List.of("XSRF-TOKEN")); //permite o envio do token csrf na requisicao

        //aplica essa logica para todas rotas
        var source = new UrlBasedCorsConfigurationSource();
        source.registerCorsConfiguration("/**", cors);
        return source;
    }




    //Configura uma cadeia de filtros para o csrf e pro jwt
    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception{
        return http.cors(Customizer.withDefaults())
            .csrf(csrf -> csrf.csrfTokenRepository(CookieCsrfTokenRepository.withHttpOnlyFalse()))//isso permite o token csrf ser acessado pelo js
            .authorizeHttpRequests(auth->auth.requestMatchers("/api/public/**", "/api/auth/**").permitAll()//permite acesso sem auth em todas rotas permitadas aqui
                                             .anyRequest().authenticated()) //qualquer outra exige autenticacao
            .sessionManagement(sess -> sess.sessionCreationPolicy(SessionCreationPolicy.STATELESS))// sem sessão de servidor
            .logout(logout -> logout.logoutUrl("/api/auth/logout").deleteCookies("JWT").logoutSuccessHandler((req, res, auth) -> res.setStatus(200)))
            .addFilterAfter(jwtFilter(), UsernamePasswordAuthenticationFilter.class)//adiciona um filtro apos o username password authentication para validar o jwt
            .build();        
    }
    @Bean
    public JwtFilter jwtFilter() {
        return new JwtFilter(jwtSecret, usuarioRepo);
    }
}

